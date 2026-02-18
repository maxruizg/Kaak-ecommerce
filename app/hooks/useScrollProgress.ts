import { useEffect, useState } from "react";

interface SectionDef {
  id: string;
  label: string;
}

export function useScrollProgress(sections: SectionDef[]) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
        document.documentElement.style.setProperty("--scroll-progress", String(progress));

        let current = 0;
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i].id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.4) {
              current = i;
              break;
            }
          }
        }
        setActiveSection(current);
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  return { activeSection, sections };
}
