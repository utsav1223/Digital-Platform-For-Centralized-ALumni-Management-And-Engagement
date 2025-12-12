import express from "express";
import { loginStudent } from "../controllers/studentControllers.js";
import { studentLoginValidation } from "../middleware/validator.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

// LOGIN ROUTE
router.post("/login", studentLoginValidation, validate, loginStudent);

export default router;
