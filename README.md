# Muhamad Naufal Burhanuddin Balit — Portofolio Pribadi

Website portofolio pribadi **Muhamad Naufal Burhanuddin Balit** yang dirancang untuk memperkenalkan profil personal, keahlian teknis, proyek unggulan (**MainKode**), tautan media sosial, serta formulir kontak terintegrasi email dalam tampilan modern yang responsif di desktop maupun perangkat seluler.

![React](https://img.shields.io/badge/React-19.0-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.21-000000?style=flat-square&logo=express&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white)

---

## Fitur Utama

- **Identitas & Perkenalan Pribadi**: Menampilkan profil lengkap, foto potret pribadi, fakta ringkas, perjalanan pengembangan perangkat lunak, serta prinsip kerja rekayasa antarmuka.
- **Dwibahasa (Indonesia & Inggris)**: Pengalih bahasa **`ID | EN`** di bilah navigasi atas yang langsung menerjemahkan seluruh konten halaman, formulir, dan metadata dokumen serta tersimpan otomatis di `localStorage`.
- **Mode Gelap & Mode Terang**: Mendukung pergantian tema **Dark Mode** dan **Light Mode** tanpa *flash* awal, dengan preferensi pengguna yang tersimpan otomatis.
- **Matriks Keahlian Interaktif**: Kisi 15 teknologi dengan filter domain (*Frontend*, *Backend & Data*, *Infrastruktur*) yang secara dinamis menyorot teknologi terkait saat disorot, difokuskan, atau diklik.
- **Sorotan Proyek Utama & Modal Detail**: Menampilkan proyek **MainKode** (`mainkode.nafeka.my.id`) lengkap dengan pratinjau visual, ringkasan arsitektur, dan modal studi kasus yang mengarahkan pengunjung ke arsip proyek lainnya.
- **Unduh CV (PDF)**: Tombol **Unduh CV / Download CV** pada bagian Hero yang langsung mengunduh berkas resume PDF dari direktori `public/assets/`.
- **Umpan Balik Navigasi Halus**:
  - **Scroll Progress Indicator** berbasis GPU (`transform: scaleX`) di tepi atas layar.
  - **Scroll Reveal** menggunakan `IntersectionObserver` (`useInView`) yang patuh terhadap preferensi `prefers-reduced-motion`.
- **Formulir Kontak Terintegrasi Email**: Endpoint backend `POST /api/contact` dengan validasi input, dukungan pengiriman email langsung via SMTP (`nodemailer`), serta opsi cepat **Kirim via Email App** (`mailto:`) dan tombol salin alamat email.

---

## Tumpukan Teknologi

| Lapisan | Teknologi |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite 8 |
| **Styling & Tipografi** | Tailwind CSS v4 (`@tailwindcss/vite`), Bricolage Grotesque, Plus Jakarta Sans, JetBrains Mono |
| **Ikon** | Lucide React |
| **Backend & Email** | Node.js, Express, Nodemailer, Dotenv |

---

## Struktur Direktori

```text
.
├── index.html                  # Entry HTML, Google Fonts, & hidrasi tema awal
├── server.ts                   # Server Express + Vite middleware & API /api/contact
├── package.json                # Daftar dependensi dan skrip npm
├── vite.config.ts              # Konfigurasi Vite & penyalinan aset src/assets
├── .env.example                # Contoh konfigurasi variabel lingkungan
├── public/
│   └── assets/
│       ├── CV-Muhamad-Naufal-Burhanuddin-Balit.pdf
│       └── aistudio/           # Foto profil pribadi
└── src/
    ├── App.tsx                 # Root state (tema, bahasa, modal proyek)
    ├── index.css               # Konfigurasi Tailwind v4 & dark custom variant
    ├── main.tsx                # Mount React DOM
    ├── data/
    │   └── projects.ts         # Data profil, metrik, proyek, keahlian, & terjemahan ID/EN
    ├── hooks/
    │   └── useInView.ts        # Hook IntersectionObserver untuk animasi fade-in
    └── components/
        ├── Header.tsx          # Bilah navigasi 3-zona + pemilih bahasa ID/EN + menu seluler
        ├── ScrollProgress.tsx  # Indikator progres gulir halaman di bagian atas viewport
        ├── Hero.tsx            # Perkenalan pribadi, potret, tombol Unduh CV, & metrik ringkas
        ├── AboutAndSkills.tsx  # Bagian Tentang Saya & matriks keahlian interaktif
        ├── ProjectGallery.tsx  # Kartu showcase proyek MainKode
        ├── ProjectModal.tsx    # Modal detail studi kasus proyek
        ├── ContactSection.tsx  # Informasi kontak, media sosial, & formulir email
        ├── Footer.tsx          # Tautan navigasi, media sosial, & pengalih tema
        └── MediaImage.tsx      # Komponen gambar tangguh dengan fallback otomatis
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

> Jika kredensial SMTP tidak diisi, formulir kontak tetap berfungsi untuk memvalidasi pesan dan menyediakan tautan `mailto:` yang sudah terisi otomatis ke alamat email tujuan.

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
| `POST` | `/api/contact` | Memvalidasi formulir kontak (`name`, `email`, `subject`, `message`), mengirim via SMTP jika tersedia, dan mengembalikan tautan `mailto:` terformat |

---

## Kustomisasi Konten

- **Profil, Terjemahan, Keahlian & Tautan Sosial**: Sunting berkas `src/data/projects.ts`.
- **Berkas CV PDF**: Ganti berkas di `public/assets/CV-Muhamad-Naufal-Burhanuddin-Balit.pdf` atau sesuaikan properti `cvUrl` dan `cvFileName` pada `OWNER_PROFILE`.

---

## Kontak & Tautan

- **Email**: `mainkode4@gmail.com`
- **GitHub**: [@MainKode-Indonesia](https://github.com/MainKode-Indonesia)
- **Arsip Proyek**: [mainkode.nafeka.my.id](https://mainkode.nafeka.my.id/)
- **Blog Teknis**: [blog.nafeka.my.id](https://blog.nafeka.my.id/)
- **Situs Utama**: [nafeka.my.id](https://nafeka.my.id/)

---

Dibuat oleh **Muhamad Naufal Burhanuddin Balit**.
