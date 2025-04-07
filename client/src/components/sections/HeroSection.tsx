import { motion } from "framer-motion";

export default function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center relative">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div 
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.p 
            className="text-lg md:text-xl text-gray-700 mb-4"
          >
            senior frontend engineer at <a href="https://sigma.computing" className="underline">sigma.computing</a>
          </motion.p>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-700"
          >
            based in nyc
          </motion.p>
        </motion.div>
      </div>
      
      {/* Visual indicator to scroll down */}
      <motion.div 
        className="absolute bottom-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <a 
          href="#about" 
          className="flex flex-col items-center text-gray-400 hover:text-black transition-colors"
          onClick={(e) => { e.preventDefault(); scrollToSection("#about"); }}
        >
          <span className="text-sm mb-2">Scroll</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
