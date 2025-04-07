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
  const contentOpacity = useTransform(scrollY, [0, 150, 200], [0, 0, 1]);
  
  // Set ready state after mount
  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className="bg-background text-text font-sans leading-relaxed">
      {/* First name in top left corner - only if showNameCorners is true */}
      {showNameCorners && (
        <motion.div 
          className="fixed top-0 left-0 text-[15vw] font-bold leading-none z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isReady ? 1 : 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          matt
        </motion.div>
      )}
      
      {/* Last name in bottom right corner - only if showNameCorners is true */}
      {showNameCorners && (
        <motion.div 
          className="fixed bottom-0 right-0 text-[15vw] font-bold leading-none z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isReady ? 1 : 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          bierman
        </motion.div>
      )}
      
      {/* Dot pattern background - zooms in on scroll */}
      <DotPattern />
      
      {/* Content revealer - show when dots are zoomed */}
      <motion.div 
        className="relative z-20"
        style={{ opacity: contentOpacity }}
      >
        {children}
      </motion.div>
    </div>
  );
}