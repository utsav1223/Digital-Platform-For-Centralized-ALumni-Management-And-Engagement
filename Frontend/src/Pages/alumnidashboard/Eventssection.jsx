import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, MapPin, Video, Users, 
  ChevronRight, Clock, ArrowUpRight, 
  Filter, Search, MoreHorizontal, Plus, X, 
  Sparkles, Bell, AlignLeft, Tag, Trash2 
} from 'lucide-react';
import { getAllEvents, createEvent, registerForEvent, unregisterFromEvent, deleteEvent } from '../../api/eventAPI';
import { useAuth } from '../../context/authContext.jsx';

// --- HELPER: Format Time ---
const formatTime12h = (time24h) => {
  if (!time24h) return '';
  const [hours, minutes] = time24h.split(':');
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${minutes} ${ampm}`;
};

export default function EventsPage() {
  const { auth } = useAuth();
  const myAlumniId = auth?.alumniLoggedIn ? String(auth.alumni?.id || auth.alumni?._id) : null;
  const [activeTab, setActiveTab] = useState('upcoming');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // --- Category Filter State ---
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Networking', 'Workshop', 'Conference', 'Webinar'];

  // --- Modal States ---
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); 

  // Form State
  const [formData, setFormData] = useState({
    title: '', 
    category: 'Networking', 
    type: 'Online', 
    startDate: '', 
    endDate: '', 
    startTime: '', 
    endTime: '', 
    location: '',
    description: ''
  });

  // Fetch events from backend
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      console.log('Fetching events from backend...');
      const response = await getAllEvents();
      console.log('Events response:', response.data);
      if (response.data.ok) {
        // Transform backend data to match frontend structure
        const transformedEvents = response.data.events.map(event => ({
          id: event._id,
          title: event.title,
          category: event.category || 'Networking',
          type: event.type || 'Online',
          location: event.location,
          date: parseEventDate(event.startDate),
          startDate: event.startDate,
          endDate: event.endDate,
          time: formatEventTime(event.startTime, event.endTime),
          description: event.description,
          attendees: event.attendees?.length || 0,
          avatars: generateAvatars(event.attendees?.length || 0),
          status: event.status === 'accepted' ? 'upcoming' : event.status,
          isHostedByMe: checkIfHostedByMe(event),
          creator_user_id: event.creator_user_id,
          rawEvent: event
        }));
        console.log('Transformed events:', transformedEvents);
        
        // Dedupe by event id (normalize to string for comparison)
        const uniqueEventsMap = new Map();
        for (const ev of transformedEvents) {
          const key = getId(ev.id);
          if (!uniqueEventsMap.has(key)) {
            uniqueEventsMap.set(key, ev);
          }
        }
        const uniqueEvents = Array.from(uniqueEventsMap.values());
        console.log('After dedupe:', uniqueEvents);
        setEvents(uniqueEvents);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      console.error('Error details:', err.response?.data);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  // Helper: Parse date to get month and day
  const parseEventDate = (dateString) => {
    if (!dateString) return { month: 'TBD', day: '?' };
    const date = new Date(dateString);
    return {
      month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
      day: date.getDate()
    };
  };

  // Helper: Format time range
  const formatEventTime = (startTime, endTime) => {
    if (!startTime || !endTime) return 'Time TBD';
    return `${formatTime12h(startTime)} - ${formatTime12h(endTime)}`;
  };

  // Helper: Generate placeholder avatars
  const generateAvatars = (count) => {
    const avatars = [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
    ];
    return avatars.slice(0, Math.min(count, 3));
  };

  // Helper: Normalize ID to string for consistent comparison
  const getId = (val) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return String(val._id || val.user_id || val.id || val);
  };

  // Helper: Get creator ID from event
  const getCreatorId = (event) => {
    const creator = event?.creator_user_id;
    if (!creator) return '';
    return getId(creator);
  };

  // Normalize myAlumniId for consistent comparison
  const normMyId = myAlumniId ? String(myAlumniId) : '';

  // Helper: Check if current user is the event creator (with normalization)
  const checkIfHostedByMe = (event) => {
    const creatorId = getCreatorId(event);
    return !!(normMyId && creatorId && creatorId === normMyId);
  };

  // --- Filter Logic with useMemo ---
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // 1. Tab Filter
      const matchesTab = activeTab === 'hosted' 
        ? event.isHostedByMe 
        : (event.status === activeTab && !event.isHostedByMe);
      
      // 2. Category Filter
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;

      return matchesTab && matchesCategory;
    });
  }, [events, activeTab, selectedCategory]);

  // Final render list with dedupe (Set-based)
  const renderEvents = useMemo(() => {
    const seen = new Set();
    return filteredEvents.filter(event => {
      const key = getId(event.id);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [filteredEvents]);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    
    try {
      console.log('📝 Starting event creation...');
      console.log('📝 Form data:', formData);
      
      const eventPayload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        type: formData.type,
        location: formData.type === 'Online' ? formData.location : formData.location,
        startDate: formData.startDate,
        endDate: formData.endDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        is_online: formData.type === 'Online',
        link: formData.type === 'Online' ? formData.location : null
      };

      console.log('📤 Sending event payload:', eventPayload);
      const response = await createEvent(eventPayload);
      console.log('✅ Response received:', response.data);
      
      if (response.data.ok) {
        // Refresh events list
        await fetchEvents();
        setIsHostModalOpen(false);
        setActiveTab('hosted');
        setFormData({ 
          title: '', category: 'Networking', type: 'Online', 
          startDate: '', endDate: '', startTime: '', endTime: '', location: '', description: ''
        });
        alert('Event created successfully! It is pending admin approval.');
      } else {
        throw new Error(response.data.error || 'Failed to create event');
      }
    } catch (err) {
      console.error('❌ Error creating event:', err);
      console.error('❌ Error response:', err.response);
      console.error('❌ Error status:', err.response?.status);
      console.error('❌ Error data:', err.response?.data);
      const errorMessage = err.response?.data?.error || err.message || 'Failed to create event. Please try again.';
      alert(`Error: ${errorMessage}`);
    }
  };

  // Handle event registration
  const handleRegisterForEvent = async (eventId) => {
    try {
      console.log('📝 Registering for event:', eventId);
      const response = await registerForEvent(eventId);
      console.log('✅ Registration response:', response.data);
      
      if (response.data.ok) {
        // Update the events list with the registered event
        setEvents(prevEvents => prevEvents.map(ev => 
          getId(ev.id) === getId(eventId) ? {
            ...ev,
            attendees: response.data.event.attendees?.length || 0,
            avatars: generateAvatars(response.data.event.attendees?.length || 0)
          } : ev
        ));
        
        // Update selected event if it's the one being registered for
        if (selectedEvent && getId(selectedEvent.id) === getId(eventId)) {
          setSelectedEvent({
            ...selectedEvent,
            attendees: response.data.event.attendees?.length || 0,
            avatars: generateAvatars(response.data.event.attendees?.length || 0)
          });
        }
        
        alert('✅ Registration successful! Check your email for confirmation.');
      } else {
        alert('❌ ' + (response.data.error || 'Failed to register for event'));
      }
    } catch (err) {
      console.error('❌ Error registering for event:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Failed to register. Please try again.';
      alert(`❌ Error: ${errorMessage}`);
    }
  };

  // Handle event deletion
  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }

    try {
      console.log('🗑️ Deleting event:', eventId);
      const response = await deleteEvent(eventId);
      console.log('✅ Delete response:', response.data);
      
      if (response.data.ok) {
        // Remove the event from the events list
        setEvents(prevEvents => prevEvents.filter(ev => getId(ev.id) !== getId(eventId)));
        
        // Close the modal
        setSelectedEvent(null);
        
        alert('✅ Event deleted successfully!');
      } else {
        alert('❌ ' + (response.data.error || 'Failed to delete event'));
      }
    } catch (err) {
      console.error('❌ Error deleting event:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Failed to delete event. Please try again.';
      alert(`❌ Error: ${errorMessage}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Events & Webinars
            </h1>
            <p className="text-slate-500 text-sm mt-1">Connect, learn, and grow with the community.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative flex-1 md:w-64 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search events..." className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" />
             </div>
             <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
             <div className="flex items-center gap-2">
                <button className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors border border-transparent hover:border-indigo-100 relative group">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>
             </div>
          </div>
        </div>

        {/* --- LOADING STATE --- */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {/* --- ERROR STATE --- */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* --- MAIN CONTENT --- */}
        {!loading && !error && (
          <>
            {/* --- TABS --- */}
            <div className="border-b border-slate-200 mb-6">
                <div className="flex gap-8 overflow-x-auto no-scrollbar">
                    <TabLink label="Upcoming" count={events.filter(e => e.status === 'upcoming' && !e.isHostedByMe).length} active={activeTab === 'upcoming'} onClick={() => setActiveTab('upcoming')} />
                    <TabLink label="Past" active={activeTab === 'past'} onClick={() => setActiveTab('past')} />
                    <TabLink label="My Hosted Events" count={events.filter(e => e.isHostedByMe).length} active={activeTab === 'hosted'} onClick={() => setActiveTab('hosted')} isSpecial />
                </div>
            </div>

            {/* --- UPDATED: CATEGORY FILTER BAR WITH FUNCTIONAL RESET --- */}
            <div className="flex items-center gap-2 overflow-x-auto pb-6 scrollbar-hide">
              
              {/* Functional Reset Button */}
              <button 
                onClick={() => setSelectedCategory('All')}
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full mr-2 shrink-0 transition-all border shadow-sm
                  ${selectedCategory !== 'All' 
                    ? 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100 cursor-pointer' 
                    : 'bg-white text-slate-400 border-slate-200 cursor-default'}
                `}
                title={selectedCategory !== 'All' ? "Clear Filter" : "Filter"}
              >
                 {selectedCategory !== 'All' ? <X size={14} /> : <Filter size={14} />}
              </button>

              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`
                    px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border
                    ${selectedCategory === cat 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* --- CONTENT GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeTab === 'hosted' && (
                 <HostEventCard onClick={() => setIsHostModalOpen(true)} />
              )}
              {renderEvents.length > 0 ? (
                renderEvents.map(event => (
                  <EventCard 
                    key={getId(event.id)} 
                    event={event} 
                    onClick={() => setSelectedEvent(event)} 
                    onRegister={handleRegisterForEvent}
                  />
                ))
              ) : (
                activeTab !== 'hosted' && (
                   <div className="col-span-full">
                      <EmptyState type={activeTab} onClear={() => setSelectedCategory('All')} />
                   </div>
                )
              )}
            </div>
          </>
        )}
      </div>

      {/* --- HOST EVENT MODAL --- */}
      {isHostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-lg text-slate-800">Host New Event</h3>
              <button onClick={() => setIsHostModalOpen(false)} className="p-1 rounded-full hover:bg-slate-200 text-slate-400 transition-colors">
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

                {/* Description Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Description</label>
                  <div className="relative">
                    <AlignLeft className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <textarea 
                      required rows="3"
                      placeholder="What is this event about?"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"
                      value={formData.description} 
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
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

                {/* Time Grid */}
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Start Time</label>
                      <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input required type="time" 
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                            value={formData.startTime} onChange={e => setFormData({...formData, startTime: e.target.value})}
                          />
                      </div>
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">End Time</label>
                      <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input required type="time" 
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                            value={formData.endTime} onChange={e => setFormData({...formData, endTime: e.target.value})}
                          />
                      </div>
                   </div>
                </div>

                {/* Category & Type */}
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
                      <select 
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                        value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                      >
                        {categories.slice(1).map(cat => <option key={cat} value={cat}>{cat}</option>)}
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

      {/* --- EVENT DETAILS MODAL --- */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in zoom-in duration-200">
           <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-start">
                 <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${selectedEvent.category === 'Workshop' ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>
                            {selectedEvent.category}
                        </span>
                        <span className="text-slate-400 text-xs font-medium flex items-center gap-1">
                            <Tag size={12} /> {selectedEvent.type}
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedEvent.title}</h2>
                 </div>
                 <button onClick={() => setSelectedEvent(null)} className="p-2 bg-white rounded-full border border-slate-200 hover:bg-slate-100 text-slate-500 transition">
                    <X size={20} />
                 </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                 {/* Metadata Grid */}
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                       <p className="text-xs text-slate-500 uppercase font-bold mb-1">Date & Time</p>
                       <div className="flex items-center gap-2 text-slate-800 font-medium text-sm">
                          <Calendar size={16} className="text-indigo-500" />
                          {selectedEvent.startDate} • {selectedEvent.time}
                       </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                       <p className="text-xs text-slate-500 uppercase font-bold mb-1">Location</p>
                       <div className="flex items-center gap-2 text-slate-800 font-medium text-sm">
                          {selectedEvent.type === 'Online' ? <Video size={16} className="text-indigo-500"/> : <MapPin size={16} className="text-indigo-500"/>}
                          {selectedEvent.location}
                       </div>
                    </div>
                 </div>

                 {/* Description */}
                 <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">About this Event</h3>
                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                        {selectedEvent.description || "No description provided."}
                    </p>
                 </div>

                 {/* Attendees */}
                 <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-3">Attendees ({selectedEvent.attendees})</h3>
                    <div className="flex items-center gap-3">
                        <AvatarStack avatars={selectedEvent.avatars} count={selectedEvent.attendees} />
                        <button className="text-indigo-600 text-xs font-semibold hover:underline">View All</button>
                    </div>
                 </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-white">
                 <button onClick={() => setSelectedEvent(null)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition">
                    Close
                 </button>
                 {selectedEvent.isHostedByMe ? (
                    <div className="flex gap-2">
                       <button className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 shadow-lg shadow-purple-200 transition flex items-center gap-2">
                          Edit Event
                          <ArrowUpRight size={16} />
                       </button>
                       <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           handleDeleteEvent(selectedEvent.id);
                         }}
                         className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 shadow-lg shadow-red-200 transition flex items-center gap-2">
                          Delete Event
                          <Trash2 size={16} />
                       </button>
                    </div>
                 ) : (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRegisterForEvent(selectedEvent.id);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition flex items-center gap-2">
                       Register Now
                       <ArrowUpRight size={16} />
                    </button>
                 )}
              </div>
           </div>
        </div>
      )}

    </div>
  );
}

