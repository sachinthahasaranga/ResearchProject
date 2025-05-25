const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserRole = require("../models/UserRole");
const cloudinary = require("../config/cloudinaryConfig");
const axios = require('axios')

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

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


// Register User
const registerUser = async (req, res) => {
    try {
        const { username, email, password, firstName, lastName, age, phoneNumber, difficultyLevel, status } = req.body;


        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or Email already exists" });
        }

        const userRole = await UserRole.findOne({ name: "User" });
        if (!userRole) {
            return res.status(500).json({ message: "Role 'User' not found. Please add it to the database." });
        }

        
        const imgUrl = req.file ? await uploadToCloudinary(req.file, "images", "image") : null;


        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            age,
            phoneNumber,
            difficultyLevel,
            role: userRole._id,
            status,
            faceImgUrl:imgUrl
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({
            token: generateToken(user._id),
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                phoneNumber: user.phoneNumber,
                difficultyLevel: user.difficultyLevel,
                role : user.role,
                status: user.status,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Login error", error });
    }
};

const faceLoginUser = async (req, res) => {
  try {
    const { email, capturedImage } = req.body;


    if (!email || !capturedImage) {
      return res.status(400).json({ message: "Email and captured image are required" });
    }

    const user = await User.findOne({ email });
    
 

    if (!user || !user.faceImgUrl) {
      return res.status(404).json({ message: "User not found or face image missing" });
    }


    // Send both images to Python API
    const response = await axios.post("http://localhost:5000/compare-faces", {
      captured_image: capturedImage,
      stored_image_url: user.faceImgUrl,
    });


    

    if (!response.data.success) {
      return res.status(401).json({ message: "Face authentication failed" });
    }

    console.log(response.status)

    // Successful match: return token + user
    res.json({
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" }),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        phoneNumber: user.phoneNumber,
        difficultyLevel: user.difficultyLevel,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Face login error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};


module.exports = { registerUser, loginUser,faceLoginUser };