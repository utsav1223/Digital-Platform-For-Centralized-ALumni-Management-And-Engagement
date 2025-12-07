import React, { useState } from 'react';
import { 
  Calendar, MapPin, Video, Users, 
  ChevronRight, Clock, ArrowUpRight, 
  Filter, Search, MoreHorizontal, Plus, X, 
  Sparkles, Bell
} from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_EVENTS = [
  {
    id: 1,
    title: "SaaS Founders Meetup 2024",
    category: "Networking",
    type: "In-person",
    location: "San Francisco, CA",
    date: { month: "OCT", day: "24" },
    startDate: "2024-10-24",
    endDate: "2024-10-24",
    time: "6:00 PM - 9:00 PM",
    attendees: 142,
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
    ],
    status: "upcoming",
    isHostedByMe: false
  },
  {
    id: 2,
    title: "Advanced React Patterns Workshop",
    category: "Workshop",
    type: "Online",
    location: "Google Meet",
    date: { month: "NOV", day: "02" },
    startDate: "2024-11-02",
    endDate: "2024-11-02",
    time: "10:00 AM - 2:00 PM",
    attendees: 850,
    avatars: [
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100"
    ],
    status: "upcoming",
    isHostedByMe: false
  }
];

// --- HELPER: Format 24h time (14:00) to 12h (2:00 PM) ---
const formatTime12h = (time24h) => {
  if (!time24h) return '';
  const [hours, minutes] = time24h.split(':');
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${minutes} ${ampm}`;
};

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State - Now includes separate startTime and endTime
  const [formData, setFormData] = useState({
    title: '', 
    category: 'Networking', 
    type: 'Online', 
    startDate: '', 
    endDate: '', 
    startTime: '', // New Strict Field
    endTime: '',   // New Strict Field
    location: ''
  });

  const filteredEvents = events.filter(event => {
    if (activeTab === 'hosted') return event.isHostedByMe;
    return event.status === activeTab && !event.isHostedByMe; 
  });

  const handleCreateEvent = (e) => {
    e.preventDefault();
    const dateObj = new Date(formData.startDate);
    const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
    const day = dateObj.getDate();

    // Combine strict times into a display string (e.g., "10:00 AM - 11:30 AM")
    const timeDisplay = `${formatTime12h(formData.startTime)} - ${formatTime12h(formData.endTime)}`;

    const newEvent = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      type: formData.type,
      location: formData.location,
      date: { month, day },
      startDate: formData.startDate,
      endDate: formData.endDate,
      time: timeDisplay, // Using the formatted string
      attendees: 1,
      avatars: ["https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100"],
      status: "upcoming",
      isHostedByMe: true
    };

    setEvents([newEvent, ...events]);
    setIsModalOpen(false);
    setActiveTab('hosted'); 
    setFormData({ 
      title: '', category: 'Networking', type: 'Online', 
      startDate: '', endDate: '', startTime: '', endTime: '', location: '' 
    });
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* --- UNIFIED HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Events & Webinars
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Connect, learn, and grow with the community.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative flex-1 md:w-64 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input type="text" placeholder="Search events..." className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" />
             </div>
             <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
             <div className="flex items-center gap-2">
                <button className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors border border-transparent hover:border-indigo-100 relative group">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>
                <button className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors border border-transparent hover:border-indigo-100">
                    <Filter className="w-5 h-5" />
                </button>
             </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-slate-200 mb-8">
            <div className="flex gap-8 overflow-x-auto no-scrollbar">
                <TabLink label="Upcoming" count={events.filter(e => e.status === 'upcoming' && !e.isHostedByMe).length} active={activeTab === 'upcoming'} onClick={() => setActiveTab('upcoming')} />
                <TabLink label="Past" active={activeTab === 'past'} onClick={() => setActiveTab('past')} />
                <TabLink label="My Hosted Events" count={events.filter(e => e.isHostedByMe).length} active={activeTab === 'hosted'} onClick={() => setActiveTab('hosted')} isSpecial />
            </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeTab === 'hosted' && (
             <HostEventCard onClick={() => setIsModalOpen(true)} />
          )}
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            activeTab !== 'hosted' && (
               <div className="col-span-full">
                  <EmptyState type={activeTab} />
               </div>
            )
          )}
        </div>
      </div>

      {/* --- HOST EVENT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-lg text-slate-800">Host New Event</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-slate-200 text-slate-400 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="create-event-form" onSubmit={handleCreateEvent} className="space-y-4">
                
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Event Title</label>
                  <input required type="text" placeholder="e.g. Q4 Networking Night" 
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                {/* Date Grid */}
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Start Date</label>
                      <input required type="date" 
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                        value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})}
                      />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">End Date</label>
                      <input required type="date" min={formData.startDate}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                        value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})}
                      />
                   </div>
                </div>

                {/* NEW: STRICT TIME GRID */}
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Start Time</label>
                      <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          
                          <input 
                            required 
                            type="time" 
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                            value={formData.startTime} 
                            onChange={e => setFormData({...formData, startTime: e.target.value})}
                          />
                      </div>
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">End Time</label>
                      <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                            required 
                            type="time" 
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                            value={formData.endTime} 
                            onChange={e => setFormData({...formData, endTime: e.target.value})}
                          />
                      </div>
                   </div>
                </div>

                {/* Category & Location */}
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
                      <select 
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                        value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                      >
                        <option>Networking</option>
                        <option>Workshop</option>
                        <option>Conference</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Type</label>
                      <select 
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                        value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}
                      >
                        <option>Online</option>
                        <option>In-person</option>
                      </select>
                   </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Location / Link</label>
                  <input required type="text" placeholder={formData.type === 'Online' ? "Paste Zoom/Meet Link" : "Enter full address"}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </form>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50">
                <button type="submit" form="create-event-form" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98]">
                  Publish Event
                </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// --- SUB COMPONENTS (Unchanged) ---
const HostEventCard = ({ onClick }) => (
  <button onClick={onClick} className="group relative h-full min-h-[280px] w-full flex flex-col items-center justify-center gap-4 bg-white rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/30 transition-all duration-300">
     <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
        <Plus className="w-8 h-8 text-indigo-600" />
     </div>
     <div className="text-center">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">Host an Event</h3>
        <p className="text-sm text-slate-500 max-w-[200px] mx-auto mt-1">Create a new workshop, meetup, or webinar.</p>
     </div>
  </button>
);

const TabLink = ({ active, onClick, label, count, isSpecial }) => (
  <button onClick={onClick} className={`pb-3 text-sm font-medium border-b-2 transition-all duration-200 flex items-center gap-2 ${active ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}`}>
    {isSpecial && <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>}
    {label}
    {count !== undefined && (<span className={`text-[10px] px-2 py-0.5 rounded-full ${active ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>{count}</span>)}
  </button>
);

