const mongoose = require("mongoose");

const studentPerformanceHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    totalStudyTime: { type: Number, required: true, default: 0 }, // in minutes
    totalScore: { type: Number, required: true, default: 0 },
    paperCount: { type: Number, required: true, default: 0 },
    averageScore: { type: Number, required: true, default: 0 },
    createdDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("StudentPerformanceHistory", studentPerformanceHistorySchema);
