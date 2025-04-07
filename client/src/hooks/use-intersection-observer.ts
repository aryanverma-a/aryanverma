import { useEffect } from "react";

export const useIntersectionObserver = (
  setActiveSection: (sectionId: string) => void
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id") as string;
            if (id) {
              setActiveSection(id);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    // Get all sections with IDs
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Cleanup on unmount
    return () => {
      observer.disconnect();
    };
  }, [setActiveSection]); // Include setActiveSection in dependencies
};
