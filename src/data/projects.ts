export type Language = 'en' | 'id';
export type ProjectCategory = 'all' | 'product' | 'platform';
export type SkillDomain = 'all' | 'frontend' | 'backend' | 'infra';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: Record<Language, string>;
  categoryKey: Exclude<ProjectCategory, 'all'>;
  categoryLabel: Record<Language, string>;
  status: Record<Language, string>;
  year: string;
  domain: string;
  summary: Record<Language, string>;
  description: Record<Language, string>;
  focusPoints: Record<Language, string[]>;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  imageAlt: Record<Language, string>;
}

export interface LeadershipPrinciple {
  index: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  description: Record<Language, string>;
}

export interface EcosystemPillar {
  index: string;
  name: string;
  role: Record<Language, string>;
  domain: string;
  url: string;
  description: Record<Language, string>;
  highlights: Record<Language, string[]>;
}

export interface JourneyMilestone {
  period: string;
  phase: Record<Language, string>;
  title: Record<Language, string>;
  description: Record<Language, string>;
}

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
  role: {
    en: 'Founder & CEO of Nafeka',
    id: 'Founder & CEO Nafeka',
  },
  kicker: {
    en: 'Founder · Builder · Technology',
    id: 'Founder · Builder · Teknologi',
  },
  headline: {
    en: 'Building ideas into digital products.',
    id: 'Mengubah ide menjadi produk digital nyata.',
  },
  visionStatement: {
    en: "I'm the Founder & CEO of Nafeka, building a digital ecosystem of software, technology, and products while staying hands-on in development.",
    id: 'Saya adalah Founder & CEO Nafeka, membangun ekosistem digital perangkat lunak, teknologi, dan produk sambil tetap terjun langsung dalam pengembangan.',
  },
  location: {
    en: 'Purworejo, Indonesia',
    id: 'Purworejo, Indonesia',
  },
  email: 'mainkode4@gmail.com',
  cvUrl: '/assets/CV-Muhamad-Naufal-Burhanuddin-Balit.pdf',
  cvFileName: 'CV-Muhamad-Naufal-Burhanuddin-Balit.pdf',
  avatarImage: '/assets/aistudio/Gemini_Generated_Image_dfpin4dfpin4dfpi_83067f9d.jpg',
  avatarAlt: {
    en: 'Portrait of Muhamad Naufal Burhanuddin Balit, Founder & CEO of Nafeka',
    id: 'Foto profil Muhamad Naufal Burhanuddin Balit, Founder & CEO Nafeka',
  },
  workspaceImage: '/src/assets/images/hero_studio_workspace_1795487081309.jpg',
  workspaceImageAlt: {
    en: 'Software development workspace of Muhamad Naufal Burhanuddin Balit',
    id: 'Ruang kerja pengembangan perangkat lunak Muhamad Naufal Burhanuddin Balit',
  },
  personalFacts: [
    {
      label: { en: 'Full Name', id: 'Nama Lengkap' },
      value: {
        en: 'Muhamad Naufal Burhanuddin Balit',
        id: 'Muhamad Naufal Burhanuddin Balit',
      },
    },
    {
      label: { en: 'Role', id: 'Peran' },
      value: {
        en: 'Founder & CEO of Nafeka',
        id: 'Founder & CEO Nafeka',
      },
    },
    {
      label: { en: 'Academic Background', id: 'Latar Belakang' },
      value: {
        en: 'Informatics & Applied Software Research',
        id: 'Informatika & Riset Perangkat Lunak',
      },
    },
    {
      label: { en: 'Location', id: 'Domisili' },
      value: {
        en: 'Purworejo, Central Java, Indonesia',
        id: 'Purworejo, Jawa Tengah, Indonesia',
      },
    },
  ],
};

export const HERO_METRICS: Array<{ value: string; label: Record<Language, string> }> = [
  {
    value: '03',
    label: { en: 'Ecosystem Pillars', id: 'Pilar Ekosistem Digital' },
  },
  {
    value: '05',
    label: { en: 'Live Products & Platforms', id: 'Produk & Platform Rilis' },
  },
  {
    value: 'Hands-On',
    label: { en: 'Technical Founder & Builder', id: 'Founder yang Terjun Langsung' },
  },
  {
    value: '< 24h',
    label: { en: 'Direct Email Response', id: 'Respon Email Langsung' },
  },
];

