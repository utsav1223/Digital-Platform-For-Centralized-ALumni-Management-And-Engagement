import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, ArrowRight, Search, Filter, Bookmark, CheckCircle, ExternalLink } from 'lucide-react';

const Internships = () => {
  const [savedInternships, setSavedInternships] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    duration: ''
  });

  const internships = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechCorp",
      location: "Remote",
      duration: "3 months",
      stipend: "$1,500/month",
      deadline: "2024-03-15",
      posted: "2 days ago",
      type: "Full-time",
      skills: ["React", "TypeScript", "CSS", "Redux"],
      description: "Join our team to build cutting-edge web applications using the latest frontend technologies. You'll work closely with our design and backend teams to create seamless user experiences.",
      responsibilities: [
        "Develop new user-facing features using React.js",
        "Build reusable components and front-end libraries",
        "Translate designs into high-quality code",
        "Optimize components for maximum performance"
      ]
    },
    {
      id: 2,
      title: "Backend Engineering Intern",
      company: "DataSystems Inc",
      location: "Bangalore, India",
      duration: "6 months",
      stipend: "₹50,000/month",
      deadline: "2024-04-01",
      posted: "1 week ago",
      type: "Full-time",
      skills: ["Node.js", "Python", "MongoDB", "AWS", "Docker"],
      description: "Work on building scalable backend services and cloud infrastructure. You'll be part of a team responsible for the full software development life cycle.",
      responsibilities: [
        "Design and implement scalable backend services",
        "Optimize database queries and performance",
        "Implement security and data protection measures",
        "Integrate with frontend components"
      ]
    },
    {
      id: 3,
      title: "UI/UX Design Intern",
      company: "DesignHub",
      location: "Remote",
      duration: "3 months",
      stipend: "$1,200/month",
      deadline: "2024-03-30",
      posted: "3 days ago",
      type: "Part-time",
      skills: ["Figma", "UI/UX", "Prototyping", "User Research"],
      description: "Create beautiful and intuitive user interfaces for our products. Work closely with product managers and engineers to implement innovative solutions.",
      responsibilities: [
        "Create user flows, wireframes, and prototypes",
        "Design and refine UI components",
        "Conduct user research and testing",
        "Collaborate with developers to implement designs"
      ]
    },
    {
      id: 4,
      title: "Data Science Intern",
      company: "Analytix Labs",
      location: "Hyderabad, India",
      duration: "4 months",
      stipend: "₹35,000/month",
      deadline: "2024-04-15",
      posted: "5 days ago",
      type: "Full-time",
      skills: ["Python", "Machine Learning", "Pandas", "TensorFlow"],
      description: "Work on real-world data science problems and build machine learning models. You'll analyze large datasets and develop predictive models.",
      responsibilities: [
        "Clean and analyze large datasets",
        "Develop and implement machine learning models",
        "Create data visualizations and reports",
        "Collaborate with cross-functional teams"
      ]
    }
  ];

  const toggleSaveInternship = (id) => {
    setSavedInternships(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.skills.some(skill => 
                           skill.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    
    const matchesFilters = 
      (!filters.type || internship.type === filters.type) &&
      (!filters.location || internship.location.includes(filters.location)) &&
      (!filters.duration || internship.duration === filters.duration);
    
    return matchesSearch && matchesFilters;
  });

  const locationOptions = [...new Set(internships.map(i => i.location))];
  const durationOptions = [...new Set(internships.map(i => i.duration))];
  const typeOptions = [...new Set(internships.map(i => i.type))];

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Available Internships</h1>
          <p className="text-slate-600 mt-1">Find the perfect opportunity to kickstart your career</p>
        </div>
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by role, company, or skills..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Job Type</label>
                <select 
                  className="w-full p-2 border border-slate-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                >
                  <option value="">All Types</option>
                  {typeOptions.map((type, i) => (
                    <option key={i} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <select 
                  className="w-full p-2 border border-slate-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                >
                  <option value="">All Locations</option>
                  {locationOptions.map((location, i) => (
                    <option key={i} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
                <select 
                  className="w-full p-2 border border-slate-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                  value={filters.duration}
                  onChange={(e) => setFilters({...filters, duration: e.target.value})}
                >
                  <option value="">Any Duration</option>
                  {durationOptions.map((duration, i) => (
                    <option key={i} value={duration}>{duration}</option>
                  ))}
                </select>
              </div>
              
              <button 
                className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium mt-2"
                onClick={() => setFilters({ type: '', location: '', duration: '' })}
              >
                Clear all filters
              </button>
            </div>
          </div>
          
          <div className="mt-4 bg-white p-4 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-3">Saved Internships</h3>
            {savedInternships.length > 0 ? (
              <ul className="space-y-2">
                {savedInternships.map(id => {
                  const internship = internships.find(i => i.id === id);
                  return internship ? (
                    <li key={id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded">
                      <span className="text-sm font-medium text-slate-700 truncate">{internship.title}</span>
                      <button 
                        onClick={() => toggleSaveInternship(id)}
                        className="text-amber-500 hover:text-amber-600"
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </li>
                  ) : null;
                })}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">No saved internships yet</p>
            )}
          </div>
        </div>
        
        {/* Internships Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">
              {filteredInternships.length} {filteredInternships.length === 1 ? 'Internship' : 'Internships'} Found
            </h3>
            <div className="flex items-center text-sm text-slate-500">
              <span>Sorted by:</span>
              <select className="ml-2 border-0 bg-transparent font-medium text-blue-600 focus:ring-0 focus:ring-offset-0">
                <option>Most Relevant</option>
                <option>Newest First</option>
                <option>Deadline</option>
              </select>
            </div>
          </div>
          
          {filteredInternships.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {filteredInternships.map((internship) => (
                <div key={internship.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                            <Briefcase className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                              {internship.title}
                            </h3>
                            <p className="text-slate-600">{internship.company}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            internship.type === 'Full-time' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {internship.type}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {internship.posted}
                          </span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => toggleSaveInternship(internship.id)}
                        className={`p-2 rounded-full ${savedInternships.includes(internship.id) ? 'text-amber-500 hover:text-amber-600' : 'text-slate-400 hover:text-slate-600'}`}
                        aria-label={savedInternships.includes(internship.id) ? 'Remove from saved' : 'Save for later'}
                      >
                        <Bookmark 
                          className={`w-5 h-5 ${savedInternships.includes(internship.id) ? 'fill-current' : ''}`} 
                        />
                      </button>
                    </div>
                    
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center text-sm text-slate-600">
                        <MapPin className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" />
                        <span>{internship.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <Clock className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" />
                        <span>{internship.duration} • {internship.stipend}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" />
                        <span>Apply before: {new Date(internship.deadline).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-slate-800 mb-2">Key Responsibilities:</h4>
                      <ul className="space-y-1.5 text-sm text-slate-600">
                        {internship.responsibilities.slice(0, 3).map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span className="flex-1">{item}</span>
                          </li>
                        ))}
                        {internship.responsibilities.length > 3 && (
                          <li className="text-blue-600 text-sm font-medium">+{internship.responsibilities.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-slate-800 mb-2">Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {internship.skills.map((skill, i) => (
                          <span 
                            key={i} 
                            className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                            onClick={() => setSearchTerm(skill)}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-slate-100 bg-slate-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-xs font-medium px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                          {internship.applicants || 'Be among first to apply'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button 
                          className="px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors text-sm flex items-center"
                          onClick={() => {/* View details implementation */}}
                        >
                          View Details
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center">
                          Apply Now <ArrowRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-800 mb-1">No internships found</h3>
              <p className="text-slate-500 mb-4">Try adjusting your search or filter to find what you're looking for.</p>
              <button 
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm"
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ type: '', location: '', duration: '' });
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
          
          {filteredInternships.length > 0 && (
            <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <button className="px-3 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50">
                  Previous
                </button>
                <button className="px-3 py-2 border-t border-b border-slate-300 bg-blue-50 text-sm font-medium text-blue-600">
                  1
                </button>
                <button className="px-3 py-2 border-t border-b border-slate-300 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50">
                  2
                </button>
                <button className="px-3 py-2 border-t border-b border-slate-300 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50">
                  3
                </button>
                <button className="px-3 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50">
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Internships;