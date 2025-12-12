import express from "express";
import {
  registerAlumni,
  loginAlumni,
  logoutAlumni,
  getLoggedInAlumni,
  getProfile,
  updateProfile,
  upload,
  generateResume
} from "../controllers/alumniControllers.js";
import {validate} from "../middleware/validate.js";
import {registerValidator, loginValidator} from "../middleware/validator.js";
const router = express.Router();

router.post("/register", registerValidator, validate, registerAlumni);
router.post("/login", loginValidator, validate, loginAlumni);
router.post("/logout", logoutAlumni);
router.get("/me", getLoggedInAlumni);
router.get("/profile", getProfile);
router.get("/generate-resume", generateResume);

// 🔥 MULTER MUST BE ADDED HERE
router.put(
  "/update-profile",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
  ]),
  updateProfile
);

export default router;
