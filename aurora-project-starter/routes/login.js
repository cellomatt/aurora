const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const {
  check,
  validationResult
} = require("express-validator");
const {
  loginUser
} = require("../utils/auth");
const {
  csrfProtection,
  asyncHandler
} = require("../utils/utils");
const db = require("../db/models");

/* GET login form. */
router.get("/", csrfProtection, (req, res) => {
  res.render("login", {
    title: "Log In",
    csrfToken: req.csrfToken(),
  });
});

const loginValidators = [
  check("username")
  .exists({
    checkFalsy: true
  })
  .withMessage("Please provide a value for Username"),
  check("password")
  .exists({
    checkFalsy: true
  })
  .withMessage("Please provide a value for Password"),
];

router.post(
  "/",
  csrfProtection,
  loginValidators,
  asyncHandler(async (req, res) => {
    const {
      username,
      password
    } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const user = await db.User.findOne({
        where: {
          username
        }
      });

      if (user !== null) {
        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword.toString()
        );

        if (passwordMatch) {
          loginUser(req, res, user);
          return req.session.save(err => {
            if (err) {
              next(err);
            } else {
              return res.redirect('/');
            }
          });
        }
      }

      errors.push("Login failed for the provided username and password");
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render("login", {
      title: "Log In",
      username,
      errors,
      csrfToken: req.csrfToken(),
    });
  })
);

module.exports = router;