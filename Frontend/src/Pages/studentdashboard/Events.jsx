import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, ArrowRight, Filter, Search, ArrowUpRight, MoreHorizontal, Video, X } from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_EVENTS = [
  {
    id: 1,
    title: "Tech Career Fair 2024",
    category: "Career",
    type: "In-person",
    location: "University Main Hall",
    date: { month: "MAR", day: "15" },
    startDate: "2024-03-15",
    time: "10:00 AM - 4:00 PM",
    attendees: 150,
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
    ],
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Meet top tech companies and explore internship and job opportunities. Network with industry professionals and attend workshops.",
    status: "upcoming"
  },
  {
    id: 2,
    title: "Hackathon: Code for Good",
    category: "Hackathon",
    type: "In-person",
    location: "Tech Hub Building",
    date: { month: "APR", day: "05" },
    startDate: "2024-04-05",
    time: "9:00 AM - 9:00 PM",
    attendees: 200,
    avatars: [
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100"
    ],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "24-hour hackathon focused on building solutions for social good. Work in teams and win exciting prizes!",
    status: "upcoming"
  },
  {
    id: 3,
    title: "Alumni Networking Mixer",
    category: "Networking",
    type: "In-person",
    location: "Grand Ballroom",
    date: { month: "MAR", day: "22" },
    startDate: "2024-03-22",
    time: "6:00 PM - 9:00 PM",
    attendees: 80,
    avatars: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100"
    ],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Connect with successful alumni from various industries. Great opportunity for mentorship and career advice.",
    status: "upcoming"
  }
];

