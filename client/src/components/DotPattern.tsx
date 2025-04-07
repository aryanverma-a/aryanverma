import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function DotPattern() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [dots, setDots] = useState<JSX.Element[]>([]);
  
  // Transform the dots scale based on scroll position
  const scale = useTransform(scrollY, [0, 400], [1, 2]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  // Generate dots pattern
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const generateDots = () => {
      const dotsArray = [];
      const spacing = 20;
      const rows = Math.ceil(window.innerHeight / spacing);
      const cols = Math.ceil(window.innerWidth / spacing);
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dotsArray.push(
            <div 
              key={`dot-${r}-${c}`}
              className="absolute w-[3px] h-[3px] bg-gray-300 rounded-full"
              style={{ 
                left: `${c * spacing}px`, 
                top: `${r * spacing}px` 
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
      style={{ scale, opacity }}
    >
      {dots}
    </motion.div>
  );
}