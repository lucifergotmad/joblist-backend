import express from "express"
import { protect, owner } from "../middleware/authMiddleware.js"
import { getAllJobs } from "../controllers/jobControllers.js"

const router = express.Router()

router.route("/").get(protect, owner, getAllJobs)

export default router
