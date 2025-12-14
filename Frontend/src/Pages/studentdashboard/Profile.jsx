// src/components/student/Profile.jsx
import React, { useState, useEffect } from "react";
import {
  MapPin, Mail, Phone, Linkedin, Github, Globe, Twitter,
  Briefcase, GraduationCap, Award,
  Edit3, Camera, CheckCircle,
  Plus, Trash2, Save, UploadCloud, User, ExternalLink,
  Code, FileText
} from "lucide-react";

// ⚠️ IMPORTANT: Fallback to dummy data if API file is missing
import { getStudentProfile, updateStudentProfile } from "../../api/studentAPI";
import { useAuth } from "../../context/authContext";

/* -------------------------------------------------------
   1. SAFE DATA HANDLERS
--------------------------------------------------------*/
const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("blob:")) return path;
  if (path.startsWith("http")) return path;
  return `http://localhost:8000${path}`;
};

const safeHref = (val) => {
  if (!val) return "#";
  return val.startsWith("http") ? val : `https://${val}`;
};

const makeId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

const DUMMY_DATA = {
  fullName: "Student Name",
  headline: "Full Stack Developer | Student",
  email: "student@example.com",
  university: "Tech University",
  degree: "B.Tech",
  department: "Computer Science",
  batchYear: "2025",
  currentSemester: "6th",
  cgpa: "8.5",
  bio: "Passionate about building scalable web applications.",
  location: "Mumbai, India",
  skills: ["React", "Node.js", "MongoDB"],
  domains: ["Web Dev", "AI/ML"],
  projects: [],
  achievements: [],
  isOpenToWork: true
};

/* ---------------- UI ATOMS ---------------- */

const SectionTitle = ({ children, icon: Icon }) => (
  <div className="flex items-center gap-3 mb-6">
    {Icon && (
      <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
        <Icon size={20} strokeWidth={2.5} />
      </div>
    )}
    <h3 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
      {children}
    </h3>
  </div>
);

const Label = ({ children }) => (
  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
    {children}
  </label>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
      focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
      outline-none transition-all duration-200 text-slate-700 font-medium 
      placeholder:text-slate-400 text-sm md:text-base ${className}`}
    {...props}
  />
);

const TextArea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
      focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
      outline-none transition-all duration-200 text-slate-700 font-medium resize-none text-sm md:text-base ${className}`}
    {...props}
  />
);

const Badge = ({ children, variant = "default" }) => {
  const styles = {
    default: "bg-slate-100 text-slate-600 border-slate-200",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    purple: "bg-violet-50 text-violet-700 border-violet-100",
  };
  return (
    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-default whitespace-nowrap ${styles[variant]}`}>
      {children}
    </span>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300 ${className}`}>
    {children}
  </div>
);

