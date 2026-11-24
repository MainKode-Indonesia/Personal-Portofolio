import { useEffect, useState } from 'react';
import AboutAndSkills from './components/AboutAndSkills';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectGallery from './components/ProjectGallery';
import ProjectModal from './components/ProjectModal';
import ScrollProgress from './components/ScrollProgress';
import type { Language, ProjectItem } from './data/projects';

type ThemeMode = 'dark' | 'light';

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = window.localStorage.getItem('mainkode-theme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch {
    // Fallback to dark mode by default
  }
  return 'dark';
}

function getInitialLang(): Language {
  if (typeof window === 'undefined') return 'id';
  try {
    const saved = window.localStorage.getItem('mainkode-lang');
    if (saved === 'id' || saved === 'en') {
      return saved;
    }
  } catch {
    // Fallback to Indonesian by default
  }
  return 'id';
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [lang, setLang] = useState<Language>(getInitialLang);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem('mainkode-theme', theme);
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title =
      lang === 'id'
        ? 'Muhamad Naufal Burhanuddin Balit — Portofolio Pribadi'
        : 'Muhamad Naufal Burhanuddin Balit — Personal Portfolio';
    try {
      window.localStorage.setItem('mainkode-lang', lang);
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [lang]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-[#080B12] dark:text-slate-100">
      <ScrollProgress lang={lang} />
      <Header theme={theme} onToggleTheme={setTheme} lang={lang} onChangeLang={setLang} />

      <main>
        <Hero theme={theme} onToggleTheme={setTheme} lang={lang} />
        <AboutAndSkills lang={lang} />
        <ProjectGallery onSelectProject={setSelectedProject} lang={lang} />
        <ContactSection lang={lang} />
      </main>

      <Footer theme={theme} onToggleTheme={setTheme} lang={lang} />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        lang={lang}
      />
    </div>
  );
}
