import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function DotPattern() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [dots, setDots] = useState<JSX.Element[]>([]);
  
  // Transform the dots scale based on scroll position
  const scale = useTransform(scrollY, [0, 400], [1, 3]); // Increased zoom factor
  const opacity = useTransform(scrollY, [0, 300, 400], [1, 0.3, 0]); // More gradual fade
  
  // Generate dots pattern
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const generateDots = () => {
      const dotsArray = [];
      const spacing = 20;
      const rows = Math.ceil(window.innerHeight / spacing);
      const cols = Math.ceil(window.innerWidth / spacing);
      
      // Define safe zones for the names (no dots in these areas)
      const topLeftSafeZone = {
        x: window.innerWidth * 0.4, // 40% of screen width
        y: window.innerHeight * 0.3, // 30% of screen height
      };
      
      const bottomRightSafeZone = {
        x: window.innerWidth * 0.6, // 60% of screen width from left
        y: window.innerHeight * 0.7, // 70% of screen height from top
      };
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const xPos = c * spacing;
          const yPos = r * spacing;
          
          // Skip dots in the top-left safe zone (for "matt")
          const inTopLeftSafeZone = xPos < topLeftSafeZone.x && yPos < topLeftSafeZone.y;
          
          // Skip dots in the bottom-right safe zone (for "bierman")
          const inBottomRightSafeZone = xPos > bottomRightSafeZone.x && yPos > bottomRightSafeZone.y;
          
          if (!inTopLeftSafeZone && !inBottomRightSafeZone) {
            dotsArray.push(
              <div 
                key={`dot-${r}-${c}`}
                className="absolute w-[3px] h-[3px] bg-black rounded-full" // Changed to black
                style={{ 
                  left: `${xPos}px`, 
                  top: `${yPos}px` 
                }}
              />
            );
          }
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
      style={{ scale, opacity }}
    >
      {dots}
    </motion.div>
  );
}