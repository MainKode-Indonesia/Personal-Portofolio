import { LEADERSHIP_PRINCIPLES, type Language } from '../data/projects';
import { useInView } from '../hooks/useInView';

interface LeadershipSectionProps {
  lang: Language;
}

export default function LeadershipSection({ lang }: LeadershipSectionProps) {
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className="border-b border-slate-200 py-16 dark:border-white/10 sm:py-24"
    >
      <div
        className={`mx-auto max-w-7xl px-4 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none sm:px-6 lg:px-10 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {lang === 'id' ? '02. Kepemimpinan' : '02. Leadership'}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance dark:text-slate-50 sm:text-4xl">
              {lang === 'id'
                ? 'Memimpin visi produk sekaligus terjun langsung membangun.'
                : 'Leading product strategy while staying hands-on in code.'}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {lang === 'id'
                ? 'Sebagai Founder & CEO Nafeka, saya memadukan arah strategis produk dengan eksekusi teknis langsung—memastikan keputusan arsitektur, kualitas desain, dan nilai bisnis bergerak selaras.'
                : 'As Founder & CEO of Nafeka, I bridge long-term product strategy with direct technical execution—ensuring architecture decisions, interface craft, and user value stay tightly aligned.'}
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/10 dark:border-white/10">
              {LEADERSHIP_PRINCIPLES.map((item) => (
                <div
                  key={item.index}
                  className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-12 sm:gap-6"
                >
                  <div className="flex items-baseline gap-3 sm:col-span-5">
                    <span className="font-mono text-sm font-medium text-blue-600 tabular-nums dark:text-blue-400">
                      {item.index}.
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {item.title[lang]}
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        {item.subtitle[lang]}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:col-span-7">
                    {item.description[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
