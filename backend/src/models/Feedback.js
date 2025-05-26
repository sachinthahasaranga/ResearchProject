const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  feedback: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  videoLectureId: { type: mongoose.Schema.Types.ObjectId, ref: "VideoLecture", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
