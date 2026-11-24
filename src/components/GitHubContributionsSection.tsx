import { ArrowUpRight, GitBranch, Github, RefreshCw, Star } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Language } from '../data/projects';
import { useInView } from '../hooks/useInView';

interface GitHubContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubRepoSummary {
  name: string;
  url: string;
  description: string;
  language: string | null;
  stars: number;
  forks: number;
  pushedAt: string;
}

interface GitHubContributionsData {
  username: string;
  profileUrl: string;
  avatarUrl: string;
  name: string;
  company: string | null;
  location: string | null;
  publicRepos: number;
  totalContributions: number;
  activeDays: number;
  currentStreak: number;
  longestStreak: number;
  peakDay: { date: string; count: number } | null;
  days: GitHubContributionDay[];
  recentRepos: GitHubRepoSummary[];
  fetchedAt: string;
}

interface GitHubContributionsSectionProps {
  lang: Language;
}

interface WeekColumn {
  days: Array<GitHubContributionDay | null>;
  monthLabel: string | null;
}

const LEVEL_COLORS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: 'bg-slate-100 hover:ring-slate-300 dark:bg-white/[0.06] dark:hover:ring-white/25',
  1: 'bg-blue-200 hover:ring-blue-400 dark:bg-blue-950 dark:hover:ring-blue-700',
  2: 'bg-blue-400 hover:ring-blue-500 dark:bg-blue-700 dark:hover:ring-blue-500',
  3: 'bg-blue-500 hover:ring-blue-600 dark:bg-blue-500 dark:hover:ring-blue-400',
  4: 'bg-blue-600 hover:ring-blue-700 dark:bg-blue-400 dark:hover:ring-blue-300',
};

const LEGEND_COLORS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: 'bg-slate-100 dark:bg-white/[0.06]',
  1: 'bg-blue-200 dark:bg-blue-950',
  2: 'bg-blue-400 dark:bg-blue-700',
  3: 'bg-blue-500 dark:bg-blue-500',
  4: 'bg-blue-600 dark:bg-blue-400',
};

function formatDisplayDate(isoDate: string, lang: Language): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

function formatMonthShort(isoDate: string, lang: Language): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-US', {
    month: 'short',
    timeZone: 'UTC',
  }).format(date);
}

