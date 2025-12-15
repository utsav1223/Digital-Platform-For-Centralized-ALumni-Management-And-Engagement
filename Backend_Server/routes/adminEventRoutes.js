import express from "express";
import { optionalAuth, requireAdmin } from "../middleware/auth.js";
import {
  getAllEvents,
  getPendingEvents,
  approveEvent,
  rejectEvent,
  deleteEvent,
  publishEvent
} from "../controllers/adminEventController.js";

const router = express.Router();

// Debug middleware
router.use((req, res, next) => {
  console.log(`📋 Admin Event Route: ${req.method} ${req.path}`);
  console.log(`🔐 Session:`, req.session);
  next();
});

router.use(optionalAuth);

// GET all events
router.get("/", requireAdmin, getAllEvents);

// GET pending events only
router.get("/pending", requireAdmin, getPendingEvents);

// POST approve event
router.post("/:eventId/approve", requireAdmin, approveEvent);

// POST reject event
router.post("/:eventId/reject", requireAdmin, rejectEvent);

// DELETE event
router.delete("/:eventId", requireAdmin, deleteEvent);

// Legacy publish route (backward compatibility)
router.post("/:id/publish", requireAdmin, publishEvent);

export default router;
