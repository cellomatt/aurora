const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { Answer, Question, User } = db;
const { asyncHandler, csrfProtection } = require("../utils/utils");
const { requireAuth } = require("../utils/auth");

router.post(
  "/",
  // requireAuth,
  asyncHandler(async (req, res, next) => {
    const { message, questionId, userId } = req.body;
    await Answer.create({ message, questionId, userId });

    const questions = await Question.findAll({ include: User });
    res.render("home", {
      title: "Home",
      questions,
    });
  })
);

module.exports = router;
