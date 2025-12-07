import React, { useState, useEffect } from 'react';
import { 
  Briefcase, MapPin, Clock, DollarSign, Users, 
  PlusCircle, CheckCircle2, X, 
  ExternalLink, Mail, FileText, MoreHorizontal, Filter, 
  Globe, GraduationCap, ChevronDown 
} from 'lucide-react';

// --- MOCK DATA --- (kept unchanged)
const MY_JOBS_MOCK = [
  { id: 1, title: "Senior Software Engineer", type: "Full-time", company: "Microsoft", location: "Bangalore", applicants: 14, posted: "2d ago", status: "Approved", logo: "M", salary: "₹25L - ₹40L", exp: "3-5 Yrs", skills: ["React", "Node.js", "Azure", "System Design"], description: "We are looking for an experienced Senior Software Engineer...", responsibilities: ["Design APIs", "Mentor juniors"], qualifications: ["B.Tech CS", "5+ Yrs Exp"], applyLink: "#", contactEmail: "careers@microsoft.com" },
  { id: 3, title: "Frontend Developer", type: "Contract", company: "StartUp Inc", location: "Delhi (Hybrid)", applicants: 0, posted: "3d ago", status: "Rejected", logo: "S", salary: "₹12L - ₹18L", exp: "1-3 Yrs", skills: ["Vue.js", "Tailwind"], description: "Contract frontend dev needed...", responsibilities: ["Convert Figma to Code"], qualifications: ["1+ Yr Exp"], applyLink: "#", contactEmail: "hr@startup.com" },
  { id: 2, title: "Product Design Intern", type: "Internship", company: "Google", location: "Remote", applicants: 42, posted: "1w ago", status: "Pending", logo: "G", salary: "₹40k/mo", exp: "Fresher", skills: ["Figma", "Adobe XD"], description: "6-month design internship...", responsibilities: ["Wireframing", "User Testing"], qualifications: ["Pursuing Degree"], applyLink: "#", contactEmail: "interns@google.com" },
  { id: 4, title: "React Developer Intern", type: "Internship", company: "Spotify", location: "Mumbai", applicants: 12, posted: "5h ago", status: "Approved", logo: "S", salary: "₹35k/mo", exp: "Fresher", skills: ["React", "Redux"], description: "Summer internship for React devs...", responsibilities: ["Build UI components", "Fix bugs"], qualifications: ["Pursuing CS Degree"], applyLink: "#", contactEmail: "hr@spotify.com" },
];

