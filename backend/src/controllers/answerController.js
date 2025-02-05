const Answer = require("../models/answerModel");

// Create Answer
exports.createAnswer = async (req, res) => {
  try {
    const answer = await Answer.create(req.body);
    res.status(201).json(answer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Answers
exports.getAnswers = async (req, res) => {
  try {
    const answers = await Answer.find().populate("question_id");
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Answer by ID
exports.getAnswerById = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id).populate("question_id");
    if (!answer) return res.status(404).json({ message: "Answer not found" });
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
