const express = require('express');
const router = express.Router();
const db = require("../db/models");
const { Op } = require("sequelize");
const {
    User,
    Question,
    Expertise,
    Topic,
    Answer
} = db;
const { asyncHandler } = require("../utils/utils");

router.post("/", asyncHandler(async (req, res) => {
    const {
        searchTerm
    } = req.body;

    const results = await Question.findAll({
        where: {
            [Op.or]: [{
                    title: {
                        [Op.substring]: searchTerm
                    }
                },
                {
                    message: {
                        [Op.substring]: searchTerm
                    }
                }
            ]
        },
        include:
             [Topic, Expertise, User]
        ,
        order: [
            ['createdAt', 'DESC']
        ]

    })

    let topics = []
    let expertises = [];

    results.forEach((result) => {
        if (!topics.includes(result.Topic.name)) {
            topics.push(result.Topic.name)
        }
        if (!expertises.includes(result.Expertise.description)) {
            expertises.push(result.Expertise.description)
        }
    })

    res.render('search', {
        results,
        topics,
        expertises,
    });
}))

module.exports = router;
