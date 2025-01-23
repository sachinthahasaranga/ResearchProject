const mongoose = require('mongoose');

// Define the schema for the listening score
const listeningScoreSchema = new mongoose.Schema({
  userId: {
    type: String, // String type for now, can be updated later as needed
    required: true,
  },
  listeningId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the listening model
    ref: 'Listening',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Automatically sets to today's date
  },
  totalScore: {
    type: Number, // Float (decimal)
    required: true,
    min: 0, // Ensure scores can't be negative
  },
  qnaScore: [
    {
      qnaId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the QnA model
        ref: 'QnA',
        required: true,
      },
      score: {
        type: Number, // Float (decimal)
        required: true,
        min: 0, // Ensure scores can't be negative
      },
    },
  ],
  isBest: {
    type: Boolean,
    default: false, // Defaults to `false`
  },
});

// Create and export the model
const ListeningScore = mongoose.model('ListeningScore', listeningScoreSchema);
module.exports = ListeningScore;
