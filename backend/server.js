const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./src/config/db')

const lstnRoutes = require('./src/routes/listeningRoutes');
const qnaRoutes = require('./src/routes/qnaRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const lstnScoreRoutes = require('./src/routes/listeningScoreRoutes');

const paperRoutes = require("./src/routes/paperRoutes");
const questionRoutes = require("./src/routes/questionRoutes");
const answerRoutes = require("./src/routes/answerRoutes");

const predictRoutes = require("./src/routes/predictRoutes");


// Middleware to parse JSON
app.use(express.json());
app.use(cors());

connectDB();

// Routes
app.use('/api/lstn', lstnRoutes);
app.use('/api/qna', qnaRoutes);
app.use('/api/ctgry', categoryRoutes);
app.use('/api/lstnScore', lstnScoreRoutes)

app.use("/api/papers", paperRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);

app.use("/api/prediction", predictRoutes);



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
