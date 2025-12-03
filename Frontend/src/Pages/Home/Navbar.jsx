import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // <--- 1. Import Link

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu on resize
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onLinkClick = () => setOpen(false);

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300
        ${scrolled ? "bg-white/95 shadow-md backdrop-blur-xl" : "bg-white/80 backdrop-blur-md"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <h2 className="text-2xl font-bold text-blue-700 leading-none transition-all group-hover:tracking-wide">
            Alumni<span className="text-yellow-500">Connect</span>
          </h2>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10">

          {/* NAV LINKS */}
          <ul className="flex gap-8 text-gray-700 font-medium">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="relative group text-gray-800 hover:text-blue-600 transition-all"
                >
                  {l.label}
                  {/* hover underline */}
                  <span
                    className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-blue-600 
                    transition-all group-hover:w-full group-hover:left-0"
                  ></span>
                </a>
              </li>
            ))}
          </ul>

          {/* BUTTONS */}
          <div className="flex gap-4 ml-6">
            {/* --- 2. DESKTOP LOGIN LINK --- */}
            <Link
              to="/login"
              className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold 
              hover:bg-blue-600 hover:text-white transition shadow-sm"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold 
              hover:bg-blue-700 transition shadow-sm"
            >
              Register
            </Link>
          </div>

        </div>

        {/* MOBILE HAMBURGER */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <div className="w-6 h-5 relative">
            <span
              className={`absolute left-0 w-6 h-[2px] bg-gray-900 transition-all duration-300
                ${open ? "rotate-45 top-1/2" : "top-0"}
              `}
            />
            <span
              className={`absolute left-0 top-1/2 w-6 h-[2px] bg-gray-900 transition-all duration-300
                ${open ? "opacity-0" : "opacity-100"}
              `}
            />
            <span
              className={`absolute left-0 w-6 h-[2px] bg-gray-900 transition-all duration-300
                ${open ? "-rotate-45 top-1/2" : "top-full"}
              `}
            />
          </div>
        </button>

      </div>

      {/* ⭐ MOBILE MENU FIXED + RESPONSIVE */}
      <div
        className={`
    md:hidden absolute left-0 right-0 top-full bg-white/95 backdrop-blur-xl shadow-lg z-40 
    transition-all duration-300 overflow-hidden
    ${open ? "max-h-screen opacity-100 overflow-y-auto" : "max-h-0 opacity-0 pointer-events-none"}
  `}
      >

        <div className="px-6 py-6 flex flex-col gap-4">

          {/* LINKS */}
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={onLinkClick}
              className="text-lg py-2 rounded font-medium text-gray-800 hover:bg-gray-100 transition"
            >
              {l.label}
            </a>
          ))}

          <div className="border-t border-gray-300 pt-4 mt-2"></div>

          {/* LOGIN / REGISTER BUTTONS */}
          
          {/* --- 3. MOBILE LOGIN LINK --- */}
          <Link
            to="/login"
            onClick={onLinkClick}
            className="w-full text-center py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold 
            hover:bg-blue-600 hover:text-white transition shadow-sm"
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={onLinkClick}
            className="w-full text-center py-3 bg-blue-600 text-white rounded-lg font-semibold 
            hover:bg-blue-700 transition shadow-sm"
          >
            Register
          </Link>

          <p className="pt-4 text-sm text-gray-500">© {new Date().getFullYear()} AlumniConnect</p>
        </div>
      </div>
    </nav>
  );
}