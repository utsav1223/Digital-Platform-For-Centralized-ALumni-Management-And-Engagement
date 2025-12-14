import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import Alumni from "../models/Alumni.js";
import bcrypt from "bcryptjs";
import multer from "multer";
import sendEmail from "../utils/sendEmail.js";
/* ------------------------------
   LOCAL FILE UPLOAD (NO CLOUDINARY)
--------------------------------*/

// ensure uploads folder exists
const uploadDir = path.join("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});

export const upload = multer({ storage });

/* ------------------------------
   REGISTER
--------------------------------*/
export const registerAlumni = async (req, res) => {
  try {
    const { fullName, email, regNo, password, department, batchYear, company } = req.body;

    // Manual email check
    const emailExists = await Alumni.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        errors: [{ msg: "Email already exists", path: "email" }]
      });
    }

    // Manual regNo check
    const regNoExists = await Alumni.findOne({ regNo });
    if (regNoExists) {
      return res.status(400).json({
        errors: [{ msg: "Registration Number already exists", path: "regNo" }]
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAlumni = new Alumni({
      fullName,
      email,
      regNo,
      password: hashedPassword,
      department,
      batchYear,
      company,
    });

    await newAlumni.save();

    req.session.alumniId = newAlumni._id;

    const alumniSafe = await Alumni.findById(newAlumni._id).select("-password");

    res.json({
      message: "Registration successful",
      alumni: alumniSafe,
    });


  } catch (error) {
    console.log("Register Error:", error);

    // Handle MongoDB unique constraint errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        errors: [{ msg: `${field} already exists`, path: field }]
      });
    }

    res.status(500).json({ message: "Server error" });
  }
};
/* ------------------------------
   LOGIN
--------------------------------*/
export const loginAlumni = async (req, res) => {
  try {
    const { regNo, password } = req.body;

    const alumni = await Alumni.findOne({ regNo });
    if (!alumni)
      return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, alumni.password);
    if (!valid)
      return res.status(400).json({ message: "Invalid password" });

    // req.session.alumniId = alumni._id;
    // 🔥 Clear other roles
    req.session.studentId = null;
    req.session.adminId = null;

    // Set alumni session
    req.session.alumniId = alumni._id;
    req.session.role = "alumni";

    // res.json({
    //   loggedIn: true,
    //   alumni: {
    //     id: alumni._id,
    //     fullName: alumni.fullName,
    //     regNo: alumni.regNo,
    //     email: alumni.email,
    //   },
    // });

    res.json({
      loggedIn: true,
      alumni: {
        id: alumni._id,
        fullName: alumni.fullName,
        regNo: alumni.regNo,
        email: alumni.email,
        profileImage: alumni.profileImage || "",
      },
    });

  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ------------------------------
   SESSION CHECK
--------------------------------*/
export const getLoggedInAlumni = async (req, res) => {
  try {
    if (!req.session.alumniId) {
      return res.status(401).json({ loggedIn: false });
    }

    const alumni = await Alumni.findById(req.session.alumniId).select("-password");

    if (!alumni) {
      return res.status(401).json({ loggedIn: false });
    }

    // res.status(200).json({
    //   loggedIn: true,
    //   alumni,
    // });

    res.json({
      loggedIn: true,
      alumni: {
        id: alumni._id,
        fullName: alumni.fullName,
        email: alumni.email,
        regNo: alumni.regNo,
        profileImage: alumni.profileImage || "", // 🔥 THIS WAS MISSING
      },
    });

  } catch (err) {
    console.error("Session check error:", err);
    res.status(500).json({ loggedIn: false });
  }
};
/* ------------------------------
   LOGOUT
--------------------------------*/
export const logoutAlumni = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ loggedOut: true });
  });
};

