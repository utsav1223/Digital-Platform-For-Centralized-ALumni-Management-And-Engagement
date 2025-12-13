import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Bell, 
  Search
} from 'lucide-react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Internships from './Internships';
import Events from './Events';
import Profile from './Profile';
import Messages from './Messages';
import Mentorship from './Mentorship';
import AlumniNetwork from './AlumniNetwork';
import MyCourses from './MyCourses';
import CommunityFeed from './Communityfeed';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'internships': return <Internships />;
      case 'events': return <Events />;
      case 'messages': return <Messages />;
      case 'mentorship': return <Mentorship />;
      case 'alumni': return <AlumniNetwork />;
      case 'courses': return <MyCourses />;
      case 'profile': return <Profile />;
      case 'community': return <CommunityFeed />;
      case 'dashboard':
      default: return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    const titles = {
      'dashboard': 'Dashboard',
      'internships': 'Internships',
      'events': 'Events',
      'messages': 'Messages',
      'mentorship': 'Mentorship Program',
      'alumni': 'Alumni Network',
      'courses': 'My Courses',
      'profile': 'My Profile',
      'community': 'Community Feed'
    };
    return titles[activeTab] || 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-72 bg-white border-r border-slate-200 flex-col fixed h-full z-20 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-30 px-4 py-3 flex justify-between items-center shadow-sm">
        <span className="font-bold text-blue-600 text-lg">AlumniConnect</span>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-2 text-slate-600"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-20 pt-16 px-4 md:hidden overflow-y-auto">
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setIsMobileMenuOpen(false);
            }} 
            isMobile={true}
          />
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 p-4 md:p-8 mt-14 md:mt-0 min-h-screen overflow-x-hidden">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 capitalize">
              {getPageTitle()}
            </h1>
            <p className="text-slate-500 text-sm">Welcome back, Student!</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm" 
              />
            </div>
            
            {/* Notification Bell */}
            <button 
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors relative"
              onClick={() => setActiveTab('messages')}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="animate-fade-in pb-10 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;