const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { Answer, Question, Comment, User, Expertise, Topic } = db;

const { asyncHandler, csrfProtection } = require("../utils/utils");
const { requireAuth } = require("../utils/auth");


router.post(
  "/",
  // requireAuth,
  asyncHandler(async (req, res, next) => {
    const { commentMessage, answerId, userId } = req.body;

    const comment = await Comment.create({
      message: commentMessage,
      answerId,
      userId
    });

    return res.redirect(`/comments/${comment.id}`);
  })
);

router.get(
  "/:id",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const commentId = req.params.id;
    console.log(commentId + '---------')
    const comment = await Comment.findByPk(commentId);
    console.log(comment)
    const answer = await Answer.findOne( { where: { id: comment.answerId }});
    const comments = await Comment.findAll({ where: { answerId: answer.id }});

    return res.render("answer-view", {
      answer,
      comments,
      csrfToken: req.csrfToken()
    });
  })
);

module.exports = router;
