const express = require('express');
const router = express.Router();
const readingController = require('../controllers/readingController');

// Create a new reading
router.post('/', authMiddleware,  readingController.createReading);

// Get all readings
router.get('/', authMiddleware,  readingController.getAllReadings);

// Get a single reading by ID
router.get('/:id', authMiddleware,  readingController.getReadingById);

// Update a reading
router.put('/:id', authMiddleware,  readingController.updateReading);

// Delete a reading
router.delete('/:id', authMiddleware,  readingController.deleteReading);

module.exports = router;
