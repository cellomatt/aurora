const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { Answer, Question, Comment, User, Expertise, Topic } = db;

const { asyncHandler, csrfProtection } = require("../utils/utils");
const { requireAuth } = require("../utils/auth");

router.post(
    "/",
    requireAuth,
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

router.get(`/:id/delete`, asyncHandler(async (req, res) => {
    const comment = await Comment.findByPk(req.params.id)
    await comment.destroy();
}));

module.exports = router;
