const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
} = require("../controllers/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/refresh-token", handleRefreshToken);
router.get("/all", getUsers);
router.get("/:id", authMiddleware, getUser);
router.put("/edit", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, isAdmin, deleteUser);
router.put("/block/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock/:id", authMiddleware, isAdmin, unblockUser);
module.exports = router;
