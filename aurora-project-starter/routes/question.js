const express = require('express');
const router = express.Router();
const csrf = require("csurf");
const db = require("../db/models");
const { User, Question, Expertise, Topic } = db;
const { asyncHandler, handleValidationErrors } = require("../utils/utils");
const { requireAuth } = require("../utils/auth");
const csrfProtection = csrf({ cookie: true });
const { check, validationResult } = require('express-validator');
router.use(express.urlencoded({ extended: false }));

router.get(
    '/new',
    requireAuth,
    csrfProtection,
    asyncHandler(async (req, res) => {
    const topics = await Topic.findAll();
    const expertises = await Expertise.findAll();

    res.render('question-ask', {
        title: 'Ask a Question',
        topics,
        expertises,
        csrfToken: req.csrfToken(),
    })
}));

router.post(
    '/',
    requireAuth,
    csrfProtection,
    asyncHandler(async (req, res) => {
        const { title, topicId, expertiseId, message } = req.body;
        const { userId } = req.session.auth
        const topic = await Topic.findByPk(topicId)

        const question = await Question.create({
            title,
            message,
            expertiseId,
            topicId,
            userId
        });

        res.redirect(`/topics/${topicId}`, {
            title: `${topic.name}`
        })

}));



module.exports = router;
