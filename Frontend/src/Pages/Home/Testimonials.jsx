import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Testimonials() {
  const testimonials = [
    {
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "Priya Sharma (Student)",
      text: "AlumniConnect helped me find a mentor who guided me through interview preparation. The platform feels simple and motivating!"
    },
    {
      img: "https://randomuser.me/api/portraits/men/36.jpg",
      name: "Arvind Patel (Alumni)",
      text: "I enjoy mentoring juniors. Posting job referrals is easy, and students respond with interest."
    },
    {
      img: "https://randomuser.me/api/portraits/men/22.jpg",
      name: "Dr. Rakesh Kumar (Admin)",
      text: "Managing alumni engagement has become effortless. Our community is more active than ever."
    },
    {
      img: "https://randomuser.me/api/portraits/women/65.jpg",
      name: "Sneha Raj (Student)",
      text: "The resume review session with an alumnus helped me secure my internship!"
    },
    {
      img: "https://randomuser.me/api/portraits/men/11.jpg",
      name: "Amit Verma (Alumni)",
      text: "A great platform to stay connected with my college and offer support to students."
    },
    {
      img: "https://randomuser.me/api/portraits/women/32.jpg",
      name: "Karishma Singh (Alumni)",
      text: "Loved conducting a workshop! The participation and curiosity from students were amazing."
    }
  ];

  // Duplicate list for infinite loop
  const infiniteList = [...testimonials, ...testimonials];

  return (
    <section className="w-full py-20 bg-white relative overflow-hidden">

      {/* Fade edges (Apple-like effect) */}
      <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

      {/* HEADING */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
        What People <span className="text-blue-600">Say About Us</span>
      </h2>

      <div className="w-full overflow-hidden px-10 md:px-20">

        <div className="flex gap-8 testimonial-track w-max">

          {infiniteList.map((t, i) => (
            <div
              key={i}
              className="
                min-w-[260px] max-w-[260px]
                bg-white shadow-md
                rounded-2xl p-6
                border border-gray-200 
                transition-all duration-300
                card-3d group cursor-pointer
                hover:shadow-2xl
              "
            >
              <img
                src={t.img}
                alt="User"
                className="w-16 h-16 rounded-full mx-auto mb-3 object-cover shadow transition-all duration-300 group-hover:scale-110"
              />

              <h3 className="text-lg font-semibold text-gray-800 text-center transition-all duration-300 group-hover:text-blue-600">
                {t.name}
              </h3>

              <p className="text-gray-600 text-center mt-2 text-sm leading-relaxed transition-all duration-300 group-hover:text-gray-700">
                {t.text}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
