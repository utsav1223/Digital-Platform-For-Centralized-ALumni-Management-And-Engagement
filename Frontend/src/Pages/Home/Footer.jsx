export default function Footer() {
  return (
    <footer className="w-full bg-[#0B0F19] text-gray-300 py-12 mt-20">

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Alumni<span className="text-yellow-400">Connect</span>
          </h2>

          <p className="mt-4 text-gray-400 text-sm max-w-sm">
            Connecting students, alumni, and institutions through mentorship,
            opportunities, and powerful community engagement.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg text-white font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-3">
            {["About Us", "Privacy Policy", "Terms & Conditions", "Contact"].map(
              (item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="relative inline-block hover:text-white transition group"
                  >
                    {item}
                    {/* Underline animation */}
                    <span
                      className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-yellow-400 
                      group-hover:w-full group-hover:left-0 transition-all duration-300"
                    ></span>
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* SOCIAL LINKS */}
        <div>
          <h3 className="text-lg text-white font-semibold mb-4">Follow Us</h3>

          <div className="flex items-center gap-4">
            {/* Facebook */}
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full transition"
            >
              <i className="fa-brands fa-facebook-f text-white"></i>
            </a>

            {/* Instagram */}
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full transition"
            >
              <i className="fa-brands fa-instagram text-white"></i>
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full transition"
            >
              <i className="fa-brands fa-linkedin-in text-white"></i>
            </a>

            {/* Twitter */}
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full transition"
            >
              <i className="fa-brands fa-x-twitter text-white"></i>
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM LINE */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} <span className="text-white font-semibold">AlumniConnect</span>.  
        All rights reserved.
      </div>
    </footer>
  );
}
