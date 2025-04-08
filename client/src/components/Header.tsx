import { useState, useEffect } from "react";
import { CursorBlink } from "@/components/ui/cursor-blink";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      closeMobileMenu();
    }
  };

  return (
    <header className={`fixed w-full bg-background/90 backdrop-blur-sm z-10 transition-all duration-300 ${isScrolled ? "border-b border-gray-200/40" : ""}`}>
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        <a href="#home" className="text-xl font-bold relative" onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }}>
          <span className="text-primary">Aryan.Verma</span>
          <CursorBlink />
        </a>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href}
                  className={`nav-link py-2 px-1 text-sm font-medium transition-colors relative ${activeSection === link.href.substring(1) ? "text-black" : "text-gray-600 hover:text-black"}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                >
                  {link.label}
                  <motion.span 
                    className="absolute bottom-0 left-0 h-[1px] bg-black"
                    initial={{ width: 0 }}
                    animate={{ width: activeSection === link.href.substring(1) ? "100%" : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <button 
          className="md:hidden text-primary focus:outline-none" 
          onClick={toggleMobileMenu}
          aria-label="Open mobile menu"
        >
          <i className={`fas ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"} text-lg`}></i>
        </button>
      </div>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id="mobile-menu" 
            className="md:hidden bg-background/95 backdrop-blur-sm absolute w-full"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="container mx-auto px-6 py-4">
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a 
                      href={link.href}
                      className={`block py-2 font-medium transition-colors ${activeSection === link.href.substring(1) ? "text-black" : "text-gray-600 hover:text-black"}`}
                      onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
