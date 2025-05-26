const express = require("express");
const router = express.Router();
const authController = require("../authentication/authController");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


router.post("/login", authController.loginUser);
router.post("/register",upload.single('faceImage'), authController.registerUser);
router.post("/face-login", authController.faceLoginUser);

module.exports = router;