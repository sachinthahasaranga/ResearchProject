const Feedback = require("../models/Feedback");


exports.createFeedback = async (req, res) => {
  try {
    const { feedback, rating, videoLectureId, userId } = req.body;

    if (!feedback || !rating || !videoLectureId || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Feedback.findOne({ videoLectureId, userId });
    if (existing) {
      return res.status(409).json({ message: "You have already submitted feedback for this video." });
    }

    const newFeedback = new Feedback({ feedback, rating, videoLectureId, userId });
    await newFeedback.save();

    res.status(201).json({ message: "Feedback submitted!", newFeedback });
  } catch (err) {
    res.status(500).json({ message: "Error submitting feedback", err });
  }
};

// Get all feedback for a video lecture
exports.getFeedbacksByLecture = async (req, res) => {
  try {
    const { videoLectureId } = req.params;
    const feedbacks = await Feedback.find({ videoLectureId })
      .populate('userId', 'username email')
      .sort('-createdAt');
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching feedbacks", err });
  }
};

exports.getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find()
          .populate('userId', 'username')
          .populate('videoLectureId', 'lectureTitle');
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Feedbacks", error });
    }
};

// Get single feedback by ID
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate('userId', 'username email');
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json(feedback);
  } catch (err) {
    res.status(500).json({ message: "Error fetching feedback", err });
  }
};

// Delete feedback (by feedback owner or admin logic if you want)
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    // Optional: Check if req.user.userId === feedback.userId before deleting
    await Feedback.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Feedback deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting feedback", err });
  }
};


// Get all feedback by a specific user
exports.getFeedbacksByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const feedbacks = await Feedback.find({ userId })
      .populate('videoLectureId', 'lectureTitle')
      .sort('-createdAt');
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user's feedbacks", err });
  }
};

// Get feedback by user and video lecture
exports.getFeedbackByUserAndVideo = async (req, res) => {
  try {
    const { userId, videoLectureId } = req.params;
    const feedback = await Feedback.findOne({ userId, videoLectureId })
      .populate('videoLectureId', 'lectureTitle')
      .populate('userId', 'username email');
    if (!feedback) return res.status(404).json({ message: "Feedback not found for this user and video" });
    res.status(200).json(feedback);
  } catch (err) {
    res.status(500).json({ message: "Error fetching feedback", err });
  }
};