import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WorkSection from "@/components/sections/WorkSection";
import ContactSection from "@/components/sections/ContactSection";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import DotPattern from "@/components/DotPattern";
import Preloader from "@/components/Preloader";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isLoading, setIsLoading] = useState(true);
  const { scrollY } = useScroll();
  
  // Transform content opacity based on scroll to reveal content as dots fade
  const contentOpacity = useTransform(scrollY, [0, 300, 400], [0, 0, 1]);
  
  // This will setup the observer once and handle cleanup
  useIntersectionObserver(setActiveSection);
  
  // Lock scroll during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <>
      <Preloader onLoadingComplete={() => setIsLoading(false)} />
      
      <div className="bg-background text-text font-sans leading-relaxed">
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
        
        {/* Dot pattern background - they zoom in on scroll */}
        {!isLoading && <DotPattern />}
        
        {/* Content revealer - show only when scrolled down */}
        <motion.div 
          className="relative z-20"
          style={{ opacity: contentOpacity }}
        >
          <main>
            {/* Hero section - always visible */}
            <HeroSection />
            
            {/* Content that appears after scroll */}
            <div className="mt-[100vh] bg-white"> {/* Push content down below fold and add white background */}
              <AboutSection />
              <WorkSection />
              <ContactSection />
              <Footer />
            </div>
          </main>
        </motion.div>
      </div>
    </>
  );
}
