import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import alumniRoutes from "./routes/alumniRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// All routes
app.use("/api/alumni", alumniRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
