import express from "express"
import {
  createJob,
  implementedJobs,
  listJobs,
  updateJobStatus,
  detailsJob,
  deleteJob,
  updateJob,
} from "../controllers/jobControllers.js"
import { owner, protect, support } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").post(protect, support, createJob).get(protect, listJobs)
router
  .route("/:id")
  .get(protect, detailsJob)
  .delete(protect, support, deleteJob)
  .put(protect, support, updateJob)
router.route("/status/:id").put(protect, updateJobStatus)
router.route("/implemented").get(protect, owner, implementedJobs)

export default router
