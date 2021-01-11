const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { Comment } = db;

const { asyncHandler, csrfProtection } = require("../utils/utils");
const { requireAuth } = require("../utils/auth");

router.post(
  "/",
  csrfProtection,
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

module.exports = router;
