import React from 'react';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  ArrowRight, 
  Clock,
  MoreHorizontal
} from 'lucide-react';

const Dashboard = () => {
  // 1. FIXED: Pre-defined styling maps to satisfy Tailwind Compiler
  const colorStyles = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600"
  };

  const stats = [
    { label: 'Total Alumni', value: '12,450', change: '+12%', trend: 'up', icon: Users, color: 'blue' },
    { label: 'Active Jobs', value: '84', change: '+5 new', trend: 'up', icon: Briefcase, color: 'emerald' },
    { label: 'Upcoming Events', value: '12', change: 'Next: Sat', trend: 'neutral', icon: Calendar, color: 'purple' },
  ];

  const recentActivities = [
    { id: 1, user: 'Sarah Jenkins', action: 'posted a new job', target: 'Senior Product Designer', time: '2h ago', initial: 'SJ', color: 'bg-orange-100 text-orange-700' },
    { id: 2, user: 'David Kim', action: 'registered for event', target: 'Annual Tech Meetup', time: '4h ago', initial: 'DK', color: 'bg-blue-100 text-blue-700' },
    { id: 3, user: 'Priya Patel', action: 'updated their profile', target: 'Added generic skills', time: '5h ago', initial: 'PP', color: 'bg-emerald-100 text-emerald-700' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Alumni Tech Talk', date: '24', month: 'AUG', time: '10:00 AM', type: 'Virtual' },
    { id: 2, title: 'Campus Reunion', date: '05', month: 'SEP', time: '02:00 PM', type: 'Main Hall' },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              {/* FIXED: Using the lookup object for colors */}
              <div className={`p-3 rounded-xl ${colorStyles[stat.color]}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              
              {stat.trend === 'up' && (
                <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  <TrendingUp className="w-3 h-3 mr-1" /> {stat.change}
                </span>
              )}
              {stat.trend === 'neutral' && (
                <span className="flex items-center text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                  {stat.change}
                </span>
              )}
            </div>
            <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{stat.value}</h3>
            <p className="text-slate-500 text-sm font-medium mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Activity Feed & Profile (Takes up 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Profile Completion Widget */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Welcome back, Rahul! 👋</h3>
                <p className="text-blue-100 text-sm max-w-md opacity-90">
                  Your profile is 80% complete. Add your current work experience to reach All-Star status.
                </p>
              </div>
              <button className="bg-white text-blue-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-sm whitespace-nowrap">
                Complete Profile
              </button>
            </div>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-black/10 rounded-full blur-3xl"></div>
          </div>

          {/* Recent Activity List */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-lg">Community Activity</h3>
              <button className="text-slate-400 hover:text-blue-600 p-1 hover:bg-slate-50 rounded-full transition-colors">
                <MoreHorizontal className="w-5 h-5"/>
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {recentActivities.map((item) => (
                <div key={item.id} className="p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${item.color}`}>
                    {item.initial}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800 leading-snug">
                      <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.user}</span> {item.action} <span className="font-medium text-slate-600">"{item.target}"</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-100">
              <button className="w-full py-2.5 text-sm text-slate-600 font-semibold hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-center gap-2">
                View All Activity <ArrowRight className="w-4 h-4"/>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Events & Suggestions (Takes up 1 col) */}
        <div className="space-y-6">
          
          {/* Upcoming Events Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
             <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Upcoming Events</h3>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">2 New</span>
            </div>
            <div className="p-5 space-y-5">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex gap-4 items-center group cursor-pointer">
                  {/* Clean Date Badge */}
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center min-w-[64px] group-hover:bg-blue-50 group-hover:border-blue-100 transition-all">
                    <span className="block text-xs font-bold text-slate-400 uppercase group-hover:text-blue-400">{event.month}</span>
                    <span className="block text-xl font-bold text-slate-800 group-hover:text-blue-600">{event.date}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors line-clamp-1">{event.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        {event.time}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{event.type}</p>
                  </div>
                </div>
              ))}
            </div>
             <div className="px-5 pb-5">
              <button className="w-full py-2.5 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors">
                View Calendar
              </button>
            </div>
          </div>

          {/* Quick Mentorship Promo */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white text-center shadow-lg relative overflow-hidden group">
             {/* Subtle gradient blob */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all"></div>
             
             <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/10">
                   <Users className="w-6 h-6 text-blue-200" />
                </div>
                <h3 className="font-bold text-lg mb-2">Find a Mentor</h3>
                <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                    Connect with successful alumni who can guide your career path in 1-on-1 sessions.
                </p>
                <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-900/50 hover:shadow-blue-600/20">
                  Explore Mentorship
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;