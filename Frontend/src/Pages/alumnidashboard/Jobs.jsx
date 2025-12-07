import React, { useState } from 'react';
import { 
  Briefcase, MapPin, Clock, DollarSign, Users, 
  PlusCircle, CheckCircle2, X, ChevronDown, ChevronUp, 
  ExternalLink, Mail, FileText, MoreHorizontal, Filter, 
  Building2, Globe, GraduationCap
} from 'lucide-react';

// --- MOCK DATA (Unchanged) ---
const MY_JOBS_MOCK = [
  { 
    id: 1, 
    title: "Senior Software Engineer", 
    type: "Full-time", 
    company: "Microsoft", 
    location: "Bangalore", 
    applicants: 14, 
    posted: "2d ago", 
    status: "Approved", 
    logo: "M", 
    salary: "₹25L - ₹40L", 
    exp: "3-5 Yrs",
    skills: ["React", "Node.js", "Azure", "System Design"],
    description: "We are looking for an experienced Senior Software Engineer to join our Azure cloud team. You will be responsible for building scalable microservices.",
    responsibilities: ["Design and implement scalable APIs", "Mentor junior developers", "Participate in code reviews", "Optimize cloud infrastructure costs"],
    qualifications: ["B.Tech/M.Tech in CS", "5+ years of experience in Full Stack", "Deep understanding of distributed systems"],
    applyLink: "https://careers.microsoft.com",
    contactEmail: "careers@microsoft.com"
  },
  { 
    id: 2, 
    title: "Product Design Intern", 
    type: "Internship", 
    company: "Google", 
    location: "Remote", 
    applicants: 42, 
    posted: "1w ago", 
    status: "Pending", 
    logo: "G", 
    salary: "₹40k/mo", 
    exp: "Fresher",
    skills: ["Figma", "Adobe XD", "User Research"],
    description: "Join our design team for a 6-month internship. You will work closely with product managers to create intuitive user flows.",
    responsibilities: ["Create wireframes and prototypes", "Conduct user testing sessions", "Assist in visual design systems"],
    qualifications: ["Pursuing degree in Design/HCI", "Portfolio demonstrating UI/UX skills"],
    applyLink: "https://careers.google.com/interns",
    contactEmail: "interns@google.com"
  },
  { 
    id: 3, 
    title: "Frontend Developer", 
    type: "Contract", 
    company: "StartUp Inc", 
    location: "Delhi (Hybrid)", 
    applicants: 0, 
    posted: "3d ago", 
    status: "Rejected", 
    logo: "S", 
    salary: "₹12L - ₹18L", 
    exp: "1-3 Yrs",
    skills: ["Vue.js", "Tailwind CSS"],
    description: "Looking for a contract frontend dev to help ship our MVP.",
    responsibilities: ["Convert Figma designs to code", "Ensure cross-browser compatibility"],
    qualifications: ["1+ year frontend experience"],
    applyLink: "https://startup.com/jobs",
    contactEmail: "hr@startup.com"
  },
];

