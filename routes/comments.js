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
      userId,
    });

    return res.redirect(`/answers/${answerId}`);
  })
);

// router.get(
//   "/:id",
//   csrfProtection,
//   asyncHandler(async (req, res, next) => {
//     let userId;
//     if (req.session.auth) {
//       userId = req.session.auth.userId;
//     } else {
//       userId = 0;
//     }
//     const commentId = req.params.id;
//     const comment = await Comment.findByPk(commentId);
//     const answer = await Answer.findOne({ where: { id: comment.answerId } });
//     const comments = await Comment.findAll({ where: { answerId: answer.id } });
//     const question = await Question.findByPk(answer.questionId);

//     return res.render("answer-view", {
//       answer,
//       comments,
//       question,
//       userId,
//       csrfToken: req.csrfToken(),
//     });
//   })
// );

router.get(`/:id/delete`, asyncHandler(async (req, res) => {
  const comment = await Comment.findByPk(req.params.id)
  await comment.destroy();
}));

module.exports = router;
