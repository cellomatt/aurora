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

    let topicIds = []
    let expertiseIds = [];

    results.forEach((result) => {
        if (!topicIds.includes(result.Topic.id)) {
            topicIds.push(result.Topic.id)
        }
        if (!expertiseIds.includes(result.Expertise.id)) {
            expertiseIds.push(result.Expertise.id)
        }
    })

    const topics = await Topic.findAll({ where: {
        id: {
            [Op.in]: topicIds
        }
    }})

    const expertises = await Expertise.findAll({ where: {
        id: {
            [Op.in]: expertiseIds
        }
    }})

    res.render('search', {
        results,
        topics,
        expertises,
    });
}))

module.exports = router;
