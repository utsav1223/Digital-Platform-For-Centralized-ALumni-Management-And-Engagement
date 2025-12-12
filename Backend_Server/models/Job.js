import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    alumniId: { type: mongoose.Schema.Types.ObjectId, ref: "Alumni", required: true },

    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },

    category: { type: String, enum: ["Job", "Internship"], required: true },
    type: { type: String, required: true },  // Full-time, Internship, Contract, etc.

    salary: { type: String, default: "" },
    description: { type: String, default: "" },
    skills: { type: [String], default: [] },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    applicants: { type: Number, default: 0 },
  },
  { timestamps: true}
);

export default mongoose.model("Job", jobSchema);
