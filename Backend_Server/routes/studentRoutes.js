// import express from "express"; 
// import { loginStudent } from "../controllers/studentControllers.js";

// const router = express.Router();

// // LOGIN ROUTE
// router.post("/login", studentLoginValidation, validate, loginStudent);

// export default router;


import express from "express";
import {
  loginStudent,
  getLoggedInStudent,
  logoutStudent,
  forgotStudentPassword,
  resetStudentPassword,
  getStudentProfile,
  updateStudentProfile,
  upload,
  generateStudentResume
} from "../controllers/studentControllers.js";

import {
  studentLoginValidation,
  studentForgotPasswordValidator,
  studentResetPasswordValidator
} from "../middleware/validator.js";

import { validate } from "../middleware/validate.js";
import { requireStudentLogin } from "../middleware/authMiddleware.js"; // ✅ ADDED

const router = express.Router();

// router.post("/login", studentLoginValidation, validate, loginStudent);
// router.get("/me", getLoggedInStudent);
// router.post("/logout", logoutStudent);



// =====================
// AUTH
// =====================
router.post("/login", studentLoginValidation, validate, loginStudent);
router.post("/logout", logoutStudent);

// =====================
// SESSION CHECK (STUDENT ONLY)
// =====================
router.get("/me", requireStudentLogin, getLoggedInStudent); // ✅ PROTECTED

// =====================
// PROFILE (STUDENT ONLY)
// =====================
router.get("/profile", requireStudentLogin, getStudentProfile); // ✅ PROTECTED
router.get("/resume", requireStudentLogin, generateStudentResume); // ✅ PROTECTED

router.put(
  "/update-profile",
  requireStudentLogin, // ✅ PROTECTED
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  updateStudentProfile
);

// =====================
// PASSWORD
// =====================
router.post(
  "/forgot-password",
  studentForgotPasswordValidator,
  validate,
  forgotStudentPassword
);

router.post(
  "/reset-password",
  studentResetPasswordValidator,
  validate,
  resetStudentPassword
);


// router.put(
//   "/update-profile",
//   upload.fields([
//     { name: "profileImage", maxCount: 1 },
//     { name: "coverImage", maxCount: 1 },
//   ]),
//   updateStudentProfile
// );

export default router;