// --- SUB COMPONENTS ---
const TabLink = ({ active, onClick, label, count, isSpecial }) => (
  <button 
    onClick={onClick} 
    className={`pb-3 text-sm font-medium border-b-2 transition-all duration-200 flex items-center gap-2 ${
      active ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
    }`}
  >
    {isSpecial && <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>}
    {label}
    {count !== undefined && (
      <span className={`text-[10px] px-2 py-0.5 rounded-full ${active ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
        {count}
      </span>
    )}
  </button>
);

const EventCard = ({ event, onClick }) => (
  <div 
    onClick={() => onClick(event)}
    className="group relative bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer"
  >
    <div className="flex justify-between items-start mb-5">
      <div className="flex gap-4">
        <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl border transition-colors duration-300 shadow-sm bg-indigo-50 border-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white`}>
          <span className="text-[10px] font-bold uppercase tracking-wider">{event.date.month}</span>
          <span className="text-xl font-bold leading-none mt-0.5">{event.date.day}</span>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${
              event.category === 'Workshop' ? 'bg-purple-50 text-purple-700 border-purple-100' : 
              event.category === 'Networking' ? 'bg-blue-50 text-blue-700 border-blue-100' :
              event.category === 'Hackathon' ? 'bg-green-50 text-green-700 border-green-100' :
              'bg-slate-100 text-slate-600 border-slate-200'
            }`}>
              {event.category}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
            {event.title}
          </h3>
        </div>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
    
    <div className="mb-4">
      <p className="text-slate-600 text-sm line-clamp-2">{event.description}</p>
    </div>
    
    <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-slate-500 mb-6 flex-1">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-slate-400" />
        <span className="truncate">{event.time}</span>
      </div>
      <div className="flex items-center gap-2">
        {event.type === 'Online' ? (
          <Video className="w-4 h-4 text-slate-400" />
        ) : (
          <MapPin className="w-4 h-4 text-slate-400" />
        )}
        <span className="truncate">{event.location}</span>
      </div>
    </div>
    
    <div className="h-px bg-slate-100 w-full mb-4" />
    
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex -space-x-3 overflow-hidden py-1">
          {event.avatars.slice(0, 3).map((src, index) => (
            <img 
              key={index} 
              className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover shadow-sm" 
              src={src} 
              alt="Attendee" 
            />
          ))}
        </div>
        <span className="text-xs text-slate-500 font-medium">{event.attendees} registered</span>
      </div>
      
      <button className={`flex items-center gap-2 px-4 py-2 text-white text-xs font-semibold rounded-lg transition-all shadow-sm hover:shadow active:scale-95 bg-slate-900 hover:bg-indigo-600`}>
        Register Now
        <ArrowUpRight className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);

const EventDetailModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{event.title}</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  event.category === 'Workshop' ? 'bg-purple-100 text-purple-800' : 
                  event.category === 'Networking' ? 'bg-blue-100 text-blue-800' :
                  'bg-indigo-100 text-indigo-800'
                }`}>
                  {event.category}
                </span>
                <span className="text-xs text-slate-500">• {event.type}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Event Image */}
            <div className="h-48 bg-slate-100 rounded-lg overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-500">Date & Time</p>
                  <p className="text-slate-900 font-medium">
                    {event.date.month} {event.date.day}, {new Date().getFullYear()}
                  </p>
                  <p className="text-slate-600 text-sm">{event.time}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                {event.type === 'Online' ? (
                  <Video className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <MapPin className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className="text-sm text-slate-500">Location</p>
                  <p className="text-slate-900 font-medium">{event.location}</p>
                  {event.type === 'Online' && (
                    <p className="text-indigo-600 text-sm">Link will be shared via email</p>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">About the Event</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Attendees */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Attendees ({event.attendees})</h3>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {event.avatars.map((src, i) => (
                    <img 
                      key={i} 
                      src={src} 
                      alt="Attendee" 
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-600">
                  {event.attendees} {event.attendees === 1 ? 'person' : 'people'} registered
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors">
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ type, onClear }) => (
  <div className="py-16 text-center">
    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <Calendar className="w-8 h-8 text-slate-400" />
    </div>
    <h3 className="text-lg font-medium text-slate-900 mb-1">No {type} events</h3>
    <p className="text-slate-500 text-sm max-w-xs mx-auto mb-4">
      {type === 'upcoming' 
        ? "There are no upcoming events at the moment. Check back later!"
        : "You haven't registered for any events yet."}
    </p>
    {onClear && (
      <button 
        onClick={onClear}
        className="text-indigo-600 text-sm font-medium hover:text-indigo-700"
      >
        Clear all filters
      </button>
    )}
  </div>
);

// --- MAIN COMPONENT ---
const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Get categories from events
  const categories = ['All', ...new Set(INITIAL_EVENTS.map(event => event.category))];
  
  // Filter events based on active tab, search query, and category
  const filteredEvents = INITIAL_EVENTS.filter(event => {
    // Check if event matches the active tab
    const matchesTab = activeTab === 'upcoming' 
      ? (event.status === 'upcoming' || !event.status)  // Include events with no status as upcoming
      : event.status === 'registered';
    
    // Check if event matches search query
    const matchesSearch = searchQuery === '' || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Check if event matches selected category
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    
    return matchesTab && matchesSearch && matchesCategory;
  });

  // Count events for tabs
  const upcomingCount = INITIAL_EVENTS.filter(e => e.status === 'upcoming' || !e.status).length;
  const registeredCount = INITIAL_EVENTS.filter(e => e.status === 'registered').length;

  return (
    <div className="w-full min-h-screen bg-slate-50/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Student Events
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Discover and register for upcoming events, workshops, and networking opportunities.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search events..." 
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <button className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors border border-transparent hover:border-indigo-100">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-6 scrollbar-hide mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 mb-6">
          <div className="flex gap-8">
            <TabLink 
              label="Upcoming Events" 
              count={upcomingCount}
              active={activeTab === 'upcoming'} 
              onClick={() => setActiveTab('upcoming')} 
            />
            <TabLink 
              label="My Events" 
              count={registeredCount}
              active={activeTab === 'registered'} 
              onClick={() => setActiveTab('registered')} 
            />
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard 
                key={event.id} 
                event={event}
                onClick={(event) => setSelectedEvent(event)}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            type={activeTab} 
            onClear={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }} 
          />
        )}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </div>
  );
};

export default Events;