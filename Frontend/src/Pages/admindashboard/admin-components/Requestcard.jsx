import React from 'react';

// --- Icons ---
const BuildingIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const CalendarIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const CheckIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>;
const XIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;
const UserIcon = () => <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;

export default function RequestCard({ r, selectedIds, toggleSelect, handleSingleAction, setActiveItem }) {
  
  const theme = getThemeColors(r.type);
  // ✅ FIX #2: Use _id instead of id
  const isSelected = selectedIds.has(r._id);

  // Dynamic label based on request type
  const getSubLabel = () => {
    if (r.type === 'event') return 'Venue / Organizer';
    if (r.type === 'mentorship') return 'Institute / Org';
    return 'Company';
  };

  return (
    <article 
      className={`
        group relative flex flex-col h-full min-h-[260px]
        bg-white rounded-2xl border transition-all duration-300
        ${isSelected 
          ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-lg' 
          : 'border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1'
        }
      `}
    >
      {/* Top Stripe (Visual Indicator) */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl ${theme.bar}`} />

      {/* --- Card Header --- */}
      <div className="p-5 pb-2">
        <div className="flex justify-between items-start mb-3">
          {/* Type Badge */}
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${theme.badge}`}>
            {r.type}
          </span>
          
          {/* Checkbox */}
          <div className="relative flex items-center">
             <input 
              type="checkbox" 
              checked={isSelected} 
              // ✅ FIX #2: Use _id
              onChange={() => toggleSelect(r._id)} 
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 bg-slate-50 checked:bg-indigo-600 checked:border-transparent transition-all hover:border-indigo-400"
            />
            <svg className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
        </div>

        {/* Title & User Info */}
        <div className="flex items-start gap-3">
          {/* Avatar (Initials) */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm border border-slate-200">
            {/* ✅ OPTIONAL FIX: Name safety check */}
            {r.name?.charAt(0) || "U"}
          </div>
          
          <div className="min-w-0">
            <h3 
              onClick={() => setActiveItem({ type: 'request', data: r })}
              className="text-base font-bold text-slate-800 truncate cursor-pointer hover:text-indigo-600 transition-colors" 
              // ✅ OPTIONAL FIX: Title safety check
              title={r.title || "Untitled"}
            >
              {r.title || "Untitled"}
            </h3>
            <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
              <UserIcon />
              <span className="font-medium text-slate-600">{r.name || "Unknown User"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Card Body (Metadata & Message) --- */}
      <div className="px-5 flex-grow flex flex-col gap-3">
        {/* Metadata Row */}
        <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-slate-500 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-1.5" title={getSubLabel()}>
            <BuildingIcon />
            <span className="truncate max-w-[120px] font-medium">{r.company || '—'}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Date Submitted">
            <CalendarIcon />
            <span className="font-medium">{r.date}</span>
          </div>
        </div>

        {/* Message Snippet */}
        <p 
          className="text-sm text-slate-600 line-clamp-3 leading-relaxed cursor-pointer hover:text-slate-900 transition-colors"
          onClick={() => setActiveItem({ type: 'request', data: r })}
        >
          {r.message}
        </p>
      </div>

      {/* --- Card Footer (Actions) --- */}
      <div className="p-4 mt-2">
        <div className="grid grid-cols-2 gap-3">
          {r.status === 'pending' ? (
            <>
              <button 
                // ✅ FIX #2: Use _id
                onClick={() => handleSingleAction(r._id, 'rejected')} 
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-50 text-slate-600 text-sm font-medium hover:bg-rose-50 hover:text-rose-600 border border-slate-200 hover:border-rose-200 transition-all"
              >
                Reject
              </button>
              <button 
                // ✅ FIX #1: Use 'approved' instead of 'accepted' AND FIX #2: Use _id
                onClick={() => handleSingleAction(r._id, 'approved')} 
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
              >
                Accept
              </button>
            </>
          ) : (
            <div className={`col-span-2 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold border ${statusStyles(r.status)}`}>
               {/* ✅ FIX #1: Check for 'approved' */}
               {r.status === 'approved' ? <CheckIcon /> : <XIcon />}
               {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
            </div>
          )}
        </div>
      </div>

    </article>
  )
}

// --- Visual Helpers (Professional / Corporate Theme) ---

function getThemeColors(type) {
  switch (type?.toLowerCase()) {
    case 'mentorship':
      return {
        bar: 'bg-emerald-500',
        badge: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
      };
    case 'internship':
      return {
        bar: 'bg-amber-500',
        badge: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
      };
    case 'job':
      return {
        bar: 'bg-violet-500',
        badge: 'bg-violet-50 text-violet-700 ring-1 ring-violet-100',
      };
    case 'event': // Added Event Theme (Blue)
      return {
        bar: 'bg-blue-500',
        badge: 'bg-blue-50 text-blue-700 ring-1 ring-blue-100',
      };
    default:
      return {
        bar: 'bg-slate-500',
        badge: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
      };
  }
}

function statusStyles(status) {
  // ✅ FIX #1: Check for 'approved'
  if (status === 'approved') {
    return 'bg-emerald-50 border-emerald-100 text-emerald-700';
  }
  if (status === 'rejected') {
    return 'bg-rose-50 border-rose-100 text-rose-700';
  }
  return 'bg-slate-100 text-slate-600 border-slate-200';
}