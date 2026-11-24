export type Language = 'id' | 'en';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: Record<Language, string>;
  category: string;
  status: Record<Language, string>;
  year: string;
  domain: string;
  summary: Record<Language, string>;
  description: Record<Language, string>;
  otherProjectsTitle: Record<Language, string>;
  otherProjectsNote: Record<Language, string>;
  focusPoints: Record<Language, string[]>;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  imageAlt: Record<Language, string>;
}

export interface ApproachItem {
  index: string;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  detail: Record<Language, string>;
}

export type SkillDomain = 'all' | 'frontend' | 'backend' | 'infra';

export interface SkillNode {
  id: string;
  index: string;
  name: string;
  domain: Exclude<SkillDomain, 'all'>;
  category: Record<Language, string>;
  role: Record<Language, string>;
  relatedIds: string[];
}

export interface SocialProfile {
  id: string;
  label: Record<Language, string>;
  handle: string;
  description: Record<Language, string>;
  href: string;
  external: boolean;
}

export const OWNER_PROFILE = {
  fullName: 'Muhamad Naufal Burhanuddin Balit',
  personalTitle: {
    id: 'Pengembang Web & Kreator Digital',
    en: 'Web Developer & Digital Creator',
  },
  location: {
    id: 'Purworejo, Indonesia',
    en: 'Purworejo, Indonesia',
  },
  email: 'mainkode4@gmail.com',
  cvUrl: '/assets/CV-Muhamad-Naufal-Burhanuddin-Balit.pdf',
  cvFileName: 'CV-Muhamad-Naufal-Burhanuddin-Balit.pdf',
  avatarImage: '/assets/aistudio/Gemini_Generated_Image_dfpin4dfpin4dfpi_83067f9d.jpg',
  avatarAlt: {
    id: 'Foto profil Muhamad Naufal Burhanuddin Balit',
    en: 'Portrait of Muhamad Naufal Burhanuddin Balit',
  },
  workspaceImage: '/src/assets/images/hero_studio_workspace_1795487081309.jpg',
  workspaceImageAlt: {
    id: 'Ruang kerja pengembangan perangkat lunak pribadi Muhamad Naufal Burhanuddin Balit',
    en: 'Personal software development workspace of Muhamad Naufal Burhanuddin Balit',
  },
  personalFacts: [
    {
      label: { id: 'Nama Lengkap', en: 'Full Name' },
      value: {
        id: 'Muhamad Naufal Burhanuddin Balit',
        en: 'Muhamad Naufal Burhanuddin Balit',
      },
    },
    {
      label: { id: 'Domisili', en: 'Location' },
      value: {
        id: 'Purworejo, Jawa Tengah',
        en: 'Purworejo, Central Java, Indonesia',
      },
    },
    {
      label: { id: 'Fokus Utama', en: 'Primary Focus' },
      value: {
        id: 'Full-Stack Web & UI Engineering',
        en: 'Full-Stack Web & UI Engineering',
      },
    },
    {
      label: { id: 'Ketersediaan', en: 'Availability' },
      value: {
        id: 'Terbuka untuk kolaborasi & proyek',
        en: 'Open for collaboration & projects',
      },
    },
  ],
};

export const HERO_METRICS: Array<{ value: string; label: Record<Language, string> }> = [
  {
    value: 'Full-Stack',
    label: { id: 'Pengembangan Web Modern', en: 'Modern Web Engineering' },
  },
  {
    value: 'UI / UX',
    label: { id: 'Desain Antarmuka Responsif', en: 'Responsive Interface Design' },
  },
  {
    value: 'Purworejo',
    label: { id: 'Berbasis di Indonesia', en: 'Based in Indonesia' },
  },
  {
    value: '< 24j',
    label: { id: 'Respon Email Langsung', en: 'Direct Email Response' },
  },
];

