import { useState, useEffect } from "react";

// Helper for conditional class names
const classNames = (...classes) => classes.filter(Boolean).join(" ");

export default function StudentAlumniFeatures() {
  const [activeTab, setActiveTab] = useState("students");
  const [openFeature, setOpenFeature] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Data preserved from your original code
  const studentFeatures = [
    {
      id: "find-alumni",
      title: "Find Alumni Easily",
      desc: "Search and connect with alumni from various batches, branches and industries worldwide.",
      img: "https://plus.unsplash.com/premium_photo-1682974406959-7f7202c932b0?q=80&w=1470&auto=format&fit=crop",
      emoji: "🎓",
      extras: {
        benefits: ["Filter by batch & location", "Saved searches & alerts"],
        steps: ["Open directory", "Apply filters", "Connect"],
        contact: "alumni-directory@alumniconnect.com",
      },
    },
    {
      id: "request-mentorship",
      title: "Request Mentorship",
      desc: "Get expert career guidance, interview prep, and real-world insights directly from alumni.",
      img: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1470&auto=format&fit=crop",
      emoji: "🤝",
      extras: {
        benefits: ["1-on-1 guidance", "Scheduled sessions"],
        steps: ["Find mentor", "Request session", "Get feedback"],
        contact: "mentorship@alumniconnect.com",
      },
    },
    {
      id: "jobs-internships",
      title: "Jobs & Internships",
      desc: "Access exclusive roles shared by alumni working in top organizations.",
      img: "https://media.istockphoto.com/id/673873568/photo/software-engineers-working-on-project-and-programming-in-company.jpg?s=612x612&w=0&k=20&c=gcBkyI_4UEQ4IIyekgegOzJ66BamWMpcnwH3c7plzcc=",
      emoji: "💼",
      extras: {
        benefits: ["Verified referrals", "Quick apply"],
        steps: ["Browse", "Apply", "Track status"],
        contact: "jobs@alumniconnect.com",
      },
    },
  ];

  const alumniFeatures = [
    {
      id: "mentor-students",
      title: "Mentor Students",
      desc: "Guide students with career insights and interview preparation.",
      img: "https://plus.unsplash.com/premium_photo-1663126346116-f0ccaf232268?q=80&w=1470&auto=format&fit=crop",
      emoji: "🧑‍🏫",
      extras: {
        benefits: ["Support student growth", "Set office hours"],
        steps: ["Set availability", "Accept mentees", "Mentor"],
        contact: "mentor@alumniconnect.com",
      },
    },
    {
      id: "share-referrals",
      title: "Share Job Referrals",
      desc: "Help students by sharing verified job openings from your company.",
      img: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1600&auto=format&fit=crop",
      emoji: "📢",
      extras: {
        benefits: ["Boost placements", "Referral tracking"],
        steps: ["Post job", "Add instructions", "Track"],
        contact: "referrals@alumniconnect.com",
      },
    },
    {
      id: "post-updates",
      title: "Post Updates",
      desc: "Share achievements and success stories with your college network.",
      img: "https://images.unsplash.com/photo-1758691736548-073bc97cdff4?q=80&w=1632&auto=format&fit=crop",
      emoji: "📰",
      extras: {
        benefits: ["Inspire students", "Build presence"],
        steps: ["Write", "Attach media", "Publish"],
        contact: "community@alumniconnect.com",
      },
    },
  ];

  const data = activeTab === "students" ? studentFeatures : alumniFeatures;

  // Handle Modal Open
  const handleOpen = (feature) => {
    setOpenFeature(feature);
    setTimeout(() => setIsAnimating(true), 10);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  // Handle Modal Close
  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setOpenFeature(null);
      document.body.style.overflow = "unset";
    }, 300);
  };

  // Close on Escape Key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section className="w-full py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold tracking-wide uppercase mb-4 border border-indigo-100">
            Platform Features
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Powerful tools for <span className="text-indigo-600">Growth</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Whether you are a student looking for guidance or an alumni looking to give back, we have built the perfect ecosystem for you.
          </p>
        </div>

        {/* Professional Segmented Control Tabs */}
        <div className="flex justify-center mb-16">
          <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm inline-flex">
            {["students", "alumni"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={classNames(
                  "px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ease-out",
                  activeTab === tab
                    ? "bg-slate-900 text-white shadow-md transform scale-[1.02]"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                {tab === "students" ? "🎓 For Students" : "💼 For Alumni"}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpen(item)}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Card Image Area */}
              <div className="relative h-52 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10" />
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm z-20">
                  <span className="text-xl">{item.emoji}</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 mt-3 text-sm leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
                
                <div className="mt-6 flex items-center text-indigo-600 font-semibold text-sm">
                  <span>Explore Feature</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Modal Overlay */}
      {openFeature && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className={classNames(
              "absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300",
              isAnimating ? "opacity-100" : "opacity-0"
            )}
            onClick={handleClose}
          />

          {/* Modal Panel */}
          <div
            className={classNames(
              "relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transform transition-all duration-300 ease-out",
              isAnimating ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image (Left Side) */}
            <div className="w-full md:w-2/5 h-48 md:h-auto relative">
              <img
                src={openFeature.img}
                alt={openFeature.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent md:bg-gradient-to-r" />
              <div className="absolute bottom-4 left-4 text-white md:hidden">
                <span className="text-4xl">{openFeature.emoji}</span>
              </div>
            </div>

            {/* Modal Content (Right Side) */}
            <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col h-full bg-white">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="mb-6 hidden md:block text-4xl">{openFeature.emoji}</div>
              
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                {openFeature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                {openFeature.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 flex-grow">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">
                    Key Benefits
                  </h4>
                  <ul className="space-y-3">
                    {openFeature.extras.benefits.map((b, i) => (
                      <li key={i} className="flex items-start text-slate-600 text-sm">
                        <svg className="w-5 h-5 text-green-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">
                    How it works
                  </h4>
                  <ul className="space-y-3">
                    {openFeature.extras.steps.map((s, i) => (
                      <li key={i} className="flex items-start text-slate-600 text-sm">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold mr-2 shrink-0">
                          {i + 1}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer Action */}
              <div className="pt-6 mt-auto border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-slate-500">
                  Questions? <a href={`mailto:${openFeature.extras.contact}`} className="text-indigo-600 font-medium hover:underline">Contact Support</a>
                </div>
                <button
                   onClick={handleClose}
                   className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition shadow-lg hover:shadow-xl"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}