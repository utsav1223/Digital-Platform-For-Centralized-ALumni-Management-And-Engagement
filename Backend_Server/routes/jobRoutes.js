import express from "express";
import {
  createJob,
  getAlumniJobs,
  deleteJob
} from "../controllers/jobController.js";
import {
  getPendingJobs,
  updateJobStatus,
} from "../controllers/adminJobController.js";
import { getApprovedJobs } from "../controllers/jobController.js";
import { requireAlumniLogin,requireAdminLogin, requireStudentLogin } from "../middleware/authMiddleware.js";
const router = express.Router();

// Alumni
router.post("/create", requireAlumniLogin, createJob);
router.get("/alumni", requireAlumniLogin, getAlumniJobs);

// Admin
// router.get("/admin/pending", getPendingJobs);
// router.put("/admin/status", updateJobStatus);

// Student
router.get("/approved", getApprovedJobs);

// Admin
// router.get("/admin/pending", requireAdminLogin, getPendingJobs);
// router.put("/admin/status", requireAdminLogin, updateJobStatus);

// ❌ REMOVE requireAdminLogin
router.get("/admin/pending", getPendingJobs);
router.put("/admin/status", updateJobStatus);


// 🟢 DELETE JOB
router.delete("/:id", deleteJob);

export default router;
