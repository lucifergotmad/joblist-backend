import AsyncHandler from "express-async-handler"
import Job from "../models/jobModel.js"

/*  @desc   Create a Job
    @route  POST /api/jobs
    @access Private/Support
*/
const createJob = AsyncHandler(async (req, res) => {
  const { pic, customer, priority, kindOfChange, description } = req.body
  const job = new Job({
    inputAt: Date.now(),
    inputBy: req.user._id,
    pic,
    customer,
    priority,
    kindOfChange,
    description,
  })

  const program = {
    status: "RTI",
  }

  job.program = program
  const createdJob = await job.save()
  res.status(201).json(createdJob)
})

/*  @desc   List all Job
    @route  GET /api/jobs
    @access Private
*/
const listJobs = AsyncHandler(async (req, res) => {
  const pageSize = 5
  const page = Number(req.query.pageNumber) || 1
  let count
  let jobs
  switch (req.user.role) {
    case "Support":
      count = await Job.countDocuments({ "program.status": "RTI" })
      jobs = await Job.find({ "program.status": "RTI" })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
      break
    case "Programmer":
      count = await Job.countDocuments({ "program.status": "WIP" })
      jobs = await Job.find({ "program.status": "WIP" })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
      break
    case "SQC":
      count = await Job.countDocuments({ "program.status": "RQC" })
      jobs = await Job.find({ "program.status": "RQC" })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
      break
    case "Owner":
      count = await Job.countDocuments({})
        .where("program.status")
        .ne("Implemented")
      jobs = await Job.find({})
        .where("program.status")
        .ne("Implemented")
        .limit(pageSize)
        .skip(pageSize * (page - 1))
      break
    default:
      res.status(400)
      throw new Error("Not Authorized")
  }

  res.json({ jobs, page, pages: Math.ceil(count / pageSize) })
})

/*  @desc   List all Implemented Jobs
    @route  GET /api/jobs/implemented
    @access Private/Owner
*/
const implementedJobs = AsyncHandler(async (req, res) => {
  const pageSize = 5
  const page = Number(req.query.pageNumber) || 1
  const count = await Job.countDocuments({ "program.status": "Implemented" })
  const jobs = await Job.find({ "program.status": "Implemented" })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ jobs, page, pages: Math.ceil(count / pageSize) })
})

/*  @desc   Get job details
    @route  GET /api/jobs/:id
    @access Private
*/
const jobsDetail = AsyncHandler(async (req, res) => {
  const jobs = await Job.findById(req.params.id)
    .populate("updatedBy", "fullname email")
    .populate("inputBy", "fullname email")
    .populate("program.QCBy", "fullname email")

  if (jobs) {
    res.json(jobs)
  } else {
    res.status(404)
    throw new Error("Job is not found")
  }
})

/*  @desc   Update Job Status
    @route  PUT /api/jobs/status/:id
    @access Private
*/
const updateJobStatus = AsyncHandler(async (req, res) => {
  const jobs = await Job.findById(req.params.id)

  if (req.body && req.body.status) {
    switch (req.body.status) {
      case "WIP":
        break
      case "RQC":
        break
      case "RTI":
        break
      case "Implemented":
        break
      default:
        break
    }
  }

  res.status(201).json(jobs)
})

/*  @desc   Update Job
    @route  PUT /api/jobs/:id/status
    @access Private
*/

export { createJob, listJobs, jobsDetail, implementedJobs }
