import { useState } from "react";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WorkSection from "@/components/sections/WorkSection";
import ContactSection from "@/components/sections/ContactSection";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("home");
  
  // This will setup the observer once and handle cleanup
  useIntersectionObserver(setActiveSection);

  return (
    <main>
      {/* Hero section - always visible */}
      <HeroSection />
      
      {/* Content sections fade in with white background */}
      <div className="min-h-screen"> 
        {/* First screen - hero only */}
      </div>
      
      {/* Other sections with white background - stacked vertically for normal scrolling */}
      <div className="bg-white pt-20 pb-20">
        <AboutSection />
        <WorkSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
