import { useState, useEffect } from "react";
import Lottie from "lottie-react";

// Animations
import NetworkAnim from "../../assets/Network.json";
import ShareAnim from "../../assets/Share.json";
import TeamAnim from "../../assets/team.json";

export default function HeroSection() {
  const words = ["Alumni", "Mentors", "Peers"];
  const animations = {
    Alumni: NetworkAnim,
    Mentors: ShareAnim,
    Peers: TeamAnim,
  };

  // Typing Effect State
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);

  // Typing Effect Logic
  useEffect(() => {
    if (typingIndex < words[wordIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + words[wordIndex][typingIndex]);
        setTypingIndex(typingIndex + 1);
      }, 120);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayText("");
        setTypingIndex(0);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [typingIndex, wordIndex]);

  return (
    <section className="w-full min-h-screen bg-white flex flex-col md:flex-row items-center justify-between px-6 lg:px-20 py-20">

      {/* LEFT TEXT SECTION */}
      <div className="w-full md:w-1/2 space-y-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          A Smarter Way to Connect{" "}
          <span className="text-blue-600 border-b-4 border-blue-600 pb-1">
            {displayText}
          </span>
          <span className="text-blue-600 animate-pulse">|</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 max-w-xl leading-relaxed">
          Build meaningful academic and career connections through mentorship,
          networking, events, and real opportunities — all in a single unified digital platform.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-5 pt-4">

          {/* Get Started Button */}
          <button
            className="
              px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg 
              hover:bg-blue-700 hover:shadow-2xl transition-all duration-300 
              transform hover:-translate-y-1
            "
          >
            Get Started
          </button>

          {/* Scroll Down Button */}
          <button
            onClick={() => {
              const nextSection = document.getElementById("next-section");
              if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
            }}
            className="
              px-8 py-3 border-2 border-gray-800 text-gray-900 font-semibold rounded-lg 
              hover:bg-gray-900 hover:text-white hover:shadow-xl 
              transition-all duration-300 transform hover:-translate-y-1
            "
          >
            Scroll Down
          </button>
        </div>
      </div>

      {/* RIGHT ANIMATION SECTION */}
      <div className="w-full md:w-1/2 flex justify-center mt-16 md:mt-0">
        <div
          key={words[wordIndex]}
          className="w-[300px] sm:w-[350px] lg:w-[420px] transition-all duration-700 opacity-100"
        >
          <Lottie animationData={animations[words[wordIndex]]} loop />
        </div>
      </div>

    </section>
  );
}
