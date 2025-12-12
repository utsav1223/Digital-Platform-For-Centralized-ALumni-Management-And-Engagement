import express from "express";
import { optionalAuth, requireAdmin } from "../middleware/auth.js";
import { publishEvent } from "../controllers/adminEventController.js";

const router = express.Router();
router.use(optionalAuth);

router.post("/:id/publish", requireAdmin, publishEvent);

export default router;
