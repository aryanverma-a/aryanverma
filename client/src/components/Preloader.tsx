import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

export default function Preloader({ onLoadingComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => {
              onLoadingComplete();
            }, 500);
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 bg-black z-50 flex items-end justify-end"
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5 }
          }}
        >
          <div className="p-6 text-white font-mono text-lg">
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}