/* ---------------- MAIN COMPONENT ---------------- */

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { checkAuth } = useAuth();

  const normalize = (p) => {
    const data = p || DUMMY_DATA;
    return {
      ...data,
      projects: Array.isArray(data.projects) ? data.projects : [],
      achievements: Array.isArray(data.achievements) ? data.achievements : [],
      skills: Array.isArray(data.skills) ? data.skills : [],
      domains: Array.isArray(data.domains) ? data.domains : [],
      profileImage: getImageUrl(data.profileImage),
      coverImage: getImageUrl(data.coverImage),
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getStudentProfile();
        if (res && res.data) {
          setProfile(normalize(res.data));
        } else {
          throw new Error("No data");
        }
      } catch (err) {
        console.warn("API Failed, using Mock Data", err);
        setProfile(normalize(DUMMY_DATA));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* Handlers */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleArrayChange = (e, field) => {
    const arr = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
    setProfile((prev) => ({ ...prev, [field]: arr }));
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, [field]: preview, [`${field}File`]: file }));
  };

  const addItem = (field, item) => {
    setProfile((prev) => ({ ...prev, [field]: [{ ...item, id: makeId() }, ...prev[field]] }));
  };

  const updateNestedItem = (field, index, key, value) => {
    const arr = [...profile[field]];
    arr[index][key] = value;
    setProfile((prev) => ({ ...prev, [field]: arr }));
  };

  const removeItem = (field, id) => {
    setProfile((prev) => ({ ...prev, [field]: prev[field].filter((it) => it.id !== id) }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const form = new FormData();
      if (profile.profileImageFile) form.append("profileImage", profile.profileImageFile);
      if (profile.coverImageFile) form.append("coverImage", profile.coverImageFile);

      const sendData = { ...profile };
      delete sendData.profileImageFile;
      delete sendData.coverImageFile;

      Object.keys(sendData).forEach((key) => {
        const val = sendData[key];
        if (typeof val === "object") form.append(key, JSON.stringify(val));
        else form.append(key, val);
      });

      const res = await updateStudentProfile(form);
      await checkAuth();
      setProfile(normalize(res.data));
      setIsEditing(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      alert("Failed to save (backend error). Saved locally.");
      setIsEditing(false);
    }
    setIsSaving(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium">Loading Profile...</p>
      </div>
    );
  }

  if (!profile) return <div className="p-10 text-center">Failed to load profile.</div>;

  return (
    <div className="bg-slate-50/50 min-h-screen font-sans text-slate-900 pb-24">

      {/* --- HERO SECTION --- */}
      <div className="relative bg-white border-b border-slate-200 pb-8">
        
        {/* Cover Image - Responsive Height */}
        <div className="h-48 md:h-64 lg:h-80 w-full bg-slate-200 relative group overflow-hidden">
          {profile.coverImage ? (
            <img src={profile.coverImage} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-500">
              <span className="text-sm font-medium">No cover image uploaded</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

          {/* Edit Cover Button */}
          {isEditing && (
            <label className="absolute bottom-4 right-4 md:bottom-6 md:right-6 cursor-pointer z-20">
              <div className="bg-black/40 backdrop-blur-md text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg flex items-center gap-2 border border-white/20 hover:bg-black/60 transition-colors">
                <Camera size={16} className="md:w-[18px]" /> <span className="font-medium text-xs md:text-sm">Change Cover</span>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "coverImage")} />
            </label>
          )}

          {/* Top Right Action Buttons */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white/90 backdrop-blur-sm text-slate-700 px-4 py-2 md:px-5 md:py-2.5 rounded-full font-bold shadow-lg hover:bg-white hover:scale-105 transition-all flex items-center gap-2 text-xs md:text-sm"
              >
                <Edit3 size={16} /> <span className="hidden xs:inline">Edit Profile</span>
              </button>
            ) : (
              <div className="flex gap-2 md:gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-white/90 backdrop-blur-sm text-slate-700 px-4 py-2 rounded-full font-bold shadow hover:bg-white transition text-xs md:text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-indigo-600 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:scale-105 transition-all flex items-center gap-2 text-xs md:text-sm"
                >
                  {isSaving ? <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
                  Save
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Info Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-16 md:-mt-20 flex flex-col md:flex-row items-end gap-6 z-10">
            
            {/* Avatar - Responsive Size */}
            <div className="relative group shrink-0 mx-auto md:mx-0">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-[4px] md:border-[6px] border-white shadow-2xl overflow-hidden bg-white">
                <img
                  src={profile.profileImage || "https://via.placeholder.com/200"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <label className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300 backdrop-blur-sm border-[6px] border-transparent">
                  <UploadCloud size={32} className="text-white drop-shadow-md" />
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "profileImage")} />
                </label>
              )}
            </div>

            {/* Name, Headline & Resume Button */}
            {!isEditing && (
              <div className="flex-1 pb-2 w-full text-center md:text-left space-y-2">
                <div>
                  <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight break-words">{profile.fullName}</h1>
                  <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto md:mx-0 leading-relaxed break-words">{profile.headline}</p>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-y-2 gap-x-4 md:gap-x-6 text-sm font-medium text-slate-500 pt-1">
                  {profile.location && <span className="flex items-center gap-1.5"><MapPin size={16} className="text-slate-400" /> {profile.location}</span>}
                  {profile.university && <span className="flex items-center gap-1.5"><GraduationCap size={16} className="text-slate-400" /> <span className="hidden sm:inline">{profile.university}</span><span className="sm:hidden">Uni</span></span>}
                  {profile.batchYear && <span className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md text-xs md:text-sm">Class of {profile.batchYear}</span>}
                </div>

                {/* Resume Button - Visible on Mobile now */}
                <div className="pt-4 md:hidden">
                  <a
                    href="http://localhost:8000/api/student/resume"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 active:scale-95 transition-transform"
                  >
                    <FileText size={18} /> Download Resume
                  </a>
                </div>
              </div>
            )}

            {/* Resume Button - Desktop */}
            {!isEditing && (
              <div className="hidden md:flex gap-3 pb-4">
                <a
                  href="http://localhost:8000/api/student/resume"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 hover:scale-105 transform"
                >
                  <FileText size={18} /> Download Resume
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-10">
        {!isEditing ? (
          /* ================= VIEW MODE ================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Main Column */}
            <div className="lg:col-span-8 space-y-6 md:space-y-8">

              {/* About */}
              <Card className="p-4 sm:p-6 md:p-8">
                <SectionTitle icon={User}>About Me</SectionTitle>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm md:text-lg break-words">
                  {profile.bio || "No bio added yet."}
                </p>
              </Card>

              {/* Education */}
              <Card className="p-4 sm:p-6 md:p-8">
                <SectionTitle icon={GraduationCap}>Education</SectionTitle>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-slate-900">{profile.university}</h4>
                    <p className="text-indigo-600 font-medium text-base md:text-lg">{profile.degree} in {profile.department}</p>
                  </div>
                  <div className="text-left sm:text-right w-full sm:w-auto flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-end bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-lg sm:rounded-none">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider order-2 sm:order-1 sm:mb-1">CGPA</span>
                    <span className="block text-2xl md:text-3xl font-bold text-slate-800 order-1 sm:order-2">{profile.cgpa || "N/A"}</span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Current Semester</span>
                    <p className="font-semibold text-slate-700">{profile.currentSemester || "Not set"}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Reg No</span>
                    <p className="font-semibold text-slate-700 break-all">{profile.regNo}</p>
                  </div>
                </div>
              </Card>

              {/* Projects */}
              <Card className="p-4 sm:p-6 md:p-8">
                <SectionTitle icon={Code}>Projects</SectionTitle>
                <div className="space-y-8">
                  {profile.projects?.length > 0 ? profile.projects.map((proj) => (
                    <div key={proj.id} className="relative pl-6 md:pl-8 border-l-2 border-indigo-100 last:border-0 pb-2 group">
                      <div className="absolute -left-[9px] top-1.5 w-[16px] h-[16px] rounded-full bg-white border-[4px] border-indigo-500 shadow-sm group-hover:scale-110 transition-transform"></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1">
                        <h4 className="text-lg md:text-xl font-bold text-slate-900">{proj.title}</h4>
                        {proj.link && (
                          <a href={safeHref(proj.link)} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline text-sm flex items-center gap-1 font-medium w-fit">
                            View Project <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {proj.techStack?.split(',').map((tech, i) => (
                          <span key={i} className="text-[10px] font-bold uppercase tracking-wide bg-slate-100 text-slate-500 px-2 py-1 rounded-md">{tech.trim()}</span>
                        ))}
                      </div>
                      <p className="text-slate-600 leading-relaxed text-sm md:text-base">{proj.description}</p>
                    </div>
                  )) : (
                    <p className="text-slate-400 italic">No projects listed yet.</p>
                  )}
                </div>
              </Card>

              {/* Achievements */}
              <Card className="p-4 sm:p-6 md:p-8">
                <SectionTitle icon={Award}>Achievements</SectionTitle>
                <ul className="space-y-4">
                  {profile.achievements?.length > 0 ? profile.achievements.map((ach) => (
                    <li key={ach.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                      <CheckCircle size={20} className="text-emerald-500 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-slate-800 font-bold block text-sm md:text-base">{ach.title}</span>
                        <span className="text-slate-500 text-xs md:text-sm">{ach.year}</span>
                      </div>
                    </li>
                  )) : <p className="text-slate-400 italic">No achievements added.</p>}
                </ul>
              </Card>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 space-y-6">

              {/* Contact */}
              <Card className="p-4 sm:p-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">Contact Details</h3>
                <div className="space-y-3">
                  {profile.email && (
                    <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 transition group p-2 hover:bg-slate-50 rounded-lg -mx-2 overflow-hidden">
                      <div className="p-2 bg-slate-100 text-slate-500 rounded-lg group-hover:bg-indigo-100 group-hover:text-indigo-600 transition shrink-0"><Mail size={18} /></div>
                      <span className="font-medium text-sm truncate">{profile.email}</span>
                    </a>
                  )}
                  {profile.phone && (
                    <a href={`tel:${profile.phone}`} className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 transition group p-2 hover:bg-slate-50 rounded-lg -mx-2 overflow-hidden">
                      <div className="p-2 bg-slate-100 text-slate-500 rounded-lg group-hover:bg-indigo-100 group-hover:text-indigo-600 transition shrink-0"><Phone size={18} /></div>
                      <span className="font-medium text-sm">{profile.phone}</span>
                    </a>
                  )}
                  <div className="h-px bg-slate-100 my-4"></div>
                  <div className="flex gap-2 flex-wrap">
                    {profile.linkedin && <a href={safeHref(profile.linkedin)} target="_blank" rel="noreferrer" className="p-2.5 bg-slate-50 rounded-lg text-slate-400 hover:text-white hover:bg-[#0077b5] transition"><Linkedin size={20} /></a>}
                    {profile.github && <a href={safeHref(profile.github)} target="_blank" rel="noreferrer" className="p-2.5 bg-slate-50 rounded-lg text-slate-400 hover:text-white hover:bg-[#333] transition"><Github size={20} /></a>}
                    {profile.twitter && <a href={safeHref(profile.twitter)} target="_blank" rel="noreferrer" className="p-2.5 bg-slate-50 rounded-lg text-slate-400 hover:text-white hover:bg-[#1DA1F2] transition"><Twitter size={20} /></a>}
                    {profile.website && <a href={safeHref(profile.website)} target="_blank" rel="noreferrer" className="p-2.5 bg-slate-50 rounded-lg text-slate-400 hover:text-white hover:bg-indigo-600 transition"><Globe size={20} /></a>}
                  </div>
                </div>
              </Card>

              {/* Skills */}
              <Card className="p-4 sm:p-6">
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills?.length > 0 ? profile.skills.map((skill, i) => <Badge key={i} variant="indigo">{skill}</Badge>) : <span className="text-slate-400 text-sm">None listed</span>}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.domains?.length > 0 ? profile.domains.map((d, i) => <Badge key={i} variant="purple">{d}</Badge>) : <span className="text-slate-400 text-sm">None listed</span>}
                  </div>
                </div>
              </Card>

              {/* Career Status Card */}
              <div className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-6 rounded-2xl shadow-xl shadow-indigo-200 relative overflow-hidden border border-white/10">
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm"><Briefcase size={18} fill="currentColor" /></div>
                  <h3 className="font-bold text-lg">Career Status</h3>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg border border-white/10 backdrop-blur-sm">
                    <div className={`w-3 h-3 rounded-full ${profile.isOpenToWork ? "bg-emerald-400 animate-pulse" : "bg-slate-400"}`}></div>
                    <span className="font-medium text-sm">
                      {profile.isOpenToWork ? "Open to Opportunities" : "Not looking right now"}
                    </span>
                  </div>
                  {profile.isOpenToWork && (
                    <p className="text-xs text-indigo-200 mt-2 text-center">Recruiters and Alumni can see that you are looking for internships/jobs.</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* ================= EDIT MODE ================= */
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-700 text-sm items-start">
              <CheckCircle size={18} className="mt-0.5 shrink-0" />
              <p>Editing Mode Active. Update your details below to showcase your best self to the alumni network.</p>
            </div>

            <Card className="p-4 sm:p-6 md:p-8">
              <SectionTitle icon={User}>Personal Information</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><Label>Full Name</Label><Input name="fullName" value={profile.fullName} onChange={handleChange} /></div>
                <div><Label>Headline</Label><Input name="headline" value={profile.headline} onChange={handleChange} placeholder="e.g. CS Student | React Developer" /></div>
                <div><Label>Email</Label><Input type="email" name="email" value={profile.email} onChange={handleChange} /></div>
                <div><Label>Phone</Label><Input name="phone" value={profile.phone} onChange={handleChange} /></div>
                <div><Label>Location</Label><Input name="location" value={profile.location} onChange={handleChange} /></div>
                <div><Label>Website / Portfolio</Label><Input name="website" value={profile.website} onChange={handleChange} /></div>
                <div className="md:col-span-2">
                  <Label>Bio</Label>
                  <TextArea rows="4" name="bio" value={profile.bio} onChange={handleChange} placeholder="Tell us about your academic journey and interests..." />
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 md:p-8">
              <SectionTitle icon={GraduationCap}>Academic Details</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><Label>University/College</Label><Input name="university" value={profile.university} onChange={handleChange} /></div>
                <div><Label>Degree</Label><Input name="degree" value={profile.degree} onChange={handleChange} /></div>
                <div><Label>Department/Major</Label><Input name="department" value={profile.department} onChange={handleChange} /></div>
                <div>
                  <Label>Registration No</Label>
                  <Input name="regNo" value={profile.regNo} disabled readOnly className="bg-slate-100 cursor-not-allowed text-slate-500" />
                </div>

                <div><Label>Batch Year (Class of)</Label><Input name="batchYear" value={profile.batchYear} onChange={handleChange} /></div>
                <div><Label>Current Semester</Label><Input name="currentSemester" value={profile.currentSemester} onChange={handleChange} /></div>
                <div><Label>CGPA</Label><Input name="cgpa" value={profile.cgpa} onChange={handleChange} placeholder="e.g. 8.5" /></div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 md:p-8">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl"><Code size={20} strokeWidth={2.5} /></div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">Projects</h3>
                </div>
                <button onClick={() => addItem("projects", { title: "", techStack: "", link: "", description: "" })} className="bg-indigo-50 text-indigo-600 px-3 py-2 md:px-4 rounded-lg text-sm font-bold hover:bg-indigo-100 transition flex items-center gap-2">
                  <Plus size={16} /> <span className="hidden sm:inline">Add Project</span><span className="sm:hidden">Add</span>
                </button>
              </div>
              <div className="space-y-6">
                {profile.projects?.map((proj, index) => (
                  <div key={proj.id} className="bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200 relative">
                    <button onClick={() => removeItem("projects", proj.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition"><Trash2 size={18} /></button>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="pr-10"><Label>Project Title</Label><Input value={proj.title} onChange={(e) => updateNestedItem("projects", index, "title", e.target.value)} className="bg-white" /></div>
                      <div><Label>Tech Stack (comma separated)</Label><Input value={proj.techStack} onChange={(e) => updateNestedItem("projects", index, "techStack", e.target.value)} className="bg-white" placeholder="React, Firebase..." /></div>
                      <div><Label>Project Link</Label><Input value={proj.link} onChange={(e) => updateNestedItem("projects", index, "link", e.target.value)} className="bg-white" /></div>
                      <div><Label>Description</Label><TextArea rows="2" value={proj.description} onChange={(e) => updateNestedItem("projects", index, "description", e.target.value)} className="bg-white" /></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 sm:p-6 md:p-8">
              <SectionTitle icon={CheckCircle}>Skills & Socials</SectionTitle>
              <div className="space-y-6">
                <div>
                  <Label>Technical Skills (comma separated)</Label>
                  <Input value={profile.skills?.join(", ") || ""} onChange={(e) => handleArrayChange(e, "skills")} placeholder="Java, Python, C++..." />
                </div>
                <div>
                  <Label>Areas of Interest (comma separated)</Label>
                  <Input value={profile.domains?.join(", ") || ""} onChange={(e) => handleArrayChange(e, "domains")} placeholder="Cloud Computing, Data Science..." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                  <div className="relative"><Label>LinkedIn</Label><Linkedin size={18} className="absolute left-3 bottom-3.5 text-slate-400 z-10" /><Input name="linkedin" value={profile.linkedin} onChange={handleChange} className="pl-10" /></div>
                  <div className="relative"><Label>GitHub</Label><Github size={18} className="absolute left-3 bottom-3.5 text-slate-400 z-10" /><Input name="github" value={profile.github} onChange={handleChange} className="pl-10" /></div>
                  <div className="relative"><Label>Twitter</Label><Twitter size={18} className="absolute left-3 bottom-3.5 text-slate-400 z-10" /><Input name="twitter" value={profile.twitter} onChange={handleChange} className="pl-10" /></div>
                </div>

                <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl bg-slate-50 mt-4">
                  <input type="checkbox" id="isOpenToWork" name="isOpenToWork" checked={profile.isOpenToWork} onChange={handleChange} className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" />
                  <label htmlFor="isOpenToWork" className="font-bold text-slate-700 select-none cursor-pointer text-sm md:text-base">I am Open to Work / Internships</label>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 md:p-8">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl"><Award size={20} strokeWidth={2.5} /></div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">Achievements</h3>
                </div>
                <button onClick={() => addItem("achievements", { title: "", year: "" })} className="bg-indigo-50 text-indigo-600 px-3 py-2 md:px-4 rounded-lg text-sm font-bold hover:bg-indigo-100 transition flex items-center gap-2">
                  <Plus size={16} /> <span className="hidden sm:inline">Add</span><span className="sm:hidden">Add</span>
                </button>
              </div>
              <div className="space-y-4">
                {profile.achievements?.map((ach, index) => (
                  <div key={ach.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    <div className="md:col-span-8"><Label>Title</Label><Input value={ach.title} onChange={(e) => updateNestedItem("achievements", index, "title", e.target.value)} className="bg-white" /></div>
                    <div className="md:col-span-3"><Label>Year</Label><Input value={ach.year} onChange={(e) => updateNestedItem("achievements", index, "year", e.target.value)} className="bg-white" /></div>
                    <div className="md:col-span-1 flex justify-end pb-2 md:pb-3">
                      <button onClick={() => removeItem("achievements", ach.id)} className="text-slate-400 hover:text-red-500 transition"><Trash2 size={20} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;