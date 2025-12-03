import { useState } from "react";

export default function ProblemsSection() {
  const problems = [
    {
      frontTitle: "Colleges lack an updated alumni database",
      frontIcon: "❗",
      frontColor: "text-red-500",
      backTitle: "A centralized verified alumni directory",
      backIcon: "✅",
      backColor: "text-green-400",
    },
    {
      frontTitle: "Students cannot find mentors",
      frontIcon: "🧭",
      frontColor: "text-orange-500",
      backTitle: "Direct access to thousands of mentors",
      backIcon: "✨",
      backColor: "text-blue-300",
    },
    {
      frontTitle: "No easy platform for communication",
      frontIcon: "💬",
      frontColor: "text-orange-500",
      backTitle: "Chat & connect instantly with alumni",
      backIcon: "⚡",
      backColor: "text-yellow-300",
    },
    {
      frontTitle: "No unified place for jobs/events",
      frontIcon: "📅",
      frontColor: "text-red-400",
      backTitle: "All jobs & events in one dashboard",
      backIcon: "🚀",
      backColor: "text-green-300",
    },
  ];

  return (
    <section className="w-full py-24 bg-white">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-14">
        Why <span className="text-blue-600">AlumniConnect?</span>
      </h2>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {problems.map((item, i) => (
          <FlipCard key={i} {...item} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------
    Flip Card Component
------------------------ */
function FlipCard({ frontTitle, backTitle, frontIcon, backIcon, frontColor, backColor }) {
  const [flip, setFlip] = useState(false);

  return (
    <div
      className="relative h-64 cursor-pointer perspective transform transition-transform"
      onMouseEnter={() => setFlip(true)}
      onMouseLeave={() => setFlip(false)}
      onClick={() => setFlip(!flip)}
    >
      <div
        className={`relative w-full h-full duration-700 transform-style-preserve-3d ${
          flip ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 backface-hidden">
          <div className={`text-6xl mb-4 ${frontColor}`}>{frontIcon}</div>
          <h3 className="text-lg font-semibold text-gray-800 text-center leading-snug">
            {frontTitle}
          </h3>
        </div>

        {/* Back */}
        <div className="absolute inset-0 bg-gray-900 text-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-6 rotate-y-180 backface-hidden">
          <div className={`text-6xl mb-4 ${backColor}`}>{backIcon}</div>
          <h3 className="text-lg font-semibold text-center leading-snug">
            {backTitle}
          </h3>
        </div>
      </div>
    </div>
  );
}
