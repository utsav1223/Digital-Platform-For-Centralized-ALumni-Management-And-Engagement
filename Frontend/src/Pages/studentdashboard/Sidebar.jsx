import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Calendar, 
  Users,
  LogOut,
  User
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isMobile, closeMobileMenu }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'mentorship', label: 'Mentorship', icon: Users },
    { id: 'alumni', label: ' Network', icon: Users }
  ];

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

  // For mobile, just show the menu items
  if (isMobile) {
    return (
      <div className="h-full flex flex-col">
        <nav className="flex-1 px-4 py-2 space-y-1">
          {menuItems.map((item) => (
            <MenuItem key={item.id} {...item} />
          ))}
        </nav>
      </div>
    );
  }

  // For desktop, show the full sidebar with logo, profile, and navigation
  return (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 pb-2">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-blue-600 tracking-tight flex items-center gap-2">
            <Briefcase className="fill-blue-600 text-white w-8 h-8" />
            Student Portal
          </h1>
        </div>

        {/* Clickable Mini Profile */}
        <button 
          onClick={() => setActiveTab('profile')}
          className={`w-full p-3 rounded-xl border flex items-center gap-3 text-left transition-all duration-200 group ${
            activeTab === 'profile'
              ? "bg-blue-50 border-blue-200 ring-1 ring-blue-200"
              : "bg-white border-slate-100 hover:border-blue-200 hover:shadow-md"
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <p className={`text-sm font-bold truncate ${
              activeTab === 'profile' 
                ? 'text-blue-700' 
                : 'text-slate-800 group-hover:text-blue-600'
            }`}>
              John Doe
            </p>
            <p className="text-xs text-slate-500 truncate">View Profile</p>
          </div>
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <MenuItem key={item.id} {...item} />
          ))}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-100">
        <button
          onClick={() => console.log('Logout')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;