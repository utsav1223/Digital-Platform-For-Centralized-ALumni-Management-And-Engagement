import React, { useState } from "react";
import {
  MapPin, Mail, Phone, Linkedin, Github, Globe, Twitter,
  Briefcase, GraduationCap, Award, BookOpen,
  Download, Edit3, Camera, CheckCircle,
  Plus, Trash2, Save, UploadCloud, User, ExternalLink
} from "lucide-react";

const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("blob:")) return path;
  return path;
};

const safeHref = (val) => {
  if (!val) return "#";
  return val.startsWith("http") ? val : `https://${val}`;
};

// UI Components
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

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Sample data - replace with actual data from your API
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    regNo: "STU2023001",
    batchYear: "2024",
    headline: "Computer Science Student | Web Developer",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Passionate Computer Science student with a strong foundation in software development and problem-solving. Eager to apply my skills in a professional environment and contribute to meaningful projects.",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    coverImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1350&q=80",
    university: "Tech University",
    degree: "Bachelor of Science",
    department: "Computer Science",
    skills: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git"],
    domains: ["Web Development", "Machine Learning", "Cloud Computing"],
    linkedin: "johndoe",
    github: "johndoe",
    twitter: "johndoe",
    website: "johndoe.dev"
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Add API call to save profile
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save profile:", err);
    }
    setIsSaving(false);
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile(prev => ({ ...prev, [field]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-slate-50/50 min-h-screen font-sans text-slate-900 pb-24">
      {/* Hero Section */}
      <div className="relative bg-white border-b border-slate-200 pb-8">
        {/* Cover Image */}
        <div className="h-64 md:h-80 w-full bg-slate-200 relative group overflow-hidden">
          <img
            src={profile.coverImage}
            alt="Cover"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

          {isEditing && (
            <label className="absolute bottom-6 right-6 cursor-pointer z-20">
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

          {/* Action Buttons */}
          <div className="absolute top-6 right-6 z-20">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white/90 backdrop-blur-sm text-slate-700 px-5 py-2.5 rounded-full font-bold shadow-lg hover:bg-white hover:scale-105 transition-all flex items-center gap-2 text-sm"
              >
                <Edit3 size={16} /> Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
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
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-20 flex flex-col md:flex-row items-end gap-6 md:gap-8 z-10">
            {/* Avatar */}
            <div className="relative group shrink-0 mx-auto md:mx-0">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-white">
                <img
                  src={profile.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

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
            <div className="flex-1 pb-2 w-full text-center md:text-left space-y-2">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {profile.fullName}
                </h1>
                <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto md:mx-0 leading-relaxed">
                  {profile.headline}
                </p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-y-2 gap-x-6 text-sm font-medium text-slate-500 pt-1">
                {profile.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin size={16} className="text-slate-400" /> {profile.location}
                  </span>
                )}
                {profile.university && (
                  <span className="flex items-center gap-1.5">
                    <GraduationCap size={16} className="text-slate-400" /> {profile.university}
                  </span>
                )}
                {profile.regNo && (
                  <span className="flex items-center gap-1.5">
                    <span className="text-slate-400">#</span> {profile.regNo}
                  </span>
                )}
              </div>
            </div>

            {/* Resume Download */}
            <div className="hidden md:flex gap-3 pb-4">
              <a
                href="#"
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors"
              >
                <Download size={18} /> Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* About */}
            <Card className="p-8">
              <SectionTitle icon={User}>About Me</SectionTitle>
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  className="w-full p-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows="4"
                />
              ) : (
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {profile.bio}
                </p>
              )}
            </Card>

            {/* Education */}
            <Card className="p-8">
              <SectionTitle icon={GraduationCap}>Education</SectionTitle>
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">
                        {isEditing ? (
                          <input
                            type="text"
                            value={profile.university}
                            onChange={(e) => setProfile({...profile, university: e.target.value})}
                            className="w-full p-2 border border-slate-200 rounded"
                          />
                        ) : (
                          profile.university
                        )}
                      </h4>
                      <p className="text-indigo-600 font-medium">
                        {isEditing ? (
                          <div className="flex gap-2 mt-2">
                            <input
                              type="text"
                              value={profile.degree}
                              onChange={(e) => setProfile({...profile, degree: e.target.value})}
                              className="flex-1 p-2 border border-slate-200 rounded"
                              placeholder="Degree"
                            />
                            <span className="self-center">in</span>
                            <input
                              type="text"
                              value={profile.department}
                              onChange={(e) => setProfile({...profile, department: e.target.value})}
                              className="flex-1 p-2 border border-slate-200 rounded"
                              placeholder="Department"
                            />
                          </div>
                        ) : (
                          `${profile.degree} in ${profile.department}`
                        )}
                      </p>
                    </div>
                    <div className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {isEditing ? (
                        <input
                          type="text"
                          value={`Class of ${profile.batchYear}`}
                          onChange={(e) => {
                            const year = e.target.value.replace(/\D/g, '');
                            setProfile({...profile, batchYear: year});
                          }}
                          className="w-24 p-1 border border-slate-200 rounded text-center"
                        />
                      ) : (
                        `Class of ${profile.batchYear}`
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Contact Info */}
            <Card className="p-8">
              <SectionTitle>Contact Information</SectionTitle>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-slate-400" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="flex-1 p-2 border border-slate-200 rounded"
                    />
                  ) : (
                    <a href={`mailto:${profile.email}`} className="text-slate-600 hover:text-indigo-600">
                      {profile.email}
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-slate-400" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="flex-1 p-2 border border-slate-200 rounded"
                    />
                  ) : (
                    <a href={`tel:${profile.phone.replace(/\D/g, '')}`} className="text-slate-600 hover:text-indigo-600">
                      {profile.phone}
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-slate-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                      className="flex-1 p-2 border border-slate-200 rounded"
                    />
                  ) : (
                    <span className="text-slate-600">{profile.location}</span>
                  )}
                </div>
              </div>
            </Card>

            {/* Skills */}
            <Card className="p-8">
              <SectionTitle>Skills</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {isEditing ? (
                  <div className="w-full">
                    <input
                      type="text"
                      value={profile.skills.join(', ')}
                      onChange={(e) => {
                        const skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                        setProfile({...profile, skills});
                      }}
                      className="w-full p-2 border border-slate-200 rounded"
                      placeholder="Add skills separated by commas"
                    />
                    <p className="text-xs text-slate-500 mt-1">Separate skills with commas</p>
                  </div>
                ) : (
                  profile.skills.map((skill, index) => (
                    <Badge key={index} variant="indigo">
                      {skill}
                    </Badge>
                  ))
                )}
              </div>
            </Card>

            {/* Domains */}
            <Card className="p-8">
              <SectionTitle>Areas of Interest</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {isEditing ? (
                  <div className="w-full">
                    <input
                      type="text"
                      value={profile.domains.join(', ')}
                      onChange={(e) => {
                        const domains = e.target.value.split(',').map(d => d.trim()).filter(Boolean);
                        setProfile({...profile, domains});
                      }}
                      className="w-full p-2 border border-slate-200 rounded"
                      placeholder="Add domains separated by commas"
                    />
                    <p className="text-xs text-slate-500 mt-1">E.g., Web Development, AI, Data Science</p>
                  </div>
                ) : (
                  profile.domains.map((domain, index) => (
                    <Badge key={index} variant="purple">
                      {domain}
                    </Badge>
                  ))
                )}
              </div>
            </Card>

            {/* Social Links */}
            <Card className="p-8">
              <SectionTitle>Connect</SectionTitle>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Linkedin size={18} className="text-slate-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.linkedin}
                      onChange={(e) => setProfile({...profile, linkedin: e.target.value})}
                      className="flex-1 p-2 border border-slate-200 rounded"
                      placeholder="LinkedIn username"
                    />
                  ) : (
                    <a 
                      href={`https://linkedin.com/in/${profile.linkedin}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      linkedin.com/in/{profile.linkedin}
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Github size={18} className="text-slate-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.github}
                      onChange={(e) => setProfile({...profile, github: e.target.value})}
                      className="flex-1 p-2 border border-slate-200 rounded"
                      placeholder="GitHub username"
                    />
                  ) : (
                    <a 
                      href={`https://github.com/${profile.github}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      github.com/{profile.github}
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Twitter size={18} className="text-slate-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.twitter}
                      onChange={(e) => setProfile({...profile, twitter: e.target.value})}
                      className="flex-1 p-2 border border-slate-200 rounded"
                      placeholder="Twitter username"
                    />
                  ) : (
                    <a 
                      href={`https://twitter.com/${profile.twitter}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      @{profile.twitter}
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-slate-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.website}
                      onChange={(e) => setProfile({...profile, website: e.target.value})}
                      className="flex-1 p-2 border border-slate-200 rounded"
                      placeholder="Your website URL"
                    />
                  ) : (
                    <a 
                      href={safeHref(profile.website)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      {profile.website}
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;