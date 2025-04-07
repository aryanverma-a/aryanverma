import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AsciiArt() {
  const asciiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to load the ASCII art
    const loadAsciiArt = () => {
      if (!asciiContainerRef.current) return;
      
      // Create script element
      const script = document.createElement('script');
      script.src = 'http://www.qqpr.com/ascii/js/1023.js';
      script.async = true;
      
      // Handle script loading error
      script.onerror = () => {
        if (asciiContainerRef.current) {
          asciiContainerRef.current.innerHTML = `
          <pre class="ascii-fallback">
           _   _                                                         
          | | | |                                                        
          | |_| | ___ _ __ ___     ___  ___  ___  _ __                  
          |  _  |/ _ \\ '__/ _ \\   / __|/ _ \\/ _ \\| '_ \\                 
          | | | |  __/ | | (_) |  \\__ \\  __/ (_) | | | |                
          \\_| |_/\\___|_|  \\___/   |___/\\___|\\___/|_| |_|                
                                                                </pre>`;
        }
      };
      
      // Append script to container
      asciiContainerRef.current.appendChild(script);
    };
    
    loadAsciiArt();
    
    // Cleanup function
    return () => {
      if (asciiContainerRef.current) {
        const scripts = asciiContainerRef.current.getElementsByTagName('script');
        Array.from(scripts).forEach(script => script.remove());
      }
    };
  }, []);

  return (
    <motion.div 
      className="ascii-art-container z-40 fixed inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <div 
        ref={asciiContainerRef} 
        className="text-black text-xs md:text-sm font-mono whitespace-pre"
        style={{ 
          fontSize: 'clamp(4px, 1vw, 10px)',
          lineHeight: 1,
          letterSpacing: '-0.02em'
        }}
      ></div>
    </motion.div>
  );
}