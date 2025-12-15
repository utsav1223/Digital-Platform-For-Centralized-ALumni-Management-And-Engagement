import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Briefcase,
  Loader2,
  MapPin,
  User,
  DollarSign,
  Building2,
  GraduationCap
} from "lucide-react";

export default function JobsApproval() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  // 🔹 STEP 1: ADD FILTER STATE
  const [filters, setFilters] = useState({
    type: "",
    workMode: "",
  });

  // 🔹 STEP 2: DETECT MOBILE VS DESKTOP
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // 🔹 Fetch pending jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/jobs/admin/pending");
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("ADMIN FETCH ERROR:", err);
        setError("Unable to load job requests");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // 🔹 Approve / Reject job
  const updateJobStatus = async (jobId, status) => {
    try {
      const res = await fetch("http://localhost:8000/api/jobs/admin/status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, status }),
      });

      if (!res.ok) throw new Error("Failed to update job");

      setJobs((prev) => prev.filter((job) => job._id !== jobId));
      if (selectedJob && selectedJob._id === jobId) {
        setSelectedJob(null);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }
  };

  // 🔹 ADD FILTER LOGIC
  const filteredJobs = jobs.filter((job) => {
    const matchType = !filters.type || job.type === filters.type;
    const matchWorkMode = !filters.workMode || job.workMode === filters.workMode;
    return matchType && matchWorkMode;
  });

  // Helper to generate company initial
  const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : "C");

  // 🔹 STEP 3: EXTRACT MOBILE UI INTO FUNCTION
  const renderMobileView = () => (
    <div className="p-4 space-y-4 pb-20">
       <h1 className="text-xl font-bold text-gray-900 mb-2 px-1">Mobile Approvals</h1>
      {filteredJobs.length === 0 ? (
        <div className="text-center text-slate-400 py-20 bg-white rounded-xl border border-dashed border-slate-200">
          No pending job requests 🎉
        </div>
      ) : (
        filteredJobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-xl border border-slate-100 shadow-sm p-4"
          >
            <div className="flex justify-between items-start">
                <h2 className="font-semibold text-slate-800 text-lg">
                {job.title}
                </h2>
                <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600 font-medium">
                    {job.type}
                </span>
            </div>
            
            <p className="text-sm text-slate-500 mb-2 font-medium">
              {job.company} • {job.location}
            </p>

            <p className="text-sm text-slate-600 line-clamp-3 mb-4 bg-slate-50 p-3 rounded-lg">
              {job.description}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => updateJobStatus(job._id, "approved")}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => updateJobStatus(job._id, "rejected")}
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );

  // 🔹 Loading State
  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gray-50 text-gray-500">
        <Loader2 className="animate-spin mb-4 text-blue-600" size={40} />
        <p className="font-medium text-gray-900">Syncing requests...</p>
      </div>
    );
  }

  // 🔹 Error State
  if (error) {
    return (
      <div className="h-full flex items-center justify-center p-6 bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 flex flex-col items-center text-center max-w-md">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <XCircle size={24} className="text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Connection Error</h3>
          <p className="text-gray-500 mt-2 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-black transition"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  // 🔹 STEP 5: SWITCH UI IN RETURN
  return (
    <div className="h-full bg-gray-50">
      {isMobile ? (
        // 📱 MOBILE VIEW
        renderMobileView()
      ) : (
        // 🖥️ DESKTOP VIEW (Existing Layout)
        <div className="h-full flex flex-col">
          {/* 🔹 CSS to Hide Scrollbar (but keep scrolling) */}
          <style>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>

          {/* 🔹 Dashboard Header */}
          <header className="px-8 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Job Approvals
                  </h1>
                  <p className="text-gray-500 mt-1 text-sm">
                    Manage incoming job postings from alumni network.
                  </p>

                  {/* 🔹 FILTER DROPDOWNS */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {/* Job Type Filter */}
                    <select
                      value={filters.type}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, type: e.target.value }))
                      }
                      className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer hover:border-blue-400 transition-colors"
                    >
                      <option value="">All Job Types</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                    </select>

                    {/* Work Mode Filter */}
                    <select
                      value={filters.workMode}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, workMode: e.target.value }))
                      }
                      className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer hover:border-blue-400 transition-colors"
                    >
                      <option value="">All Work Modes</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-site">On-site</option>
                    </select>

                    {/* Clear Filters */}
                    {(filters.type || filters.workMode) && (
                      <button
                        onClick={() => setFilters({ type: "", workMode: "" })}
                        className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 border border-gray-200 transition-colors"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm text-xs font-semibold text-gray-600 shrink-0">
                  {filteredJobs.length} Pending Requests
                </div>
              </div>
            </div>
          </header>

          {/* 🔹 Content Area (with no-scrollbar class) */}
          <main className="flex-1 px-8 pb-8 overflow-y-auto no-scrollbar">
            <div className="max-w-7xl mx-auto">
              {filteredJobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl border border-gray-200 border-dashed">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {jobs.length === 0 ? "All caught up!" : "No matching jobs"}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {jobs.length === 0
                      ? "There are no pending job requests."
                      : "Try adjusting your filters."}
                  </p>
                  {(filters.type || filters.workMode) && jobs.length > 0 && (
                    <button
                      onClick={() => setFilters({ type: "", workMode: "" })}
                      className="mt-4 text-blue-600 font-medium text-sm hover:underline"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              ) : (
                // 🔹 USE filteredJobs IN GRID
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredJobs.map((job) => (
                    <div
                      key={job._id}
                      onClick={() => setSelectedJob(job)}
                      className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col cursor-pointer overflow-hidden relative"
                    >
                      {/* Status Indicator Bar */}
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="p-6 flex flex-col h-full">
                        {/* Card Top: Company Icon & Meta */}
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                              {getInitials(job.company)}
                            </div>
                            <div>
                              <h3
                                className="font-semibold text-gray-900 leading-tight line-clamp-1"
                                title={job.title}
                              >
                                {job.title}
                              </h3>
                              <p className="text-xs text-gray-500 font-medium">
                                {job.company}
                              </p>
                            </div>
                          </div>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded">
                            {job.type || "Full Time"}
                          </span>
                        </div>

                        {/* Job Details Grid */}
                        <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-500 mb-4">
                          <div className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-gray-400" />
                            <span className="truncate">
                              {job.location || "Remote"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <DollarSign size={14} className="text-gray-400" />
                            <span className="truncate">{job.salary || "N/A"}</span>
                          </div>
                          <div className="flex items-center gap-1.5 col-span-2">
                            <User size={14} className="text-gray-400" />
                            <span className="truncate">
                              Posted by {job.postedBy?.name}
                            </span>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-100 w-full mb-4" />

                        {/* Actions */}
                        <div className="mt-auto flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateJobStatus(job._id, "approved");
                            }}
                            className="flex-1 py-2 rounded-lg bg-green-50 text-green-700 text-xs font-semibold hover:bg-green-100 border border-green-100 transition-colors flex items-center justify-center gap-2"
                          >
                            Approve
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateJobStatus(job._id, "rejected");
                            }}
                            className="flex-1 py-2 rounded-lg bg-white text-gray-600 text-xs font-semibold hover:bg-gray-50 border border-gray-200 transition-colors flex items-center justify-center gap-2"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>

          {/* 🔹 Professional Modal Overlay (Desktop Only) */}
          {selectedJob && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
                onClick={() => setSelectedJob(null)}
              />

              <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200 overflow-hidden border border-gray-200">
                {/* Modal Header */}
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-start bg-white">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-blue-200">
                      {getInitials(selectedJob.company)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedJob.title}
                      </h2>
                      <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                        <Building2 size={14} />
                        <span className="font-medium text-gray-700">
                          {selectedJob.company}
                        </span>
                        <span>•</span>
                        <span>Posted {new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition"
                  >
                    <XCircle size={24} />
                  </button>
                </div>

                {/* Modal Body: Two Column Layout */}
                <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                  {/* Left: Main Content (Scrollable but hidden scrollbar) */}
                  <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
                    <section className="mb-8">
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                        About the Role
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                        {selectedJob.description}
                      </p>
                    </section>

                    {selectedJob.responsibilities?.length > 0 && (
                      <section className="mb-8">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-2">
                          {selectedJob.responsibilities.map((res, idx) => (
                            <li
                              key={idx}
                              className="flex gap-3 text-sm text-gray-600"
                            >
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                              {res}
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

                    <section>
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                        Application Details
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Method</span>
                          <span className="font-medium text-gray-900 capitalize">
                            {selectedJob.applyMethod}
                          </span>
                        </div>
                        {selectedJob.externalLink && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Link</span>
                            <a
                              href={selectedJob.externalLink}
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium text-blue-600 hover:underline truncate max-w-[200px]"
                            >
                              {selectedJob.externalLink}
                            </a>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-500">Deadline</span>
                          <span className="font-medium text-red-600">
                            {selectedJob.deadline
                              ? new Date(selectedJob.deadline).toLocaleDateString()
                              : "No deadline"}
                          </span>
                        </div>
                      </div>
                    </section>
                  </div>

                  {/* Right: Sidebar Metadata (Scrollable but hidden scrollbar) */}
                  <div className="w-full md:w-80 bg-gray-50/80 border-l border-gray-100 p-8 overflow-y-auto no-scrollbar">
                    {/* Posted By Card */}
                    <div className="mb-8">
                      <h5 className="text-xs font-semibold text-gray-400 uppercase mb-3">
                        Posted By
                      </h5>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                          <User size={16} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {selectedJob.postedBy?.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {selectedJob.postedBy?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Job Highlights */}
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-xs font-semibold text-gray-400 uppercase mb-1">
                          Salary
                        </h5>
                        <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                          <DollarSign size={16} className="text-gray-400" />
                          {selectedJob.salary || "Not disclosed"}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-xs font-semibold text-gray-400 uppercase mb-1">
                          Location
                        </h5>
                        <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                          <MapPin size={16} className="text-gray-400" />
                          {selectedJob.location}{" "}
                          <span className="text-gray-400 font-normal">
                            ({selectedJob.workMode})
                          </span>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-xs font-semibold text-gray-400 uppercase mb-1">
                          Experience
                        </h5>
                        <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                          <Briefcase size={16} className="text-gray-400" />
                          {selectedJob.experienceLevel || "Entry Level"}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-xs font-semibold text-gray-400 uppercase mb-1">
                          Education
                        </h5>
                        <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                          <GraduationCap size={16} className="text-gray-400" />
                          {selectedJob.education || "Any"}
                        </div>
                      </div>
                    </div>

                    {/* Skills Tags */}
                    {selectedJob.skills?.required?.length > 0 && (
                      <div className="mt-8">
                        <h5 className="text-xs font-semibold text-gray-400 uppercase mb-3">
                          Required Skills
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedJob.skills.required.map((skill, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs font-medium text-gray-600 shadow-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-gray-100 bg-white flex justify-end gap-3 z-10">
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition text-sm"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => updateJobStatus(selectedJob._id, "rejected")}
                    className="px-4 py-2 rounded-lg border border-red-200 text-red-600 bg-red-50 font-medium hover:bg-red-100 hover:border-red-300 transition text-sm flex items-center gap-2"
                  >
                    <XCircle size={16} />
                    Reject
                  </button>

                  <button
                    onClick={() => updateJobStatus(selectedJob._id, "approved")}
                    className="px-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-black shadow-lg shadow-gray-200 transition text-sm flex items-center gap-2"
                  >
                    <CheckCircle size={16} />
                    Approve & Publish
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}