import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function DotPattern() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [dots, setDots] = useState<JSX.Element[]>([]);
  
  // Transform the dots scale based on scroll position
  // Increase zoom factor to get to white space between dots
  const scale = useTransform(scrollY, [0, 400], [1, 12]); 
  // No opacity fade - we'll just zoom in until dots spread out
  
  // Generate dots pattern
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const generateDots = () => {
      const dotsArray = [];
      const spacing = 25; // Increased spacing between dots
      const rows = Math.ceil(window.innerHeight / spacing);
      const cols = Math.ceil(window.innerWidth / spacing);
      
      // Calculate safe zone dimensions based on text size
      // "matt" is about 4 characters wide
      const mattWordWidth = window.innerWidth * 0.25; // Approx 25% of screen width for "matt"
      const mattWordHeight = window.innerHeight * 0.15; // Approx height for "matt"
      
      // "bierman" is about 7 characters wide
      const biermanWordWidth = window.innerWidth * 0.35; // Approx 35% of screen width for "bierman"
      const biermanWordHeight = window.innerHeight * 0.15; // Approx height for "bierman"
      
      // Define safe zones for the names (no dots in these areas)
      const topLeftSafeZone = {
        x: mattWordWidth,
        y: mattWordHeight,
      };
      
      const bottomRightSafeZone = {
        x: window.innerWidth - biermanWordWidth,
        y: window.innerHeight - biermanWordHeight,
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
                className="absolute w-[2.5px] h-[2.5px] bg-black rounded-full"
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
      style={{ scale }} // Removed opacity effect
    >
      {dots}
    </motion.div>
  );
}