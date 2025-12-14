import express from "express";
import {
  registerAlumni,
  loginAlumni,
  logoutAlumni,
  getLoggedInAlumni,
  getProfile,
  updateProfile,
  upload,
  generateResume,
  forgotPassword,
  resetPassword
} from "../controllers/alumniControllers.js";

import { validate } from "../middleware/validate.js";
import {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} from "../middleware/validator.js";

import { requireAlumniLogin } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ---------- AUTH ---------- */
router.post("/register", registerValidator, validate, registerAlumni);
router.post("/login", loginValidator, validate, loginAlumni);
router.post("/logout", logoutAlumni);

/* ---------- SESSION CHECK (ALUMNI ONLY) ---------- */
router.get("/me", requireAlumniLogin, getLoggedInAlumni);

/* ---------- PROTECTED ROUTES (ALUMNI ONLY) ---------- */
router.get("/profile", requireAlumniLogin, getProfile);
router.get("/generate-resume", requireAlumniLogin, generateResume);

router.put(
  "/update-profile",
  requireAlumniLogin,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
  ]),
  updateProfile
);

/* ---------- PASSWORD ---------- */
router.post(
  "/forgot-password",
  forgotPasswordValidator,
  validate,
  forgotPassword
);

router.post(
  "/reset-password",
  resetPasswordValidator,
  validate,
  resetPassword
);

export default router;
