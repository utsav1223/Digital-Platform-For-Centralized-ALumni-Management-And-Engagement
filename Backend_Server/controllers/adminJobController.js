

// // 🔹 GET ALL PENDING JOBS (ADMIN)
// // export const getPendingJobs = async (req, res) => {
// //   try {
// //     const jobs = await Job.find({ status: "pending" }).sort({ createdAt: -1 });

// //     const formattedJobs = jobs.map(job => ({
// //       _id: job._id,
// //       type: "job",
// //       title: job.title,
// //       company: job.company,
// //       name: job.postedBy?.name || "Unknown",
// //       date: job.createdAt.toDateString(),
// //       message: job.description,
// //       status: job.status,
// //     }));

// //     res.json(formattedJobs);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Failed to fetch pending jobs" });
// //   }
// // };


// // export const getPendingJobs = async (req, res) => {
// //   try {
// //     const jobs = await Job.find({ status: "pending" })
// //       .sort({ createdAt: -1 });

// //     res.json(jobs); // ✅ SEND RAW JOBS
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Failed to fetch pending jobs" });
// //   }
// // };

// import Job from "../models/Job.js";

// /* ===============================
//    GET PENDING JOBS (ADMIN)
// ================================ */
// // export const getPendingJobs = async (req, res) => {
// //   try {
// //     const jobs = await Job.find({ status: "pending" })
// //       .populate("postedBy.alumniId", "email fullName") // 🔥 IMPORTANT
// //       .sort({ createdAt: -1 });

// //     const formattedJobs = jobs.map(job => ({
// //       _id: job._id,
// //       title: job.title,
// //       company: job.company,
// //       location: job.location,
// //       type: job.type,
// //       workMode: job.workMode,
// //       description: job.description,
// //       responsibilities: job.responsibilities,
// //       skills: job.skills,
// //       experienceLevel: job.experienceLevel,
// //       education: job.education,
// //       finalYearAllowed: job.finalYearAllowed,
// //       salary: job.salary,
// //       benefits: job.benefits,
// //       deadline: job.deadline,
// //       openings: job.openings,
// //       requiredDocs: job.requiredDocs,
// //       createdAt: job.createdAt,

// //       postedBy: {
// //         name: job.postedBy?.name || "Alumni",
// //         email: job.postedBy?.alumniId?.email || "—",
// //         role: job.postedBy?.role,
// //         department: job.postedBy?.department,
// //         batch: job.postedBy?.batch,
// //         linkedin: job.postedBy?.linkedin,
// //         showContact: job.postedBy?.showContact,
// //       },
// //     }));

// //     res.json(formattedJobs);
// //   } catch (error) {
// //     console.error("ADMIN GET JOBS ERROR:", error);
// //     res.status(500).json({ message: "Failed to fetch pending jobs" });
// //   }
// // };


// export const getPendingJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find({ status: "pending" })
//       .populate("postedBy.alumniId", "email fullName")
//       .sort({ createdAt: -1 });

//     const formattedJobs = jobs.map(job => ({
//       _id: job._id,
//       title: job.title,
//       company: job.company,
//       location: job.location,
//       type: job.type,
//       workMode: job.workMode,

//       description: job.description,
//       responsibilities: job.responsibilities || [],

//       skills: job.skills || { required: [], preferred: [] },

//       experienceLevel: job.experienceLevel,
//       education: job.education,
//       finalYearAllowed: job.finalYearAllowed,

//       salary: job.salary,
//       benefits: job.benefits || [],

//       deadline: job.deadline,
//       openings: job.openings,
//       requiredDocs: job.requiredDocs || [],

//       createdAt: job.createdAt,

//       postedBy: {
//         name: job.postedBy?.name || "Alumni",
//         email: job.postedBy?.alumniId?.email || null,
//         role: job.postedBy?.role,
//         department: job.postedBy?.department,
//         batch: job.postedBy?.batch,
//         linkedin: job.postedBy?.linkedin,
//         showContact: job.postedBy?.showContact,
//       },
//     }));

//     res.json(formattedJobs);
//   } catch (err) {
//     console.error("ADMIN JOB FETCH ERROR:", err);
//     res.status(500).json({ message: "Failed to fetch pending jobs" });
//   }
// };



// // 🔹 APPROVE / REJECT JOB (ADMIN)
// // export const updateJobStatus = async (req, res) => {
// //   try {
// //     const { jobId, status } = req.body;

// //     if (!["approved", "rejected"].includes(status)) {
// //       return res.status(400).json({ message: "Invalid status" });
// //     }

// //     const job = await Job.findByIdAndUpdate(
// //       jobId,
// //       { status },
// //       { new: true }
// //     );

// //     if (!job) {
// //       return res.status(404).json({ message: "Job not found" });
// //     }

// //     res.json({
// //       message: `Job ${status} successfully`,
// //       job,
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Failed to update job status" });
// //   }
// // };



// export const updateJobStatus = async (req, res) => {
//   const { jobId, status } = req.body;

//   if (!["approved", "rejected"].includes(status)) {
//     return res.status(400).json({ message: "Invalid status" });
//   }

//   const job = await Job.findById(jobId);
//   if (!job) {
//     return res.status(404).json({ message: "Job not found" });
//   }

//   job.status = status;
//   await job.save();

//   res.json({
//     message: `Job ${status} successfully`,
//     jobId,
//     status,
//   });
// };


import Job from "../models/Job.js";

/* ===============================
   GET PENDING JOBS (ADMIN)
================================ */
export const getPendingJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "pending" })
      .populate("postedBy.alumniId", "email fullName")
      .sort({ createdAt: -1 })
      .lean(); // 🔥 IMPORTANT (plain JS object)

    const formattedJobs = jobs.map((job) => ({
      ...job, // ✅ KEEP EVERYTHING

      postedBy: {
        alumniId: job.postedBy?.alumniId?._id || null,

        // Prefer alumni table values if available
        name:
          job.postedBy?.alumniId?.fullName ||
          job.postedBy?.name ||
          "Alumni",

        email: job.postedBy?.alumniId?.email || null,

        company: job.postedBy?.company || "",
        batch: job.postedBy?.batch || "",
        department: job.postedBy?.department || "",
        role: job.postedBy?.role || "",
        linkedin: job.postedBy?.linkedin || "",
        showContact: job.postedBy?.showContact ?? false,
      },

      // 🛡️ safety defaults
      responsibilities: job.responsibilities || [],
      skills: job.skills || { required: [], preferred: [] },
      benefits: job.benefits || [],
      requiredDocs: job.requiredDocs || [],
    }));

    res.json(formattedJobs);
  } catch (err) {
    console.error("ADMIN JOB FETCH ERROR:", err);
    res.status(500).json({ message: "Failed to fetch pending jobs" });
  }
};

/* ===============================
   APPROVE / REJECT JOB
================================ */
export const updateJobStatus = async (req, res) => {
  try {
    const { jobId, status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const job = await Job.findByIdAndUpdate(
      jobId,
      { status },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({
      message: `Job ${status} successfully`,
      jobId: job._id,
      status: job.status,
    });
  } catch (err) {
    console.error("UPDATE JOB STATUS ERROR:", err);
    res.status(500).json({ message: "Failed to update job status" });
  }
};
