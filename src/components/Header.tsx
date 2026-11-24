import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import type { Language } from '../data/projects';
import { useActiveSection } from '../hooks/useActiveSection';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: (next: 'dark' | 'light') => void;
  lang: Language;
  onChangeLang: (next: Language) => void;
}

const NAV_LINKS: Array<{ href: string; label: Record<Language, string> }> = [
  { href: '#about', label: { en: 'About', id: 'Tentang' } },
  { href: '#ecosystem', label: { en: 'Ecosystem', id: 'Ekosistem' } },
  { href: '#projects', label: { en: 'Projects', id: 'Proyek' } },
  { href: '#journey', label: { en: 'Journey', id: 'Perjalanan' } },
  { href: '#contact', label: { en: 'Contact', id: 'Kontak' } },
];

export default function Header({ theme, onToggleTheme, lang, onChangeLang }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeHref = useActiveSection();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-slate-50/90 backdrop-blur-md dark:border-white/10 dark:bg-[#080B12]/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:gap-8 lg:px-10">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#hero"
          className="font-display max-w-[175px] truncate text-base font-bold tracking-tight text-slate-900 transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 dark:text-slate-100 dark:hover:text-blue-400 sm:max-w-[240px] lg:max-w-none sm:text-lg whitespace-nowrap shrink-0"
          title="Muhamad Naufal Burhanuddin Balit"
        >
          Muhamad Naufal Burhanuddin Balit
        </a>

        {/* Zone 2: Clean single-line nav links */}
        <nav
          aria-label={lang === 'id' ? 'Navigasi utama' : 'Primary navigation'}
          className="hidden md:flex items-center gap-6 lg:gap-7"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'location' : undefined}
                className={`text-sm font-medium underline-offset-8 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-blue-600 underline decoration-2 decoration-blue-600 dark:text-blue-400 dark:decoration-blue-400'
                    : 'text-slate-600 hover:text-slate-900 hover:underline dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {link.label[lang]}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Language Switcher + Primary Action / Mobile Trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div
            role="group"
            aria-label={lang === 'id' ? 'Pilih bahasa' : 'Select language'}
            className="inline-flex items-center rounded-lg border border-slate-200 bg-white p-0.5 dark:border-white/10 dark:bg-[#101521] shrink-0"
          >
            <button
              type="button"
              onClick={() => onChangeLang('en')}
              aria-pressed={lang === 'en'}
              aria-label="English"
              className={`inline-flex min-h-8 items-center justify-center rounded-md px-2.5 py-1 text-xs font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 whitespace-nowrap shrink-0 ${
                lang === 'en'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onChangeLang('id')}
              aria-pressed={lang === 'id'}
              aria-label="Bahasa Indonesia"
              className={`inline-flex min-h-8 items-center justify-center rounded-md px-2.5 py-1 text-xs font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 whitespace-nowrap shrink-0 ${
                lang === 'id'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              ID
            </button>
          </div>

          <a
            href="#contact"
            className="hidden md:inline-flex min-h-10 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 whitespace-nowrap shrink-0"
          >
            {lang === 'id' ? 'Hubungi Saya' : 'Contact Me'}
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={
              mobileMenuOpen
                ? lang === 'id'
                  ? 'Tutup menu navigasi'
                  : 'Close navigation menu'
                : lang === 'id'
                  ? 'Buka menu navigasi'
                  : 'Open navigation menu'
            }
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-slate-50 px-4 py-4 dark:border-white/10 dark:bg-[#080B12] md:hidden">
          <nav
            aria-label={lang === 'id' ? 'Navigasi seluler' : 'Mobile navigation'}
            className="flex flex-col gap-1"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex min-h-11 items-center rounded-lg px-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white'
                  }`}
                >
                  {link.label[lang]}
                </a>
              );
            })}
          </nav>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-white/10">
            <div
              role="group"
              aria-label={lang === 'id' ? 'Pilih tema tampilan' : 'Select appearance theme'}
              className="inline-flex items-center rounded-lg border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-[#101521]"
            >
              <button
                type="button"
                onClick={() => onToggleTheme('dark')}
                className={`inline-flex min-h-9 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  theme === 'dark'
                    ? 'bg-slate-900 text-white dark:bg-blue-600'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{lang === 'id' ? 'Gelap' : 'Dark'}</span>
              </button>
              <button
                type="button"
                onClick={() => onToggleTheme('light')}
                className={`inline-flex min-h-9 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  theme === 'light'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <Sun className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{lang === 'id' ? 'Terang' : 'Light'}</span>
              </button>
            </div>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 whitespace-nowrap shrink-0"
            >
              {lang === 'id' ? 'Hubungi Saya' : 'Contact Me'}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
