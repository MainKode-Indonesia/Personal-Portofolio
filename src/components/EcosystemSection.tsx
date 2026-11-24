import { ArrowUpRight } from 'lucide-react';
import { ECOSYSTEM_PILLARS, type Language } from '../data/projects';
import { useInView } from '../hooks/useInView';

interface EcosystemSectionProps {
  lang: Language;
}

export default function EcosystemSection({ lang }: EcosystemSectionProps) {
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      className="border-b border-slate-200 py-16 dark:border-white/10 sm:py-24"
    >
      <div
        className={`mx-auto max-w-7xl px-4 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none sm:px-6 lg:px-10 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}
      >
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {lang === 'id' ? '03. Ekosistem Saya' : '03. My Ecosystem'}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance dark:text-slate-50 sm:text-4xl">
              {lang === 'id'
                ? 'Tiga pilar yang saling terhubung: Nafeka, MainKode & KataKode.'
                : 'Three connected pillars: Nafeka, MainKode & KataKode.'}
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {lang === 'id'
              ? 'Setiap platform memiliki peran spesifik—identitas brand, etalase rekayasa, dan publikasi pengetahuan—yang bergerak dalam satu arah ekosistem.'
              : 'Each platform serves a distinct role—brand identity, engineering showcase, and technical publishing—operating within one cohesive system.'}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {ECOSYSTEM_PILLARS.map((pillar) => (
            <article
              key={pillar.name}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-colors duration-150 hover:border-slate-300 dark:border-white/10 dark:bg-[#101521] dark:hover:border-white/20 sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-mono font-medium text-blue-600 tabular-nums dark:text-blue-400">
                    {pillar.index}
                  </span>
                  <span className="font-mono">{pillar.domain}</span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                  {pillar.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                  {pillar.role[lang]}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {pillar.description[lang]}
                </p>

                <p className="mt-5 font-mono text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {pillar.highlights[lang].join(' · ')}
                </p>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-4 dark:border-white/10">
                <a
                  href={pillar.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-slate-900 transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 dark:text-slate-100 dark:hover:text-blue-400 whitespace-nowrap shrink-0"
                >
                  <span>
                    {lang === 'id' ? `Kunjungi ${pillar.name}` : `Visit ${pillar.name}`}
                  </span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
