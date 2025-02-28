const express = require('express');
const router = express.Router();
const listeningController = require('../controllers/listeningController');

// Route to create a new listening
router.post('/', listeningController.createListening);

// Route to get all listenings
router.get('/', listeningController.getAllListenings);

// Route to get a listening by ID
router.get('/:id', listeningController.getListeningById);

// Route to get listenings by category ID
router.get('/category/:categoryId', listeningController.getListeningsByCategory);

// Route to get listenings by difficulty level
router.get('/difficulty/:difficultyLevel', listeningController.getListeningsByDifficulty);

// Route to get listenings by category ID and difficulty level
router.get('/category/:categoryId/difficulty/:difficultyLevel', listeningController.getListeningsByCategoryAndDifficulty);

// Route to update a listening
router.put('/:id', listeningController.updateListening);

// Route to delete a listening
router.delete('/:id', listeningController.deleteListening);

module.exports = router;
