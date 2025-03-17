const mongoose = require('mongoose');

const qnaSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId, // Explicitly defining _id
    question: {
      type: String,
      required: true,  // Ensures the question is required
      trim: true,      // Trims any extra spaces
    },
    answer: {
      type: String,
      required: true,  // Ensures the answer is required
      trim: true,      // Trims any extra spaces
    },
    createdAt: {
      type: Date,
      default: Date.now,  // Automatically sets the current date if not provided
    },
    updatedAt: {
      type: Date,
      default: Date.now,  // Automatically sets the current date if not provided
    },
  },
  { timestamps: true, _id: true } // Ensures _id and timestamps are included
);

module.exports = mongoose.model('QnAModel', qnaSchema);
