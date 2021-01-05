const express = require("express");
const router = express.Router();
const { logoutUser } = require("../utils/auth");

router.post("/", (req, res) => {
  logoutUser(req, res);
  res.redirect("/login");
});

module.exports = router;