export const FEATURED_PROJECT: ProjectItem = {
  id: 'mainkode',
  index: '01',
  title: 'MainKode',
  subtitle: {
    id: 'Platform Portofolio & Galeri Karya Digital',
    en: 'Portfolio & Digital Project Showcase Platform',
  },
  category: 'Web Development',
  status: {
    id: 'Aktif',
    en: 'Active',
  },
  year: '2026',
  domain: 'mainkode.nafeka.my.id',
  summary: {
    id: 'Website showcase proyek yang saya bangun untuk menghimpun berbagai aplikasi web, sistem kasir berbasis cloud, dan eksperimen teknologi digital saya dalam satu tempat.',
    en: 'A dedicated project showcase platform I built to curate my web applications, cloud-based point-of-sale systems, and digital technology experiments in one place.',
  },
  description: {
    id: 'MainKode adalah platform utama tempat saya mendokumentasikan dan mempublikasikan berbagai proyek perangkat lunak yang saya kerjakan—mulai dari aplikasi web interaktif hingga situs profil dan blog. Dibangun menggunakan Astro, Tailwind CSS, dan Directus CMS dengan pendekatan Static Site Generation (SSG) agar ringan, cepat diakses, serta terstruktur rapi.',
    en: 'MainKode serves as the primary platform where I document and publish my software engineering work—from interactive web applications to company profiles and technical blogs. Built with Astro, Tailwind CSS, and Directus CMS using Static Site Generation (SSG) for fast loading, clean structure, and effortless content management.',
  },
  otherProjectsTitle: {
    id: 'Proyek Lainnya Ada di MainKode',
    en: 'More Projects Are Available on MainKode',
  },
  otherProjectsNote: {
    id: 'Untuk melihat daftar proyek saya lainnya seperti GameVault, KasirKu, KataKode, maupun situs resmi Nafeka Kreasi Nusantara lengkap dengan demo dan kode sumbernya, silakan kunjungi langsung galeri proyek di mainkode.nafeka.my.id.',
    en: 'To explore my other projects—including GameVault, KasirKu, KataKode, and the official Nafeka Kreasi Nusantara website—complete with live demos and source code, please visit the full project gallery at mainkode.nafeka.my.id.',
  },
  focusPoints: {
    id: [
      'Pusat dokumentasi seluruh proyek web yang telah saya bangun',
      'Arsitektur Static Site Generation (Astro) yang cepat & SEO-friendly',
      'Integrasi Directus CMS untuk pengelolaan katalog proyek yang fleksibel',
    ],
    en: [
      'Central documentation hub for every web project I have built',
      'Fast, SEO-friendly Static Site Generation architecture powered by Astro',
      'Directus CMS integration for flexible project catalog management',
    ],
  },
  technologies: ['Astro', 'Tailwind CSS', 'TypeScript', 'Directus CMS', 'Static Site Generation'],
  liveUrl: 'https://mainkode.nafeka.my.id/',
  githubUrl: 'https://github.com/MainKode-Indonesia/project-website-mainkode',
  image: '/src/assets/images/project_mainkode_1795487082557.jpg',
  imageAlt: {
    id: 'Tampilan platform showcase proyek MainKode pada layar monitor studio',
    en: 'MainKode project showcase platform displayed on a studio monitor',
  },
};

export const APPROACH_ITEMS: ApproachItem[] = [
  {
    index: '01',
    title: {
      id: 'Cara Saya Merancang',
      en: 'How I Design',
    },
    summary: {
      id: 'Struktur jelas, responsif, dan nyaman di mobile',
      en: 'Clear hierarchy, responsive, and mobile-friendly',
    },
    detail: {
      id: 'Setiap antarmuka saya rancang dari kejelasan alur pengguna—memastikan tipografi terbaca nyaman di mode gelap maupun terang serta mudah dijangkau pada layar seluler.',
      en: 'Every interface begins with clear user flow—ensuring typography remains crisp across dark and light modes and controls feel effortless on mobile screens.',
    },
  },
  {
    index: '02',
    title: {
      id: 'Cara Saya Membangun',
      en: 'How I Build',
    },
    summary: {
      id: 'Arsitektur modular dengan teknologi web modern',
      en: 'Modular architecture with modern web stacks',
    },
    detail: {
      id: 'Saya mengutamakan kode yang rapi dan mudah dirawat menggunakan TypeScript, React, Astro, Express, serta layanan cloud seperti Firebase untuk kebutuhan real-time.',
      en: 'I prioritize clean, maintainable code using TypeScript, React, Astro, Express, and cloud services like Firebase for real-time synchronization.',
    },
  },
  {
    index: '03',
    title: {
      id: 'Cara Saya Berbagi',
      en: 'How I Share',
    },
    summary: {
      id: 'Dokumentasi terbuka dan tulisan teknologi',
      en: 'Open documentation and technical writing',
    },
    detail: {
      id: 'Saya percaya proses belajar terbaik adalah lewat praktik nyata dan berbagi catatan teknis maupun kode sumber terbuka agar bermanfaat bagi banyak orang.',
      en: 'I believe the best way to grow is through hands-on building and sharing technical notes and open-source code with the wider developer community.',
    },
  },
];

