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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-6 md:px-12 py-20">
        <motion.div 
          className="max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            <span className="block">Hello, I'm</span>
            <span className="block text-primary">John Doe</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-secondary mb-10 leading-relaxed"
            variants={itemVariants}
          >
            Frontend developer crafting intuitive and responsive digital experiences.
          </motion.p>
          
          <motion.div 
            className="flex space-x-4"
            variants={itemVariants}
          >
            <a 
              href="#work" 
              className="px-7 py-3 bg-primary text-white font-medium rounded-sm hover:bg-opacity-90 transition-all"
              onClick={(e) => { e.preventDefault(); scrollToSection("#work"); }}
            >
              View Work
            </a>
            <a 
              href="#contact" 
              className="px-7 py-3 border border-primary text-primary font-medium rounded-sm hover:bg-primary hover:text-white transition-all"
              onClick={(e) => { e.preventDefault(); scrollToSection("#contact"); }}
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
