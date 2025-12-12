import mongoose from "mongoose";

const workHistorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  company: { type: String, default: "" },
  role: { type: String, default: "" },
  duration: { type: String, default: "" },
  description: { type: String, default: "" },
});

const achievementSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, default: "" },
  year: { type: String, default: "" },
});

const alumniSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    regNo: { type: String, required: true },
    password: { type: String, required: true },

    department: { type: String, default: "" },
    batchYear: { type: String, default: "" },
    company: { type: String, default: "" },

    headline: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    gender: { type: String, default: "" },
    bio: { type: String, default: "" },

    profileImage: { type: String, default: "" },
    coverImage: { type: String, default: "" },

    college: { type: String, default: "Your College Name" },
    degree: { type: String, default: "" },
    currentCompany: { type: String, default: "" },
    currentPosition: { type: String, default: "" },

    workHistory: { type: [workHistorySchema], default: [] },
    achievements: { type: [achievementSchema], default: [] },

    skills: { type: [String], default: [] },
    domains: { type: [String], default: [] },

    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    twitter: { type: String, default: "" },
    website: { type: String, default: "" },

    isMentor: { type: Boolean, default: false },
    mentorshipTopics: { type: [String], default: [] },
    isOpenToReferrals: { type: Boolean, default: false },
    referralIndustries: { type: String, default: "" }
  },
  {
    timestamps: true,
    collection: "AlumniData",
  }
);

export default mongoose.model("Alumni", alumniSchema);
