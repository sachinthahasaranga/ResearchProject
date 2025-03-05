const express = require('express');
const router = express.Router();
const qnaController = require('../controllers/qnaConteoller');
const authMiddleware = require("../middleware/authMiddleware");

// Route to create a new QnA
router.post('/', authMiddleware, qnaController.createQnA);

// Route to get all QnAs
router.get('/', authMiddleware, qnaController.getAllQnAs);

// Route to get a QnA by ID
router.get('/:id', authMiddleware, qnaController.getQnAById);

// Route to update a QnA
router.put('/:id', authMiddleware, qnaController.updateQnA);

// Route to delete a QnA
router.delete('/:id', authMiddleware, qnaController.deleteQnA);

//check Similarity
router.post('/check-similarity', authMiddleware, qnaController.getSimilarity);

module.exports = router;
