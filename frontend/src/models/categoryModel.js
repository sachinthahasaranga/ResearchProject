const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true, // Ensure category names are unique
      trim: true,
    },
    callingName: {
      type: String,
      required: true,
      trim: true, 
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    backgroundImage: {
      type: String, // Store image filename or URL
      required: true,
      trim: true,
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

module.exports = mongoose.model('Category', categorySchema);
