import { OWNER_PROFILE, type Language } from '../data/projects';
import { useInView } from '../hooks/useInView';
import MediaImage from './MediaImage';

interface AboutSectionProps {
  lang: Language;
}

export default function AboutSection({ lang }: AboutSectionProps) {
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="border-b border-slate-200 py-16 dark:border-white/10 sm:py-24"
    >
      <div
        className={`mx-auto max-w-7xl px-4 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none sm:px-6 lg:px-10 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}
      >
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {lang === 'id' ? '01. Tentang Saya' : '01. About Me'}
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance dark:text-slate-50 sm:text-4xl">
                {lang === 'id'
                  ? 'Berakar dari rekayasa kode, tumbuh membangun ekosistem Nafeka.'
                  : 'Rooted in hands-on software engineering, building the Nafeka ecosystem.'}
              </h2>

              <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                <p>
                  {lang === 'id' ? (
                    <>
                      Saya{' '}
                      <strong className="font-semibold text-slate-900 dark:text-slate-100">
                        {OWNER_PROFILE.fullName}
                      </strong>
                      . Perjalanan saya berawal dari studi Informatika dan riset komputasi terapan
                      (termasuk penelitian analisis sentimen Naïve Bayes dan segmentasi K-Means),
                      yang membentuk cara berpikir analitis saya dalam merancang perangkat lunak.
                    </>
                  ) : (
                    <>
                      I am{' '}
                      <strong className="font-semibold text-slate-900 dark:text-slate-100">
                        {OWNER_PROFILE.fullName}
                      </strong>
                      . My journey started in Computer Science (Informatics) and applied data
                      research—including published work on Naïve Bayes sentiment analysis and
                      K-Means clustering—which shaped how I approach structured software problem
                      solving.
                    </>
                  )}
                </p>

                <p>
                  {lang === 'id'
                    ? 'Sebagai pengembang, saya tidak berhenti di prototipe. Saya mendirikan Nafeka untuk menyatukan ide, rekayasa perangkat lunak, dan publikasi teknologi menjadi satu ekosistem—di mana setiap gagasan bisa dirawat, dikembangkan secara teknis, dan dirilis sebagai produk digital yang benar-benar membantu pengguna.'
                    : 'As a developer, I never wanted ideas to stop at isolated prototypes. I founded Nafeka to unite product vision, software engineering, and knowledge sharing into one cohesive ecosystem—turning raw ideas into reliable digital products that solve real-world workflows.'}
                </p>
              </div>
            </div>

            {/* Personal Facts Table */}
            <dl className="mt-8 divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/10 dark:border-white/10">
              {OWNER_PROFILE.personalFacts.map((fact) => (
                <div
                  key={fact.label.en}
                  className="flex flex-wrap items-baseline justify-between gap-2 py-3 text-sm"
                >
                  <dt className="text-slate-500 dark:text-slate-400">{fact.label[lang]}</dt>
                  <dd className="font-medium text-slate-900 dark:text-slate-100">
                    {fact.value[lang]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#101521]">
              <MediaImage
                src={OWNER_PROFILE.workspaceImage}
                alt={OWNER_PROFILE.workspaceImageAlt[lang]}
                title={OWNER_PROFILE.fullName}
                className="aspect-[4/3] h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
