import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  Loader2, 
  CheckCircle, 
  ArrowRight, 
  User, 
  MessageSquare,
  Quote
} from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "email" && errors.email) {
      setErrors({
        ...errors,
        email: validateEmail(value) ? null : "Please enter a valid email address",
      });
    }
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateEmail(form.email)) newErrors.email = "Invalid email address";
    if (!form.name) newErrors.name = "Full name is required";
    if (!form.role) newErrors.role = "Please select a role";
    if (!form.message) newErrors.message = "Message cannot be empty";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setForm({ name: "", email: "", role: "", message: "" });
        setErrors({});
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 lg:p-8 bg-slate-50 relative">
      
      {/* --- BACKGROUND PATTERN --- */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10 min-h-[650px] border border-slate-100">
        
        {/* --- LEFT SIDE: VISUAL & TRUST --- */}
        <div className="w-full md:w-5/12 lg:w-1/2 relative flex flex-col justify-between p-10 lg:p-12 text-white bg-slate-900">
          
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop" 
              alt="Background" 
              className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-slate-900/90 to-slate-900/95"></div>
          </div>

          {/* Top Content */}
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold font-sans tracking-tight mb-6 leading-tight">
              Let's craft the <br/>
              <span className="text-blue-400">future together.</span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-sm">
              Connect with the alumni network. Whether you have questions or want to contribute, we are here to listen.
            </p>
          </div>

          {/* Bottom Content: Social Proof / Quote */}
          <div className="relative z-10 mt-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg">
              <Quote className="w-8 h-8 text-blue-400 mb-4 opacity-80" />
              <p className="text-slate-200 italic font-light mb-4">
                "This platform helped me reconnect with my batchmates and find a mentor in my field. The response was incredibly fast."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold">
                  JD
                </div>
                <div>
                  <div className="font-semibold text-sm">Jane Doe</div>
                  <div className="text-xs text-blue-200">Alumni, Class of '18</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* --- RIGHT SIDE: FORM --- */}
        <div className="w-full md:w-7/12 lg:w-1/2 p-8 lg:p-14 bg-white flex flex-col justify-center relative">
          
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Send us a message</h1>
              <p className="text-slate-500">We usually respond within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name Input */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  className={`w-full px-4 py-3 rounded-lg bg-slate-50 border text-slate-900 text-sm transition-all focus:bg-white focus:ring-2 outline-none
                    ${errors.name 
                      ? "border-red-300 focus:ring-red-100" 
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-100 hover:border-blue-300"
                    }`}
                />
                {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name}</p>}
              </div>

              {/* Email & Role Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 rounded-lg bg-slate-50 border text-slate-900 text-sm transition-all focus:bg-white focus:ring-2 outline-none
                      ${errors.email 
                        ? "border-red-300 focus:ring-red-100" 
                        : "border-slate-200 focus:border-blue-500 focus:ring-blue-100 hover:border-blue-300"
                      }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email}</p>}
                </div>

                {/* Role */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Role</label>
                  <div className="relative">
                    <select
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg bg-slate-50 border text-slate-900 text-sm appearance-none cursor-pointer transition-all focus:bg-white focus:ring-2 outline-none
                      ${errors.role 
                        ? "border-red-300 focus:ring-red-100" 
                        : "border-slate-200 focus:border-blue-500 focus:ring-blue-100 hover:border-blue-300"
                      }`}
                    >
                      <option value="" disabled>Select Role</option>
                      <option value="Student">Student</option>
                      <option value="Alumni">Alumnus/Alumna</option>
                      <option value="Staff">Faculty / Staff</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                  {errors.role && <p className="text-red-500 text-xs ml-1">{errors.role}</p>}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-slate-400" />
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="How can we help you today?"
                  className={`w-full px-4 py-3 rounded-lg bg-slate-50 border text-slate-900 text-sm transition-all focus:bg-white focus:ring-2 outline-none resize-none
                    ${errors.message 
                      ? "border-red-300 focus:ring-red-100" 
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-100 hover:border-blue-300"
                    }`}
                />
                {errors.message && <p className="text-red-500 text-xs ml-1">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={`
                  w-full group flex items-center justify-center gap-2 py-3.5 rounded-lg font-bold text-white transition-all duration-300 shadow-lg shadow-blue-500/20
                  ${status === "success" 
                    ? "bg-green-500 hover:bg-green-600 scale-[1.02]" 
                    : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 hover:-translate-y-0.5"
                  }
                  ${status === "loading" ? "opacity-90 cursor-wait" : ""}
                `}
              >
                {status === "loading" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : status === "success" ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Sent Successfully</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Contact Info */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500 border-t border-slate-100 pt-6">
              <a href="mailto:contact@university.edu" className="flex items-center gap-2 hover:text-blue-600 transition-colors group">
                <div className="p-2 bg-slate-50 text-slate-400 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span>contact@university.edu</span>
              </a>
              <div className="hidden sm:block w-px h-4 bg-slate-200"></div>
              <div className="flex items-center gap-2 hover:text-blue-600 transition-colors group cursor-default">
                <div className="p-2 bg-slate-50 text-slate-400 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Main Campus, Building A</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}