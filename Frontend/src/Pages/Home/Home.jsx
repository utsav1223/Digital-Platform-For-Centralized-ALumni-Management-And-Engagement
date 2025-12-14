import Navbar from "./Navbar.jsx";
import HeroSection from "./HeroSection.jsx";
import StudentAlumniFeatures from "./StudentAlumniFeatures.jsx";
import ProblemsWeSolve from "./Problems.jsx";
import Works from "./Works.jsx";
import Testimonials from "./Testimonials.jsx";
import Footer from "./Footer.jsx";
import FAQ from "./FAQ.jsx";
import Contact from "./Contact.jsx";
export default function Home() {
  return (
    <>
      {/* Navbar for Home Page */}
      <Navbar />

      {/* ⭐ Push page content below fixed navbar ⭐ */}
      <div className="pt-[80px]">

        <HeroSection />

        {/* ⭐ SECTION IDs For Navbar Smooth Scroll ⭐ */}
        <section id="features">
          <StudentAlumniFeatures />
        </section>

        <ProblemsWeSolve />

        <section id="how-it-works">
          <Works />
        </section>

        <Testimonials />

        <section id="faq">
          <FAQ />
        </section>

        <section id="contact">
          <Contact />
        </section>

        <Footer />

      </div>
    </>
  );
}
