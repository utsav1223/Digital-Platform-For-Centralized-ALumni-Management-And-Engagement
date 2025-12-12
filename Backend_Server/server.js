import express from "express";
import cors from "cors";
import session from "express-session";
import connectDB from "./config/db.js";
import alumniRoutes from "./routes/alumniRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
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
      secure: false, // set true only when using HTTPS
      sameSite: "lax",
    },
  })
);

// -------------------
// CONNECT DATABASE
// -------------------
connectDB(); // from db.js :contentReference[oaicite:0]{index=0}

// -------------------
// ROUTES
// -------------------
app.use("/api/alumni", alumniRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/jobs", jobRoutes);
// -------------------
app.listen(8000, () => {
  console.log("🚀 Server running on http://localhost:8000");
});
