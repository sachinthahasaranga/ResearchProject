const express = require('express');
const router = express.Router();
const listeningController = require('../controllers/listeningController');
const authMiddleware = require("../middleware/authMiddleware");

// Route to create a new listening
router.post('/', authMiddleware, listeningController.createListening);

// Route to get all listenings
router.get('/', authMiddleware, listeningController.getAllListenings);

// Route to get a listening by ID
router.get('/:id', authMiddleware, listeningController.getListeningById);

// Route to get listenings by category ID
router.get('/category/:categoryId', authMiddleware, listeningController.getListeningsByCategory);

// Route to get listenings by difficulty level (Updated route to use difficultyLevelId)
router.get('/difficulty/:difficultyLevelId', authMiddleware, listeningController.getListeningsByDifficulty);

// Route to get listenings by category ID and difficulty level (Updated route to use difficultyLevelId)
router.get('/category/:categoryId/difficulty/:difficultyLevelId', authMiddleware, listeningController.getListeningsByCategoryAndDifficulty);

// Route to update a listening
router.put('/:id', authMiddleware, listeningController.updateListening);

// Route to delete a listening
router.delete('/:id', authMiddleware, listeningController.deleteListening);

module.exports = router;
