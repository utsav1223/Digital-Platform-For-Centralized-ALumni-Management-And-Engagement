import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const FAQS = [
  // Membership & Access
  {
    category: "Membership & Access",
    q: "Who is eligible to join AlumniConnect?",
    a: "Verified alumni and currently enrolled students of the institution can join. Each user undergoes authentication to maintain a trusted environment."
  },
  {
    category: "Membership & Access",
    q: "Can I use my personal email to sign up?",
    a: "Yes, but you must verify your identity using institutional records or your registered mobile number before accessing full features."
  },
  {
    category: "Membership & Access",
    q: "What information is required to create a professional profile?",
    a: "Provide your academic details, skills, and optionally your work experience. Adding achievements makes your profile stand out."
  },

  // Mentorship
  {
    category: "Mentorship",
    q: "How do I request mentorship from an alumnus?",
    a: "Open the Alumni Directory, select a mentor's profile, and click 'Request Mentorship.' Add your goals so the mentor understands your needs."
  },
  {
    category: "Mentorship",
    q: "What can I expect during mentorship sessions?",
    a: "Mentorship may involve career planning, interview prep, skill guidance, or industry insights—depending on the mentor’s expertise."
  },
  {
    category: "Mentorship",
    q: "Are mentorship interactions monitored?",
    a: "Yes. All communication is monitored for safety. Inappropriate behavior can be reported through the platform."
  },

  // Career & Jobs
  {
    category: "Career & Jobs",
    q: "Can alumni or recruiters post job opportunities?",
    a: "Yes. Approved recruiters and alumni can post job/internship openings, which appear in the Jobs section for students to apply."
  },
  {
    category: "Career & Jobs",
    q: "How do I make my profile stand out to recruiters?",
    a: "Add a professional photo, detailed skills, certifications, and relevant achievements. Keeping your profile complete increases visibility."
  },
  {
    category: "Career & Jobs",
    q: "Can I upload my resume or portfolio?",
    a: "Yes. You can upload resumes or link to GitHub, LinkedIn, or portfolio websites to give mentors and recruiters more context."
  },

  // Networking
  {
    category: "Networking",
    q: "Can I connect with alumni from different industries?",
    a: "Absolutely. You can search for alumni by company, industry, skills, or location to build the right professional network."
  },
  {
    category: "Networking",
    q: "Does the platform recommend alumni based on my interests?",
    a: "Yes. Recommendations are based on your career preferences, skills, and profile activity for better networking relevance."
  },
  {
    category: "Networking",
    q: "Is it okay to message alumni for guidance?",
    a: "Yes, but always maintain a professional tone. Avoid spammy or repeated messages and focus on clear, respectful communication."
  },

  // Privacy & Safety
  {
    category: "Privacy & Safety",
    q: "Is my contact information visible to everyone?",
    a: "No. Sensitive details remain private unless you choose to share them. The platform follows strict privacy standards."
  },
  {
    category: "Privacy & Safety",
    q: "How does AlumniConnect ensure secure communication?",
    a: "The platform uses encrypted channels, secure authentication, and regular monitoring to keep interactions safe."
  },
  {
    category: "Privacy & Safety",
    q: "What happens if someone misuses the platform?",
    a: "You can report profiles or messages. Violating accounts may be restricted or permanently banned after review."
  },

  // Events & Activities
  {
    category: "Events & Activities",
    q: "Can alumni host webinars or professional sessions?",
    a: "Yes. Alumni can propose workshops or talks. Once approved by the admin, they become visible in the Events section."
  },
  {
    category: "Events & Activities",
    q: "How do I register for events?",
    a: "Go to the Events section and click 'Register' on any event card. You will receive reminders before the event starts."
  },
  {
    category: "Events & Activities",
    q: "Are event certificates provided?",
    a: "Event organizers may offer participation certificates depending on the type of workshop or professional session."
  }
];

export default function FAQ() {
  const [active, setActive] = useState(null);

  const toggle = (index) => {
    setActive((prev) => (prev === index ? null : index));
  };

  // Group FAQs by category
  const categories = FAQS.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <section className="w-full py-24 bg-gradient-to-b from-white to-gray-100">

      {/* Heading */}
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-14">
        Frequently Asked <span className="text-blue-600">Questions</span>
      </h2>

      <div className="max-w-5xl mx-auto px-6 space-y-16">
        {Object.keys(categories).map((category, cIndex) => (
          <div key={cIndex}>
            
            {/* Category Heading */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">
              {category}
            </h3>

            {/* Items under the category */}
            <div className="space-y-6">
              {categories[category].map((faq, i) => {
                const index = `${cIndex}-${i}`;
                
                return (
                  <div
                    key={index}
                    className="bg-white shadow-lg rounded-2xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden relative"
                  >
                    {/* Accent Line */}
                    <div
                      className={`absolute left-0 top-0 h-full w-1 transition-all duration-300 ${
                        active === index ? "bg-blue-600" : "bg-transparent"
                      }`}
                    />

                    {/* Question */}
                    <button
                      onClick={() => toggle(index)}
                      className="w-full flex justify-between items-center px-6 py-5 text-left group"
                    >
                      <span className="text-lg font-semibold text-gray-800">
                        {faq.q}
                      </span>

                      <span className="text-2xl text-gray-600 transition-transform duration-300">
                        {active === index ? (
                          <FiMinus className="rotate-180 text-blue-600" />
                        ) : (
                          <FiPlus className="group-hover:text-blue-600" />
                        )}
                      </span>
                    </button>

                    {/* Answer */}
                    <div
                      className={`px-6 pb-5 text-gray-600 text-base transition-all duration-500 ease-in-out overflow-hidden ${
                        active === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {faq.a}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
