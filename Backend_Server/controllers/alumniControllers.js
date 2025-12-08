import Alumni from "../models/Alumni.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register Alumni controller


export const registerAlumni = async (req, res) => {
  try {
    console.log("REGISTER CONTROLLER - req.body:", req.body);

    const { fullName, email, password, regNo, department, batchYear, company } = req.body;

    // Basic validation
    if (!fullName || !email || !password || !regNo || !department || !batchYear || !company) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    // Check if email exists
    const exists = await Alumni.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAlumni = new Alumni({
      fullName,
      email,
      password: hashedPassword,
      regNo,
      department,
      batchYear,
      company
    });

    const saved = await newAlumni.save();

    console.log("New alumni saved:", saved._id);
    res.status(201).json({ message: "Registered successfully", alumniId: saved._id });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    // Duplicate key error (unique email)
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already registered (duplicate key)" });
    }

    res.status(500).json({ message: "Server error", error: error.message });
  }
};



//login Alumni controller




export const loginAlumni = async (req, res) => {
  try {
    const { regNo, password } = req.body;

    console.log("LOGIN BODY:", req.body);

    // check required fields
    if (!regNo || !password) {
      return res.status(400).json({ message: "Reg No and Password are required" });
    }

    // find alumni by regNo
    const alumni = await Alumni.findOne({ regNo });
    if (!alumni) {
      return res.status(400).json({ message: "Invalid Reg No" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, alumni.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // create token
    const token = jwt.sign(
      { id: alumni._id, regNo: alumni.regNo },
      "SECRET_KEY_123",        // 🔐 change later
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      alumni: {
        fullName: alumni.fullName,
        regNo: alumni.regNo,
        email: alumni.email,
        department: alumni.department,
        batchYear: alumni.batchYear,
      }
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
