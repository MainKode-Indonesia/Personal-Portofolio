import { Check, ExternalLink, Github, X } from 'lucide-react';
import { useEffect } from 'react';
import type { Language, ProjectItem } from '../data/projects';
import MediaImage from './MediaImage';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  lang: Language;
}

export default function ProjectModal({ project, onClose, lang }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#101521]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur-sm dark:border-white/10 dark:bg-[#101521]/95">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-mono font-medium text-blue-600 tabular-nums dark:text-blue-400">
              {project.index}
            </span>
            <span aria-hidden="true">·</span>
            <span>{project.categoryLabel[lang]}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{project.domain}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={lang === 'id' ? 'Tutup pratinjau produk' : 'Close product preview'}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="aspect-[4/3] w-full overflow-hidden border-b border-slate-200 dark:border-white/10">
          <MediaImage
            src={project.image}
            alt={project.imageAlt[lang]}
            title={project.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-6 sm:p-8">
          <h2
            id="project-modal-title"
            className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl"
          >
            {project.title}
          </h2>
          <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
            {project.subtitle[lang]}
          </p>

          <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {project.description[lang]}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-8 border-t border-slate-200 pt-6 dark:border-white/10 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {lang === 'id' ? 'Fokus Produk & Arsitektur' : 'Product & Architecture Highlights'}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {project.focusPoints[lang].map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {lang === 'id' ? 'Tumpukan Teknologi' : 'Tech Stack'}
              </h3>
              <p className="mt-3 font-mono text-sm leading-7 text-slate-600 dark:text-slate-300">
                {project.technologies.join(' · ')}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 whitespace-nowrap shrink-0"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  <span>{lang === 'id' ? 'Buka Live Demo' : 'Open Live Demo'}</span>
                </a>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5 whitespace-nowrap shrink-0"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>{lang === 'id' ? 'Lihat Repository' : 'View Repository'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
