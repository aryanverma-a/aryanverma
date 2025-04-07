import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function DotPattern() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [dots, setDots] = useState<JSX.Element[]>([]);
  
  // Transform the dots scale based on scroll position
  // Increase zoom factor dramatically to get to white space between dots
  const scale = useTransform(scrollY, [0, 250], [1, 35]); 
  // No opacity fade - we'll just zoom in until dots spread out
  
  // Generate dots pattern
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const generateDots = () => {
      const dotsArray = [];
      const spacing = 15; // Further decreased spacing for an even denser pattern
      const rows = Math.ceil(window.innerHeight / spacing);
      const cols = Math.ceil(window.innerWidth / spacing);
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const xPos = c * spacing;
          const yPos = r * spacing;
          
          dotsArray.push(
            <div 
              key={`dot-${r}-${c}`}
              className="absolute w-[2px] h-[2px] bg-black rounded-full"
              style={{ 
                left: `${xPos}px`, 
                top: `${yPos}px` 
              }}
            />
          );
        }
      }
      return dotsArray;
    };
    
    const handleResize = () => {
      setDots(generateDots());
    };
    
    // Initial generation
    handleResize();
    
    // Re-generate on window resize
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ scale }} // Removed opacity effect
    >
      {dots}
    </motion.div>
  );
}