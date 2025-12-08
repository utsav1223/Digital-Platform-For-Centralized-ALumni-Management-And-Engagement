import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import alumniRoutes from "./routes/alumniRoutes.js";
import studentAuthRoutes from "./routes/studentAuthRoutes.js";

const app = express();
const PORT = 8000;

// Middlewares
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Debug logger (optional but helpful)
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/alumni", alumniRoutes);
app.use("/api/student", studentAuthRoutes);

// 404 Fallback
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler (optional)
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({ message: "Internal server error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
