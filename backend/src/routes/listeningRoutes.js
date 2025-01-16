const express = require('express');
const router = express.Router();
const listeningController = require('../controllers/listeningController'); // Adjust the path as necessary

// Route to create a new listening
router.post('/', listeningController.createlistening);

// Route to get all listenings
router.get('/', listeningController.getAlllistenings);

// Route to get a listening by ID
router.get('/:id', listeningController.getlisteningById);

// Route to update a listening
router.put('/:id', listeningController.updatelistening);

// Route to delete a listening
router.delete('/:id', listeningController.deletelistening);

module.exports = router;
