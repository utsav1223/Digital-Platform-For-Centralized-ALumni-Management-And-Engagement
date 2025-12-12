import Student from "../models/Student.js";

export const loginStudent = async (req, res) => {
  try {
    const { regNo, password } = req.body;

    const student = await Student.findOne({ regNo });

    if (!student) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (student.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      message: "Login successful",
      student: {
        name: student.name,
        regNo: student.regNo,
        email: student.email,
      },
    });

  } catch (error) {
    console.error("Student Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
