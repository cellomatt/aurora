const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { Topic } = db;
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
    const topic = await Topic.findOne({ where: { id: req.params.id } });
    console.log(topic.name);
    // redir/render
  })
);


module.exports = router;
