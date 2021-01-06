const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const csrf = require("csurf");
const db = require("../db/models");
const {
  User
} = db;
const {
  asyncHandler,
  handleValidationErrors
} = require("../utils/utils");


const { loginUser } = require("../utils/auth");

const csrfProtection = csrf({
  cookie: true
});
router.use(express.urlencoded({
  extended: false
}));

router.use(express.json());
const { check, validationResult } = require('express-validator');

const formValidators = [
  check("username")
  .exists({
    checkFalsy: true
  })
  .withMessage("Please enter a username.")
  .isLength({
    max: 15
  })
  .withMessage("Must be 15 characters or less"),
  check("email")
  .exists({
    checkFalsy: true
  })
  .withMessage("Please enter an email.")
  .isEmail()
  .withMessage("Must follow common email format, i.e., something@mail.com")
  .isLength({
    max: 60
  })
  .withMessage("Must be 60 characters or less"),
  check("password")
  .exists({
    checkFalsy: true
  })
  .withMessage("Please enter a password.")
  .isLength({
    min: 7
  })
  .withMessage("Must have at least 7 characters")
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
  .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  check("confirmPassword")
  .equals("password")
  .withMessage("Passwords must match!")
];

/* GET sign-up form. */
router.get("/", csrfProtection, function (req, res, next) {
  res.render("signup", {
    title: "Sign Up",
    csrfToken: req.csrfToken(),
  });
});

router.post(
  "/",
  csrfProtection,
  formValidators,
  asyncHandler(async (req, res) => {

    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      const {
        username,
        email,
        password
      } = req.body;
      // check if user already exists in db
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        hashedPassword,
      });

      loginUser(req, res, user);

      return req.session.save(err => {
        if (err) {
          next(err);
        } else {
          return res.redirect("/");
        }
      })
    } else {
      const errors = validationErrors.array().map((err) => err.msg);
      res.render('signup', {
        title: "Sign Up",
        errors,
        csrfToken: req.csrfToken(),
      })
    }
  })
);

module.exports = router;
