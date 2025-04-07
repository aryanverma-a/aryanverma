import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WorkSection from "@/components/sections/WorkSection";
import ContactSection from "@/components/sections/ContactSection";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import DotPattern from "@/components/DotPattern";
import Preloader from "@/components/Preloader";
import { motion } from "framer-motion";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isLoading, setIsLoading] = useState(true);
  
  // This will setup the observer once and handle cleanup
  useIntersectionObserver(setActiveSection);

  return (
    <>
      <Preloader onLoadingComplete={() => setIsLoading(false)} />
      
      <div className="bg-background text-text font-sans leading-relaxed min-h-screen">
        {/* First name in top left corner */}
        <motion.div 
          className="fixed top-0 left-0 text-[15vw] font-bold leading-none z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          matt
        </motion.div>
        
        {/* Last name in bottom right corner */}
        <motion.div 
          className="fixed bottom-0 right-0 text-[15vw] font-bold leading-none z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          bierman
        </motion.div>
        
        {/* Dot pattern background */}
        {!isLoading && <DotPattern />}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Header activeSection={activeSection} />
          <main className="relative z-20">
            <HeroSection />
            <AboutSection />
            <WorkSection />
            <ContactSection />
          </main>
          <Footer />
        </motion.div>
      </div>
    </>
  );
}
