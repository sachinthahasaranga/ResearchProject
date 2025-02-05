const express = require("express");
const { createAnswer, getAnswers, getAnswerById } = require("../controllers/answerController");
const router = express.Router();

router.post("/", createAnswer);
router.get("/", getAnswers);
router.get("/:id", getAnswerById);

module.exports = router;
