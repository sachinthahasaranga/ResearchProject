const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  correct_answer: { type: String, required: true },
  answer_explanation: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Answer", AnswerSchema);
