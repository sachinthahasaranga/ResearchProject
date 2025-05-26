const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, feedbackController.createFeedback);
router.get("/video/:videoLectureId", feedbackController.getFeedbacksByLecture);
router.get("/user/:userId", feedbackController.getFeedbacksByUser);  // All feedback by user
router.get("/user/:userId/video/:videoLectureId", feedbackController.getFeedbackByUserAndVideo); // Specific feedback by user and video
router.get("/:id", feedbackController.getFeedbackById);
router.delete("/:id", authMiddleware, feedbackController.deleteFeedback);

module.exports = router;