export const LEADERSHIP_PRINCIPLES: LeadershipPrinciple[] = [
  {
    index: '01',
    title: {
      en: 'Ecosystem Vision & Direction',
      id: 'Visi & Arah Ekosistem',
    },
    subtitle: {
      en: 'Connecting brand, engineering, and knowledge',
      id: 'Menyatukan brand, rekayasa, dan pengetahuan',
    },
    description: {
      en: 'As Founder & CEO of Nafeka, I define long-term product direction so every platform—from corporate identity and engineering showcases to technical publishing—reinforces one unified digital ecosystem.',
      id: 'Sebagai Founder & CEO Nafeka, saya merancang arah jangka panjang agar setiap platform—mulai dari identitas brand, etalase rekayasa, hingga publikasi teknis—saling menguatkan dalam satu ekosistem digital.',
    },
  },
  {
    index: '02',
    title: {
      en: 'Product Strategy from Problem to Ship',
      id: 'Strategi Produk dari Masalah ke Rilis',
    },
    subtitle: {
      en: 'Focused scope, fast iteration, real utility',
      id: 'Ruang lingkup terfokus, iterasi cepat, manfaat nyata',
    },
    description: {
      en: 'Every product starts with a clear operational bottleneck—whether simplifying multi-branch retail checkout in KasirKu or structuring multi-mirror game discovery in GameVault—and ships in clean, testable iterations.',
      id: 'Setiap produk dimulai dari persoalan nyata—mulai dari menyederhanakan kasir ritel multi-cabang di KasirKu hingga kurasi etalase digital di GameVault—lalu dirilis melalui iterasi yang terukur.',
    },
  },
  {
    index: '03',
    title: {
      en: 'Hands-On Technical Execution',
      id: 'Eksekusi Teknis Secara Langsung',
    },
    subtitle: {
      en: 'Leading through architecture and code',
      id: 'Memimpin langsung lewat arsitektur dan kode',
    },
    description: {
      en: 'I stay close to the codebase—architecting TypeScript schemas, designing responsive Tailwind UI systems, wiring real-time Firestore rules, and deploying fast Astro static builds.',
      id: 'Saya tetap dekat dengan baris kode—merancang skema TypeScript, menyusun antarmuka responsif berbasis Tailwind CSS, mengatur sinkronisasi Firestore, serta memastikan performa rilis di produksi.',
    },
  },
];

