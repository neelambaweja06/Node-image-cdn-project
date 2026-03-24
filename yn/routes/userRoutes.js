const express = require("express");
const router = express.Router();

const {
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers
} = require("../controllers/userController");

const verifyToken = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/adminMiddleware");

// ❗ ONLY ADMIN
router.get("/allusers/", verifyToken, isAdmin, getAllUsers);
router.put("/:id", verifyToken, isAdmin, updateUser);
router.delete("/:id", verifyToken, isAdmin, deleteUser);

// ✅ NORMAL USER + ADMIN (both allowed)
router.get("/:id", verifyToken, getUserById);

module.exports = router;