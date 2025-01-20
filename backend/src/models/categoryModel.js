const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Category schema
const categorySchema = new Schema({
    categoryName: {
        type: String, // Name of the category
        required: true,
        unique: true, // Ensures category names are unique
        trim: true, // Removes extra spaces
    },
    callingName:{
        type: String, // Name of the category
        required: true,
        
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export the Category model
module.exports = mongoose.model('Category', categorySchema);
