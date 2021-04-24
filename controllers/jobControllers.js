import AsyncHandler from "express-async-handler"
import Job from "../models/jobModel.js"

/*  @desc   Create a Job
    @route  POST /api/products
    @access Private
*/
const createJob = AsyncHandler(async (req, res) => {
  const { pic, customer, priority, kindOfChange, description } = req.body
  const job = new Job({
    inputAt: Date.now(),
    pic,
    customer,
    priority,
    kindOfChange,
    description,
  })

  const createdJob = await job.save()
  res.status(201).json(createdJob)
})

/*  @desc   List all Job
    @route  GET /api/jobs
    @access Private
*/
const listJobs = AsyncHandler(async (req, res) => {
  const jobs = await Job.find({})

  if (jobs) {
    res.json(jobs)
  } else {
    res.status(404)
    throw new Error("Order is empty")
  }
})

/*  @desc   Get job details
    @route  GET /api/jobs/:id
    @access Private
*/
const jobsDetail = AsyncHandler(async (req, res) => {
  const jobs = await Job.findById(req.params.id).populate(
    "updatedBy",
    "fullname email"
  )

  if (jobs) {
    res.json(jobs)
  } else {
    res.status(404)
    throw new Error("Order is empty")
  }
})

export { createJob, listJobs, jobsDetail }
