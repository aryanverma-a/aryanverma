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
  const contentOpacity = useTransform(scrollY, [0, 180, 250], [0, 0, 1]);
  
  // Transform the entire page scale based on scroll position
  const pageScale = useTransform(scrollY, [0, 250], [1, 35]);
  
  // Transform background color from black to white
  const bgColor = useTransform(
    scrollY,
    [0, 180, 250],
    ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']
  );
  
  // Transform the name corners opacity to fade out as page zooms
  const nameOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  
  // Set ready state after mount
  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className="bg-background text-text font-sans leading-relaxed overflow-hidden">
      {/* First name in top left corner - only if showNameCorners is true */}
      {showNameCorners && (
        <motion.div 
          className="fixed top-0 left-0 text-[15vw] font-bold leading-none z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: isReady ? 1 : 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ opacity: nameOpacity }}
        >
          matt
        </motion.div>
      )}
      
      {/* Last name in bottom right corner - only if showNameCorners is true */}
      {showNameCorners && (
        <motion.div 
          className="fixed bottom-0 right-0 text-[15vw] font-bold leading-none z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: isReady ? 1 : 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ opacity: nameOpacity }}
        >
          bierman
        </motion.div>
      )}
      
      {/* Zoomable viewport container */}
      <motion.div 
        className="fixed inset-0 z-10"
        style={{ scale: pageScale, backgroundColor: bgColor }}
      >
        {/* Dot pattern background */}
        <DotPattern />
      </motion.div>
      
      {/* Content revealer - show when page is zoomed */}
      <motion.div 
        className="relative z-20"
        style={{ opacity: contentOpacity }}
      >
        {children}
      </motion.div>
    </div>
  );
}