const MOCK_APPLICANTS = [
    { id: 101, jobId: 1, name: "Rahul Sharma", email: "rahul.dev@example.com", appliedDate: "1 day ago", status: "Under Review", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150", exp: "4 Yrs" },
    { id: 102, jobId: 1, name: "Sneha Gupta", email: "sneha.g@example.com", appliedDate: "2 days ago", status: "Shortlisted", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150", exp: "5 Yrs" },
    { id: 103, jobId: 1, name: "Amit Kumar", email: "amit.k@example.com", appliedDate: "5 hours ago", status: "New", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150", exp: "3 Yrs" },
];

export default function Jobs() {
  const [jobs, setJobs] = useState(MY_JOBS_MOCK);
  const [filterStatus, setFilterStatus] = useState("All");
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [activeExpandedTab, setActiveExpandedTab] = useState("details");
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobSuccess, setJobSuccess] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "", company: "", location: "", type: "Full-time", salary: "",
    skills: "", description: "", responsibilities: "", qualifications: "", applyLink: "", contactEmail: ""
  });

  // Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
        id: jobs.length + 1,
        ...formData,
        applicants: 0,
        posted: "Just now",
        status: "Pending",
        logo: formData.company[0].toUpperCase(),
        exp: "N/A",
        skills: formData.skills.split(',').map(s => s.trim()),
        responsibilities: formData.responsibilities.split('\n'),
        qualifications: formData.qualifications.split('\n')
    };
    setTimeout(() => {
        setJobs([newJob, ...jobs]);
        setJobSuccess(true);
    }, 800);
  };

  const closeForm = () => {
      setShowJobForm(false);
      setJobSuccess(false);
      setFormData({ title: "", company: "", location: "", type: "Full-time", salary: "", skills: "", description: "", responsibilities: "", qualifications: "", applyLink: "", contactEmail: "" });
  };

  const toggleExpand = (id) => {
      if (expandedJobId === id) setExpandedJobId(null);
      else {
          setExpandedJobId(id);
          setActiveExpandedTab("details");
      }
  };

  const filteredJobs = jobs.filter(job => filterStatus === 'All' ? true : job.status === filterStatus);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Job Listings</h2>
          <p className="text-slate-500 text-sm mt-1">Manage your active postings and review applications.</p>
        </div>
        <button 
            onClick={() => setShowJobForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-sm active:scale-95"
        >
            <PlusCircle className="w-4 h-4" /> Post New Job
        </button>
      </div>

      {/* --- FILTER & STATS --- */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        {['All', 'Approved', 'Pending', 'Rejected'].map(status => (
            <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-1.5 ${
                    filterStatus === status 
                    ? 'border-indigo-600 text-indigo-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                }`}
            >
                {status}
            </button>
        ))}
      </div>

      {/* --- JOBS LIST --- */}
      <div className="space-y-4">
        {filteredJobs.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-slate-900 font-medium">No jobs found</h3>
                <p className="text-slate-500 text-sm">Try changing your filters or post a new job.</p>
            </div>
        )}

        {filteredJobs.map((job) => (
            <div 
                key={job.id} 
                className={`group bg-white rounded-xl border border-slate-200 transition-all duration-200 hover:shadow-md ${
                    expandedJobId === job.id ? 'shadow-md ring-1 ring-slate-200' : ''
                }`}
            >
                {/* Main Card Content */}
                <div className="p-6 cursor-pointer" onClick={() => toggleExpand(job.id)}>
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Logo */}
                        <div className="w-16 h-16 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-2xl border border-indigo-100 shrink-0 shadow-sm">
                            {job.logo}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            {/* Top Row: Title & Status */}
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                                    <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                                        {job.company} 
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span> 
                                        {job.location}
                                    </p>
                                </div>
                                <StatusBadge status={job.status} />
                            </div>

                            {/* Middle Row: Meta Tags */}
                            <div className="flex flex-wrap items-center gap-3 mt-4">
                                <Badge icon={<Briefcase size={14}/>} text={job.type} />
                                <Badge icon={<DollarSign size={14}/>} text={job.salary} />
                                <Badge icon={<Clock size={14}/>} text={job.exp} />
                                <div className="ml-auto flex items-center gap-4 text-sm text-slate-500">
                                    <span className="flex items-center gap-1.5">
                                        <Users className="w-4 h-4" /> {job.applicants} Applicants
                                    </span>
                                    <span className="hidden sm:inline text-slate-300">|</span>
                                    <span className="hidden sm:inline">Posted {job.posted}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expanded Details Section */}
                {expandedJobId === job.id && (
                    <div className="border-t border-slate-100 bg-slate-50/50 rounded-b-xl animate-in slide-in-from-top-2 duration-200">
                        {/* Internal Navigation */}
                        <div className="flex px-6 border-b border-slate-200 bg-white">
                            <TabButton 
                                active={activeExpandedTab === 'details'} 
                                onClick={() => setActiveExpandedTab('details')} 
                                label="Job Details" 
                            />
                            <TabButton 
                                active={activeExpandedTab === 'applicants'} 
                                onClick={() => setActiveExpandedTab('applicants')} 
                                label="Applicants" 
                                count={job.applicants} 
                            />
                        </div>

                        {/* Content Body */}
                        <div className="p-6 md:p-8">
                            {activeExpandedTab === 'details' ? (
                                <JobDetailsContent job={job} />
                            ) : (
                                <ApplicantsList jobId={job.id} />
                            )}
                        </div>
                    </div>
                )}
            </div>
        ))}
      </div>

      {/* --- POST JOB MODAL --- */}
      {showJobForm && (
        <PostJobModal 
            formData={formData} 
            setFormData={setFormData} 
            closeForm={closeForm} 
            handleSubmit={handleSubmit} 
            jobSuccess={jobSuccess} 
        />
      )}
    </div>
  );
}

