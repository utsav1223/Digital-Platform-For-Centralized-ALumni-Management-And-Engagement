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
  // Mock Data for the Dashboard
  const stats = [
    { label: 'Total Alumni', value: '12,450', change: '+12%', trend: 'up', icon: Users, color: 'blue' },
    { label: 'Active Jobs', value: '84', change: '+5 new', trend: 'up', icon: Briefcase, color: 'emerald' },
    { label: 'Upcoming Events', value: '12', change: 'Next: Sat', trend: 'neutral', icon: Calendar, color: 'purple' },
  ];

  const recentActivities = [
    { id: 1, user: 'Sarah Jenkins', action: 'posted a new job', target: 'Senior Product Designer', time: '2h ago', avatar: 'SJ', color: 'bg-orange-100 text-orange-600' },
    { id: 2, user: 'David Kim', action: 'registered for event', target: 'Annual Tech Meetup', time: '4h ago', avatar: 'DK', color: 'bg-blue-100 text-blue-600' },
    { id: 3, user: 'Priya Patel', action: 'updated their profile', target: 'Added generic skills', time: '5h ago', avatar: 'PP', color: 'bg-emerald-100 text-emerald-600' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Alumni Tech Talk', date: 'Aug 24, 2025', time: '10:00 AM', type: 'Virtual' },
    { id: 2, title: 'Campus Reunion', date: 'Sep 05, 2025', time: '02:00 PM', type: 'Main Hall' },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                <stat.icon className="w-6 h-6" />
              </div>
              {stat.trend === 'up' && (
                <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3 mr-1" /> {stat.change}
                </span>
              )}
              {stat.trend === 'neutral' && (
                <span className="flex items-center text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              )}
            </div>
            <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
            <p className="text-slate-500 text-sm font-medium mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Activity Feed & Profile (Takes up 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Profile Completion Widget */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Complete your profile, Rahul!</h3>
                <p className="text-blue-100 text-sm max-w-md">Adding your current work experience helps us recommend better connections and job opportunities.</p>
              </div>
              <button className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors">
                Update Profile
              </button>
            </div>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>

          {/* Recent Activity List */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-lg">Community Activity</h3>
              <button className="text-slate-400 hover:text-blue-600"><MoreHorizontal className="w-5 h-5"/></button>
            </div>
            <div className="divide-y divide-slate-100">
              {recentActivities.map((item) => (
                <div key={item.id} className="p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold ${item.color}`}>
                    {item.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">
                      <span className="font-semibold">{item.user}</span> {item.action} <span className="font-medium text-blue-600">{item.target}</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-100">
              <button className="w-full py-2 text-sm text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-2">
                View All Activity <ArrowRight className="w-4 h-4"/>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Events & Suggestions (Takes up 1 col) */}
        <div className="space-y-6">
          
          {/* Upcoming Events Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
             <div className="p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">Upcoming Events</h3>
            </div>
            <div className="p-5 space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex gap-4 items-center group cursor-pointer">
                  <div className="bg-slate-100 rounded-xl p-3 text-center min-w-[60px] group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <span className="block text-xs font-bold text-slate-500 uppercase">{event.date.split(' ')[0]}</span>
                    <span className="block text-xl font-bold text-slate-800">{event.date.split(' ')[1].replace(',','')}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{event.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{event.time} • {event.type}</p>
                  </div>
                </div>
              ))}
            </div>
             <div className="px-5 pb-5">
              <button className="w-full py-2.5 bg-slate-100 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-200 transition-colors">
                See Calendar
              </button>
            </div>
          </div>

          {/* Quick Mentorship Promo */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white text-center shadow-lg">
             <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <Users className="w-6 h-6 text-white" />
             </div>
             <h3 className="font-bold text-lg mb-2">Find a Mentor</h3>
             <p className="text-slate-400 text-sm mb-4">Connect with alumni who can guide your career path.</p>
             <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors">
               Explore Mentorship
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;