const EventCard = ({ event }) => (
  <div className="group relative bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
    <div className="flex justify-between items-start mb-5">
      <div className="flex gap-4">
        <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl border transition-colors duration-300 shadow-sm ${event.isHostedByMe ? 'bg-purple-50 border-purple-100 text-purple-600' : 'bg-indigo-50 border-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'}`}>
          <span className="text-[10px] font-bold uppercase tracking-wider">{event.date.month}</span>
          <span className="text-xl font-bold leading-none mt-0.5">{event.date.day}</span>
        </div>
        <div>
            <div className="flex items-center gap-2 mb-1">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${event.category === 'Workshop' ? 'bg-purple-50 text-purple-700 border-purple-100' : event.category === 'Networking' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>{event.category}</span>
                {event.isHostedByMe && (<span className="bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded border border-slate-900">YOU</span>)}
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">{event.title}</h3>
        </div>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-5 h-5" /></button>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-slate-500 mb-6 flex-1">
      <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400" /><span className="truncate">{event.time}</span></div>
      <div className="flex items-center gap-2">{event.type === 'Online' ? <Video className="w-4 h-4 text-slate-400" /> : <MapPin className="w-4 h-4 text-slate-400" />}<span className="truncate">{event.location}</span></div>
    </div>
    <div className="h-px bg-slate-100 w-full mb-4" />
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2"><AvatarStack avatars={event.avatars} count={event.attendees} /><span className="text-xs text-slate-500 font-medium">{event.attendees} registered</span></div>
      {event.status === 'upcoming' ? (<button className={`flex items-center gap-2 px-4 py-2 text-white text-xs font-semibold rounded-lg transition-all shadow-sm hover:shadow active:scale-95 ${event.isHostedByMe ? 'bg-purple-600 hover:bg-purple-700' : 'bg-slate-900 hover:bg-indigo-600'}`}>{event.isHostedByMe ? 'Manage Event' : 'Register Now'}<ArrowUpRight className="w-3.5 h-3.5" /></button>) : (<button className="px-4 py-2 bg-slate-50 text-slate-400 text-xs font-semibold rounded-lg cursor-not-allowed border border-slate-100">Event Ended</button>)}
    </div>
  </div>
);

const EmptyState = ({ type }) => (
  <div className="py-24 bg-white rounded-2xl border border-slate-200 border-dashed text-center flex flex-col items-center justify-center">
    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 ring-8 ring-slate-50/50"><Calendar className="w-8 h-8 text-slate-300" /></div>
    <h3 className="text-slate-900 font-semibold mb-1">No events found</h3>
    <p className="text-slate-500 text-sm max-w-xs mx-auto mb-6">We couldn't find any events matching your criteria.</p>
    <button className="text-indigo-600 text-sm font-semibold hover:text-indigo-700 hover:underline">Clear all filters</button>
  </div>
);

const AvatarStack = ({ avatars, count }) => {
  if (!avatars || avatars.length === 0) return null;
  return (<div className="flex -space-x-3 overflow-hidden py-1">{avatars.slice(0, 3).map((src, index) => (<img key={index} className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover shadow-sm grayscale-[0.2]" src={src} alt="Attendee" />))}</div>);
};