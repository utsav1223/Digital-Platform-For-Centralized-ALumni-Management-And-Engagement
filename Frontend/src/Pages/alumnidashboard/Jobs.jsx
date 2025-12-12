import React, { useState } from 'react';
import { 
  Briefcase, MapPin, DollarSign, Users, 
  Plus, CheckCircle2, X, ExternalLink, 
  Search, ChevronDown, Building2, Trash2, 
  AlertCircle, Mail, Phone, Calendar 
} from 'lucide-react';

// --- MOCK APPLICANT DATA GENERATOR ---
const generateApplicants = (count) => {
  const names = ["Aditi Sharma", "Rahul Verma", "Priya Singh", "Amit Patel", "Sneha Gupta"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: names[i % names.length] || `Candidate ${i + 1}`,
    email: `candidate${i}@example.com`,
    phone: "+91 98765 43210",
    appliedDate: "2 days ago",
  }));
};

// --- MOCK DATA ---
const MY_JOBS_MOCK = [
  { 
    id: 1, 
    title: "Senior Software Engineer", 
    type: "Full-time", 
    workplaceType: "Hybrid", 
    company: "Microsoft", 
    location: "Bangalore", 
    applicants: 5, 
    applicantList: generateApplicants(5),
    posted: "2d ago", 
    status: "Approved", 
    logo: "M", 
    salary: "₹25L - ₹40L", 
    exp: "3-5 Yrs", 
    skills: ["React", "Node.js", "Azure", "System Design"], 
    description: "We are looking for an experienced Senior Software Engineer to drive our core product architecture.", 
    applyLink: "#" 
  },
  { 
    id: 2, 
    title: "Product Design Intern", 
    type: "Internship", 
    workplaceType: "Remote", 
    company: "Google", 
    location: "Remote", 
    applicants: 12, 
    applicantList: generateApplicants(12),
    posted: "1w ago", 
    status: "Pending", 
    logo: "G", 
    salary: "₹40k/mo", 
    exp: "Fresher", 
    skills: ["Figma", "Adobe XD", "Prototyping"], 
    description: "Join our design team for a 6-month immersive internship.", 
    applyLink: "#" 
  },
];

