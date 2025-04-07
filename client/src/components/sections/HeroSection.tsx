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
      {/* Empty hero section - only name corners and dot pattern visible */}
    </section>
  );
}
