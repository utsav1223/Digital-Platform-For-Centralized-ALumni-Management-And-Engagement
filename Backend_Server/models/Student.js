import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  id: String,
  title: String,
  techStack: String,
  link: String,
  description: String,
});

const achievementSchema = new mongoose.Schema({
  id: String,
  title: String,
  year: String,
});

const studentSchema = new mongoose.Schema(
  {
    // AUTH
    name: { type: String, required: true },
    regNo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },

    // BASIC PROFILE
    fullName: String,
    headline: String,
    bio: String,
    phone: String,
    address: String,
    location: String,

    // ACADEMICS
    university: String,
    degree: String,
    department: String,
    batchYear: String,
    currentSemester: String,
    cgpa: String,

    // CAREER
    skills: [String],
    domains: [String],
    projects: [projectSchema],
    achievements: [achievementSchema],
    isOpenToWork: { type: Boolean, default: true },

    // SOCIALS
    linkedin: String,
    github: String,
    twitter: String,
    website: String,

    // IMAGES
    profileImage: String,
    coverImage: String,

    // PASSWORD RESET
    resetOTP: String,
    resetOTPExpiry: Date,
  },
  { timestamps: true, collection: "StudentData" }
);

export default mongoose.model("Student", studentSchema);
