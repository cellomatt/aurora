const express = require("express");
const router = express.Router();

/* GET login form. */
router.get("/", function (req, res, next) {
  res.render("login", {
    title: "Log In",
    history: req.session.history,
  });
});

module.exports = router;
