import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    // Job Info
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: String,
    type: String,
    workMode: String,

    // UI helpers
    logoColor: String, // 🟢 used in UI avatar

    // Description
    description: String,
    responsibilities: [String],

    // Skills
    skills: {
      required: [String],
      preferred: [String],
    },

    // Candidate criteria
    experienceLevel: String,
    education: String,
    finalYearAllowed: Boolean,

    // Salary & benefits
    salary: String,
    salaryType: {
      type: String,
      enum: ["CTC", "Stipend", "Hourly"],
      default: "CTC",
    },
    benefits: [String],

    // Application details
    deadline: Date,
    openings: {
      type: Number,
      default: 1,
    },

    applyMethod: {
      type: String,
      enum: ["Platform", "External"],
      default: "Platform",
    },

    externalLink: String,

    jobEmail: {
      type: String, // 🟢 HR email (important)
    },

    requiredDocs: [String],

    // Alumni (who posted)
    postedBy: {
      alumniId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Alumni",
      },
      name: String,
      company: String, // 🟢 used in modal
      batch: String,
      department: String,
      role: String,
      linkedin: String,
      showContact: Boolean,
    },

    // Admin approval
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
