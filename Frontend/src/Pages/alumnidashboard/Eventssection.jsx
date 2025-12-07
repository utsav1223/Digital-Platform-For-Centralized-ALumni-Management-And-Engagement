import React, { useState } from 'react';
import { 
  Calendar, MapPin, Video, Users, 
  ChevronRight, Clock, ArrowUpRight, 
  Filter, Search, MoreHorizontal
} from 'lucide-react';

// --- MOCK DATA ---
const EVENTS_DATA = [
  {
    id: 1,
    title: "SaaS Founders Meetup 2024",
    category: "Networking",
    type: "In-person",
    location: "San Francisco, CA",
    date: { month: "OCT", day: "24" },
    time: "6:00 PM - 9:00 PM",
    attendees: 142,
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
    ],
    status: "upcoming"
  },
  {
    id: 2,
    title: "Advanced React Patterns Workshop",
    category: "Workshop",
    type: "Online",
    location: "Google Meet",
    date: { month: "NOV", day: "02" },
    time: "10:00 AM PST",
    attendees: 850,
    avatars: [
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100"
    ],
    status: "upcoming"
  },
  {
    id: 3,
    title: "Q3 Design System Sync",
    category: "Internal",
    type: "Online",
    location: "Zoom",
    date: { month: "SEP", day: "15" },
    time: "Recorded",
    attendees: 45,
    avatars: [],
    status: "past"
  },
  {
    id: 4,
    title: "AI in FinTech Summit",
    category: "Conference",
    type: "In-person",
    location: "New York, NY",
    date: { month: "DEC", day: "10" },
    time: "9:00 AM - 5:00 PM",
    attendees: 1200,
    avatars: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
    ],
    status: "upcoming"
  }
];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const filteredEvents = EVENTS_DATA.filter(event => event.status === activeTab);

  return (
    <div className="w-full min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100/50 text-indigo-600">
                    <Calendar className="w-5 h-5" />
                </span>
                <span className="text-sm font-semibold text-indigo-600 tracking-wide uppercase">Community</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Events & Webinars
            </h1>
            <p className="text-slate-500 mt-2 text-lg max-w-2xl">
              Connect with the community, join live workshops, and catch up on past summits.
            </p>
          </div>
          
          <div className="flex items-center gap-3 self-start md:self-auto w-full md:w-auto">
            {/* Search Input */}
            <div className="relative group flex-1 md:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search..." 
                 className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" 
               />
            </div>

            {/* Filter Button (Desktop) */}
            <button className="hidden md:flex items-center justify-center p-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 text-slate-600 transition-colors">
                <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-slate-200 mb-8">
            <div className="flex gap-8">
                <TabLink 
                    label="Upcoming Events" 
                    count={EVENTS_DATA.filter(e => e.status === 'upcoming').length}
                    active={activeTab === 'upcoming'} 
                    onClick={() => setActiveTab('upcoming')} 
                />
                <TabLink 
                    label="Past Events" 
                    active={activeTab === 'past'} 
                    onClick={() => setActiveTab('past')} 
                />
            </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="col-span-full">
               <EmptyState />
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="mt-12 text-center">
            <button className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
              View Full Calendar 
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
        </div>

      </div>
    </div>
  );
}

// --- SUB COMPONENTS ---

const TabLink = ({ active, onClick, label, count }) => (
  <button 
    onClick={onClick}
    className={`
      pb-3 text-sm font-medium border-b-2 transition-all duration-200 flex items-center gap-2
      ${active 
        ? 'border-indigo-600 text-indigo-600' 
        : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}
    `}
  >
    {label}
    {count !== undefined && (
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${active ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
            {count}
        </span>
    )}
  </button>
);

const EventCard = ({ event }) => (
  <div className="group relative bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
    
    {/* Top Row: Date & Actions */}
    <div className="flex justify-between items-start mb-5">
      <div className="flex gap-4">
        {/* Modern Date Badge */}
        <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider">{event.date.month}</span>
          <span className="text-xl font-bold leading-none mt-0.5">{event.date.day}</span>
        </div>
        
        {/* Title & Category */}
        <div>
            <div className="flex items-center gap-2 mb-1">
                <span className={`
                    inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border
                    ${event.category === 'Workshop' ? 'bg-purple-50 text-purple-700 border-purple-100' : 
                      event.category === 'Networking' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      'bg-slate-100 text-slate-600 border-slate-200'}
                `}>
                    {event.category}
                </span>
                {event.status === 'upcoming' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
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

    {/* Metadata Grid */}
    <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-slate-500 mb-6 flex-1">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-slate-400" />
        <span className="truncate">{event.time}</span>
      </div>
      <div className="flex items-center gap-2">
        {event.type === 'Online' ? <Video className="w-4 h-4 text-slate-400" /> : <MapPin className="w-4 h-4 text-slate-400" />}
        <span className="truncate">{event.location}</span>
      </div>
    </div>

    {/* Divider */}
    <div className="h-px bg-slate-100 w-full mb-4" />

    {/* Footer Section */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
          <AvatarStack avatars={event.avatars} count={event.attendees} />
          <span className="text-xs text-slate-500 font-medium">
            {event.attendees} registered
          </span>
      </div>
      
      {event.status === 'upcoming' ? (
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-indigo-600 transition-all shadow-sm hover:shadow active:scale-95">
          Register Now
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      ) : (
        <button className="px-4 py-2 bg-slate-50 text-slate-400 text-xs font-semibold rounded-lg cursor-not-allowed border border-slate-100">
          Event Ended
        </button>
      )}
    </div>

  </div>
);

const EmptyState = () => (
  <div className="py-24 bg-white rounded-2xl border border-slate-200 border-dashed text-center flex flex-col items-center justify-center">
    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 ring-8 ring-slate-50/50">
      <Calendar className="w-8 h-8 text-slate-300" />
    </div>
    <h3 className="text-slate-900 font-semibold mb-1">No events found</h3>
    <p className="text-slate-500 text-sm max-w-xs mx-auto mb-6">
      We couldn't find any events matching your criteria. Try adjusting your filters.
    </p>
    <button className="text-indigo-600 text-sm font-semibold hover:text-indigo-700 hover:underline">
        Clear all filters
    </button>
  </div>
);

// --- HELPER: Avatar Stack ---
const AvatarStack = ({ avatars, count }) => {
  if (!avatars || avatars.length === 0) return null;
  
  return (
    <div className="flex -space-x-3 overflow-hidden py-1">
      {avatars.slice(0, 3).map((src, index) => (
        <img 
          key={index}
          className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover shadow-sm grayscale-[0.2]" 
          src={src} 
          alt="Attendee" 
        />
      ))}
      {count > avatars.length && (
        <div className="flex items-center justify-center h-7 w-7 rounded-full ring-2 ring-white bg-slate-100 text-[9px] font-bold text-slate-500 border border-slate-200">
          +{count > 99 ? '99' : count - avatars.length}
        </div>
      )}
    </div>
  );
};