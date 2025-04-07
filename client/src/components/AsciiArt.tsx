import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocation } from 'wouter';

export default function AsciiArt() {
  const [location] = useLocation();
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  
  // Only show on homepage and hide when scrolling
  const asciiOpacity = useTransform(scrollY, [0, 100, 150], [1, 0.5, 0]);
  
  // Only show on homepage
  useEffect(() => {
    setIsVisible(location === "/");
  }, [location]);
  
  // Hide component entirely if not on homepage
  if (!isVisible) return null;
  const asciiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!asciiContainerRef.current) return;
    
    // Apply CSS to container
    const container = asciiContainerRef.current;
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.position = 'relative';
    container.style.zIndex = '30';
    
    // Create pre element for the ASCII art
    const pre = document.createElement("pre");
    pre.style.fontFamily = 'monospace';
    pre.style.letterSpacing = '-1px'; // Tighter letter spacing
    pre.style.lineHeight = '0.8'; // Tighter line height
    pre.style.color = '#000000'; // Pure black color
    pre.style.maxWidth = '100%';
    pre.style.overflow = 'hidden';
    pre.style.fontWeight = '900'; // Bold font
    pre.style.textShadow = '0 0 4px rgba(255,255,255,1)'; // Strong white text shadow for contrast
    pre.style.whiteSpace = 'pre'; // Preserve whitespace
    pre.style.transform = 'scale(1)'; // Initial scale
    pre.style.position = 'relative';
    pre.style.zIndex = '30';
    container.appendChild(pre);
    
    // Animation variables
    let x = 1760;
    let z = 0;
    let y = 0;
    
    // Create and run the donut animation
    const interval = setInterval(() => {
      z += .07;
      y += .03;
      
      // Create empty array for ASCII art characters
      const a: Array<string> = [];
      for (let i = 0; i < x; i++) {
        a[i] = i % 80 === 79 ? "\n" : " ";
      }
      
      // Create empty array for depth values
      const r = new Array(x).fill(0);
      
      // Calculate sine and cosine values
      const t = Math.cos(z);
      const e = Math.sin(z);
      const n = Math.cos(y);
      const o = Math.sin(y);
      
      // Outer loop for the donut - reduced step size for more detail
      for (let s = 0; s < 6.28; s += .05) {
        const c = Math.cos(s);
        const h = Math.sin(s);
        
        // Inner loop for the donut - reduced step size for more detail
        for (let s2 = 0; s2 < 6.28; s2 += .01) {
          const v = Math.sin(s2);
          const M = Math.cos(s2);
          const i = c + 2;
          const l = 1 / (v * i * e + h * t + 5);
          const p = v * i * t - h * e;
          const d = 0 | 40 + 30 * l * (M * i * n - p * o);
          const m = 0 | 12 + 15 * l * (M * i * o + p * n);
          const f = 0 | 8 * ((h * e - v * c * t) * n - v * c * e - h * t - M * c * o);
          const yPos = d + 80 * m;
          
          // Set character at position if conditions are met
          if (m < 22 && m >= 0 && d >= 0 && d < 79 && l > r[yPos]) {
            r[yPos] = l;
            // Use much bolder characters that will stand out better
            const chars = "██████▓▓▓▓▓▒▒▒▒▒░░░░░";
            const charIndex = f > 0 ? f : 0;
            if (charIndex < chars.length) {
              a[yPos] = chars.charAt(charIndex);
            }
          }
        }
      }
      
      // Update the pre element with the ASCII art
      pre.innerHTML = a.join("");
    }, 50);
    
    // Adjust size for responsive design - extremely large for maximum visibility
    const handleResize = () => {
      if (window.innerWidth < 640) { // Mobile
        pre.style.fontSize = '12px';
      } else if (window.innerWidth < 1024) { // Tablet
        pre.style.fontSize = '20px';
      } else { // Desktop
        pre.style.fontSize = '25px';
      }
    };
    
    // Initial call and add event listener
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      if (container && container.contains(pre)) {
        container.removeChild(pre);
      }
    };
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ 
        opacity: asciiOpacity, // Fade out when scrolling
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999, // Extremely high z-index
      }}
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-[700px] h-[700px] max-w-full flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 70%, rgba(255, 255, 255, 0.92) 100%)',
          borderRadius: '50%',  // Circular shape
          boxShadow: '0 0 80px 50px rgba(255, 255, 255, 0.95), 0 0 8px 4px rgba(0,0,0,0.5)', // Even stronger glow
          border: '4px solid #000', // Thicker black border to make it stand out
          position: 'relative',
          zIndex: 9999 // Extremely high z-index
        }}
      >
        <div 
          ref={asciiContainerRef} 
          className="font-mono"
          style={{ 
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 9999, // Extremely high z-index
            transform: 'translateZ(0)', // Force hardware acceleration
            willChange: 'transform' // Hint for browser optimization
          }}
        />
      </motion.div>
    </motion.div>
  );
}