import express from "express"
import {
  createJob,
  implementedJobs,
  getAllJobs,
  listJobs,
  updateJobStatus,
  detailsJob,
  deleteJob,
  updateJob,
} from "../controllers/jobControllers.js"
import { owner, protect, support } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/implemented").get(protect, owner, implementedJobs)
router.route("/all").get(protect, support, getAllJobs)
router.route("/").post(protect, support, createJob).get(protect, listJobs)
router
  .route("/:id")
  .get(protect, detailsJob)
  .delete(protect, support, deleteJob)
  .put(protect, updateJob)
router.route("/status/:id").put(protect, updateJobStatus)

export default router
