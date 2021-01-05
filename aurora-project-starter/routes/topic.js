const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { Topic } = db;
const { asyncHandler } = require("../utils/utils");

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const topics = await Topic.findAll();
    res.render("topic", {
      title: "Topic",
      topics,
    });
  })
);

router.get(
  "/:name",
  asyncHandler(async (req, res, next) => {
    const topic = await Topic.findOne({ where: { name: req.params.name } });
    console.log(topic);
  })
);
module.exports = router;
