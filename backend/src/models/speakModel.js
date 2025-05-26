const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the listening schema
const speakSchema = new Schema({
    name: {
        type: String, // Store the name of the listening
        required: true,
    },
    description: {
        type: String, // Store the audio file path or URL
        required: true,
    },
    content: {
        type: String, // Store the audio file path or URL
        required: true,
    },
    difficultyLevel: {
        type: Number, // Integer for difficulty level
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Assuming a Category model exists
        required: true,
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export the listening model
module.exports = mongoose.model('Speak', speakSchema);
