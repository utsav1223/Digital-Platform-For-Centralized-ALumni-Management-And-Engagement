import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Loader2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin, 
  Users, 
  User, 
  Search,
  Filter,
  MoreHorizontal,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import FilterPill from './FilterPill.jsx';

// ✅ 1️⃣ Define API_BASE
const API_BASE = "http://localhost:8000";

export default function AdminEventManagement() {
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);
  
  // Modal & Selection States
  const [rejectingEvent, setRejectingEvent] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [activeItem, setActiveItem] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    applyFilter(filter, allEvents);
  }, [filter, allEvents]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/admin/events`, { credentials: "include" });
      
      const text = await res.text();
      const trimmed = text.trim();

      if (trimmed.toLowerCase().startsWith("<!doctype") || trimmed.toLowerCase().startsWith("<html")) {
        throw new Error("Received HTML instead of JSON. Check API route.");
      }

      const data = JSON.parse(text);

      if (res.ok && data.ok) {
        const list = data.events || [];
        setAllEvents(list);
        applyFilter(filter, list);
        setError(null);
      } else {
        setError(data.error || `Failed to load events (status ${res.status})`);
      }
    } catch (err) {
      setError("Failed to load events: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (nextFilter, list = allEvents) => {
    if (!list) return;
    if (nextFilter === 'all') {
      setEvents(list);
    } else {
      setEvents(list.filter((e) => e.status === nextFilter));
    }
  };

  // --- Action Handlers ---

  const handleApproveEvent = async (eventId) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/events/${eventId}/approve`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audience: "both" })
      });
      if (!res.ok) throw new Error(`Approve failed: ${res.status}`);
      
      // Optimistic Update
      setEvents(prev => prev.map(e => e._id === eventId ? { ...e, status: 'accepted' } : e));
      setAllEvents(prev => prev.map(e => e._id === eventId ? { ...e, status: 'accepted' } : e));
      if (activeItem?.data?._id === eventId) setActiveItem(null);
    } catch (err) {
      setError("Failed to approve event: " + err.message);
    }
  };

  const handleRejectEvent = async (eventId) => {
    if (!rejectReason.trim()) {
      alert("Please provide a rejection reason");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/admin/events/${eventId}/reject`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: rejectReason })
      });
      if (!res.ok) throw new Error(`Reject failed: ${res.status}`);

      // Optimistic Update
      setEvents(prev => prev.map(e => e._id === eventId ? { ...e, status: 'rejected', rejection_reason: rejectReason } : e));
      setAllEvents(prev => prev.map(e => e._id === eventId ? { ...e, status: 'rejected', rejection_reason: rejectReason } : e));
      
      setRejectingEvent(null);
      setRejectReason("");
    } catch (err) {
      setError("Failed to reject event: " + err.message);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/events/${eventId}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      
      setEvents(prev => prev.filter(e => e._id !== eventId));
      setAllEvents(prev => prev.filter(e => e._id !== eventId));
    } catch (err) {
      setError("Failed to delete event: " + err.message);
    }
  };

  // --- Bulk Selection Logic ---

  const toggleSelect = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAllVisible = () => {
    setSelectedIds(new Set(events.filter(e => e.status === 'pending').map(e => e._id)));
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleBulkApprove = async () => {
    const ids = Array.from(selectedIds);
    for (const id of ids) {
      // Execute sequentially or Promise.all in real app
      await handleApproveEvent(id).catch(console.error);
    }
    clearSelection();
  };

  const handleBulkReject = async () => {
    if (!confirm(`Reject ${selectedIds.size} selected events?`)) return;
    const reason = prompt('Enter rejection reason for all selected events:');
    if (!reason?.trim()) return;

    const ids = Array.from(selectedIds);
    // In a real app, you might want a bulk API endpoint
    for (const id of ids) {
      try {
        await fetch(`${API_BASE}/api/admin/events/${id}/reject`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reason })
        });
        
        // Manual state update for bulk
        setEvents(prev => prev.map(e => e._id === id ? { ...e, status: 'rejected', rejection_reason: reason } : e));
        setAllEvents(prev => prev.map(e => e._id === id ? { ...e, status: 'rejected', rejection_reason: reason } : e));
      } catch (err) {
        console.error(err);
      }
    }
    clearSelection();
  };

  // --- UI Helpers ---

  const getStatusBadge = (status) => {
    switch(status) {
      case 'accepted': 
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">Approved</span>;
      case 'rejected': 
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 border border-rose-200">Rejected</span>;
      default: 
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">Pending</span>;
    }
  };

  const formatDate = (dateString) => {
    if(!dateString) return 'TBD';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Event Requests</h1>
            <p className="text-slate-500 mt-1">Manage, approve, or reject incoming event submissions.</p>
          </div>
          
          {/* Filters */}
          <div className="flex items-center bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
            <FilterPill label="All" value="all" activeValue={filter} onClick={setFilter} />
            <div className="w-px h-4 bg-slate-200 mx-1"></div>
            <FilterPill label="Pending" value="pending" activeValue={filter} onClick={setFilter} colorClass="text-amber-700 bg-amber-50" />
            <FilterPill label="Approved" value="accepted" activeValue={filter} onClick={setFilter} colorClass="text-emerald-700 bg-emerald-50" />
            <FilterPill label="Rejected" value="rejected" activeValue={filter} onClick={setFilter} colorClass="text-rose-700 bg-rose-50" />
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {(filter === 'pending' || selectedIds.size > 0) && (
          <div className={`transition-all duration-300 ${selectedIds.size > 0 ? 'opacity-100 translate-y-0' : 'opacity-100'}`}>
            <div className="flex items-center justify-between bg-white border border-indigo-100 rounded-xl p-3 shadow-sm">
               <div className="flex items-center gap-3">
                 <button 
                   onClick={selectAllVisible} 
                   className="text-xs font-semibold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-md transition-colors"
                 >
                   Select All Pending
                 </button>
                 {selectedIds.size > 0 && (
                   <span className="text-sm text-slate-600 font-medium">
                     {selectedIds.size} selected
                   </span>
                 )}
               </div>
               
               {selectedIds.size > 0 && (
                 <div className="flex gap-2">
                   <button onClick={clearSelection} className="text-xs text-slate-500 hover:text-slate-800 px-3 py-1.5">
                     Cancel
                   </button>
                   <button onClick={handleBulkApprove} className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all">
                     <CheckCircle size={14} /> Approve All
                   </button>
                   <button onClick={handleBulkReject} className="flex items-center gap-2 px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all">
                     <XCircle size={14} /> Reject All
                   </button>
                 </div>
               )}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl border border-red-200 bg-red-50 text-red-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-indigo-600" />
            <p className="text-sm font-medium">Loading events...</p>
          </div>
        ) : (
          <>
            {/* Empty State */}
            {events.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200 border-dashed">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">No events found</h3>
                <p className="text-slate-500 max-w-sm text-center mt-1">
                  There are currently no {filter !== 'all' ? filter : ''} events to display.
                </p>
              </div>
            ) : (
              /* Events Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {events.map(event => {
                  const creatorName = event.creator_user_id?.name || event.creator_user_id?.email || 'Unknown';
                  const initials = creatorName.slice(0, 2).toUpperCase();
                  const isSelected = selectedIds.has(event._id);

                  return (
                    <div 
                      key={event._id}
                      className={`group relative bg-white rounded-xl border transition-all duration-200 flex flex-col
                        ${isSelected ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-md bg-indigo-50/10' : 'border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:-translate-y-0.5'}
                      `}
                    >
                      {/* Selection Checkbox (Floating) */}
                      {event.status === 'pending' && (
                        <div className="absolute top-4 right-4 z-10">
                           <input 
                              type="checkbox" 
                              checked={isSelected} 
                              onChange={() => toggleSelect(event._id)}
                              className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                           />
                        </div>
                      )}

                      <div className="p-5 flex-grow">
                        {/* Header: Avatar & Status */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                              {initials}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs text-slate-500 font-medium">Requested by</span>
                              <span className="text-xs font-bold text-slate-800 truncate max-w-[120px]" title={creatorName}>{creatorName}</span>
                            </div>
                          </div>
                          <div className={event.status === 'pending' ? 'mr-6' : ''}>
                             {getStatusBadge(event.status)}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-3">
                          <h3 
                            className="text-lg font-bold text-slate-900 leading-tight line-clamp-2 cursor-pointer hover:text-indigo-600 transition-colors"
                            onClick={() => setActiveItem({ type: 'event', data: event })}
                          >
                            {event.title}
                          </h3>

                          {/* Meta Tags */}
                          <div className="flex flex-wrap gap-2">
                             {event.category && <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">{event.category}</span>}
                             {event.is_online && <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-600">Online</span>}
                          </div>
                          
                          {/* Info List */}
                          <div className="space-y-2 pt-2">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              <span>{formatDate(event.startDate)}</span>
                            </div>
                            {event.startTime && (
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Clock className="w-4 h-4 text-slate-400" />
                                <span>{event.startTime}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <MapPin className="w-4 h-4 text-slate-400" />
                              <span className="truncate">{event.location || 'Location TBD'}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="p-4 border-t border-slate-100 bg-slate-50/50 rounded-b-xl flex gap-3">
                        {event.status === 'pending' ? (
                          <>
                            <button 
                              onClick={() => setRejectingEvent(event._id)}
                              className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-colors"
                            >
                              Reject
                            </button>
                            <button 
                              onClick={() => handleApproveEvent(event._id)}
                              className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition-colors"
                            >
                              Approve
                            </button>
                          </>
                        ) : (
                          <button 
                            onClick={() => handleDeleteEvent(event._id)}
                            className="w-full py-2 px-3 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-colors flex items-center justify-center gap-2"
                          >
                             <XCircle size={14} /> Delete Event
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* --- REJECT MODAL --- */}
      {rejectingEvent && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 border border-slate-200">
            <div className="flex items-center justify-center w-12 h-12 bg-rose-100 rounded-full mb-4 mx-auto">
              <XCircle className="w-6 h-6 text-rose-600" />
            </div>
            <h3 className="text-lg font-bold text-center text-slate-900">Reject Event</h3>
            <p className="text-sm text-center text-slate-500 mb-4">Are you sure? This action cannot be undone.</p>
            
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Please provide a reason for rejection..."
              rows="3"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none mb-4 resize-none"
              autoFocus
            />
            
            <div className="flex gap-3">
              <button
                onClick={() => { setRejectingEvent(null); setRejectReason(''); }}
                className="flex-1 px-4 py-2.5 text-sm font-medium border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRejectEvent(rejectingEvent)}
                className="flex-1 px-4 py-2.5 text-sm font-medium bg-rose-600 text-white rounded-lg hover:bg-rose-700 shadow-sm transition-colors"
              >
                Reject Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- DETAILS MODAL --- */}
      {activeItem && activeItem.type === 'event' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 border-b border-slate-100 bg-slate-50/50 sticky top-0 z-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {getStatusBadge(activeItem.data.status)}
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500 font-medium">{activeItem.data.type || 'Event'}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 leading-tight">{activeItem.data.title}</h2>
              </div>
              <button 
                onClick={() => setActiveItem(null)} 
                className="p-2 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-8">
              
              {/* Main Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Details */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Schedule</h4>
                    <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-100">
                      <div className="flex items-center justify-between">
                         <span className="text-sm text-slate-500">Start Date</span>
                         <span className="text-sm font-medium text-slate-900">{formatDate(activeItem.data.startDate)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-sm text-slate-500">Start Time</span>
                         <span className="text-sm font-medium text-slate-900">{activeItem.data.startTime || '--:--'}</span>
                      </div>
                      <div className="w-full h-px bg-slate-200 my-2"></div>
                      <div className="flex items-center justify-between">
                         <span className="text-sm text-slate-500">End Date</span>
                         <span className="text-sm font-medium text-slate-900">{activeItem.data.endDate ? formatDate(activeItem.data.endDate) : '-'}</span>
                      </div>
                       <div className="flex items-center justify-between">
                         <span className="text-sm text-slate-500">End Time</span>
                         <span className="text-sm font-medium text-slate-900">{activeItem.data.endTime || '--:--'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                     <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Location & Link</h4>
                     <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-200">
                           <MapPin className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                           <div>
                              <p className="text-sm font-medium text-slate-900">{activeItem.data.location || 'No location specified'}</p>
                              <p className="text-xs text-slate-500">Physical Location</p>
                           </div>
                        </div>
                        {activeItem.data.link && (
                          <div className="flex items-start gap-3 p-3 rounded-lg border border-blue-100 bg-blue-50/50">
                             <ExternalLink className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                             <div className="min-w-0">
                                <a href={activeItem.data.link} target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-700 hover:underline block truncate">
                                  {activeItem.data.link}
                                </a>
                                <p className="text-xs text-blue-600/80">Virtual Meeting Link</p>
                             </div>
                          </div>
                        )}
                     </div>
                  </div>
                </div>

                {/* Right Column: Description & People */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">About Event</h4>
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                      {activeItem.data.description || 'No description provided.'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                     <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Participants</h4>
                     <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-2">
                           <Users className="w-4 h-4 text-slate-500" />
                           <span className="text-sm font-medium text-slate-700">Attendees</span>
                        </div>
                        <span className="text-lg font-bold text-slate-900">{activeItem.data.attendees?.length || 0}</span>
                     </div>
                  </div>

                  {activeItem.data.rejection_reason && (
                    <div className="mt-4 bg-rose-50 border border-rose-200 rounded-lg p-4">
                      <h4 className="text-xs font-bold text-rose-700 uppercase mb-1">Rejection Reason</h4>
                      <p className="text-sm text-rose-800">{activeItem.data.rejection_reason}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 sticky bottom-0">
              <button 
                onClick={() => setActiveItem(null)}
                className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}