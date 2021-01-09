const express = require('express');
const router = express.Router();
const db = require("../db/models");
const {
    Question,
    User,
    Topic
} = db;
const {
    asyncHandler
} = require('../utils/utils');

/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
    let userId;
    if (req.session.auth) {
      userId = req.session.auth.userId;
    } else {
      userId = 0;
    }

    const questions = await Question.findAll({
        include: User,
        order: [
            ['createdAt', 'DESC']
        ],
     });
    const topics = await Topic.findAll()

    res.render('home', {
        title: 'Home',
        userId,
        questions,
        topics
    });
}));

module.exports = router;
