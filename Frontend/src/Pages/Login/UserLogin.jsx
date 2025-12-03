import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- ICONS ---
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#0077B5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// Helper Hook for responsiveness
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isDesktop;
};

export default function SlidingRoleLogin() {
  const [role, setRole] = useState("alumni"); 
  const isDesktop = useIsDesktop();
  const isStudent = role === "student";

  // Animation variants
  const swapTransition = {
    type: "spring",
    stiffness: 70,
    damping: 14,
  };

  const entryAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-900">
      
      {/* Background Image - Visibility Increased */}
      <img 
        src="https://images.shiksha.com/mediadata/images/articles/1744019588phpVCRWzS.jpeg" 
        alt="University Background" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-60"
      />
      {/* Dark Overlay to make text readable but keep background visible */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      
      <motion.div 
        className="max-w-4xl w-full relative z-10"
        initial={entryAnimation.initial}
        animate={entryAnimation.animate}
        transition={entryAnimation.transition}
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative min-h-[650px] flex">
          
          {/* --- LEFT FORM CONTAINER (ALUMNI) --- */}
          <motion.div
            className="w-full md:w-1/2 p-8 flex items-center justify-center absolute top-0 bottom-0"
            initial={false}
            animate={{
              x: isDesktop ? (isStudent ? "100%" : "0%") : "0%",
              opacity: isStudent ? 0 : 1, 
              zIndex: isStudent ? 0 : 10,
            }}
            transition={swapTransition}
          >
            <FormContent 
                role="Alumni" 
                setRole={setRole} 
                isMobile={!isDesktop} 
                targetRole="student" 
            />
          </motion.div>

          {/* --- RIGHT FORM CONTAINER (STUDENT) --- */}
          <motion.div
            className="w-full md:w-1/2 p-8 flex items-center justify-center absolute top-0 bottom-0 md:right-0"
            initial={false}
            animate={{
              x: isDesktop ? (isStudent ? "0%" : "-100%") : "0%",
              opacity: isStudent ? 1 : 0,
              zIndex: isStudent ? 10 : 0,
            }}
            transition={swapTransition}
          >
            <FormContent 
                role="Student" 
                setRole={setRole} 
                isMobile={!isDesktop} 
                targetRole="alumni"
            />
          </motion.div>

          {/* --- SLIDING IMAGE OVERLAY (HIDDEN ON MOBILE) --- */}
          <motion.div
            className="hidden md:block absolute top-0 bottom-0 w-1/2 overflow-hidden z-20 shadow-2xl"
            initial={false}
            animate={{ x: isStudent ? "0%" : "100%" }}
            transition={swapTransition}
          >
            <div className="relative w-full h-full">
              <img
                src={
                  isStudent
                    ? "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                    : "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
                }
                alt="Visual"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-slate-900/40 mix-blend-multiply" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={role}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-3xl font-bold mb-4">
                      {isStudent ? "Hello, Student!" : "Welcome Back!"}
                    </h2>
                    <p className="text-blue-100 mb-8 leading-relaxed">
                      {isStudent
                        ? "Already graduated? Access the exclusive alumni network and stay connected."
                        : "Still studying? Access your course materials and student schedule here."}
                    </p>
                    
                    <button
                      onClick={() => setRole(isStudent ? "alumni" : "student")}
                      className="px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-200"
                    >
                      {isStudent ? "I am an Alumni" : "I am a Student"}
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}

// --- FORM COMPONENT ---
function FormContent({ role, setRole, isMobile, targetRole }) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-slate-900">{role} Login</h3>
        <p className="text-slate-500 mt-2">Enter your details to access your account</p>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium text-slate-600">
            <GoogleIcon /> Google
        </button>
        {/* Replaced Apple with LinkedIn */}
        <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium text-slate-600">
            <LinkedInIcon /> LinkedIn
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-500">Or continue with</span>
        </div>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        
        {/* User ID Field */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">User ID</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon />
            </div>
            <input
              type="text"
              placeholder={role === 'Student' ? "Roll No (e.g., 21CS001)" : "Reg No (e.g., 19CS102)"}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MailIcon />
            </div>
            <input
              type="email"
              placeholder="name@university.edu"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockIcon />
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            Remember me
          </label>
          <a href="#" className="text-blue-600 font-semibold hover:text-blue-700 hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5"
        >
          Sign in as {role}
        </button>

        {/* --- MOBILE ONLY SWITCH BUTTON --- */}
        {isMobile && (
            <div className="mt-4 text-center">
                <p className="text-sm text-slate-500 mb-2">Not a {role}?</p>
                <button
                    type="button"
                    onClick={() => setRole(targetRole)}
                    className="text-blue-600 font-semibold hover:underline"
                >
                    Switch to {targetRole.charAt(0).toUpperCase() + targetRole.slice(1)} Login
                </button>
            </div>
        )}
      </form>
    </div>
  );
}