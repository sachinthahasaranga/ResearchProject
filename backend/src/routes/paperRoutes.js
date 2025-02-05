const express = require("express");
const { createPaper, getPapers, getPaperById } = require("../controllers/paperController");
const router = express.Router();

router.post("/", createPaper);
router.get("/", getPapers);
router.get("/:id", getPaperById);

module.exports = router;
