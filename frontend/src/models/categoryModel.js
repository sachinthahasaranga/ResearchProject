const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId, // Explicitly defining _id
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
  { timestamps: true, _id: true } // Ensuring _id is included
);

module.exports = mongoose.model('Category', categorySchema);
