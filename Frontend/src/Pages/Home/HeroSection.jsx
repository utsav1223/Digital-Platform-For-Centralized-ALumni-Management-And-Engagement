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

  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // FIXED: Robust Typing Effect Logic
  useEffect(() => {
    const currentWord = words[wordIndex];
    const typeSpeed = isDeleting ? 50 : 150; // Faster delete, smooth type
    const pauseTime = 2000; // Time to wait before deleting

    const handleTyping = () => {
      if (!isDeleting && text.length < currentWord.length) {
        // Typing forward
        setText(currentWord.slice(0, text.length + 1));
      } else if (isDeleting && text.length > 0) {
        // Deleting backward
        setText(currentWord.slice(0, text.length - 1));
      } else if (!isDeleting && text.length === currentWord.length) {
        // Finished typing, wait then switch to delete mode
        setTimeout(() => setIsDeleting(true), pauseTime);
        return; // Return to avoid triggering the main timeout below immediately
      } else if (isDeleting && text.length === 0) {
        // Finished deleting, switch to next word
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(handleTyping, typeSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]); // Dependencies ensure loop continues

  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-between px-6 lg:px-24 py-20 overflow-hidden bg-gray-50">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-blue-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob"></div>
        <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      {/* LEFT CONTENT */}
      <div className="relative z-10 w-full md:w-1/2 space-y-8 mt-10 md:mt-0">
        
        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-sm font-medium mb-4">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
          Connect. Grow. Succeed.
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1]">
          A Smarter Way to <br className="hidden lg:block" /> Connect with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 inline-block min-w-[200px]">
            {text}
            <span className="ml-1 text-blue-600 animate-pulse font-light">|</span>
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 max-w-lg leading-relaxed font-light">
          Build meaningful academic and career connections through mentorship,
          networking, and events — all in a single unified digital platform.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          <button
            onClick={() => {
              const nextSection = document.getElementById("next-section");
              if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* RIGHT ANIMATION SECTION */}
      <div className="relative z-10 w-full md:w-1/2 flex justify-center items-center mt-16 md:mt-0">
        <div className="absolute w-[80%] h-[80%] bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-full blur-3xl -z-10"></div>
        
        {/* FIXED: Added key={wordIndex} to force re-render when word changes */}
        <div
          key={wordIndex} 
          className="w-[320px] sm:w-[400px] lg:w-[500px] transition-all duration-500 ease-in-out transform opacity-100"
        >
          <Lottie 
            animationData={animations[words[wordIndex]]} 
            loop={true}
            className="drop-shadow-2xl" 
          />
        </div>
      </div>

    </section>
  );
}