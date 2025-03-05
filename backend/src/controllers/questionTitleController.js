const QuestionTitle = require("../models/QuestionTitle");

// Create Question Title
exports.createQuestionTitle = async (req, res) => {
    try {
        const { title, assignMarks, paper } = req.body;
        const createdBy = req.user.userId; // Extract from authenticated user

        const newQuestionTitle = new QuestionTitle({
            title,
            assignMarks,
            paper,
            createdBy
        });

        await newQuestionTitle.save();
        res.status(201).json({ message: "Question title created successfully!", newQuestionTitle });
    } catch (error) {
        res.status(500).json({ message: "Error creating question title", error });
    }
};

// Get All Question Titles
exports.getQuestionTitles = async (req, res) => {
    try {
        const questionTitles = await QuestionTitle.find()
            .populate("paper", "paperTitle")
            .populate("createdBy", "username email");

        res.status(200).json(questionTitles);
    } catch (error) {
        res.status(500).json({ message: "Error fetching question titles", error });
    }
};

// Get Single Question Title by ID
exports.getQuestionTitleById = async (req, res) => {
    try {
        const questionTitle = await QuestionTitle.findById(req.params.id)
            .populate("paper", "paperTitle")
            .populate("createdBy", "username email");

        if (!questionTitle) return res.status(404).json({ message: "Question title not found" });

        res.status(200).json(questionTitle);
    } catch (error) {
        res.status(500).json({ message: "Error fetching question title", error });
    }
};

// Update Question Title
exports.updateQuestionTitle = async (req, res) => {
    try {
        const { title, assignMarks, paper } = req.body;

        const updatedQuestionTitle = await QuestionTitle.findByIdAndUpdate(
            req.params.id,
            { title, assignMarks, paper },
            { new: true }
        );

        if (!updatedQuestionTitle) return res.status(404).json({ message: "Question title not found" });

        res.status(200).json({ message: "Question title updated successfully!", updatedQuestionTitle });
    } catch (error) {
        res.status(500).json({ message: "Error updating question title", error });
    }
};

// Delete Question Title
exports.deleteQuestionTitle = async (req, res) => {
    try {
        const deletedQuestionTitle = await QuestionTitle.findByIdAndDelete(req.params.id);
        if (!deletedQuestionTitle) return res.status(404).json({ message: "Question title not found" });

        res.status(200).json({ message: "Question title deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting question title", error });
    }
};
