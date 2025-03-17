const mongoose = require('mongoose');

// Reference the existing models for DifficultyLevel, QnAModel, and Category
const DifficultyLevel = require('./difficultyLevel');
const QnAModel = require('./QnAModel');
const Category = require('./categoryModel');

const listeningSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,  // Explicitly defining _id
    name: { type: String, required: true, trim: true },
    audio: { type: String, required: true, trim: true },  // Store audio file path
    difficultyLevel: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'DifficultyLevel',  // Reference to the DifficultyLevel model
      required: true 
    },
    mainSession: { type: Boolean, required: true },  // Boolean to indicate if it's a main session
    QnA: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'QnAModel',  // Reference to the QnAModel
      required: true
    }],
    category: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Category',  // Reference to the Category model
      required: true 
    }
  },
  { timestamps: true, _id: true }
);

module.exports = mongoose.model('Listening', listeningSchema);
