import React, { useState, useEffect } from 'react';
import {
  Briefcase, Search, Bookmark, MapPin, DollarSign, Clock,
  Building2, Plus, X, GraduationCap, Users, Calendar,
  CheckCircle2, Linkedin, Share2, FileText, Monitor,
  Filter, ExternalLink, Mail, Trash2
} from 'lucide-react';

const JobsBoard = () => {
  // --- UTILITY: Hide Scrollbar CSS ---
  const ScrollbarStyles = () => (
    <style>{`
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      /* Smooth transitions for all interactive elements */
      * { transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform; transition-duration: 200ms; }
    `}</style>
  );

  // --- UTILITY: Time Ago Helper ---
  const timeAgo = (date) => {
    if (!date) return "Just now";
    const diff = Math.floor((Date.now() - new Date(date)) / 1000);
    const days = Math.floor(diff / 86400);
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    const hours = Math.floor(diff / 3600);
    if (hours > 0) return `${hours} hr${hours > 1 ? "s" : ""} ago`;
    const minutes = Math.floor(diff / 60);
    return `${minutes} min ago`;
  };

  // --- STATE ---
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [jobs, setJobs] = useState([]);

  // 🛠️ STEP 1: NEW FILTER STATES
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  // --- FETCH JOBS ---
  useEffect(() => {
    const fetchAlumniJobs = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/jobs/alumni", {
          credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) {
          console.error("Failed to fetch jobs:", data.message);
          setJobs([]);
          return;
        }

        setJobs(Array.isArray(data) ? data : []);

      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchAlumniJobs();
  }, []);

  // --- DELETE HANDLER ---
  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job? This cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/jobs/${jobId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
        closeJobDetail();
        alert("Job deleted successfully");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Something went wrong while deleting");
    }
  };

  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    title: '', company: '', type: 'Full-time', workMode: 'On-site', location: '',
    description: '', responsibilities: '', reqSkills: '', prefSkills: '',
    experienceLevel: 'Fresher', education: 'Any Graduate', finalYearAllowed: false,
    salaryRange: '', salaryType: 'CTC', isPaid: true, benefits: '',
    deadline: '', openings: '1', applyMethod: 'Platform', externalLink: '', jobEmail: '',
    reqResume: true, reqPortfolio: false, reqCoverLetter: false,
    alumniName: '', alumniBatch: '', alumniDept: '', alumniRole: '',
    alumniLinkedin: '', showContact: false
  });

  // --- HANDLERS ---
  const handleJobClick = (job) => {
    setSelectedJob(job);
    document.body.style.overflow = 'hidden';
  };

  const closeJobDetail = () => {
    setSelectedJob(null);
    document.body.style.overflow = 'auto';
  };

  // 🛠️ STEP 4: ✅ FINAL FILTERING LOGIC
  const filteredJobs = Array.isArray(jobs)
    ? jobs.filter((job) => {
      // 🔍 Search
      const matchesSearch =
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      // 📌 Status Filter
      if (statusFilter !== "All" && job.status !== statusFilter.toLowerCase()) {
        return false;
      }

      // 🏷️ Job Type Filter
      if (typeFilter === "Remote") {
        return job.workMode === "Remote";
      }

      if (typeFilter !== "All" && job.type !== typeFilter) {
        return false;
      }

      return true;
    })
    : [];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const processList = (str) =>
      str.split(",").map(s => s.trim()).filter(Boolean);

    const payload = {
      title: formData.title,
      company: formData.company,
      location: formData.location,
      type: formData.type,
      workMode: formData.workMode,
      description: formData.description,
      responsibilities: processList(formData.responsibilities),
      skills: {
        required: processList(formData.reqSkills),
        preferred: processList(formData.prefSkills),
      },
      experienceLevel: formData.experienceLevel,
      education: formData.education,
      finalYearAllowed: formData.finalYearAllowed,
      salary: formData.salaryRange,
      benefits: processList(formData.benefits),
      deadline: formData.deadline,
      openings: formData.openings,
      applyMethod: formData.applyMethod,
      externalLink: formData.externalLink,
      jobEmail: formData.jobEmail,
      requiredDocs: [
        formData.reqResume && "Resume",
        formData.reqPortfolio && "Portfolio",
      ].filter(Boolean),
      postedBy: {
        name: formData.alumniName,
        batch: formData.alumniBatch,
        department: formData.alumniDept,
        role: formData.alumniRole,
        linkedin: formData.alumniLinkedin,
        showContact: formData.showContact,
      },
    };

    try {
      await fetch("http://localhost:8000/api/jobs/create", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      alert("Job submitted for admin approval");
      setShowCreateModal(false);

      const res = await fetch("http://localhost:8000/api/jobs/alumni", {
        credentials: "include",
      });
      const data = await res.json();
      setJobs(data);

    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/80 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <ScrollbarStyles />

      {/* --- NAVBAR --- */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 sticky top-0 z-30 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
              <GraduationCap className="text-white h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">
              Alumni<span className="text-indigo-600">Connect</span>
            </span>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span className="hidden sm:inline">Post Opportunity</span>
            <span className="sm:hidden">Post</span>
          </button>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search & Filter Header */}
        <div className="mb-10 space-y-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search by role, company, or skills..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700 placeholder:text-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
             {/* 🛠️ STEP 2: STATUS FILTER BUTTONS */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto">
              {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap transition-all
                    ${statusFilter === status
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* 🛠️ STEP 3: TYPE FILTER BUTTONS */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto">
              {['All', 'Internship', 'Full-time', 'Contract', 'Remote'].map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap transition-all
                    ${typeFilter === type
                      ? 'bg-slate-800 text-white border-slate-800 shadow-md'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- JOB GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                onClick={() => handleJobClick(job)}
                className="group bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-xl hover:shadow-indigo-100/50 hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full relative overflow-hidden"
              >
                {/* Decorative background gradient on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-14 w-14 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-sm ${job.logoColor || "bg-gradient-to-br from-slate-700 to-slate-900"
                        }`}
                    >
                      {job.company.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {job.title}
                      </h3>

                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-slate-500 font-medium">
                          {job.company}
                        </p>
                         {/* STATUS BADGE */}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider
                            ${job.status === "pending" && "bg-yellow-100 text-yellow-700"}
                            ${job.status === "approved" && "bg-green-100 text-green-700"}
                            ${job.status === "rejected" && "bg-red-100 text-red-700"}
                          `}
                        >
                          {job.status?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wide">
                    {job.type}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wide">
                    {job.workMode}
                  </span>
                  {job.finalYearAllowed && (
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-green-50 text-green-700 border border-green-100 uppercase tracking-wide flex items-center gap-1">
                      <CheckCircle2 size={12} /> Final Year
                    </span>
                  )}
                </div>

                {/* Footer Info */}
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><MapPin size={14} className="text-slate-400" />{job.location}</span>
                    <span className="flex items-center gap-1 text-slate-700"><DollarSign size={14} className="text-slate-400" />{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock size={14} /> {timeAgo(job.createdAt)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 flex flex-col items-center text-center bg-white rounded-2xl border border-dashed border-slate-300">
              <div className="bg-slate-50 p-4 rounded-full mb-4">
                <Filter className="h-10 w-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">No jobs found</h3>
              <p className="text-slate-500 max-w-xs mx-auto">We couldn't find any opportunities matching your filters. Try adjusting your search.</p>
              <button
                 onClick={() => {setSearchTerm(''); setStatusFilter('All'); setTypeFilter('All');}}
                 className="mt-6 text-indigo-600 font-semibold text-sm hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- JOB DETAIL MODAL --- */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex justify-end items-stretch">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={closeJobDetail}
          ></div>

          <div className="relative w-full md:max-w-2xl bg-white shadow-2xl flex flex-col h-full overflow-hidden animate-in slide-in-from-right duration-300 sm:rounded-l-3xl">

            {/* Modal Header */}
            <div className="flex-none bg-white z-10 px-6 py-4 flex items-center justify-between border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Job Details</h2>
              <button
                onClick={closeJobDetail}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-8 space-y-8 pb-32">

              {/* Job Title Header */}
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div className={`h-20 w-20 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-slate-200 shrink-0 ${selectedJob.logoColor || "bg-gradient-to-br from-slate-700 to-slate-900"}`}>
                  {selectedJob.company.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">{selectedJob.title}</h1>
                  <div className="flex flex-wrap items-center gap-3 text-slate-600 mt-3 text-sm font-medium">
                    <span className="flex items-center gap-1.5"><Building2 size={16} className="text-indigo-600" /> {selectedJob.company}</span>
                    <span className="text-slate-300">|</span>
                    <span className="flex items-center gap-1.5"><MapPin size={16} className="text-indigo-600" /> {selectedJob.location}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setSavedJobs(p => p.includes(selectedJob._id) ? p.filter(i => i !== selectedJob._id) : [...p, selectedJob._id])}
                  className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold transition-all
                  ${savedJobs.includes(selectedJob._id)
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-inner'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}`}
                >
                  <Bookmark size={18} className={savedJobs.includes(selectedJob._id) ? "fill-current" : ""} />
                  {savedJobs.includes(selectedJob._id) ? 'Saved' : 'Save Job'}
                </button>
                <button className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center gap-2 text-sm font-semibold transition-all">
                  <Share2 size={18} /> Share
                </button>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => handleDeleteJob(selectedJob._id)}
                  className="flex-none px-4 py-3 rounded-xl border border-red-100 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-200 flex items-center justify-center gap-2 text-sm font-semibold transition-all"
                  title="Delete Job"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Key Information Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-indigo-100 transition-colors">
                  <p className="text-[11px] text-slate-500 uppercase font-bold tracking-wider mb-1">Salary</p>
                  <p className="text-sm font-bold text-slate-900">{selectedJob.salary}</p>
                </div>
                <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-indigo-100 transition-colors">
                  <p className="text-[11px] text-slate-500 uppercase font-bold tracking-wider mb-1">Experience</p>
                  <p className="text-sm font-bold text-slate-900">{selectedJob.experienceLevel}</p>
                </div>
                <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-indigo-100 transition-colors">
                  <p className="text-[11px] text-slate-500 uppercase font-bold tracking-wider mb-1">Job Type</p>
                  <p className="text-sm font-bold text-slate-900">{selectedJob.type} ({selectedJob.workMode})</p>
                </div>
                <div className="p-4 bg-red-50/50 rounded-xl border border-red-100">
                  <p className="text-[11px] text-red-500 uppercase font-bold tracking-wider mb-1">Deadline</p>
                  <p className="text-sm font-bold text-red-700">{selectedJob.deadline}</p>
                </div>
              </div>

              {/* Description */}
              <section className="prose prose-sm max-w-none prose-slate">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <FileText size={16} className="text-indigo-500"/> Overview
                </h3>
                <p className="text-slate-600 leading-relaxed text-[15px]">
                  {selectedJob.description}
                </p>
              </section>

              {/* Responsibilities */}
              <section>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Briefcase size={16} className="text-indigo-500"/> Responsibilities
                </h3>
                <ul className="space-y-3">
                  {selectedJob.responsibilities?.map((res, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-600 text-[15px]">
                      <div className="h-2 w-2 rounded-full bg-indigo-500 mt-2 shrink-0 shadow-sm shadow-indigo-300"></div>
                      <span className="leading-relaxed">{res}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Skills */}
              <section>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-indigo-500"/> Skills Required
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills?.required?.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-sm">
                      {skill}
                    </span>
                  ))}
                  {selectedJob.skills?.preferred?.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-white text-slate-600 rounded-lg text-xs font-semibold border border-slate-200 shadow-sm">
                      {skill} (Preferred)
                    </span>
                  ))}
                </div>
              </section>

              {/* Education & Requirements Box */}
              <section className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/60">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Requirements Summary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-4 text-sm">
                  <div>
                    <span className="block text-xs font-semibold text-slate-400 mb-1">Education</span>
                    <span className="block font-semibold text-slate-800">{selectedJob.education}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-400 mb-1">Openings</span>
                    <span className="block font-semibold text-slate-800">{selectedJob.openings} Positions</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-400 mb-1">Final Year Policy</span>
                    <span className={`inline-flex items-center gap-1 font-semibold ${selectedJob.finalYearAllowed ? 'text-emerald-600' : 'text-slate-600'}`}>
                      {selectedJob.finalYearAllowed ? <CheckCircle2 size={14}/> : <X size={14}/>}
                      {selectedJob.finalYearAllowed ? 'Eligible' : 'Not Eligible'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-400 mb-1">Required Docs</span>
                    <span className="block font-semibold text-slate-800">{selectedJob.requiredDocs?.join(', ') || "None"}</span>
                  </div>
                </div>
              </section>

              {/* Alumni Card (Trust Signal) */}
              <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl border border-indigo-100 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-indigo-900 pointer-events-none">
                  <GraduationCap size={150} />
                </div>
                <div className="relative z-10">
                  <h4 className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-4">Posted By Alumni</h4>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-indigo-700 font-bold border border-indigo-100 shadow-md text-lg">
                      {selectedJob.postedBy.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-base">{selectedJob.postedBy.name}</p>
                      <p className="text-xs text-slate-600 font-medium">{selectedJob.postedBy.role} at {selectedJob.postedBy.company}</p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wide">{selectedJob.postedBy.batch} • {selectedJob.postedBy.department}</p>
                    </div>
                  </div>
                  {selectedJob.postedBy.showContact && (
                    <div className="flex gap-3 mt-4 pt-4 border-t border-indigo-100/50">
                      <button className="flex-1 py-2 bg-white border border-indigo-100 rounded-lg text-xs font-semibold text-indigo-700 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                        <Linkedin size={14} /> View Profile
                      </button>
                      <button className="flex-1 py-2 bg-white border border-indigo-100 rounded-lg text-xs font-semibold text-indigo-700 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                        <Mail size={14} /> Contact Alumni
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sticky Footer Action */}
            <div className="flex-none p-5 bg-white border-t border-slate-100 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
              {selectedJob.applyMethod === 'External' ? (
                <a
                  href={selectedJob.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold shadow-lg shadow-slate-200 transition-all hover:-translate-y-0.5"
                >
                  Apply on Company Site <ExternalLink size={18} />
                </a>
              ) : (
                <button className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5">
                  Apply Now
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* --- CREATE JOB MODAL --- */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl flex flex-col shadow-2xl overflow-hidden scale-100 border border-slate-100">

            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Post Opportunity</h2>
                <p className="text-xs text-slate-500 font-medium mt-1">Share a job or internship with your junior alumni.</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10 no-scrollbar">

              {/* Section 1: Basic Info */}
              <section className="space-y-6">
                <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2 border-b border-indigo-100 pb-2">
                  <Briefcase size={16} /> Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Job Title <span className="text-red-500">*</span></label>
                    <input name="title" placeholder="e.g. Frontend Developer" value={formData.title} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-medium text-slate-700" required />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Company Name <span className="text-red-500">*</span></label>
                    <input name="company" placeholder="e.g. Google" value={formData.company} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-medium text-slate-700" required />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Location <span className="text-red-500">*</span></label>
                    <input name="location" placeholder="e.g. Bangalore" value={formData.location} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-medium text-slate-700" required />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Job Type</label>
                    <div className="relative">
                      <select name="type" value={formData.type} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700 appearance-none">
                        <option>Full-time</option><option>Internship</option><option>Contract</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                         <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Work Mode</label>
                     <div className="relative">
                      <select name="workMode" value={formData.workMode} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700 appearance-none">
                        <option>On-site</option><option>Remote</option><option>Hybrid</option>
                      </select>
                       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                         <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Details */}
              <section className="space-y-6">
                <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2 border-b border-indigo-100 pb-2">
                  <FileText size={16} /> Job Description
                </h3>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Overview</label>
                  <textarea name="description" rows={4} placeholder="Brief summary of the role..." value={formData.description} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-medium text-slate-700 resize-none" required />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Responsibilities (Comma separated)</label>
                  <textarea name="responsibilities" rows={3} placeholder="Build UI, Fix bugs, Write tests..." value={formData.responsibilities} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-medium text-slate-700 resize-none" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Required Skills (Comma separated)</label>
                    <input name="reqSkills" placeholder="React, Node.js..." value={formData.reqSkills} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-medium text-slate-700" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Preferred Skills</label>
                    <input name="prefSkills" placeholder="AWS, Docker..." value={formData.prefSkills} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-medium text-slate-700" />
                  </div>
                </div>
              </section>

              {/* Section 3: Criteria & Benefits */}
              <section className="space-y-6">
                <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2 border-b border-indigo-100 pb-2">
                  <Users size={16} /> Candidate Criteria
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Experience Level</label>
                    <div className="relative">
                      <select name="experienceLevel" value={formData.experienceLevel} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700 appearance-none">
                        <option>Fresher</option><option>0-1 Years</option><option>1-3 Years</option><option>3+ Years</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                         <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Education Requirement</label>
                    <input name="education" placeholder="e.g. B.Tech CS/IT or Any Graduate" value={formData.education} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-medium text-slate-700" />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <input type="checkbox" name="finalYearAllowed" id="fya" checked={formData.finalYearAllowed} onChange={handleInputChange} className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300" />
                  <label htmlFor="fya" className="text-sm text-slate-700 font-medium">Final Year Students Allowed?</label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Salary Range</label>
                    <input name="salaryRange" placeholder="e.g. ₹6-8 LPA or ₹15k/mo" value={formData.salaryRange} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-medium text-slate-700" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Benefits (Comma separated)</label>
                    <input name="benefits" placeholder="Health, PPO, Mentorship..." value={formData.benefits} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-medium text-slate-700" />
                  </div>
                </div>
              </section>

              {/* Section 4: Application Flow */}
              <section className="space-y-6">
                <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2 border-b border-indigo-100 pb-2">
                  <Monitor size={16} /> Application Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Deadline</label>
                    <input type="date" name="deadline" value={formData.deadline} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Openings</label>
                    <input type="number" name="openings" value={formData.openings} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Apply Method</label>
                    <div className="relative">
                      <select name="applyMethod" value={formData.applyMethod} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700 appearance-none">
                        <option value="Platform">On Platform</option><option value="External">External Link</option>
                      </select>
                       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                         <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formData.applyMethod === 'External' && (
                    <div className="animate-in fade-in slide-in-from-top-2">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">External Application URL</label>
                      <input name="externalLink" placeholder="https://..." value={formData.externalLink} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-medium text-slate-700" />
                    </div>
                  )}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Job / Application Email</label>
                    <input name="jobEmail" type="email" placeholder="hr@company.com" value={formData.jobEmail} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-medium text-slate-700" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <label className="flex items-center gap-2 text-sm text-slate-700 font-medium cursor-pointer">
                    <input type="checkbox" name="reqResume" checked={formData.reqResume} onChange={handleInputChange} className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300" />
                    Resume Required
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-700 font-medium cursor-pointer">
                    <input type="checkbox" name="reqPortfolio" checked={formData.reqPortfolio} onChange={handleInputChange} className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300" />
                    Portfolio Required
                  </label>
                </div>
              </section>

              {/* Section 5: Alumni Info */}
              <section className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/60">
                <h3 className="text-xs font-bold text-indigo-800 uppercase mb-4 flex items-center gap-2"><GraduationCap size={16} /> Alumni Visibility</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <input name="alumniName" placeholder="Your Name" value={formData.alumniName} onChange={handleInputChange} className="p-3 border border-indigo-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium" />
                  <input name="alumniRole" placeholder="Your Role (e.g. SDE II)" value={formData.alumniRole} onChange={handleInputChange} className="p-3 border border-indigo-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium" />
                  <input name="alumniBatch" placeholder="Batch (e.g. 2020)" value={formData.alumniBatch} onChange={handleInputChange} className="p-3 border border-indigo-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium" />
                  <input name="alumniDept" placeholder="Department (e.g. CSE)" value={formData.alumniDept} onChange={handleInputChange} className="p-3 border border-indigo-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="showContact" id="sc" checked={formData.showContact} onChange={handleInputChange} className="w-4 h-4 text-indigo-600 rounded border-indigo-300" />
                  <label htmlFor="sc" className="text-sm text-indigo-800 font-medium cursor-pointer">Allow students to contact me (Email/LinkedIn)</label>
                </div>
              </section>

            </form>

            <div className="p-5 border-t border-slate-100 bg-white flex justify-end gap-3 z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
              <button onClick={() => setShowCreateModal(false)} className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors text-sm">Cancel</button>
              <button onClick={handleSubmit} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 text-sm">Post Opportunity</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsBoard;