const express = require("express");
const { createAnswer, getAnswers, getAnswerById, updateAnswer, deleteAnswer } = require("../controllers/answerController");

const router = express.Router();

router.post("/", createAnswer);
router.get("/", getAnswers);
router.get("/:id", getAnswerById);
router.put("/:id", updateAnswer);
router.delete("/:id", deleteAnswer);

module.exports = router;
