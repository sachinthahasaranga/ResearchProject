const cloudinary = require("../config/cloudinaryConfig");
const VideoLecture = require("../models/VideoLecture");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() }).fields([
  { name: "video", maxCount: 1 },
  { name: "image", maxCount: 1 }
]);

const uploadToCloudinary = (file, folder, resourceType) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    ).end(file.buffer);
  });
};

exports.createVideoLecture = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ message: "File upload error", err });

    try {
      const { lectureTitle, lectureDescription, categoryId, totalTime, difficultyLevel } = req.body;
      const createdBy = req.user.userId;

      const videoUrl = req.files.video ? await uploadToCloudinary(req.files.video[0], "videos", "video") : null;
      const imgUrl = req.files.image ? await uploadToCloudinary(req.files.image[0], "images", "image") : null;

      if (!videoUrl || !imgUrl) {
        return res.status(400).json({ message: "Video and Image upload required" });
      }

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
  });
};

exports.getVideoLectures = async (req, res) => {
  try {
    const lectures = await VideoLecture.find()
      .populate("categoryId", "categoryName")
      .populate("difficultyLevel", "difficultyName")
      .populate("createdBy", "username email");

    res.status(200).json(lectures);
  } catch (error) {
    res.status(500).json({ message: "Error fetching video lectures", error });
  }
};

exports.getVideoLectureById = async (req, res) => {
  try {
    const lecture = await VideoLecture.findById(req.params.id)
      .populate("categoryId", "categoryName")
      .populate("difficultyLevel")
      .populate("createdBy", "username email");

    if (!lecture) return res.status(404).json({ message: "Video Lecture not found" });
    res.status(200).json(lecture);
  } catch (error) {
    res.status(500).json({ message: "Error fetching video lecture", error });
  }
};

// exports.updateVideoLecture = async (req, res) => {
//   try {
//     const { lectureTitle, videoUrl, imgUrl, lectureDescription, categoryId, totalTime, difficultyLevel } = req.body;

//     const updatedLecture = await VideoLecture.findByIdAndUpdate(
//       req.params.id,
//       { lectureTitle, videoUrl, imgUrl, lectureDescription, categoryId, totalTime, difficultyLevel },
//       { new: true }
//     );

//     if (!updatedLecture) return res.status(404).json({ message: "Video Lecture not found" });
//     res.status(200).json({ message: "Video Lecture updated successfully!", updatedLecture });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating video lecture", error });
//   }
// };

exports.updateVideoLecture = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ message: "File upload error", err });

    try {
      const { lectureTitle, lectureDescription, categoryId, totalTime, difficultyLevel } = req.body;

      let updatedData = { lectureTitle, lectureDescription, categoryId, totalTime, difficultyLevel };

      const existingLecture = await VideoLecture.findById(req.params.id);
      if (!existingLecture) return res.status(404).json({ message: "Video Lecture not found" });

      updatedData.videoUrl = req.files.video
        ? await uploadToCloudinary(req.files.video[0], "videos", "video")
        : existingLecture.videoUrl;

      updatedData.imgUrl = req.files.image
        ? await uploadToCloudinary(req.files.image[0], "images", "image")
        : existingLecture.imgUrl;

      const updatedLecture = await VideoLecture.findByIdAndUpdate(req.params.id, updatedData, { new: true });

      res.status(200).json({ message: "Video Lecture updated successfully!", updatedLecture });
    } catch (error) {
      res.status(500).json({ message: "Error updating video lecture", error });
    }
  });
};

exports.deleteVideoLecture = async (req, res) => {
  try {
    const deletedLecture = await VideoLecture.findByIdAndDelete(req.params.id);
    if (!deletedLecture) return res.status(404).json({ message: "Video Lecture not found" });

    res.status(200).json({ message: "Video Lecture deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting video lecture", error });
  }
};
