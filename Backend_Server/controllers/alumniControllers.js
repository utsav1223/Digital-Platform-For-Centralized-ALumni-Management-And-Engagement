import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import Alumni from "../models/Alumni.js";
import bcrypt from "bcryptjs";
import multer from "multer";

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
    const { fullName, email, regNo, password, department, batchYear, company } =
      req.body;

    const exists = await Alumni.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

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

    // Save session
    req.session.alumniId = newAlumni._id;

    res.json({ message: "Registration successful", alumni: newAlumni });
  } catch (error) {
    console.log("Register Error:", error);
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

    req.session.alumniId = alumni._id;

    res.json({
      loggedIn: true,
      alumni: {
        id: alumni._id,
        fullName: alumni.fullName,
        regNo: alumni.regNo,
        email: alumni.email,
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
      return res.json({ loggedIn: false });
    }

    const alumni = await Alumni.findById(req.session.alumniId).select(
      "-password"
    );

    res.json({ loggedIn: true, alumni });
  } catch (error) {
    console.log("Session Fetch Error:", error);
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
export const updateProfile = async (req, res) => {
  try {
    const userId = req.session.alumniId;
    if (!userId)
      return res.status(401).json({ message: "Not authenticated" });

    const alumni = await Alumni.findById(userId);
    if (!alumni)
      return res.status(404).json({ message: "Alumni not found" });

    /* ------------------------------
       HANDLE IMAGE UPLOAD (NO CLOUDINARY)
    --------------------------------*/
    if (req.files) {
      if (req.files.profileImage) {
        alumni.profileImage =
          "/uploads/" + req.files.profileImage[0].filename;
      }

      if (req.files.coverImage) {
        alumni.coverImage =
          "/uploads/" + req.files.coverImage[0].filename;
      }
    }

    /* ------------------------------
       HANDLE TEXT FIELDS
    --------------------------------*/
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
        } catch (err) {
          console.log(`JSON parse failed for ${field}`);
        }
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
      "regNo",
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

//generate resume
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