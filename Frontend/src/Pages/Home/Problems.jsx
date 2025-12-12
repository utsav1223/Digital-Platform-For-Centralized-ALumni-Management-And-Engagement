import { useState } from "react";
import { 
  Database, 
  Users, 
  MessageSquare, 
  Briefcase, 
  CheckCircle2, 
  Search, 
  Zap, 
  Calendar,
  AlertCircle 
} from "lucide-react";

export default function ProblemsSection() {
  const problems = [
    {
      frontTitle: "Outdated Alumni Databases",
      frontDesc: "Colleges struggle to maintain accurate records.",
      frontIcon: <Database className="w-8 h-8 text-red-500" />,
      frontBg: "bg-red-50",
      
      backTitle: "Verified Directory",
      backDesc: "A centralized, auto-updated alumni registry.",
      backIcon: <CheckCircle2 className="w-8 h-8 text-white" />,
      gradient: "from-blue-600 to-indigo-600",
    },
    {
      frontTitle: "Mentorship Gaps",
      frontDesc: "Students can't easily find guidance.",
      frontIcon: <Search className="w-8 h-8 text-orange-500" />,
      frontBg: "bg-orange-50",

      backTitle: "Direct Access",
      backDesc: "Connect with thousands of willing mentors.",
      backIcon: <Users className="w-8 h-8 text-white" />,
      gradient: "from-violet-600 to-purple-600",
    },
    {
      frontTitle: "Fragmented Communication",
      frontDesc: "No easy way to chat with seniors.",
      frontIcon: <MessageSquare className="w-8 h-8 text-amber-500" />,
      frontBg: "bg-amber-50",

      backTitle: "Instant Messaging",
      backDesc: "Real-time chat & networking features.",
      backIcon: <Zap className="w-8 h-8 text-white" />,
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      frontTitle: "Scattered Opportunities",
      frontDesc: "Jobs & events are hard to track.",
      frontIcon: <AlertCircle className="w-8 h-8 text-rose-500" />,
      frontBg: "bg-rose-50",

      backTitle: "Unified Dashboard",
      backDesc: "All exclusive jobs & events in one place.",
      backIcon: <Briefcase className="w-8 h-8 text-white" />,
      gradient: "from-pink-600 to-rose-600",
    },
  ];

  return (
    <section className="w-full py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Why Choose <span className="text-blue-600">AlumniConnect?</span>
          </h2>
          <p className="text-lg text-gray-600">
            We bridge the gap between institutions and their greatest asset—their alumni.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((item, i) => (
            <FlipCard key={i} {...item} />
          ))}
        </div>
      </div>

      {/* CSS for 3D Flip Effects */}
      <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </section>
  );
}

/* ------------------------
   Flip Card Component
------------------------ */
function FlipCard({ 
  frontTitle, frontDesc, frontIcon, frontBg, 
  backTitle, backDesc, backIcon, gradient 
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative h-[320px] w-full cursor-pointer group perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full duration-700 transition-all transform-style-3d shadow-xl rounded-2xl ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* --- FRONT SIDE (Problem) --- */}
        <div className="absolute inset-0 w-full h-full bg-white rounded-2xl p-8 flex flex-col items-center justify-center text-center backface-hidden border border-gray-100">
          {/* Icon Circle */}
          <div className={`w-16 h-16 ${frontBg} rounded-full flex items-center justify-center mb-6 shadow-sm`}>
            {frontIcon}
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {frontTitle}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            {frontDesc}
          </p>

          {/* Hover Hint */}
          <div className="absolute bottom-6 text-xs font-medium text-gray-400 uppercase tracking-widest opacity-60">
            Hover to Resolve
          </div>
        </div>

        {/* --- BACK SIDE (Solution) --- */}
        <div 
          className={`absolute inset-0 w-full h-full bg-gradient-to-br ${gradient} rounded-2xl p-8 flex flex-col items-center justify-center text-center text-white rotate-y-180 backface-hidden shadow-2xl`}
        >
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
            {backIcon}
          </div>
          
          <h3 className="text-xl font-bold mb-3">
            {backTitle}
          </h3>
          <p className="text-sm text-blue-50 leading-relaxed opacity-90">
            {backDesc}
          </p>
          
          <button className="mt-6 px-4 py-2 bg-white text-gray-900 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-opacity-90 transition-colors shadow-lg">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}