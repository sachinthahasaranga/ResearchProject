const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Category schema
const categorySchema = new Schema({
    categoryName: {
        type: String, 
        required: true,
        unique: true, // Ensures category names are unique
        trim: true // Removes extra spaces
    },
    callingName: {
        type: String, 
        required: true,
        trim: true
    },
    description: {
        type: String, 
        required: true,
        trim: true
    },
    backgroundImage: {
        type: String, // URL to an image
        default: "" // Optional: Set a default value if needed
    },
    categoryType: {
        type: String,
        enum: ["paper", "listing", "lecture", "story"],
        required: true
    }
}, { timestamps: true }); 


module.exports = mongoose.model('Category', categorySchema);