import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Bookmark, 
  MapPin, 
  DollarSign, 
  Clock,
  ExternalLink,
  Building2,
  ChevronDown,
  ArrowRight,
  Plus,
  X
} from 'lucide-react';

const JobsBoard = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobId, setSelectedJobId] = useState(1);
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    experience: ''
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({ 
    title: '', 
    company: '',
    location: 'Remote', 
    type: 'Full-time',
    salary: '',
    experience: '',
    description: '',
    responsibilities: ['', '', ''],
    requirements: ['', '', '']
  });

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      logoColor: "bg-blue-600",
      location: "Remote",
      type: "Full-time",
      salary: "$80,000 - $100,000",
      posted: "2 days ago",
      applicants: 145,
      experience: "3+ years",
      skills: ["React", "TypeScript", "Redux", "GraphQL"],
      description: "We're looking for an experienced Frontend Developer to join our team. You'll be responsible for building user interfaces and implementing new features.",
      responsibilities: [
        "Develop and maintain high-quality frontend code",
        "Collaborate with designers and product managers",
        "Optimize applications for maximum speed and scalability",
        "Stay up-to-date with emerging technologies"
      ],
      requirements: [
        "3+ years of experience with React",
        "Strong proficiency in JavaScript and TypeScript",
        "Experience with state management (Redux/MobX)",
        "Familiarity with RESTful APIs and GraphQL"
      ]
    }
  ]);

  const selectedJob = jobs.find(job => job.id === selectedJobId) || jobs[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleAddField = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const handleRemoveField = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      id: Date.now(),
      title: formData.title,
      company: formData.company,
      logoColor: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
      location: formData.location,
      type: formData.type,
      salary: formData.salary,
      experience: formData.experience,
      posted: "Just now",
      applicants: 0,
      skills: ["React", "JavaScript"],
      description: formData.description,
      responsibilities: formData.responsibilities.filter(r => r.trim() !== ''),
      requirements: formData.requirements.filter(r => r.trim() !== '')
    };
    
    setJobs(prev => [newJob, ...prev]);
    setShowCreateModal(false);
    setFormData({ 
      title: '', 
      company: '',
      location: 'Remote', 
      type: 'Full-time',
      salary: '',
      experience: '',
      description: '',
      responsibilities: ['', '', ''],
      requirements: ['', '', '']
    });
    setSelectedJobId(newJob.id);
  };

  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filters.type || job.type === filters.type;
    const matchesLocation = !filters.location || job.location === filters.location;
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Board</h1>
            <p className="text-gray-600">Find your next career opportunity</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} />
            Post Job
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Job Listings */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                  >
                    <option value="">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                  >
                    <option value="">All Locations</option>
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-900">Job Listings</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${
                      selectedJobId === job.id ? 'bg-indigo-50' : ''
                    }`}
                    onClick={() => setSelectedJobId(job.id)}
                  >
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center text-white ${job.logoColor}`}>
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{job.title}</h4>
                        <p className="text-sm text-gray-500">{job.company}</p>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {job.location}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveJob(job.id);
                        }}
                        className={`ml-2 p-1 rounded-full ${
                          savedJobs.includes(job.id)
                            ? 'text-yellow-500 hover:text-yellow-600'
                            : 'text-gray-400 hover:text-gray-500'
                        }`}
                      >
                        <Bookmark
                          className={`h-5 w-5 ${
                            savedJobs.includes(job.id) ? 'fill-current' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="lg:col-span-3">
            {selectedJob && (
              <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="px-6 py-5 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                      <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <Building2 className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          {selectedJob.company}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          {selectedJob.location}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          {selectedJob.type}
                        </div>
                        {selectedJob.salary && (
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <DollarSign className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {selectedJob.salary}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="ml-4 mt-2 flex-shrink-0 flex">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Apply Now
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleSaveJob(selectedJob.id)}
                        className="ml-3 p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Bookmark
                          className={`h-5 w-5 ${
                            savedJobs.includes(selectedJob.id) ? 'text-yellow-500 fill-current' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-6">
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-medium text-gray-900">Job Description</h3>
                    <p className="mt-2 text-gray-600">{selectedJob.description}</p>

                    <h3 className="mt-6 text-lg font-medium text-gray-900">Responsibilities</h3>
                    <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-600">
                      {selectedJob.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>

                    <h3 className="mt-6 text-lg font-medium text-gray-900">Requirements</h3>
                    <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-600">
                      {selectedJob.requirements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center text-white ${selectedJob.logoColor}`}>
                          <Building2 className="h-6 w-6" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-medium text-gray-900">{selectedJob.company}</h4>
                          <div className="flex space-x-1">
                            <a
                              href="#"
                              className="text-sm text-indigo-600 hover:text-indigo-500"
                            >
                              View company profile
                            </a>
                            <span className="text-gray-300">|</span>
                            <a
                              href="#"
                              className="text-sm text-indigo-600 hover:text-indigo-500"
                            >
                              View all jobs
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span>Posted {selectedJob.posted}</span>
                      <span className="mx-1">•</span>
                      <span>{selectedJob.applicants} applicants</span>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span>Save</span>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Post Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Post a New Job</h2>
                <p className="text-sm text-gray-500">Fill in the details below to post a new job</p>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Senior Frontend Developer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Company Name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Type *</label>
                  <select
                    name="type"
                    required
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., $80,000 - $100,000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., 3+ years"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Detailed job description..."
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Responsibilities</label>
                  <button
                    type="button"
                    onClick={() => handleAddField('responsibilities')}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    + Add Responsibility
                  </button>
                </div>
                {formData.responsibilities.map((resp, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={resp}
                      onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder={`Responsibility ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField('responsibilities', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Requirements</label>
                  <button
                    type="button"
                    onClick={() => handleAddField('requirements')}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    + Add Requirement
                  </button>
                </div>
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder={`Requirement ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField('requirements', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsBoard;