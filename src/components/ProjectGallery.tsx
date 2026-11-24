import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { FEATURED_PROJECT, type Language, type ProjectItem } from '../data/projects';
import { useInView } from '../hooks/useInView';
import MediaImage from './MediaImage';

interface ProjectGalleryProps {
  onSelectProject: (project: ProjectItem) => void;
  lang: Language;
}

export default function ProjectGallery({ onSelectProject, lang }: ProjectGalleryProps) {
  const project = FEATURED_PROJECT;
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  return (
    <section
      ref={sectionRef}
      id="proyek"
      className="border-b border-slate-200 py-16 dark:border-white/10 sm:py-24"
    >
      <div
        className={`mx-auto max-w-7xl px-4 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none sm:px-6 lg:px-10 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}
      >
        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {lang === 'id' ? '02. Proyek & Karya' : '02. Featured Project'}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance dark:text-slate-50 sm:text-4xl">
              {lang === 'id'
                ? 'MainKode — Ruang Dokumentasi Proyek Saya'
                : 'MainKode — My Project Documentation Hub'}
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-300">
              {lang === 'id' ? (
                <>
                  Seluruh galeri dan daftar proyek yang pernah saya bangun dikumpulkan di platform{' '}
                  <span className="font-mono text-slate-800 dark:text-slate-200">
                    mainkode.nafeka.my.id
                  </span>
                  . Klik detail proyek di bawah untuk melihat rinciannya.
                </>
              ) : (
                <>
                  My complete gallery of software projects is curated on{' '}
                  <span className="font-mono text-slate-800 dark:text-slate-200">
                    mainkode.nafeka.my.id
                  </span>
                  . Select project details below to explore more.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Single Featured Project Showcase Card */}
        <article className="mt-10 grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#101521] lg:grid-cols-12">
          {/* Project Visual */}
          <button
            type="button"
            onClick={() => onSelectProject(project)}
            aria-label={
              lang === 'id'
                ? `Buka detail proyek ${project.title}`
                : `Open details for ${project.title}`
            }
            className="group relative block aspect-[4/3] w-full overflow-hidden border-b border-slate-200 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-white/10 lg:col-span-6 lg:aspect-auto lg:h-full lg:border-b-0 lg:border-r"
          >
            <MediaImage
              src={project.image}
              alt={project.imageAlt[lang]}
              title={project.title}
              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 via-black/20 to-transparent"
            />
            <span className="absolute bottom-4 left-5 font-mono text-xs text-white/95">
              {project.domain}
            </span>
          </button>

          {/* Project Summary & Actions */}
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-6 lg:p-10">
            <div>
              {/* Zero-Pill Metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-mono font-medium text-blue-600 tabular-nums dark:text-blue-400">
                  {project.index}
                </span>
                <span aria-hidden="true">·</span>
                <span>{project.category}</span>
                <span aria-hidden="true">·</span>
                <span>{project.status[lang]}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{project.year}</span>
              </div>

              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="text-left transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 dark:hover:text-blue-400"
                >
                  {project.title}
                </button>
              </h3>

              <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                {project.subtitle[lang]}
              </p>

              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {project.summary[lang]}
              </p>

              <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 dark:border-white/10 dark:bg-[#080B12] dark:text-slate-300">
                {project.otherProjectsNote[lang]}
              </p>

              {/* Clean Unboxed Tech Stack Line */}
              <p className="mt-5 font-mono text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {project.technologies.join(' · ')}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-6 dark:border-white/10">
              <button
                type="button"
                onClick={() => onSelectProject(project)}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 whitespace-nowrap shrink-0"
              >
                <span>{lang === 'id' ? 'Detail Proyek' : 'Project Details'}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5 whitespace-nowrap shrink-0"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span>{lang === 'id' ? 'Kunjungi MainKode' : 'Visit MainKode'}</span>
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 px-2 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 dark:text-slate-300 dark:hover:text-blue-400 whitespace-nowrap shrink-0"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span>Source Code</span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
