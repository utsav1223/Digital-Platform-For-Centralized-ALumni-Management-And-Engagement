import express from "express";
import { contactAdmin } from "../controllers/contactController.js";

const router = express.Router();

router.post("/contact", contactAdmin);

export default router;