export const SKILLS_MATRIX: SkillNode[] = [
  {
    id: 'react',
    index: '01',
    name: 'React 19',
    domain: 'frontend',
    category: { id: 'Frontend', en: 'Frontend' },
    role: {
      id: 'Pustaka UI deklaratif untuk aplikasi web interaktif',
      en: 'Declarative UI library for interactive web applications',
    },
    relatedIds: ['typescript', 'tailwind', 'vite', 'nodejs', 'firebase-auth', 'firestore'],
  },
  {
    id: 'typescript',
    index: '02',
    name: 'TypeScript',
    domain: 'frontend',
    category: { id: 'Frontend', en: 'Frontend' },
    role: {
      id: 'Pengetikan statis untuk kode frontend & backend yang aman',
      en: 'Static typing for reliable frontend and backend code',
    },
    relatedIds: ['react', 'astro', 'vite', 'nodejs', 'tailwind'],
  },
  {
    id: 'astro',
    index: '03',
    name: 'Astro',
    domain: 'frontend',
    category: { id: 'Frontend', en: 'Frontend' },
    role: {
      id: 'Framework Static Site Generation super ringan & cepat',
      en: 'High-speed Static Site Generation web framework',
    },
    relatedIds: ['typescript', 'tailwind', 'directus', 'seo', 'nginx'],
  },
  {
    id: 'tailwind',
    index: '04',
    name: 'Tailwind CSS',
    domain: 'frontend',
    category: { id: 'Frontend', en: 'Frontend' },
    role: {
      id: 'Sistem desain utility-first untuk UI responsif & dark mode',
      en: 'Utility-first styling system for responsive UI & dark mode',
    },
    relatedIds: ['react', 'astro', 'html-css', 'vite', 'typescript'],
  },
  {
    id: 'vite',
    index: '05',
    name: 'Vite 6',
    domain: 'frontend',
    category: { id: 'Frontend', en: 'Frontend' },
    role: {
      id: 'Bundler dan dev server modern berkecepatan tinggi',
      en: 'High-speed modern frontend bundler and dev server',
    },
    relatedIds: ['react', 'typescript', 'tailwind', 'nodejs', 'git'],
  },
  {
    id: 'html-css',
    index: '06',
    name: 'HTML5 & CSS3',
    domain: 'frontend',
    category: { id: 'Frontend', en: 'Frontend' },
    role: {
      id: 'Fondasi semantik web, aksesibilitas, dan tata letak modern',
      en: 'Semantic web foundation, accessibility, and modern layout',
    },
    relatedIds: ['tailwind', 'seo', 'astro', 'react'],
  },
  {
    id: 'nodejs',
    index: '07',
    name: 'Node.js & Express',
    domain: 'backend',
    category: { id: 'Backend & Data', en: 'Backend & Data' },
    role: {
      id: 'Server API RESTful, autentikasi, dan layanan backend',
      en: 'RESTful API server, authentication, and backend services',
    },
    relatedIds: ['typescript', 'react', 'mysql', 'nginx', 'git'],
  },
  {
    id: 'firebase-auth',
    index: '08',
    name: 'Firebase Auth',
    domain: 'backend',
    category: { id: 'Backend & Data', en: 'Backend & Data' },
    role: {
      id: 'Autentikasi pengguna aman berbasis Google Sign-In & sesi',
      en: 'Secure user authentication via Google Sign-In & sessions',
    },
    relatedIds: ['firestore', 'react', 'vite', 'typescript'],
  },
  {
    id: 'firestore',
    index: '09',
    name: 'Cloud Firestore',
    domain: 'backend',
    category: { id: 'Backend & Data', en: 'Backend & Data' },
    role: {
      id: 'Basis data NoSQL cloud dengan sinkronisasi data real-time',
      en: 'Cloud NoSQL database with real-time data synchronization',
    },
    relatedIds: ['firebase-auth', 'react', 'vite', 'typescript'],
  },
  {
    id: 'directus',
    index: '10',
    name: 'Directus CMS',
    domain: 'backend',
    category: { id: 'Backend & Data', en: 'Backend & Data' },
    role: {
      id: 'Headless CMS untuk manajemen konten dinamis berbasis API',
      en: 'Headless CMS for API-driven dynamic content management',
    },
    relatedIds: ['astro', 'mysql', 'nodejs', 'seo'],
  },
  {
    id: 'mysql',
    index: '11',
    name: 'MySQL',
    domain: 'backend',
    category: { id: 'Backend & Data', en: 'Backend & Data' },
    role: {
      id: 'Basis data relasional terstruktur untuk aplikasi web',
      en: 'Structured relational database for web applications',
    },
    relatedIds: ['php', 'nodejs', 'directus', 'nginx'],
  },
  {
    id: 'php',
    index: '12',
    name: 'PHP',
    domain: 'backend',
    category: { id: 'Backend & Data', en: 'Backend & Data' },
    role: {
      id: 'Bahasa server-side praktis untuk web dinamis & integrasi CMS',
      en: 'Pragmatic server-side language for dynamic web systems',
    },
    relatedIds: ['mysql', 'html-css', 'nginx', 'git'],
  },
  {
    id: 'git',
    index: '13',
    name: 'Git & GitHub',
    domain: 'infra',
    category: { id: 'Infrastruktur', en: 'Infrastructure' },
    role: {
      id: 'Kontrol versi kode, kolaborasi, dan repositori terbuka',
      en: 'Version control, collaboration, and open-source hosting',
    },
    relatedIds: ['react', 'astro', 'nodejs', 'vite', 'nginx'],
  },
  {
    id: 'nginx',
    index: '14',
    name: 'Nginx',
    domain: 'infra',
    category: { id: 'Infrastruktur', en: 'Infrastructure' },
    role: {
      id: 'Web server & reverse proxy berkinerja tinggi untuk produksi',
      en: 'High-performance web server & reverse proxy for production',
    },
    relatedIds: ['nodejs', 'astro', 'php', 'mysql', 'seo'],
  },
  {
    id: 'seo',
    index: '15',
    name: 'Technical SEO',
    domain: 'infra',
    category: { id: 'Infrastruktur', en: 'Infrastructure' },
    role: {
      id: 'Optimasi struktur semantik, metadata, dan kecepatan muat',
      en: 'Semantic structure, metadata, and page speed optimization',
    },
    relatedIds: ['astro', 'html-css', 'directus', 'nginx'],
  },
];

