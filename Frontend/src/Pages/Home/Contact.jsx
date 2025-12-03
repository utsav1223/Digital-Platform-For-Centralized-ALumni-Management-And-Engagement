import React, { useState } from 'react';
import { Mail, MapPin, Send, Loader2, CheckCircle, ArrowRight } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success

  // Validate Email Live
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "email") {
      setErrors({
        ...errors,
        email: validateEmail(value) ? null : "Invalid Email Address",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final Validation before submit
    if (!validateEmail(form.email) || !form.name || !form.message) {
      setErrors({ 
        email: !validateEmail(form.email) ? "Invalid Email Address" : null,
        name: !form.name ? "Name is required" : null,
        message: !form.message ? "Message is required" : null
      });
      return;
    }

    setStatus("loading");

    // Simulate API Call
    setTimeout(() => {
      setStatus("success");
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus("idle");
        setForm({ name: "", email: "", role: "", message: "" });
        setErrors({});
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50">
      
      {/* --- INJECT CSS TO HIDE SCROLLBAR --- */}
      <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- MAIN CARD CONTAINER --- */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex relative z-10 min-h-[600px]">
        
        {/* --- LEFT SIDE: IMAGE BACKGROUND --- */}
        <div 
          className="hidden md:flex w-1/2 relative flex-col justify-end p-10 text-white bg-cover bg-center"
          style={{
            // Added Image here with a gradient overlay for text readability
            backgroundImage: 'linear-gradient(to top, rgba(30, 58, 138, 0.9), rgba(30, 58, 138, 0.4)), url("https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2000&auto=format&fit=crop")'
          }}
        >
          
          {/* Decorative subtle texture/blur (Optional) */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

          <div className="z-10 mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-xs font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Average Response Time: 24 Hours
            </div>
            <h2 className="text-4xl font-bold mb-4 drop-shadow-md leading-tight">
              Let's Start a <br/>Conversation.
            </h2>
            <p className="text-base text-blue-100 leading-relaxed opacity-90 drop-shadow-sm">
              Whether you're a student looking for guidance or an alumni wanting to give back, we're here to help you connect.
            </p>
          </div>
        </div>

        {/* --- RIGHT SIDE: FORM SECTION --- */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 overflow-y-auto no-scrollbar bg-white relative">
          
          <div className="w-full max-w-md">
            
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Get in Touch</h1>
              <p className="text-slate-500 text-sm">Fill out the form below and we'll get back to you.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name Input */}
              <div className="relative group">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 group-focus-within:text-blue-600 transition-colors">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ex: Sarah Connor"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none transition-all placeholder-slate-400"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email Input */}
              <div className="relative group">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 group-focus-within:text-blue-600 transition-colors">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="sarah@example.com"
                  className={`w-full bg-slate-50 border text-slate-900 text-sm rounded-lg focus:ring-2 block p-2.5 outline-none transition-all placeholder-slate-400
                    ${errors.email 
                      ? "border-red-300 focus:ring-red-200 focus:border-red-500" 
                      : "border-slate-200 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 absolute right-0 top-0">{errors.email}</p>
                )}
              </div>

              {/* Role Select */}
              <div className="relative group">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 group-focus-within:text-blue-600 transition-colors">
                  I am a...
                </label>
                <div className="relative">
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none appearance-none transition-all"
                  >
                    <option value="">Select your role</option>
                    <option value="Student">Student</option>
                    <option value="Alumni">Alumnus</option>
                  </select>
                  {/* Custom Chevron */}
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="relative group">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 group-focus-within:text-blue-600 transition-colors">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="3"
                  placeholder="How can we help you?"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none resize-none transition-all placeholder-slate-400"
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={`
                  w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-white transition-all duration-300 transform
                  ${status === "success" ? "bg-green-500 hover:bg-green-600" : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 shadow-lg shadow-blue-600/30"}
                  ${status === "loading" ? "opacity-80 cursor-not-allowed" : ""}
                `}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Contact Info Footer */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-full">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <a href="mailto:support@alumniconnect.com" className="hover:text-blue-600 transition-colors">
                  support@alumniconnect.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                 <div className="p-1.5 bg-blue-50 text-blue-600 rounded-full">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>Main Campus, Block A</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}