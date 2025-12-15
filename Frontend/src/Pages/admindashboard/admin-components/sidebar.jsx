// import React from 'react';

// // --- Icons ---
// const GridIcon = () => (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>);
// const UserGroupIcon = () => (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>);
// const BriefcaseIcon = () => (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>);
// const LightningIcon = () => (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>);
// const FlagIcon = () => (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-8a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>);
// const CheckIcon = () => (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>);
// const XIcon = () => (<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>);
// const LogoutIcon = () => (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>);
// // --- New Icon for Events ---
// const CalendarIcon = () => (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>);

// export default function Sidebar({ view, setView, typeFilter, setTypeFilter, selectAllVisible, clearSelection }) {
  
//   // Helper to determine styling for nav items
//   const NavItem = ({ label, icon: Icon, active, onClick, colorClass = "text-indigo-600" }) => (
//     <button 
//       onClick={onClick}
//       className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 
//         ${active 
//           ? `bg-indigo-50 shadow-sm ${colorClass} font-bold ring-1 ring-indigo-100` 
//           : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
//         }`}
//     >
//       <div className={`transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
//         <Icon />
//       </div>
//       <span>{label}</span>
//       {active && (
//         <div className={`ml-auto w-1.5 h-1.5 rounded-full ${colorClass.replace('text-', 'bg-')}`}></div>
//       )}
//     </button>
//   );

//   const handleLogout = () => {
//     // Clear admin flags and token, then redirect to login
//     localStorage.removeItem('admin_token');
//     localStorage.removeItem('isAdminLoggedIn');
//     console.log("Logging out...");
//     window.location.href = "/admin/login"; 
//   };

//   return (
//     <aside className="h-full flex flex-col w-full">
//       {/* --- Brand / Logo Area --- */}
//       <div className="p-6 pb-2">
//         <div className="flex items-center gap-3">
//           <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
//             AL
//             <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></div>
//           </div>
//           <div>
//             <div className="text-base font-bold text-slate-800 leading-tight">Alumni Admin</div>
//             <div className="text-xs font-medium text-slate-400">Workspace</div>
//           </div>
//         </div>
//       </div>

//       <div className="my-4 mx-6 h-px bg-slate-100"></div>

//       {/* --- Navigation --- */}
//       <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
//         <div className="px-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
//           Overview
//         </div>
        
//         <NavItem 
//           label="All Requests" 
//           icon={GridIcon} 
//           active={view === 'requests' && typeFilter === 'all'} 
//           onClick={() => { setView('requests'); setTypeFilter('all'); }}
//         />

//         <div className="pt-4 px-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
//           Filters
//         </div>

//         <NavItem 
//           label="Mentorship" 
//           icon={UserGroupIcon} 
//           active={view === 'requests' && typeFilter === 'mentorship'} 
//           onClick={() => { setView('requests'); setTypeFilter('mentorship'); }}
//           colorClass="text-emerald-600"
//         />
//         <NavItem 
//           label="Internships" 
//           icon={LightningIcon} 
//           active={view === 'requests' && typeFilter === 'internship'} 
//           onClick={() => { setView('requests'); setTypeFilter('internship'); }}
//           colorClass="text-amber-600"
//         />
//         <NavItem 
//           label="Jobs" 
//           icon={BriefcaseIcon} 
//           active={view === 'requests' && typeFilter === 'job'} 
//           onClick={() => { setView('requests'); setTypeFilter('job'); }}
//           colorClass="text-violet-600"
//         />
//         {/* --- ADDED: Events Filter --- */}
//         <NavItem 
//           label="Events" 
//           icon={CalendarIcon} 
//           active={view === 'requests' && typeFilter === 'event'} 
//           onClick={() => { setView('requests'); setTypeFilter('event'); }}
//           colorClass="text-blue-600"
//         />

//         <div className="pt-4 px-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
//           Moderation
//         </div>

//         <NavItem 
//           label="Reports" 
//           icon={FlagIcon} 
//           active={view === 'reports'} 
//           onClick={() => setView('reports')}
//           colorClass="text-rose-600"
//         />
//       </nav>

//       {/* --- Quick Actions (Light & Clean) --- */}
//       {view === 'requests' && (
//          <div className="px-6 py-4">
//              <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100">
//                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Bulk Selection</p>
//                 <div className="flex gap-2">
//                     <button onClick={selectAllVisible} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 shadow-sm hover:border-indigo-400 hover:text-indigo-600 transition-colors">
//                         <CheckIcon /> All
//                     </button>
//                     <button onClick={clearSelection} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 shadow-sm hover:border-rose-400 hover:text-rose-600 transition-colors">
//                         <XIcon /> None
//                     </button>
//                 </div>
//              </div>
//          </div>
//       )}

//       {/* --- Footer (Profile & Logout) --- */}
//       <div className="p-4 mt-auto border-t border-slate-100 bg-slate-50/50">
        
//         {/* User Info */}
//         <div className="flex items-center gap-3 mb-4">
//             <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-sm shadow-sm">
//                 A
//             </div>
//             <div className="flex-1 min-w-0">
//                 <p className="text-sm font-bold text-slate-800 truncate">admin@alumni.app</p>
//                 <p className="text-xs text-slate-500 truncate">Super Admin</p>
//             </div>
//         </div>

//         {/* Logout Button */}
//         <button 
//           onClick={handleLogout}
//           className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-semibold text-sm hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all shadow-sm"
//         >
//             <LogoutIcon />
//             <span>Log Out</span>
//         </button>
//       </div>
//     </aside>
//   );
// }














import React from "react";
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  Users,
  LogOut,
  Command,
  ChevronRight,
  MoreVertical
} from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      id: "jobs",
      label: "Job Approvals",
      icon: <Briefcase size={20} />,
    },
    {
      id: "events",
      label: "Events Management",
      icon: <Calendar size={20} />,
    },
    {
      id: "users",
      label: "User Directory",
      icon: <Users size={20} />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("isAdminLoggedIn");
    window.location.href = "/admin/login";
  };

  return (
    <aside className="w-72 h-screen bg-white border-r border-slate-200 flex flex-col font-sans">
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Command size={20} />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight leading-tight">
              Admin Portal
            </h1>
            <p className="text-xs text-slate-500 font-medium">Workspace</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <div className="px-2 mb-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Main Menu
            </p>
        </div>
        
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group
                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
            >
              {/* Active Indicator Line (Optional Design Choice) */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full" />
              )}

              <span className={`transition-colors ${isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"}`}>
                {item.icon}
              </span>
              
              <span className="flex-1 text-left">{item.label}</span>
              
              {isActive && <ChevronRight size={16} className="text-indigo-400" />}
            </button>
          );
        })}
      </nav>

      {/* User Profile & Logout Section */}
      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
                <img 
                    src="https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff" 
                    alt="Admin" 
                    className="w-9 h-9 rounded-lg shadow-sm"
                />
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">Admin User</p>
                    <p className="text-xs text-slate-500 truncate">admin@company.com</p>
                </div>
            </div>
            
            <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-rose-600 bg-white border border-rose-100 hover:bg-rose-50 hover:border-rose-200 transition-colors shadow-sm"
            >
            <LogOut size={14} />
            Sign Out
            </button>
        </div>
      </div>
    </aside>
  );
}