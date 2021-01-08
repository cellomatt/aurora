const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { Topic, Question, User } = db;
const { asyncHandler } = require("../utils/utils");

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const topics = await Topic.findAll();
    res.render("topics", {
      title: "Topics",
      topics,
    });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const topic = await Topic.findByPk(req.params.id);
    const questions = await Question.findAll({
      where: { topicId: req.params.id },
      include: User,
    });
    res.render("topic-view", {
      questions,
      topic,
      title: `Topic: ${topic.name}`,
    });
  })
);

module.exports = router;
