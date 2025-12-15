import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Clock,
  Search,
  Bookmark,
  Building2,
  Users, // Note: You can remove this import if you want to clean up unused icons
  CheckCircle,
  ArrowRight,
  MapPin,
  ExternalLink,
  ArrowLeft,
  Filter,
  MoreHorizontal,
  DollarSign
} from "lucide-react";

const StudentJobs = () => {
  // --- UTILITY: Hide Scrollbar CSS ---
  const ScrollbarStyles = () => (
    <style>{`
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>
  );

  // --- STATE ---
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

  const [filters, setFilters] = useState({
    type: "",
    workMode: "",
  });

  // --- FETCH ---
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/jobs/approved", {
          credentials: "include",
        });
        const data = await res.json();
        const safeData = Array.isArray(data) ? data : [];
        setJobs(safeData);

        if (safeData.length > 0) {
          setSelectedJobId(safeData[0]._id);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // --- HELPERS ---
  const timeAgo = (date) => {
    if (!date) return "Recently";
    const diff = Math.floor((Date.now() - new Date(date)) / 1000);
    const days = Math.floor(diff / 86400);
    if (days > 0) return `${days}d ago`;
    const hours = Math.floor(diff / 3600);
    if (hours > 0) return `${hours}h ago`;
    return "Just now";
  };

  const getLogoColor = (name) => {
    const colors = [
      "bg-indigo-600", "bg-blue-600", "bg-emerald-600", 
      "bg-violet-600", "bg-rose-500", "bg-amber-500"
    ];
    return colors[(name?.length || 0) % colors.length];
  };

  const toggleSaveJob = (e, id) => {
    e.stopPropagation();
    setSavedJobs((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleJobClick = (id) => {
    setSelectedJobId(id);
    setIsMobileDetailOpen(true);
  };

  // --- FILTERING ---
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters =
      (!filters.type || job.type === filters.type) &&
      (!filters.workMode || job.workMode === filters.workMode);

    return matchesSearch && matchesFilters;
  });

  const selectedJob = jobs.find((j) => j._id === selectedJobId) || filteredJobs[0];

  return (
    <div className="h-screen flex flex-col bg-gray-50 text-slate-900 font-sans">
      <ScrollbarStyles />

      {/* --- HEADER --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          
          {/* Search Bar */}
          <div className="relative w-full md:max-w-md group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search roles, companies, or skills..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                className="text-sm text-gray-600 bg-transparent outline-none cursor-pointer"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
              <MapPin className="w-4 h-4 text-gray-500" />
              <select
                className="text-sm text-gray-600 bg-transparent outline-none cursor-pointer"
                value={filters.workMode}
                onChange={(e) => setFilters({ ...filters, workMode: e.target.value })}
              >
                <option value="">Any Location</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
            
            {(filters.type || filters.workMode) && (
              <button
                onClick={() => setFilters({ type: "", workMode: "" })}
                className="text-xs text-indigo-600 font-medium hover:underline px-2"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-12 gap-0 lg:gap-6 px-0 lg:px-4 py-0 lg:py-6 overflow-hidden">
        
        {loading ? (
          // Skeleton Loading State
          <div className="col-span-12 flex gap-6 h-full p-4">
             <div className="w-full lg:w-5/12 bg-white rounded-xl border border-gray-200 p-4 space-y-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="flex gap-4 animate-pulse">
                   <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                   <div className="flex-1 space-y-2">
                     <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                     <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                   </div>
                 </div>
               ))}
             </div>
             <div className="hidden lg:block lg:w-7/12 bg-white rounded-xl border border-gray-200 p-6">
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
             </div>
          </div>
        ) : (
          <>
            {/* --- LIST VIEW --- */}
            <div className={`col-span-12 lg:col-span-5 h-full flex flex-col bg-white lg:rounded-xl lg:border lg:border-gray-200 overflow-hidden ${isMobileDetailOpen ? "hidden lg:flex" : "flex"}`}>
              <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">Job Feed</h2>
                <span className="text-xs font-medium px-2 py-1 bg-gray-200 rounded-full text-gray-600">{filteredJobs.length} jobs</span>
              </div>
              
              <div className="flex-1 overflow-y-auto no-scrollbar">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <div
                      key={job._id}
                      onClick={() => handleJobClick(job._id)}
                      className={`group p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50 
                        ${selectedJobId === job._id ? "bg-indigo-50/60 border-l-4 border-l-indigo-600" : "border-l-4 border-l-transparent hover:border-l-gray-300"}
                      `}
                    >
                      <div className="flex gap-4 items-start">
                        {/* Logo */}
                        <div className={`w-12 h-12 shrink-0 ${getLogoColor(job.company)} text-white rounded-lg shadow-sm flex items-center justify-center font-bold text-lg`}>
                          {job.company?.[0]?.toUpperCase()}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-bold text-base truncate ${selectedJobId === job._id ? "text-indigo-700" : "text-gray-900 group-hover:text-indigo-600"}`}>
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                             <span className="text-sm font-medium text-gray-700 truncate">{job.company}</span>
                             {job.type === "Internship" && (
                               <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Intern</span>
                             )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><MapPin size={12}/> {job.location} ({job.workMode})</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span>{timeAgo(job.createdAt)}</span>
                          </div>
                        </div>

                        {/* Save Button */}
                        <button
                          onClick={(e) => toggleSaveJob(e, job._id)}
                          className="text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-full transition-colors"
                        >
                          <Bookmark className={`w-4 h-4 ${savedJobs.includes(job._id) ? "fill-indigo-600 text-indigo-600" : ""}`} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center px-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-gray-900 font-medium mb-1">No jobs found</h3>
                    <p className="text-gray-500 text-sm">Try adjusting your search or filters to find what you're looking for.</p>
                    <button 
                        onClick={() => {setSearchTerm(""); setFilters({type:"", workMode:""});}}
                        className="mt-4 text-indigo-600 text-sm font-medium hover:underline"
                    >
                        Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* --- DETAILS VIEW --- */}
            <div className={`col-span-12 lg:col-span-7 h-full flex flex-col bg-white lg:rounded-xl lg:border lg:border-gray-200 overflow-hidden ${isMobileDetailOpen ? "flex fixed inset-0 z-50 lg:static" : "hidden lg:flex"}`}>
              {selectedJob ? (
                <>
                  {/* Detail Header */}
                  <div className="p-6 border-b border-gray-200 shadow-sm bg-white sticky top-0 z-10">
                    <button
                      className="lg:hidden mb-4 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 font-medium"
                      onClick={() => setIsMobileDetailOpen(false)}
                    >
                      <ArrowLeft size={16} /> Back to Job List
                    </button>

                    <div className="flex justify-between items-start gap-4">
                      <div className="flex gap-4">
                        <div className={`w-16 h-16 ${getLogoColor(selectedJob.company)} text-white rounded-xl shadow-md flex items-center justify-center font-bold text-2xl`}>
                           {selectedJob.company?.[0]?.toUpperCase()}
                        </div>
                        <div>
                           <h1 className="text-2xl font-bold text-gray-900 leading-tight">{selectedJob.title}</h1>
                           <div className="flex items-center gap-2 text-gray-600 mt-1">
                             <Building2 size={16} className="text-gray-400" />
                             <span className="font-medium">{selectedJob.company}</span>
                             <span className="text-gray-300">|</span>
                             <span className="text-sm">{selectedJob.location}</span>
                           </div>
                           <div className="flex gap-2 mt-3">
                             {/* REMOVED APPLICANTS TAB HERE */}
                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                               {selectedJob.type}
                             </span>
                           </div>
                        </div>
                      </div>
                      
                      <div className="hidden sm:flex gap-2">
                          <button onClick={(e) => toggleSaveJob(e, selectedJob._id)} className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors">
                             <Bookmark className={`w-5 h-5 ${savedJobs.includes(selectedJob._id) ? "fill-indigo-600 text-indigo-600 border-indigo-600" : ""}`} />
                          </button>
                          <button className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors">
                             <MoreHorizontal className="w-5 h-5" />
                          </button>
                      </div>
                    </div>
                  </div>

                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
                    
                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                           <p className="text-xs text-gray-500 mb-1">Salary / Stipend</p>
                           <p className="font-semibold text-gray-900 text-sm flex items-center gap-1">
                               <DollarSign size={14} className="text-green-600"/> {selectedJob.salary || "Not disclosed"}
                           </p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                           <p className="text-xs text-gray-500 mb-1">Work Mode</p>
                           <p className="font-semibold text-gray-900 text-sm flex items-center gap-1">
                               <MapPin size={14} className="text-blue-600"/> {selectedJob.workMode}
                           </p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                           <p className="text-xs text-gray-500 mb-1">Job Type</p>
                           <p className="font-semibold text-gray-900 text-sm flex items-center gap-1">
                               <Briefcase size={14} className="text-purple-600"/> {selectedJob.type}
                           </p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                           <p className="text-xs text-gray-500 mb-1">Posted</p>
                           <p className="font-semibold text-gray-900 text-sm flex items-center gap-1">
                               <Clock size={14} className="text-orange-600"/> {timeAgo(selectedJob.createdAt)}
                           </p>
                        </div>
                    </div>

                    {/* About Section */}
                    <section>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">About the Role</h3>
                        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                            {selectedJob.description}
                        </p>
                    </section>

                    {/* Skills Section */}
                    {selectedJob.skills?.required?.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Skills & Requirements</h3>
                            <div className="flex flex-wrap gap-2">
                                {selectedJob.skills.required.map((skill, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:border-indigo-300 hover:text-indigo-600 transition-colors cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                  </div>

                  {/* Footer / Apply Action */}
                  <div className="p-5 border-t border-gray-200 bg-gray-50 flex justify-end gap-3 items-center">
                    <span className="text-xs text-gray-500 mr-auto hidden md:block">
                        Problem with this listing? <button className="underline hover:text-red-500">Report</button>
                    </span>
                    
                    {selectedJob.applyMethod === "External" ? (
                      <a
                        href={selectedJob.externalLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md shadow-indigo-100 transition-all flex items-center justify-center gap-2"
                      >
                        Apply Externally <ExternalLink size={16} />
                      </a>
                    ) : (
                      <button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md shadow-indigo-100 transition-all flex items-center justify-center gap-2">
                        Apply Now <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                  <Briefcase className="w-16 h-16 text-gray-200 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">Select a job to view details</h3>
                  <p className="text-sm text-gray-500 max-w-xs mt-2">Click on any job card from the list on the left to view complete details and apply.</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default StudentJobs;