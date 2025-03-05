const express = require("express");
const router = express.Router();
const difficultyLevelController = require("../controllers/difficultyLevelController");

// Routes
router.post("/", difficultyLevelController.createDifficultyLevel);
router.get("/", difficultyLevelController.getDifficultyLevels);
router.get("/:id", difficultyLevelController.getDifficultyLevelById);
router.put("/:id", difficultyLevelController.updateDifficultyLevel);
router.delete("/:id", difficultyLevelController.deleteDifficultyLevel);

module.exports = router;
