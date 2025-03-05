const StudentPerformanceHistory = require("../models/StudentPerformanceHistory");

// Create Student Performance History Record
exports.createStudentPerformanceHistory = async (req, res) => {
    try {
        const { userId, totalStudyTime, totalScore, paperCount } = req.body;

        // Calculate the average score
        const averageScore = paperCount > 0 ? totalScore / paperCount : 0;

        const newStudentPerformanceHistory = new StudentPerformanceHistory({
            userId,
            totalStudyTime,
            totalScore,
            paperCount,
            averageScore
        });

        await newStudentPerformanceHistory.save();
        res.status(201).json({ message: "Student performance history recorded successfully!", newStudentPerformanceHistory });
    } catch (error) {
        res.status(500).json({ message: "Error creating student performance history", error });
    }
};

// Get All Student Performance History Records
exports.getStudentPerformanceHistories = async (req, res) => {
    try {
        const studentPerformanceHistories = await StudentPerformanceHistory.find()
            .populate("userId", "username email firstName lastName");

        res.status(200).json(studentPerformanceHistories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching student performance history records", error });
    }
};

// Get Single Student Performance History by ID
exports.getStudentPerformanceHistoryById = async (req, res) => {
    try {
        const studentPerformanceHistory = await StudentPerformanceHistory.findById(req.params.id)
            .populate("userId", "username email firstName lastName");

        if (!studentPerformanceHistory) return res.status(404).json({ message: "Student performance history record not found" });

        res.status(200).json(studentPerformanceHistory);
    } catch (error) {
        res.status(500).json({ message: "Error fetching student performance history record", error });
    }
};

// Update Student Performance History Record
exports.updateStudentPerformanceHistory = async (req, res) => {
    try {
        const { totalStudyTime, totalScore, paperCount } = req.body;

        // Calculate the updated average score
        const averageScore = paperCount > 0 ? totalScore / paperCount : 0;

        const updatedStudentPerformanceHistory = await StudentPerformanceHistory.findByIdAndUpdate(
            req.params.id,
            { totalStudyTime, totalScore, paperCount, averageScore },
            { new: true }
        );

        if (!updatedStudentPerformanceHistory) return res.status(404).json({ message: "Student performance history record not found" });

        res.status(200).json({ message: "Student performance history updated successfully!", updatedStudentPerformanceHistory });
    } catch (error) {
        res.status(500).json({ message: "Error updating student performance history", error });
    }
};

// Delete Student Performance History Record
exports.deleteStudentPerformanceHistory = async (req, res) => {
    try {
        const deletedStudentPerformanceHistory = await StudentPerformanceHistory.findByIdAndDelete(req.params.id);
        if (!deletedStudentPerformanceHistory) return res.status(404).json({ message: "Student performance history record not found" });

        res.status(200).json({ message: "Student performance history deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting student performance history", error });
    }
};
