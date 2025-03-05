const UserRole = require("../models/UserRole");

// Create a new User Role
exports.createUserRole = async (req, res) => {
    try {
        const { name, status } = req.body;

        // Check if the role already exists
        const existingRole = await UserRole.findOne({ name });
        if (existingRole) return res.status(400).json({ message: "User role already exists." });

        const newUserRole = new UserRole({ name, status });
        await newUserRole.save();

        res.status(201).json({ message: "User role created successfully!", newUserRole });
    } catch (error) {
        res.status(500).json({ message: "Error creating user role", error });
    }
};

// Get all User Roles
exports.getUserRoles = async (req, res) => {
    try {
        const userRoles = await UserRole.find();
        res.status(200).json(userRoles);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user roles", error });
    }
};

// Get a single User Role by ID
exports.getUserRoleById = async (req, res) => {
    try {
        const userRole = await UserRole.findById(req.params.id);
        if (!userRole) return res.status(404).json({ message: "User role not found" });
        res.status(200).json(userRole);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user role", error });
    }
};

// Update User Role
exports.updateUserRole = async (req, res) => {
    try {
        const { name, status } = req.body;
        const updatedUserRole = await UserRole.findByIdAndUpdate(
            req.params.id,
            { name, status },
            { new: true }
        );
        if (!updatedUserRole) return res.status(404).json({ message: "User role not found" });

        res.status(200).json({ message: "User role updated successfully!", updatedUserRole });
    } catch (error) {
        res.status(500).json({ message: "Error updating user role", error });
    }
};

// Delete User Role
exports.deleteUserRole = async (req, res) => {
    try {
        const deletedUserRole = await UserRole.findByIdAndDelete(req.params.id);
        if (!deletedUserRole) return res.status(404).json({ message: "User role not found" });

        res.status(200).json({ message: "User role deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user role", error });
    }
};
