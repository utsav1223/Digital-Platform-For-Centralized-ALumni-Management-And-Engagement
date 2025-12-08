import mongoose from "mongoose";

const alumniSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  regNo: { type: String, required: true },
  department: { type: String, required: true },
  batchYear: { type: String, required: true },
  company: { type: String, required: true }
}, {
  timestamps: true,
  collection: "AlumniData"
});

export default mongoose.model("Alumni", alumniSchema);
