const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserRole = require("../models/UserRole");

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
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
            status
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


module.exports = { registerUser, loginUser };