import express from "express";
import { protect, owner } from "../middleware/authMiddleware.js";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUserById,
  getUsers,
} from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, owner, getUsers);
router.route("/login").post(authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .delete(protect, owner, deleteUser)
  .get(protect, owner, getUserById);

export default router;
