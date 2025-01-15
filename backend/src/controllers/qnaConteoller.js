const QnA = require('../models/qnaModel'); // Adjust the path as necessary

// Create a new QnA
exports.createQnA = async (req, res) => {
    try {
        const qna = new QnA(req.body);
        const savedQnA = await qna.save();
        res.status(201).json(savedQnA);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all QnAs
exports.getAllQnAs = async (req, res) => {
    try {
        const qnas = await QnA.find();
        res.status(200).json(qnas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single QnA by ID
exports.getQnAById = async (req, res) => {
    try {
        const qna = await QnA.findById(req.params.id);
        if (!qna) {
            return res.status(404).json({ message: 'QnA not found' });
        }
        res.status(200).json(qna);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a QnA
exports.updateQnA = async (req, res) => {
    try {
        const updatedQnA = await QnA.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedQnA) {
            return res.status(404).json({ message: 'QnA not found' });
        }
        res.status(200).json(updatedQnA);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a QnA
exports.deleteQnA = async (req, res) => {
    try {
        const deletedQnA = await QnA.findByIdAndDelete(req.params.id);
        if (!deletedQnA) {
            return res.status(404).json({ message: 'QnA not found' });
        }
        res.status(200).json({ message: 'QnA deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
