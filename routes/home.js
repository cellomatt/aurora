const express = require('express');
const router = express.Router();
const db = require("../db/models");
const {
    Question,
    User,
} = db;
const {
    asyncHandler
} = require('../utils/utils');

/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
    const questions = await Question.findAll({ include: User });

    res.render('home', {
        title: 'Home',
        questions,
    });
}));

module.exports = router;
