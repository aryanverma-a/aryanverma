import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocation } from 'wouter';

export default function AsciiArt() {
  const [location] = useLocation();
  const asciiContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();
  
  // Simple transformations to match page zoom effect
  const opacity = useTransform(scrollY, [0, 150], [1, 0]);
  const zoomScale = useTransform(scrollY, [0, 250], [1, 150]);
  
  // Only show on homepage
  useEffect(() => {
    setIsVisible(location === "/");
  }, [location]);
  
  // Hide component entirely if not on homepage
  if (!isVisible) return null;

  useEffect(() => {
    if (!asciiContainerRef.current) return;
    
    // Apply CSS to container for perfect centering
    const container = asciiContainerRef.current;
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.position = 'relative';
    container.style.left = '0';
    container.style.top = '0';
    container.style.right = '0';
    container.style.bottom = '0';
    container.style.margin = 'auto';
    container.style.zIndex = '9999';
    
    // Create pre element for the ASCII art
    const pre = document.createElement("pre");
    pre.style.fontFamily = 'monospace';
    pre.style.letterSpacing = '-0.5px'; // Slightly tighter letter spacing
    pre.style.lineHeight = '1'; // Normal line height for better readability
    pre.style.color = '#000000'; // Pure black color
    pre.style.maxWidth = '100%';
    pre.style.overflow = 'hidden';
    pre.style.fontWeight = '700'; // Medium-bold font
    pre.style.whiteSpace = 'pre'; // Preserve whitespace
    pre.style.transform = 'scale(1)'; // Initial scale
    pre.style.position = 'relative';
    pre.style.zIndex = '9999'; // Very high z-index
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
            // Use original ASCII characters for classic look
            const chars = "@%&#*+=-:. ";
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
    
    // Adjust size for responsive design - smaller for a more compact look
    const handleResize = () => {
      if (window.innerWidth < 640) { // Mobile
        pre.style.fontSize = '8px';
      } else if (window.innerWidth < 1024) { // Tablet
        pre.style.fontSize = '12px';
      } else { // Desktop
        pre.style.fontSize = '16px';
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
        opacity: opacity, // Fade out when scrolling
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
        style={{ 
          width: '450px', 
          height: '450px', 
          maxWidth: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          scale: zoomScale // Apply zoom scale based on scroll
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
            zIndex: 9999,
            transform: 'translateZ(0)', // Force hardware acceleration
            willChange: 'transform' // Hint for browser optimization
          }}
        />
      </motion.div>
    </motion.div>
  );
}