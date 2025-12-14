import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import session from "express-session";
import connectDB from "./config/db.js";
import alumniRoutes from "./routes/alumniRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import path from "path";
const app = express();

// -------------------
// MIDDLEWARE
// -------------------
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// -------------------
// SESSION CONFIG
// -------------------
app.use(
  session({
    secret: "MY_SECRET_KEY_12345",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

// -------------------
// CONNECT DATABASE
// -------------------
connectDB();

// -------------------
// ROUTES
// -------------------
app.use("/api/alumni", alumniRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/alumni/auth", alumniRoutes); // ✅ MOVE HERE
app.use("/api/jobs", jobRoutes);
// app.use("/uploads", express.static("uploads"));



app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

// app.use(
//   "/uploads",
//   express.static(path.join(process.cwd(), "uploads"))
// );
// -------------------
app.listen(8000, () => {
  console.log("🚀 Server running on http://localhost:8000");
});
