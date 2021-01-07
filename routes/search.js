const express = require('express');
const router = express.Router();
const db = require("../db/models");
const {
    Op
} = require("sequelize");
const {
    User,
    Question,
    Expertise,
    Topic,
    Answer
} = db;
const {
    asyncHandler
} = require("../utils/utils");

router.post("/", asyncHandler(async (req, res) => {
    const {
        searchTerm
    } = req.body;

    console.log(searchTerm, "------------")
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
    console.log('-------------', results);
    res.render('search', {
        results
    });
}))

module.exports = router;