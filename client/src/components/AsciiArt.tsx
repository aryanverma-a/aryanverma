import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AsciiArt() {
  const { scrollY } = useScroll();
  // Only show on initial view, fade out during zoom
  const asciiOpacity = useTransform(scrollY, [0, 100, 180], [1, 0.8, 0]);
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
            // Use bolder, denser characters for better visibility on dot pattern
            const chars = "█▓▒░@%&#$MWBNOPQDSAGHK";
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
    
    // Adjust size for responsive design - even larger for better visibility
    const handleResize = () => {
      if (window.innerWidth < 640) { // Mobile
        pre.style.fontSize = '10px';
      } else if (window.innerWidth < 1024) { // Tablet
        pre.style.fontSize = '16px';
      } else { // Desktop
        pre.style.fontSize = '20px';
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
      className="ascii-art-wrapper fixed inset-0 flex items-center justify-center z-30 pointer-events-none"
      style={{ opacity: asciiOpacity }} // Fade out when scrolling
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="ascii-art-container w-[650px] h-[650px] max-w-full flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.92) 70%, rgba(255, 255, 255, 0.85) 100%)',
          borderRadius: '50%',  // Circular shape
          boxShadow: '0 0 60px 40px rgba(255, 255, 255, 0.9), 0 0 5px 2px rgba(0,0,0,0.3)', // Stronger glow with subtle dark edge
          border: '3px solid #000', // Thicker black border to make it stand out
          position: 'relative',
          zIndex: 30
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
            zIndex: 30,
            transform: 'translateZ(0)', // Force hardware acceleration
            willChange: 'transform' // Hint for browser optimization
          }}
        />
      </motion.div>
    </motion.div>
  );
}