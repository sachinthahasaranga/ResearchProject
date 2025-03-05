const mongoose = require("mongoose");

const questionTitleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    assignMarks: { type: Number, required: true },
    paper: { type: mongoose.Schema.Types.ObjectId, ref: "Paper", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("QuestionTitle", questionTitleSchema);
