import React, { useState } from 'react';
import { 
  Plus, Users, Clock, CheckCircle, X, AlertCircle, 
  Briefcase, ChevronRight, Calendar, Target, Layout,
  Search, Filter, Link as LinkIcon, ExternalLink,
  AlignLeft // Added for description icon
} from 'lucide-react';

// --- Helper for Category Theme Colors ---
const getCategoryTheme = (category) => {
  switch (category) {
    case 'Career Advice':
      return { border: 'border-emerald-500', badge: 'bg-emerald-50 text-emerald-700' };
    case 'Technical Skill':
      return { border: 'border-blue-500', badge: 'bg-blue-50 text-blue-700' };
    case 'Leadership':
      return { border: 'border-violet-500', badge: 'bg-violet-50 text-violet-700' };
    case 'Interview Prep':
      return { border: 'border-amber-500', badge: 'bg-amber-50 text-amber-700' };
    default:
      return { border: 'border-slate-400', badge: 'bg-slate-100 text-slate-600' };
  }
};

const MentorshipPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewApplicantsId, setViewApplicantsId] = useState(null); // ID for Applicants Modal
  const [selectedDetails, setSelectedDetails] = useState(null);   // Object for Details Modal
  
  // --- Filter State ---
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Career Advice", "Technical Skill", "Leadership", "Interview Prep"];

  // Mock Data
  const [myMentorships, setMyMentorships] = useState([
    {
      id: 1,
      title: "Full Stack Career Guidance",
      category: "Career Advice",
      description: "Weekly 1:1 sessions to review your portfolio and discuss interview strategies for MERN stack roles. We will focus on system design and behavioral questions.",
      slots: 5,
      filledSlots: 3,
      status: "active",
      joinLink: "https://meet.google.com/abc-xyz", 
      applicants: [
        { id: 101, name: "Rahul Sharma", email: "rahul@example.com", note: "I need help with React." },
        { id: 102, name: "Priya Singh", email: "priya@example.com", note: "Looking for backend guidance." }
      ]
    },
    {
      id: 2,
      title: "System Design Basics",
      category: "Technical Skill",
      description: "A group mentorship session covering basics of distributed systems and load balancing. Ideal for junior engineers looking to level up.",
      slots: 10,
      filledSlots: 0,
      status: "pending",
      joinLink: "",
      applicants: []
    },
    {
      id: 3,
      title: "Engineering Management 101",
      category: "Leadership",
      description: "Transitioning from IC to Manager? Let's discuss the challenges and strategies for effective team leadership.",
      slots: 3,
      filledSlots: 3,
      status: "active",
      joinLink: "https://calendly.com/user/leadership",
      applicants: []
    }
  ]);

  const [formData, setFormData] = useState({ 
    title: '', category: 'Career Advice', description: '', slots: 1, joinLink: '' 
  });

  // --- Filter Logic ---
  const filteredMentorships = selectedCategory === "All" 
    ? myMentorships 
    : myMentorships.filter(item => item.category === selectedCategory);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'slots') {
      const val = parseInt(value);
      setFormData({ ...formData, [name]: val < 1 ? 1 : val });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMentorship = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      description: formData.description,
      slots: parseInt(formData.slots),
      filledSlots: 0,
      status: "pending",
      joinLink: formData.joinLink,
      applicants: []
    };
    setMyMentorships([newMentorship, ...myMentorships]);
    setShowCreateModal(false);
    setFormData({ title: '', category: 'Career Advice', description: '', slots: 1, joinLink: '' });
    alert("Mentorship posted! It is now pending Admin approval.");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* --- Header Section --- */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Mentorship Programs</h1>
            <p className="text-slate-500 mt-2">Share your expertise and guide the next generation of alumni.</p>
          </div>
          <div className="flex gap-3">
            <div className="hidden sm:flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm">
                <Search size={18} className="text-slate-400 mr-2" />
                <input type="text" placeholder="Search programs..." className="bg-transparent outline-none text-sm text-slate-600 w-48" />
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95 font-medium"
            >
              <Plus size={20} />
              Post New
            </button>
          </div>
        </div>
      </div>

      {/* --- Filter Menu Bar --- */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => setSelectedCategory("All")}
            className={`
              flex items-center justify-center w-8 h-8 rounded-full mr-2 shrink-0 transition-all border
              ${selectedCategory !== "All" 
                ? 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100 cursor-pointer' 
                : 'bg-slate-100 text-slate-400 border-transparent cursor-default'}
            `}
            title="Reset Filters"
          >
             {selectedCategory !== "All" ? <X size={16} /> : <Filter size={16} />}
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border
                ${selectedCategory === cat 
                  ? 'bg-slate-800 text-white border-slate-800 shadow-md' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- Content Grid --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentorships.length === 0 ? (
           <div className="col-span-full py-20 text-center text-slate-400 bg-white rounded-xl border border-dashed border-slate-200 flex flex-col items-center">
              <Search size={48} className="mb-4 opacity-20" />
              <p>No mentorships found for "{selectedCategory}".</p>
              <button onClick={() => setSelectedCategory("All")} className="mt-4 text-sm text-indigo-600 hover:underline font-medium">Clear Filter</button>
           </div>
        ) : (
          filteredMentorships.map((item) => (
            <MentorshipCard 
              key={item.id} 
              data={item} 
              onViewDetails={() => setSelectedDetails(item)} // OPEN DETAILS
              onViewApplicants={() => setViewApplicantsId(item.id)} // OPEN APPLICANTS
            />
          ))
        )}
      </div>

      {/* --- Create Modal --- */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Create New Mentorship</h2>
                <p className="text-xs text-slate-500">Define your program details below</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="p-2 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"><X size={18} /></button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="create-form" onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Program Title</label>
                  <div className="relative">
                    <Layout className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input type="text" name="title" required placeholder="e.g., Senior Engineering Leadership" className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm" value={formData.title} onChange={handleInputChange} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">External Joining Link <span className="text-slate-400 font-normal">(Optional)</span></label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input type="url" name="joinLink" placeholder="e.g., https://meet.google.com/..." className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm" value={formData.joinLink} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
                        <div className="relative">
                            <Target className="absolute left-3 top-3 text-slate-400" size={18} />
                            <select name="category" className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm appearance-none" value={formData.category} onChange={handleInputChange}>
                                {categories.slice(1).map(cat => <option key={cat}>{cat}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Max Slots</label>
                        <div className="relative">
                            <Users className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input type="number" name="slots" required min="1" className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm" value={formData.slots} onChange={handleInputChange} />
                        </div>
                    </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description & Goals</label>
                  <textarea name="description" required rows="4" placeholder="Describe what mentees will learn..." className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm resize-none" value={formData.description} onChange={handleInputChange} />
                </div>
              </form>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-3">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 py-2.5 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-100 transition">Cancel</button>
                <button type="submit" form="create-form" className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-sm transition">Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MENTORSHIP DETAILS MODAL (NEW) --- */}
      {selectedDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in zoom-in duration-200">
           <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-100">
              
              {/* Header */}
              <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-start">
                 <div>
                    <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-md uppercase tracking-wide mb-2 ${getCategoryTheme(selectedDetails.category).badge}`}>
                        {selectedDetails.category}
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 leading-tight">{selectedDetails.title}</h2>
                 </div>
                 <button onClick={() => setSelectedDetails(null)} className="p-2 bg-white rounded-full border border-slate-200 hover:bg-slate-100 text-slate-500 transition">
                    <X size={20} />
                 </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                 
                 {/* Metadata Grid */}
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
                       <p className="text-xs text-slate-500 uppercase font-bold">Total Slots</p>
                       <div className="flex items-center gap-2 text-slate-900 font-medium text-sm mt-1">
                          <Users size={16} className="text-indigo-500" />
                          <span>{selectedDetails.slots} Mentees</span>
                       </div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
                       <p className="text-xs text-slate-500 uppercase font-bold">Filled Status</p>
                       <div className="flex items-center gap-2 text-slate-900 font-medium text-sm mt-1">
                          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden max-w-[100px]">
                             <div className="bg-emerald-500 h-full rounded-full" style={{width: `${(selectedDetails.filledSlots/selectedDetails.slots)*100}%`}}></div>
                          </div>
                          <span>{selectedDetails.filledSlots} / {selectedDetails.slots}</span>
                       </div>
                    </div>
                 </div>

                 {/* Description */}
                 <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                        <AlignLeft size={16} className="text-slate-400"/> Program Overview
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap pl-6 border-l-2 border-slate-100">
                        {selectedDetails.description || "No description provided."}
                    </p>
                 </div>

                 {/* External Link */}
                 {selectedDetails.joinLink && (
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <LinkIcon size={16} className="text-slate-400"/> Join Link
                        </h3>
                        <div className="pl-6">
                            <a 
                                href={selectedDetails.joinLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors border border-blue-100"
                            >
                                <ExternalLink size={14} />
                                {selectedDetails.joinLink}
                            </a>
                        </div>
                    </div>
                 )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-white">
                 <button onClick={() => setSelectedDetails(null)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition">
                    Close
                 </button>
                 <button 
                    onClick={() => {
                        setSelectedDetails(null);
                        setViewApplicantsId(selectedDetails.id);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition flex items-center gap-2"
                 >
                    <Users size={16} /> Manage Applicants
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* --- Applicants Modal (Existing) --- */}
      {viewApplicantsId && (
        <ApplicantsModal 
            mentorship={myMentorships.find(m => m.id === viewApplicantsId)} 
            onClose={() => setViewApplicantsId(null)} 
        />
      )}

    </div>
  );
};

// --- Sub-Components ---

const MentorshipCard = ({ data, onViewApplicants, onViewDetails }) => {
    const progress = Math.min((data.filledSlots / data.slots) * 100, 100);
    const isFull = data.filledSlots >= data.slots;
    const theme = getCategoryTheme(data.category);

    return (
        <div 
            onClick={onViewDetails} // --- CLICK TRIGGER FOR DETAILS ---
            className={`
                bg-white rounded-xl border border-slate-200 
                hover:shadow-lg transition-all duration-300 
                flex flex-col h-full group overflow-hidden cursor-pointer
                border-l-4 ${theme.border} 
            `}
        >
            <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-md uppercase tracking-wide ${theme.badge}`}>
                        {data.category}
                    </span>
                    {data.status === 'active' ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
                            <CheckCircle size={12} className="text-emerald-500" /> Active
                        </span>
                    ) : (
                        <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
                            <Clock size={12} className="text-amber-500" /> Pending
                        </span>
                    )}
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {data.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-3 mb-4 leading-relaxed">
                    {data.description}
                </p>

                {data.joinLink && (
                    <div className="mb-4" onClick={(e) => e.stopPropagation()}>
                        <a 
                            href={data.joinLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors bg-blue-50 px-2 py-1 rounded border border-blue-100"
                        >
                            <ExternalLink size={12} />
                            Link: {data.joinLink.length > 25 ? data.joinLink.substring(0, 25) + '...' : data.joinLink}
                        </a>
                    </div>
                )}

                <div className="mb-2 mt-auto">
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                        <span className="text-slate-600">Capacity</span>
                        <span className={isFull ? "text-red-500" : "text-slate-700"}>
                            {data.filledSlots} / {data.slots} filled
                        </span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                            style={{ width: `${progress}%` }} 
                            className={`h-full rounded-full transition-all duration-500 ${isFull ? 'bg-red-500' : 'bg-slate-800'}`}
                        />
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50 rounded-b-xl">
                <button 
                    onClick={(e) => {
                        e.stopPropagation(); // --- PREVENTS OPENING DETAILS MODAL ---
                        onViewApplicants();
                    }}
                    className="w-full py-2.5 bg-white border border-slate-200 text-slate-700 font-medium text-sm rounded-lg hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-200 transition-all flex items-center justify-center gap-2 group-hover:shadow-sm"
                >
                    <Users size={16} />
                    View Applicants ({data.applicants.length})
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-400" />
                </button>
            </div>
        </div>
    );
};

const ApplicantsModal = ({ mentorship, onClose }) => (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in duration-200">
        <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
                <div>
                    <h2 className="font-bold text-lg text-slate-800">Applicants</h2>
                    <p className="text-xs text-slate-500">For: {mentorship.title}</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition"><X size={20} className="text-slate-400"/></button>
            </div>

            <div className="overflow-y-auto p-5 bg-slate-50/50 flex-1">
                {mentorship.applicants.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                        <Users size={48} className="mb-3 opacity-20" />
                        <p className="text-sm">No applications received yet.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {mentorship.applicants.map((applicant) => (
                            <div key={applicant.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">
                                    {applicant.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-sm">{applicant.name}</h4>
                                            <p className="text-xs text-slate-500 mb-2">{applicant.email}</p>
                                        </div>
                                        <span className="text-[10px] font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">
                                            #{applicant.id}
                                        </span>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-600 italic">
                                        "{applicant.note}"
                                    </div>
                                </div>
                                <div className="flex flex-row sm:flex-col gap-2 justify-center shrink-0">
                                    <button className="flex-1 px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm hover:shadow">
                                        Accept
                                    </button>
                                    <button className="flex-1 px-4 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition">
                                        Decline
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
);

export default MentorshipPage;