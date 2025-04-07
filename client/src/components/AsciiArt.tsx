import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AsciiArt() {
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
    
    // Create pre element for the ASCII art
    const pre = document.createElement("pre");
    pre.style.fontFamily = 'monospace';
    pre.style.letterSpacing = '-0.01em';
    pre.style.fontSize = 'clamp(6px, 1vw, 10px)';
    pre.style.lineHeight = '1';
    pre.style.color = '#000'; // Black color with full opacity
    pre.style.maxWidth = '100%';
    pre.style.overflow = 'hidden';
    pre.style.fontWeight = 'bold'; // Make it more visible
    pre.style.textShadow = '0 0 1px rgba(0,0,0,0.3)'; // Add text shadow for better contrast
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
            // Use denser characters for better visibility
            const chars = ".,_:~;=+!*#%@&";
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
    
    // Adjust size for responsive design - much larger for better visibility
    const handleResize = () => {
      if (window.innerWidth < 640) { // Mobile
        pre.style.fontSize = '5px';
      } else if (window.innerWidth < 1024) { // Tablet
        pre.style.fontSize = '7px';
      } else { // Desktop
        pre.style.fontSize = '9px';
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
    <div className="ascii-art-wrapper fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="ascii-art-container w-96 h-96 max-w-full flex items-center justify-center"
      >
        <div 
          ref={asciiContainerRef} 
          className="font-mono"
          style={{ 
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
      </motion.div>
    </div>
  );
}