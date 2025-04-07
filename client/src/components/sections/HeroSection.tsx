import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  // Add scroll instruction that fades out as user scrolls
  const scrollInstructionOpacity = useTransform(scrollY, [0, 50], [1, 0]);

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden"
    >
      {/* Empty hero section - ASCII art now rendered at App level */}
      
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