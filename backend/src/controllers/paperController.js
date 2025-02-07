const Paper = require("../models/paperModel");

// Create Paper
exports.createPaper = async (req, res) => {
  try {
    const paper = await Paper.create(req.body);
    res.status(201).json(paper);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Papers
exports.getPapers = async (req, res) => {
  try {
    const papers = await Paper.find().populate("questions");
    res.status(200).json(papers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Paper by ID
exports.getPaperById = async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id).populate("questions");
    if (!paper) return res.status(404).json({ message: "Paper not found" });
    res.status(200).json(paper);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update Paper
exports.updatePaper = async (req, res) => {
  try {
    const paper = await Paper.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!paper) return res.status(404).json({ message: "Paper not found" });
    res.status(200).json(paper);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Paper
exports.deletePaper = async (req, res) => {
  try {
    const paper = await Paper.findByIdAndDelete(req.params.id);
    if (!paper) return res.status(404).json({ message: "Paper not found" });
    res.status(200).json({ message: "Paper deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

