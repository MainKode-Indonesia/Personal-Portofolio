import { JOURNEY_MILESTONES, type Language } from '../data/projects';
import { useInView } from '../hooks/useInView';

interface JourneySectionProps {
  lang: Language;
}

export default function JourneySection({ lang }: JourneySectionProps) {
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="border-b border-slate-200 py-16 dark:border-white/10 sm:py-24"
    >
      <div
        className={`mx-auto max-w-7xl px-4 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none sm:px-6 lg:px-10 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {lang === 'id' ? '07. Perjalanan' : '07. Journey'}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance dark:text-slate-50 sm:text-4xl">
              {lang === 'id'
                ? 'Dari ide dan pembelajaran hingga merilis produk.'
                : 'From early ideas and learning to shipping live products.'}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {lang === 'id'
                ? 'Rangkaian tahapan yang membentuk cara saya berpikir sebagai peneliti, pengembang, sekaligus pendiri Nafeka.'
                : 'The milestones that shaped my path across Informatics research, hands-on engineering, and building Nafeka.'}
            </p>
          </div>

          <div className="lg:col-span-8">
            <ol className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/10 dark:border-white/10">
              {JOURNEY_MILESTONES.map((milestone) => (
                <li
                  key={milestone.period + milestone.title.en}
                  className="grid grid-cols-1 gap-4 py-7 sm:grid-cols-12 sm:gap-6"
                >
                  <div className="sm:col-span-4">
                    <span className="font-mono text-sm font-semibold text-blue-600 tabular-nums dark:text-blue-400">
                      {milestone.period}
                    </span>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {milestone.phase[lang]}
                    </p>
                  </div>

                  <div className="sm:col-span-8">
                    <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {milestone.title[lang]}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {milestone.description[lang]}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
