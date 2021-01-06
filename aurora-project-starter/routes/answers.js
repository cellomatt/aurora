const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { User, Question, Expertise, Topic, Answer } = db;
const {
  asyncHandler,
  csrfProtection
} = require("../utils/utils");
const {
  requireAuth
} = require("../utils/auth");

router.post(
  "/",
  // requireAuth,
  asyncHandler(async (req, res, next) => {
    const {
      message,
      questionId,
      userId
    } = req.body;
    await Answer.create({
      message,
      questionId,
      userId
    });

    //const questions = await Question.findAll({ include: User });
    const question = await Question.findByPk(req.params.questionId, {
      includes: {
        User,
        Topic,
        Expertise,
        Answer
      }
    })

    return res.redirect(`/questions/${questionId}`)

  })
);

module.exports = router;