import Student from "../models/Student.js";

export const loginStudent = async (req, res) => {
  try {
    const { regNo, password } = req.body;

    // 1️⃣ CHECK STUDENT EXISTS
    const student = await Student.findOne({ regNo });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 2️⃣ CHECK PASSWORD
    if (student.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 3️⃣ SUCCESS RESPONSE
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
