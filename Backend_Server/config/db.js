import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/AlumniPortal";

    mongoose.set("strictQuery", false);

    await mongoose.connect(MONGO_URI);

    console.log(`📌 MongoDB Connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

// optional event listeners
mongoose.connection.on("connected", () => {
  console.log("✅ Mongoose connected");
});

mongoose.connection.on("error", (err) => {
  console.log("❌ Mongoose error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ Mongoose disconnected");
});

export default connectDB;

