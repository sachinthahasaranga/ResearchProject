const express = require('express');
const router = express.Router();
const listeningScoreController = require('../controllers/listeningScoreController');

// Route to create a new listening score
router.post('/listening-scores', listeningScoreController.createListeningScore);

// Route to get all listening scores for a specific user
router.get('/listening-scores/:userId', listeningScoreController.getListeningScoresByUser);

module.exports = router;
