const Paper = require("../models/Paper");

// Create Paper
exports.createPaper = async (req, res) => {
    try {
        const { paperTitle, recommendedAge, difficultyLevel, totalTime } = req.body;
        const createdBy = req.user.userId; // Extract from authenticated user

        const newPaper = new Paper({
            paperTitle,
            recommendedAge,
            difficultyLevel,
            totalTime,
            createdBy
        });

        await newPaper.save();
        res.status(201).json({ message: "Paper created successfully!", newPaper });
    } catch (error) {
        res.status(500).json({ message: "Error creating paper", error });
    }
};

// Get All Papers
exports.getPapers = async (req, res) => {
    try {
        const papers = await Paper.find().populate("difficultyLevel").populate("createdBy", "username email");
        res.status(200).json(papers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching papers", error });
    }
};

// Get Single Paper by ID
exports.getPaperById = async (req, res) => {
    try {
        const paper = await Paper.findById(req.params.id).populate("difficultyLevel").populate("createdBy", "username email");
        if (!paper) return res.status(404).json({ message: "Paper not found" });
        res.status(200).json(paper);
    } catch (error) {
        res.status(500).json({ message: "Error fetching paper", error });
    }
};

// Update Paper
exports.updatePaper = async (req, res) => {
    try {
        const { paperTitle, recommendedAge, difficultyLevel, totalTime } = req.body;
        const updatedPaper = await Paper.findByIdAndUpdate(
            req.params.id,
            { paperTitle, recommendedAge, difficultyLevel, totalTime },
            { new: true }
        );
        if (!updatedPaper) return res.status(404).json({ message: "Paper not found" });
        res.status(200).json({ message: "Paper updated successfully!", updatedPaper });
    } catch (error) {
        res.status(500).json({ message: "Error updating paper", error });
    }
};

// Delete Paper
exports.deletePaper = async (req, res) => {
    try {
        const deletedPaper = await Paper.findByIdAndDelete(req.params.id);
        if (!deletedPaper) return res.status(404).json({ message: "Paper not found" });
        res.status(200).json({ message: "Paper deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting paper", error });
    }
};
