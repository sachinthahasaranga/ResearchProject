const express = require("express");
const { createPaper, getPapers, getPaperById, updatePaper, deletePaper } = require("../controllers/paperController");

const router = express.Router();

router.post("/", createPaper);
router.get("/", getPapers);
router.get("/:id", getPaperById);
router.put("/:id", updatePaper);
router.delete("/:id", deletePaper);

module.exports = router;
