import React, { useState, useEffect } from 'react';
import { 
  MapPin, Mail, Phone, Linkedin, Github, Globe, Twitter,
  Briefcase, GraduationCap, Award, BookOpen,
  Download, Edit3, Camera, CheckCircle, 
  Plus, Trash2, Save, X, Calendar, UploadCloud, Heart
} from 'lucide-react';

// --- 1. REUSABLE UI COMPONENTS (Fixes Styling Structure) ---

const Label = ({ children }) => (
  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
    {children}
  </label>
);

const Input = ({ className = "", ...props }) => (
  <input 
    className={`w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700 placeholder:text-slate-400 ${className}`}
    {...props}
  />
);

const TextArea = ({ className = "", ...props }) => (
  <textarea 
    className={`w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700 resize-none ${className}`}
    {...props}
  />
);

const Select = ({ children, ...props }) => (
  <div className="relative">
    <select 
      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700 appearance-none"
      {...props}
    >
      {children}
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
    </div>
  </div>
);

const Badge = ({ children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    purple: "bg-purple-50 text-purple-700 border-purple-100",
    gray: "bg-slate-100 text-slate-700 border-slate-200"
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors[color]} mr-2 mb-2 inline-block`}>
      {children}
    </span>
  );
};

// A Wrapper for sections to keep the code clean
const SectionCard = ({ title, children, action }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8">
    {(title || action) && (
      <div className="flex justify-between items-center mb-6 pb-2 border-b border-slate-100">
        {title && <h3 className="text-lg font-bold text-slate-800">{title}</h3>}
        {action}
      </div>
    )}
    {children}
  </div>
);

// --- 2. MAIN COMPONENT ---

const AlumniProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Main State
  const [profile, setProfile] = useState({
    fullName: "Utsav Kumar Jha",
    headline: "Full Stack Developer | MERN Specialist",
    bio: "Passionate developer transforming ideas into digital solutions. Love working with React, Node.js, and helping juniors navigate the tech industry.",
    location: "Deoghar, Jharkhand",
    email: "utsav@example.com",
    phone: "+91 98765 43210",
    gender: "Male",
    profileImage: "https://i.pravatar.cc/300?img=11",
    coverImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1000&q=80",
    college: "Techno India University",
    regNumber: "TIU-2021-0045",
    department: "Computer Science (CSE)",
    batch: "2021 - 2025",
    degree: "B.Tech",
    currentCompany: "TechSolutions Inc.",
    currentPosition: "Software Engineer",
    experienceYears: "2",
    resumeLink: "",
    skills: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "AWS"],
    softSkills: ["Leadership", "Public Speaking", "Mentoring"],
    domains: ["Web Development", "FinTech", "EdTech"],
    isMentor: true,
    mentorshipTopics: ["Frontend Arch", "Interview Prep", "Resume Review"],
    availability: "Weekends",
    isOpenToReferrals: true,
    referralIndustries: "IT Services, Startups",
    linkedin: "linkedin.com/in/utsav",
    github: "github.com/utsav",
    website: "utsav.dev",
    twitter: "twitter.com/utsav",
    achievements: [
      { id: 1, title: "AWS Certified Developer - Associate", year: "2024" },
      { id: 2, title: "Winner - Smart India Hackathon", year: "2023" }
    ],
    workHistory: [
      {
        id: 1,
        company: "TechSolutions Inc.",
        role: "Software Engineer",
        duration: "Jan 2024 - Present",
        description: "Leading the frontend migration to Next.js and optimizing performance by 40%."
      },
      {
        id: 2,
        company: "Startup Hub",
        role: "Frontend Intern",
        duration: "Jun 2023 - Dec 2023",
        description: "Developed reusable UI components using React and Storybook."
      }
    ]
  });

  // Fix: Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (profile.profileImage.startsWith('blob:')) URL.revokeObjectURL(profile.profileImage);
      if (profile.coverImage.startsWith('blob:')) URL.revokeObjectURL(profile.coverImage);
    };
  }, [profile.profileImage, profile.coverImage]);

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, [field]: imageUrl }));
    }
  };

  const handleArrayChange = (e, field) => {
    setProfile(prev => ({ ...prev, [field]: e.target.value.split(',') }));
  };

  const updateNestedItem = (arrayName, index, field, value) => {
    const updatedArray = [...profile[arrayName]];
    updatedArray[index][field] = value;
    setProfile(prev => ({ ...prev, [arrayName]: updatedArray }));
  };

  const addItem = (arrayName, newItem) => {
    setProfile(prev => ({ ...prev, [arrayName]: [newItem, ...prev[arrayName]] }));
  };

  const removeItem = (arrayName, id) => {
    setProfile(prev => ({ ...prev, [arrayName]: prev[arrayName].filter(item => item.id !== id) }));
  };

  const handleSave = () => {
    console.log("Saving Profile Data:", profile);
    setIsEditing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 pb-20">
      
      {/* 3. HERO SECTION (Cover & Profile Pic) */}
      <div className="bg-white shadow-sm relative mb-8">
        <div className="h-48 md:h-72 w-full bg-slate-200 relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>
          <img src={profile.coverImage} alt="Cover" className="w-full h-full object-cover" />
          
          {isEditing ? (
            <label className="absolute bottom-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 backdrop-blur-md transition">
              <Camera size={18} /> <span>Change Cover</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'coverImage')} />
            </label>
          ) : (
            <button 
              onClick={() => setIsEditing(true)} 
              className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white text-slate-900 px-4 py-2 rounded-lg font-bold shadow-lg backdrop-blur-sm transition flex items-center gap-2 text-sm"
            >
              <Edit3 size={16} /> Edit Profile
            </button>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-16 md:-mt-24 mb-6 flex flex-col md:flex-row items-end md:items-end gap-6 z-20">
            <div className="relative group">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
              {isEditing && (
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition duration-200">
                  <UploadCloud size={32} />
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'profileImage')} />
                </label>
              )}
            </div>

            {!isEditing && (
              <div className="flex-1 pb-2 w-full text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">{profile.fullName}</h1>
                <p className="text-lg text-slate-600 font-medium mb-2">{profile.headline}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-y-2 gap-x-4 text-sm text-slate-500">
                   <span className="flex items-center gap-1"><MapPin size={16}/> {profile.location}</span>
                   <span className="flex items-center gap-1"><Briefcase size={16}/> {profile.currentCompany}</span>
                   <span className="flex items-center gap-1"><GraduationCap size={16}/> {profile.batch}</span>
                </div>
              </div>
            )}

            {!isEditing && (
              <div className="flex gap-3 pb-2 w-full md:w-auto justify-center">
                 <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-md transition flex items-center gap-2">
                   <Download size={18} /> Resume
                 </button>
                 <button className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg font-bold hover:bg-slate-50 transition">
                   Contact
                 </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* === VIEW MODE === */}
        {!isEditing ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              
              <SectionCard title="About Me">
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">{profile.bio}</p>
              </SectionCard>

              <SectionCard title="Experience">
                <div className="space-y-8">
                  {profile.workHistory.map((job) => (
                    <div key={job.id} className="relative pl-6 border-l-2 border-slate-200 last:border-0 pb-1">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-500"></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <div>
                          <h4 className="text-lg font-bold text-slate-900">{job.role}</h4>
                          <div className="text-sm font-semibold text-blue-700">{job.company}</div>
                        </div>
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded mt-1 sm:mt-0 w-fit">
                          {job.duration}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">{job.description}</p>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Education">
                <div className="flex gap-4 items-start">
                   <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shrink-0">
                      <BookOpen size={28} />
                   </div>
                   <div>
                     <h4 className="text-lg font-bold text-slate-900">{profile.college}</h4>
                     <p className="text-slate-700 font-medium">{profile.degree} in {profile.department}</p>
                     <p className="text-sm text-slate-500 mt-1">Batch: {profile.batch} • Reg: {profile.regNumber}</p>
                   </div>
                </div>
              </SectionCard>

              <SectionCard title="Achievements">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.achievements.map((ach) => (
                    <li key={ach.id} className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-slate-800 font-medium block">{ach.title}</span>
                        <span className="text-slate-400 text-xs">{ach.year}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            </div>

            {/* Right Column (Sidebar) */}
            <div className="space-y-6">
              <SectionCard title="Connect">
                <div className="space-y-4">
                  <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition text-sm font-medium">
                    <div className="p-2 bg-slate-100 rounded-full"><Mail size={16} /></div> {profile.email}
                  </a>
                  <a href={`tel:${profile.phone}`} className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition text-sm font-medium">
                    <div className="p-2 bg-slate-100 rounded-full"><Phone size={16} /></div> {profile.phone}
                  </a>
                  <hr className="border-slate-100" />
                  <div className="flex gap-2">
                     {profile.linkedin && <a href={`https://${profile.linkedin}`} className="p-2.5 bg-slate-50 rounded-lg text-slate-500 hover:text-white hover:bg-[#0077b5] transition"><Linkedin size={20} /></a>}
                     {profile.github && <a href={`https://${profile.github}`} className="p-2.5 bg-slate-50 rounded-lg text-slate-500 hover:text-white hover:bg-black transition"><Github size={20} /></a>}
                     {profile.twitter && <a href={`https://${profile.twitter}`} className="p-2.5 bg-slate-50 rounded-lg text-slate-500 hover:text-white hover:bg-[#1DA1F2] transition"><Twitter size={20} /></a>}
                     {profile.website && <a href={`https://${profile.website}`} className="p-2.5 bg-slate-50 rounded-lg text-slate-500 hover:text-white hover:bg-blue-600 transition"><Globe size={20} /></a>}
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Skills">
                 <div className="mb-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Technical</h4>
                    <div className="flex flex-wrap gap-1">
                      {profile.skills.map((skill, i) => <Badge key={i} color="blue">{skill}</Badge>)}
                    </div>
                 </div>
                 <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Domains</h4>
                    <div className="flex flex-wrap gap-1">
                      {profile.domains.map((d, i) => <Badge key={i} color="purple">{d}</Badge>)}
                    </div>
                 </div>
              </SectionCard>

              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                 <div className="flex items-center gap-2 mb-4 relative z-10">
                    <Heart className="text-pink-300" size={20} fill="currentColor"/>
                    <h3 className="font-bold text-lg">Community</h3>
                 </div>
                 
                 <div className="space-y-4 relative z-10">
                   {profile.isMentor && (
                     <div className="bg-white/10 p-3 rounded-lg border border-white/10">
                       <p className="text-xs font-bold uppercase text-indigo-200 mb-1">Mentorship Topics</p>
                       <p className="text-sm font-medium">{profile.mentorshipTopics.join(", ")}</p>
                     </div>
                   )}
                   {profile.isOpenToReferrals && (
                     <div className="bg-white/10 p-3 rounded-lg border border-white/10">
                       <p className="text-xs font-bold uppercase text-indigo-200 mb-1">Referrals</p>
                       <p className="text-sm font-medium">{profile.referralIndustries}</p>
                     </div>
                   )}
                 </div>
              </div>
            </div>
          </div>
        ) : (
          /* === EDIT MODE (Refactored for Better Structure) === */
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            
            {/* Toolbar */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200 sticky top-4 z-40">
               <span className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={18}/> Editing Profile</span>
               <div className="flex gap-3">
                 <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition">Cancel</button>
                 <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-md transition flex items-center gap-2">
                   <Save size={18} /> Save
                 </button>
               </div>
            </div>

            <SectionCard title="1. Personal Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><Label>Full Name</Label><Input name="fullName" value={profile.fullName} onChange={handleChange} /></div>
                <div><Label>Headline</Label><Input name="headline" value={profile.headline} onChange={handleChange} /></div>
                <div><Label>Email</Label><Input type="email" name="email" value={profile.email} onChange={handleChange} /></div>
                <div><Label>Phone</Label><Input name="phone" value={profile.phone} onChange={handleChange} /></div>
                <div><Label>Location</Label><Input name="location" value={profile.location} onChange={handleChange} /></div>
                <div>
                  <Label>Gender</Label>
                  <Select name="gender" value={profile.gender} onChange={handleChange}>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label>Bio</Label>
                  <TextArea rows="4" name="bio" value={profile.bio} onChange={handleChange} />
                </div>
              </div>
            </SectionCard>

            <SectionCard title="2. Academic & Professional">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 p-4 bg-slate-50 rounded-lg border border-slate-200">
                   <Label>College (Read-Only)</Label>
                   <div className="text-slate-700 font-medium">{profile.college}</div>
                </div>
                <div><Label>Degree</Label><Input name="degree" value={profile.degree} onChange={handleChange} /></div>
                <div><Label>Department</Label><Input name="department" value={profile.department} onChange={handleChange} /></div>
                <div><Label>Current Company</Label><Input name="currentCompany" value={profile.currentCompany} onChange={handleChange} /></div>
                <div><Label>Current Position</Label><Input name="currentPosition" value={profile.currentPosition} onChange={handleChange} /></div>
              </div>
            </SectionCard>

            <SectionCard 
              title="3. Work History" 
              action={
                <button onClick={() => addItem('workHistory', { id: Date.now(), company: "", role: "", duration: "", description: "" })} className="text-sm bg-blue-50 text-blue-600 font-bold px-3 py-1.5 rounded-lg hover:bg-blue-100 transition flex items-center gap-1">
                  <Plus size={16} /> Add
                </button>
              }
            >
              <div className="space-y-6">
                {profile.workHistory.map((job, index) => (
                  <div key={job.id} className="bg-slate-50 p-5 rounded-xl border border-slate-200 relative group transition hover:shadow-md">
                    <button onClick={() => removeItem('workHistory', job.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 p-1 rounded-full hover:bg-white transition"><Trash2 size={18} /></button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div><Label>Company</Label><Input value={job.company} onChange={(e) => updateNestedItem('workHistory', index, 'company', e.target.value)} className="bg-white" /></div>
                      <div><Label>Role</Label><Input value={job.role} onChange={(e) => updateNestedItem('workHistory', index, 'role', e.target.value)} className="bg-white" /></div>
                      <div className="md:col-span-2"><Label>Description</Label><TextArea rows="2" value={job.description} onChange={(e) => updateNestedItem('workHistory', index, 'description', e.target.value)} className="bg-white" /></div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="4. Skills & Socials">
               <div className="space-y-6">
                 <div>
                   <Label>Technical Skills (Comma Separated)</Label>
                   <Input value={profile.skills.join(",")} onChange={(e) => handleArrayChange(e, 'skills')} />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label>LinkedIn</Label><Input name="linkedin" value={profile.linkedin} onChange={handleChange} /></div>
                    <div><Label>GitHub</Label><Input name="github" value={profile.github} onChange={handleChange} /></div>
                 </div>
               </div>
            </SectionCard>

          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniProfile;