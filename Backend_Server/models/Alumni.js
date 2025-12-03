import mongoose from "mongoose";

const alumniSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  regNo: String,
  department: String,
  batchYear: String,
  company: String,
}, { timestamps: true });

export default mongoose.model("Alumni", alumniSchema);