export const ECOSYSTEM_PILLARS: EcosystemPillar[] = [
  {
    index: '01',
    name: 'Nafeka',
    role: {
      en: 'Parent Brand & Digital Ecosystem Hub',
      id: 'Brand Induk & Pusat Ekosistem Digital',
    },
    domain: 'nafeka.my.id',
    url: 'https://nafeka.my.id/',
    description: {
      en: 'The core identity and strategic umbrella connecting software initiatives, digital products, and brand vision across the Nafeka ecosystem.',
      id: 'Fondasi identitas dan payung strategis yang menghubungkan inisiatif perangkat lunak, produk digital, dan visi pengembangan di seluruh ekosistem Nafeka.',
    },
    highlights: {
      en: ['Brand Identity & Strategy', 'Digital Product Incubation', 'Cross-Platform Integration'],
      id: ['Identitas & Strategi Brand', 'Inkubasi Produk Digital', 'Integrasi Lintas Platform'],
    },
  },
  {
    index: '02',
    name: 'MainKode',
    role: {
      en: 'Engineering Showcase & Product Lab',
      id: 'Etalase Rekayasa & Laboratorium Produk',
    },
    domain: 'mainkode.nafeka.my.id',
    url: 'https://mainkode.nafeka.my.id/',
    description: {
      en: 'The dedicated engineering showcase documenting web applications, cloud systems, live demos, and open-source repositories built inside the ecosystem.',
      id: 'Platform etalase rekayasa yang mendokumentasikan aplikasi web, sistem berbasis cloud, demo langsung, serta repositori terbuka yang dibangun dalam ekosistem.',
    },
    highlights: {
      en: ['Production Web Apps', 'Open-Source Repositories', 'Directus CMS + Astro SSG'],
      id: ['Aplikasi Web Produksi', 'Repositori Open-Source', 'Directus CMS + Astro SSG'],
    },
  },
  {
    index: '03',
    name: 'KataKode',
    role: {
      en: 'Technology Blog & Knowledge Sharing',
      id: 'Blog Teknologi & Berbagi Pengetahuan',
    },
    domain: 'blog.nafeka.my.id',
    url: 'https://blog.nafeka.my.id/',
    description: {
      en: 'The editorial publishing arm sharing programming tutorials, software architecture notes, and practical engineering lessons with the wider developer community.',
      id: 'Pilar publikasi editorial yang membagikan tutorial pemrograman, catatan arsitektur perangkat lunak, dan pembelajaran rekayasa praktis untuk komunitas pengembang.',
    },
    highlights: {
      en: ['Programming Tutorials', 'Engineering Documentation', 'Technical SEO Architecture'],
      id: ['Tutorial Pemrograman', 'Dokumentasi Rekayasa', 'Arsitektur Technical SEO'],
    },
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'kasirku',
    index: '01',
    title: 'KasirKu',
    subtitle: {
      en: 'Cloud Point of Sale & Multi-Branch Retail System',
      id: 'Sistem Kasir Ritel Cloud & Multi-Cabang',
    },
    categoryKey: 'product',
    categoryLabel: { en: 'Digital Product', id: 'Produk Digital' },
    status: { en: 'Live', id: 'Aktif' },
    year: '2026',
    domain: 'kasir.nafeka.my.id',
    summary: {
      en: 'Browser-based retail POS built for single stores and multi-branch operations with real-time Cloud Firestore synchronization and Firebase Authentication.',
      id: 'Aplikasi kasir (POS) berbasis browser untuk toko tunggal hingga multi-cabang dengan sinkronisasi real-time via Cloud Firestore dan Firebase Auth.',
    },
    description: {
      en: 'KasirKu empowers retail owners to run daily cashier operations directly in the browser without heavy hardware lock-in. Product catalogs, checkout transactions, cashier shifts, and barcode scanner sessions sync in real time via Cloud Firestore with secure Google Sign-In authentication.',
      id: 'KasirKu membantu pemilik usaha ritel—baik toko tunggal maupun jaringan multi-cabang—menjalankan operasional kasir harian secara ringan, responsif, dan terpusat di browser. Data produk, transaksi, shift kasir, dan sesi pemindai tersinkronisasi secara real-time melalui Cloud Firestore dengan autentikasi Firebase Auth.',
    },
    focusPoints: {
      en: [
        'Fast browser-based checkout for single stores and multi-branch retail',
        'Real-time inventory, shift, and transaction sync via Cloud Firestore',
        'Secure Google Sign-In access control via Firebase Authentication',
      ],
      id: [
        'Operasional kasir cepat untuk toko tunggal hingga jaringan multi-cabang',
        'Sinkronisasi stok, shift kasir, dan transaksi real-time via Cloud Firestore',
        'Autentikasi aman menggunakan Google Sign-In & Firebase Authentication',
      ],
    },
    technologies: ['React', 'Vite 6', 'Cloud Firestore', 'Firebase Auth', 'Tailwind CSS'],
    liveUrl: 'https://kasir.nafeka.my.id/',
    githubUrl: 'https://github.com/MainKode-Indonesia/KasirKu',
    image: '/src/assets/images/project_kasirku_1795487081260.jpg',
    imageAlt: {
      en: 'KasirKu cloud POS tablet interface on a dark retail counter',
      id: 'Antarmuka kasir cloud KasirKu pada tablet di meja ritel modern',
    },
  },
  {
    id: 'gamevault',
    index: '02',
    title: 'GameVault',
    subtitle: {
      en: 'Modern Digital Game Storefront & Community Hub',
      id: 'Platform Etalase Game Digital Modern',
    },
    categoryKey: 'product',
    categoryLabel: { en: 'Digital Product', id: 'Produk Digital' },
    status: { en: 'Live', id: 'Aktif' },
    year: '2026',
    domain: 'game.nafeka.my.id',
    summary: {
      en: 'Interactive digital game catalog featuring real-time search, verified multi-mirror distribution, 5-star reviews, visual wishlists, and side-by-side comparisons.',
      id: 'Etalase game digital interaktif dengan pencarian real-time, distribusi multi-mirror terverifikasi, ulasan 5-bintang, wishlist visual, dan perbandingan game.',
    },
    description: {
      en: 'GameVault blends high-speed search and curated community discovery into a modern storefront experience. Built with React 19, TypeScript, Express, and Firebase, it supports verified multi-mirror links, side-by-side title comparisons, 5-star community ratings, and activity tracking.',
      id: 'GameVault memadukan pencarian berkecepatan tinggi dengan kurasi komunitas dalam satu etalase modern berbasis React 19, Express, dan Firebase. Pengguna dapat menelusuri distribusi multi-mirror terverifikasi, membandingkan game secara berdampingan, memberi ulasan 5-bintang, serta mengelola wishlist visual.',
    },
    focusPoints: {
      en: [
        'Real-time catalog search and multi-criteria filtering',
        'Verified multi-mirror distribution links and side-by-side comparison',
        '5-star community review system and synced visual wishlists',
      ],
      id: [
        'Pencarian dan penyaringan katalog game secara real-time',
        'Distribusi tautan multi-mirror terverifikasi dan perbandingan berdampingan',
        'Sistem ulasan komunitas 5-bintang dan wishlist visual tersinkronisasi',
      ],
    },
    technologies: ['React 19', 'Tailwind CSS', 'TypeScript', 'Express', 'Firebase'],
    liveUrl: 'https://game.nafeka.my.id/',
    githubUrl: 'https://github.com/MainKode-Indonesia/GameVault',
    image: '/src/assets/images/project_gamevault_1795487081146.jpg',
    imageAlt: {
      en: 'GameVault storefront interface on a studio monitor',
      id: 'Antarmuka etalase GameVault pada layar monitor studio',
    },
  },
  {
    id: 'mainkode',
    index: '03',
    title: 'MainKode',
    subtitle: {
      en: 'Developer Showcase & Headless CMS Architecture',
      id: 'Platform Showcase Proyek & Arsitektur CMS',
    },
    categoryKey: 'platform',
    categoryLabel: { en: 'Ecosystem Platform', id: 'Platform Ekosistem' },
    status: { en: 'Live', id: 'Aktif' },
    year: '2026',
    domain: 'mainkode.nafeka.my.id',
    summary: {
      en: 'Engineering project hub combining Astro Static Site Generation with Directus CMS for structured, ultra-fast project documentation.',
      id: 'Pusat showcase proyek pengembangan web yang memadukan Astro Static Site Generation dengan Directus CMS yang ringan dan terstruktur.',
    },
    description: {
      en: 'MainKode is the engineering showcase pillar of the Nafeka ecosystem. By decoupling project data management in Directus CMS from Astro static rendering, new case studies, repositories, and live demos publish cleanly with maximum web performance and technical SEO.',
      id: 'MainKode adalah pilar showcase rekayasa dalam ekosistem Nafeka. Dengan memisahkan pengelolaan data di Directus CMS dan rendering statis Astro, setiap studi kasus, tautan demo, dan repositori dapat dipublikasikan secara fleksibel dengan performa tinggi.',
    },
    focusPoints: {
      en: [
        'Static Site Generation with Astro for instant page loads',
        'Flexible headless project management via Directus CMS',
        'Slug-based project architecture linking live demos and source code',
      ],
      id: [
        'Arsitektur Static Site Generation Astro berkecepatan tinggi',
        'Manajemen konten proyek fleksibel melalui Directus CMS',
        'Struktur detail berbasis slug lengkap dengan demo dan repositori',
      ],
    },
    technologies: ['Astro', 'Tailwind CSS', 'Directus CMS', 'Static Site Generation'],
    liveUrl: 'https://mainkode.nafeka.my.id/',
    githubUrl: 'https://github.com/MainKode-Indonesia/project-website-mainkode',
    image: '/src/assets/images/project_mainkode_1795487082557.jpg',
    imageAlt: {
      en: 'MainKode project showcase platform on studio monitor',
      id: 'Tampilan platform showcase proyek MainKode pada monitor studio',
    },
  },
  {
    id: 'katakode',
    index: '04',
    title: 'KataKode',
    subtitle: {
      en: 'Technology Blog & Developer Publication',
      id: 'Blog Teknologi & Publikasi Pemrograman',
    },
    categoryKey: 'platform',
    categoryLabel: { en: 'Ecosystem Platform', id: 'Platform Ekosistem' },
    status: { en: 'Live', id: 'Aktif' },
    year: '2026',
    domain: 'blog.nafeka.my.id',
    summary: {
      en: 'Minimalist technology blog dedicated to programming tutorials, web architecture essays, reading comfort, and technical SEO.',
      id: 'Platform blog teknologi minimalis yang berfokus pada tutorial pemrograman, keterbacaan artikel, dan optimasi SEO teknis.',
    },
    description: {
      en: 'KataKode serves as the knowledge-sharing platform of the Nafeka ecosystem. Built with Astro, Tailwind CSS, and TypeScript, it prioritizes long-form reading ergonomics, structured article discovery, and high Lighthouse performance.',
      id: 'KataKode menjadi wadah berbagi pengetahuan di ekosistem Nafeka. Dibangun menggunakan Astro, Tailwind CSS, dan TypeScript dengan mengutamakan kenyamanan membaca jangka panjang, struktur navigasi bersih, serta performa tinggi.',
    },
    focusPoints: {
      en: [
        'Editorial typography tailored for long-form technical reading',
        'Technical SEO & static asset optimization',
        'Seamless cross-linking across the Nafeka ecosystem',
      ],
      id: [
        'Tipografi editorial yang nyaman untuk membaca artikel teknis',
        'Optimasi Technical SEO & kecepatan pemuatan halaman statis',
        'Terintegrasi sebagai pilar berbagi pengetahuan ekosistem Nafeka',
      ],
    },
    technologies: ['Astro', 'Tailwind CSS', 'TypeScript', 'Technical SEO'],
    liveUrl: 'https://blog.nafeka.my.id/',
    githubUrl: 'https://github.com/MainKode-Indonesia/project-website-katakode',
    image: '/src/assets/images/project_katakode_1795487082732.jpg',
    imageAlt: {
      en: 'KataKode programming blog interface on dark laptop',
      id: 'Tampilan blog pemrograman KataKode pada laptop di meja studio',
    },
  },
  {
    id: 'nafeka-official',
    index: '05',
    title: 'Nafeka Kreasi Nusantara',
    subtitle: {
      en: 'Official Brand Identity & Ecosystem Portal',
      id: 'Website Resmi & Portal Ekosistem Nafeka',
    },
    categoryKey: 'platform',
    categoryLabel: { en: 'Ecosystem Platform', id: 'Platform Ekosistem' },
    status: { en: 'Live', id: 'Aktif' },
    year: '2026',
    domain: 'nafeka.my.id',
    summary: {
      en: 'Official corporate identity and digital ecosystem gateway uniting Nafeka brand vision with MainKode and KataKode.',
      id: 'Website resmi yang menjadi pusat identitas brand Nafeka serta gerbang penghubung menuju MainKode dan KataKode.',
    },
    description: {
      en: 'Nafeka is the central digital foundation for Nafeka Kreasi Nusantara—communicating company vision, structuring brand identity across mobile and desktop, and connecting visitors directly to the engineering and publishing arms of the ecosystem.',
      id: 'Nafeka berfungsi sebagai fondasi digital resmi Nafeka Kreasi Nusantara—menyampaikan visi perusahaan, menyajikan informasi secara terstruktur di berbagai perangkat, dan menghubungkan pengunjung langsung dengan MainKode serta KataKode.',
    },
    focusPoints: {
      en: [
        'Unified brand system and corporate architecture',
        'Responsive accessibility and high-speed static delivery',
        'Central gateway linking Nafeka, MainKode, and KataKode',
      ],
      id: [
        'Sistem identitas brand dan struktur informasi terpadu',
        'Aksesibilitas responsif dengan performa statis berkecepatan tinggi',
        'Gerbang utama yang menghubungkan Nafeka, MainKode, dan KataKode',
      ],
    },
    technologies: ['Astro', 'Tailwind CSS', 'TypeScript', 'Brand System'],
    liveUrl: 'https://nafeka.my.id/',
    githubUrl: 'https://github.com/MainKode-Indonesia/project-website-nafeka',
    image: '/src/assets/images/project_nafeka_1795487082761.jpg',
    imageAlt: {
      en: 'Nafeka Kreasi Nusantara official portal displayed in minimalist studio',
      id: 'Website resmi Nafeka Kreasi Nusantara pada layar monitor studio',
    },
  },
];

