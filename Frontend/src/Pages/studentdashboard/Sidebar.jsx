import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Briefcase, 
  Calendar, 
  MessageSquare, 
  BookOpen,
  Award,
  ChevronDown,
  LogOut,
  User,
  Settings,
  HelpCircle
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isMobile = false, closeMobileMenu }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  // Mock user data
  const userData = {
    name: 'Student Name',
    email: 'student@example.com',
    initial: 'S'
  };

  // Updated menu items in the specified order
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'internships', icon: Briefcase, label: 'Internships' },
    { id: 'community', icon: MessageSquare, label: 'Community Feed' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'mentorship', icon: Award, label: 'Mentorship' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'courses', icon: BookOpen, label: 'My Courses' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const profileButton = document.getElementById('sidebar-profile-button');
      const dropdown = document.getElementById('sidebar-profile-dropdown');
      
      if (profileButton && profileButton.contains(event.target)) {
        return;
      }
      
      if (dropdown && !dropdown.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    // window.location.href = '/login';
  };

  return (
    <div className={`${isMobile ? 'w-full' : 'w-72'} bg-white h-full flex flex-col border-r border-slate-200`}>
      {/* Logo */}
      <div className="p-4 border-b border-slate-100">
        <h1 className="text-xl font-bold text-blue-600">AlumniConnect</h1>
      </div>

      {/* Profile Section */}
      <div className="p-4 border-b border-slate-100 relative">
        <button
          id="sidebar-profile-button"
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium text-sm">
            {userData.initial}
          </div>
          <div className="text-left flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">{userData.name}</p>
            <p className="text-xs text-slate-500 truncate">View Profile</p>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-slate-400 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} 
          />
        </button>

        {/* Profile Dropdown */}
        {showProfileDropdown && (
          <div 
            id="sidebar-profile-dropdown"
            className="absolute left-4 right-4 mt-1 bg-white rounded-lg shadow-lg border border-slate-200 z-50 py-1.5"
          >
            <div className="px-4 py-2 border-b border-slate-100">
              <p className="text-sm font-medium text-slate-800">{userData.name}</p>
              <p className="text-xs text-slate-500 truncate">{userData.email}</p>
            </div>
            <div className="py-1">
              <button
                onClick={() => {
                  setActiveTab('profile');
                  setShowProfileDropdown(false);
                  if (closeMobileMenu) closeMobileMenu();
                }}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <User className="w-4 h-4 text-slate-500" />
                My Profile
              </button>
              <button 
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                onClick={() => {
                  setActiveTab('settings');
                  setShowProfileDropdown(false);
                  if (closeMobileMenu) closeMobileMenu();
                }}
              >
                <Settings className="w-4 h-4 text-slate-500" />
                Settings
              </button>
            </div>
            <div className="border-t border-slate-100 pt-1">
              <button 
                onClick={() => {
                  handleLogout();
                  if (closeMobileMenu) closeMobileMenu();
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (isMobile && closeMobileMenu) closeMobileMenu();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;