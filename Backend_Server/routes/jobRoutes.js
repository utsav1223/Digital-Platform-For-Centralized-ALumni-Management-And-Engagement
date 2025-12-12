import express from "express";
import { createJob, updateJobStatus, getMyJobs, getApprovedJobs } from "../controllers/jobControllers.js";

const router = express.Router();

router.post("/create", createJob);

router.get("/my-jobs", getMyJobs);

router.get("/approved", getApprovedJobs);

// Only admin uses this:
router.put("/status/:jobId", updateJobStatus);

export default router;
