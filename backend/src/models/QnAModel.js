const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the updated QnA schema
const qnaSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export the QnA model
module.exports = mongoose.model('QnA', qnaSchema);
