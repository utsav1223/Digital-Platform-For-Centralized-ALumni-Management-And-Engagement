import React, { useEffect, useState, useRef } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Calendar, 
  Award, 
  LogOut,
  ChevronUp,
  Settings,
  User,
  GraduationCap
} from 'lucide-react';
import { useNavigate } from "react-router-dom"; // Recommended for SPA navigation
import { getLoggedInAlumni, logoutAlumni } from "../../api/authAPI";

export default function Sidebar({ activeTab, setActiveTab, isMobile, closeMobileMenu }) {
  const [alumni, setAlumni] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  // Refs for click outside detection
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  // 1. Fetch Alumni Data
  useEffect(() => {
    getLoggedInAlumni()
      .then((res) => {
        if (res.data.loggedIn) {
          setAlumni(res.data.alumni);
        }
      })
      .catch((err) => console.log("Session Fetch Error:", err));
  }, []);

  // 2. Handle Click Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 3. Logout Logic
  const handleLogout = async () => {
    try {
      await logoutAlumni();
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login", { replace: true });
    } catch (error) {
      console.log("Logout Error:", error);
      // Fallback if API fails
      window.location.href = "/login";
    }
  };

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "directory", icon: Users, label: "Alumni Directory" },
    { id: "jobs", icon: Briefcase, label: "Jobs Board" },
    { id: "feed", icon: MessageSquare, label: "Community Feed" },
    { id: "events", icon: Calendar, label: "Events" },
    { id: "mentorship", icon: Award, label: "Mentorship" },
  ];

  return (
    <aside className={`
      ${isMobile ? "w-full fixed inset-0 z-50" : "w-72 sticky top-0 h-screen"} 
      bg-white border-r border-slate-200 flex flex-col transition-all duration-300 shadow-sm
    `}>
      
      {/* 1. BRAND HEADER */}
      <div className="h-20 flex items-center px-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg shadow-sm">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">AlumniConnect</h1>
            <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">Alumni Portal</p>
          </div>
        </div>
        
        {isMobile && (
           <button onClick={closeMobileMenu} className="ml-auto p-2 text-slate-400">✕</button>
        )}
      </div>

      {/* 2. NAVIGATION */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Menu
        </p>

        {menuItems.map(({ id, icon: Icon, label }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                if (isMobile && closeMobileMenu) closeMobileMenu();
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                ${isActive 
                  ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }
              `}
            >
              <Icon 
                className={`w-5 h-5 transition-colors ${isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"}`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span>{label}</span>
              
              {/* Active Indicator Dot */}
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600" />}
            </button>
          );
        })}
      </nav>

      {/* 3. USER PROFILE (Fixed at Bottom) */}
      <div className="p-4 border-t border-slate-100 relative">
        
        {/* Popup Menu */}
        {showProfileDropdown && (
          <div
            ref={dropdownRef}
            className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200"
          >
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {alumni?.fullName || "Alumni Member"}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {alumni?.email || "View your profile"}
              </p>
            </div>

            <div className="p-1">
              <button
                onClick={() => { setActiveTab("profile"); setShowProfileDropdown(false); }}
                className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 transition-colors"
              >
                <User className="w-4 h-4 text-slate-400" /> My Profile
              </button>
              <button
                onClick={() => { /* Navigate to settings */ setShowProfileDropdown(false); }}
                className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Settings className="w-4 h-4 text-slate-400" /> Settings
              </button>
            </div>

            <div className="p-1 border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          </div>
        )}

        {/* Profile Trigger Button */}
        <button
          ref={buttonRef}
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          className={`
            w-full flex items-center gap-3 p-2 rounded-xl transition-all duration-200 border
            ${showProfileDropdown 
              ? "bg-indigo-50 border-indigo-200" 
              : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200"
            }
          `}
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shadow-sm ring-2 ring-white shrink-0">
            {alumni?.fullName?.charAt(0).toUpperCase() || "A"}
          </div>
          
          <div className="flex-1 text-left min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {alumni?.fullName || "Loading..."}
            </p>
            <p className="text-xs text-slate-500 truncate">
              Alumni Member
            </p>
          </div>
          
          <ChevronUp className={`w-4 h-4 text-slate-400 transition-transform ${showProfileDropdown ? "rotate-180" : ""}`} />
        </button>
      </div>

    </aside>
  );
}