import Student from "../models/Student.js";
import sendEmail from "../utils/sendEmail.js";
import bcrypt from "bcryptjs";
// export const loginStudent = async (req, res) => {
//   try {
//     const { regNo, password } = req.body;

//     const student = await Student.findOne({ regNo });

//     if (!student || student.password !== password) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // 🔥 CREATE SESSION
//     req.session.studentId = student._id;
//     delete req.session.alumniId; // ensure role separation

//     return res.status(200).json({
//       message: "Login successful",
//       student: {
//         id: student._id,
//         name: student.name,
//         regNo: student.regNo,
//         email: student.email,
//       },
//     });

//   } catch (error) {
//     console.error("Student Login Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
import multer from "multer";
import path from "path";
import PDFDocument from "pdfkit";
export const loginStudent = async (req, res) => {
  try {
    const { regNo, password } = req.body;

    // 1️⃣ Find student
    const student = await Student.findOne({ regNo });
    if (!student) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2️⃣ Compare password with hash
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3️⃣ Create session
    // req.session.studentId = student._id;
    // delete req.session.alumniId;


    // 🔥 Clear other roles
    req.session.alumniId = null;
    req.session.adminId = null;

    // Set student session
    req.session.studentId = student._id;
    req.session.role = "student";


    // return res.status(200).json({
    //   message: "Login successful",
    //   student: {
    //     id: student._id,
    //     name: student.name,
    //     regNo: student.regNo,
    //     email: student.email,
    //   },
    // });

    return res.status(200).json({
      message: "Login successful",
      student: {
        id: student._id,
        name: student.name,
        regNo: student.regNo,
        email: student.email,
        profileImage: student.profileImage || "",
      },
    });


  } catch (error) {
    console.error("Student Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getLoggedInStudent = async (req, res) => {
  if (!req.session.studentId) {
    return res.status(401).json({ loggedIn: false });
  }

  const student = await Student.findById(req.session.studentId).select("-password");

  if (!student) {
    return res.status(401).json({ loggedIn: false });
  }

  // res.json({ loggedIn: true, student });
  res.json({
    loggedIn: true,
    student: {
      id: student._id,
      name: student.name,
      regNo: student.regNo,
      email: student.email,
      profileImage: student.profileImage || "", // 🔥 ADD THIS
    },
  });

};



// export const logoutStudent = (req, res) => {
//   req.session.destroy(() => {
//     res.clearCookie("connect.sid");
//     res.json({ loggedOut: true });
//   });
// };


export const logoutStudent = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("connect.sid", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });

    res.json({ loggedOut: true });
  });
};




