const express = require('express');
const router = express.Router();
const readingController = require('../controllers/readingController');
const authMiddleware = require("../middleware/authMiddleware");
const upload = require('../utils/multer');


router.post('/', authMiddleware, readingController.createReading);
router.get('/category/:categoryId', authMiddleware, readingController.getReadingsByCategory);
router.get('/', authMiddleware, readingController.getAllReadings);
router.get('/:id', authMiddleware, readingController.getReadingById);
router.put('/:id', authMiddleware, readingController.updateReading);
router.delete('/:id', authMiddleware, readingController.deleteReading);

// Analyze reading text
router.post('/analyze', authMiddleware, readingController.analyzeReading);

// Transcribe audio using AssemblyAI
router.post('/transcribe', authMiddleware, upload.single('audio'), readingController.transcribeReading);

  // router.post('/transcribe', upload.single('audio'), (req, res, next) => {
  //   console.log('Multer Debugging: req.file =', req.file);
  //   console.log('Multer Debugging: req.body =', req.body);
  //   next();
  // }, readingController.transcribeReading);
  


module.exports = router;
