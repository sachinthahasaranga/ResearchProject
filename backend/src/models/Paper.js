const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
    paperTitle: { type: String, required: true },
    recommendedAge: { type: Number, required: true },
    difficultyLevel: { type: mongoose.Schema.Types.ObjectId, ref: "DifficultyLevel", required: true },
    totalTime: { type: Number, required: true }, // in minutes
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Paper", paperSchema);
