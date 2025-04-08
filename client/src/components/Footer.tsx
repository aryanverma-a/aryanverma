import { CursorBlink } from "@/components/ui/cursor-blink";

export default function Footer() {
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#work", label: "Work" },
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
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 border-t border-gray-200">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a 
              href="#home" 
              className="text-xl font-bold relative"
              onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }}
            >
              <span className="text-black">Aryan.Verma</span>
              <CursorBlink />
            </a>
          </div>
          
          <nav className="mb-6 md:mb-0">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    className="text-gray-600 text-sm hover:text-black transition-colors"
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="text-xs text-gray-600">
            &copy; {currentYear} Aryan Verma. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