export default function ProfessionalJobsBoard() {
  // State
  const [jobs, setJobs] = useState(MY_JOBS_MOCK);
  const [filterStatus, setFilterStatus] = useState("All");
  const [expandedJobId, setExpandedJobId] = useState(null);
  
  // Modal States
  const [showJobForm, setShowJobForm] = useState(false);
  const [viewApplicantsJob, setViewApplicantsJob] = useState(null); 
  const [jobSuccess, setJobSuccess] = useState(false);
  
  // Selection State
  const [viewCategory, setViewCategory] = useState("Professional"); 

  // Filter Logic
  const filteredJobs = jobs.filter(job => {
    const statusMatch = filterStatus === 'All' ? true : job.status === filterStatus;
    const isStudent = ['Internship', 'Trainee', 'Co-op'].includes(job.type);
    const categoryMatch = viewCategory === 'Student' ? isStudent : !isStudent;
    return statusMatch && categoryMatch;
  });

  // --- ACTIONS ---

  // 1. Submit Job Logic
  const handleJobSubmit = (newJobData) => {
    const newJob = {
      id: Date.now(),
      ...newJobData,
      applicants: 0,
      applicantList: [], 
      posted: "Just now",
      status: "Pending",
      logo: newJobData.company.charAt(0).toUpperCase(),
    };
    
    setTimeout(() => {
      setJobs(prev => [newJob, ...prev]);
      setJobSuccess(true);
    }, 600);
  };

  // 2. Delete Job Logic
  const handleDeleteJob = (e, jobId) => {
    e.stopPropagation();
    if(window.confirm("Are you sure you want to delete this job post?")) {
        setJobs(prev => prev.filter(job => job.id !== jobId));
    }
  };

  // 3. View Applicants Logic
  const handleViewApplicants = (e, job) => {
    e.stopPropagation(); 
    setViewApplicantsJob(job);
  };

  const closeForm = () => {
    setShowJobForm(false);
    setJobSuccess(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-3 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              TalentConnect
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => setViewCategory("Professional")}
                className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${viewCategory === 'Professional' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Jobs
              </button>
              <button 
                onClick={() => setViewCategory("Student")}
                className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${viewCategory === 'Student' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Internships
              </button>
            </div>

            <button 
              onClick={() => setShowJobForm(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Post a Job
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN: Sidebar Filters & Stats */}
          <div className="hidden lg:block w-64 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4">Dashboard</h3>
              <div className="space-y-1">
                {['All', 'Approved', 'Pending', 'Rejected'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex justify-between items-center ${filterStatus === status ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {status}
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-500">
                      {status === 'All' ? jobs.length : jobs.filter(j => j.status === status).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN: Feed */}
          <div className="flex-1">
             {/* Mobile Filters */}
             <div className="lg:hidden flex overflow-x-auto pb-4 gap-2 mb-2 no-scrollbar">
                {['All', 'Approved', 'Pending', 'Rejected'].map(status => (
                  <button key={status} onClick={() => setFilterStatus(status)} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border ${filterStatus === status ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200'}`}>
                    {status}
                  </button>
                ))}
             </div>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800">
                {viewCategory === 'Professional' ? 'Latest Job Openings' : 'Internships & Student Programs'}
              </h2>
              <span className="text-sm text-slate-500">Showing {filteredJobs.length} results</span>
            </div>

            <div className="space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-slate-900 font-medium">No jobs found</h3>
                  <p className="text-slate-500 text-sm mt-1">Try changing your filters or post a new opportunity.</p>
                </div>
              ) : (
                filteredJobs.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    expanded={expandedJobId === job.id} 
                    onToggle={() => setExpandedJobId(expandedJobId === job.id ? null : job.id)} 
                    onDelete={handleDeleteJob}
                    onViewApplicants={handleViewApplicants}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button (Mobile) */}
      <button 
        onClick={() => setShowJobForm(true)}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center z-40 active:scale-95 transition-transform"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* POST JOB MODAL */}
      {showJobForm && (
        <PostJobModal 
          closeForm={closeForm} 
          onSubmit={handleJobSubmit} 
          success={jobSuccess}
          initialCategory={viewCategory}
        />
      )}

      {/* VIEW APPLICANTS MODAL */}
      {viewApplicantsJob && (
        <ApplicantsModal 
          job={viewApplicantsJob}
          onClose={() => setViewApplicantsJob(null)}
        />
      )}

    </div>
  );
}

// --- COMPONENTS ---

const JobCard = ({ job, expanded, onToggle, onDelete, onViewApplicants }) => {
  return (
    <div className={`bg-white rounded-lg border transition-all duration-200 ${expanded ? 'border-blue-200 ring-1 ring-blue-100 shadow-md' : 'border-slate-200 hover:shadow-sm'}`}>
      <div className="p-5 cursor-pointer" onClick={onToggle}>
        <div className="flex gap-4">
          {/* Logo */}
          <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-600 shrink-0 border border-slate-200">
            {job.logo}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-blue-600">{job.title}</h3>
                <p className="text-sm text-slate-600 mt-0.5">{job.company}</p>
              </div>
              <div className="flex gap-2 items-center">
                <StatusBadge status={job.status} />
                <button 
                    onClick={(e) => onDelete(e, job.id)}
                    className="p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
                    title="Delete Job"
                >
                    <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs sm:text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Building2 size={14} className="text-slate-400"/> {job.workplaceType || 'On-site'}</span>
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400"/> {job.location}</span>
              <span className="flex items-center gap-1.5"><DollarSign size={14} className="text-slate-400"/> {job.salary}</span>
              {job.exp && <span className="flex items-center gap-1.5 text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">Exp: {job.exp}</span>}
              <span className="flex items-center gap-1.5 text-slate-400">• {job.posted}</span>
            </div>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50/30 p-5 sm:p-6 animate-in slide-in-from-top-1">
          <div className="prose prose-sm max-w-none text-slate-600 mb-6">
            <h4 className="text-slate-900 font-semibold mb-2 text-sm uppercase tracking-wide">About the role</h4>
            <p className="mb-4 whitespace-pre-wrap">{job.description}</p>
            
            <h4 className="text-slate-900 font-semibold mb-2 text-sm uppercase tracking-wide">Skills</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills && job.skills.length > 0 ? job.skills.map((skill, i) => (
                <span key={i} className="px-2.5 py-1 bg-white border border-slate-200 rounded text-xs font-medium text-slate-700">
                  {skill}
                </span>
              )) : <span className="text-xs text-slate-400 italic">No specific skills listed</span>}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <a href={job.applyLink} target="_blank" rel="noreferrer" className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Apply Now <ExternalLink size={14} />
              </a>
              
              <button 
                onClick={(e) => onViewApplicants(e, job)}
                className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                <Users size={14} /> 
                {job.applicants} Applicants
                <span className="text-xs text-blue-600 font-normal">(View)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- UPDATED APPLICANTS MODAL COMPONENT ---
// Removed "New" status badge and "Document" icon as requested
const ApplicantsModal = ({ job, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6">
      <div className="bg-white w-full max-w-3xl max-h-[85vh] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Applicants</h2>
            <p className="text-sm text-slate-500">For {job.title} at {job.company}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-0">
          {(!job.applicantList || job.applicantList.length === 0) ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Users size={48} className="mb-4 opacity-20" />
              <p>No applicants yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {job.applicantList.map((applicant) => (
                <div key={applicant.id} className="p-4 sm:px-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row gap-4 sm:items-center">
                  
                  {/* Avatar & Name */}
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                      {applicant.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{applicant.name}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                         <Calendar size={10} /> Applied {applicant.appliedDate}
                      </p>
                    </div>
                  </div>

                  {/* Contact Info (Now takes remaining space nicely) */}
                  <div className="flex flex-col gap-1 text-sm text-slate-600 sm:w-1/2 sm:text-right">
                    <div className="flex items-center gap-2 sm:justify-end">
                        <Mail size={12} className="text-slate-400"/> 
                        <span className="truncate">{applicant.email}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:justify-end">
                        <Phone size={12} className="text-slate-400"/> 
                        <span>{applicant.phone}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-right">
             <button onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-100">
                Close
             </button>
        </div>
      </div>
    </div>
  );
};


// --- EXISTING POST JOB MODAL ---
const PostJobModal = ({ closeForm, onSubmit, success, initialCategory }) => {
  const [formData, setFormData] = useState({
    title: "", company: "", workplaceType: "On-site", location: "",
    type: initialCategory === "Student" ? "Internship" : "Full-time",
    description: "", skills: [], salary: "", exp: "", applicationMethod: "Link", applyValue: ""
  });
  const [skillInput, setSkillInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(skillInput.trim())) setFormData(prev => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
      setSkillInput("");
    }
  };
  const removeSkill = (skill) => setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalSkills = [...formData.skills];
    if (skillInput.trim() && !finalSkills.includes(skillInput.trim())) finalSkills.push(skillInput.trim());
    onSubmit({ ...formData, skills: finalSkills });
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full text-center animate-in zoom-in-95">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-8 h-8" /></div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Job Posted!</h2>
          <p className="text-slate-500 mb-6">Your opportunity is now live.</p>
          <button onClick={closeForm} className="w-full py-2.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800">Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <h2 className="text-lg font-bold text-slate-800">Post a Job</h2>
          <button onClick={closeForm} className="p-1 rounded-full hover:bg-slate-100 transition-colors"><X className="w-5 h-5 text-slate-500" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          <form id="jobForm" onSubmit={handleSubmit}>
            <section className="space-y-5">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span> The Basics</h3>
              <div className="space-y-4 pl-8 border-l-2 border-slate-100 ml-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <InputGroup label="Job Title" required><input className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none" placeholder="e.g. Senior Product Designer" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required /></InputGroup>
                  <InputGroup label="Company" required><input className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none" placeholder="e.g. Acme Corp" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required /></InputGroup>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <InputGroup label="Workplace Type" required><div className="relative"><select className="w-full appearance-none px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none cursor-pointer" value={formData.workplaceType} onChange={e => setFormData({...formData, workplaceType: e.target.value})}><option value="On-site">On-site</option><option value="Hybrid">Hybrid</option><option value="Remote">Remote</option></select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" /></div></InputGroup>
                  <InputGroup label="Job Location" required={formData.workplaceType !== 'Remote'}><input className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none" placeholder="City, Country" value={formData.location} disabled={formData.workplaceType === 'Remote'} onChange={e => setFormData({...formData, location: e.target.value})} /></InputGroup>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <InputGroup label="Employment Type" required><div className="relative"><select className="w-full appearance-none px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none cursor-pointer" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}><option value="Full-time">Full-time</option><option value="Part-time">Part-time</option><option value="Contract">Contract</option><option value="Internship">Internship</option><option value="Freelance">Freelance</option></select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" /></div></InputGroup>
                  <InputGroup label="Experience Level"><input className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none" placeholder="e.g. 1-3 Years" value={formData.exp} onChange={e => setFormData({...formData, exp: e.target.value})} /></InputGroup>
                </div>
                <InputGroup label="Salary / Stipend"><input className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none" placeholder="e.g. ₹15L - ₹20L" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} /></InputGroup>
              </div>
            </section>
            <section className="space-y-5">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">2</span> Details</h3>
              <div className="space-y-4 pl-8 border-l-2 border-slate-100 ml-3">
                <InputGroup label="Description" required><textarea className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none min-h-[120px]" placeholder="Describe the role..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required></textarea></InputGroup>
                <InputGroup label="Skills (Type and Press Enter)" required><div className="p-2 border border-slate-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500"><div className="flex flex-wrap gap-2 mb-2">{formData.skills.map(skill => (<span key={skill} className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded border border-blue-100">{skill}<button type="button" onClick={() => removeSkill(skill)} className="hover:text-blue-900"><X size={12} /></button></span>))}</div><input className="w-full text-sm outline-none" placeholder={formData.skills.length > 0 ? "Add another skill..." : "e.g. React, Python"} value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={handleKeyDown} /></div></InputGroup>
              </div>
            </section>
            <section className="space-y-5">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">3</span> Application</h3>
              <div className="space-y-4 pl-8 border-l-2 border-slate-100 ml-3">
                 <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <label className="text-sm font-semibold text-slate-700 mb-3 block">How should people apply?</label>
                    <div className="flex gap-4 mb-4">
                      <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="appMethod" checked={formData.applicationMethod === 'Link'} onChange={() => setFormData({...formData, applicationMethod: 'Link'})} className="text-blue-600 focus:ring-blue-500" /><span className="text-sm text-slate-700">External Link</span></label>
                      <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="appMethod" checked={formData.applicationMethod === 'Email'} onChange={() => setFormData({...formData, applicationMethod: 'Email'})} className="text-blue-600 focus:ring-blue-500" /><span className="text-sm text-slate-700">Email Address</span></label>
                    </div>
                    <input className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none" placeholder={formData.applicationMethod === 'Link' ? "e.g. https://company.com/careers" : "e.g. jobs@company.com"} value={formData.applyValue} onChange={e => setFormData({...formData, applyValue: e.target.value})} type={formData.applicationMethod === 'Email' ? 'email' : 'text'} required />
                  </div>
              </div>
            </section>
          </form>
        </div>
        <div className="p-4 sm:px-8 sm:py-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button type="button" onClick={closeForm} className="px-5 py-2.5 text-slate-600 font-semibold hover:bg-slate-200 rounded-lg transition-colors text-sm">Cancel</button>
          <button form="jobForm" type="submit" className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition-all active:scale-95 text-sm flex items-center gap-2">Post Opportunity</button>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, required, children }) => (
  <div className="space-y-1.5"><label className="block text-sm font-semibold text-slate-700">{label} {required && <span className="text-red-500">*</span>}</label>{children}</div>
);

const StatusBadge = ({ status }) => {
  const styles = { Approved: 'bg-emerald-100 text-emerald-700 border-emerald-200', Pending: 'bg-amber-100 text-amber-700 border-amber-200', Rejected: 'bg-red-50 text-red-600 border-red-100' };
  return <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border uppercase tracking-wide ${styles[status] || styles.Pending}`}>{status}</span>;
};