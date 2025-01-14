const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const lstnRoutes = require('./src/routes/listeningRoutes');

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/lstn', lstnRoutes);



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
