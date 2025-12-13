import React, { useState } from 'react';
import { 
  Plus, Users, Clock, CheckCircle, X, AlertCircle, 
  Briefcase, ChevronRight, Calendar, Target, Layout,
  Search, Filter, Link as LinkIcon, ExternalLink,
  AlignLeft, MessageSquare, Video, Star, MapPin
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
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedMentorship, setSelectedMentorship] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Career Advice", "Technical Skill", "Leadership", "Interview Prep"];

  // Mock Data
  const availableMentorships = [
    {
      id: 1,
      title: "Full Stack Career Guidance",
      mentor: "Dr. Sarah Johnson",
      mentorTitle: "Senior Software Engineer",
      company: "Tech Innovations Inc.",
      category: "Career Advice",
      description: "Weekly 1:1 sessions to review your portfolio and discuss interview strategies for MERN stack roles. We will focus on system design and behavioral questions.",
      slots: 5,
      filledSlots: 3,
      rating: 4.9,
      sessions: 124,
      skills: ["React", "Node.js", "System Design", "Interview Prep"],
      availability: '2 slots this week',
      isAvailable: true
    },
    {
      id: 2,
      title: "System Design Basics",
      mentor: "Michael Chen",
      mentorTitle: "Engineering Manager",
      company: "DesignHub",
      category: "Technical Skill",
      description: "A group mentorship session covering basics of distributed systems and load balancing. Ideal for junior engineers looking to level up.",
      slots: 10,
      filledSlots: 7,
      rating: 4.8,
      sessions: 98,
      skills: ["System Design", "Cloud Architecture", "Scalability"],
      availability: 'Fully booked this week',
      isAvailable: false
    },
    {
      id: 3,
      title: "Engineering Management 101",
      mentor: "Priya Patel",
      mentorTitle: "VP of Engineering",
      company: "DataMinds",
      category: "Leadership",
      description: "Transitioning from IC to Manager? Let's discuss the challenges and strategies for effective team leadership.",
      slots: 3,
      filledSlots: 0,
      rating: 5.0,
      sessions: 156,
      skills: ["Leadership", "Management", "Career Growth"],
      availability: '1 slot this week',
      isAvailable: true
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      mentor: 'Dr. Sarah Johnson',
      mentorTitle: 'Senior Software Engineer',
      company: 'Tech Innovations Inc.',
      date: 'Tomorrow',
      time: '3:00 PM - 4:00 PM',
      type: 'Video Call',
      meetingLink: '#',
      skills: ["React", "Node.js", "System Design"]
    },
    {
      id: 2,
      mentor: 'Michael Chen',
      mentorTitle: 'Engineering Manager',
      company: 'DesignHub',
      date: 'Friday, March 25',
      time: '11:00 AM - 12:00 PM',
      type: 'In-Person',
      location: 'Campus Library',
      skills: ["Leadership", "Management"]
    }
  ];

  const pastSessions = [
    {
      id: 1,
      mentor: 'Priya Patel',
      mentorTitle: 'VP of Engineering',
      company: 'DataMinds',
      date: 'March 10, 2024',
      duration: '1 hour',
      rating: 5,
      feedback: 'Extremely helpful session! Learned a lot about machine learning career paths.',
      skills: ["Career Growth", "Leadership"]
    }
  ];

  // --- Filter Logic ---
  const filteredMentorships = selectedCategory === "All" 
    ? availableMentorships 
    : availableMentorships.filter(item => item.category === selectedCategory);

  const MentorshipCard = ({ data, onViewDetails }) => {
    const theme = getCategoryTheme(data.category);
    return (
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-5">
          <div className="flex justify-between items-start">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${theme.badge}`}>
              {data.category}
            </span>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              data.isAvailable 
                ? 'bg-green-100 text-green-800' 
                : 'bg-slate-100 text-slate-800'
            }`}>
              {data.isAvailable ? 'Available' : 'Booked'}
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-slate-800 mt-3">{data.title}</h3>
          <div className="flex items-center mt-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mr-3">
              {data.mentor.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">{data.mentor}</p>
              <p className="text-xs text-slate-500">{data.mentorTitle} at {data.company}</p>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-slate-600 line-clamp-2">{data.description}</p>
          
          <div className="mt-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Skills Covered</h4>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span 
                  key={i} 
                  className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Availability</p>
                <p className="text-sm font-medium text-slate-800">{data.availability}</p>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="ml-1 text-sm font-medium">{data.rating}</span>
                <span className="mx-1 text-slate-400">•</span>
                <span className="text-sm text-slate-500">{data.sessions} sessions</span>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <button 
                onClick={() => onViewDetails(data)}
                className="flex-1 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                View Details
              </button>
              <button 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!data.isAvailable}
              >
                Book Session
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SessionCard = ({ session, isPast = false }) => (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Session with {session.mentor}</h3>
            <p className="text-sm text-slate-600">{session.mentorTitle} at {session.company}</p>
            
            <div className="mt-3">
              <div className="flex items-center text-sm text-slate-600 mb-1">
                <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                <span>{session.date} • {session.time || session.duration}</span>
              </div>
              {session.location && (
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                  <span>{session.location}</span>
                </div>
              )}
            </div>
            
            {session.skills && session.skills.length > 0 && (
              <div className="mt-3">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {session.skills.map((skill, i) => (
                    <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {!isPast && session.meetingLink && (
            <a
              href={session.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <Video className="-ml-0.5 mr-1.5 h-4 w-4" />
              Join Meeting
            </a>
          )}
        </div>
        
        {isPast && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-1" />
              <span className="text-sm font-medium">You rated: {session.rating}/5</span>
            </div>
            {session.feedback && (
              <p className="mt-2 text-sm text-slate-600 italic">"{session.feedback}"</p>
            )}
          </div>
        )}
        
        <div className="mt-4 flex justify-end space-x-2">
          <button className="inline-flex items-center px-3 py-1.5 border border-slate-300 text-xs font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">
            <MessageSquare className="-ml-0.5 mr-1.5 h-4 w-4" />
            Message
          </button>
          {!isPast && (
            <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Mentorship Programs</h1>
            <p className="text-slate-500 mt-2">Connect with experienced alumni for career guidance and mentorship.</p>
          </div>
          <div className="flex gap-3">
            <div className="hidden sm:flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm">
              <Search size={18} className="text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search mentors..." 
                className="bg-transparent outline-none text-sm text-slate-600 w-48"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('browse')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'browse'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Browse Mentors
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'upcoming'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Upcoming Sessions
              {upcomingSessions.length > 0 && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {upcomingSessions.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'past'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Past Sessions
            </button>
          </nav>
        </div>
      </div>

      {/* Filter Menu */}
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

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'browse' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentorships.length === 0 ? (
              <div className="col-span-full py-20 text-center text-slate-400 bg-white rounded-xl border border-dashed border-slate-200 flex flex-col items-center">
                <Search size={48} className="mb-4 opacity-20" />
                <p>No mentorships found for "{selectedCategory}".</p>
                <button 
                  onClick={() => setSelectedCategory("All")} 
                  className="mt-4 text-sm text-indigo-600 hover:underline font-medium"
                >
                  Clear Filter
                </button>
              </div>
            ) : (
              filteredMentorships.map((mentorship) => (
                <MentorshipCard 
                  key={mentorship.id}
                  data={mentorship}
                  onViewDetails={setSelectedMentorship}
                />
              ))
            )}
          </div>
        )}

        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            {upcomingSessions.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
                <Calendar className="mx-auto h-12 w-12 text-slate-300" />
                <h3 className="mt-4 text-lg font-medium text-slate-900">No upcoming sessions</h3>
                <p className="mt-1 text-sm text-slate-500">Book a session with a mentor to get started.</p>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" />
                  Find a Mentor
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {upcomingSessions.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'past' && (
          <div className="space-y-6">
            {pastSessions.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
                <Clock className="mx-auto h-12 w-12 text-slate-300" />
                <h3 className="mt-4 text-lg font-medium text-slate-900">No past sessions</h3>
                <p className="mt-1 text-sm text-slate-500">Your completed sessions will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {pastSessions.map((session) => (
                  <SessionCard key={session.id} session={session} isPast={true} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mentorship Details Modal */}
      {selectedMentorship && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedMentorship.title}</h2>
                  <div className="flex items-center mt-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mr-3">
                      {selectedMentorship.mentor.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{selectedMentorship.mentor}</p>
                      <p className="text-sm text-slate-500">{selectedMentorship.mentorTitle} at {selectedMentorship.company}</p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedMentorship(null)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-slate-900">About this mentorship</h3>
                  <p className="mt-2 text-slate-600">{selectedMentorship.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-900">Skills you'll develop</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedMentorship.skills.map((skill, i) => (
                      <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-500">Availability</p>
                    <p className="mt-1 font-medium">{selectedMentorship.availability}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-500">Sessions Completed</p>
                    <p className="mt-1 font-medium">{selectedMentorship.sessions}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex justify-end space-x-3">
                    <button 
                      className="px-4 py-2 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
                      onClick={() => setSelectedMentorship(null)}
                    >
                      Close
                    </button>
                    <button 
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!selectedMentorship.isAvailable}
                    >
                      {selectedMentorship.isAvailable ? 'Book Session' : 'Not Available'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorshipPage;