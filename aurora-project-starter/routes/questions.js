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

const formValidators = [
    check("title")
    .exists({
      checkFalsy: true
    })
    .withMessage("Please enter a question.")
    .isLength({
      max: 100
    })
    .withMessage("Your question must be 100 characters or less."),
    check("topicId")
    .exists({
      checkFalsy: true
    })
    .withMessage("Please choose a topic for your question."),
    check("expertiseId")
    .exists({
      checkFalsy: true
    })
    .withMessage("Please choose a level of expertise for your question."),
    check("message")
    .exists({
        checkFalsy: true
    })
    .withMessage("Please enter some context for your question.")
    .isLength({
        max: 300
      })
      .withMessage("Additional information must be 300 characters or less."),
  ];


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
    formValidators,
    csrfProtection,
    asyncHandler(async (req, res) => {
        const validationErrors = validationResult(req);

        if (validationErrors.isEmpty()) {

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
        } else {
            const errors = validationErrors.array().map((err) => err.msg);
            console.log(errors);
        }
    })
);



module.exports = router;