export const SKILLS_MATRIX: SkillNode[] = [
  {
    id: 'react',
    index: '01',
    name: 'React 19',
    domain: 'frontend',
    category: { en: 'Frontend', id: 'Frontend' },
    role: {
      en: 'Declarative UI architecture for interactive digital products',
      id: 'Arsitektur UI deklaratif untuk produk digital interaktif',
    },
    relatedIds: ['typescript', 'tailwind', 'vite', 'nodejs', 'firebase-auth', 'firestore'],
  },
  {
    id: 'typescript',
    index: '02',
    name: 'TypeScript',
    domain: 'frontend',
    category: { en: 'Frontend', id: 'Frontend' },
    role: {
      en: 'End-to-end type safety across frontend and backend systems',
      id: 'Keamanan tipe statis menyeluruh di frontend maupun backend',
    },
    relatedIds: ['react', 'astro', 'vite', 'nodejs', 'tailwind'],
  },
  {
    id: 'astro',
    index: '03',
    name: 'Astro',
    domain: 'frontend',
    category: { en: 'Frontend', id: 'Frontend' },
    role: {
      en: 'High-speed static architecture powering Nafeka, MainKode & KataKode',
      id: 'Arsitektur statis berkecepatan tinggi penopang Nafeka, MainKode & KataKode',
    },
    relatedIds: ['typescript', 'tailwind', 'directus', 'seo', 'nginx'],
  },
  {
    id: 'tailwind',
    index: '04',
    name: 'Tailwind CSS',
    domain: 'frontend',
    category: { en: 'Frontend', id: 'Frontend' },
    role: {
      en: 'Design system implementation with crisp dark/light theme parity',
      id: 'Implementasi sistem desain responsif untuk mode gelap & terang',
    },
    relatedIds: ['react', 'astro', 'html-css', 'vite', 'typescript'],
  },
  {
    id: 'vite',
    index: '05',
    name: 'Vite 6',
    domain: 'frontend',
    category: { en: 'Frontend', id: 'Frontend' },
    role: {
      en: 'Modern build tooling and instant development feedback loops',
      id: 'Build tooling modern dan siklus pengembangan berkecepatan tinggi',
    },
    relatedIds: ['react', 'typescript', 'tailwind', 'nodejs', 'git'],
  },
  {
    id: 'html-css',
    index: '06',
    name: 'HTML5 & CSS3',
    domain: 'frontend',
    category: { en: 'Frontend', id: 'Frontend' },
    role: {
      en: 'Accessible semantic markup and responsive layout fundamentals',
      id: 'Fondasi markup semantik aksesibel dan tata letak responsif',
    },
    relatedIds: ['tailwind', 'seo', 'astro', 'react'],
  },
  {
    id: 'nodejs',
    index: '07',
    name: 'Node.js & Express',
    domain: 'backend',
    category: { en: 'Backend & Data', id: 'Backend & Data' },
    role: {
      en: 'REST APIs, server-side integrations, and production web servers',
      id: 'REST API, integrasi backend, dan server web produksi',
    },
    relatedIds: ['typescript', 'react', 'mysql', 'nginx', 'git'],
  },
  {
    id: 'firebase-auth',
    index: '08',
    name: 'Firebase Auth',
    domain: 'backend',
    category: { en: 'Backend & Data', id: 'Backend & Data' },
    role: {
      en: 'Secure user authentication and role-based session workflows',
      id: 'Autentikasi pengguna aman dan manajemen sesi berbasis akun',
    },
    relatedIds: ['firestore', 'react', 'vite', 'typescript'],
  },
  {
    id: 'firestore',
    index: '09',
    name: 'Cloud Firestore',
    domain: 'backend',
    category: { en: 'Backend & Data', id: 'Backend & Data' },
    role: {
      en: 'Real-time cloud database syncing retail transactions and shifts',
      id: 'Basis data cloud real-time untuk sinkronisasi transaksi & shift',
    },
    relatedIds: ['firebase-auth', 'react', 'vite', 'typescript'],
  },
  {
    id: 'directus',
    index: '10',
    name: 'Directus CMS',
    domain: 'backend',
    category: { en: 'Backend & Data', id: 'Backend & Data' },
    role: {
      en: 'Headless content engine decoupling data from static presentation',
      id: 'Headless CMS pemisah pengelolaan data dari tampilan statis',
    },
    relatedIds: ['astro', 'mysql', 'nodejs', 'seo'],
  },
  {
    id: 'mysql',
    index: '11',
    name: 'MySQL',
    domain: 'backend',
    category: { en: 'Backend & Data', id: 'Backend & Data' },
    role: {
      en: 'Structured relational data modeling for business applications',
      id: 'Pemodelan basis data relasional terstruktur untuk aplikasi bisnis',
    },
    relatedIds: ['php', 'nodejs', 'directus', 'nginx'],
  },
  {
    id: 'php',
    index: '12',
    name: 'PHP',
    domain: 'backend',
    category: { en: 'Backend & Data', id: 'Backend & Data' },
    role: {
      en: 'Pragmatic server-side scripting and dynamic web backends',
      id: 'Pemrograman server-side praktis untuk sistem web dinamis',
    },
    relatedIds: ['mysql', 'html-css', 'nginx', 'git'],
  },
  {
    id: 'git',
    index: '13',
    name: 'Git & GitHub',
    domain: 'infra',
    category: { en: 'Infrastructure', id: 'Infrastruktur' },
    role: {
      en: 'Version control, release discipline, and open-source publishing',
      id: 'Kontrol versi kode, disiplin rilis, dan repositori terbuka',
    },
    relatedIds: ['react', 'astro', 'nodejs', 'vite', 'nginx'],
  },
  {
    id: 'nginx',
    index: '14',
    name: 'Nginx',
    domain: 'infra',
    category: { en: 'Infrastructure', id: 'Infrastruktur' },
    role: {
      en: 'Production reverse proxy, SSL routing, and static asset delivery',
      id: 'Reverse proxy produksi, routing SSL, dan pengiriman aset cepat',
    },
    relatedIds: ['nodejs', 'astro', 'php', 'mysql', 'seo'],
  },
  {
    id: 'seo',
    index: '15',
    name: 'Technical SEO',
    domain: 'infra',
    category: { en: 'Infrastructure', id: 'Infrastruktur' },
    role: {
      en: 'Structured metadata, semantic HTML, and Core Web Vitals tuning',
      id: 'Metadata terstruktur, HTML semantik, dan optimasi performa web',
    },
    relatedIds: ['astro', 'html-css', 'directus', 'nginx'],
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    period: '2024',
    phase: {
      en: 'Phase 01 · Foundations & Research',
      id: 'Fase 01 · Fondasi & Riset',
    },
    title: {
      en: 'Informatics Studies & Applied Data Research',
      id: 'Studi Informatika & Riset Komputasi Terapan',
    },
    description: {
      en: 'Built my analytical foundation in Computer Science (Informatics) at Universitas Amikom Purwokerto, authoring peer-reviewed research on Naïve Bayes sentiment analysis and K-Means clustering while mastering core web engineering.',
      id: 'Membangun fondasi analitis di bidang Informatika (Universitas Amikom Purwokerto), menerbitkan riset ilmiah mengenai analisis sentimen Naïve Bayes dan klastering K-Means sembari memperdalam rekayasa web.',
    },
  },
  {
    period: '2025',
    phase: {
      en: 'Phase 02 · Exploration & Writing',
      id: 'Fase 02 · Eksplorasi & Publikasi',
    },
    title: {
      en: 'Hands-On Full-Stack Systems & Technical Blogging',
      id: 'Eksplorasi Full-Stack & Menulis Catatan Teknis',
    },
    description: {
      en: 'Expanded into modern JavaScript, TypeScript, cloud databases, and static-first architectures—documenting lessons learned and shaping the early blueprint for a connected personal ecosystem.',
      id: 'Mendalami ekosistem JavaScript modern, TypeScript, basis data cloud, dan arsitektur statis cepat—mendokumentasikan setiap pembelajaran serta merancang cetak biru ekosistem digital.',
    },
  },
  {
    period: '2026',
    phase: {
      en: 'Phase 03 · Founding Nafeka',
      id: 'Fase 03 · Mendirikan Nafeka',
    },
    title: {
      en: 'Launching the Nafeka, MainKode & KataKode Ecosystem',
      id: 'Meluncurkan Ekosistem Nafeka, MainKode & KataKode',
    },
    description: {
      en: 'Established Nafeka as the central digital brand, alongside MainKode for software engineering showcases and KataKode for technical publishing—uniting brand, code, and knowledge.',
      id: 'Mendirikan Nafeka sebagai identitas brand utama bersama MainKode sebagai ruang etalase rekayasa dan KataKode sebagai media publikasi teknologi—menyatukan brand, kode, dan pengetahuan.',
    },
  },
  {
    period: '2026 — Now',
    phase: {
      en: 'Phase 04 · Shipping Products',
      id: 'Fase 04 · Merilis Produk',
    },
    title: {
      en: 'Shipping Real-World Software Products',
      id: 'Merilis Produk Perangkat Lunak Nyata',
    },
    description: {
      en: 'Continuing as a hands-on technical founder to ship real digital products including KasirKu (cloud retail POS) and GameVault (digital storefront), while staying open to strategic partnerships.',
      id: 'Terus berperan sebagai technical founder yang terjun langsung merilis produk nyata seperti KasirKu (sistem kasir cloud) dan GameVault (etalase game digital), serta terbuka untuk kolaborasi strategis.',
    },
  },
];

