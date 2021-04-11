import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
  PIC: {
    supportTeam: {
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
      required: true,
      ref: "User",
    },
  },
  customer: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  kindOfChange: {
    type: String,
    required: true,
  },
  program: {
    status: {
      type: String,
      required: true,
    },
    procceedAt: {
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
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
