import { Moon, Sun } from 'lucide-react';
import { OWNER_PROFILE, SOCIAL_PROFILES, type Language } from '../data/projects';

interface FooterProps {
  theme: 'dark' | 'light';
  onToggleTheme: (next: 'dark' | 'light') => void;
  lang: Language;
}

export default function Footer({ theme, onToggleTheme, lang }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-slate-100/70 dark:border-white/10 dark:bg-[#06080E]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a
              href="#beranda"
              className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50"
            >
              {OWNER_PROFILE.fullName}
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {lang === 'id'
                ? `Portofolio pribadi ${OWNER_PROFILE.fullName} — ${OWNER_PROFILE.personalTitle.id} berbasis di ${OWNER_PROFILE.location.id}.`
                : `Personal portfolio of ${OWNER_PROFILE.fullName} — ${OWNER_PROFILE.personalTitle.en} based in ${OWNER_PROFILE.location.en}.`}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {lang === 'id' ? 'Navigasi' : 'Navigation'}
            </p>
            <ul className="mt-3 space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="#beranda" className="hover:text-blue-600 dark:hover:text-blue-400">
                  {lang === 'id' ? 'Beranda' : 'Home'}
                </a>
              </li>
              <li>
                <a href="#tentang" className="hover:text-blue-600 dark:hover:text-blue-400">
                  {lang === 'id' ? 'Tentang Saya' : 'About Me'}
                </a>
              </li>
              <li>
                <a href="#proyek" className="hover:text-blue-600 dark:hover:text-blue-400">
                  {lang === 'id' ? 'Proyek' : 'Projects'}
                </a>
              </li>
              <li>
                <a href="#kontak" className="hover:text-blue-600 dark:hover:text-blue-400">
                  {lang === 'id' ? 'Kontak' : 'Contact'}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {lang === 'id' ? 'Media Sosial & Tautan' : 'Social Profiles & Links'}
            </p>
            <ul className="mt-3 space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              {SOCIAL_PROFILES.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {item.label[lang]} ({item.handle})
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {OWNER_PROFILE.fullName}.
          </p>

          <button
            type="button"
            onClick={() => onToggleTheme(theme === 'dark' ? 'light' : 'dark')}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-[#101521] dark:text-slate-200 dark:hover:bg-white/5 whitespace-nowrap shrink-0"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{lang === 'id' ? 'Ubah ke Mode Terang' : 'Switch to Light Mode'}</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{lang === 'id' ? 'Ubah ke Mode Gelap' : 'Switch to Dark Mode'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </footer>
  );
}