export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    id: 'linkedin',
    label: { en: 'LinkedIn', id: 'LinkedIn' },
    handle: 'Muhamad Naufal Burhanuddin Balit',
    description: {
      en: 'Executive profile, academic background & professional network',
      id: 'Profil profesional, latar belakang akademik & jaringan koneksi',
    },
    href: 'https://www.linkedin.com/search/results/all/?keywords=Muhamad%20Naufal%20Burhanuddin%20Balit',
    external: true,
  },
  {
    id: 'github',
    label: { en: 'GitHub', id: 'GitHub' },
    handle: '@MainKode-Indonesia',
    description: {
      en: 'Source code repositories, product builds & open-source work',
      id: 'Repositori kode sumber, produk rilis & kontribusi terbuka',
    },
    href: 'https://github.com/MainKode-Indonesia',
    external: true,
  },
  {
    id: 'nafeka',
    label: { en: 'Nafeka Ecosystem', id: 'Ekosistem Nafeka' },
    handle: 'nafeka.my.id',
    description: {
      en: 'Official company profile & ecosystem gateway',
      id: 'Website resmi perusahaan & gerbang ekosistem digital',
    },
    href: 'https://nafeka.my.id/',
    external: true,
  },
  {
    id: 'email',
    label: { en: 'Direct Email', id: 'Email Langsung' },
    handle: 'mainkode4@gmail.com',
    description: {
      en: 'Partnerships, product inquiries & direct executive contact',
      id: 'Kemitraan bisnis, diskusi produk & kontak langsung',
    },
    href: 'mailto:mainkode4@gmail.com',
    external: false,
  },
];