/* ================= FORGOT PASSWORD ================= */
export const forgotStudentPassword = async (req, res) => {
  try {
    const { regNo } = req.body;

    const student = await Student.findOne({ regNo });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    student.resetOTP = otp;
    student.resetOTPExpiry = Date.now() + 10 * 60 * 1000; // 10 mins
    await student.save();

    // await sendEmail({
    //   to: student.email,
    //   subject: "Student Password Reset OTP",
    //   html: `
    //     <h2>Password Reset</h2>
    //     <p>Your OTP is:</p>
    //     <h1>${otp}</h1>
    //     <p>Valid for 10 minutes</p>
    //   `,
    // });

    await sendEmail({
      to: student.email,
      subject: "🔐 Student Password Reset OTP",
      html: `
    <div style="
      max-width: 520px;
      margin: 0 auto;
      font-family: Arial, Helvetica, sans-serif;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #e5e7eb;
    ">

      <!-- Header -->
      <div style="
        background-color: #2563eb;
        color: #ffffff;
        padding: 20px;
        text-align: center;
      ">
        <h2 style="margin: 0;">Student Portal</h2>
        <p style="margin: 5px 0 0; font-size: 14px;">
          Password Reset Request
        </p>
      </div>

      <!-- Body -->
      <div style="padding: 24px; color: #111827;">
        <p style="font-size: 15px;">
          Hello <strong>${student.name}</strong>,
        </p>

        <p style="font-size: 15px; line-height: 1.6;">
          We received a request to reset your account password.
          Please use the OTP below to continue.
        </p>

        <!-- OTP Box -->
        <div style="
          margin: 24px 0;
          padding: 16px;
          text-align: center;
          background-color: #f3f4f6;
          border-radius: 6px;
          font-size: 28px;
          font-weight: bold;
          letter-spacing: 6px;
          color: #2563eb;
        ">
          ${otp}
        </div>

        <p style="font-size: 14px; color: #374151;">
          ⏱ <strong>OTP valid for 10 minutes</strong>
        </p>

        <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
          If you did not request this password reset, please ignore this email.
          Your account will remain secure.
        </p>
      </div>

      <!-- Footer -->
      <div style="
        background-color: #f9fafb;
        padding: 14px;
        text-align: center;
        font-size: 12px;
        color: #6b7280;
      ">
        © ${new Date().getFullYear()} Student Portal · All rights reserved
      </div>
    </div>
  `,
    });


    // res.json({ message: "OTP sent to your registered email" });

    res.json({
      message: "OTP sent to your registered email",
      regNo: student.regNo, // 🔥 REQUIRED for redirect
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= RESET PASSWORD ================= */
export const resetStudentPassword = async (req, res) => {
  try {
    const { regNo, otp, newPassword } = req.body;

    const student = await Student.findOne({ regNo });

    if (
      !student ||
      student.resetOTP !== otp ||
      student.resetOTPExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    student.password = hashedPassword;
    student.resetOTP = undefined;
    student.resetOTPExpiry = undefined;

    await student.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// export const updateStudentProfile = async (req, res) => {
//   try {
//     if (!req.session.studentId) {
//       return res.status(401).json({ message: "Not logged in" });
//     }

//     const updates = req.body;

//     // Convert JSON strings back to objects
//     ["skills", "domains", "projects", "achievements"].forEach((field) => {
//       if (updates[field] && typeof updates[field] === "string") {
//         updates[field] = JSON.parse(updates[field]);
//       }
//     });

//     const student = await Student.findByIdAndUpdate(
//       req.session.studentId,
//       updates,
//       { new: true }
//     ).select("-password");

//     res.json(student);
//   } catch (error) {
//     res.status(500).json({ message: "Profile update failed" });
//   }
// };


// export const updateStudentProfile = async (req, res) => {
//   try {
//     if (!req.session.studentId) {
//       return res.status(401).json({ message: "Not logged in" });
//     }

//     const updates = req.body;

//     // Parse JSON fields
//     ["skills", "domains", "projects", "achievements"].forEach((field) => {
//       if (updates[field]) {
//         updates[field] = JSON.parse(updates[field]);
//       }
//     });

//     // 🔥 Handle images
//     if (req.files?.profileImage) {
//       updates.profileImage =
//         `/uploads/${req.files.profileImage[0].filename}`;
//     }

//     if (req.files?.coverImage) {
//       updates.coverImage =
//         `/uploads/${req.files.coverImage[0].filename}`;
//     }

//     const student = await Student.findByIdAndUpdate(
//       req.session.studentId,
//       updates,
//       { new: true }
//     ).select("-password");

//     res.json(student);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Profile update failed" });
//   }
// };

export const updateStudentProfile = async (req, res) => {
  try {
    if (!req.session.studentId) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const updates = {};

    // ✅ Parse normal fields safely
    Object.keys(req.body || {}).forEach((key) => {
      try {
        updates[key] = JSON.parse(req.body[key]);
      } catch {
        updates[key] = req.body[key];
      }
    });

    // ✅ Handle images safely
    if (req.files?.profileImage?.[0]) {
      updates.profileImage = `/uploads/${req.files.profileImage[0].filename}`;
    }

    if (req.files?.coverImage?.[0]) {
      updates.coverImage = `/uploads/${req.files.coverImage[0].filename}`;
    }

    const student = await Student.findByIdAndUpdate(
      req.session.studentId,
      updates,
      { new: true }
    ).select("-password");

    res.json(student);
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    res.status(500).json({ message: "Profile update failed" });
  }
};




export const getStudentProfile = async (req, res) => {
  try {
    if (!req.session.studentId) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const student = await Student.findById(req.session.studentId).select("-password");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};














/* ================= MULTER CONFIG ================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure uploads folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
});





export const generateStudentResume = async (req, res) => {
  try {
    const studentId = req.session.studentId;

    if (!studentId) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // File headers
    const fileName = `${student.fullName.replace(/\s+/g, "_")}_Resume.pdf`;
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileName}"`
    );
    res.setHeader("Content-Type", "application/pdf");

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    /* ---------------- PDF CONTENT ---------------- */

    doc.fontSize(22).text(student.fullName, { underline: true });
    doc.moveDown(0.5);

    doc.fontSize(12)
      .text(`Email: ${student.email}`)
      .text(`Registration No: ${student.regNo}`)
      .text(`Location: ${student.location || "N/A"}`)
      .moveDown();

    // Bio
    doc.fontSize(16).text("Profile Summary", { underline: true });
    doc.fontSize(11).text(student.bio || "No summary provided.");
    doc.moveDown();

    // Education
    doc.fontSize(16).text("Education", { underline: true });
    doc.fontSize(11)
      .text(`${student.degree || ""} - ${student.department || ""}`)
      .text(`${student.university || ""}`)
      .text(`Batch Year: ${student.batchYear || "N/A"}`)
      .text(`CGPA: ${student.cgpa || "N/A"}`);
    doc.moveDown();

    // Skills
    doc.fontSize(16).text("Skills", { underline: true });
    doc.fontSize(11).text(
      (student.skills && student.skills.join(", ")) || "No skills added"
    );
    doc.moveDown();

    // Projects
    doc.fontSize(16).text("Projects", { underline: true });
    if (student.projects?.length > 0) {
      student.projects.forEach((proj) => {
        doc
          .fontSize(13)
          .text(proj.title || "Untitled Project", { bold: true });
        doc.fontSize(11).text(proj.description || "");
        if (proj.techStack)
          doc.text(`Tech: ${proj.techStack}`);
        if (proj.link)
          doc.text(`Link: ${proj.link}`);
        doc.moveDown(0.5);
      });
    } else {
      doc.fontSize(11).text("No projects added");
    }
    doc.moveDown();

    // Achievements
    doc.fontSize(16).text("Achievements", { underline: true });
    if (student.achievements?.length > 0) {
      student.achievements.forEach((ach) => {
        doc.fontSize(11).text(`${ach.title} (${ach.year})`);
      });
    } else {
      doc.fontSize(11).text("No achievements added");
    }

    doc.end();

  } catch (error) {
    console.error("Student Resume Error:", error);
    res.status(500).json({ message: "Error generating resume" });
  }
};