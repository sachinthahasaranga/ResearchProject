const StudentPerformance = require("../models/StudentPerformance");
const User = require("../models/User");

// Create Student Performance Record
exports.createStudentPerformance = async (req, res) => {
    try {
        const { userId, totalStudyTime, totalScore, paperCount } = req.body;

        // Calculate the average score
        const averageScore = paperCount > 0 ? totalScore / paperCount : 0;

        const newStudentPerformance = new StudentPerformance({
            userId,
            totalStudyTime,
            totalScore,
            paperCount,
            averageScore
        });

        await newStudentPerformance.save();
        res.status(201).json({ message: "Student performance record created successfully!", newStudentPerformance });
    } catch (error) {
        res.status(500).json({ message: "Error creating student performance record", error });
    }
};

// Get All Student Performances
exports.getStudentPerformances = async (req, res) => {
    try {
        const studentPerformances = await StudentPerformance.find()
            .populate("userId", "username email firstName lastName");

        res.status(200).json(studentPerformances);
    } catch (error) {
        res.status(500).json({ message: "Error fetching student performances", error });
    }
};

// Get Single Student Performance by ID
exports.getStudentPerformanceById = async (req, res) => {
    try {
        const studentPerformance = await StudentPerformance.findById(req.params.id)
            .populate("userId", "username email firstName lastName");

        if (!studentPerformance) return res.status(404).json({ message: "Student performance record not found" });

        res.status(200).json(studentPerformance);
    } catch (error) {
        res.status(500).json({ message: "Error fetching student performance record", error });
    }
};

// Update Student Performance
exports.updateStudentPerformance = async (req, res) => {
    try {
        const { totalStudyTime, totalScore, paperCount } = req.body;

        // Calculate the updated average score
        const averageScore = paperCount > 0 ? totalScore / paperCount : 0;

        const updatedStudentPerformance = await StudentPerformance.findByIdAndUpdate(
            req.params.id,
            { totalStudyTime, totalScore, paperCount, averageScore },
            { new: true }
        );

        if (!updatedStudentPerformance) return res.status(404).json({ message: "Student performance record not found" });

        res.status(200).json({ message: "Student performance updated successfully!", updatedStudentPerformance });
    } catch (error) {
        res.status(500).json({ message: "Error updating student performance", error });
    }
};

// Delete Student Performance
exports.deleteStudentPerformance = async (req, res) => {
    try {
        const deletedStudentPerformance = await StudentPerformance.findByIdAndDelete(req.params.id);
        if (!deletedStudentPerformance) return res.status(404).json({ message: "Student performance record not found" });

        res.status(200).json({ message: "Student performance deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting student performance", error });
    }
};


exports.getStudentPerformanceByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const studentPerformance = await StudentPerformance.findOne({ userId })
            .populate("userId", "username email firstName lastName");

        if (!studentPerformance) {
            return res.status(200).json(null);
        }

        res.status(200).json(studentPerformance);
    } catch (error) {
        res.status(500).json({ message: "Error fetching student performance record", error });
    }
};


exports.updateStudentPerformanceByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const { totalStudyTime, totalScore, paperCount } = req.body;

        // Calculate the updated average score
        const averageScore = paperCount > 0 ? totalScore / paperCount : 0;

        const updatedStudentPerformance = await StudentPerformance.findOneAndUpdate(
            { userId },
            { totalStudyTime, totalScore, paperCount, averageScore },
            { new: true }
        );

        if (!updatedStudentPerformance) {
            return res.status(404).json({ message: "Student performance record not found" });
        }

        res.status(200).json({ message: "Student performance updated successfully!", updatedStudentPerformance });
    } catch (error) {
        res.status(500).json({ message: "Error updating student performance", error });
    }
};