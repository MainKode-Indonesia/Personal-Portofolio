import { ArrowUpRight, ExternalLink, Github, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  PROJECTS,
  type Language,
  type ProjectCategory,
  type ProjectItem,
} from '../data/projects';
import { useInView } from '../hooks/useInView';
import MediaImage from './MediaImage';

interface ProjectGalleryProps {
  onSelectProject: (project: ProjectItem) => void;
  lang: Language;
}

const CATEGORIES: Array<{ id: ProjectCategory; label: Record<Language, string> }> = [
  { id: 'all', label: { en: 'All', id: 'Semua' } },
  { id: 'product', label: { en: 'Products', id: 'Produk' } },
  { id: 'platform', label: { en: 'Ecosystem Platforms', id: 'Platform Ekosistem' } },
];

export default function ProjectGallery({ onSelectProject, lang }: ProjectGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory =
        activeCategory === 'all' || project.categoryKey === activeCategory;
      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;

      const matchesTitle = project.title.toLowerCase().includes(normalizedQuery);
      const matchesTech = project.technologies.some((tech) =>
        tech.toLowerCase().includes(normalizedQuery)
      );
      return matchesTitle || matchesTech;
    });
  }, [activeCategory, normalizedQuery]);

  const isFiltered = activeCategory !== 'all' || normalizedQuery.length > 0;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="border-b border-slate-200 py-16 dark:border-white/10 sm:py-24"
    >
      <div
        className={`mx-auto max-w-7xl px-4 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none sm:px-6 lg:px-10 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}
      >
        {/* Section Heading */}
        <div>
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {lang === 'id' ? '04. Produk & Proyek' : '04. Products & Projects'}
          </p>
          <h2 className="mt-2 max-w-3xl font-display text-3xl font-bold tracking-tight text-slate-900 text-balance dark:text-slate-50 sm:text-4xl">
            {lang === 'id'
              ? 'Produk dan platform yang saya bangun bersama demo & repositori.'
              : 'Products and platforms I have built, with live demos & repositories.'}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            {lang === 'id'
              ? 'Setiap produk dirancang dari masalah nyata dan dibangun langsung hingga tahap rilis—lengkap dengan demo aktif dan kode sumber di GitHub.'
              : 'Each product starts from a real problem and is built hands-on to production—complete with live demos and open GitHub repositories.'}
          </p>
        </div>

        {/* Category Filter Tabs & Live Search Toolbar */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="tablist"
            aria-label={lang === 'id' ? 'Filter kategori produk' : 'Filter project category'}
            className="inline-flex flex-wrap items-center gap-1 self-start rounded-lg border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-[#101521]"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category.id)}
                  className={`min-h-9 rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 whitespace-nowrap shrink-0 sm:text-sm ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {category.label[lang]}
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-80">
            <label htmlFor="project-search-input" className="sr-only">
              {lang === 'id'
                ? 'Cari proyek berdasarkan judul atau teknologi'
                : 'Search projects by title or technology'}
            </label>
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
              aria-hidden="true"
            />
            <input
              id="project-search-input"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={
                lang === 'id'
                  ? 'Cari judul atau tag teknologi...'
                  : 'Search by title or tech tag...'
              }
              className="min-h-11 w-full rounded-lg border border-slate-200 bg-white pr-10 pl-10 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 dark:border-white/10 dark:bg-[#101521] dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-400 [&::-webkit-search-cancel-button]:hidden"
            />
            {searchQuery.length > 0 && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label={lang === 'id' ? 'Hapus pencarian' : 'Clear search'}
                className="absolute top-1/2 right-1.5 inline-flex min-h-8 min-w-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-slate-500 dark:hover:bg-white/5 dark:hover:text-slate-200"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Bento Grid or Empty Search State */}
        {filteredProjects.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-white/10 dark:bg-[#101521]">
            <p className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
              {lang === 'id'
                ? 'Tidak ada proyek yang cocok dengan pencarian Anda.'
                : 'No projects match your current filter.'}
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {lang === 'id'
                ? 'Coba kata kunci judul atau teknologi lain seperti TypeScript, Next.js, atau PostgreSQL.'
                : 'Try another project title or technology tag such as TypeScript, Next.js, or PostgreSQL.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 whitespace-nowrap shrink-0"
            >
              {lang === 'id' ? 'Reset Filter' : 'Reset Filter'}
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
            {filteredProjects.map((project, idx) => {
              const colSpanClass = !isFiltered
                ? idx < 2
                  ? 'lg:col-span-3'
                  : 'lg:col-span-2'
                : filteredProjects.length >= 3
                  ? 'lg:col-span-2'
                  : 'lg:col-span-3';

              return (
                <article
                  key={project.id}
                  className={`group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors duration-150 hover:border-slate-300 dark:border-white/10 dark:bg-[#101521] dark:hover:border-white/20 ${colSpanClass}`}
                >
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    aria-label={
                      lang === 'id'
                        ? `Buka detail ${project.title}`
                        : `Open details for ${project.title}`
                    }
                    className="relative block aspect-[4/3] w-full overflow-hidden border-b border-slate-200 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-white/10"
                  >
                    <MediaImage
                      src={project.image}
                      alt={project.imageAlt[lang]}
                      title={project.title}
                      className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
                    />
                    <span className="absolute bottom-3 left-4 font-mono text-xs text-white/95">
                      {project.domain}
                    </span>
                  </button>

                  <div className="flex flex-1 flex-col p-6">
                    {/* Zero-Pill Metadata */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-mono font-medium text-blue-600 tabular-nums dark:text-blue-400">
                        {project.index}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{project.categoryLabel[lang]}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.status[lang]}</span>
                    </div>

                    <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="text-left transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 dark:hover:text-blue-400"
                      >
                        {project.title}
                      </button>
                    </h3>

                    <p className="mt-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                      {project.subtitle[lang]}
                    </p>

                    <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {project.summary[lang]}
                    </p>

                    <p className="mt-4 font-mono text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      {project.technologies.join(' · ')}
                    </p>

                    <div className="mt-auto pt-5">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-white/10">
                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-slate-900 transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 dark:text-slate-100 dark:hover:text-blue-400 whitespace-nowrap shrink-0"
                        >
                          <span>{lang === 'id' ? 'Detail Produk' : 'Case Study'}</span>
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </button>

                        <div className="flex items-center gap-4">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-10 items-center gap-1.5 text-xs font-medium text-slate-600 transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 dark:text-slate-300 dark:hover:text-blue-400 whitespace-nowrap shrink-0"
                          >
                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Live Demo</span>
                          </a>

                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-10 items-center gap-1.5 text-xs font-medium text-slate-600 transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 dark:text-slate-300 dark:hover:text-blue-400 whitespace-nowrap shrink-0"
                          >
                            <Github className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Repository</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
