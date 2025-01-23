const ListeningScore = require('../models/listeningScoreModel'); // Import the model

// Create a new listening score
exports.createListeningScore = async (req, res) => {
  const { userId, listeningId, totalScore, qnaScore } = req.body;

  try {
    // Validate required fields
    if (!userId || !listeningId || totalScore == null || !Array.isArray(qnaScore)) {
      return res.status(400).json({ error: 'Missing required fields or invalid data' });
    }

    // Create a new listening score
    const newScore = new ListeningScore({
      userId,
      listeningId,
      totalScore,
      qnaScore,
    });

    // Save the new score
    const savedScore = await newScore.save();

    // Update the `isBest` field for this user
    await updateIsBest(userId);

    res.status(201).json({
      message: 'Listening score created successfully',
      data: savedScore,
    });
  } catch (error) {
    console.error('Error creating listening score:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Read all listening scores for a user
exports.getListeningScoresByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch all listening scores for the given user
    const scores = await ListeningScore.find({ userId }).populate('listeningId qnaScore.qnaId');

    if (scores.length === 0) {
      return res.status(404).json({ error: 'No listening scores found for this user' });
    }

    res.status(200).json(scores);
  } catch (error) {
    console.error('Error fetching listening scores:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Helper function to update the `isBest` field
const updateIsBest = async (userId) => {
  try {
    // Fetch all scores for the user
    const scores = await ListeningScore.find({ userId });

    if (scores.length === 0) return; // No scores to process

    // Find the highest total score
    let bestScoreId = null;
    let highestScore = 0;

    scores.forEach((score) => {
      if (score.totalScore > highestScore) {
        highestScore = score.totalScore;
        bestScoreId = score._id;
      }
    });

    // Update all scores: set `isBest` to true for the highest and false for others
    for (const score of scores) {
      score.isBest = score._id.toString() === bestScoreId.toString();
      await score.save();
    }
  } catch (error) {
    console.error('Error updating isBest:', error);
  }
};
