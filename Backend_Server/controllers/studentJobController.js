import Job from "../models/Job.js";

export const getApprovedJobs = async (req, res) => {
  const jobs = await Job.find({ status: "approved" }).sort({
    createdAt: -1,
  });

  res.json(jobs);
};
