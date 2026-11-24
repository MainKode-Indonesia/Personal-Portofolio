import { useEffect, useState } from 'react';
import type { Language } from '../data/projects';

interface ScrollProgressProps {
  lang: Language;
}

export default function ScrollProgress({ lang }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const next = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setProgress(next);
      rafId = 0;
    };

    const handleScroll = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const percentage = Math.round(progress * 100);

  return (
    <div
      role="progressbar"
      aria-label={lang === 'id' ? 'Progres gulir halaman' : 'Page scroll progress'}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percentage}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] bg-slate-200/50 dark:bg-white/5"
    >
      <div
        className="h-full w-full origin-left bg-blue-600 transition-transform duration-75 ease-out motion-reduce:transition-none dark:bg-blue-500"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
