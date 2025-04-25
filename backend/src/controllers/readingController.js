const Reading = require('../models/readingModel');
const axios = require('axios');

// Create a new reading
exports.createReading = async (req, res) => {
  try {
    const newReading = new Reading(req.body);
    const savedReading = await newReading.save();
    res.status(201).json(savedReading);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all readings
exports.getAllReadings = async (req, res) => {
  try {
    const readings = await Reading.find().populate('category');
    res.status(200).json(readings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single reading by ID
exports.getReadingById = async (req, res) => {
  try {
    const reading = await Reading.findById(req.params.id).populate('category');
    if (!reading) return res.status(404).json({ message: 'Reading not found' });
    res.status(200).json(reading);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a reading
exports.updateReading = async (req, res) => {
  try {
    const updatedReading = await Reading.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedReading) return res.status(404).json({ message: 'Reading not found' });
    res.status(200).json(updatedReading);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a reading
exports.deleteReading = async (req, res) => {
  try {
    const deletedReading = await Reading.findByIdAndDelete(req.params.id);
    if (!deletedReading) return res.status(404).json({ message: 'Reading not found' });
    res.status(200).json({ message: 'Reading deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.analyzeReading = async (req, res) => {
    try {
      const { original, given } = req.body;
  
      if (!original || !given) {
        return res.status(400).json({ message: "Both 'original' and 'given' text are required." });
      }
  
      const response = await axios.post('http://127.0.0.1:5000/analyze', {
        original,
        given
      });
  
      return res.status(200).json(response.data);
  
    } catch (error) {
      console.error("Error calling analysis model:", error.message);
      return res.status(500).json({ message: "Failed to analyze reading." });
    }
  };
