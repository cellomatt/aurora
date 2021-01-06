const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { User, Question, Expertise, Topic, Answer, Comment } = db;
const { asyncHandler, csrfProtection } = require("../utils/utils");
const { requireAuth } = require("../utils/auth");

router.post(
  "/",
  // requireAuth,
  asyncHandler(async (req, res, next) => {
    const { message, questionId, userId } = req.body;
    await Answer.create({
      message,
      questionId,
      userId,
    });

    //const questions = await Question.findAll({ include: User });
    const question = await Question.findByPk(req.params.questionId, {
      includes: {
        User,
        Topic,
        Expertise,
        Answer,
      },
    });

    return res.redirect(`/questions/${questionId}`);
  })
);

// possibly need route to pull single answer
router.get(
  "/:id",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const answer = await Answer.findByPk(req.params.id, {
      includes: { User, Question, Topic, Expertise, Comment },
    });
    const comments = await Comment.findAll({ where: { answerId: req.params.id }});
    return res.render("answer-view", {
      answer,
      comments,
      csrfToken: req.csrfToken()
    });
  })
);

module.exports = router;