const express = require("express");
const router = express.Router();
const questionTitleController = require("../controllers/questionTitleController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, questionTitleController.createQuestionTitle);
router.get("/", authMiddleware, questionTitleController.getQuestionTitles);
router.get("/:id", authMiddleware, questionTitleController.getQuestionTitleById);
router.put("/:id", authMiddleware, questionTitleController.updateQuestionTitle);
router.delete("/:id", authMiddleware, questionTitleController.deleteQuestionTitle);

module.exports = router;