export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    id: 'github',
    label: { id: 'GitHub', en: 'GitHub' },
    handle: '@MainKode-Indonesia',
    description: {
      id: 'Repositori kode sumber terbuka & eksperimen proyek saya',
      en: 'Open-source repositories & software experiments',
    },
    href: 'https://github.com/MainKode-Indonesia',
    external: true,
  },
  {
    id: 'blog',
    label: { id: 'Blog Teknis', en: 'Tech Blog' },
    handle: 'blog.nafeka.my.id',
    description: {
      id: 'Tulisan seputar pemrograman dan pengembangan web',
      en: 'Articles on programming and web engineering',
    },
    href: 'https://blog.nafeka.my.id/',
    external: true,
  },
  {
    id: 'web',
    label: { id: 'Situs Utama', en: 'Main Website' },
    handle: 'nafeka.my.id',
    description: {
      id: 'Profil dan inisiatif digital yang saya kembangkan',
      en: 'Digital initiatives and brand hub I develop',
    },
    href: 'https://nafeka.my.id/',
    external: true,
  },
  {
    id: 'email',
    label: { id: 'Email Pribadi', en: 'Direct Email' },
    handle: 'mainkode4@gmail.com',
    description: {
      id: 'Hubungi saya langsung untuk kolaborasi atau diskusi proyek',
      en: 'Reach out directly for collaborations or project inquiries',
    },
    href: 'mailto:mainkode4@gmail.com',
    external: false,
  },
];
