import React, { useState } from 'react';
import { 
  Briefcase, Clock, Search, Bookmark, 
  MoreHorizontal, Share2, Building2, Globe, Users, CheckCircle, 
  Linkedin, ArrowRight 
} from 'lucide-react';

const Internships = () => {
  const [savedInternships, setSavedInternships] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobId, setSelectedJobId] = useState(1);
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
      logoColor: "bg-blue-600",
      location: "Remote",
      duration: "3 months",
      stipend: "$1,500/month",
      deadline: "2024-03-15",
      posted: "2 days ago",
      applicants: 145,
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
      logoColor: "bg-emerald-600",
      location: "Bangalore, India",
      duration: "6 months",
      stipend: "₹50,000/month",
      deadline: "2024-04-01",
      posted: "1 week ago",
      applicants: 89,
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
      logoColor: "bg-purple-600",
      location: "Remote",
      duration: "3 months",
      stipend: "$1,200/month",
      deadline: "2024-03-30",
      posted: "3 days ago",
      applicants: 210,
      type: "Internship", // Updated this for testing
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
      logoColor: "bg-orange-600",
      location: "Hyderabad, India",
      duration: "4 months",
      stipend: "₹35,000/month",
      deadline: "2024-04-15",
      posted: "5 days ago",
      applicants: 56,
      type: "Part-time",
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

  const toggleSaveInternship = (e, id) => {
    e.stopPropagation();
    setSavedInternships(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilters = (!filters.type || internship.type === filters.type) &&
                           (!filters.location || internship.location.includes(filters.location)) &&
                           (!filters.duration || internship.duration === filters.duration);
    return matchesSearch && matchesFilters;
  });

  const selectedJob = internships.find(i => i.id === selectedJobId) || filteredInternships[0];
  const getInitials = (name) => name.substring(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-[#f3f2ef] font-sans">
      {/* Top Navigation Bar / Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto flex-1">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search by title, skill, or company"
                className="w-full pl-10 pr-4 py-2 bg-[#eef3f8] border-none rounded-md text-sm focus:ring-2 focus:ring-[#0a66c2] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter Pills - Updated with Internship Option */}
            <div className="hidden md:flex items-center gap-2">
              <select 
                className="px-4 py-1.5 rounded-full border border-gray-400 text-gray-600 text-sm hover:bg-gray-100 hover:border-gray-600 bg-transparent cursor-pointer transition-colors"
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                value={filters.type}
              >
                <option value="">Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
              
              <select 
                className="px-4 py-1.5 rounded-full border border-gray-400 text-gray-600 text-sm hover:bg-gray-100 hover:border-gray-600 bg-transparent cursor-pointer transition-colors"
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                value={filters.location}
              >
                <option value="">Location</option>
                <option value="Remote">Remote</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
              
              <button 
                className="px-4 py-1.5 rounded-full border border-gray-400 text-gray-600 text-sm hover:bg-gray-100 font-medium"
                onClick={() => setFilters({ type: '', location: '', duration: '' })}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-6 px-0 md:px-4 grid grid-cols-12 gap-6">
        
        {/* Left Column: Job List */}
        <div className="col-span-12 lg:col-span-5 flex flex-col h-[calc(100vh-140px)]">
          <div className="bg-white rounded-t-xl border border-gray-200 p-4 border-b">
            <h2 className="font-semibold text-lg text-gray-800">
              Top job picks for you
            </h2>
            <p className="text-sm text-gray-500 mt-1">Based on your profile and search history</p>
          </div>
          
          <div className="bg-white border-l border-r border-b border-gray-200 rounded-b-xl overflow-y-auto custom-scrollbar flex-1">
            {filteredInternships.length > 0 ? (
              filteredInternships.map((job) => (
                <div 
                  key={job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 relative group ${
                    selectedJobId === job.id ? 'bg-[#eef3f8] border-l-[3px] border-l-[#0a66c2]' : 'border-l-[3px] border-l-transparent'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 flex-shrink-0 ${job.logoColor} text-white flex items-center justify-center font-bold text-lg rounded-sm`}>
                      {getInitials(job.company)}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-base leading-5 mb-1 ${selectedJobId === job.id ? 'text-[#0a66c2]' : 'text-gray-900'} group-hover:underline decoration-[#0a66c2]`}>
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-900 mb-1">{job.company}</p>
                      <p className="text-sm text-gray-500 mb-2">
                        {job.location} ({job.type})
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                        {job.applicants > 100 && (
                          <span className="text-green-700 font-medium flex items-center gap-1">
                            <Users className="w-3 h-3" /> Actively recruiting
                          </span>
                        )}
                        <span>• {job.posted}</span>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => toggleSaveInternship(e, job.id)}
                      className="text-gray-500 hover:text-gray-800 h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <Bookmark className={`w-5 h-5 ${savedInternships.includes(job.id) ? 'fill-gray-800 text-gray-800' : ''}`} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <Search className="w-10 h-10 mx-auto mb-3 opacity-20" />
                <p>No jobs found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Job Details (Sticky) */}
        <div className="hidden lg:col-span-7 lg:block h-[calc(100vh-140px)] sticky top-24">
          {selectedJob ? (
            <div className="bg-white rounded-xl border border-gray-200 h-full flex flex-col overflow-hidden">
              {/* Job Header */}
              <div className="p-6 border-b border-gray-100 shadow-sm z-10 bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <div className={`w-16 h-16 ${selectedJob.logoColor} text-white flex items-center justify-center font-bold text-2xl rounded mb-4`}>
                      {getInitials(selectedJob.company)}
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">{selectedJob.title}</h1>
                    <div className="text-sm text-gray-600 mb-4">
                      <span className="font-medium text-gray-900 hover:underline cursor-pointer">{selectedJob.company}</span>
                      <span className="mx-1">•</span> 
                      {selectedJob.location} 
                      <span className="mx-1">•</span> 
                      {selectedJob.posted} 
                      <span className="mx-1">•</span> 
                      <span className="text-[#0a66c2] font-medium">{selectedJob.applicants} applicants</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 mt-2">
                  <button className="bg-[#0a66c2] hover:bg-[#004182] text-white px-6 py-1.5 rounded-full font-semibold transition-colors flex items-center gap-2 text-sm">
                    Apply <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => toggleSaveInternship(e, selectedJob.id)}
                    className={`px-6 py-1.5 rounded-full font-semibold border transition-colors text-sm ${
                      savedInternships.includes(selectedJob.id)
                      ? 'border-[#0a66c2] text-[#0a66c2] bg-blue-50'
                      : 'border-[#0a66c2] text-[#0a66c2] hover:bg-blue-50'
                    }`}
                  >
                    {savedInternships.includes(selectedJob.id) ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>

              {/* Job Content Scrollable Area */}
              <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
                
                {/* Job Highlights Card */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100">
                   <h3 className="font-semibold text-gray-900 mb-3 text-sm">Job Details</h3>
                   <div className="grid grid-cols-2 gap-y-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-700">
                         <Briefcase className="w-4 h-4 text-gray-500" />
                         <span>{selectedJob.type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                         <Building2 className="w-4 h-4 text-gray-500" />
                         <span>11-50 Employees</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                         <Clock className="w-4 h-4 text-gray-500" />
                         <span>{selectedJob.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                         <CheckCircle className="w-4 h-4 text-gray-500" />
                         <span>{selectedJob.stipend}</span>
                      </div>
                   </div>
                </div>

                {/* About Section */}
                <section className="mb-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-3">About the job</h2>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    {selectedJob.description}
                  </p>
                  
                  <h3 className="font-semibold text-sm text-gray-900 mb-2">Key Responsibilities:</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mb-4">
                    {selectedJob.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>

                  <h3 className="font-semibold text-sm text-gray-900 mb-2">Skills you'll gain:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-200 cursor-pointer">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                {/* About Company */}
                <section className="border-t border-gray-200 pt-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">About the company</h2>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${selectedJob.logoColor} text-white flex items-center justify-center font-bold text-lg rounded-sm`}>
                       {getInitials(selectedJob.company)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedJob.company}</h3>
                      <p className="text-sm text-gray-500 mb-2">Information Technology & Services</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1 hover:text-[#0a66c2] cursor-pointer">
                           <Globe className="w-4 h-4" /> Website
                        </span>
                        <span className="flex items-center gap-1 hover:text-[#0a66c2] cursor-pointer">
                           <Linkedin className="w-4 h-4" /> Company Page
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 bg-white rounded-xl border border-gray-200">
              Select a job to view details
            </div>
          )}
        </div>
      </main>
      
      {/* Mobile only hint */}
      <div className="lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm shadow-lg z-50">
        Use Desktop for Split View
      </div>
    </div>
  );
};

export default Internships;