const MOCK_APPLICANTS = [
  { id: 101, jobId: 1, name: "Rahul Sharma", email: "rahul@ex.com", status: "Under Review", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", exp: "4 Yrs" },
  { id: 102, jobId: 1, name: "Sneha Gupta", email: "sneha@ex.com", status: "Shortlisted", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150", exp: "5 Yrs" },
];

export default function Jobs() {
  const [jobs, setJobs] = useState(MY_JOBS_MOCK);
  const [filterStatus, setFilterStatus] = useState("All");
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [activeExpandedTab, setActiveExpandedTab] = useState("details");
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobSuccess, setJobSuccess] = useState(false);
  const [modalCategory, setModalCategory] = useState(null);

  // --- Two-step selector state ---
  const [categorySelect, setCategorySelect] = useState("Job"); 

  const professionalTypes = ["Full-time", "Part-time", "Contract", "Freelance"];
  const studentTypes = ["Internship", "Trainee", "Co-op"];

  const [roleTypeSelect, setRoleTypeSelect] = useState(professionalTypes[0]);

  // Form State
  const [formData, setFormData] = useState({
    title: "", company: "", location: "", type: professionalTypes[0], salary: "",
    skills: "", description: "", responsibilities: "", qualifications: "", applyLink: "", contactEmail: ""
  });

  // Sync roleType + formData when category changes
  useEffect(() => {
    if (categorySelect === "Job") {
      setRoleTypeSelect(professionalTypes[0]);
      setFormData(prev => ({ ...prev, type: professionalTypes[0] }));
    } else {
      setRoleTypeSelect(studentTypes[0]);
      setFormData(prev => ({ ...prev, type: studentTypes[0] }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySelect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      id: jobs.length + 1,
      ...formData,
      applicants: 0,
      posted: "Just now",
      status: "Pending",
      logo: (formData.company && formData.company[0]) ? formData.company[0].toUpperCase() : "J",
      exp: (studentTypes.includes(formData.type)) ? "Fresher" : "N/A",
      skills: formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
      responsibilities: formData.responsibilities ? formData.responsibilities.split('\n').map(s => s.trim()).filter(Boolean) : [],
      qualifications: formData.qualifications ? formData.qualifications.split('\n').map(s => s.trim()).filter(Boolean) : []
    };
    
    setTimeout(() => {
      setJobs(prev => [newJob, ...prev]);
      setJobSuccess(true);
    }, 400);
  };

  const closeForm = () => {
    setShowJobForm(false);
    setJobSuccess(false);
    setModalCategory(null);
    setFormData({
      title: "", company: "", location: "", type: professionalTypes[0], salary: "",
      skills: "", description: "", responsibilities: "", qualifications: "", applyLink: "", contactEmail: ""
    });
  };

  // --- LOGIC: Filter then Split ---
  const filteredAll = jobs.filter(job => filterStatus === 'All' ? true : job.status === filterStatus);
  const internshipList = filteredAll.filter(j => studentTypes.includes(j.type));
  const regularJobList = filteredAll.filter(j => !studentTypes.includes(j.type));

  // Which list to show & filtered by the selected role type
  const showingStudentList = categorySelect === "Internship";
  const displayedList = showingStudentList
    ? internshipList.filter(j => j.type === roleTypeSelect)
    : regularJobList.filter(j => j.type === roleTypeSelect);

  const openPostForSelection = () => {
    setModalCategory(categorySelect === "Internship" ? "Internship" : "Job");
    setFormData(prev => ({ ...prev, type: roleTypeSelect }));
    setShowJobForm(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* HEADER */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Career Listings</h2>
          <p className="text-slate-500 text-sm mt-1">Manage jobs and internships in one place.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          
          {/* STYLED SELECTOR 1: Category */}
          <div className="relative group min-w-[180px]">
            {/* Conditional Icon */}
            <div className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${categorySelect === 'Job' ? 'text-blue-600' : 'text-purple-600'}`}>
              {categorySelect === 'Job' ? <Briefcase className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
            </div>
            
            <select
              value={categorySelect}
              onChange={(e) => setCategorySelect(e.target.value)}
              className={`w-full appearance-none py-2.5 pl-10 pr-10 rounded-xl text-sm font-bold border-2 focus:outline-none focus:ring-4 transition-all cursor-pointer shadow-sm
                ${categorySelect === 'Job' 
                  ? 'bg-blue-50 border-blue-100 text-blue-700 hover:border-blue-200 focus:border-blue-500 focus:ring-blue-500/20' 
                  : 'bg-purple-50 border-purple-100 text-purple-700 hover:border-purple-200 focus:border-purple-500 focus:ring-purple-500/20'
                }`}
            >
              <option value="Job">Job / Professional</option>
              <option value="Internship">Student / Intern</option>
            </select>
            
            {/* Conditional Chevron */}
            <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors ${categorySelect === 'Job' ? 'text-blue-400' : 'text-purple-400'}`} />
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

          {/* STYLED SELECTOR 2: Role Type */}
          <div className="relative group min-w-[160px]">
            <select
              value={roleTypeSelect}
              onChange={(e) => {
                setRoleTypeSelect(e.target.value);
                setFormData(prev => ({ ...prev, type: e.target.value }));
              }}
              className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm transition-all hover:border-indigo-300 cursor-pointer"
            >
              {(categorySelect === "Job" ? professionalTypes : studentTypes).map(rt => (
                <option key={rt} value={rt}>{rt}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-indigo-500 transition-colors" />
          </div>

          {/* Post button uses both selections */}
          <button onClick={openPostForSelection} className="ml-auto sm:ml-2 flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-all active:scale-95">
            <PlusCircle className="w-4 h-4" /> 
            <span className="hidden sm:inline">Post Opportunity</span>
            <span className="sm:hidden">Post</span>
          </button>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
        {['All', 'Approved', 'Pending', 'Rejected'].map(status => (
          <button key={status} onClick={() => setFilterStatus(status)} className={`px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-1.5 whitespace-nowrap ${filterStatus === status ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
            {status}
          </button>
        ))}
      </div>

      {/* LIST: display filtered results */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2 mb-2">
          <div className={`p-1.5 ${showingStudentList ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'} rounded-md`}>
            {showingStudentList ? <GraduationCap className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
          </div>
          <h3 className="font-bold text-slate-800">{showingStudentList ? 'Internships & Student Programs' : 'Full-time & Contract'}</h3>
          <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{displayedList.length}</span>
          
          {/* Current Filter Pill */}
          <div className="ml-auto text-xs font-medium text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
            Viewing: {roleTypeSelect}
          </div>
        </div>

        {displayedList.length === 0 ? <EmptyState type={showingStudentList ? "internships" : "jobs"} /> : (
          displayedList.map(job => (
            <JobCard 
              key={job.id} job={job} 
              expandedJobId={expandedJobId} setExpandedJobId={setExpandedJobId}
              activeExpandedTab={activeExpandedTab} setActiveExpandedTab={setActiveExpandedTab}
            />
          ))
        )}
      </div>

      {/* FORM MODAL */}
      {showJobForm && (
        <PostJobModal 
          formData={formData} setFormData={setFormData} closeForm={closeForm} handleSubmit={handleSubmit} jobSuccess={jobSuccess}
          initialCategory={modalCategory}
        />
      )}
    </div>
  );
}

// --- EXTRACTED COMPONENTS (unchanged) ---
const EmptyState = ({ type }) => (
  <div className="text-center py-12 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <Filter className="w-5 h-5 text-slate-400" />
    </div>
    <p className="text-slate-900 font-medium">No {type} found</p>
    <p className="text-slate-500 text-sm mt-1">Try adjusting your category filters.</p>
  </div>
);

const JobCard = ({ job, expandedJobId, setExpandedJobId, activeExpandedTab, setActiveExpandedTab }) => {
  const isExpanded = expandedJobId === job.id;
  const toggleExpand = () => {
    if (isExpanded) setExpandedJobId(null);
    else {
      setExpandedJobId(job.id);
      setActiveExpandedTab("details");
    }
  };

  return (
    <div className={`group bg-white rounded-xl border border-slate-200 transition-all duration-200 hover:shadow-md ${isExpanded ? 'shadow-md ring-1 ring-slate-200' : ''}`}>
      {/* Card Header */}
      <div className="p-6 cursor-pointer" onClick={toggleExpand}>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-16 h-16 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center font-bold text-2xl border border-slate-100 shrink-0 shadow-sm">
            {job.logo}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                  {job.company} <span className="w-1 h-1 rounded-full bg-slate-300"></span> {job.location}
                </p>
              </div>
              <StatusBadge status={job.status} />
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <Badge icon={['Internship', 'Trainee', 'Co-op'].includes(job.type) ? <GraduationCap size={14}/> : <Briefcase size={14}/>} text={job.type} />
              <Badge icon={<DollarSign size={14}/>} text={job.salary} />
              <Badge icon={<Clock size={14}/>} text={job.exp} />
              <div className="ml-auto flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {job.applicants}</span>
                <span className="hidden sm:inline text-slate-300">|</span>
                <span className="hidden sm:inline">Posted {job.posted}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-slate-100 bg-slate-50/50 rounded-b-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex px-6 border-b border-slate-200 bg-white">
            <TabButton active={activeExpandedTab === 'details'} onClick={() => setActiveExpandedTab('details')} label="Details" />
            <TabButton active={activeExpandedTab === 'applicants'} onClick={() => setActiveExpandedTab('applicants')} label="Applicants" count={job.applicants} />
          </div>
          <div className="p-6 md:p-8">
            {activeExpandedTab === 'details' ? <JobDetailsContent job={job} /> : <ApplicantsList jobId={job.id} />}
          </div>
        </div>
      )}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = { Approved: 'bg-emerald-50 text-emerald-700 border-emerald-100', Pending: 'bg-amber-50 text-amber-700 border-amber-100', Rejected: 'bg-red-50 text-red-700 border-red-100' };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles.Pending}`}>{status}</span>
  );
};

const Badge = ({ icon, text }) => (
  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md border border-slate-200 flex items-center gap-1.5">{icon} {text}</span>
);

const TabButton = ({ active, onClick, label, count }) => (
  <button onClick={(e) => { e.stopPropagation(); onClick(); }} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${active ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
    {label}
    {count !== undefined && <span className={`px-1.5 py-0.5 text-[10px] rounded-full ${active ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-600'}`}>{count}</span>}
  </button>
);

const JobDetailsContent = ({ job }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-sm">
    <div className="lg:col-span-2 space-y-6">
      <div><h4 className="text-lg font-semibold text-slate-900 mb-2">About</h4><p className="text-slate-600 leading-relaxed">{job.description}</p></div>
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Responsibilities</h4>
        <ul className="space-y-1 text-slate-700">{job.responsibilities.map((r, i) => <li key={i} className="flex gap-2"><span className="text-indigo-400">•</span>{r}</li>)}</ul>
      </div>
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Qualifications</h4>
        <ul className="space-y-1 text-slate-700">{job.qualifications.map((q, i) => <li key={i} className="flex gap-2"><span className="text-slate-300">•</span>{q}</li>)}</ul>
      </div>
    </div>
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Skills</h4>
        <div className="flex flex-wrap gap-2">{job.skills.map(skill => <span key={skill} className="px-2 py-1 bg-slate-50 text-slate-600 text-xs rounded border border-slate-200">{skill}</span>)}</div>
      </div>
      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <a href={job.applyLink} className="flex items-center gap-2 text-sm text-indigo-600 hover:underline mb-2"><Globe className="w-4 h-4" /> Apply Link <ExternalLink className="w-3 h-3" /></a>
        <div className="flex items-center gap-2 text-sm text-slate-600"><Mail className="w-4 h-4 text-slate-400" /> {job.contactEmail}</div>
      </div>
    </div>
  </div>
);

const ApplicantsList = ({ jobId }) => {
  const apps = MOCK_APPLICANTS.filter(a => a.jobId === jobId);
  if (apps.length === 0) return <div className="text-center py-8 text-slate-500 text-sm">No applicants yet.</div>;
  return (
    <div className="grid gap-3">
      {apps.map(app => (
        <div key={app.id} className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between hover:shadow-sm">
          <div className="flex items-center gap-3">
            <img src={app.img} className="w-10 h-10 rounded-full" alt="" />
            <div><h4 className="font-bold text-slate-900 text-sm">{app.name}</h4><div className="text-xs text-slate-500">{app.email}</div></div>
          </div>
          <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">{app.status}</span>
        </div>
      ))}
    </div>
  );
};

// --- MODAL COMPONENT (unchanged) ---
const PostJobModal = ({ formData, setFormData, closeForm, handleSubmit, jobSuccess, initialCategory }) => {
  // initialCategory: "Job" | "Internship" | null
  const [roleCategory, setRoleCategory] = useState(initialCategory ? (initialCategory === "Job" ? "Job" : "Internship") : "Job");

  // Define options for each category
  const professionalTypes = ["Full-time", "Part-time", "Contract", "Freelance"];
  const studentTypes = ["Internship", "Trainee", "Co-op"];

  // If parent opens modal with an initialCategory, reflect that inside modal
  useEffect(() => {
    if (initialCategory) {
      setRoleCategory(initialCategory === "Job" ? "Job" : "Internship");
      // also set a sensible default type in the parent formData
      if (initialCategory === "Job") setFormData(prev => ({ ...prev, type: professionalTypes[0] }));
      if (initialCategory === "Internship") setFormData(prev => ({ ...prev, type: studentTypes[0] }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategory]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setRoleCategory(category);
    if (category === "Job") setFormData(prev => ({ ...prev, type: professionalTypes[0] }));
    else setFormData(prev => ({ ...prev, type: studentTypes[0] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800">Post Opportunity</h2>
          <button onClick={closeForm}><X className="w-5 h-5 text-slate-400" /></button>
        </div>
        <div className="p-6 overflow-y-auto">
          {jobSuccess ? (
            <div className="text-center py-10"><CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" /><h3 className="text-xl font-bold">Posted!</h3><button onClick={closeForm} className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-lg">Done</button></div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Title & Company */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Job Title</label>
                  <input className="w-full border p-2 rounded-lg" placeholder="e.g. Senior Dev" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Company</label>
                  <input className="w-full border p-2 rounded-lg" placeholder="e.g. Acme Inc" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required />
                </div>
              </div>

              {/* Row 2: Category & Specific Type (Side by Side) */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                {/* Step 1: Select Category (Job vs Internship) */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">1. Category</label>
                  <div className="relative">
                    <select 
                        className="w-full appearance-none border p-2 pl-3 pr-8 rounded-lg bg-white cursor-pointer hover:border-indigo-300 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-100" 
                        value={roleCategory} 
                        onChange={handleCategoryChange}
                    >
                        <option value="Job">Job</option>
                        <option value="Internship">Internship</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Step 2: Select Specific Type (Dependent on Step 1) */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">2. Role Type</label>
                  <div className="relative">
                    <select 
                        className="w-full appearance-none border p-2 pl-3 pr-8 rounded-lg bg-white cursor-pointer hover:border-indigo-300 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-100" 
                        value={formData.type} 
                        onChange={e => setFormData({...formData, type: e.target.value})}
                    >
                        {roleCategory === "Job" ? (
                        professionalTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))
                        ) : (
                        studentTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))
                        )}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 3: Location & Salary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Location</label>
                  <input className="w-full border p-2 rounded-lg" placeholder="e.g. Remote / City" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Salary / Stipend</label>
                  <input className="w-full border p-2 rounded-lg" placeholder="e.g. ₹12L or ₹20k/mo" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Short Description</label>
                <textarea className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-100 outline-none" rows="2" placeholder="Briefly describe the role..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Skills</label>
                <input className="border p-2 rounded-lg w-full" placeholder="e.g. React, Node.js (comma separated)" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 mt-2">
                <button type="button" onClick={closeForm} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                <button className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-md transition-all active:scale-95">Post Opportunity</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};