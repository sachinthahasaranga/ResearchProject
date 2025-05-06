const multer = require('multer');
const path = require('path');

// Define storage options (optional)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Adjust folder as needed
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid name conflicts
  },
});

// Initialize Multer
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // File filter to accept only audio files (optional)
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an audio file!'), false);
    }
  },
});

module.exports = upload;
