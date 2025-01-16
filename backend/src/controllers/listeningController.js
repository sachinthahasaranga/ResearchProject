const listening = require('../models/listeningModel'); // Adjust the path as necessary

// Create a new listening
exports.createlistening = async (req, res) => {
    try {
        const listening = new listening(req.body);
        const savedlistening = await listening.save();
        res.status(201).json(savedlistening);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all listenings
exports.getAlllistenings = async (req, res) => {
    try {
        const listenings = await listening.find().populate('QnA').populate('category');
        res.status(200).json(listenings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single listening by ID
exports.getlisteningById = async (req, res) => {
    try {
        const listening = await listening.findById(req.params.id).populate('QnA').populate('category');
        if (!listening) {
            return res.status(404).json({ message: 'listening not found' });
        }
        res.status(200).json(listening);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a listening
exports.updatelistening = async (req, res) => {
    try {
        const updatedlistening = await listening.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedlistening) {
            return res.status(404).json({ message: 'listening not found' });
        }
        res.status(200).json(updatedlistening);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a listening
exports.deletelistening = async (req, res) => {
    try {
        const deletedlistening = await listening.findByIdAndDelete(req.params.id);
        if (!deletedlistening) {
            return res.status(404).json({ message: 'listening not found' });
        }
        res.status(200).json({ message: 'listening deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
