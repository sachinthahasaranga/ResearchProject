const Listening = require('../models/listeningModel');

// Create a new listening
exports.createListening = async (req, res) => {
    try {
        const { audio, difficultyLevel, mainSession, QnA, category } = req.body; // Destructure fields
        const listening = new Listening({ audio, difficultyLevel, mainSession, QnA, category }); // Create the instance
        const savedListening = await listening.save(); // Save to the database
        res.status(201).json(savedListening); // Respond with the saved listening
    } catch (error) {
        res.status(400).json({ message: error.message }); // Handle errors
    }
};

// Get all listenings
exports.getAllListenings = async (req, res) => {
    try {
        // Populate QnA and category fields
        const listenings = await Listening.find().populate('QnA').populate('category');
        res.status(200).json(listenings); // Respond with the list of listenings
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Get a single listening by ID
exports.getListeningById = async (req, res) => {
    try {
        // Find by ID and populate QnA and category fields
        const listening = await Listening.findById(req.params.id).populate('QnA').populate('category');
        if (!listening) {
            return res.status(404).json({ message: 'Listening not found' }); // Handle not found
        }
        res.status(200).json(listening); // Respond with the listening
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Update a listening
exports.updateListening = async (req, res) => {
    try {
        const { audio, difficultyLevel, mainSession, QnA, category } = req.body; // Destructure fields
        const updatedListening = await Listening.findByIdAndUpdate(
            req.params.id,
            { audio, difficultyLevel, mainSession, QnA, category },
            { new: true, runValidators: true } // Return updated document and validate
        );
        if (!updatedListening) {
            return res.status(404).json({ message: 'Listening not found' }); // Handle not found
        }
        res.status(200).json(updatedListening); // Respond with the updated listening
    } catch (error) {
        res.status(400).json({ message: error.message }); // Handle errors
    }
};

// Delete a listening
exports.deleteListening = async (req, res) => {
    try {
        const deletedListening = await Listening.findByIdAndDelete(req.params.id);
        if (!deletedListening) {
            return res.status(404).json({ message: 'Listening not found' }); // Handle not found
        }
        res.status(200).json({ message: 'Listening deleted successfully' }); // Respond with success
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};
