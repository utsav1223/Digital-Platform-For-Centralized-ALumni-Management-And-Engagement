import React, { useState } from 'react';
import { 
  MapPin, Mail, Phone, Linkedin, Github, Globe, Twitter,
  Briefcase, GraduationCap, Award, BookOpen, User,
  Download, Edit3, Camera, CheckCircle, Lock, 
  Plus, Trash2, Save, X, ExternalLink, Calendar, UploadCloud, Users, Heart
} from 'lucide-react';

const AlumniProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // --- Main State ---
  const [profile, setProfile] = useState({
    // 1. Personal
    fullName: "Utsav Kumar Jha",
    headline: "Full Stack Developer | MERN Specialist",
    bio: "Passionate developer transforming ideas into digital solutions. Love working with React, Node.js, and helping juniors navigate the tech industry.",
    location: "Deoghar, Jharkhand",
    email: "utsav@example.com",
    phone: "+91 98765 43210",
    gender: "Male",
    profileImage: "https://i.pravatar.cc/300?img=11",
    coverImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1000&q=80",
    
    // 2. Academic
    college: "Techno India University",
    regNumber: "TIU-2021-0045",
    department: "Computer Science (CSE)",
    batch: "2021 - 2025",
    degree: "B.Tech",

    // 3. Professional
    currentCompany: "TechSolutions Inc.",
    currentPosition: "Software Engineer",
    experienceYears: "2",
    resumeLink: "#", // Placeholder for PDF link

    // 4. Skills
    skills: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "AWS"],
    softSkills: ["Leadership", "Public Speaking", "Mentoring"],
    domains: ["Web Development", "FinTech", "EdTech"],

    // 5 & 6. Mentorship & Referrals
    isMentor: true,
    mentorshipTopics: ["Frontend Arch", "Interview Prep", "Resume Review"],
    availability: "Weekends",
    isOpenToReferrals: true,
    referralIndustries: "IT Services, Startups",

    // 7. Socials
    linkedin: "linkedin.com/in/utsav",
    github: "github.com/utsav",
    website: "utsav.dev",
    twitter: "twitter.com/utsav",

    // 8. Achievements
    achievements: [
      { id: 1, title: "AWS Certified Developer - Associate", year: "2024" },
      { id: 2, title: "Winner - Smart India Hackathon", year: "2023" }
    ],

    // 9. Work History
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

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Image Upload (Local Preview)
  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, [field]: imageUrl });
    }
  };

  // Handle Comma Separated Arrays (Skills, etc)
  const handleArrayChange = (e, field) => {
    const values = e.target.value.split(',').map(item => item.trim());
    setProfile({ ...profile, [field]: values });
  };

  // Work History Handlers
  const handleWorkHistoryChange = (index, field, value) => {
    const updatedHistory = [...profile.workHistory];
    updatedHistory[index][field] = value;
    setProfile({ ...profile, workHistory: updatedHistory });
  };

  const addWorkExperience = () => {
    const newJob = { id: Date.now(), company: "", role: "", duration: "", description: "" };
    setProfile({ ...profile, workHistory: [newJob, ...profile.workHistory] });
  };

  const removeWorkExperience = (id) => {
    setProfile({ ...profile, workHistory: profile.workHistory.filter(job => job.id !== id) });
  };

  // Achievement Handlers
  const addAchievement = () => {
    setProfile({ ...profile, achievements: [...profile.achievements, { id: Date.now(), title: "", year: "" }] });
  };

  const handleAchievementChange = (index, field, value) => {
    const updated = [...profile.achievements];
    updated[index][field] = value;
    setProfile({ ...profile, achievements: updated });
  };

  const removeAchievement = (id) => {
    setProfile({ ...profile, achievements: profile.achievements.filter(a => a.id !== id) });
  };

  const handleSave = () => {
    // API Call would go here
    console.log("Saving Profile Data:", profile);
    setIsEditing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- UI Components ---
  const Badge = ({ children, color = "blue" }) => {
    const colors = {
      blue: "bg-blue-50 text-blue-700 border-blue-100",
      green: "bg-emerald-50 text-emerald-700 border-emerald-100",
      purple: "bg-purple-50 text-purple-700 border-purple-100",
      gray: "bg-slate-100 text-slate-700 border-slate-200"
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors[color]} mr-2 mb-2 inline-block`}>
        {children}
      </span>
    );
  };

  // ==========================================
  // VIEW MODE
  // ==========================================
  if (!isEditing) {
    return (
      <div className="bg-slate-50 min-h-screen font-sans text-slate-900 pb-12">
        {/* Header / Cover Area */}
        <div className="bg-white shadow-sm pb-1 mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="h-48 md:h-64 w-full bg-slate-200 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
              <img src={profile.coverImage} alt="Cover" className="w-full h-full object-cover" />
              {/* Edit Button Positioned on Cover */}
              <button 
                onClick={() => setIsEditing(true)} 
                className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white text-slate-800 px-4 py-2 rounded-lg font-medium shadow-lg backdrop-blur-sm transition flex items-center gap-2 text-sm"
              >
                <Edit3 size={16} /> Edit Profile
              </button>
            </div>
            
            <div className="px-4 sm:px-6 lg:px-8 relative z-20 -mt-16 md:-mt-20 flex flex-col md:flex-row items-start gap-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                 <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                   <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
                 </div>
              </div>

              {/* Header Info */}
              <div className="flex-1 pt-2 md:pt-20 pb-4">
                <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">{profile.fullName}</h1>
                <p className="text-lg text-slate-600 font-medium mt-1">{profile.headline}</p>
                
                <div className="flex flex-wrap gap-y-2 gap-x-4 mt-3 text-sm text-slate-500">
                   <span className="flex items-center gap-1.5"><MapPin size={16}/> {profile.location}</span>
                   <span className="flex items-center gap-1.5"><Briefcase size={16}/> {profile.currentPosition} at {profile.currentCompany}</span>
                   <span className="flex items-center gap-1.5"><GraduationCap size={16}/> {profile.batch}</span>
                </div>
              </div>

              {/* Action Buttons (Resume / Contact) */}
              <div className="mt-4 md:mt-20 flex gap-3">
                 <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-sm transition flex items-center gap-2">
                   <Download size={18} /> Resume
                 </button>
                 <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition">
                   Contact
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN (Main Content) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">About Me</h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">{profile.bio}</p>
            </section>

            {/* Work History */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Briefcase size={20} className="text-blue-600"/> Experience
              </h3>
              <div className="space-y-8">
                {profile.workHistory.map((job) => (
                  <div key={job.id} className="relative pl-6 border-l-2 border-slate-200 last:border-0">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-500"></div>
                    <h4 className="text-lg font-bold text-slate-900">{job.role}</h4>
                    <div className="text-sm font-semibold text-blue-700 mb-1">{job.company}</div>
                    <div className="text-xs text-slate-500 mb-3 flex items-center gap-1"><Calendar size={12}/> {job.duration}</div>
                    <p className="text-slate-600 text-sm">{job.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <GraduationCap size={20} className="text-blue-600"/> Education
              </h3>
              <div className="flex gap-4 items-start">
                 <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                    <BookOpen size={24} />
                 </div>
                 <div>
                    <h4 className="text-lg font-bold text-slate-900">{profile.college}</h4>
                    <p className="text-slate-700 font-medium">{profile.degree} in {profile.department}</p>
                    <p className="text-sm text-slate-500 mt-1">Batch: {profile.batch} • Reg: {profile.regNumber}</p>
                 </div>
              </div>
            </section>

             {/* Achievements */}
             <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Award size={20} className="text-orange-500"/> Achievements & Certifications
              </h3>
              <ul className="space-y-3">
                {profile.achievements.map((ach) => (
                  <li key={ach.id} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-800 font-medium">{ach.title}</span>
                      <span className="text-slate-400 text-sm ml-2">({ach.year})</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* RIGHT COLUMN (Sidebar) */}
          <div className="space-y-6">
            
            {/* Contact & Socials */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
               <h3 className="font-bold text-slate-800 mb-4">Connect</h3>
               <div className="space-y-3">
                 <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition text-sm">
                   <Mail size={18} /> {profile.email}
                 </a>
                 <div className="flex items-center gap-3 text-slate-600 text-sm">
                   <Phone size={18} /> {profile.phone}
                 </div>
                 <hr className="my-3 border-slate-100" />
                 <div className="flex gap-4">
                    {profile.linkedin && <a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#0077b5]"><Linkedin size={22} /></a>}
                    {profile.github && <a href={`https://${profile.github}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-black"><Github size={22} /></a>}
                    {profile.twitter && <a href={`https://${profile.twitter}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#1DA1F2]"><Twitter size={22} /></a>}
                    {profile.website && <a href={`https://${profile.website}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600"><Globe size={22} /></a>}
                 </div>
               </div>
            </section>

            {/* Skills */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
               <h3 className="font-bold text-slate-800 mb-4">Technical Skills</h3>
               <div className="flex flex-wrap">
                  {profile.skills.map((skill, i) => <Badge key={i} color="blue">{skill}</Badge>)}
               </div>
               
               <h3 className="font-bold text-slate-800 mt-6 mb-4">Domains</h3>
               <div className="flex flex-wrap">
                  {profile.domains.map((d, i) => <Badge key={i} color="purple">{d}</Badge>)}
               </div>
            </section>

            {/* Mentorship & Referrals */}
            <section className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl shadow-md p-6 text-white">
               <div className="flex items-center gap-2 mb-4">
                  <Heart className="text-pink-300" size={20} fill="currentColor"/>
                  <h3 className="font-bold text-lg">Community</h3>
               </div>
               
               {profile.isMentor && (
                 <div className="mb-4">
                   <p className="text-xs font-bold uppercase text-indigo-200 mb-1">Open to Mentorship</p>
                   <p className="text-sm font-medium">Topics: {profile.mentorshipTopics.join(", ")}</p>
                 </div>
               )}

               {profile.isOpenToReferrals && (
                 <div>
                   <p className="text-xs font-bold uppercase text-indigo-200 mb-1">Referrals Available</p>
                   <p className="text-sm font-medium">Industries: {profile.referralIndustries}</p>
                 </div>
               )}
            </section>

          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // EDIT MODE
  // ==========================================
  return (
    <div className="bg-slate-100 min-h-screen pb-20">
      
      {/* Sticky Toolbar */}
      <div className="sticky top-0 z-50 bg-white shadow-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Edit3 size={18} className="text-blue-600"/> Edit Profile
          </h2>
          <div className="flex gap-3">
            <button onClick={() => setIsEditing(false)} className="text-slate-500 hover:text-slate-800 px-3 py-2 text-sm font-medium transition">Cancel</button>
            <button onClick={handleSave} className="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 shadow-sm transition flex items-center gap-2">
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 space-y-8">
        
        {/* Images */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group">
            <div className="relative h-48 bg-slate-200">
                <img src={profile.coverImage} alt="Cover Preview" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition"></div>
                <label className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white text-sm px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 backdrop-blur-sm transition">
                    <Camera size={18} /> <span>Change Cover</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'coverImage')} />
                </label>

                <div className="absolute -bottom-12 left-8">
                    <div className="relative h-32 w-32 rounded-full border-4 border-white bg-white shadow-md">
                        <img src={profile.profileImage} alt="Profile" className="h-full w-full object-cover rounded-full" />
                        <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 hover:opacity-100 cursor-pointer transition duration-200">
                             <UploadCloud size={24} />
                             <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'profileImage')} />
                        </label>
                    </div>
                </div>
            </div>
            <div className="h-16"></div>
        </div>

        {/* 1. Personal Info */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
           <h3 className="text-lg font-bold text-slate-800 mb-6 pb-2 border-b border-slate-100">1. Personal Information</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
               <label className="label">Full Name</label>
               <input type="text" name="fullName" value={profile.fullName} onChange={handleChange} className="input-field" />
             </div>
             <div>
               <label className="label">Headline (Job Title | Expertise)</label>
               <input type="text" name="headline" value={profile.headline} onChange={handleChange} className="input-field" />
             </div>
             <div>
               <label className="label">Email</label>
               <input type="email" name="email" value={profile.email} onChange={handleChange} className="input-field" />
             </div>
             <div>
               <label className="label">Phone Number</label>
               <input type="text" name="phone" value={profile.phone} onChange={handleChange} className="input-field" />
             </div>
             <div>
               <label className="label">Location (City, Country)</label>
               <input type="text" name="location" value={profile.location} onChange={handleChange} className="input-field" />
             </div>
             <div>
               <label className="label">Gender</label>
               <select name="gender" value={profile.gender} onChange={handleChange} className="input-field">
                 <option>Male</option>
                 <option>Female</option>
                 <option>Other</option>
                 <option>Prefer not to say</option>
               </select>
             </div>
             <div className="md:col-span-2">
               <label className="label">Bio / About Me</label>
               <textarea rows="4" name="bio" value={profile.bio} onChange={handleChange} className="input-field resize-none"></textarea>
             </div>
           </div>
        </div>

        {/* 2. Academic Info */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
           <h3 className="text-lg font-bold text-slate-800 mb-6 pb-2 border-b border-slate-100">2. Academic Information</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="md:col-span-2">
               <label className="label">College / University</label>
               <input type="text" name="college" value={profile.college} onChange={handleChange} className="input-field bg-slate-50" readOnly />
               <p className="text-xs text-slate-400 mt-1">*Verified by Admin</p>
             </div>
             <div>
               <label className="label">Registration Number</label>
               <input type="text" name="regNumber" value={profile.regNumber} onChange={handleChange} className="input-field" />
             </div>
             <div>
               <label className="label">Degree</label>
               <input type="text" name="degree" value={profile.degree} onChange={handleChange} className="input-field" />
             </div>
             <div>
               <label className="label">Department</label>
               <input type="text" name="department" value={profile.department} onChange={handleChange} className="input-field" />
             </div>
             <div>
               <label className="label">Batch (Start - End)</label>
               <input type="text" name="batch" value={profile.batch} onChange={handleChange} className="input-field" />
             </div>
           </div>
        </div>

        {/* 3. Professional Info */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
           <h3 className="text-lg font-bold text-slate-800 mb-6 pb-2 border-b border-slate-100">3. Professional Information</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
               <label className="label">Current Company</label>
               <input type="text" name="currentCompany" value={profile.currentCompany} onChange={handleChange} className="input-field" />
             </div>
             <div>
               <label className="label">Current Position</label>
               <input type="text" name="currentPosition" value={profile.currentPosition} onChange={handleChange} className="input-field" />
             </div>
             <div>
               <label className="label">Years of Experience</label>
               <input type="text" name="experienceYears" value={profile.experienceYears} onChange={handleChange} className="input-field" />
             </div>
             <div>
               <label className="label">Resume Link (PDF)</label>
               <input type="text" name="resumeLink" value={profile.resumeLink} onChange={handleChange} className="input-field" placeholder="Google Drive / Dropbox Link" />
             </div>
           </div>
        </div>

        {/* 4. Skills */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
           <h3 className="text-lg font-bold text-slate-800 mb-6 pb-2 border-b border-slate-100">4. Skills & Expertise</h3>
           <div className="space-y-4">
             <div>
                <label className="label">Technical Skills (Comma separated)</label>
                <input type="text" value={profile.skills.join(", ")} onChange={(e) => handleArrayChange(e, 'skills')} className="input-field" placeholder="React, Node.js, Python..." />
             </div>
             <div>
                <label className="label">Soft Skills (Comma separated)</label>
                <input type="text" value={profile.softSkills.join(", ")} onChange={(e) => handleArrayChange(e, 'softSkills')} className="input-field" />
             </div>
             <div>
                <label className="label">Domains / Industries (Comma separated)</label>
                <input type="text" value={profile.domains.join(", ")} onChange={(e) => handleArrayChange(e, 'domains')} className="input-field" placeholder="FinTech, HealthTech, AI..." />
             </div>
           </div>
        </div>

        {/* 5 & 6. Mentorship & Referrals */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
           <h3 className="text-lg font-bold text-slate-800 mb-6 pb-2 border-b border-slate-100">5. Community Engagement</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mentorship */}
              <div className="space-y-4">
                 <div className="flex items-center gap-3 mb-2">
                    <input type="checkbox" name="isMentor" checked={profile.isMentor} onChange={handleChange} className="w-5 h-5 text-blue-600 rounded" />
                    <span className="font-bold text-slate-700">Open to Mentoring Students?</span>
                 </div>
                 {profile.isMentor && (
                    <>
                       <div>
                          <label className="label">Topics (Comma separated)</label>
                          <input type="text" value={profile.mentorshipTopics.join(", ")} onChange={(e) => handleArrayChange(e, 'mentorshipTopics')} className="input-field" />
                       </div>
                       <div>
                          <label className="label">Availability</label>
                          <input type="text" name="availability" value={profile.availability} onChange={handleChange} className="input-field" placeholder="e.g. Weekends 6-8 PM" />
                       </div>
                    </>
                 )}
              </div>

              {/* Referrals */}
              <div className="space-y-4">
                 <div className="flex items-center gap-3 mb-2">
                    <input type="checkbox" name="isOpenToReferrals" checked={profile.isOpenToReferrals} onChange={handleChange} className="w-5 h-5 text-blue-600 rounded" />
                    <span className="font-bold text-slate-700">Open to Giving Referrals?</span>
                 </div>
                 {profile.isOpenToReferrals && (
                    <div>
                       <label className="label">Preferred Industries</label>
                       <input type="text" name="referralIndustries" value={profile.referralIndustries} onChange={handleChange} className="input-field" />
                    </div>
                 )}
              </div>
           </div>
        </div>

        {/* 7. Socials */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
           <h3 className="text-lg font-bold text-slate-800 mb-6 pb-2 border-b border-slate-100">6. Social Links</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                 <Linkedin size={18} className="absolute top-3 left-3 text-slate-400"/>
                 <input type="text" name="linkedin" value={profile.linkedin} onChange={handleChange} className="pl-10 input-field" placeholder="linkedin.com/in/..." />
              </div>
              <div className="relative">
                 <Github size={18} className="absolute top-3 left-3 text-slate-400"/>
                 <input type="text" name="github" value={profile.github} onChange={handleChange} className="pl-10 input-field" placeholder="github.com/..." />
              </div>
              <div className="relative">
                 <Twitter size={18} className="absolute top-3 left-3 text-slate-400"/>
                 <input type="text" name="twitter" value={profile.twitter} onChange={handleChange} className="pl-10 input-field" placeholder="twitter.com/..." />
              </div>
              <div className="relative">
                 <Globe size={18} className="absolute top-3 left-3 text-slate-400"/>
                 <input type="text" name="website" value={profile.website} onChange={handleChange} className="pl-10 input-field" placeholder="yourportfolio.com" />
              </div>
           </div>
        </div>

        {/* 8. Work History */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
           <div className="flex justify-between items-center mb-6 pb-2 border-b border-slate-100">
             <h3 className="text-lg font-bold text-slate-800">7. Work History</h3>
             <button onClick={addWorkExperience} className="text-sm bg-blue-50 text-blue-600 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-blue-100 transition">
               <Plus size={16} /> Add Role
             </button>
           </div>
           
           <div className="space-y-6">
             {profile.workHistory.map((job, index) => (
               <div key={job.id} className="bg-slate-50 p-5 rounded-xl border border-slate-200 relative group">
                 <button onClick={() => removeWorkExperience(job.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 p-1 hover:bg-red-50 rounded-full transition"><Trash2 size={18} /></button>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                   <div>
                     <label className="label">Company Name</label>
                     <input type="text" value={job.company} onChange={(e) => handleWorkHistoryChange(index, 'company', e.target.value)} className="input-field bg-white" />
                   </div>
                   <div>
                     <label className="label">Role</label>
                     <input type="text" value={job.role} onChange={(e) => handleWorkHistoryChange(index, 'role', e.target.value)} className="input-field bg-white" />
                   </div>
                   <div>
                     <label className="label">Duration</label>
                     <input type="text" value={job.duration} onChange={(e) => handleWorkHistoryChange(index, 'duration', e.target.value)} className="input-field bg-white" placeholder="e.g. Jan 2023 - Present" />
                   </div>
                   <div className="md:col-span-2">
                     <label className="label">Description</label>
                     <textarea rows="2" value={job.description} onChange={(e) => handleWorkHistoryChange(index, 'description', e.target.value)} className="input-field bg-white resize-none" />
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* 9. Achievements */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
           <div className="flex justify-between items-center mb-6 pb-2 border-b border-slate-100">
             <h3 className="text-lg font-bold text-slate-800">8. Achievements</h3>
             <button onClick={addAchievement} className="text-sm bg-blue-50 text-blue-600 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-blue-100 transition">
               <Plus size={16} /> Add
             </button>
           </div>
           
           <div className="space-y-4">
             {profile.achievements.map((ach, index) => (
               <div key={ach.id} className="flex gap-4 items-start">
                 <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <input type="text" value={ach.title} onChange={(e) => handleAchievementChange(index, 'title', e.target.value)} className="input-field" placeholder="Achievement Title" />
                    </div>
                    <div>
                        <input type="text" value={ach.year} onChange={(e) => handleAchievementChange(index, 'year', e.target.value)} className="input-field" placeholder="Year" />
                    </div>
                 </div>
                 <button onClick={() => removeAchievement(ach.id)} className="text-slate-400 hover:text-red-500 mt-2"><Trash2 size={18} /></button>
               </div>
             ))}
           </div>
        </div>

      </div>
      
      {/* Styles for reuse */}
      <style>{`
        .label { display: block; font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 0.5rem; }
        .input-field { width: 100%; padding: 0.625rem 1rem; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.5rem; outline: none; transition: all 0.2s; }
        .input-field:focus { background-color: #fff; box-shadow: 0 0 0 2px #3b82f6; border-color: transparent; }
      `}</style>
    </div>
  );
};

export default AlumniProfile;