function formatRepoDate(isoTimestamp: string, lang: Language): string {
  const date = new Date(isoTimestamp);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function buildCalendarWeeks(
  days: GitHubContributionDay[],
  lang: Language
): WeekColumn[] {
  if (days.length === 0) return [];

  const firstDate = new Date(`${days[0].date}T00:00:00Z`);
  const leadingEmptyDays = Number.isNaN(firstDate.getTime()) ? 0 : firstDate.getUTCDay();

  const paddedDays: Array<GitHubContributionDay | null> = [
    ...Array<null>(leadingEmptyDays).fill(null),
    ...days,
  ];

  const columns: WeekColumn[] = [];
  let lastMonthKey = '';

  for (let i = 0; i < paddedDays.length; i += 7) {
    const slice = paddedDays.slice(i, i + 7);
    while (slice.length < 7) {
      slice.push(null);
    }

    const firstValidDay = slice.find((d): d is GitHubContributionDay => d !== null);
    let monthLabel: string | null = null;

    if (firstValidDay) {
      const monthKey = firstValidDay.date.slice(0, 7);
      if (monthKey !== lastMonthKey) {
        // Avoid crowded overlapping label on the very first partial column
        if (columns.length > 0 || leadingEmptyDays <= 2) {
          monthLabel = formatMonthShort(firstValidDay.date, lang);
        }
        lastMonthKey = monthKey;
      }
    }

    columns.push({ days: slice, monthLabel });
  }

  return columns;
}

export default function GitHubContributionsSection({ lang }: GitHubContributionsSectionProps) {
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  const [data, setData] = useState<GitHubContributionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<GitHubContributionDay | null>(null);

  const loadContributions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/github-contributions');
      const json = (await response.json()) as {
        ok?: boolean;
        data?: GitHubContributionsData;
        error?: string;
      };

      if (!response.ok || !json.ok || !json.data) {
        throw new Error(json.error || 'Failed to load GitHub contributions');
      }

      setData(json.data);
      if (json.data.peakDay) {
        const peakMatch = json.data.days.find(
          (d) => d.date === json.data!.peakDay!.date
        );
        if (peakMatch) {
          setSelectedDay(peakMatch);
        }
      }
    } catch {
      setError(
        lang === 'id'
          ? 'Data kontribusi GitHub sedang tidak dapat dimuat.'
          : 'Unable to load live GitHub contributions right now.'
      );
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    loadContributions();
  }, [loadContributions]);

  const calendarWeeks = useMemo(
    () => (data ? buildCalendarWeeks(data.days, lang) : []),
    [data, lang]
  );

  return (
    <section
      ref={sectionRef}
      id="contributions"
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
              {lang === 'id' ? '06. Kontribusi GitHub' : '06. GitHub Contributions'}
            </p>
            <h2 className="mt-2 max-w-3xl font-display text-3xl font-bold tracking-tight text-slate-900 text-balance dark:text-slate-50 sm:text-4xl">
              {lang === 'id'
                ? 'Aktivitas commit dan kontribusi kode terbuka secara langsung.'
                : 'Live open-source commit activity and shipping cadence.'}
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-300">
              {lang === 'id'
                ? 'Riwayat kontribusi nyata dari akun @MainKode-Indonesia selama satu tahun terakhir bersama repositori aktif yang saya bangun.'
                : 'Verified contribution history from @MainKode-Indonesia over the past year alongside actively maintained public repositories.'}
            </p>
          </div>

          <a
            href={data?.profileUrl || 'https://github.com/MainKode-Indonesia'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition-colors hover:border-slate-300 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-white/10 dark:bg-[#101521] dark:text-slate-100 dark:hover:border-white/20 dark:hover:text-blue-400 lg:self-auto whitespace-nowrap shrink-0"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            <span>@MainKode-Indonesia</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        {/* Loading State */}
        {loading && !data && (
          <div
            aria-busy="true"
            className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#101521] sm:p-8"
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 animate-pulse rounded-xl bg-slate-100 motion-reduce:animate-none dark:bg-white/5"
                />
              ))}
            </div>
            <div className="mt-6 h-32 animate-pulse rounded-xl bg-slate-100 motion-reduce:animate-none dark:bg-white/5" />
          </div>
        )}

        {/* Error State */}
        {!loading && error && !data && (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-white/10 dark:bg-[#101521]">
            <p className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
              {error}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={loadContributions}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 whitespace-nowrap shrink-0"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                <span>{lang === 'id' ? 'Muat Ulang' : 'Retry'}</span>
              </button>
              <a
                href="https://github.com/MainKode-Indonesia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5 whitespace-nowrap shrink-0"
              >
                <span>{lang === 'id' ? 'Buka GitHub' : 'Open GitHub'}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}

        {/* Loaded GitHub Contributions & Repositories */}
        {data && (
          <>
            {/* Quantitative Contribution Summary Strip */}
            <div className="mt-10 grid grid-cols-2 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-[#101521] lg:grid-cols-4 lg:divide-x lg:divide-y-0">
              <div className="p-5 sm:p-6">
                <p className="font-mono text-2xl font-bold tracking-tight text-slate-900 tabular-nums dark:text-slate-50 sm:text-3xl">
                  {data.totalContributions.toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                  {lang === 'id'
                    ? 'Kontribusi (12 bulan terakhir)'
                    : 'Contributions (last 12 months)'}
                </p>
              </div>

              <div className="p-5 sm:p-6">
                <p className="font-mono text-2xl font-bold tracking-tight text-slate-900 tabular-nums dark:text-slate-50 sm:text-3xl">
                  {String(data.publicRepos).padStart(2, '0')}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                  {lang === 'id' ? 'Repositori Publik' : 'Public Repositories'}
                </p>
              </div>

              <div className="p-5 sm:p-6">
                <p className="font-mono text-2xl font-bold tracking-tight text-slate-900 tabular-nums dark:text-slate-50 sm:text-3xl">
                  {data.currentStreak}d
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                  {lang === 'id'
                    ? `Streak aktif · Terpanjang ${data.longestStreak}h`
                    : `Active streak · Best ${data.longestStreak}d`}
                </p>
              </div>

              <div className="p-5 sm:p-6">
                <p className="font-mono text-2xl font-bold tracking-tight text-slate-900 tabular-nums dark:text-slate-50 sm:text-3xl">
                  {data.peakDay ? data.peakDay.count : 0}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                  {data.peakDay
                    ? lang === 'id'
                      ? `Puncak harian (${formatDisplayDate(data.peakDay.date, lang)})`
                      : `Peak day (${formatDisplayDate(data.peakDay.date, lang)})`
                    : lang === 'id'
                      ? 'Aktivitas harian tertinggi'
                      : 'Highest daily output'}
                </p>
              </div>
            </div>

            {/* 53-Week Interactive Contribution Heatmap */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#101521] sm:p-7">
              <div className="flex flex-col justify-between gap-3 border-b border-slate-200/80 pb-4 dark:border-white/10 sm:flex-row sm:items-center">
                <div aria-live="polite" className="text-sm text-slate-700 dark:text-slate-200">
                  {selectedDay ? (
                    <span>
                      <strong className="font-mono font-semibold text-blue-600 tabular-nums dark:text-blue-400">
                        {selectedDay.count}{' '}
                        {lang === 'id'
                          ? 'kontribusi'
                          : selectedDay.count === 1
                            ? 'contribution'
                            : 'contributions'}
                      </strong>{' '}
                      <span className="text-slate-500 dark:text-slate-400">
                        {lang === 'id' ? 'pada' : 'on'}{' '}
                        {formatDisplayDate(selectedDay.date, lang)}
                      </span>
                    </span>
                  ) : (
                    <span className="text-slate-500 dark:text-slate-400">
                      {lang === 'id'
                        ? 'Sorot atau ketuk kotak tanggal untuk melihat rincian kontribusi.'
                        : 'Hover, focus, or tap any day cell to inspect contribution details.'}
                    </span>
                  )}
                </div>

                {/* Color Intensity Legend */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <span>{lang === 'id' ? 'Sedikit' : 'Less'}</span>
                  {([0, 1, 2, 3, 4] as const).map((level) => (
                    <span
                      key={level}
                      aria-hidden="true"
                      className={`inline-block h-3 w-3 rounded-[3px] ${LEGEND_COLORS[level]}`}
                    />
                  ))}
                  <span>{lang === 'id' ? 'Banyak' : 'More'}</span>
                </div>
              </div>

              {/* Scrollable Calendar Grid */}
              <div className="mt-5 overflow-x-auto pb-2">
                <div className="inline-flex min-w-max items-start gap-2.5">
                  {/* Weekday Labels */}
                  <div
                    aria-hidden="true"
                    className="grid grid-rows-7 gap-1 pt-5 pr-1 text-[10px] leading-none text-slate-400 dark:text-slate-500"
                  >
                    <span className="h-3" />
                    <span className="flex h-3 items-center">Mon</span>
                    <span className="h-3" />
                    <span className="flex h-3 items-center">Wed</span>
                    <span className="h-3" />
                    <span className="flex h-3 items-center">Fri</span>
                    <span className="h-3" />
                  </div>

                  {/* Week Columns */}
                  <div
                    role="grid"
                    aria-label={
                      lang === 'id'
                        ? 'Grafik kontribusi GitHub setahun terakhir'
                        : 'GitHub contribution activity over the past year'
                    }
                    className="flex gap-1"
                  >
                    {calendarWeeks.map((week, weekIdx) => (
                      <div key={weekIdx} className="flex flex-col gap-1">
                        <span className="h-4 text-[10px] leading-none text-slate-400 dark:text-slate-500">
                          {week.monthLabel || ''}
                        </span>
                        <div className="grid grid-rows-7 gap-1">
                          {week.days.map((day, dayIdx) => {
                            if (!day) {
                              return (
                                <span
                                  key={`empty-${weekIdx}-${dayIdx}`}
                                  aria-hidden="true"
                                  className="h-3 w-3"
                                />
                              );
                            }

                            const isSelected = selectedDay?.date === day.date;
                            const label =
                              lang === 'id'
                                ? `${day.count} kontribusi pada ${formatDisplayDate(day.date, lang)}`
                                : `${day.count} ${day.count === 1 ? 'contribution' : 'contributions'} on ${formatDisplayDate(day.date, lang)}`;

                            return (
                              <button
                                key={day.date}
                                type="button"
                                title={label}
                                aria-label={label}
                                onMouseEnter={() => setSelectedDay(day)}
                                onFocus={() => setSelectedDay(day)}
                                onClick={() => setSelectedDay(day)}
                                className={`h-3 w-3 rounded-[3px] transition-transform duration-100 hover:scale-125 hover:ring-1 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-500 ${LEVEL_COLORS[day.level]} ${
                                  isSelected ? 'ring-1 ring-slate-900 dark:ring-white' : ''
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Active Public Repositories */}
            {data.recentRepos.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    {lang === 'id'
                      ? 'Repositori Publik Terbaru'
                      : 'Recent Public Repositories'}
                  </h3>
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    {data.activeDays}{' '}
                    {lang === 'id' ? 'hari aktif tahun ini' : 'active days this year'}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {data.recentRepos.map((repo) => (
                    <a
                      key={repo.name}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-150 hover:border-blue-500/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-white/10 dark:bg-[#101521] dark:hover:border-blue-400/50"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate font-display text-base font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
                            {repo.name}
                          </span>
                          <ArrowUpRight
                            className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                            aria-hidden="true"
                          />
                        </div>

                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                          {repo.description ||
                            (lang === 'id'
                              ? 'Repositori kode sumber dalam ekosistem Nafeka & MainKode.'
                              : 'Source repository inside the Nafeka & MainKode ecosystem.')}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-200/80 pt-3 font-mono text-[11px] text-slate-500 tabular-nums dark:border-white/10 dark:text-slate-400">
                        <span>{repo.language || 'Code'}</span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3 w-3" aria-hidden="true" />
                          {repo.stars}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                          <GitBranch className="h-3 w-3" aria-hidden="true" />
                          {repo.forks}
                        </span>
                        {repo.pushedAt && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{formatRepoDate(repo.pushedAt, lang)}</span>
                          </>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
