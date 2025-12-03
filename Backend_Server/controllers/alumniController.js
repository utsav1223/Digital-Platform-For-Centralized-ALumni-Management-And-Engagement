import Alumni from "../models/Alumni.js";
import bcrypt from "bcryptjs";

export const registerAlumni = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const exists = await Alumni.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAlumni = await Alumni.create({
      ...req.body,
      password: hashedPassword,
    });

    res.json({
      message: "Alumni registered successfully",
      user: newAlumni,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
