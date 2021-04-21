import asyncHandler from "express-async-handler"
import Job from "../models/jobModel.js"

/*  @desc   Get All Jobs
    @route  GET /api/jobs
    @access Private/Support & Owner
*/
const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({}).populate("updatedBy", "fullname email")

  res.json(jobs)
})

export { getAllJobs }
