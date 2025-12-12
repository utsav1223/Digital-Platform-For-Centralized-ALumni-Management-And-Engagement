import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onLinkClick = () => setOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b
        ${
          scrolled || open
            ? "bg-white/90 backdrop-blur-md border-gray-200 shadow-sm"
            : "bg-transparent border-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* --- BRAND IDENTITY --- */}
        <Link to="/" className="flex items-center gap-2.5 group" onClick={onLinkClick}>
          {/* Logo Icon (SVG) */}
          <div className="p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
            <svg
              className="w-7 h-7 text-blue-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-slate-900 leading-none tracking-tight">
              Alumni<span className="text-blue-600">Connect</span>
            </h2>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
              Official Portal
            </span>
          </div>
        </Link>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors relative group py-2"
                >
                  {l.label}
                  {/* Modern subtle underscore */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full opacity-80" />
                </a>
              </li>
            ))}
          </ul>

          <div className="w-px h-6 bg-gray-200 mx-2"></div>

          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-5 py-2.5 text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <button
          className="md:hidden p-2 text-slate-700 hover:bg-gray-100 rounded-lg transition"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                open ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* --- MOBILE MENU DRAWER --- */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={onLinkClick}
              className="text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg transition-colors"
            >
              {l.label}
            </a>
          ))}
          
          <div className="h-px bg-gray-100 my-2"></div>

          <div className="flex flex-col gap-3">
            <Link
              to="/login"
              onClick={onLinkClick}
              className="w-full text-center py-3 text-slate-700 font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              Log In
            </Link>
            <Link
              to="/register"
              onClick={onLinkClick}
              className="w-full text-center py-3 text-white font-semibold bg-blue-600 rounded-lg shadow-md active:scale-95 transition"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}