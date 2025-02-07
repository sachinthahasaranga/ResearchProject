const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  paper_id: { type: mongoose.Schema.Types.ObjectId, ref: "Paper", required: true },
  question_text: { type: String, required: true },
  question_type: { 
    type: String, 
    enum: ["MCQ", "Short Answer", "True/False", "Structured"], 
    required: true 
  },
  difficulty_level: { type: String, enum: ["easy", "medium", "hard"], required: true },
  options: [{ type: String }], // For MCQs
  correct_answer: { type: String }, // For Structured Questions
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Question", QuestionSchema);