// --- REFACTORED SUB COMPONENTS ---

const StatusBadge = ({ status }) => {
    const styles = {
        Approved: 'bg-emerald-50 text-emerald-700 border-emerald-100 dot-emerald-500',
        Pending: 'bg-amber-50 text-amber-700 border-amber-100 dot-amber-500',
        Rejected: 'bg-red-50 text-red-700 border-red-100 dot-red-500'
    };
    const currentStyle = styles[status] || styles.Pending;
    
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-2 ${currentStyle}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status === 'Approved' ? 'bg-emerald-500' : status === 'Pending' ? 'bg-amber-500' : 'bg-red-500'}`}></span>
            {status}
        </span>
    );
};

const Badge = ({ icon, text }) => (
    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md border border-slate-200 flex items-center gap-1.5">
        {icon} {text}
    </span>
);

const TabButton = ({ active, onClick, label, count }) => (
    <button 
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
            active ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'
        }`}
    >
        {label}
        {count !== undefined && (
            <span className={`px-1.5 py-0.5 text-[10px] rounded-full ${active ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-600'}`}>
                {count}
            </span>
        )}
    </button>
);

const JobDetailsContent = ({ job }) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-sm">
        <div className="lg:col-span-2 space-y-8">
            <Section title="About the Role" content={job.description} />
            
            <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Key Responsibilities
                </h4>
                <ul className="space-y-2 text-slate-700">
                    {job.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"></span>
                            <span className="leading-relaxed">{r}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" /> Qualifications
                </h4>
                <ul className="space-y-2 text-slate-700">
                    {job.qualifications.map((q, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                            <span className="leading-relaxed">{q}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                    {job.skills.map(skill => (
                        <span key={skill} className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors cursor-default">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Contact Info</h4>
                <a href={job.applyLink} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-indigo-600 hover:underline mb-3 p-2 bg-indigo-50 rounded-lg">
                    <Globe className="w-4 h-4" /> 
                    <span className="truncate">Apply Link</span>
                    <ExternalLink className="w-3 h-3 ml-auto" />
                </a>
                <div className="flex items-center gap-3 text-sm text-slate-600 p-2 border border-slate-100 rounded-lg">
                    <Mail className="w-4 h-4 text-slate-400" /> {job.contactEmail}
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 pt-2">
                <button className="py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                    Edit Job
                </button>
                <button className="py-2.5 bg-white border border-red-200 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors">
                    Close Job
                </button>
            </div>
        </div>
    </div>
);

const Section = ({ title, content }) => (
    <div>
        <h4 className="text-lg font-semibold text-slate-900 mb-3">{title}</h4>
        <p className="text-slate-600 leading-relaxed whitespace-pre-line">{content}</p>
    </div>
);

const ApplicantsList = ({ jobId }) => {
    const apps = MOCK_APPLICANTS.filter(a => a.jobId === jobId);
    
    if (apps.length === 0) return (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3"><Users className="text-slate-300" /></div>
            <p className="text-slate-900 font-medium">No applicants yet</p>
            <p className="text-slate-500 text-sm">Candidates will appear here once they apply.</p>
        </div>
    );

    return (
        <div className="grid gap-3">
            {apps.map(app => (
                <div key={app.id} className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-indigo-200 hover:shadow-sm transition-all group">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <img src={app.img} alt={app.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{app.name}</h4>
                            <div className="text-xs text-slate-500 flex gap-2 mt-0.5">
                                <span>{app.email}</span> • <span className="text-slate-400">{app.exp} Experience</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                            app.status === 'New' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                            app.status === 'Shortlisted' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>{app.status}</span>
                        <div className="flex border-l border-slate-200 pl-3 gap-1">
                            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"><FileText className="w-4 h-4" /></button>
                            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// --- MODAL COMPONENT (Kept mostly the same functionality, just slight styling tweaks) ---
const PostJobModal = ({ formData, setFormData, closeForm, handleSubmit, jobSuccess }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl ring-1 ring-slate-900/5">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-800">Post a New Job</h2>
                <button onClick={closeForm} className="p-2 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 overflow-y-auto">
                {jobSuccess ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-8 h-8" /></div>
                        <h3 className="text-xl font-bold text-slate-900">Job Posted Successfully!</h3>
                        <p className="text-slate-500 mb-8 mt-2">Your listing has been submitted and is pending approval.</p>
                        <button onClick={closeForm} className="px-8 py-2.5 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors">Done</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-5">
                            <InputGroup label="Job Title" value={formData.title} onChange={v => setFormData({...formData, title: v})} placeholder="e.g. Senior Backend Dev" required />
                            <InputGroup label="Company Name" value={formData.company} onChange={v => setFormData({...formData, company: v})} placeholder="e.g. Acme Inc." required />
                        </div>
                        <div className="grid grid-cols-3 gap-5">
                            <InputGroup label="Location" value={formData.location} onChange={v => setFormData({...formData, location: v})} placeholder="Remote / City" required />
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Type</label>
                                <select className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                                    <option>Full-time</option><option>Part-time</option><option>Internship</option><option>Contract</option>
                                </select>
                            </div>
                            <InputGroup label="Salary Range" value={formData.salary} onChange={v => setFormData({...formData, salary: v})} placeholder="e.g. ₹12L - ₹18L" />
                        </div>
                        <InputGroup label="Short Description" textarea value={formData.description} onChange={v => setFormData({...formData, description: v})} />
                        <InputGroup label="Skills (Comma separated)" value={formData.skills} onChange={v => setFormData({...formData, skills: v})} />
                        <InputGroup label="Key Responsibilities (New line for each)" textarea value={formData.responsibilities} onChange={v => setFormData({...formData, responsibilities: v})} />
                        <InputGroup label="Qualifications (New line for each)" textarea value={formData.qualifications} onChange={v => setFormData({...formData, qualifications: v})} />
                        <InputGroup label="Application URL" value={formData.applyLink} onChange={v => setFormData({...formData, applyLink: v})} placeholder="https://..." />
                        
                        <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-4">
                            <button type="button" onClick={closeForm} className="px-5 py-2.5 text-slate-600 font-semibold hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                            <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all active:scale-95">Publish Job</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    </div>
);

const InputGroup = ({ label, value, onChange, placeholder, textarea, required }) => (
    <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{label} {required && <span className="text-red-500">*</span>}</label>
        {textarea ? (
            <textarea className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-sm text-slate-700 placeholder:text-slate-400" rows="3" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}></textarea>
        ) : (
            <input className="w-full p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-sm text-slate-700 placeholder:text-slate-400" type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required} />
        )}
    </div>
);