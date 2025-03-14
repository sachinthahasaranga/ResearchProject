const Question = require("../models/Question");

// Create Question
exports.createQuestion = async (req, res) => {
    try {
        const { questionTitle, answer, nlpRequired, questionTitleId } = req.body;
        const createdBy = req.user.userId; // Extract from authenticated user

        const newQuestion = new Question({
            questionTitle,
            answer,
            nlpRequired,
            questionTitleId,
            createdBy
        });

        await newQuestion.save();
        res.status(201).json({ message: "Question created successfully!", newQuestion });
    } catch (error) {
        res.status(500).json({ message: "Error creating question", error });
    }
};

// Get All Questions
exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find()
            .populate("questionTitleId", "title assignMarks")
            .populate("createdBy", "username email");

        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching questions", error });
    }
};

// Get Single Question by ID
exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id)
            .populate("questionTitleId", "title assignMarks")
            .populate("createdBy", "username email");

        if (!question) return res.status(404).json({ message: "Question not found" });

        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: "Error fetching question", error });
    }
};

// Update Question
exports.updateQuestion = async (req, res) => {
    try {
        const { questionTitle, answer, nlpRequired, questionTitleId } = req.body;

        const updatedQuestion = await Question.findByIdAndUpdate(
            req.params.id,
            { questionTitle, answer, nlpRequired, questionTitleId },
            { new: true }
        );

        if (!updatedQuestion) return res.status(404).json({ message: "Question not found" });

        res.status(200).json({ message: "Question updated successfully!", updatedQuestion });
    } catch (error) {
        res.status(500).json({ message: "Error updating question", error });
    }
};

// Delete Question
exports.deleteQuestion = async (req, res) => {
    try {
        const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
        if (!deletedQuestion) return res.status(404).json({ message: "Question not found" });

        res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting question", error });
    }
};


exports.getQuestionsByQuestionTitleId = async (req, res) => {
    try {
        const { questionTitleId } = req.params;

        const questions = await Question.find({ questionTitleId })
            .populate("questionTitleId", "title assignMarks")
            .populate("createdBy", "username email");

        if (!questions || questions.length === 0)
            return res.status(404).json({ message: "No questions found for this question title." });

        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching questions", error });
    }
};