import express from "express";
import { registerAlumni, loginAlumni } from "../controllers/alumniControllers.js";

console.log("🔥 Alumni Routes File Loaded!");

const router = express.Router();

router.post("/register", registerAlumni);
router.post("/login", loginAlumni);

export default router;
