import express from "express";
import { optionalAuth, requireAuth } from "../middleware/auth.js";
import { createEvent, getMyEvents, getVisibleEvents } from "../controllers/eventController.js";

const router = express.Router();

router.use(optionalAuth);

router.post("/", requireAuth, createEvent);
router.get("/mine", requireAuth, getMyEvents);
router.get("/", getVisibleEvents);

export default router;
