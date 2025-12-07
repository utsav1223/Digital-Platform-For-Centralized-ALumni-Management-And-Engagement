import React from 'react';
import { 
  LayoutDashboard, Users, Briefcase, 
  MessageSquare, Calendar, Award, UserCircle 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isMobile, closeMobileMenu }) {
  
  const MenuItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        if(isMobile && closeMobileMenu) closeMobileMenu();
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium mb-1 ${
        activeTab === id 
          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
          : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="h-full flex flex-col">
       {/* Logo Area */}
      {!isMobile && (
          <div className="p-6 mb-2">
            <h1 className="text-2xl font-bold text-blue-600 tracking-tight flex items-center gap-2">
                <Briefcase className="fill-blue-600 text-white w-8 h-8" />
                AlumniConnect
            </h1>
          </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 px-4 overflow-y-auto">
        <div className="space-y-1">
            <MenuItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
            <MenuItem id="directory" icon={Users} label="Alumni Directory" />
            <MenuItem id="jobs" icon={Briefcase} label="Jobs Board" />
            <MenuItem id="feed" icon={MessageSquare} label="Community Feed" />
            <MenuItem id="events" icon={Calendar} label="Events" />
            <MenuItem id="mentorship" icon={Award} label="Mentorship" />
        </div>
        
        <div className="mt-8 pt-4 border-t border-slate-100">
            <h4 className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Account</h4>
            <MenuItem id="profile" icon={UserCircle} label="My Profile" />
        </div>
      </nav>
      
      {/* User Mini Profile (Desktop only) */}
      {!isMobile && (
          <div className="p-4 m-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">R</div>
              <div className="overflow-hidden">
                  <p className="text-sm font-bold text-slate-800 truncate">Rahul Kumar</p>
                  <p className="text-xs text-slate-500 truncate">Class of 2024</p>
              </div>
          </div>
      )}
    </div>
  );
}