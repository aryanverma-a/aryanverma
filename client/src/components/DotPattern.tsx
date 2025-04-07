import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function DotPattern() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [dots, setDots] = useState<JSX.Element[]>([]);
  
  // Keep dots at full opacity throughout zoom
  const dotsOpacity = useTransform(scrollY, [0, 150], [1, 1]);
  
  // Generate dots pattern
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const generateDots = () => {
      const dotsArray = [];
      const spacing = 10; // Much tighter spacing for an extremely dense pattern
      const rows = Math.ceil(window.innerHeight / spacing);
      const cols = Math.ceil(window.innerWidth / spacing);
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const xPos = c * spacing;
          const yPos = r * spacing;
          
          dotsArray.push(
            <div 
              key={`dot-${r}-${c}`}
              className="absolute w-[1.5px] h-[1.5px] bg-black rounded-full"
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
      className="inset-0 overflow-hidden pointer-events-none"
      style={{ opacity: dotsOpacity }}
    >
      {dots}
    </motion.div>
  );
}