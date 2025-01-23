const QnA = require('../models/QnAModel'); // Adjust the path as necessary
const axios = require('axios');


// Create a new QnA
exports.createQnA = async (req, res) => {
    try {
        const qna = new QnA(req.body); // Expecting { question, answer } in req.body
        const savedQnA = await qna.save();
        res.status(201).json(savedQnA);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all QnAs
exports.getAllQnAs = async (req, res) => {
    try {
        const qnas = await QnA.find(); // Returns all question-answer pairs
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

exports.getSimilarity = async (req, res) => {
    const { word1, word2 } = req.body;

    // Log request body
    console.log('Received request:', { word1, word2 });

    // Validate input
    if (!Array.isArray(word1) || !Array.isArray(word2) || word1.length !== word2.length) {
        return res.status(400).json({
            error: 'word1 and word2 must be non-empty arrays of the same length',
        });
    }

    try {
        // Log before sending request
        console.log('Sending to Flask:', { word1, word2 });

        // Make a POST request to the Flask app
        const flaskResponse = await axios.post('http://127.0.0.1:5000/cosine-similarity', {
            word1,
            word2,
        });

        // Log Flask response
        console.log('Response from Flask:', flaskResponse.data);

        // Return the result from Flask to the client
        res.json(flaskResponse.data);
    } catch (error) {
        // Log error details
        console.error('Error connecting to Flask app:', error.message, error.response?.data);

        res.status(500).json({
            error: 'Failed to process the request',
            details: error.response?.data || 'No additional details',
        });
    }
};
