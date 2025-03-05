const express = require("express");
const router = express.Router();
const paperController = require("../controllers/paperController");
const authMiddleware = require("../middleware/authMiddleware"); 


router.post("/", authMiddleware, paperController.createPaper);
router.get("/", authMiddleware, paperController.getPapers);
router.get("/:id", authMiddleware, paperController.getPaperById);
router.put("/:id", authMiddleware, paperController.updatePaper);
router.delete("/:id", authMiddleware, paperController.deletePaper);

module.exports = router;
