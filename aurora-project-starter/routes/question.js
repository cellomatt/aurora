const express = require('express');
const router = express.Router();
const csrf = require("csurf");
const db = require("../db/models");
const { User, Question, Exerptise } = db;
const { asyncHandler, handleValidationErrors } = require("../utils/utils");
const { requireAuth } = require("../utils/auth");
const csrfProtection = csrf({ cookie: true });
const { check, validationResult } = require('express-validator');
router.use(express.urlencoded({ extended: false }));

router.get('/new', requireAuth, csrfProtection, (req, res) => {

    res.render('question-ask', {
        title: 'Ask a Question',
        csrfToken: req.csrfToken()

    })


});

router.post('/', requireAuth, csrfProtection, asyncHandler(async (req, res) => {

    const { userId } = req.session.auth


}));



module.exports = router;
