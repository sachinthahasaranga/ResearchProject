const Reading = require('../models/readingModel');
const axios = require('axios');
const fs = require('fs');
const multer = require('multer');
const { SpeechClient } = require('@google-cloud/speech');
const { AssemblyAI } = require('assemblyai');
require('dotenv').config();

// Setup Google Speech client using custom key path
const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY,
});

// Multer config to handle audio upload
const upload = multer({ dest: 'uploads/' });
exports.uploadAudio = upload.single('audio');

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

// Analyze reading text
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

// Get readings by category ID
exports.getReadingsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const readings = await Reading.find({ category: categoryId }).populate('category');
    res.status(200).json(readings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Transcribe uploaded audio using Google STT
exports.transcribeReading = async (req, res) => {
  const filePath = req.file.path; // audio uploaded via Multer

  try {
    // Step 1: Upload the file to AssemblyAI
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const uploadResponse = await axios.post('https://api.assemblyai.com/v2/upload', formData, {
      headers: {
        ...formData.getHeaders(),
        authorization: process.env.ASSEMBLYAI_API_KEY,
      },
    });

    const audioUrl = uploadResponse.data.upload_url;

    // Step 2: Transcription params
    const params = {
      audio_url: audioUrl,
      speech_model: 'slam-1',
    };

    // Step 3: Request transcription
    const transcript = await client.transcripts.transcribe(params);

    if (transcript.status === 'error') {
      console.error(`Transcription failed: ${transcript.error}`);
      return res.status(500).json({ message: 'Transcription failed', error: transcript.error });
    }

    // Step 4: Return the transcription
    return res.status(200).json({ transcript: transcript.text });
  } catch (error) {
    console.error('AssemblyAI transcription error:', error.message || error);
    return res.status(500).json({ message: 'Failed to transcribe audio.' });
  } finally {
    fs.unlinkSync(filePath); // Cleanup uploaded file
  }
};
