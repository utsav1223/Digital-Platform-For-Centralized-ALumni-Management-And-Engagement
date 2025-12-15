// middleware/authMiddleware.js

/* =========================
   STUDENT AUTH MIDDLEWARE
========================= */
export const requireStudentLogin = (req, res, next) => {
  if (!req.session.studentId || req.session.role !== "student") {
    return res.status(401).json({
      message: "Student login required",
    });
  }
  next();
};

/* =========================
   ALUMNI AUTH MIDDLEWARE
========================= */
export const requireAlumniLogin = (req, res, next) => {
  if (!req.session.alumniId || req.session.role !== "alumni") {
    return res.status(401).json({
      message: "Alumni login required",
    });
  }
  next();
};



export const requireAdminLogin = (req, res, next) => {
  if (!req.session.adminId || req.session.role !== "admin") {
    return res.status(401).json({ message: "Admin login required" });
  }
  next();
};
