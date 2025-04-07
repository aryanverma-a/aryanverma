import { motion, useScroll, useTransform } from "framer-motion";
import AsciiArt from "@/components/AsciiArt";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  // Apply zoom effect to the entire hero section
  const scale = useTransform(scrollY, [0, 250], [1, 150]);
  const opacity = useTransform(scrollY, [0, 150], [1, 0]);
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  // Add scroll instruction that fades out as user scrolls
  const scrollInstructionOpacity = useTransform(scrollY, [0, 50], [1, 0]);

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden"
    >
      {/* ASCII art in the middle of the hero section */}
      <AsciiArt />
      
      {/* Scroll instruction */}
      <motion.div 
        className="absolute bottom-10 text-center text-black z-50 pointer-events-none"
        style={{ opacity: scrollInstructionOpacity }}
      >
        <p className="mb-2 text-sm">Scroll to explore</p>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="mx-auto animate-bounce"
        >
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </motion.div>
    </section>
  );
}
