import { useEffect } from "react";

export default function Works() {
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.3 }
    );

    revealElements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <section className="w-full py-24 bg-[#F8FAFC]">

      {/* HEADING */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-20">
        How <span className="text-blue-600">It Works</span>
      </h2>

      <div className="max-w-6xl mx-auto px-6 space-y-28">

        {/* ------------ STEP 1 ------------ */}
        <div className="flex flex-col md:flex-row items-center gap-12 reveal opacity-0 translate-y-10 transition-all duration-700">

          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c"
              alt="Step 1"
              className="rounded-3xl shadow-lg w-full object-cover h-80"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2">
            <div className="w-16 h-16 bg-blue-600 text-white text-3xl font-bold 
                rounded-full shadow flex items-center justify-center mb-5">
              1
            </div>

            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Create Your Account
            </h3>

            <p className="mt-4 text-gray-600 text-lg leading-relaxed">
              Sign up using email or Google and instantly join your verified campus
              alumni ecosystem.
            </p>
          </div>
        </div>

        {/* ------------ STEP 2 ------------ */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 reveal opacity-0 translate-y-10 transition-all duration-700 delay-150">

          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Step 2"
              className="rounded-3xl shadow-lg w-full object-cover h-80"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2">
            <div className="w-16 h-16 bg-yellow-500 text-white text-3xl font-bold 
                rounded-full shadow flex items-center justify-center mb-5">
              2
            </div>

            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Build Your Profile
            </h3>

            <p className="mt-4 text-gray-600 text-lg leading-relaxed">
              Add your education, skills, interests and goals to attract mentors,
              recruiters and senior alumni.
            </p>
          </div>
        </div>

        {/* ------------ STEP 3 ------------ */}
        <div className="flex flex-col md:flex-row items-center gap-12 reveal opacity-0 translate-y-10 transition-all duration-700 delay-300">

          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="Step 3"
              className="rounded-3xl shadow-lg w-full object-cover h-80"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2">
            <div className="w-16 h-16 bg-green-600 text-white text-3xl font-bold 
                rounded-full shadow flex items-center justify-center mb-5">
              3
            </div>

            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Start Connecting
            </h3>

            <p className="mt-4 text-gray-600 text-lg leading-relaxed">
              Chat with mentors, attend events, explore jobs, and grow your career
              through alumni-powered opportunities.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
