const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the QnA schema
const qnaSchema = new Schema({
    Q1: {
        type: String,
        required: true,
    },
    A1: {
        type: String,
        required: true,
    },
    Q2: {
        type: String,
        required: false,
    },
    A2: {
        type: String,
        required: false,
    },
    Q3: {
        type: String,
        required: false,
    },
    A3: {
        type: String,
        required: false,
    },
    Q4: {
        type: String,
        required: false,
    },
    A4: {
        type: String,
        required: false,
    },
    Q5: {
        type: String,
        required: false,
    },
    A5: {
        type: String,
        required: false,
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export the QnA model
module.exports = mongoose.model('QnA', qnaSchema);
