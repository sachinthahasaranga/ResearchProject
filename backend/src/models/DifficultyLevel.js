const mongoose = require("mongoose");

const difficultyLevelSchema = new mongoose.Schema({
    difficultyName: { type: String, required: true, unique: true },
    difficultyWeight: { type: Number, required: true },
    status: { type: Number, enum: [0, 1], default: 1 }, // 0 - inactive, 1 - active
}, { timestamps: true });

module.exports = mongoose.model("DifficultyLevel", difficultyLevelSchema);
