import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, Users, Briefcase, 
  MessageSquare, Calendar, Award, 
  LogOut
} from 'lucide-react';

import { getLoggedInAlumni, logoutAlumni } from "../../api/authAPI";

export default function Sidebar({ activeTab, setActiveTab, isMobile, closeMobileMenu }) {

  // State to store alumni data from session
  const [alumni, setAlumni] = useState(null);

  // Fetch logged-in alumni from backend session
  useEffect(() => {
    getLoggedInAlumni()
      .then((res) => {
        if (res.data.loggedIn) {
          setAlumni(res.data.alumni);
        }
      })
      .catch((err) => console.log("Session Fetch Error:", err));
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await logoutAlumni();
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/alumni/login"; // Redirect to login
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  const MenuItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        if (isMobile && closeMobileMenu) closeMobileMenu();
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
    <div className="h-full flex flex-col bg-white border-r border-slate-200">

      {/* Logo + User (Desktop Only) */}
      {!isMobile && (
        <div className="p-6 pb-2">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-blue-600 tracking-tight flex items-center gap-2">
              <Briefcase className="fill-blue-600 text-white w-8 h-8" />
              AlumniConnect
            </h1>
          </div>

          {/* MINI PROFILE CARD */}
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full p-3 rounded-xl border flex items-center gap-3 transition-all duration-200 group ${
              activeTab === 'profile'
                ? "bg-blue-50 border-blue-200 ring-1 ring-blue-200"
                : "bg-white border-slate-100 hover:border-blue-200 hover:shadow-md"
            }`}
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
              {alumni?.fullName?.charAt(0).toUpperCase() || "A"}
            </div>

            {/* Alumni Name */}
            <div className="overflow-hidden">
              <p className={`text-sm font-bold truncate ${
                activeTab === 'profile' 
                  ? 'text-blue-700' 
                  : 'text-slate-800 group-hover:text-blue-600'
              }`}>
                {alumni?.fullName || "Loading..."}
              </p>
              <p className="text-xs text-slate-500 truncate">View Profile</p>
            </div>
          </button>
        </div>
      )}

      {/* Menu */}
      <nav className="flex-1 px-4 overflow-y-auto mt-2">
        <div className="space-y-1">
          <MenuItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <MenuItem id="directory" icon={Users} label="Alumni Directory" />
          <MenuItem id="jobs" icon={Briefcase} label="Jobs Board" />
          <MenuItem id="feed" icon={MessageSquare} label="Community Feed" />
          <MenuItem id="events" icon={Calendar} label="Events" />
          <MenuItem id="mentorship" icon={Award} label="Mentorship" />
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-100 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 group"
        >
          <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <span>Sign Out</span>
        </button>
      </div>

    </div>
  );
}
