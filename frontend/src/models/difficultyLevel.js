const mongoose = require('mongoose');

const difficultyLevelSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId, // Explicitly defining _id
    difficultyName: {
      type: String,
      required: true,  // Ensures the difficulty name is required
      unique: true,    // Ensures difficulty names are unique
      trim: true,      // Trims any extra spaces
    },
    difficultyWeight: {
      type: Number,
      required: true,  // Ensures the difficulty weight is required
    },
    status: {
      type: Number,    // Use a number for the status (e.g., 1 for active, 0 for inactive)
      required: true,  // Ensures status is required
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

module.exports = mongoose.model('DifficultyLevel', difficultyLevelSchema);
