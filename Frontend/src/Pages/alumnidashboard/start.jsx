import React, { useState } from 'react';
import { Menu, X, Bell, Search } from 'lucide-react';
import Sidebar from './Sidebar.jsx';
import Jobs from './Jobs.jsx';
// Ensure the filename matches exactly what you saved (e.g. CommunityFeed.jsx)
import CommunityFeed from './Communityfeed.jsx'; 
import EventsSection from './Eventssection.jsx';
import MentorshipPage from './Mentorship.jsx';
import AlumniProfile from './Alumniprofile.jsx';
import Dashboard from './Dashboard.jsx';
// --- Placeholder Components for other tabs ---
const Placeholder = ({ title }) => (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6 bg-white rounded-2xl border border-dashed border-slate-200">
        <div className="bg-slate-50 p-4 rounded-full mb-4"><span className="text-4xl">🚧</span></div>
        <h2 className="text-xl font-bold text-slate-700">{title} Module</h2>
        <p className="text-slate-500">This section is currently under development.</p>
    </div>
);

export default function AlumniDashboard() {
  // You can change "jobs" to "feed" if you want the feed to open by default
  const [activeTab, setActiveTab] = useState("jobs"); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Map tabs to components
  const renderContent = () => {
    switch (activeTab) {
      case 'jobs': return <Jobs />;
      case 'dashboard': return <Dashboard />;
      case 'directory': return <Placeholder title="Alumni Directory" />;
      
      // ✅ CHANGE MADE HERE: Connected the actual Component instead of Placeholder
      case 'feed': return <CommunityFeed />;
      
      case 'events': return <EventsSection/>;
      case 'mentorship': return <MentorshipPage/>;
      case 'profile': return <AlumniProfile/>;
      default: return <Jobs />;
    }
  };

  // Helper to get a nice title for the header
  const getPageTitle = () => {
    if (activeTab === 'jobs') return 'Career Opportunities';
    if (activeTab === 'feed') return 'Community Feed';
    return activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 flex">
      
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden md:flex w-72 bg-white border-r border-slate-200 flex-col fixed h-full z-20 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </aside>

      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-30 px-4 py-3 flex justify-between items-center shadow-sm">
        <span className="font-bold text-blue-600 text-lg">AlumniConnect</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
            {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-20 pt-16 px-4 md:hidden overflow-y-auto">
           <Sidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                isMobile={true} 
                closeMobileMenu={() => setIsMobileMenuOpen(false)} 
            />
        </div>
      )}

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 md:ml-72 p-4 md:p-8 mt-14 md:mt-0 min-h-screen overflow-x-hidden">
        
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
                {/* Updated Title Logic */}
                <h1 className="text-2xl font-bold text-slate-800 capitalize">
                    {getPageTitle()}
                </h1>
                <p className="text-slate-500 text-sm">Welcome back, Rahul!</p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Quick search..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm" />
                </div>
                <button className="p-2 bg-white rounded-xl text-slate-500 border border-slate-200 hover:bg-slate-50 shadow-sm relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
            </div>
        </div>

        {/* Content Render */}
        <div className="animate-fade-in pb-10 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}