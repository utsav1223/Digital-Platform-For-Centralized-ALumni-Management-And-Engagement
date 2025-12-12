// src/components/alumni/AlumniProfile.jsx
import React, { useState, useEffect } from "react";
import {
  MapPin, Mail, Phone, Linkedin, Github, Globe, Twitter,
  Briefcase, GraduationCap, Award, BookOpen,
  Download, Edit3, Camera, CheckCircle,
  Plus, Trash2, Save, UploadCloud, Heart, User, ExternalLink
} from "lucide-react";

import { getLoggedInAlumni, updateAlumniProfile } from "../../api/authAPI";

/* -------------------------------------------------------
   HELPERS
--------------------------------------------------------*/
const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("blob:")) return path;
  return `http://localhost:8000${path}`;
};

const safeHref = (val) => {
  if (!val) return "#";
  return val.startsWith("http") ? val : `https://${val}`;
};

const makeId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

/* ---------------- UI ATOMS ---------------- */

const SectionTitle = ({ children, icon: Icon }) => (
  <div className="flex items-center gap-3 mb-6">
    {Icon && (
      <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
        <Icon size={20} strokeWidth={2.5} />
      </div>
    )}
    <h3 className="text-xl font-bold text-slate-900 tracking-tight">
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
      placeholder:text-slate-400 ${className}`}
    {...props}
  />
);

const TextArea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
      focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
      outline-none transition-all duration-200 text-slate-700 font-medium resize-none ${className}`}
    {...props}
  />
);

const Select = ({ children, ...props }) => (
  <div className="relative">
    <select
      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
        focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
        outline-none transition-all duration-200 text-slate-700 appearance-none font-medium"
      {...props}
    >
      {children}
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);

