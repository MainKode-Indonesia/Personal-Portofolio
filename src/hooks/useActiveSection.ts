import { useEffect, useState } from 'react';

interface TrackedSection {
  id: string;
  navHref: string | null;
}

const TRACKED_SECTIONS: TrackedSection[] = [
  { id: 'hero', navHref: null },
  { id: 'about', navHref: '#about' },
  { id: 'leadership', navHref: '#about' },
  { id: 'ecosystem', navHref: '#ecosystem' },
  { id: 'projects', navHref: '#projects' },
  { id: 'tech-stack', navHref: '#projects' },
  { id: 'contributions', navHref: '#projects' },
  { id: 'journey', navHref: '#journey' },
  { id: 'contact', navHref: '#contact' },
];

export function useActiveSection(offset = 120): string | null {
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    let rafId = 0;

    const updateActiveSection = () => {
      rafId = 0;

      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (docHeight > window.innerHeight && scrollBottom >= docHeight - 24) {
        setActiveHref('#contact');
        return;
      }

      let currentHref: string | null = null;
      for (const section of TRACKED_SECTIONS) {
        const element = document.getElementById(section.id);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= offset) {
          currentHref = section.navHref;
        }
      }

      setActiveHref(currentHref);
    };

    const handleScrollOrResize = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [offset]);

  return activeHref;
}
