import express from "express";
import { optionalAuth, requireAuth } from "../middleware/auth.js";
import {
  createEvent,
  getMyEvents,
  getVisibleEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  attendEvent,
  cancelAttendance
} from "../controllers/eventController.js";

const router = express.Router();

router.use(optionalAuth);

// Event CRUD
router.post("/", requireAuth, createEvent);
router.get("/mine", requireAuth, getMyEvents);
router.get("/", getVisibleEvents);
router.get("/:eventId", getEventById);
router.put("/:eventId", requireAuth, updateEvent);
router.delete("/:eventId", requireAuth, deleteEvent);

// Attendance management
router.post("/:eventId/attend", requireAuth, attendEvent);
router.delete("/:eventId/attend", requireAuth, cancelAttendance);

export default router;
