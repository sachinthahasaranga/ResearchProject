const express = require("express");
const router = express.Router();
const studentPerformanceHistoryController = require("../controllers/studentPerformanceHistoryController");
const authMiddleware = require("../middleware/authMiddleware"); 

router.post("/", authMiddleware, studentPerformanceHistoryController.createStudentPerformanceHistory);
router.get("/", authMiddleware, studentPerformanceHistoryController.getStudentPerformanceHistories);
router.get("/:id", authMiddleware, studentPerformanceHistoryController.getStudentPerformanceHistoryById);
router.put("/:id", authMiddleware, studentPerformanceHistoryController.updateStudentPerformanceHistory);
router.delete("/:id", authMiddleware, studentPerformanceHistoryController.deleteStudentPerformanceHistory);

router.get("/user/:userId", authMiddleware, studentPerformanceHistoryController.getStudentPerformanceHistoryByUserId);
router.put("/user/:userId", authMiddleware, studentPerformanceHistoryController.updateStudentPerformanceHistoryByUserId);
module.exports = router;
