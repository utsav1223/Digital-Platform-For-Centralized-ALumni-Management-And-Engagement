import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Priya Sharma",
    role: "Student",
    text: "AlumniConnect helped me find a mentor who guided me through interview preparation. The platform feels simple and motivating!",
  },
  {
    img: "https://randomuser.me/api/portraits/men/36.jpg",
    name: "Arvind Patel",
    role: "Alumni",
    text: "I enjoy mentoring juniors. Posting job referrals is easy, and students respond with interest. It feels good to give back.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "Dr. Rakesh Kumar",
    role: "Admin",
    text: "Managing alumni engagement has become effortless. Our community is more active than ever before.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "Sneha Raj",
    role: "Student",
    text: "The resume review session with an alumnus helped me secure my internship! Highly recommended.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/11.jpg",
    name: "Amit Verma",
    role: "Alumni",
    text: "A great platform to stay connected with my college and offer support to students entering the workforce.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/32.jpg",
    name: "Karishma Singh",
    role: "Alumni",
    text: "Loved conducting a workshop! The participation and curiosity from students were amazing.",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-24 bg-slate-50 relative overflow-hidden">
      
      {/* Background Pattern (Subtle Dot Grid) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-16 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Trusted by our <span className="text-blue-600">Community</span>
        </h2>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Hear from students, alumni, and administrators who are transforming their professional networks with AlumniConnect.
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden group">
        
        {/* Gradient Fade Edges */}
        <div className="absolute top-0 left-0 z-20 h-full w-24 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 z-20 h-full w-24 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex gap-6 w-max animate-infinite-scroll group-hover:[animation-play-state:paused] px-6">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="
                w-[350px] flex-shrink-0
                bg-white p-6 rounded-2xl
                shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
                border border-slate-100
                hover:border-blue-100 transition-colors duration-300
              "
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="text-blue-100 text-3xl mb-4" />

              {/* Text */}
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                "{t.text}"
              </p>

              {/* User Profile */}
              <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-50"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                  <span className={`
                    text-xs px-2 py-0.5 rounded-full font-medium
                    ${t.role === 'Student' ? 'bg-green-100 text-green-700' : 
                      t.role === 'Alumni' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}
                  `}>
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Internal Style for Keyframes (No external CSS needed) */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
}