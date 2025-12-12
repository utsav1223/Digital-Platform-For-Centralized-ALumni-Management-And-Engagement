import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- ICONS & LOGOS ---
const StudentLogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-blue-700 mb-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
  </svg>
);

const AlumniLogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-blue-700 mb-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.499 5.521c-.902.3-1.819.6-2.748.897m-15.482 0c.969-1.035 2.024-2.027 3.147-2.962a59.909 59.909 0 0111.336 0c1.123.935 2.178 1.927 3.147 2.962m-7.617 6v-1a3 3 0 013-3h1m-4 4v-1a3 3 0 00-3-3H9" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-12 h-12 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isDesktop;
};

// --- SUCCESS SCREEN COMPONENT ---
const SuccessScreen = ({ role }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="min-h-[100dvh] flex items-center justify-center bg-slate-900 p-4"
  >
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center max-w-md w-full">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
        className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30"
      >
        <CheckIcon />
      </motion.div>

      <h2 className="text-3xl font-bold text-slate-900 mb-2">Login Successful!</h2>
      <p className="text-slate-500 mb-8">
        Welcome back, <span className="font-semibold text-blue-600 capitalize">{role}</span>. <br />
        Redirecting you to the dashboard...
      </p>

      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-600"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
    </div>
  </motion.div>
);

