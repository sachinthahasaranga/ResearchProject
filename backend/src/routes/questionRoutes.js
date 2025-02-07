const express = require("express");
const { createQuestion, getQuestions, getQuestionById, updateQuestion, deleteQuestion } = require("../controllers/questionController");

const router = express.Router();

router.post("/", createQuestion);
router.get("/", getQuestions);
router.get("/:id", getQuestionById);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

module.exports = router;
