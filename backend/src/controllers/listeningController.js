const Listening = require('../models/listeningModel'); // Correctly capitalize "Listening"

// Create a new listening
exports.createlistening = async (req, res) => {
    try {
        const listening = new Listening(req.body); // Ensure req.body.QnA is an array of ObjectId strings
        const savedListening = await listening.save();
        res.status(201).json(savedListening);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Get all listenings
exports.getAlllistenings = async (req, res) => {
    try {
        //const listenings = await Listening.find().populate('QnA').populate('category'); // Correct model reference
        const listenings = await Listening.find();
        res.status(200).json(listenings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single listening by ID
exports.getlisteningById = async (req, res) => {
    try {
        //const listening = await Listening.findById(req.params.id).populate('QnA').populate('category'); // Correct model reference
        const listening = await Listening.findById(req.params.id);
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
        const updatedlistening = await Listening.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }); // Correct model reference
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
        const deletedlistening = await Listening.findByIdAndDelete(req.params.id); // Correct model reference
        if (!deletedlistening) {
            return res.status(404).json({ message: 'listening not found' });
        }
        res.status(200).json({ message: 'listening deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
