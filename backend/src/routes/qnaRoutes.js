const express = require('express');
const router = express.Router();
const qnaController = require('../controllers/qnaConteoller'); // Adjust the path as necessary

// Route to create a new QnA
router.post('/', qnaController.createQnA);

// Route to get all QnAs
router.get('/', qnaController.getAllQnAs);

// Route to get a QnA by ID
router.get('/:id', qnaController.getQnAById);

// Route to update a QnA
router.put('/:id', qnaController.updateQnA);

// Route to delete a QnA
router.delete('/:id', qnaController.deleteQnA);

//check Similarity
router.post('/check-similarity', qnaController.getSimilarity);

module.exports = router;
