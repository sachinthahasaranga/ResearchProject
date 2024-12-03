const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Node.js endpoint to get similarity scores
app.post('/get-similarity', async (req, res) => {
    const { sentence1, sentence2 } = req.body;

    try {
        // Call the Flask API
        const response = await axios.post('http://127.0.0.1:5000/predict', {
            sentence1: sentence1,
            sentence2: sentence2
        });

        // Return the similarity score from Flask API
        res.json(response.data);
    } catch (error) {
        console.error("Error calling Flask API:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the Node.js server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Node.js server running on http://localhost:${PORT}`);
});
