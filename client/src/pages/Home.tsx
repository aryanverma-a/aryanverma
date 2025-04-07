import { useState } from "react";
import Header from "@/components/Header";
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
    <div className="bg-background text-text font-sans leading-relaxed">
      <Header activeSection={activeSection} />
      <main>
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
