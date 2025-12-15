import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, MapPin, Clock, Users, ArrowRight, Filter, Search, ArrowUpRight, MoreHorizontal, Video, X } from 'lucide-react';
import { useAuth } from '../../context/authContext.jsx';

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

const EventCard = ({ event, onClick, onRegister, isRegistering, currentUserId }) => {
  // Format date from backend event
  const eventDate = event.startDate ? new Date(event.startDate) : new Date();
  const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = eventDate.getDate();
  
  // Check if current user is already registered
  const norm = (v) => {
    const raw = (v && typeof v === 'object') ? (v._id ?? v.user_id ?? v.id ?? v) : v;
    return raw != null ? String(raw) : null;
  };
  const attendeeIds = Array.isArray(event?.attendees) ? event.attendees.map(norm).filter(Boolean) : [];
  const isRegistered = currentUserId ? attendeeIds.includes(String(currentUserId)) : false;
  const isHostedByYou = currentUserId ? (norm(event?.creator_user_id) === String(currentUserId)) : false;
  
  return (
    <div 
      className="group relative bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      <div onClick={() => onClick(event)} className="flex justify-between items-start mb-5">
        <div className="flex gap-4">
          <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl border transition-colors duration-300 shadow-sm bg-indigo-50 border-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white`}>
            <span className="text-[10px] font-bold uppercase tracking-wider">{month}</span>
            <span className="text-xl font-bold leading-none mt-0.5">{day}</span>
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
            {isHostedByYou && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-900 text-white">YOU</span>
            )}
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
    
    <div onClick={() => onClick(event)} className="mb-4">
      <p className="text-slate-600 text-sm line-clamp-2">{event.description}</p>
    </div>
    
    <div onClick={() => onClick(event)} className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-slate-500 mb-6 flex-1">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-slate-400" />
        <span className="truncate">{event.startTime || 'TBD'} - {event.endTime || 'TBD'}</span>
      </div>
      <div className="flex items-center gap-2">
        {event.eventType === 'online' ? (
          <Video className="w-4 h-4 text-slate-400" />
        ) : (
          <MapPin className="w-4 h-4 text-slate-400" />
        )}
        <span className="truncate">{event.location || 'Location TBD'}</span>
      </div>
    </div>
    
    <div className="h-px bg-slate-100 w-full mb-4" />
    
    <div className="flex items-center justify-between">
      <div onClick={() => onClick(event)} className="flex items-center gap-2">
        <div className="flex -space-x-3 overflow-hidden py-1">
          {event.attendees && event.attendees.length > 0 ? (
            event.attendees.slice(0, 3).map((attendee, index) => (
              <div
                key={index}
                className="h-7 w-7 rounded-full ring-2 ring-white bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600"
              >
                {attendee.name ? attendee.name[0].toUpperCase() : 'A'}
              </div>
            ))
          ) : (
            <div className="h-7 w-7 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center">
              <Users className="w-4 h-4 text-slate-400" />
            </div>
          )}
        </div>
        <span className="text-xs text-slate-500 font-medium">
          {event.attendees ? event.attendees.length : 0} registered
        </span>
      </div>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onRegister(event._id);
        }}
        disabled={isRegistering || isRegistered}
        className={`flex items-center gap-2 px-4 py-2 text-white text-xs font-semibold rounded-lg transition-all shadow-sm hover:shadow active:scale-95 ${
          isRegistered 
            ? 'bg-green-600 cursor-not-allowed' 
            : isRegistering 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-slate-900 hover:bg-indigo-600'
        }`}
      >
        {isRegistered ? (
          <>
            <span>✓</span>
            Registered
          </>
        ) : isRegistering ? (
          'Registering...'
        ) : (
          <>
            Register Now
            <ArrowUpRight className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </div>
  </div>
  );
};

const EventDetailModal = ({ event, onClose, onRegister, isRegistering }) => {
  if (!event) return null;

  const eventDate = event.startDate ? new Date(event.startDate) : new Date();
  const formattedDate = eventDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const isRegistered = event.attendees && event.attendees.some(a => a._id);

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
                <span className="text-xs text-slate-500">• {event.eventType || 'In-person'}</span>
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
            {event.image && (
              <div className="h-48 bg-slate-100 rounded-lg overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-slate-500">Date & Time</p>
                  <p className="text-slate-900 font-medium">{formattedDate}</p>
                  <p className="text-slate-600 text-sm">{event.startTime || 'TBD'} - {event.endTime || 'TBD'}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                {event.eventType === 'online' ? (
                  <Video className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                ) : (
                  <MapPin className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                )}
                <div>
                  <p className="text-sm text-slate-500">Location</p>
                  <p className="text-slate-900 font-medium">{event.location || 'TBD'}</p>
                  {event.eventType === 'online' && (
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
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Attendees ({event.attendees ? event.attendees.length : 0})
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {event.attendees && event.attendees.length > 0 ? (
                    event.attendees.slice(0, 5).map((attendee, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600"
                      >
                        {attendee.name ? attendee.name[0].toUpperCase() : 'A'}
                      </div>
                    ))
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center">
                      <Users className="w-4 h-4 text-slate-400" />
                    </div>
                  )}
                </div>
                <span className="text-sm text-slate-600">
                  {event.attendees ? event.attendees.length : 0} {event.attendees?.length === 1 ? 'person' : 'people'} registered
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button 
              onClick={() => onRegister(event._id)}
              disabled={isRegistering || isRegistered}
              className={`w-full font-medium py-2.5 px-4 rounded-lg transition-colors ${
                isRegistered 
                  ? 'bg-green-600 cursor-not-allowed text-white' 
                  : isRegistering 
                    ? 'bg-slate-400 cursor-not-allowed text-white' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isRegistered ? '✓ Registered' : isRegistering ? 'Registering...' : 'Register Now'}
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
  const { auth } = useAuth();
  // Students come back with `id` while alumni use `_id`, so normalize both
  const myId = auth?.alumniLoggedIn
    ? auth?.alumni?._id
    : auth?.student?._id || auth?.student?.id;
  const isAlumni = !!auth?.alumniLoggedIn;
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  // Track which event is currently registering to avoid all buttons showing loading state
  const [registeringId, setRegisteringId] = useState(null);

  // Helpers to normalize IDs that may arrive as strings or nested objects
  const getId = (val) => {
    const raw = (val && typeof val === 'object') ? (val._id ?? val.user_id ?? val.id ?? val) : val;
    return raw != null ? String(raw) : null;
  };
  const getCreatorId = (event) => getId(event?.creator_user_id);
  const getAttendeeIds = (event) => Array.isArray(event?.attendees) ? event.attendees.map(getId).filter(Boolean) : [];

  const normMyId = useMemo(() => (myId ? String(getId(myId)) : null), [myId]);
  
  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/events');
        const data = await response.json();
        if (data.ok) {
          setEvents(data.events || []);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);
  
  // Handle event registration
  const handleRegister = async (eventId) => {
    const normalizedId = String(eventId);
    if (registeringId === normalizedId) return;
    
    try {
      setRegisteringId(normalizedId);
      const response = await fetch(`/api/events/${eventId}/attend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.ok) {
        // Update the events list with the updated event data
        setEvents(prevEvents => prevEvents.map(e => (getId(e?._id) === String(eventId) ? data.event : e)));
        
        // Update selected event if it's the modal
        if (selectedEvent && selectedEvent._id === eventId) {
          setSelectedEvent(data.event);
        }
        
        // Show success message
        alert('Successfully registered for the event! The organizer has been notified.');
      } else {
        alert(data.error || 'Failed to register for event');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Failed to register for event. Please try again.');
    } finally {
      setRegisteringId(null);
    }
  };
  
  // Deduplicate events by _id and prefer the variant with populated attendees
  const uniqueEvents = useMemo(() => {
    const map = new Map();
    for (const e of events) {
      const id = getId(e?._id || e?.id);
      if (!id) continue;
      if (!map.has(id)) {
        map.set(id, e);
      } else {
        const prev = map.get(id);
        const prevAtt = getAttendeeIds(prev).length;
        const currAtt = getAttendeeIds(e).length;
        map.set(id, currAtt >= prevAtt ? { ...prev, ...e } : prev);
      }
    }
    return Array.from(map.values());
  }, [events]);

  // Get categories - combine default categories with any dynamic ones from events
  const defaultCategories = ['All', 'Networking', 'Workshop', 'Conference', 'Webinar'];
  const eventCategories = new Set(uniqueEvents.map(event => event.category).filter(Boolean));
  const categories = ['All', ...new Set([
    'Networking', 'Workshop', 'Conference', 'Webinar',
    ...eventCategories
  ].filter(c => c !== 'All'))];
  
  // Filter events based on active tab, search query, and category
  const filteredEvents = uniqueEvents.filter(event => {
    // Interpret "My Events" tab differently for alumni vs students
    let matchesTab = true;
    if (activeTab === 'registered') {
      if (isAlumni) {
        // Hosted by me (avoid showing events from other alumni)
        const creatorId = getCreatorId(event);
        matchesTab = creatorId && normMyId ? creatorId === normMyId : false;
      } else {
        // Registered by me (student)
        const attendeeIds = getAttendeeIds(event);
        matchesTab = normMyId ? attendeeIds.includes(normMyId) : false;
      }
    } else {
      // Upcoming/default tab: show all unique events
      matchesTab = true;
    }

    // Check if event matches search query
    const matchesSearch = searchQuery === '' || 
      event.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Check if event matches selected category
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    
    return matchesTab && matchesSearch && matchesCategory;
  });

  // Count events for tabs
  const upcomingCount = uniqueEvents.length;
  const registeredCount = useMemo(() => {
    if (isAlumni) {
      // Hosted by me
      return uniqueEvents.filter(e => {
        const creatorId = getCreatorId(e);
        return creatorId && normMyId ? creatorId === normMyId : false;
      }).length;
    }
    // Registered by me (student)
    return uniqueEvents.filter(e => getAttendeeIds(e).includes(normMyId)).length;
  }, [uniqueEvents, isAlumni, normMyId]);

  // Final render list: ensure absolutely no duplicate ids make it to the DOM
  const renderEvents = useMemo(() => {
    const seen = new Set();
    const out = [];
    for (const e of filteredEvents) {
      const id = e?._id || e?.id;
      if (!id) continue;
      if (seen.has(id)) continue;
      seen.add(id);
      out.push(e);
    }
    return out;
  }, [filteredEvents]);

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
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-slate-500">Loading events...</p>
            </div>
          </div>
        ) : renderEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderEvents.map((event) => {
              const eventId = getId(event._id) || getId(event.id);
              return (
              <EventCard 
                    key={eventId} 
                event={event}
                onClick={(event) => setSelectedEvent(event)}
                onRegister={handleRegister}
                    isRegistering={registeringId === String(eventId)}
                currentUserId={normMyId}
              />
              );
            })}
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
          onRegister={handleRegister}
          isRegistering={registeringId === String(getId(selectedEvent._id) || getId(selectedEvent.id))}
        />
      )}
    </div>
  );
};

export default Events;