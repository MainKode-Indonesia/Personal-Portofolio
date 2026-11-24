# Muhamad Naufal Burhanuddin Balit — Portofolio Pribadi

Website portofolio pribadi **Muhamad Naufal Burhanuddin Balit** (**Founder & CEO of Nafeka**) yang dirancang untuk memperkenalkan visi founder, perjalanan teknis, kepemimpinan produk, ekosistem digital (**Nafeka**, **MainKode**, **KataKode**), galeri produk beserta demo & repositori, kontribusi GitHub langsung, serta formulir kontak terintegrasi email dalam desain editorial modern yang responsif di desktop maupun perangkat seluler.

![React](https://img.shields.io/badge/React-19.0-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.21-000000?style=flat-square&logo=express&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white)

---

## Struktur Halaman & Fitur Utama

1. **Hero & Unduh CV**: Menampilkan foto profil, identitas **Founder & CEO of Nafeka**, pernyataan visi (*"Building ideas into digital products."*), metrik ringkas, serta tombol **Unduh CV / Download CV** (PDF).
2. **About Me (`#about`)**: Cerita perjalanan pribadi, latar belakang Informatika & riset komputasi terapan, fakta ringkas, dan alasan membangun ekosistem Nafeka.
3. **Leadership (`#leadership`)**: Prinsip kepemimpinan sebagai *technical founder*—mulai dari visi ekosistem, strategi produk dari masalah nyata ke rilis, hingga eksekusi teknis langsung.
4. **My Ecosystem (`#ecosystem`)**: Tiga pilar yang saling terhubung: **Nafeka** (`nafeka.my.id`), **MainKode** (`mainkode.nafeka.my.id`), dan **KataKode** (`blog.nafeka.my.id`).
5. **Products & Projects (`#projects`)**: Galeri produk (**KasirKu**, **GameVault**, **MainKode**, **KataKode**, **Nafeka Kreasi Nusantara**) dengan filter kategori, **pencarian langsung (live search)** berdasarkan judul atau tag teknologi, tautan *Live Demo*, *Repository* GitHub, serta modal studi kasus.
6. **Tech Stack (`#tech-stack`)**: Kisi 15 teknologi dengan filter domain (*Frontend*, *Backend & Data*, *Infrastruktur*) yang secara interaktif menyorot keterhubungan antar teknologi saat disorot, difokuskan, atau diklik.
7. **GitHub Contributions (`#contributions`)**: Data kontribusi langsung dari `@MainKode-Indonesia` melalui endpoint `/api/github-contributions`—menampilkan ringkasan kontribusi 12 bulan terakhir, streak aktif/terpanjang, puncak harian, peta panas (*heatmap*) mingguan interaktif, dan daftar repositori publik terbaru.
8. **Journey (`#journey`)**: Linimasa perjalanan dari studi & riset, eksplorasi *full-stack*, pendirian Nafeka, hingga perilisan produk nyata.
9. **Contact & Social (`#contact`)**: Tautan LinkedIn, GitHub, Ekosistem Nafeka, tombol salin email, serta formulir kontak terintegrasi email via `POST /api/contact` (*SMTP Nodemailer* dan fallback `mailto:`).

### Pengalaman Navigasi & Tema
- **Dwibahasa (`EN | ID`)**: Pengalih bahasa di header yang menerjemahkan seluruh konten, metadata halaman, modal, dan formulir secara instan dengan penyimpanan di `localStorage`.
- **Dynamic Header Scroll-Spy**: Sorotan otomatis pada tautan navigasi desktop maupun menu seluler sesuai bagian halaman yang sedang dilihat (`useActiveSection`).
- **Scroll Progress Indicator**: Indikator progres gulir berbasis GPU (`transform: scaleX`) di bagian atas layar.
- **Mode Gelap & Mode Terang**: Pergantian tema **Dark Mode** dan **Light Mode** tanpa *flash* awal, tersimpan otomatis di `localStorage`.
- **Animasi Scroll Reveal**: Efek transisi masuk berbasis `IntersectionObserver` (`useInView`) yang menghormati preferensi `prefers-reduced-motion`.

---

## Tumpukan Teknologi

| Lapisan | Teknologi |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite 8 |
| **Styling & Tipografi** | Tailwind CSS v4 (`@tailwindcss/vite`), Bricolage Grotesque, Plus Jakarta Sans, JetBrains Mono |
| **Ikon & Animasi** | Lucide React, CSS Compositor Transitions, IntersectionObserver |
| **Backend & Integrasi** | Node.js, Express, Nodemailer, Dotenv, GitHub Public API & Contributions Feed |

---

## Struktur Direktori

```text
.
├── index.html                           # Entry HTML, Google Fonts, & hidrasi tema awal
├── server.ts                            # Server Express + Vite middleware, API /api/contact & /api/github-contributions
├── package.json                         # Daftar dependensi dan skrip npm
├── vite.config.ts                       # Konfigurasi Vite & penyalinan aset src/assets
├── .env.example                         # Contoh konfigurasi variabel lingkungan
├── public/
│   └── assets/
│       ├── CV-Muhamad-Naufal-Burhanuddin-Balit.pdf
│       └── aistudio/                    # Foto potret profil pribadi
└── src/
    ├── App.tsx                          # Root state (tema, bahasa, modal proyek) & susunan seluruh bagian
    ├── index.css                        # Konfigurasi Tailwind v4 & dark custom variant
    ├── main.tsx                         # Mount React DOM
    ├── data/
    │   └── projects.ts                  # Data profil, prinsip kepemimpinan, ekosistem, proyek, keahlian, linimasa, & ID/EN
    ├── hooks/
    │   ├── useActiveSection.ts          # Hook scroll-spy untuk highlight navigasi header dinamis
    │   └── useInView.ts                 # Hook IntersectionObserver untuk animasi fade-in
    └── components/
        ├── Header.tsx                   # Bilah navigasi 3-zona + scroll-spy + pemilih bahasa EN/ID + menu seluler
        ├── ScrollProgress.tsx           # Indikator progres gulir halaman di bagian atas viewport
        ├── Hero.tsx                     # Foto profil, headline founder, tombol Unduh CV, & metrik ringkas
        ├── AboutSection.tsx             # Latar belakang pribadi, riset Informatika, & fakta ringkas
        ├── LeadershipSection.tsx        # Prinsip kepemimpinan & strategi membangun produk
        ├── EcosystemSection.tsx         # Kartu tiga pilar ekosistem: Nafeka, MainKode, & KataKode
        ├── ProjectGallery.tsx           # Galeri proyek dengan filter kategori & live search judul/teknologi
        ├── ProjectModal.tsx             # Modal studi kasus produk lengkap dengan demo & repositori
        ├── TechStackSection.tsx         # Matriks keahlian teknis interaktif dengan sorotan relasi
        ├── GitHubContributionsSection.tsx # Grafik heatmap kontribusi GitHub & repositori aktif @MainKode-Indonesia
        ├── JourneySection.tsx           # Linimasa perjalanan membangun ide hingga produk rilis
        ├── ContactSection.tsx           # Koneksi profesional, media sosial, & formulir kontak email
        ├── Footer.tsx                   # Tautan navigasi, media sosial, & pengalih tema
        └── MediaImage.tsx               # Komponen gambar tangguh dengan fallback otomatis
```

---

## Memulai Secara Lokal

### 1. Prasyarat
- **Node.js** versi `20+` (disarankan `22+`)
- **npm**

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Variabel Lingkungan
Salin berkas `.env.example` menjadi `.env`, lalu sesuaikan nilainya jika Anda ingin mengaktifkan pengiriman email langsung melalui SMTP:

```bash
cp .env.example .env
```

```env
APP_URL="http://localhost:3000"
CONTACT_EMAIL="mainkode4@gmail.com"

# Opsional: aktifkan jika ingin mengirim email langsung dari server Express
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="user@example.com"
SMTP_PASS="your-smtp-password"
SMTP_SECURE="false"
```

> Jika kredensial SMTP tidak diisi, formulir kontak tetap memvalidasi pesan dan menyediakan tautan `mailto:` yang terisi otomatis ke alamat email tujuan.

### 4. Menjalankan Server Pengembangan
```bash
npm run dev
```
Aplikasi akan berjalan di **`http://localhost:3000`**.

---

## Skrip Tersedia

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run dev` | Menjalankan server Express + Vite middleware dalam mode pengembangan (`tsx server.ts`) |
| `npm run build` | Membangun bundel produksi frontend ke direktori `dist/` |
| `npm run start` | Menjalankan server produksi (`NODE_ENV=production` menyajikan hasil build `dist/`) |
| `npm run lint` | Menjalankan pemeriksaan tipe TypeScript (`tsc --noEmit`) |
| `npm run clean` | Menghapus direktori hasil build `dist` dan berkas `server.js` |

---

## Endpoint API

| Method | Path | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Memeriksa status kesehatan server (`{ ok: true }`) |
| `GET` | `/api/github-contributions` | Mengambil data kalender kontribusi 1 tahun terakhir, statistik streak, dan daftar repositori publik terbaru `@MainKode-Indonesia` (dengan cache memori 15 menit) |
| `POST` | `/api/contact` | Memvalidasi formulir kontak (`name`, `email`, `subject`, `message`), mengirim via SMTP jika tersedia, dan mengembalikan tautan `mailto:` terformat |

---

## Kustomisasi Konten

- **Profil, Kepemimpinan, Ekosistem, Proyek, Keahlian & Terjemahan**: Sunting berkas `src/data/projects.ts`.
- **Akun GitHub Kontribusi**: Ubah konstanta `GITHUB_USERNAME` pada `server.ts` jika ingin mengganti target akun GitHub.
- **Berkas CV PDF**: Ganti berkas di `public/assets/CV-Muhamad-Naufal-Burhanuddin-Balit.pdf` atau sesuaikan properti `cvUrl` dan `cvFileName` pada `OWNER_PROFILE`.

---

## Kontak & Tautan

- **Email**: `mainkode4@gmail.com`
- **GitHub**: [@MainKode-Indonesia](https://github.com/MainKode-Indonesia)
- **Ekosistem Nafeka**: [nafeka.my.id](https://nafeka.my.id/)
- **Showcase Proyek**: [mainkode.nafeka.my.id](https://mainkode.nafeka.my.id/)
- **Blog Teknologi**: [blog.nafeka.my.id](https://blog.nafeka.my.id/)

---

Dibuat oleh **Muhamad Naufal Burhanuddin Balit**.
