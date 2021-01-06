const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { Answer, Question, Comment, User, Expertise, Topic } = db;

const { asyncHandler } = require("../utils/utils");
const { requireAuth } = require("../utils/auth");
const csrf = require("csurf");

router.post(
  "/",
  asyncHandler(async (req, res, next) => {})
);

module.exports = router;
