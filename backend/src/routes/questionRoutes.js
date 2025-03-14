const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const authMiddleware = require("../middleware/authMiddleware"); // Protect routes

// Routes (Protected with authMiddleware)
router.post("/", authMiddleware, questionController.createQuestion);
router.get("/", authMiddleware, questionController.getQuestions);
router.get("/:id", authMiddleware, questionController.getQuestionById);
router.put("/:id", authMiddleware, questionController.updateQuestion);
router.delete("/:id", authMiddleware, questionController.deleteQuestion);

router.get("/question-title/:questionTitleId", authMiddleware, questionController.getQuestionsByQuestionTitleId);

module.exports = router;
