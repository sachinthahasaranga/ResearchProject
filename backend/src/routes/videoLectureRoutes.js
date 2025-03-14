const express = require("express");
const router = express.Router();
const videoLectureController = require("../controllers/videoLectureController");
const authMiddleware = require("../middleware/authMiddleware");

// Routes for Video Lectures
router.post("/", authMiddleware, videoLectureController.createVideoLecture);
router.get("/", authMiddleware, videoLectureController.getVideoLectures);
router.get("/:id", authMiddleware, videoLectureController.getVideoLectureById);
router.put("/:id", authMiddleware, videoLectureController.updateVideoLecture);
router.delete("/:id", authMiddleware, videoLectureController.deleteVideoLecture);

module.exports = router;
