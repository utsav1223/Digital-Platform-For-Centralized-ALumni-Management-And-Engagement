import React, { useState } from 'react';
import { 
  Plus, Users, Clock, CheckCircle, X, AlertCircle, 
  Briefcase, ChevronRight, Calendar, Target, Layout,
  Search, Filter
} from 'lucide-react';

const MentorshipPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedMentorship, setSelectedMentorship] = useState(null); 
  
  // Mock Data
  const [myMentorships, setMyMentorships] = useState([
    {
      id: 1,
      title: "Full Stack Career Guidance",
      category: "Career Advice",
      description: "Weekly 1:1 sessions to review your portfolio and discuss interview strategies for MERN stack roles.",
      slots: 5,
      filledSlots: 3,
      status: "active",
      applicants: [
        { id: 101, name: "Rahul Sharma", email: "rahul@example.com", note: "I need help with React." },
        { id: 102, name: "Priya Singh", email: "priya@example.com", note: "Looking for backend guidance." },
        { id: 103, name: "Amit Kumar", email: "amit@example.com", note: "Portfolio review needed." }
      ]
    },
    {
      id: 2,
      title: "System Design Basics",
      category: "Technical Skill",
      description: "A group mentorship session covering basics of distributed systems and load balancing.",
      slots: 10,
      filledSlots: 0,
      status: "pending",
      applicants: []
    }
  ]);

  const [formData, setFormData] = useState({ title: '', category: 'Career Advice', description: '', slots: 1 });

  // LOGIC FIX: Prevent slots from going negative or being empty
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'slots') {
      // Ensure strictly positive integer
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
      applicants: []
    };
    setMyMentorships([newMentorship, ...myMentorships]);
    setShowCreateModal(false);
    setFormData({ title: '', category: 'Career Advice', description: '', slots: 1 });
    // In a real app, replace alert with a toast notification
    alert("Mentorship posted! It is now pending Admin approval.");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* --- Header Section --- */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Mentorship Programs</h1>
            <p className="text-slate-500 mt-2">Share your expertise and guide the next generation of alumni.</p>
          </div>
          <div className="flex gap-3">
             {/* Search Bar (Visual only for demo) */}
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

      

[Image of mentorship program dashboard UI design]


      {/* --- Content Grid --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myMentorships.map((item) => (
          <MentorshipCard 
            key={item.id} 
            data={item} 
            onViewApplicants={() => setSelectedMentorship(item)} 
          />
        ))}
      </div>

      {/* --- Create Modal --- */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Create New Mentorship</h2>
                <p className="text-xs text-slate-500">Define your program details below</p>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-2 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto">
              <form id="create-form" onSubmit={handleSubmit} className="space-y-5">
                
                {/* Title Input */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Program Title</label>
                  <div className="relative">
                    <Layout className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input 
                      type="text" name="title" required
                      placeholder="e.g., Senior Engineering Leadership"
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm"
                      value={formData.title} onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Grid: Category & Slots */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
                        <div className="relative">
                            <Target className="absolute left-3 top-3 text-slate-400" size={18} />
                            <select 
                                name="category" 
                                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm appearance-none"
                                value={formData.category} onChange={handleInputChange}
                            >
                                <option>Career Advice</option>
                                <option>Technical Skill</option>
                                <option>Leadership</option>
                                <option>Interview Prep</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Max Slots</label>
                        <div className="relative">
                            <Users className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input 
                                type="number" name="slots" required min="1"
                                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm"
                                value={formData.slots} onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
                
                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description & Goals</label>
                  <textarea 
                    name="description" required rows="4"
                    placeholder="Describe what mentees will learn and what is expected of them..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm resize-none"
                    value={formData.description} onChange={handleInputChange}
                  />
                </div>

                {/* Info Alert */}
                <div className="flex gap-3 p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                    <AlertCircle className="text-indigo-600 shrink-0 mt-0.5" size={18} />
                    <p className="text-xs text-indigo-800 leading-relaxed">
                        All mentorship programs require admin approval before becoming visible to alumni. 
                        Slots cannot be negative and must be at least 1.
                    </p>
                </div>

              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-3">
                <button 
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-2.5 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-100 transition"
                >
                    Cancel
                </button>
                <button 
                    type="submit" form="create-form"
                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-sm transition"
                >
                    Submit
                </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Applicants Modal --- */}
      {selectedMentorship && (
        <ApplicantsModal 
            mentorship={selectedMentorship} 
            onClose={() => setSelectedMentorship(null)} 
        />
      )}

    </div>
  );
};

// --- Sub-Components for cleaner code ---

const MentorshipCard = ({ data, onViewApplicants }) => {
    // Calculate progress for the progress bar
    const progress = Math.min((data.filledSlots / data.slots) * 100, 100);
    const isFull = data.filledSlots >= data.slots;

    return (
        <div className="bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
            <div className="p-5 flex-1">
                {/* Top Row: Category & Status */}
                <div className="flex justify-between items-start mb-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md uppercase tracking-wide">
                        {data.category}
                    </span>
                    {data.status === 'active' ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                            <CheckCircle size={12} /> Active
                        </span>
                    ) : (
                        <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
                            <Clock size={12} /> Pending
                        </span>
                    )}
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {data.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-3 mb-6 leading-relaxed">
                    {data.description}
                </p>

                {/* Progress Bar Section */}
                <div className="mb-2">
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                        <span className="text-slate-600">Capacity</span>
                        <span className={isFull ? "text-red-500" : "text-indigo-600"}>
                            {data.filledSlots} / {data.slots} filled
                        </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div 
                            style={{ width: `${progress}%` }} 
                            className={`h-full rounded-full transition-all duration-500 ${isFull ? 'bg-red-500' : 'bg-indigo-500'}`}
                        />
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50 rounded-b-xl">
                <button 
                    onClick={onViewApplicants}
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
                                {/* Avatar Placeholder */}
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