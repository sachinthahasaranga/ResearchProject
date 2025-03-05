const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    questionTitle: { type: String, required: true },
    answer: { type: String, required: true },
    nlpRequired: { type: Number, enum: [0, 1], required: true, default: 0 }, // 0 - No, 1 - Yes
    questionTitleId: { type: mongoose.Schema.Types.ObjectId, ref: "QuestionTitle", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);
