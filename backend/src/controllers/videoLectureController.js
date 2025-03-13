const VideoLecture = require("../models/VideoLecture");

// Create Video Lecture
exports.createVideoLecture = async (req, res) => {
    try {
        const { lectureTitle, videoUrl,imgUrl, lectureDescription, categoryId, totalTime, difficultyLevel } = req.body;
        const createdBy = req.user.userId; // Extract from authenticated user

        const newLecture = new VideoLecture({
            lectureTitle,
            videoUrl,
            imgUrl,
            lectureDescription,
            categoryId,
            totalTime,
            difficultyLevel,
            createdBy
        });

        await newLecture.save();
        res.status(201).json({ message: "Video Lecture created successfully!", newLecture });
    } catch (error) {
        res.status(500).json({ message: "Error creating video lecture", error });
    }
};

// Get All Video Lectures
exports.getVideoLectures = async (req, res) => {
    try {
        const lectures = await VideoLecture.find()
            .populate("categoryId", "categoryName") // Assuming category has a field called "categoryName"
            .populate("difficultyLevel", "level")
            .populate("createdBy", "username email");

        res.status(200).json(lectures);
    } catch (error) {
        res.status(500).json({ message: "Error fetching video lectures", error });
    }
};

// Get Single Video Lecture by ID
exports.getVideoLectureById = async (req, res) => {
    try {
        const lecture = await VideoLecture.findById(req.params.id)
            .populate("categoryId", "categoryName")
            .populate("difficultyLevel", "level")
            .populate("createdBy", "username email");

        if (!lecture) return res.status(404).json({ message: "Video Lecture not found" });
        res.status(200).json(lecture);
    } catch (error) {
        res.status(500).json({ message: "Error fetching video lecture", error });
    }
};


exports.updateVideoLecture = async (req, res) => {
    try {
        const { lectureTitle, videoUrl,imgUrl, lectureDescription, categoryId, totalTime, difficultyLevel } = req.body;

        const updatedLecture = await VideoLecture.findByIdAndUpdate(
            req.params.id,
            { lectureTitle, videoUrl,imgUrl, lectureDescription, categoryId, totalTime, difficultyLevel },
            { new: true }
        );

        if (!updatedLecture) return res.status(404).json({ message: "Video Lecture not found" });
        res.status(200).json({ message: "Video Lecture updated successfully!", updatedLecture });
    } catch (error) {
        res.status(500).json({ message: "Error updating video lecture", error });
    }
};

// Delete Video Lecture
exports.deleteVideoLecture = async (req, res) => {
    try {
        const deletedLecture = await VideoLecture.findByIdAndDelete(req.params.id);
        if (!deletedLecture) return res.status(404).json({ message: "Video Lecture not found" });

        res.status(200).json({ message: "Video Lecture deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting video lecture", error });
    }
};
