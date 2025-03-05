const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./src/config/db')

const authRoutes = require('./src/routes/authRoutes');

const lstnRoutes = require('./src/routes/listeningRoutes');
const qnaRoutes = require('./src/routes/qnaRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const lstnScoreRoutes = require('./src/routes/listeningScoreRoutes');

const userRoutes = require('./src/routes/userRoutes');
const difficultyLevelRoutes = require("./src/routes/difficultyLevelRoutes");
const userRoleRoutes = require("./src/routes/userRoleRoutes");
const paperRoutes = require("./src/routes/paperRoutes");
const questionTitleRoutes = require("./src/routes/questionTitleRoutes");
const questionRoutes = require("./src/routes/questionRoutes");
const studentPerformanceRoutes = require("./src/routes/studentPerformanceRoutes");
const studentPerformanceHistoryRoutes = require("./src/routes/studentPerformanceHistoryRoutes");


const predictRoutes = require("./src/routes/predictRoutes");


// Middleware to parse JSON
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);

// Routes
app.use('/api/lstn', lstnRoutes);
app.use('/api/qna', qnaRoutes);
app.use('/api/ctgry', categoryRoutes);
app.use('/api/lstnScore', lstnScoreRoutes)

//sachintha
app.use("/api/users", userRoutes);
app.use("/api/difficulty-levels", difficultyLevelRoutes);
app.use("/api/user-roles", userRoleRoutes);
app.use("/api/papers", paperRoutes);
app.use("/api/question-titles", questionTitleRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/student-performance", studentPerformanceRoutes);
app.use("/api/student-performance-history", studentPerformanceHistoryRoutes);

app.use("/api/prediction", predictRoutes);



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
