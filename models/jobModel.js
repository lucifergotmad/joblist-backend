import mongoose from "mongoose"

const programSchema = mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      default: "NP",
    },
    information: {
      type: String,
    },
    processAt: {
      type: Date,
      required: true,
    },
    doneAt: {
      type: Date,
      required: true,
    },
    QCBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

const jobSchema = mongoose.Schema({
  pic: {
    type: String,
    required: true,
  },
  inputAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  customer: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  kindOfChange: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  program: programSchema,
})

const Job = mongoose.model("Job", jobSchema)

export default Job