// --- SUB COMPONENTS (Unchanged) ---
const HostEventCard = ({ onClick }) => (
  <button onClick={onClick} className="group relative h-full min-h-[280px] w-full flex flex-col items-center justify-center gap-4 bg-white rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/30 transition-all duration-300 cursor-pointer">
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

const EventCard = ({ event, onClick, onRegister }) => (
  <div onClick={onClick} className="group relative bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer">
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
      {event.status === 'upcoming' ? (
        event.isHostedByMe ? (
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg transition-all shadow-sm hover:shadow active:scale-95">
            Manage
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onRegister?.(event.id);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-all shadow-sm hover:shadow active:scale-95">
            Register
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )
      ) : (
        <button className="px-4 py-2 bg-slate-50 text-slate-400 text-xs font-semibold rounded-lg cursor-not-allowed border border-slate-100">Event Ended</button>
      )}
    </div>
  </div>
);

const EmptyState = ({ type, onClear }) => (
  <div className="py-24 bg-white rounded-2xl border border-slate-200 border-dashed text-center flex flex-col items-center justify-center">
    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 ring-8 ring-slate-50/50"><Calendar className="w-8 h-8 text-slate-300" /></div>
    <h3 className="text-slate-900 font-semibold mb-1">No events found</h3>
    <p className="text-slate-500 text-sm max-w-xs mx-auto mb-6">We couldn't find any events matching your criteria.</p>
    <button onClick={onClear} className="text-indigo-600 text-sm font-semibold hover:text-indigo-700 hover:underline">Clear all filters</button>
  </div>
);

const AvatarStack = ({ avatars, count }) => {
  if (!avatars || avatars.length === 0) return null;
  return (<div className="flex -space-x-3 overflow-hidden py-1">{avatars.slice(0, 3).map((src, index) => (<img key={index} className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover shadow-sm grayscale-[0.2]" src={src} alt="Attendee" />))}</div>);
};