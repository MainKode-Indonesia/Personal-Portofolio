import { ArrowDownRight, Download, Moon, Sun } from 'lucide-react';
import { HERO_METRICS, OWNER_PROFILE, type Language } from '../data/projects';
import { useInView } from '../hooks/useInView';
import MediaImage from './MediaImage';

interface HeroProps {
  theme: 'dark' | 'light';
  onToggleTheme: (next: 'dark' | 'light') => void;
  lang: Language;
}

export default function Hero({ theme, onToggleTheme, lang }: HeroProps) {
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>({
    threshold: 0.01,
    rootMargin: '0px',
  });

  return (
    <section
      ref={sectionRef}
      id="beranda"
      className="border-b border-slate-200 dark:border-white/10"
    >
      <div
        className={`mx-auto max-w-7xl px-4 pb-14 pt-6 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none sm:px-6 sm:pb-20 sm:pt-8 lg:px-10 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        {/* Hero Utility Bar: Contextual info & Theme Mode Switch */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-5 dark:border-white/10">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <span>{OWNER_PROFILE.location[lang]}</span>
            <span aria-hidden="true">·</span>
            <span>{OWNER_PROFILE.personalTitle[lang]}</span>
          </div>

          <div
            role="group"
            aria-label={lang === 'id' ? 'Pengaturan mode tampilan' : 'Appearance mode'}
            className="inline-flex items-center rounded-lg border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-[#101521]"
          >
            <button
              type="button"
              onClick={() => onToggleTheme('dark')}
              aria-pressed={theme === 'dark'}
              className={`inline-flex min-h-9 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 whitespace-nowrap shrink-0 ${
                theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Moon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{lang === 'id' ? 'Mode Gelap' : 'Dark Mode'}</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleTheme('light')}
              aria-pressed={theme === 'light'}
              className={`inline-flex min-h-9 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 whitespace-nowrap shrink-0 ${
                theme === 'light'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Sun className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{lang === 'id' ? 'Mode Terang' : 'Light Mode'}</span>
            </button>
          </div>
        </div>

        {/* Split-Screen Personal Hero */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {lang === 'id' ? `Halo, saya ${OWNER_PROFILE.fullName}` : `Hello, I'm ${OWNER_PROFILE.fullName}`}
            </p>

            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.12] tracking-tight text-slate-900 text-balance dark:text-slate-50 sm:text-5xl lg:text-[3.25rem]">
              {lang === 'id'
                ? 'Merancang dan membangun produk web modern yang fungsional.'
                : 'Designing and engineering modern, purposeful web products.'}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-[17px]">
              {lang === 'id'
                ? 'Saya adalah seorang pengembang web dan kreator digital yang berbasis di Purworejo, Indonesia. Saya berfokus membangun antarmuka yang bersih, responsif di berbagai perangkat, serta sistem web yang cepat dan mudah digunakan.'
                : 'I am a web developer and digital creator based in Purworejo, Indonesia. I focus on crafting clean, responsive interfaces across devices and fast, reliable web systems built for everyday usability.'}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#tentang"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 whitespace-nowrap shrink-0"
              >
                <span>{lang === 'id' ? 'Kenali Saya Lebih Dekat' : 'About Me'}</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href={OWNER_PROFILE.cvUrl}
                download={OWNER_PROFILE.cvFileName}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 transition-colors duration-150 hover:border-slate-300 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-white/15 dark:bg-[#101521] dark:text-slate-100 dark:hover:border-white/25 dark:hover:bg-white/5 whitespace-nowrap shrink-0"
              >
                <Download className="h-4 w-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <span>{lang === 'id' ? 'Unduh CV' : 'Download CV'}</span>
              </a>

              <a
                href="#proyek"
                className="inline-flex min-h-11 items-center px-2 py-2 text-sm font-medium text-slate-700 underline decoration-slate-300 underline-offset-8 transition-colors duration-150 hover:text-blue-600 hover:decoration-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 dark:text-slate-200 dark:decoration-slate-700 dark:hover:text-blue-400 dark:hover:decoration-blue-400 whitespace-nowrap shrink-0"
              >
                {lang === 'id' ? 'Lihat Proyek Utama' : 'View Featured Project'}
              </a>
            </div>
          </div>

          {/* Personal Portrait */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-full border border-slate-200 bg-slate-900 shadow-lg dark:border-white/15 sm:max-w-[380px]">
              <MediaImage
                src={OWNER_PROFILE.avatarImage}
                alt={OWNER_PROFILE.avatarAlt[lang]}
                title={OWNER_PROFILE.fullName}
                className="h-full w-full scale-[1.04] object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Metric Strip */}
        <div className="mt-14 grid grid-cols-2 gap-6 border-t border-slate-200 pt-8 dark:border-white/10 lg:grid-cols-4 lg:gap-8">
          {HERO_METRICS.map((metric) => (
            <div key={metric.value} className="flex flex-col gap-1">
              <span className="font-mono text-2xl font-semibold tracking-tight text-slate-900 tabular-nums dark:text-slate-50 sm:text-3xl">
                {metric.value}
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
                {metric.label[lang]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
