const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the listening schema
const listeningSchema = new Schema({
    name: {
        type: String, // Store the name of the listening
        required: true,
    },
    audio: {
        type: String, // Store the audio file path or URL
        required: true,
    },
    difficultyLevel: {
        type: mongoose.Schema.Types.ObjectId, // Reference to DifficultyLevel model
        ref: 'DifficultyLevel',
        required: true,
    },
    mainSession: {
        type: Boolean, // True for main session, false otherwise
        required: true,
    },
    QnA: [
        {
            type: mongoose.Schema.Types.ObjectId, // Array of references to QnA documents
            ref: 'QnA',
            required: true,
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Assuming a Category model exists
        required: true,
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export the listening model
module.exports = mongoose.model('Listening', listeningSchema);
