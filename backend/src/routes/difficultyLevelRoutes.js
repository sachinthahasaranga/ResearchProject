const express = require("express");
const router = express.Router();
const difficultyLevelController = require("../controllers/difficultyLevelController");
const authMiddleware = require("../middleware/authMiddleware");

// Routes
router.post("/", authMiddleware, difficultyLevelController.createDifficultyLevel);
router.get("/", difficultyLevelController.getDifficultyLevels);
router.get("/:id", difficultyLevelController.getDifficultyLevelById);
router.put("/:id", authMiddleware, difficultyLevelController.updateDifficultyLevel);
router.delete("/:id", authMiddleware, difficultyLevelController.deleteDifficultyLevel);

module.exports = router;
