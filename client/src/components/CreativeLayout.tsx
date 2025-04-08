import { ReactNode, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import DotPattern from './DotPattern';

interface CreativeLayoutProps {
  children: ReactNode;
  showNameCorners?: boolean;
}

export default function CreativeLayout({ children, showNameCorners = true }: CreativeLayoutProps) {
  const [isReady, setIsReady] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform content opacity based on scroll position
  const contentOpacity = useTransform(scrollY, [0, 200, 250], [0, 0, 1]);
  
  // Transform the entire page scale based on scroll position
  const pageScale = useTransform(scrollY, [0, 250], [1, 150]);
  
  // Transform background color - keeping it white throughout
  const bgColor = useTransform(
    scrollY,
    [0, 180, 250],
    ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']
  );
  
  // Keep names fully visible until halfway through zoom
  const nameOpacity = useTransform(scrollY, [0, 100, 150], [1, 1, 0]);
  
  // Keep dot pattern visible throughout zoom
  const dotPatternOpacity = useTransform(scrollY, [0, 240, 250], [1, 1, 0]);
  
  // Set ready state after mount
  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className="bg-background text-text font-sans leading-relaxed overflow-hidden">
      {/* Student box in top right corner */}
      <motion.div 
        className="fixed top-0 right-0 z-30 m-6 md:m-8 bg-white text-black px-4 py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{ 
          opacity: nameOpacity,
          fontWeight: 'normal',
          fontSize: '14px',
        }}
      >
        student.
      </motion.div>
      
      {/* First name in top left corner - only if showNameCorners is true */}
      {showNameCorners && (
        <motion.div 
          className="corner-name top-0 left-0 z-30 m-6 md:m-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: isReady ? 1 : 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ opacity: nameOpacity }}
        >
          aryan
        </motion.div>
      )}
      
      {/* Last name in bottom right corner - only if showNameCorners is true */}
      {showNameCorners && (
        <motion.div 
          className="corner-name bottom-0 right-0 z-30 m-6 md:m-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: isReady ? 1 : 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ opacity: nameOpacity }}
        >
          verma
        </motion.div>
      )}
      
      {/* 
        Order is important for layering:
        1. Dot pattern
        2. ASCII art overlay
        3. Main content
      */}
      
      {/* Zoomable viewport container with dot pattern - lowest z-index */}
      <motion.div 
        className="fixed inset-0 z-10"
        style={{ 
          scale: pageScale, 
          backgroundColor: bgColor,
          opacity: dotPatternOpacity
        }}
      >
        {/* Dot pattern background */}
        <DotPattern />
      </motion.div>
      
      {/* Main content container - reveals when zoomed in - highest z-index */}
      <motion.div 
        className="relative z-20"
        style={{ opacity: contentOpacity }}
      >
        {children}
      </motion.div>
    </div>
  );
}