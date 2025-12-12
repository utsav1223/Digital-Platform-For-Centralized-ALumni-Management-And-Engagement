import { useEffect, useRef } from "react";
import { UserPlus, FileEdit, Users, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Create Your Account",
      description: "Sign up instantly using your university credentials or LinkedIn. We verify your alumni status to ensure a trusted, exclusive network.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
      icon: <UserPlus className="w-6 h-6 text-white" />,
      color: "bg-blue-600",
      shadow: "shadow-blue-200",
    },
    {
      id: 2,
      title: "Curate Your Profile",
      description: "Sync your career history, highlight your skills, and define your mentorship goals. Let the community know how you can help or what you need.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
      icon: <FileEdit className="w-6 h-6 text-white" />,
      color: "bg-indigo-600",
      shadow: "shadow-indigo-200",
    },
    {
      id: 3,
      title: "Start Connecting",
      description: "Unlock the directory. Chat with mentors, register for exclusive events, and apply for alumni-referred jobs directly through the portal.",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop",
      icon: <Users className="w-6 h-6 text-white" />,
      color: "bg-violet-600",
      shadow: "shadow-violet-200",
    },
  ];

  return (
    <section className="w-full py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            Your Journey to <span className="text-blue-600">Better Connections</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Three simple steps to unlock a world of opportunities, mentorship, and career growth within your alumni network.
          </p>
        </div>

        {/* STEPS CONTAINER */}
        <div className="relative flex flex-col gap-24">
          
          {/* Central Line (Desktop Only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2" />

          {steps.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} />
          ))}
          
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
            <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Started Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------
   Reusable Step Component
------------------------------------ */
function StepCard({ step, index }) {
  const ref = useRef(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
        }
      },
      { threshold: 0.2 } // Trigger slightly earlier
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 opacity-0 translate-y-12 transition-all duration-1000 ease-out ${
        isEven ? "" : "md:flex-row-reverse"
      }`}
    >
      
      {/* 1. TEXT SECTION */}
      <div className={`flex-1 text-center md:text-left ${!isEven && "md:text-right"}`}>
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 shadow-lg ${step.color} ${step.shadow} ${!isEven && "md:ml-auto"}`}>
            {step.icon}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          {step.title}
        </h3>
        <p className="text-lg text-slate-600 leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* 2. TIMELINE DOT (Desktop) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-8 h-8 rounded-full bg-white border-4 border-slate-100 shadow-sm z-10">
        <div className={`w-2.5 h-2.5 rounded-full ${step.color}`} />
      </div>

      {/* 3. IMAGE SECTION */}
      <div className="flex-1 w-full">
        <div className="relative group perspective-1000">
          <div className={`absolute -inset-4 rounded-3xl opacity-20 blur-lg transition duration-500 group-hover:opacity-30 ${step.color}`} />
          <img
            src={step.image}
            alt={step.title}
            className="relative w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl border border-slate-100 transform transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </div>

    </div>
  );
}