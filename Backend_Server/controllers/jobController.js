import Job from "../models/Job.js";

/* ===============================
   CREATE JOB (ALUMNI)
================================ */
export const createJob = async (req, res) => {
  try {
    // 🔐 Auth check
    if (!req.session.alumniId) {
      return res.status(401).json({ message: "Alumni not logged in" });
    }

    const job = await Job.create({
      ...req.body,

      postedBy: {
        ...req.body.postedBy,
        alumniId: req.session.alumniId,
      },

      status: "pending", // 🔒 force pending
    });

    res.status(201).json({
      message: "Job submitted for admin approval",
      job,
    });

  } catch (err) {
    console.error("CREATE JOB ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


/* ===============================
   GET ALUMNI JOBS
================================ */
export const getAlumniJobs = async (req, res) => {
  try {
    if (!req.session.alumniId) {
      return res.status(401).json({ message: "Alumni not logged in" });
    }

    const jobs = await Job.find({
      "postedBy.alumniId": req.session.alumniId,
    })
      .sort({ createdAt: -1 });

    res.json(jobs);

  } catch (err) {
    console.error("GET ALUMNI JOBS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


export const deleteJob = async (req, res) => {
  try {
    // 1️⃣ Check alumni login
    if (!req.session.alumniId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { id } = req.params;

    // 2️⃣ Find job
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // 3️⃣ Ownership check (VERY IMPORTANT)
    if (job.postedBy.alumniId.toString() !== req.session.alumniId) {
      return res.status(403).json({ message: "You can delete only your own jobs" });
    }

    // 4️⃣ Delete
    await Job.findByIdAndDelete(id);

    res.json({ message: "Job deleted successfully" });

  } catch (err) {
    console.error("DELETE JOB ERROR:", err);
    res.status(500).json({ message: "Failed to delete job" });
  }
};



// 🔹 GET ALL APPROVED JOBS (STUDENTS)
export const getApprovedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "approved" })
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};
