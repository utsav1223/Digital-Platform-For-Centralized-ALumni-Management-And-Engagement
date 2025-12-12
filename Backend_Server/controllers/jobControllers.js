import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    const alumniId = req.session.alumniId;

    if (!alumniId) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const job = await Job.create({
      alumniId,
      ...req.body,
      status: "Pending"
    });

    res.json({
      message: "Job submitted for approval",
      job,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin Approve/Reject
export const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { jobId } = req.params;

    const job = await Job.findByIdAndUpdate(
      jobId,
      { status },
      { new: true }
    );

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json({ message: "Status updated", job });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Alumni See their jobs only
export const getMyJobs = async (req, res) => {
  try {
    const alumniId = req.session.alumniId;

    const jobs = await Job.find({ alumniId }).sort({ createdAt: -1 });

    res.json(jobs);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get jobs for students dashboard
export const getApprovedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "Approved" }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
