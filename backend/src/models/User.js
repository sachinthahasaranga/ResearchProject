const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    difficultyLevel: { type: mongoose.Schema.Types.ObjectId, ref: "DifficultyLevel", required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "UserRole", required: true },
    status: { type: Number, enum: [0, 1], default: 1 }, // 0 - inactive, 1 - active
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
