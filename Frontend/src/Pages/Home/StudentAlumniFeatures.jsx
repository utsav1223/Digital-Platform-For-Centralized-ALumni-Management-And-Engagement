import { useState } from "react";

export default function StudentAlumniFeatures() {
  const [activeTab, setActiveTab] = useState("students");
  const [openFeature, setOpenFeature] = useState(null);
  const [animState, setAnimState] = useState("closed");

  const studentFeatures = [
    {
      id: "find-alumni",
      title: "Find Alumni Easily",
      desc: "Search and connect with alumni from various batches, branches and industries worldwide.",
      img: "https://plus.unsplash.com/premium_photo-1682974406959-7f7202c932b0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      emoji: "🎓",
      extras: {
        benefits: [
          "Filter by batch, department, location and company",
          "Saved searches & email alerts",
        ],
        steps: [
          "Open directory → Apply filters",
          "Visit profile → Connect or Message",
        ],
        contact: "alumni-directory@alumniconnect.com",
      },
    },
    {
      id: "request-mentorship",
      title: "Request Mentorship",
      desc: "Get expert career guidance, interview prep, and real-world insights directly from alumni.",
      img: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      emoji: "🤝",
      extras: {
        benefits: [
          "1-on-1 guidance from industry experts",
          "Scheduled mentorship sessions",
        ],
        steps: ["Find mentor → Request session", "Attend call → Get feedback"],
        contact: "mentorship@alumniconnect.com",
      },
    },
    {
      id: "jobs-internships",
      title: "Explore Jobs & Internships",
      desc: "Access exclusive roles shared by alumni working in top organizations.",
      img: "https://media.istockphoto.com/id/673873568/photo/software-engineers-working-on-project-and-programming-in-company.jpg?s=612x612&w=0&k=20&c=gcBkyI_4UEQ4IIyekgegOzJ66BamWMpcnwH3c7plzcc=",
      emoji: "💼",
      extras: {
        benefits: ["Verified alumni referrals", "Quick apply, saved jobs"],
        steps: ["Browse → Apply → Track status"],
        contact: "jobs@alumniconnect.com",
      },
    },
  ];

  const alumniFeatures = [
    {
      id: "mentor-students",
      title: "Mentor Students",
      desc: "Guide students with career insights and interview preparation.",
      img: "https://plus.unsplash.com/premium_photo-1663126346116-f0ccaf232268?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      emoji: "🧑‍🏫",
      extras: {
        benefits: ["Support student growth", "Set office hours"],
        steps: ["Create availability → Accept mentees → Mentor"],
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
        benefits: ["Boost student placements", "Fast referral tracking"],
        steps: ["Post job → Add instructions → Track applicants"],
        contact: "referrals@alumniconnect.com",
      },
    },
    {
      id: "post-updates",
      title: "Post Alumni Updates",
      desc: "Share achievements and success stories with your college network.",
      img: "https://images.unsplash.com/photo-1758691736548-073bc97cdff4?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      emoji: "📰",
      extras: {
        benefits: ["Inspire students", "Build alumni community presence"],
        steps: ["Write → Attach media → Publish"],
        contact: "community@alumniconnect.com",
      },
    },
  ];

  const data = activeTab === "students" ? studentFeatures : alumniFeatures;

  const openModal = (feature) => {
    setOpenFeature(feature);
    setAnimState("opening");
    requestAnimationFrame(() => setAnimState("open"));
  };

  const closeModal = () => {
    setAnimState("closing");
    setTimeout(() => {
      setOpenFeature(null);
      setAnimState("closed");
    }, 250);
  };

  return (
    <section id="features" className="w-full py-20 bg-[#F8FAFC]">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
        Platform <span className="text-blue-600">Features</span>
      </h2>

      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className="bg-gray-200 p-2 rounded-full flex gap-2 shadow-sm">
          <button
            onClick={() => setActiveTab("students")}
            className={`px-6 py-2 rounded-full font-semibold transition 
            ${activeTab === "students" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-300"}`}
          >
            🎓 Students
          </button>
          <button
            onClick={() => setActiveTab("alumni")}
            className={`px-6 py-2 rounded-full font-semibold transition 
            ${activeTab === "alumni" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-300"}`}
          >
            💼 Alumni
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => openModal(item)}
            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden hover:-translate-y-2"
          >
            <div className="relative h-56">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
              <div className="absolute left-5 bottom-5 bg-white/90 text-3xl w-14 h-14 flex items-center justify-center rounded-xl shadow">
                {item.emoji}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
              <p className="text-gray-600 mt-3">{item.desc}</p>
              <button className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {openFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          <div
            className={`
              relative bg-white max-w-3xl w-full rounded-2xl shadow-2xl overflow-hidden
              transform transition-all duration-300
              ${animState === "opening" ? "opacity-0 scale-95" : ""}
              ${animState === "open" ? "opacity-100 scale-100" : ""}
              ${animState === "closing" ? "opacity-0 scale-95" : ""}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="h-56 w-full">
              <img
                src={openFeature.img}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-3xl font-bold text-gray-900">
                {openFeature.title}
              </h3>
              <p className="mt-2 text-gray-600">{openFeature.desc}</p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Benefits</h4>
                  <ul className="mt-2 text-gray-600 list-disc list-inside space-y-1">
                    {openFeature.extras.benefits.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Steps</h4>
                  <ol className="mt-2 text-gray-600 list-decimal list-inside space-y-1">
                    {openFeature.extras.steps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <p className="text-gray-600 text-sm">
                  <strong>Contact:</strong>{" "}
                  <a
                    href={`mailto:${openFeature.extras.contact}`}
                    className="text-blue-600"
                  >
                    {openFeature.extras.contact}
                  </a>
                </p>

                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg shadow hover:shadow-xl transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
