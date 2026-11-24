import { useMemo, useState } from 'react';
import { SKILLS_MATRIX, type Language, type SkillDomain } from '../data/projects';
import { useInView } from '../hooks/useInView';

interface TechStackSectionProps {
  lang: Language;
}

const DOMAIN_FILTERS: Array<{ id: SkillDomain; label: Record<Language, string> }> = [
  { id: 'all', label: { en: 'All', id: 'Semua' } },
  { id: 'frontend', label: { en: 'Frontend', id: 'Frontend' } },
  { id: 'backend', label: { en: 'Backend & Data', id: 'Backend & Data' } },
  { id: 'infra', label: { en: 'Infrastructure', id: 'Infrastruktur' } },
];

export default function TechStackSection({ lang }: TechStackSectionProps) {
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
      id="tech-stack"
      className="border-b border-slate-200 py-16 dark:border-white/10 sm:py-24"
    >
      <div
        className={`mx-auto max-w-7xl px-4 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none sm:px-6 lg:px-10 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}
      >
        <div className="flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 dark:border-white/10 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {lang === 'id' ? '05. Tumpukan Teknologi' : '05. Tech Stack'}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance dark:text-slate-50 sm:text-4xl">
              {lang === 'id'
                ? 'Fondasi teknis yang menopang saya sebagai technical founder.'
                : 'Technical capabilities powering my work as a technical founder.'}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
              {lang === 'id'
                ? 'Sorot atau klik teknologi mana saja untuk melihat bagaimana setiap komponen terhubung dalam sistem produksi.'
                : 'Hover, focus, or tap any technology below to highlight how tools connect across production builds.'}
            </p>
          </div>

          <div
            role="tablist"
            aria-label={lang === 'id' ? 'Filter domain teknologi' : 'Filter tech stack domain'}
            className="inline-flex flex-wrap items-center gap-1 self-start rounded-lg border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-[#101521] lg:self-auto"
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
                ? 'Pilih atau sorot kartu teknologi untuk melihat relasinya.'
                : 'Hover or select a technology tile to inspect related stack connections.'}
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

        {/* Interactive Connected Grid */}
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
                          : 'Connected'
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
    </section>
  );
}
