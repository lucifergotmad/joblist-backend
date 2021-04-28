import express from "express"
import {
  createJob,
  implementedJobs,
  jobsDetail,
  listJobs,
} from "../controllers/jobControllers.js"
import { owner, protect, support } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").post(protect, support, createJob).get(protect, listJobs)
router.route("/implemented").get(protect, owner, implementedJobs)
router.route("/:id").get(protect, jobsDetail)

export default router
