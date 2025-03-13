const mongoose = require("mongoose");

const videoLectureSchema = new mongoose.Schema({
    lectureTitle: { type: String, required: true },
    videoUrl: { type: String, required: true },
    imgUrl: { type: String, required: true },
    lectureDescription: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    totalTime: { type: Number, required: true },
    difficultyLevel: { type: mongoose.Schema.Types.ObjectId, ref: "DifficultyLevel", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("VideoLecture", videoLectureSchema);
