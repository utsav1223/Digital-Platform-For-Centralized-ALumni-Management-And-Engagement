import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0B0F19] pt-20 pb-8 mt-20 border-t border-gray-800 relative overflow-hidden">
      
      {/* DECORATIVE TOP GRADIENT */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* COLUMN 1: BRANDING */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Alumni<span className="text-yellow-400">Connect</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Bridging the gap between past and present. We build lasting relationships through mentorship, career opportunities, and community events.
          </p>
          
          {/* Social Links (Professional Style) */}
          <div className="flex gap-4 pt-2">
            {[
              { icon: "fa-facebook-f", href: "#" },
              { icon: "fa-twitter", href: "#" }, // Updated to X/Twitter
              { icon: "fa-linkedin-in", href: "#" },
              { icon: "fa-instagram", href: "#" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-yellow-500 hover:text-black transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              >
                <i className={`fa-brands ${social.icon}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* COLUMN 2: QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
            Quick Links
            <span className="absolute left-0 -bottom-2 w-12 h-1 bg-yellow-500 rounded-full"></span>
          </h3>
          <ul className="space-y-3">
            {["Home", "About Us", "Events", "Mentorship", "Blog"].map((item) => (
              <li key={item}>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-yellow-400 transition-colors"></span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 3: SUPPORT & LEGAL */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
            Support
            <span className="absolute left-0 -bottom-2 w-12 h-1 bg-yellow-500 rounded-full"></span>
          </h3>
          <ul className="space-y-3">
            {["Help Center", "Privacy Policy", "Terms of Service", "Cookie Policy", "Contact Us"].map((item) => (
              <li key={item}>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 4: NEWSLETTER */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
            Stay Updated
            <span className="absolute left-0 -bottom-2 w-12 h-1 bg-yellow-500 rounded-full"></span>
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe to our newsletter for the latest alumni news and event updates.
          </p>
          <form className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 text-gray-300 text-sm placeholder-gray-500 transition-all"
            />
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition-all transform active:scale-95 text-sm">
              Subscribe Now
            </button>
          </form>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800 pt-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} <span className="text-white">AlumniConnect</span>. All rights reserved.
          </p>
          
          <div className="flex gap-6 text-sm text-gray-500">
             <a href="#" className="hover:text-yellow-400 transition-colors">Privacy</a>
             <a href="#" className="hover:text-yellow-400 transition-colors">Terms</a>
             <a href="#" className="hover:text-yellow-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}