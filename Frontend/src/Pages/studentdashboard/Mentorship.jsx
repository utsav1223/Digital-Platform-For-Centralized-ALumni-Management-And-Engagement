// Mentorship.jsx
import React, { useState } from 'react';
import { Search, Filter, User, Clock, Calendar, MessageSquare, Video, Star, ChevronRight, MapPin } from 'lucide-react';

const Mentorship = () => {
  const [activeTab, setActiveTab] = useState('find-mentors');
  const [searchTerm, setSearchTerm] = useState('');

  const mentors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Senior Software Engineer',
      company: 'Tech Innovations Inc.',
      experience: '8 years',
      skills: ['React', 'Node.js', 'Cloud Architecture', 'Team Leadership'],
      rating: 4.9,
      sessions: 124,
      availability: '2 slots this week',
      image: 'SJ',
      isAvailable: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Product Manager',
      company: 'DesignHub',
      experience: '6 years',
      skills: ['Product Strategy', 'UX Research', 'Agile', 'Stakeholder Management'],
      rating: 4.8,
      sessions: 98,
      availability: 'Fully booked this week',
      image: 'MC',
      isAvailable: false
    },
    {
      id: 3,
      name: 'Priya Patel',
      title: 'Data Science Lead',
      company: 'DataMinds',
      experience: '7 years',
      skills: ['Machine Learning', 'Python', 'Big Data', 'AI Ethics'],
      rating: 5.0,
      sessions: 156,
      availability: '1 slot this week',
      image: 'PP',
      isAvailable: true
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      mentor: 'Dr. Sarah Johnson',
      date: 'Tomorrow',
      time: '3:00 PM - 4:00 PM',
      type: 'Video Call',
      meetingLink: '#'
    },
    {
      id: 2,
      mentor: 'Michael Chen',
      date: 'Friday, March 25',
      time: '11:00 AM - 12:00 PM',
      type: 'In-Person',
      location: 'Campus Library'
    }
  ];

  const pastSessions = [
    {
      id: 1,
      mentor: 'Priya Patel',
      date: 'March 10, 2024',
      duration: '1 hour',
      rating: 5,
      feedback: 'Extremely helpful session! Learned a lot about machine learning career paths.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Mentorship Program</h1>
          <p className="text-slate-600">Connect with experienced alumni for career guidance</p>
        </div>
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search mentors by name, company, or skills..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-slate-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('find-mentors')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'find-mentors'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Find Mentors
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'upcoming'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Upcoming Sessions
              <span className="ml-2 bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
                {upcomingSessions.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'past'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Past Sessions
            </button>
          </nav>
        </div>

        {/* Tab content */}
        <div className="p-6">
          {activeTab === 'find-mentors' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">Available Mentors</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-500">Filter by:</span>
                  <div className="relative">
                    <select className="appearance-none bg-white border border-slate-300 rounded-lg pl-3 pr-8 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>All Industries</option>
                      <option>Technology</option>
                      <option>Business</option>
                      <option>Design</option>
                      <option>Data Science</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                      <Filter className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mentors.map((mentor) => (
                  <div key={mentor.id} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-5">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">
                            {mentor.image}
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-800">{mentor.name}</h3>
                            <p className="text-sm text-slate-600">{mentor.title} at {mentor.company}</p>
                            <div className="flex items-center mt-1">
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              <span className="ml-1 text-sm font-medium text-slate-700">{mentor.rating}</span>
                              <span className="mx-1 text-slate-400">•</span>
                              <span className="text-sm text-slate-500">{mentor.sessions} sessions</span>
                            </div>
                          </div>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          mentor.isAvailable 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-slate-100 text-slate-800'
                        }`}>
                          {mentor.isAvailable ? 'Available' : 'Booked'}
                        </span>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {mentor.skills.map((skill, i) => (
                            <span 
                              key={i} 
                              className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center text-sm text-slate-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{mentor.experience} experience</span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                          View Profile <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 px-5 py-3 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-600">
                          <span className="font-medium">{mentor.availability}</span>
                        </div>
                        <button 
                          className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            mentor.isAvailable
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                          }`}
                          disabled={!mentor.isAvailable}
                        >
                          Book Session
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'upcoming' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-slate-800">Upcoming Mentoring Sessions</h2>
              {upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-slate-800">Session with {session.mentor}</h3>
                          <div className="mt-2 flex items-center text-sm text-slate-600">
                            <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                            <span>{session.date} • {session.time}</span>
                          </div>
                          {session.location ? (
                            <div className="mt-1 flex items-center text-sm text-slate-600">
                              <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                              <span>{session.location}</span>
                            </div>
                          ) : (
                            <div className="mt-1 flex items-center text-sm text-blue-600">
                              <Video className="w-4 h-4 mr-2" />
                              <a href={session.meetingLink} className="hover:underline">Join Video Call</a>
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                            <MessageSquare className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full">
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-800">No upcoming sessions</h3>
                  <p className="mt-1 text-slate-500">Book a session with a mentor to get started</p>
                  <button 
                    onClick={() => setActiveTab('find-mentors')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                  >
                    Find Mentors
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'past' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-slate-800">Past Mentoring Sessions</h2>
              {pastSessions.length > 0 ? (
                <div className="space-y-4">
                  {pastSessions.map((session) => (
                    <div key={session.id} className="border border-slate-200 rounded-xl p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-slate-800">Session with {session.mentor}</h3>
                          <div className="mt-2 flex items-center text-sm text-slate-600">
                            <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                            <span>{session.date} • {session.duration}</span>
                          </div>
                          <div className="mt-2 flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${i < session.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`}
                              />
                            ))}
                            <span className="ml-2 text-sm text-slate-600">{session.rating}/5</span>
                          </div>
                          {session.feedback && (
                            <div className="mt-2 p-3 bg-slate-50 rounded-lg">
                              <p className="text-sm text-slate-600 italic">" {session.feedback} "</p>
                            </div>
                          )}
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Clock className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-800">No past sessions yet</h3>
                  <p className="mt-1 text-slate-500">Your completed mentoring sessions will appear here</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mentorship;