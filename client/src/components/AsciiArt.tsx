import { useEffect, useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

export default function AsciiArt() {
  const asciiContainerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Create transform variables for zoom effect integrated with page scroll
  const scale = useTransform(scrollY, [0, 250], [1, 150]);
  const opacity = useTransform(scrollY, [0, 150], [1, 0]);

  useEffect(() => {
    if (!asciiContainerRef.current) return;
    
    // Apply CSS to container
    const container = asciiContainerRef.current;
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.width = '100%';
    container.style.height = '100%';
    
    // Create pre element for the ASCII art
    const pre = document.createElement("pre");
    pre.style.fontFamily = 'monospace';
    pre.style.letterSpacing = '-0.02em';
    pre.style.fontSize = 'clamp(4px, 0.8vw, 8px)';
    pre.style.lineHeight = '1';
    pre.style.color = 'black'; // Change to black color
    pre.style.transform = 'scale(0.8)'; // Slightly smaller for better fit
    pre.style.maxWidth = '100%';
    pre.style.overflow = 'hidden';
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
      
      // Outer loop for the donut
      for (let s = 0; s < 6.28; s += .07) {
        const c = Math.cos(s);
        const h = Math.sin(s);
        
        // Inner loop for the donut
        for (let s2 = 0; s2 < 6.28; s2 += .02) {
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
            const chars = ".,-~:;=!*#$@";
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
    
    // Adjust size for responsive design
    const handleResize = () => {
      if (window.innerWidth < 640) { // Mobile
        pre.style.fontSize = '3px';
        pre.style.transform = 'scale(0.6)';
      } else if (window.innerWidth < 1024) { // Tablet
        pre.style.fontSize = '5px';
        pre.style.transform = 'scale(0.7)';
      } else { // Desktop
        pre.style.fontSize = '7px';
        pre.style.transform = 'scale(0.8)';
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
      className="ascii-art-container z-40 absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ 
        scale, 
        opacity,
        position: 'absolute',
        width: '100%',
        height: '100%'
      }}
      initial={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        ref={asciiContainerRef} 
        className="font-mono"
        style={{ 
          width: '100%',
          maxWidth: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      />
    </motion.div>
  );
}