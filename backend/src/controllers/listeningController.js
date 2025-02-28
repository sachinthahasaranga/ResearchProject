const Listening = require('../models/listeningModel');

// Create a new listening
exports.createListening = async (req, res) => {
    try {
        const { name, audio, difficultyLevel, mainSession, QnA, category } = req.body;
        const listening = new Listening({ name, audio, difficultyLevel, mainSession, QnA, category });
        const savedListening = await listening.save();
        res.status(201).json(savedListening);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all listenings
exports.getAllListenings = async (req, res) => {
    try {
        const listenings = await Listening.find().populate('QnA').populate('category');
        res.status(200).json(listenings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single listening by ID
exports.getListeningById = async (req, res) => {
    try {
        const listening = await Listening.findById(req.params.id).populate('QnA').populate('category');
        if (!listening) {
            return res.status(404).json({ message: 'Listening not found' });
        }
        res.status(200).json(listening);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get listenings by category ID
exports.getListeningsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const listenings = await Listening.find({ category: categoryId }).populate('QnA').populate('category');

        if (listenings.length === 0) {
            return res.status(404).json({ message: 'No listenings found for this category' });
        }

        res.status(200).json(listenings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get listenings by difficulty level
exports.getListeningsByDifficulty = async (req, res) => {
    try {
        const { difficultyLevel } = req.params;
        const listenings = await Listening.find({ difficultyLevel }).populate('QnA').populate('category');

        if (listenings.length === 0) {
            return res.status(404).json({ message: 'No listenings found for this difficulty level' });
        }

        res.status(200).json(listenings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get listenings by category ID and difficulty level
exports.getListeningsByCategoryAndDifficulty = async (req, res) => {
    try {
        const { categoryId, difficultyLevel } = req.params;
        const listenings = await Listening.find({ category: categoryId, difficultyLevel }).populate('QnA').populate('category');

        if (listenings.length === 0) {
            return res.status(404).json({ message: 'No listenings found for this category and difficulty level' });
        }

        res.status(200).json(listenings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a listening
exports.updateListening = async (req, res) => {
    try {
        const { name, audio, difficultyLevel, mainSession, QnA, category } = req.body;
        const updatedListening = await Listening.findByIdAndUpdate(
            req.params.id,
            { name, audio, difficultyLevel, mainSession, QnA, category },
            { new: true, runValidators: true }
        );
        if (!updatedListening) {
            return res.status(404).json({ message: 'Listening not found' });
        }
        res.status(200).json(updatedListening);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a listening
exports.deleteListening = async (req, res) => {
    try {
        const deletedListening = await Listening.findByIdAndDelete(req.params.id);
        if (!deletedListening) {
            return res.status(404).json({ message: 'Listening not found' });
        }
        res.status(200).json({ message: 'Listening deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
