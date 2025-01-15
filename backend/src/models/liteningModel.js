const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Listing schema
const listingSchema = new Schema({
    audio: {
        type: String, // Store the audio file path or URL
        required: true,
    },
    difficultyLevel: {
        type: Number, // Integer for difficulty level
        required: true,
    },
    mainSession: {
        type: Boolean, // True for main session, false otherwise
        required: true,
    },
    QnA: {
        type: mongoose.Schema.Types.ObjectId, // Reference to QnA document
        ref: 'QnA',
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, // Reference to category document
        ref: 'Category', // Assuming a Category model exists
        required: true,
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export the Listing model
module.exports = mongoose.model('Listing', listingSchema);
