import { useCallback, useState } from "react";

export const useIntersectionObserver = (
  setActiveSection: (sectionId: string) => void
) => {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  const observeSections = useCallback(() => {
    // Cleanup previous observer if exists
    if (observer) {
      observer.disconnect();
    }

    const sections = document.querySelectorAll("section[id]");
    
    const newObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id") as string;
            setActiveSection(id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => {
      newObserver.observe(section);
    });

    setObserver(newObserver);

    return () => {
      newObserver.disconnect();
    };
  }, [observer, setActiveSection]);

  return { observeSections };
};
