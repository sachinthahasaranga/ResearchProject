const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryName: {
        type: String, 
        required: true,
        unique: true, 
        trim: true 
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
        type: String, 
        default: "" 
    },
    categoryType: {
        type: String,
        enum: ["paper", "listing", "lecture", "story", "reading"],
        required: true
    }
}, { timestamps: true }); 


module.exports = mongoose.model('Category', categorySchema);