// --- MAIN COMPONENT ---
export default function SlidingRoleLogin() {
  const [role, setRole] = useState("alumni");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isDesktop = useIsDesktop();
  const isStudent = role === "student";

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

  if (isLoggedIn) {
    return <SuccessScreen role={role} />;
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-4 relative overflow-hidden bg-slate-900">

      <img
        src="https://images.shiksha.com/mediadata/images/articles/1744019588phpVCRWzS.jpeg"
        alt="University Background"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-60"
      />
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

      <motion.div
        className="max-w-4xl w-full relative z-10 my-4"
        initial={entryAnimation.initial}
        animate={entryAnimation.animate}
        transition={entryAnimation.transition}
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative h-auto md:min-h-[650px] flex flex-col md:block">

          {/* --- LEFT FORM CONTAINER (ALUMNI) --- */}
          <motion.div
            className={`w-full md:w-1/2 p-6 md:p-8 flex items-center justify-center 
              ${isDesktop ? "absolute top-0 bottom-0" : (!isStudent ? "relative" : "absolute top-0 w-full")}`}
            initial={false}
            animate={{
              x: isDesktop ? (isStudent ? "100%" : "0%") : "0%",
              opacity: isStudent ? 0 : 1,
              zIndex: isStudent ? 0 : 20,
              pointerEvents: isStudent ? "none" : "auto"
            }}
            transition={swapTransition}
          >
            <FormContent
              role="Alumni"
              subtitle="Stay connected with your roots and network."
              setRole={setRole}
              isMobile={!isDesktop}
              targetRole="student"
              onLoginSuccess={() => setIsLoggedIn(true)}
            />
          </motion.div>

          {/* --- RIGHT FORM CONTAINER (STUDENT) --- */}
          <motion.div
            className={`w-full md:w-1/2 p-6 md:p-8 flex items-center justify-center 
                ${isDesktop ? "absolute top-0 bottom-0 md:right-0" : (isStudent ? "relative" : "absolute top-0 w-full")}`}
            initial={false}
            animate={{
              x: isDesktop ? (isStudent ? "0%" : "-100%") : "0%",
              opacity: isStudent ? 1 : 0,
              zIndex: isStudent ? 20 : 0,
              pointerEvents: isStudent ? "auto" : "none"
            }}
            transition={swapTransition}
          >
            <FormContent
              role="Student"
              subtitle="Manage your academic journey and resources."
              setRole={setRole}
              isMobile={!isDesktop}
              targetRole="alumni"
              onLoginSuccess={() => setIsLoggedIn(true)}
            />
          </motion.div>

          {/* --- SLIDING IMAGE OVERLAY (HIDDEN ON MOBILE) --- */}
          <motion.div
            className="hidden md:block absolute top-0 bottom-0 w-1/2 overflow-hidden z-30 shadow-2xl"
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
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/95 to-slate-900/50 mix-blend-multiply" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={role}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center"
                  >
                    <h2 className="text-3xl font-bold mb-4">
                      {isStudent ? "Hello, Student!" : "Welcome Back!"}
                    </h2>

                    <div className="text-blue-100 mb-8 leading-relaxed text-lg max-w-sm">
                      {isStudent ? (
                        <>
                          <p className="mb-2">Your gateway to academic excellence.</p>
                          <p className="text-sm opacity-80">Access library resources, check exam schedules, track attendance, and view your results all in one place.</p>
                        </>
                      ) : (
                        <>
                          <p className="mb-2">Your legacy continues here.</p>
                          <p className="text-sm opacity-80">Reconnect with batchmates, access exclusive career opportunities, download transcripts, and mentor the next generation.</p>
                        </>
                      )}
                    </div>

                    <button
                      onClick={() => setRole(isStudent ? "alumni" : "student")}
                      className="px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-200"
                    >
                      {isStudent ? "Log in as Alumni" : "Log in as Student"}
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

function FormContent({ role, subtitle, setRole, isMobile, targetRole, onLoginSuccess }) {
  // 1. STATE MANAGEMENT
  const [userRegNo, setUserRegNo] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const getFieldError = (field) => {
    if (!errors || errors.length === 0) return "";
    const e = errors.find((err) => err.param === field || err.path === field);
    return e ? e.msg : "";
  };

  // 2. FETCH INTEGRATION
  const handleLogin = async (e) => {
    e.preventDefault();

    setErrors([]);
    setErrorMessage("");

    if (!userRegNo || !userPassword) {
      const missing = [];
      if (!userRegNo) missing.push({ param: "regNo", msg: "Please enter your Reg No" });
      if (!userPassword) missing.push({ param: "password", msg: "Please enter your password" });
      setErrors(missing);
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = role.toLowerCase();
      const url = `http://localhost:8000/api/${endpoint}/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",   // ← 🔥 REQUIRED for express-session
        body: JSON.stringify({
          regNo: userRegNo,
          password: userPassword,
        }),
      });


      const data = await response.json();
      console.log("LOGIN RESPONSE:", data);

      if (response.ok) {
        setErrors([]);
        setErrorMessage("");

        if (endpoint === "alumni") {
          localStorage.setItem("alumniToken", data.token);
        } else if (endpoint === "student") {
          localStorage.setItem("studentToken", data.token);
        }

        onLoginSuccess();

        setTimeout(() => {
          if (endpoint === "alumni") {
            window.location.href = "/alumnidashboard";
          } else {
            window.location.href = "/student/dashboard";
          }
        }, 1800);

      } else {
        // --- ERROR HANDLING ---
        if (data && data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          setErrors(data.errors);
          setErrorMessage(""); // Clear global message if specific fields have errors
        } else if (data && data.message) {
          setErrorMessage(data.message);
        } else {
          setErrorMessage("Invalid credentials");
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputBaseClass = "w-full pl-10 pr-4 py-3 md:py-3.5 bg-slate-50 rounded-xl border focus:bg-white focus:ring-4 transition-all outline-none font-medium text-slate-700 placeholder:text-slate-400";
  const inputErrorClass = "border-red-500 focus:border-red-500 focus:ring-red-200";

  return (
    <div className="w-full max-w-sm flex flex-col justify-center h-full py-4 md:py-6">
      <div className="text-center mb-6 md:mb-8">

        <div className="flex justify-center">
          {role === 'Student' ? <StudentLogoIcon /> : <AlumniLogoIcon />}
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{role} Portal</h3>
        <p className="text-slate-500 mt-2 md:mt-3 text-sm px-4">{subtitle}</p>
      </div>

      <form className="space-y-5 md:space-y-6" onSubmit={handleLogin}>

        {/* --- GLOBAL ERROR MESSAGE (Added animate-pulse) --- */}
        {errorMessage && (
          <p className="text-center text-red-600 font-medium bg-red-50 border border-red-200 py-2 rounded-lg text-sm animate-pulse">
            {errorMessage}
          </p>
        )}

        {/* --- USER ID INPUT --- */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">User ID</label>
          <div className="relative group">
            {/* Icon Color Logic */}
            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors 
                ${getFieldError("regNo") ? "text-red-500" : "text-gray-400 group-focus-within:text-blue-600"}`}>
              <UserIcon />
            </div>
            <input
              type="text"
              value={userRegNo}
              onChange={(e) => setUserRegNo(e.target.value)}
              placeholder={role === 'Student' ? "Roll No (e.g., 21CS001)" : "Reg No (e.g., 12304017)"}
              className={`${inputBaseClass} ${getFieldError("regNo") ? inputErrorClass : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"}`}
            />
            {/* Field Error (Added animate-pulse) */}
            {getFieldError("regNo") && (
              <p className="mt-1 text-xs text-red-600 animate-pulse">{getFieldError("regNo")}</p>
            )}
          </div>
        </div>

        {/* --- PASSWORD INPUT --- */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">Password</label>
          <div className="relative group">
            {/* Icon Color Logic */}
            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors
                 ${getFieldError("password") ? "text-red-500" : "text-gray-400 group-focus-within:text-blue-600"}`}>
              <LockIcon />
            </div>
            <input
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="••••••••"
              className={`${inputBaseClass} ${getFieldError("password") ? inputErrorClass : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10"}`}
            />
            {/* Field Error (Added animate-pulse) */}
            {getFieldError("password") && (
              <p className="mt-1 text-xs text-red-600 animate-pulse">{getFieldError("password")}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3.5 md:py-4 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg shadow-blue-700/20 hover:shadow-blue-700/40 transition-all transform hover:-translate-y-0.5
            ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
          `}
        >
          {isLoading ? "Verifying..." : "Secure Login"}
        </button>

        {/* --- NEW: ALUMNI REGISTER LINK (Only appears for Alumni) --- */}
        {role === 'Alumni' && (
          <div className="text-center mt-4">
            <span className="text-slate-600 text-sm">Not registered yet? </span>
            <a href="/register" className="text-blue-700 font-bold text-sm hover:underline">
              Register Here
            </a>
          </div>
        )}

        {isMobile && (
          <div className="mt-6 md:mt-8 text-center pt-4 md:pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-500 mb-2 md:mb-3">Not a {role}?</p>
            <button
              type="button"
              onClick={() => setRole(targetRole)}
              className="text-blue-700 font-bold hover:underline relative z-50 cursor-pointer text-base"
            >
              Switch to {targetRole.charAt(0).toUpperCase() + targetRole.slice(1)} Login
            </button>
          </div>
        )}
      </form>
    </div>
  );
}