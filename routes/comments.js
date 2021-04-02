const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { Comment } = db;

const { asyncHandler } = require("../utils/utils");
const { requireAuth } = require("../utils/auth");

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { commentMessage, answerId, userId } = req.body;
    await Comment.create({
      message: commentMessage,
      answerId,
      userId,
    });

    return res.redirect(`/answers/${answerId}`);
  })
);

router.get(
  `/:id/delete`,
  asyncHandler(async (req, res) => {
    const comment = await Comment.findByPk(req.params.id);
    await comment.destroy();
  })
);

router.post(
  `/:id/edit`,
  asyncHandler(async (req, res) => {
    console.log('>>>>>>', req.body, req.params.id)
    const comment = await Comment.findByPk(req.params.id);
    const obj = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }
    let commentMessage = Object.values(obj)[2];
    let answerId = Object.values(obj)[1];
    console.log('>>>>>>>>>>>>', commentMessage);
    comment.message = commentMessage;
    await comment.save();
    res = await res.json();
    return res.redirect(`/answers/${answerId}`)
  })
);

module.exports = router;
