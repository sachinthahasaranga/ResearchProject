const mongoose = require("mongoose");

const studentPerformanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    totalStudyTime: { type: Number, required: true, default: 0 },
    resourceScore: { type: Number, required: true, default: 0 },
    totalScore: { type: Number, required: true, default: 0 },
    paperCount: { type: Number, required: true, default: 0 },
    averageScore: { type: Number, required: true, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("StudentPerformance", studentPerformanceSchema);
