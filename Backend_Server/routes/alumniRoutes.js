import express from "express";
import { registerAlumni } from "../controllers/alumniController.js";

const router = express.Router();

// Register API
router.post("/register", registerAlumni);

export default router;