const Badge = ({ children, variant = "default" }) => {
  const styles = {
    default: "bg-slate-100 text-slate-600 border-slate-200",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    purple: "bg-violet-50 text-violet-700 border-violet-100",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
  };
  return (
    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-default ${styles[variant]}`}>
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

const AlumniProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  /* Normalize Data */
  const normalize = (p) => {
    if (!p) return null;
    return {
      fullName: p.fullName || "",
      email: p.email || "",
      regNo: p.regNo || "",
      batchYear: p.batchYear || "",
      headline: p.headline || "",
      phone: p.phone || "",
      location: p.location || "",
      gender: p.gender || "",
      bio: p.bio || "",
      profileImage: getImageUrl(p.profileImage),
      coverImage: getImageUrl(p.coverImage),
      college: p.college || "Your College Name",
      degree: p.degree || "",
      department: p.department || "",
      currentCompany: p.currentCompany || "",
      currentPosition: p.currentPosition || "",
      workHistory: Array.isArray(p.workHistory) ? p.workHistory : [],
      achievements: Array.isArray(p.achievements) ? p.achievements : [],
      skills: Array.isArray(p.skills) ? p.skills : [],
      domains: Array.isArray(p.domains) ? p.domains : [],
      linkedin: p.linkedin || "",
      github: p.github || "",
      twitter: p.twitter || "",
      website: p.website || "",
      isMentor: !!p.isMentor,
      mentorshipTopics: p.mentorshipTopics || [],
      isOpenToReferrals: !!p.isOpenToReferrals,
      referralIndustries: p.referralIndustries || "",
    };
  };

  /* Data Fetching */
  useEffect(() => {
    getLoggedInAlumni()
      .then((res) => {
        if (res.data.loggedIn) setProfile(normalize(res.data.alumni));
      })
      .catch(console.error);
  }, []);

  /* Cleanup Blobs */
  useEffect(() => {
    return () => {
      if (profile?.profileImage?.startsWith?.("blob:")) URL.revokeObjectURL(profile.profileImage);
      if (profile?.coverImage?.startsWith?.("blob:")) URL.revokeObjectURL(profile.coverImage);
    };
  }, [profile?.profileImage, profile?.coverImage]);

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
      const res = await updateAlumniProfile(form);
      setProfile(normalize(res.data.alumni));
      setIsEditing(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      alert("Failed to save profile.");
    }
    setIsSaving(false);
  };

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50 min-h-screen font-sans text-slate-900 pb-24">

      {/* --- HERO SECTION --- */}
      <div className="relative bg-white border-b border-slate-200 pb-8">
        {/* Cover Image */}
        <div className="h-64 md:h-80 w-full bg-slate-200 relative group overflow-hidden">
          <img
            src={profile.coverImage || "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80"}
            alt="Cover"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

          {/* FIXED: Added z-20 to ensure it's clickable above the gradient */}
          {isEditing && (
            <label className="absolute bottom-6 right-6 cursor-pointer z-20 animate-in fade-in zoom-in duration-300">
              <div className="bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-lg flex items-center gap-2 border border-white/20 hover:bg-black/60 transition-colors">
                <Camera size={18} /> <span className="font-medium text-sm">Change Cover</span>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, "coverImage")}
              />
            </label>
          )}

          {/* Action Buttons (Edit/Save) */}
          <div className="absolute top-6 right-6 z-20">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white/90 backdrop-blur-sm text-slate-700 px-5 py-2.5 rounded-full font-bold shadow-lg hover:bg-white hover:scale-105 transition-all flex items-center gap-2 text-sm"
              >
                <Edit3 size={16} /> Edit Profile
              </button>
            ) : (
              <div className="flex gap-3 animate-in fade-in slide-in-from-top-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-white/90 backdrop-blur-sm text-slate-700 px-5 py-2.5 rounded-full font-bold shadow hover:bg-white transition text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:scale-105 transition-all flex items-center gap-2 text-sm"
                >
                  {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Info Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-20 flex flex-col md:flex-row items-end gap-6 md:gap-8 z-10">

            {/* Avatar */}
            <div className="relative group shrink-0 mx-auto md:mx-0">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-white">
                <img
                  src={profile.profileImage || "https://via.placeholder.com/200"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* FIXED: Added z-20 to ensure it's clickable */}
              {isEditing && (
                <label className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300 backdrop-blur-sm border-[6px] border-transparent">
                  <UploadCloud size={32} className="text-white drop-shadow-md" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, "profileImage")}
                  />
                </label>
              )}
            </div>

            {/* Name & Headline */}
            {!isEditing && (
              <div className="flex-1 pb-2 w-full text-center md:text-left space-y-2">
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{profile.fullName}</h1>
                  <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto md:mx-0 leading-relaxed">{profile.headline}</p>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-y-2 gap-x-6 text-sm font-medium text-slate-500 pt-1">
                  {profile.location && <span className="flex items-center gap-1.5"><MapPin size={16} className="text-slate-400" /> {profile.location}</span>}
                  {profile.currentCompany && <span className="flex items-center gap-1.5"><Briefcase size={16} className="text-slate-400" /> {profile.currentCompany}</span>}
                  {profile.batchYear && <span className="flex items-center gap-1.5"><GraduationCap size={16} className="text-slate-400" /> {profile.batchYear}</span>}
                </div>
              </div>
            )}

            {/* Desktop Actions */}
            {!isEditing && (
              <div className="hidden md:flex gap-3 pb-4">
                <a
                  href="http://localhost:8000/api/alumni/generate-resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-2"
                >
                  <Download size={18} /> Resume
                </a>


              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {!isEditing ? (
          /* ================= VIEW MODE ================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Main Column */}
            <div className="lg:col-span-8 space-y-8">

              {/* About */}
              <Card className="p-8">
                <SectionTitle icon={User}>About Me</SectionTitle>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line text-lg">
                  {profile.bio || "No bio added yet."}
                </p>
              </Card>

              {/* Experience */}
              <Card className="p-8">
                <SectionTitle icon={Briefcase}>Experience</SectionTitle>
                <div className="space-y-10">
                  {profile.workHistory?.length > 0 ? profile.workHistory.map((job) => (
                    <div key={job.id} className="relative pl-8 border-l-2 border-indigo-100 last:border-0 pb-2 group">
                      <div className="absolute -left-[9px] top-1.5 w-[16px] h-[16px] rounded-full bg-white border-[4px] border-indigo-500 shadow-sm group-hover:scale-110 transition-transform"></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                        <div>
                          <h4 className="text-xl font-bold text-slate-900">{job.role}</h4>
                          <div className="text-base font-semibold text-indigo-600">{job.company}</div>
                        </div>
                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full mt-2 sm:mt-0 w-fit uppercase tracking-wide">
                          {job.duration}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{job.description}</p>
                    </div>
                  )) : (
                    <p className="text-slate-400 italic">No experience listed.</p>
                  )}
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Education */}
                <Card className="p-8 flex flex-col">
                  <SectionTitle icon={GraduationCap}>Education</SectionTitle>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-slate-900">{profile.college}</h4>
                    <p className="text-indigo-600 font-medium mb-4">{profile.degree} in {profile.department}</p>
                    <div className="border-t border-slate-100 pt-4 mt-auto">
                      <div className="grid grid-cols-2 gap-4 text-sm text-slate-500">
                        <div>Batch: <span className="font-semibold text-slate-700 block">{profile.batchYear}</span></div>
                        <div>Reg No: <span className="font-semibold text-slate-700 block">{profile.regNo}</span></div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Achievements */}
                <Card className="p-8 flex flex-col">
                  <SectionTitle icon={Award}>Achievements</SectionTitle>
                  <ul className="space-y-4">
                    {profile.achievements?.length > 0 ? profile.achievements.map((ach) => (
                      <li key={ach.id} className="flex items-start gap-3">
                        <CheckCircle size={20} className="text-emerald-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-slate-800 font-medium block leading-tight">{ach.title}</span>
                          <span className="text-slate-400 text-xs font-bold uppercase mt-1 block tracking-wide">{ach.year}</span>
                        </div>
                      </li>
                    )) : <p className="text-slate-400 italic">No achievements added.</p>}
                  </ul>
                </Card>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-6 space-y-6">

                {/* Contact */}
                <Card className="p-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">Connect</h3>
                  <div className="space-y-3">
                    {profile.email && (
                      <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 transition group p-2 hover:bg-slate-50 rounded-lg -mx-2">
                        <div className="p-2 bg-slate-100 text-slate-500 rounded-lg group-hover:bg-indigo-100 group-hover:text-indigo-600 transition"><Mail size={18} /></div>
                        <span className="font-medium text-sm truncate">{profile.email}</span>
                      </a>
                    )}
                    {profile.phone && (
                      <a href={`tel:${profile.phone}`} className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 transition group p-2 hover:bg-slate-50 rounded-lg -mx-2">
                        <div className="p-2 bg-slate-100 text-slate-500 rounded-lg group-hover:bg-indigo-100 group-hover:text-indigo-600 transition"><Phone size={18} /></div>
                        <span className="font-medium text-sm">{profile.phone}</span>
                      </a>
                    )}

                    <div className="h-px bg-slate-100 my-4"></div>

                    <div className="flex gap-2">
                      {profile.linkedin && <a href={safeHref(profile.linkedin)} target="_blank" rel="noreferrer" className="p-2.5 bg-slate-50 rounded-lg text-slate-400 hover:text-white hover:bg-[#0077b5] transition"><Linkedin size={20} /></a>}
                      {profile.github && <a href={safeHref(profile.github)} target="_blank" rel="noreferrer" className="p-2.5 bg-slate-50 rounded-lg text-slate-400 hover:text-white hover:bg-[#333] transition"><Github size={20} /></a>}
                      {profile.twitter && <a href={safeHref(profile.twitter)} target="_blank" rel="noreferrer" className="p-2.5 bg-slate-50 rounded-lg text-slate-400 hover:text-white hover:bg-[#1DA1F2] transition"><Twitter size={20} /></a>}
                      {profile.website && <a href={safeHref(profile.website)} target="_blank" rel="noreferrer" className="p-2.5 bg-slate-50 rounded-lg text-slate-400 hover:text-white hover:bg-indigo-600 transition"><Globe size={20} /></a>}
                    </div>
                  </div>
                </Card>

                {/* Skills */}
                <Card className="p-6">
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Technical Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills?.length > 0 ? profile.skills.map((skill, i) => <Badge key={i} variant="indigo">{skill}</Badge>) : <span className="text-slate-400 text-sm">None listed</span>}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Domains</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.domains?.length > 0 ? profile.domains.map((d, i) => <Badge key={i} variant="purple">{d}</Badge>) : <span className="text-slate-400 text-sm">None listed</span>}
                    </div>
                  </div>
                </Card>

                {/* Community Gradient Card */}
                <div className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-6 rounded-2xl shadow-xl shadow-indigo-200 relative overflow-hidden border border-white/10">
                  <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm"><Heart size={18} fill="currentColor" /></div>
                    <h3 className="font-bold text-lg">Community</h3>
                  </div>
                  <div className="space-y-5 relative z-10">
                    {profile.isMentor ? (
                      <div>
                        <p className="text-xs font-bold uppercase text-indigo-200 mb-2 tracking-wide">Mentorship</p>
                        <p className="text-sm bg-white/10 p-3 rounded-lg border border-white/10 backdrop-blur-sm leading-relaxed">
                          {profile.mentorshipTopics?.join(", ") || "General Mentorship"}
                        </p>
                      </div>
                    ) : <p className="text-sm opacity-80">Not currently mentoring.</p>}

                    {profile.isOpenToReferrals && (
                      <div>
                        <p className="text-xs font-bold uppercase text-indigo-200 mb-1 tracking-wide">Referrals</p>
                        <p className="text-sm font-medium">{profile.referralIndustries || "Various industries"}</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        ) : (
          /* ================= EDIT MODE ================= */
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-700 text-sm items-start">
              <CheckCircle size={18} className="mt-0.5 shrink-0" />
              <p>You are currently editing your profile. Changes made here will be updated on your public profile immediately after saving.</p>
            </div>

            <Card className="p-8">
              <SectionTitle icon={User}>Personal Information</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><Label>Full Name</Label><Input name="fullName" value={profile.fullName} onChange={handleChange} /></div>
                <div><Label>Headline</Label><Input name="headline" value={profile.headline} onChange={handleChange} /></div>
                <div><Label>Email</Label><Input type="email" name="email" value={profile.email} onChange={handleChange} /></div>
                <div><Label>Phone</Label><Input name="phone" value={profile.phone} onChange={handleChange} /></div>
                <div><Label>Location</Label><Input name="location" value={profile.location} onChange={handleChange} /></div>
                <div>
                  <Label>Gender</Label>
                  <Select name="gender" value={profile.gender} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </Select>
                </div>
                <div><Label>Reg No</Label><Input name="regNo" value={profile.regNo} onChange={handleChange} /></div>
                <div><Label>Batch Year</Label><Input name="batchYear" value={profile.batchYear} onChange={handleChange} /></div>
                <div className="md:col-span-2">
                  <Label>Bio</Label>
                  <TextArea rows="4" name="bio" value={profile.bio} onChange={handleChange} placeholder="Tell us about yourself..." />
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <SectionTitle icon={GraduationCap}>Academic & Professional</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="w-full mr-4">
                    <Label>College</Label>
                    <Input name="college" value={profile.college} onChange={handleChange} className="bg-white" />
                  </div>
                  <span className="px-3 py-1 bg-slate-200 text-slate-600 text-xs font-bold rounded uppercase tracking-wide shrink-0 mt-6">Primary</span>
                </div>
                <div><Label>Degree</Label><Input name="degree" value={profile.degree} onChange={handleChange} /></div>
                <div><Label>Department</Label><Input name="department" value={profile.department} onChange={handleChange} /></div>
                <div><Label>Current Company</Label><Input name="currentCompany" value={profile.currentCompany} onChange={handleChange} /></div>
                <div><Label>Current Position</Label><Input name="currentPosition" value={profile.currentPosition} onChange={handleChange} /></div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl"><Briefcase size={20} strokeWidth={2.5} /></div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">Work History</h3>
                </div>
                <button onClick={() => addItem("workHistory", { id: makeId(), company: "", role: "", duration: "", description: "" })} className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-100 transition flex items-center gap-2">
                  <Plus size={16} /> Add Position
                </button>
              </div>
              <div className="space-y-6">
                {profile.workHistory?.map((job, index) => (
                  <div key={job.id} className="bg-slate-50 p-6 rounded-xl border border-slate-200 relative group">
                    <button onClick={() => removeItem("workHistory", job.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition"><Trash2 size={18} /></button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div><Label>Company</Label><Input value={job.company} onChange={(e) => updateNestedItem("workHistory", index, "company", e.target.value)} className="bg-white" /></div>
                      <div><Label>Role</Label><Input value={job.role} onChange={(e) => updateNestedItem("workHistory", index, "role", e.target.value)} className="bg-white" /></div>
                      <div><Label>Duration</Label><Input value={job.duration} onChange={(e) => updateNestedItem("workHistory", index, "duration", e.target.value)} className="bg-white" placeholder="e.g. Jan 2020 - Present" /></div>
                      <div className="md:col-span-2"><Label>Description</Label><TextArea rows="2" value={job.description} onChange={(e) => updateNestedItem("workHistory", index, "description", e.target.value)} className="bg-white" /></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8">
              <SectionTitle icon={CheckCircle}>Skills & Socials</SectionTitle>
              <div className="space-y-6">
                <div>
                  <Label>Technical Skills (comma separated)</Label>
                  <Input value={profile.skills?.join(", ") || ""} onChange={(e) => handleArrayChange(e, "skills")} placeholder="React, Node.js, MongoDB..." />
                </div>
                <div>
                  <Label>Domains (comma separated)</Label>
                  <Input value={profile.domains?.join(", ") || ""} onChange={(e) => handleArrayChange(e, "domains")} placeholder="Web Development, Machine Learning..." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  <div className="relative"><Label>LinkedIn</Label><Linkedin size={18} className="absolute left-3 bottom-3.5 text-slate-400 z-10" /><Input name="linkedin" value={profile.linkedin} onChange={handleChange} className="pl-10" placeholder="username" /></div>
                  <div className="relative"><Label>GitHub</Label><Github size={18} className="absolute left-3 bottom-3.5 text-slate-400 z-10" /><Input name="github" value={profile.github} onChange={handleChange} className="pl-10" placeholder="username" /></div>
                  <div className="relative"><Label>Website</Label><Globe size={18} className="absolute left-3 bottom-3.5 text-slate-400 z-10" /><Input name="website" value={profile.website} onChange={handleChange} className="pl-10" placeholder="https://..." /></div>
                  <div className="relative"><Label>Twitter</Label><Twitter size={18} className="absolute left-3 bottom-3.5 text-slate-400 z-10" /><Input name="twitter" value={profile.twitter} onChange={handleChange} className="pl-10" placeholder="username" /></div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <SectionTitle icon={Heart}>Community</SectionTitle>
              <div className="space-y-6">
                <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl bg-slate-50">
                  <input type="checkbox" id="isMentor" name="isMentor" checked={profile.isMentor} onChange={handleChange} className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" />
                  <label htmlFor="isMentor" className="font-bold text-slate-700 select-none cursor-pointer">I am available to Mentor students</label>
                </div>
                {profile.isMentor && (
                  <div className="animate-in fade-in slide-in-from-top-2">
                    <Label>Mentorship Topics (comma separated)</Label>
                    <Input value={profile.mentorshipTopics?.join(", ") || ""} onChange={(e) => handleArrayChange(e, "mentorshipTopics")} placeholder="Career Guidance, Mock Interviews..." />
                  </div>
                )}
                <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl bg-slate-50">
                  <input type="checkbox" id="referrals" name="isOpenToReferrals" checked={profile.isOpenToReferrals} onChange={handleChange} className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" />
                  <label htmlFor="referrals" className="font-bold text-slate-700 select-none cursor-pointer">I am open to providing Referrals</label>
                </div>
                {profile.isOpenToReferrals && (
                  <div className="animate-in fade-in slide-in-from-top-2">
                    <Label>Referral Industries / Companies</Label>
                    <Input name="referralIndustries" value={profile.referralIndustries} onChange={handleChange} placeholder="e.g. Fintech, Edtech, Google, Amazon..." />
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl"><Award size={20} strokeWidth={2.5} /></div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">Achievements</h3>
                </div>
                <button onClick={() => addItem("achievements", { id: makeId(), title: "", year: "" })} className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-100 transition flex items-center gap-2">
                  <Plus size={16} /> Add
                </button>
              </div>
              <div className="space-y-4">
                {profile.achievements?.map((ach, index) => (
                  <div key={ach.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    <div className="md:col-span-8"><Label>Title</Label><Input value={ach.title} onChange={(e) => updateNestedItem("achievements", index, "title", e.target.value)} className="bg-white" /></div>
                    <div className="md:col-span-3"><Label>Year</Label><Input value={ach.year} onChange={(e) => updateNestedItem("achievements", index, "year", e.target.value)} className="bg-white" /></div>
                    <div className="md:col-span-1 flex justify-end pb-3">
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

export default AlumniProfile;