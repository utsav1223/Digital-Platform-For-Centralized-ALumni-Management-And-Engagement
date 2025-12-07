import React, { useState } from 'react';
import { 
  Plus, 
  Users, 
  Clock, 
  CheckCircle, 
  X, 
  AlertCircle, 
  Briefcase,
  ChevronRight
} from 'lucide-react';

const MentorshipPage = () => {
  // --- State Management ---
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedMentorship, setSelectedMentorship] = useState(null); 
  
  // Mock Data
  const [myMentorships, setMyMentorships] = useState([
    {
      id: 1,
      title: "Full Stack Career Path Guidance",
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
      title: "Introduction to System Design",
      description: "A group mentorship session covering basics of distributed systems.",
      slots: 10,
      filledSlots: 0,
      status: "pending",
      applicants: []
    }
  ]);

  const [formData, setFormData] = useState({ title: '', description: '', slots: 1 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMentorship = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      slots: parseInt(formData.slots),
      filledSlots: 0,
      status: "pending",
      applicants: []
    };
    setMyMentorships([newMentorship, ...myMentorships]);
    setShowCreateModal(false);
    setFormData({ title: '', description: '', slots: 1 });
    alert("Mentorship posted! It is now pending Admin approval.");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1 shrink-0"><CheckCircle size={12}/> Active</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full flex items-center gap-1 shrink-0"><Clock size={12}/> Pending Approval</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full flex items-center gap-1 shrink-0"><X size={12}/> Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto min-h-screen bg-gray-50">
      
      {/* Header Section: Adjusted to stack on mobile (flex-col) and row on desktop */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Alumni Mentorship</h1>
          <p className="text-gray-500 text-sm">Manage your mentorship programs</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition shadow-sm"
        >
          <Plus size={18} />
          Post New
        </button>
      </div>

      {/* Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myMentorships.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition p-5 flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-start mb-3 gap-2">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 shrink-0">
                  <Briefcase size={20} />
                </div>
                {getStatusBadge(item.status)}
              </div>
              
              <h3 className="font-bold text-lg text-gray-800 mb-2 leading-tight">{item.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">{item.description}</p>
              
              {/* Flex-wrap ensures stats don't break layout on tiny screens */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{item.applicants.length} Applicants</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`font-medium ${item.filledSlots >= item.slots ? 'text-red-500' : 'text-green-600'}`}>
                    {item.slots - item.filledSlots} Slots Left
                  </span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setSelectedMentorship(item)}
              className="w-full mt-auto py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition flex items-center justify-center gap-2 text-sm font-medium"
            >
              View Applicants <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* --- Create Mentorship Modal --- */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-xl font-bold mb-4">Post Mentorship</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input 
                  type="text" 
                  name="title"
                  required
                  placeholder="e.g., Career Guidance in AI"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  name="description"
                  required
                  rows="4"
                  placeholder="Details about the mentorship..."
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Available Slots</label>
                <input 
                  type="number" 
                  name="slots"
                  required
                  min="1"
                  max="50"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.slots}
                  onChange={handleInputChange}
                />
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg flex gap-2 items-start">
                <AlertCircle className="text-yellow-600 shrink-0" size={16} />
                <p className="text-xs text-yellow-700">Pending admin approval.</p>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
              >
                Submit for Approval
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- View Applicants Modal --- */}
      {selectedMentorship && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-xl relative h-full max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-4 border-b">
              <div>
                <h2 className="text-xl font-bold line-clamp-1">{selectedMentorship.title}</h2>
                <p className="text-sm text-gray-500">Applicant List</p>
              </div>
              <button 
                onClick={() => setSelectedMentorship(null)}
                className="p-2 hover:bg-gray-100 rounded-full shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 pr-2">
              {selectedMentorship.applicants.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <Users size={48} className="mx-auto mb-2 opacity-20" />
                  <p>No applications yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedMentorship.applicants.map((applicant) => (
                    // Responsive Stack: Flex-col on mobile, Flex-row on tablet+
                    <div key={applicant.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-4 rounded-lg border border-gray-100 gap-3">
                      <div>
                        <h4 className="font-bold text-gray-800">{applicant.name}</h4>
                        <p className="text-sm text-gray-600 break-all">{applicant.email}</p>
                        <p className="text-xs text-gray-500 mt-1 italic">"{applicant.note}"</p>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                        <button className="flex-1 sm:flex-none px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition text-center">
                          Profile
                        </button>
                        <button className="flex-1 sm:flex-none px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition text-center">
                          Accept
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MentorshipPage;