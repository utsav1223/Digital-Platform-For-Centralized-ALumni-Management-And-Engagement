import { body } from "express-validator";

//AlUMNI REGISTRATION VALIDATOR
export const registerValidator = [

  // FULL NAME
  body("fullName")
    .notEmpty().withMessage("Full Name is required")
    .isLength({ min: 5 }).withMessage("Full Name must be at least 5 characters")
    .matches(/^[A-Za-z\s]+$/).withMessage("Full Name must contain only letters and spaces"),

  // EMAIL
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Valid email is required"),

  // PASSWORD
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  // REGISTRATION NUMBER
  body("regNo")
    .notEmpty().withMessage("Reg No is required")
    .matches(/^[0-9]{8}$/).withMessage("Reg No must be exactly 8 digits"),

  // DEPARTMENT
  body("department")
    .notEmpty().withMessage("Department is required"),

  // BATCH YEAR
  body("batchYear")
    .notEmpty().withMessage("Batch Year is required"),

  // COMPANY NAME
  body("company")
    .notEmpty().withMessage("Company is required")
    .matches(/^[A-Za-z\s]+$/).withMessage("Company name must contain only letters and spaces"),
];


// ALUMNI LOGIN VALIDATOR
export const loginValidator = [
  body("regNo")
    .notEmpty().withMessage("Reg No is required")
    .matches(/^[0-9]{8}$/).withMessage("Reg No must be exactly 8 digits"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];




// STUDENT LOGIN VALIDATION
export const studentLoginValidation = [
  body("regNo")
    .notEmpty().withMessage("Registration number is required")
    .isLength({ min: 5 }).withMessage("Reg No must be exactly 8 digits"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];