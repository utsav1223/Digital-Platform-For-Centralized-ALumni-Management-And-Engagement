import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

/* ---------------- ICONS (Styled) ---------------- */
const MenuIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const UserIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const DashboardIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const LogoutIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { auth, checkAuth } = useAuth();
  // Ensure we navigate after logout
  const navigate = useNavigate();

  /* ---------------- DERIVED STATE ---------------- */
  const isLoggedIn = auth.alumniLoggedIn || auth.studentLoggedIn;

  const displayName = auth.alumniLoggedIn
    ? auth.alumni?.fullName
    : auth.student?.name;

  // Handle fallback if image fails to load
  // const profileImgSrc = auth.alumni?.profileImage
  //   ? `http://localhost:8000${auth.alumni.profileImage}`
  //   : "/default-avatar.png";

  const profileImgSrc = auth.alumniLoggedIn
    ? auth.alumni?.profileImage
      ? `http://localhost:8000${auth.alumni.profileImage}`
      : "/default-avatar.png"
    : auth.student?.profileImage
      ? `http://localhost:8000${auth.student.profileImage}`
      : "/default-avatar.png";


  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenus = () => {
    setOpen(false);
    setProfileOpen(false);
  };

  /* ---------------- HANDLERS ---------------- */
  const handleLogout = async () => {
    try {
      const url = auth.alumniLoggedIn
        ? "http://localhost:8000/api/alumni/logout"
        : "http://localhost:8000/api/student/logout";

      await fetch(url, { method: "POST", credentials: "include" });
      await checkAuth();
      closeMenus();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${scrolled || open
            ? "bg-white/90 backdrop-blur-lg border-slate-200 shadow-sm"
            : "bg-transparent border-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" onClick={closeMenus} className="flex items-center gap-2.5 group">
            <div className="p-2 bg-blue-600 rounded-lg shadow-md transition-transform group-hover:scale-105">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              Alumni<span className="text-blue-600">Connect</span>
            </h2>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-8">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="w-px h-6 bg-slate-200" />

            {/* AUTH ACTIONS */}
            {!auth.loading && !isLoggedIn && (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-full shadow-md shadow-blue-200 hover:bg-blue-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </div>
            )}

            {!auth.loading && isLoggedIn && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`flex items-center gap-3 px-2 py-1.5 border rounded-full transition-all duration-200 ${profileOpen ? "bg-slate-50 border-blue-200 ring-2 ring-blue-50" : "bg-white border-slate-200 hover:border-blue-300"
                    }`}
                >
                  <img
                    src={profileImgSrc}
                    onError={(e) => (e.target.src = "/default-avatar.png")}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border border-slate-100"
                  />
                  <span className="text-sm font-semibold text-slate-700 pr-2">
                    {displayName?.split(" ")[0]}
                  </span>
                  {/* Chevron for UX hint */}
                  <svg className={`w-4 h-4 text-slate-400 transition-transform ${profileOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* DROPDOWN */}
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 bg-slate-50 border-b border-slate-100">
                      <p className="text-sm font-medium text-slate-500">Signed in as</p>
                      <p className="font-bold text-slate-800 truncate">{displayName}</p>
                    </div>

                    <div className="p-2">
                      <Link
                        to={auth.alumniLoggedIn ? "/alumnidashboard" : "/studentdashboard"}
                        onClick={closeMenus}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <DashboardIcon className="w-4 h-4 text-slate-400" />
                        Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <LogoutIcon className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {open ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* ---------------- MOBILE MENU (Added) ---------------- */}
        {/* Rendered conditionally to slide down */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg transition-all duration-300 origin-top overflow-hidden ${open ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0 py-0"
            }`}
        >
          <div className="flex flex-col px-6 space-y-4">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={closeMenus}
                className="text-base font-medium text-slate-600 hover:text-blue-600"
              >
                {l.label}
              </a>
            ))}

            <hr className="border-slate-100" />

            {!auth.loading && !isLoggedIn && (
              <div className="flex flex-col gap-3">
                <Link to="/login" onClick={closeMenus} className="w-full py-3 text-center text-sm font-semibold text-slate-600 bg-slate-50 rounded-lg">
                  Log In
                </Link>
                <Link to="/register" onClick={closeMenus} className="w-full py-3 text-center text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm">
                  Get Started
                </Link>
              </div>
            )}

            {!auth.loading && isLoggedIn && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <img src={profileImgSrc} className="w-10 h-10 rounded-full object-cover" alt="Profile" />
                  <div>
                    <p className="font-semibold text-slate-900">{displayName}</p>
                    <p className="text-xs text-slate-500">{auth.alumniLoggedIn ? "Alumni Account" : "Student Account"}</p>
                  </div>
                </div>
                <Link
                  to={auth.alumniLoggedIn ? "/alumnidashboard" : "/studentdashboard"}
                  onClick={closeMenus}
                  className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-lg text-sm font-medium text-slate-700"
                >
                  <DashboardIcon className="w-5 h-5" />
                  Go to Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50"
                >
                  <LogoutIcon className="w-5 h-5" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* Spacer to prevent content jumping if nav is fixed */}
      {/* <div className="h-16 md:h-20" /> */}
    </>
  );
}