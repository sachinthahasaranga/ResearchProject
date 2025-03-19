const User = require("../models/User");
const bcrypt = require("bcrypt");


// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().populate("difficultyLevel").populate("role");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

// Get single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("difficultyLevel").populate("role");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const { firstName, lastName, age, phoneNumber, difficultyLevel, status } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, age, phoneNumber, difficultyLevel, status },
            { new: true }
        );
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};
