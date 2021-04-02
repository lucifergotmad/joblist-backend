import express from "express";
import { authUser } from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").post(authUser);

export default router;
