import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    regNo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    department: String,
    address: String
  },
  { collection: "StudentData" } // IMPORTANT: your existing DB collection
);

export default mongoose.model("Student", studentSchema);
