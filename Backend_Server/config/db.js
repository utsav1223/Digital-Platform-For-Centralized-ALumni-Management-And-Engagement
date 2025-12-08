import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // optional: avoid strictQuery warnings
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://localhost:27017/AlumniPortal", {
      // options are optional for mongoose v6+
      // keepTimeouts default is fine
    });
    console.log("MongoDB Connected -> AlumniPortal");
  } catch (error) {
    console.log("DB Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
