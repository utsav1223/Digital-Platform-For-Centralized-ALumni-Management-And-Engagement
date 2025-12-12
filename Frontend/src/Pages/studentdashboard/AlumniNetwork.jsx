// AlumniNetwork.jsx
import React from 'react';
import { Search, Filter, User, MapPin, Briefcase, Mail, Linkedin } from 'lucide-react';

const AlumniNetwork = () => {
  const alumni = [
    {
      id: 1,
      name: 'Alex Johnson',
      graduationYear: 2020,
      currentRole: 'Senior Software Engineer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      skills: ['React', 'Node.js', 'Cloud Architecture'],
      image: 'AJ'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      graduationYear: 2019,
      currentRole: 'Product Manager',
      company: 'DesignHub',
      location: 'New York, NY',
      skills: ['Product Strategy', 'UX Research', 'Agile'],
      image: 'MG'
    },
    {
      id: 3,
      name: 'Raj Patel',
      graduationYear: 2021,
      currentRole: 'Data Scientist',
      company: 'DataMinds',
      location: 'Austin, TX',
      skills: ['Machine Learning', 'Python', 'Big Data'],
      image: 'RP'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Alumni Network</h1>
          <p className="text-slate-600">Connect with alumni from your institution</p>
        </div>
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search alumni by name, company, or skills..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800">Alumni Directory</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-500">Filter by:</span>
              <select className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Graduation Years</option>
                <option>2020-2024</option>
                <option>2015-2019</option>
                <option>2010-2014</option>
              </select>
              <select className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Locations</option>
                <option>United States</option>
                <option>India</option>
                <option>Europe</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {alumni.map((alum) => (
              <div key={alum.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold">
                    {alum.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-800">{alum.name}</h3>
                    <p className="text-sm text-slate-600">Class of {alum.graduationYear}</p>
                    <div className="mt-2 flex items-center text-sm text-slate-600">
                      <Briefcase className="w-4 h-4 mr-1.5 text-slate-400" />
                      <span className="truncate">{alum.currentRole} at {alum.company}</span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-slate-600">
                      <MapPin className="w-4 h-4 mr-1.5 text-slate-400" />
                      <span>{alum.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {alum.skills.map((skill, i) => (
                      <span 
                        key={i} 
                        className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                    <Mail className="w-4 h-4 mr-1.5" />
                    Message
                  </button>
                  <a 
                    href="#" 
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-4 h-4 mr-1.5" />
                    Connect
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniNetwork;