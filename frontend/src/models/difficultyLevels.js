// Import Mongoose
const mongoose = require('mongoose');

// Define the schema
const difficultySchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId, // Explicitly define _id as an ObjectId
        auto: true, // Automatically generate the _id (default behavior)
    },
    difficultyName: {
        type: String,
        required: true
    },
    difficultyWeight: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: '__v' // Include the version key
});

// Create the model
const Difficulty = mongoose.model('Difficulty', difficultySchema);

// Export the model
module.exports = Difficulty;