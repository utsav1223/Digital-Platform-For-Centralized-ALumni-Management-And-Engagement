import { useState } from "react";
import { FiPlus, FiMinus, FiHelpCircle } from "react-icons/fi";

const FAQS = [
  // Membership & Access
  {
    category: "Membership & Access",
    q: "Who is eligible to join AlumniConnect?",
    a: "Verified alumni and currently enrolled students of the institution can join. Each user undergoes authentication to maintain a trusted environment.",
  },
  {
    category: "Membership & Access",
    q: "Can I use my personal email to sign up?",
    a: "Yes, but you must verify your identity using institutional records or your registered mobile number before accessing full features.",
  },
  {
    category: "Membership & Access",
    q: "What information is required to create a professional profile?",
    a: "Provide your academic details, skills, and optionally your work experience. Adding achievements makes your profile stand out.",
  },

  // Mentorship
  {
    category: "Mentorship",
    q: "How do I request mentorship from an alumnus?",
    a: "Open the Alumni Directory, select a mentor's profile, and click 'Request Mentorship.' Add your goals so the mentor understands your needs.",
  },
  {
    category: "Mentorship",
    q: "What can I expect during mentorship sessions?",
    a: "Mentorship may involve career planning, interview prep, skill guidance, or industry insights—depending on the mentor’s expertise.",
  },
  {
    category: "Mentorship",
    q: "Are mentorship interactions monitored?",
    a: "Yes. All communication is monitored for safety. Inappropriate behavior can be reported through the platform.",
  },

  // Career & Jobs
  {
    category: "Career & Jobs",
    q: "Can alumni or recruiters post job opportunities?",
    a: "Yes. Approved recruiters and alumni can post job/internship openings, which appear in the Jobs section for students to apply.",
  },
  {
    category: "Career & Jobs",
    q: "How do I make my profile stand out to recruiters?",
    a: "Add a professional photo, detailed skills, certifications, and relevant achievements. Keeping your profile complete increases visibility.",
  },
  {
    category: "Career & Jobs",
    q: "Can I upload my resume or portfolio?",
    a: "Yes. You can upload resumes or link to GitHub, LinkedIn, or portfolio websites to give mentors and recruiters more context.",
  },

  // Networking
  {
    category: "Networking",
    q: "Can I connect with alumni from different industries?",
    a: "Absolutely. You can search for alumni by company, industry, skills, or location to build the right professional network.",
  },
  {
    category: "Networking",
    q: "Does the platform recommend alumni based on my interests?",
    a: "Yes. Recommendations are based on your career preferences, skills, and profile activity for better networking relevance.",
  },
  {
    category: "Networking",
    q: "Is it okay to message alumni for guidance?",
    a: "Yes, but always maintain a professional tone. Avoid spammy or repeated messages and focus on clear, respectful communication.",
  },

  // Privacy & Safety
  {
    category: "Privacy & Safety",
    q: "Is my contact information visible to everyone?",
    a: "No. Sensitive details remain private unless you choose to share them. The platform follows strict privacy standards.",
  },
  {
    category: "Privacy & Safety",
    q: "How does AlumniConnect ensure secure communication?",
    a: "The platform uses encrypted channels, secure authentication, and regular monitoring to keep interactions safe.",
  },
  {
    category: "Privacy & Safety",
    q: "What happens if someone misuses the platform?",
    a: "You can report profiles or messages. Violating accounts may be restricted or permanently banned after review.",
  },

  // Events & Activities
  {
    category: "Events & Activities",
    q: "Can alumni host webinars or professional sessions?",
    a: "Yes. Alumni can propose workshops or talks. Once approved by the admin, they become visible in the Events section.",
  },
  {
    category: "Events & Activities",
    q: "How do I register for events?",
    a: "Go to the Events section and click 'Register' on any event card. You will receive reminders before the event starts.",
  },
  {
    category: "Events & Activities",
    q: "Are event certificates provided?",
    a: "Event organizers may offer participation certificates depending on the type of workshop or professional session.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState(null);

  const toggle = (index) => {
    setActive((prev) => (prev === index ? null : index));
  };

  const categories = FAQS.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <section className="w-full py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <FiHelpCircle className="text-base" />
            <span>Support Center</span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about connecting, mentoring, and growing
            with AlumniConnect.
          </p>
        </div>

        {/* Categories Loop */}
        <div className="space-y-12">
          {Object.keys(categories).map((category, cIndex) => (
            <div key={cIndex} className="scroll-mt-24">
              {/* Category Heading */}
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-bold text-slate-800 shrink-0">
                  {category}
                </h3>
                <div className="h-px bg-slate-200 w-full rounded-full"></div>
              </div>

              {/* Accordion Items */}
              <div className="grid gap-4">
                {categories[category].map((faq, i) => {
                  const index = `${cIndex}-${i}`;
                  const isOpen = active === index;

                  return (
                    <div
                      key={index}
                      className={`group rounded-xl border transition-all duration-300 ${
                        isOpen
                          ? "bg-white border-blue-200 shadow-md ring-1 ring-blue-100"
                          : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm"
                      }`}
                    >
                      <button
                        onClick={() => toggle(index)}
                        className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-xl"
                      >
                        <span
                          className={`text-base font-semibold transition-colors duration-300 ${
                            isOpen ? "text-blue-700" : "text-slate-700"
                          }`}
                        >
                          {faq.q}
                        </span>

                        <span
                          className={`ml-4 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                            isOpen
                              ? "bg-blue-600 text-white rotate-180"
                              : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                          }`}
                        >
                          {isOpen ? <FiMinus /> : <FiPlus />}
                        </span>
                      </button>

                      {/* Smooth Animation using Grid Template Rows */}
                      <div
                        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100 pb-5"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="min-h-0 px-6">
                          <p className="text-slate-600 leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <p className="text-slate-900 font-semibold text-lg mb-2">
            Still have questions?
          </p>
          <p className="text-slate-500 mb-6">
            Can’t find the answer you’re looking for? Please chat to our
            friendly team.
          </p>
          <button className="bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}