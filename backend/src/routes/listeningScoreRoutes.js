const express = require('express');
const router = express.Router();
const listeningScoreController = require('../controllers/listeningScoreController');
const authMiddleware = require("../middleware/authMiddleware");

// Route to create a new listening score
router.post('/listening-scores', listeningScoreController.createListeningScore);

// Route to get all listening scores for a specific user
router.get('/listening-scores/:userId', listeningScoreController.getListeningScoresByUser);

// Route to get all listening scores for a specific user and category
router.get('/listening-scores/:userId/category/:categoryId', listeningScoreController.getListeningScoresByUserAndCategory);

// Route to get the best listening score for a specific user and category
router.get('/listening-scores/:userId/category/:categoryId/best', listeningScoreController.getBestListeningScoreByUserAndCategory);

module.exports = router;
