const express = require("express");
const router = express.Router();
const studentPerformanceController = require("../controllers/studentPerformanceController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, studentPerformanceController.createStudentPerformance);
router.get("/", authMiddleware, studentPerformanceController.getStudentPerformances);
router.get("/:id", authMiddleware, studentPerformanceController.getStudentPerformanceById);
router.put("/:id", authMiddleware, studentPerformanceController.updateStudentPerformance);
router.delete("/:id", authMiddleware, studentPerformanceController.deleteStudentPerformance);

module.exports = router;
