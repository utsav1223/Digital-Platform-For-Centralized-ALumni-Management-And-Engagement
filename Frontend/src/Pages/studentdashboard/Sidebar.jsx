import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  Briefcase,
  Calendar,
  MessageSquare,
  BookOpen,
  Award,
  ChevronUp, // Changed to ChevronUp since profile is at bottom
  LogOut,
  User,
  Settings,
  GraduationCap, // Added a logo icon
} from "lucide-react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeTab, setActiveTab, isMobile = false, closeMobileMenu }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // ✅ ALWAYS GET AUTH FIRST
  const { auth, checkAuth } = useAuth();
  const navigate = useNavigate();

  /* ---------------- USER DATA FROM AUTH ---------------- */
  const userData = auth?.studentLoggedIn
    ? {
        name: auth.student?.name || "Student",
        email: auth.student?.email || "",
        initial: auth.student?.name
          ? auth.student.name.charAt(0).toUpperCase()
          : "S",
        role: "Student Account"
      }
    : {
        name: "Guest User",
        email: "Please login",
        initial: "G",
        role: "Visitor"
      };

  /* ---------------- MENU ITEMS ---------------- */
  const menuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "internships", icon: Briefcase, label: "Internships" },
    { id: "courses", icon: BookOpen, label: "My Courses" },
    { id: "mentorship", icon: Award, label: "Mentorship" },
    { id: "events", icon: Calendar, label: "Events" },
    { id: "community", icon: MessageSquare, label: "Community Feed" },
  ];

  /* ---------------- CLICK OUTSIDE ---------------- */
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

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/student/logout", {
        method: "POST",
        credentials: "include",
      });
      await checkAuth();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside
      className={`
        ${isMobile ? "w-full fixed inset-0 z-50" : "w-72 sticky top-0 h-screen"} 
        bg-white border-r border-slate-200 flex flex-col transition-all duration-300 shadow-sm
      `}
    >
      {/* 1. BRAND HEADER */}
      <div className="h-20 flex items-center px-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">AlumniConnect</h1>
            <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">Student Portal</p>
          </div>
        </div>
        
        {isMobile && (
             <button onClick={closeMobileMenu} className="ml-auto p-2 text-slate-400">✕</button>
        )}
      </div>

      {/* 2. NAVIGATION LINKS */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Main Menu</p>
        
        {menuItems.map(({ id, icon: Icon, label }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                closeMobileMenu?.();
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

      {/* 3. USER PROFILE (Moved to Bottom for Professional Look) */}
      <div className="p-4 border-t border-slate-100 relative">
        
        {/* Dropdown Menu (Opens Upwards) */}
        {showProfileDropdown && (
          <div
            ref={dropdownRef}
            className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200"
          >
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-900">{userData.name}</p>
              <p className="text-xs text-slate-500 truncate">{userData.email}</p>
            </div>

            <div className="p-1">
              <button
                onClick={() => { setActiveTab("profile"); setShowProfileDropdown(false); closeMobileMenu?.(); }}
                className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 transition-colors"
              >
                <User className="w-4 h-4 text-slate-400" /> My Profile
              </button>
              <button
                onClick={() => { setActiveTab("settings"); setShowProfileDropdown(false); closeMobileMenu?.(); }}
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

        {/* Profile Button */}
        <button
          ref={buttonRef}
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          className={`
            w-full flex items-center gap-3 p-2 rounded-xl transition-all duration-200 border
            ${showProfileDropdown ? "bg-indigo-50 border-indigo-200" : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200"}
          `}
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shadow-sm ring-2 ring-white">
            {userData.initial}
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{userData.name}</p>
            <p className="text-xs text-slate-500 truncate">{userData.role}</p>
          </div>
          <ChevronUp className={`w-4 h-4 text-slate-400 transition-transform ${showProfileDropdown ? "rotate-180" : ""}`} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;