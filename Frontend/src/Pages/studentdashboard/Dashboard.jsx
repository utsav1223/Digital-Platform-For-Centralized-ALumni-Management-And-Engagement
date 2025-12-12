import React from 'react';
import { BookOpen, Calendar, Clock, Users, Briefcase, ArrowRight, BarChart2 } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { 
      label: 'Active Courses', 
      value: '5', 
      change: '2 due soon', 
      trend: 'neutral', 
      icon: BookOpen, 
      color: 'bg-blue-100 text-blue-600' 
    },
    { 
      label: 'Upcoming Deadlines', 
      value: '3', 
      change: 'Next: Tomorrow', 
      trend: 'up', 
      icon: Calendar, 
      color: 'bg-emerald-100 text-emerald-600' 
    },
    { 
      label: 'Alumni Connections', 
      value: '24', 
      change: '+5 this month', 
      trend: 'up', 
      icon: Users, 
      color: 'bg-purple-100 text-purple-600' 
    },
    { 
      label: 'Internship Applications', 
      value: '8', 
      change: '3 in progress', 
      trend: 'neutral', 
      icon: Briefcase, 
      color: 'bg-amber-100 text-amber-600' 
    }
  ];

  const recentActivities = [
    { 
      id: 1, 
      user: 'Dr. Smith', 
      action: 'graded your', 
      target: 'Web Development assignment', 
      score: 'A', 
      time: '3h ago', 
      icon: '🎯',
      color: 'bg-blue-100 text-blue-700' 
    },
    { 
      id: 2, 
      user: 'Career Center', 
      action: 'found', 
      target: '5 new internship matches', 
      time: '1d ago', 
      icon: '💼',
      color: 'bg-emerald-100 text-emerald-700' 
    },
    { 
      id: 3, 
      user: 'Alex Johnson', 
      action: 'accepted your', 
      target: 'mentorship request', 
      time: '2d ago', 
      icon: '🤝',
      color: 'bg-purple-100 text-purple-700' 
    }
  ];

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <h3 className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                stat.trend === 'up' 
                  ? 'bg-green-50 text-green-700' 
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {stat.change}
              </span>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800">Recent Activities</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl mr-3 ${activity.color}`}>
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-800">
                    <span className="font-semibold">{activity.user}</span> {activity.action}{' '}
                    <span className="font-medium">{activity.target}</span>
                    {activity.score && (
                      <span className={`ml-2 px-2 py-0.5 rounded text-xs font-bold ${
                        activity.score === 'A' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {activity.score}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Quick Stats</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Course Progress</span>
                <span className="text-sm font-medium text-blue-600">75%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Internship Applications</span>
                <span className="text-sm font-medium text-emerald-600">8/10</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Alumni Connections</span>
                <span className="text-sm font-medium text-purple-600">24/50</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '48%' }}></div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <button className="w-full py-2.5 text-sm text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg transition-colors">
                View Detailed Analytics <BarChart2 className="inline-block w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;