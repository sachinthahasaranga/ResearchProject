const DifficultyLevel = require("../models/DifficultyLevel");

// Create Difficulty Level
exports.createDifficultyLevel = async (req, res) => {
    try {
        const { difficultyName, difficultyWeight, status } = req.body;

        // Check if difficulty name already exists
        const existingLevel = await DifficultyLevel.findOne({ difficultyName });
        if (existingLevel) return res.status(400).json({ message: "Difficulty level already exists." });

        const newDifficulty = new DifficultyLevel({ difficultyName, difficultyWeight, status });
        await newDifficulty.save();
        res.status(201).json({ message: "Difficulty level created successfully!", newDifficulty });
    } catch (error) {
        res.status(500).json({ message: "Error creating difficulty level", error });
    }
};

// Get all Difficulty Levels
exports.getDifficultyLevels = async (req, res) => {
    try {
        const difficultyLevels = await DifficultyLevel.find();
        res.status(200).json(difficultyLevels);
    } catch (error) {
        res.status(500).json({ message: "Error fetching difficulty levels", error });
    }
};

// Get single Difficulty Level by ID
exports.getDifficultyLevelById = async (req, res) => {
    try {
        const difficultyLevel = await DifficultyLevel.findById(req.params.id);
        if (!difficultyLevel) return res.status(404).json({ message: "Difficulty level not found" });
        res.status(200).json(difficultyLevel);
    } catch (error) {
        res.status(500).json({ message: "Error fetching difficulty level", error });
    }
};

// Update Difficulty Level
exports.updateDifficultyLevel = async (req, res) => {
    try {
        const { difficultyName, difficultyWeight, status } = req.body;
        const updatedDifficulty = await DifficultyLevel.findByIdAndUpdate(
            req.params.id,
            { difficultyName, difficultyWeight, status },
            { new: true }
        );
        if (!updatedDifficulty) return res.status(404).json({ message: "Difficulty level not found" });
        res.status(200).json(updatedDifficulty);
    } catch (error) {
        res.status(500).json({ message: "Error updating difficulty level", error });
    }
};

// Delete Difficulty Level
exports.deleteDifficultyLevel = async (req, res) => {
    try {
        const deletedDifficulty = await DifficultyLevel.findByIdAndDelete(req.params.id);
        if (!deletedDifficulty) return res.status(404).json({ message: "Difficulty level not found" });
        res.status(200).json({ message: "Difficulty level deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting difficulty level", error });
    }
};
