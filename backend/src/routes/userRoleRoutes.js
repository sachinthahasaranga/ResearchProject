const express = require("express");
const router = express.Router();
const userRoleController = require("../controllers/userRoleController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, userRoleController.createUserRole);
router.get("/", userRoleController.getUserRoles);
router.get("/:id", userRoleController.getUserRoleById);
router.put("/:id", authMiddleware, userRoleController.updateUserRole);
router.delete("/:id", authMiddleware, userRoleController.deleteUserRole);

module.exports = router;
