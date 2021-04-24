import express from "express"
import {
  createJob,
  jobsDetail,
  listJobs,
} from "../controllers/jobControllers.js"
import { protect, support } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").post(protect, support, createJob).get(protect, listJobs)
router.route("/:id").get(protect, jobsDetail)

export default router