/* ------------------------------
   GET PROFILE
--------------------------------*/
export const getProfile = async (req, res) => {
  try {
    const alumniId = req.session.alumniId;

    if (!alumniId)
      return res.status(401).json({ message: "Not logged in" });

    const alumni = await Alumni.findById(alumniId).select("-password");

    if (!alumni)
      return res.status(404).json({ message: "Alumni not found" });

    res.json({ success: true, alumni });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ------------------------------
   UPDATE PROFILE (LOCAL UPLOAD)
--------------------------------*/
// export const updateProfile = async (req, res) => {
//   try {
//     const userId = req.session.alumniId;
//     if (!userId)
//       return res.status(401).json({ message: "Not authenticated" });

//     const alumni = await Alumni.findById(userId);
//     if (!alumni)
//       return res.status(404).json({ message: "Alumni not found" });

//     /* ------------------------------
//        HANDLE IMAGE UPLOAD (NO CLOUDINARY)
//     --------------------------------*/
//     if (req.files) {
//       if (req.files.profileImage) {
//         alumni.profileImage =
//           "/uploads/" + req.files.profileImage[0].filename;
//       }

//       if (req.files.coverImage) {
//         alumni.coverImage =
//           "/uploads/" + req.files.coverImage[0].filename;
//       }
//     }

//     /* ------------------------------
//        HANDLE TEXT FIELDS
//     --------------------------------*/
//     const body = { ...req.body };

//     const jsonFields = [
//       "skills",
//       "domains",
//       "workHistory",
//       "achievements",
//       "mentorshipTopics",
//     ];

//     jsonFields.forEach((field) => {
//       if (body[field]) {
//         try {
//           body[field] = JSON.parse(body[field]);
//         } catch (err) {
//           console.log(`JSON parse failed for ${field}`);
//         }
//       }
//     });

//     const allowed = [
//       "fullName",
//       "headline",
//       "phone",
//       "location",
//       "gender",
//       "bio",
//       "college",
//       "degree",
//       "department",
//       "currentCompany",
//       "currentPosition",
//       "skills",
//       "domains",
//       "linkedin",
//       "github",
//       "twitter",
//       "website",
//       "workHistory",
//       "achievements",
//       "isMentor",
//       "mentorshipTopics",
//       "isOpenToReferrals",
//       "referralIndustries",
//       "regNo",
//       "batchYear",
//     ];

//     allowed.forEach((field) => {
//       if (body[field] !== undefined) alumni[field] = body[field];
//     });

//     await alumni.save();

//     res.json({ success: true, alumni });
//   } catch (err) {
//     console.error("updateProfile error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

//generate resume



export const updateProfile = async (req, res) => {
  try {
    const userId = req.session.alumniId;
    if (!userId)
      return res.status(401).json({ message: "Not authenticated" });

    const alumni = await Alumni.findById(userId);
    if (!alumni)
      return res.status(404).json({ message: "Alumni not found" });

    // 🔐 BLOCK regNo updates
    delete req.body.regNo;

    /* ---------- IMAGE UPLOAD ---------- */
    if (req.files?.profileImage) {
      alumni.profileImage = "/uploads/" + req.files.profileImage[0].filename;
    }

    if (req.files?.coverImage) {
      alumni.coverImage = "/uploads/" + req.files.coverImage[0].filename;
    }

    /* ---------- TEXT DATA ---------- */
    const body = { ...req.body };

    const jsonFields = [
      "skills",
      "domains",
      "workHistory",
      "achievements",
      "mentorshipTopics",
    ];

    jsonFields.forEach((field) => {
      if (body[field]) {
        try {
          body[field] = JSON.parse(body[field]);
        } catch { }
      }
    });

    const allowed = [
      "fullName",
      "headline",
      "phone",
      "location",
      "gender",
      "bio",
      "college",
      "degree",
      "department",
      "currentCompany",
      "currentPosition",
      "skills",
      "domains",
      "linkedin",
      "github",
      "twitter",
      "website",
      "workHistory",
      "achievements",
      "isMentor",
      "mentorshipTopics",
      "isOpenToReferrals",
      "referralIndustries",
      "batchYear",
    ];

    allowed.forEach((field) => {
      if (body[field] !== undefined) alumni[field] = body[field];
    });

    await alumni.save();

    res.json({ success: true, alumni });
  } catch (err) {
    console.error("updateProfile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};




export const generateResume = async (req, res) => {
  try {
    const userId = req.session.alumniId;

    if (!userId) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const alumni = await Alumni.findById(userId);
    if (!alumni) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create PDF
    const doc = new PDFDocument();
    const fileName = `${alumni.fullName.replace(/\s+/g, "_")}_Resume.pdf`;

    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    // ----------- PDF CONTENT -------------
    doc.fontSize(22).text(alumni.fullName, { underline: true });
    doc.moveDown();

    doc.fontSize(14).text(`Email: ${alumni.email}`);
    doc.text(`Phone: ${alumni.phone || "N/A"}`);
    doc.text(`Location: ${alumni.location || "N/A"}`);
    doc.moveDown();

    doc.fontSize(18).text("Professional Summary", { underline: true });
    doc.fontSize(12).text(alumni.bio || "No bio available");
    doc.moveDown();

    doc.fontSize(18).text("Skills", { underline: true });
    doc.fontSize(12).text((alumni.skills || []).join(", ") || "No skills added");
    doc.moveDown();

    doc.fontSize(18).text("Work Experience", { underline: true });
    alumni.workHistory?.forEach((job) => {
      doc.fontSize(14).text(`${job.role} — ${job.company}`);
      doc.fontSize(12).text(`${job.duration}`);
      doc.text(job.description);
      doc.moveDown();
    });

    doc.fontSize(18).text("Achievements", { underline: true });
    alumni.achievements?.forEach((ach) => {
      doc.fontSize(12).text(`${ach.title} (${ach.year})`);
    });
    doc.moveDown();

    doc.fontSize(18).text("Education", { underline: true });
    doc.fontSize(12).text(`${alumni.degree} in ${alumni.department}`);
    doc.text(`${alumni.college}`);
    doc.text(`Batch: ${alumni.batchYear}`);
    doc.moveDown();

    doc.end();

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating resume" });
  }
};

/* =========================
   FORGOT PASSWORD (SEND OTP)
========================= */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // 1️⃣ CHECK ALUMNI EXISTS
    const alumni = await Alumni.findOne({ email });
    if (!alumni) {
      return res.status(404).json({ message: "Email not registered" });
    }

    // 2️⃣ GENERATE OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 3️⃣ SAVE OTP + EXPIRY
    alumni.resetOTP = otp;
    alumni.resetOTPExpiry = Date.now() + 10 * 60 * 1000; // 10 mins
    await alumni.save();

    // 4️⃣ SEND EMAIL (⭐ REG NO ADDED ⭐)
    // await sendEmail({
    //   to: alumni.email,
    //   subject: "Password Reset OTP – Alumni Portal",
    //   html: `
    //     <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    //       <h2>Hello ${alumni.fullName || "Alumni"},</h2>

    //       <p>You requested to reset your password.</p>

    //       <p>
    //         <strong>Registration Number:</strong>
    //         ${alumni.regNo}
    //       </p>

    //       <p>Your One-Time Password (OTP) is:</p>

    //       <h1 style="letter-spacing: 4px; color: #2563eb;">
    //         ${otp}
    //       </h1>

    //       <p>This OTP is valid for <strong>10 minutes</strong>.</p>

    //       <p>If you did not request this, please ignore this email.</p>

    //       <br/>
    //       <p>
    //         Regards,<br/>
    //         <strong>Alumni Portal Team</strong>
    //       </p>
    //     </div>
    //   `,
    // });

    await sendEmail({
      to: alumni.email,
      subject: "🔐 Password Reset OTP – Alumni Portal",
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
        <h2 style="margin: 0;">Alumni Portal</h2>
        <p style="margin: 5px 0 0; font-size: 14px;">
          Password Reset Request
        </p>
      </div>

      <!-- Body -->
      <div style="padding: 24px; color: #111827;">
        <p style="font-size: 15px;">
          Hello <strong>${alumni.fullName || "Alumni"}</strong>,
        </p>

        <p style="font-size: 15px; line-height: 1.6;">
          We received a request to reset your Alumni Portal password.
          Please use the OTP below to continue.
        </p>

        <p style="font-size: 14px; margin-top: 12px;">
          <strong>Registration Number:</strong> ${alumni.regNo}
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
          ⏱ <strong>This OTP is valid for 10 minutes</strong>
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
        © ${new Date().getFullYear()} Alumni Portal · All rights reserved
      </div>
    </div>
  `,
    });


    res.json({ message: "OTP sent to email" });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   RESET PASSWORD
========================= */
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // 1️⃣ FIND ALUMNI
    const alumni = await Alumni.findOne({ email });
    if (!alumni) {
      return res.status(404).json({ message: "Invalid request" });
    }

    // 2️⃣ VERIFY OTP
    if (
      alumni.resetOTP !== otp ||
      alumni.resetOTPExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // 3️⃣ UPDATE PASSWORD
    alumni.password = await bcrypt.hash(newPassword, 10);
    alumni.resetOTP = undefined;
    alumni.resetOTPExpiry = undefined;

    await alumni.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
