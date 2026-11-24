import { useMemo, useState } from 'react';
import {
  APPROACH_ITEMS,
  OWNER_PROFILE,
  SKILLS_MATRIX,
  type Language,
  type SkillDomain,
} from '../data/projects';
import { useInView } from '../hooks/useInView';
import MediaImage from './MediaImage';

interface AboutAndSkillsProps {
  lang: Language;
}

const DOMAIN_FILTERS: Array<{ id: SkillDomain; label: Record<Language, string> }> = [
  { id: 'all', label: { id: 'Semua', en: 'All' } },
  { id: 'frontend', label: { id: 'Frontend', en: 'Frontend' } },
  { id: 'backend', label: { id: 'Backend & Data', en: 'Backend & Data' } },
  { id: 'infra', label: { id: 'Infrastruktur', en: 'Infrastructure' } },
];

export default function AboutAndSkills({ lang }: AboutAndSkillsProps) {
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  const [selectedDomain, setSelectedDomain] = useState<SkillDomain>('all');
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const [pinnedSkillId, setPinnedSkillId] = useState<string | null>(null);

  const activeSkillId = hoveredSkillId ?? pinnedSkillId;

  const activeSkill = useMemo(
    () => SKILLS_MATRIX.find((s) => s.id === activeSkillId) ?? null,
    [activeSkillId]
  );

  const relatedNames = useMemo(() => {
    if (!activeSkill) return [];
    return activeSkill.relatedIds
      .map((id) => SKILLS_MATRIX.find((s) => s.id === id)?.name)
      .filter((name): name is string => Boolean(name));
  }, [activeSkill]);

  const visibleSkills = useMemo(() => {
    if (selectedDomain === 'all') return SKILLS_MATRIX;
    return SKILLS_MATRIX.filter((skill) => skill.domain === selectedDomain);
  }, [selectedDomain]);

  return (
    <section
      ref={sectionRef}
      id="tentang"
      className="border-b border-slate-200 py-16 dark:border-white/10 sm:py-24"
    >
      <div
        className={`mx-auto max-w-7xl px-4 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none sm:px-6 lg:px-10 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}
      >
        {/* Section 01: Personal Introduction & Background */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {lang === 'id' ? '01. Tentang Saya' : '01. About Me'}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance dark:text-slate-50 sm:text-4xl">
              {lang === 'id'
                ? 'Perjalanan saya membangun dari ide hingga menjadi kode.'
                : 'My journey turning ideas into clean, working software.'}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {lang === 'id' ? (
                <>
                  Saya{' '}
                  <strong className="font-semibold text-slate-900 dark:text-slate-100">
                    {OWNER_PROFILE.fullName}
                  </strong>
                  . Saya memulai eksplorasi di dunia pengembangan web karena ketertarikan melihat
                  bagaimana sebuah gagasan dapat diubah menjadi aplikasi nyata yang cepat, rapi,
                  dan bermanfaat bagi pengguna di berbagai perangkat.
                </>
              ) : (
                <>
                  I am{' '}
                  <strong className="font-semibold text-slate-900 dark:text-slate-100">
                    {OWNER_PROFILE.fullName}
                  </strong>
                  . My journey in web development began with a curiosity about transforming raw
                  concepts into fast, well-structured applications that feel effortless across
                  mobile and desktop screens.
                </>
              )}
            </p>

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

          <div className="flex flex-col gap-8 lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#101521]">
              <MediaImage
                src={OWNER_PROFILE.workspaceImage}
                alt={OWNER_PROFILE.workspaceImageAlt[lang]}
                title={OWNER_PROFILE.fullName}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>

            <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/10 dark:border-white/10">
              {APPROACH_ITEMS.map((item) => (
                <div
                  key={item.index}
                  className="grid grid-cols-1 gap-3 py-5 sm:grid-cols-12 sm:gap-6"
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
                        {item.summary[lang]}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:col-span-7">
                    {item.detail[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Technical Skills Grid */}
        <div id="keahlian" className="mt-16 pt-4 sm:mt-20">
          <div className="flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 dark:border-white/10 lg:flex-row lg:items-end">
            <div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {lang === 'id' ? 'Keahlian & Ekosistem Teknologi' : 'Skills & Connected Stack'}
              </h3>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
                {lang === 'id'
                  ? 'Arahkan kursor atau klik salah satu teknologi untuk melihat teknologi lain yang saling terhubung.'
                  : 'Hover, focus, or select any technology to highlight related tools across my stack.'}
              </p>
            </div>

            {/* Domain Segmented Filter */}
            <div
              role="tablist"
              aria-label={lang === 'id' ? 'Filter domain keahlian' : 'Filter skill domain'}
              className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-[#101521]"
            >
              {DOMAIN_FILTERS.map((tab) => {
                const isActive = selectedDomain === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setSelectedDomain(tab.id);
                      setPinnedSkillId(null);
                      setHoveredSkillId(null);
                    }}
                    className={`min-h-9 rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {tab.label[lang]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Relationship Readout Bar */}
          <div
            aria-live="polite"
            className="mt-5 flex min-h-11 flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4 text-xs dark:border-white/10 sm:text-sm"
          >
            {activeSkill ? (
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-slate-700 dark:text-slate-200">
                <span className="font-display font-semibold text-blue-600 dark:text-blue-400">
                  {activeSkill.name}
                </span>
                <span aria-hidden="true" className="text-slate-400">
                  ·
                </span>
                <span>{activeSkill.role[lang]}</span>
                {relatedNames.length > 0 && (
                  <>
                    <span aria-hidden="true" className="text-slate-400">
                      ·
                    </span>
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                      {lang === 'id' ? 'Terhubung: ' : 'Connected: '}
                      {relatedNames.join(' · ')}
                    </span>
                  </>
                )}
              </div>
            ) : (
              <p className="text-slate-500 dark:text-slate-400">
                {lang === 'id'
                  ? 'Pilih atau sorot kartu teknologi di bawah untuk menyorot relasinya dalam proyek nyata.'
                  : 'Hover or tap any technology tile below to highlight its connected tools.'}
              </p>
            )}

            {pinnedSkillId && (
              <button
                type="button"
                onClick={() => {
                  setPinnedSkillId(null);
                  setHoveredSkillId(null);
                }}
                className="text-xs font-medium text-blue-600 underline underline-offset-4 hover:text-blue-700 dark:text-blue-400 whitespace-nowrap shrink-0"
              >
                {lang === 'id' ? 'Reset Sorotan' : 'Clear Selection'}
              </button>
            )}
          </div>

          {/* Interactive Grid */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {visibleSkills.map((skill) => {
              const isSelected = activeSkill?.id === skill.id;
              const isRelated = Boolean(
                activeSkill && activeSkill.relatedIds.includes(skill.id)
              );
              const isDimmed = Boolean(activeSkill && !isSelected && !isRelated);

              return (
                <button
                  key={skill.id}
                  type="button"
                  onMouseEnter={() => setHoveredSkillId(skill.id)}
                  onMouseLeave={() => setHoveredSkillId(null)}
                  onFocus={() => setHoveredSkillId(skill.id)}
                  onBlur={() => setHoveredSkillId(null)}
                  onClick={() =>
                    setPinnedSkillId((prev) => (prev === skill.id ? null : skill.id))
                  }
                  aria-pressed={pinnedSkillId === skill.id}
                  className={`group flex min-h-24 flex-col justify-between rounded-xl border p-4 text-left transition-[opacity,transform,border-color,background-color] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
                    isSelected
                      ? '-translate-y-0.5 border-blue-600 bg-blue-50/80 dark:border-blue-500 dark:bg-blue-950/40'
                      : isRelated
                        ? '-translate-y-0.5 border-blue-400/70 bg-white dark:border-blue-500/45 dark:bg-[#131C2E]'
                        : 'border-slate-200 bg-white hover:border-slate-300 dark:border-white/10 dark:bg-[#101521] dark:hover:border-white/20'
                  } ${isDimmed ? 'opacity-45' : 'opacity-100'}`}
                >
                  <div className="flex w-full items-center justify-between gap-2 text-[11px]">
                    <span
                      className={`font-mono tabular-nums ${
                        isSelected || isRelated
                          ? 'font-medium text-blue-600 dark:text-blue-400'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {skill.index}
                    </span>
                    <span className="truncate text-slate-500 dark:text-slate-400">
                      {isSelected
                        ? lang === 'id'
                          ? 'Aktif'
                          : 'Active'
                        : isRelated
                          ? lang === 'id'
                            ? 'Terkait'
                            : 'Related'
                          : skill.category[lang]}
                    </span>
                  </div>

                  <span className="mt-3 font-display text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-[15px]">
                    {skill.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
