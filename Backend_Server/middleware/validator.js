import { body } from "express-validator";

// ======================
// ALUMNI REGISTRATION VALIDATOR
// ======================
export const registerValidator = [

  // FULL NAME
  body("fullName")
    .trim()
    .notEmpty().withMessage("Full Name is required")
    .isLength({ min: 3 }).withMessage("Full Name must be at least 3 characters long")
    .matches(/^[A-Za-z\s]+$/).withMessage("Full Name can contain only letters and spaces"),

  // EMAIL
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please enter a valid email address")
    .normalizeEmail(),

  // PASSWORD
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/).withMessage("Password must contain at least one special character (@, $, !, %, *, ?, &)"),

  // REGISTRATION NUMBER
  body("regNo")
    .trim()
    .notEmpty().withMessage("Registration Number is required")
    .matches(/^[0-9]{8}$/).withMessage("Registration Number must be exactly 8 digits"),

  // DEPARTMENT
  body("department")
    .trim()
    .notEmpty().withMessage("Department is required")
    .isString().withMessage("Department must be a valid string"),

  // BATCH YEAR
  body("batchYear")
    .notEmpty().withMessage("Batch Year is required")
    .isInt({ min: 1980, max: new Date().getFullYear() })
    .withMessage("Please enter a valid Batch Year"),

  // COMPANY NAME (optional or required?)
  body("company")
    .trim()
    .notEmpty().withMessage("Company name is required")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Company name can contain only letters and spaces"),
];


// ======================
// ALUMNI LOGIN VALIDATOR
// ======================
export const loginValidator = [

  body("regNo")
    .trim()
    .notEmpty().withMessage("Registration Number is required")
    .matches(/^[0-9]{8}$/).withMessage("Registration Number must be exactly 8 digits"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
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