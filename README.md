# Personal Developer Portfolio — Yohannes Marcel Lalopua

Website portofolio pengembang berbasis **Next.js 16 (App Router)**, **React 19**, **TypeScript**, dan **Tailwind CSS v4** dengan pendekatan desain *Architectural Dark UI* yang terinspirasi dari ekosistem perangkat lunak modular modern.

- **Nama:** Yohannes Marcel Lalopua
- **NRP:** 5803025050
- **Program Studi:** Teknik Informatika — Universitas Katolik Widya Mandala Surabaya (UKWMS)

---

## Arsitektur & Fitur Utama

- **Global Layout, Tema & Bahasa (`app/layout.tsx`, `components/Navbar.tsx`):**
  - **Dual Theme (`components/ThemeToggle.tsx`):** Mendukung tema **Shadow (Dark)** dan **Bone (Light)** menggunakan CSS custom properties di `app/globals.css`, dengan skrip inisialisasi anti-flicker dan penyimpanan preferensi di `localStorage`.
  - **Multi-Bahasa / i18n (`components/LanguageProvider.tsx` & `components/LanguageToggle.tsx`):** Mendukung pergantian bahasa **English (`EN`)** dan **Bahasa Indonesia (`ID`)** secara real-time menggunakan React Context + `useSyncExternalStore`, dengan kamus terjemahan terpisah di `data/i18n.ts`.
  - **Navigasi & Footer:** Navigasi atas *sticky glassmorphism* dengan indikator rute aktif (`usePathname()`) serta footer kontak (Email, GitHub, LinkedIn, Credly, dan Git-Eng).
- **Overview / Home Multi-Section (`app/page.tsx` & `components/HomeContent.tsx`):**
  Halaman utama terstruktur dengan penomoran modul monospace yang merender profil developer (`next/image`), fokus riset & engineering, *experience & education*, *tech stack matrix*, 4 lencana sertifikasi digital terverifikasi dari **Credly** (*IBM SkillsBuild* & *Certiport*), sertifikat tambahan, serta tautan jaringan profesional.
- **Project Suite Catalog (`app/projects/page.tsx`, `components/ProjectsContent.tsx`, `components/ProjectCatalog.tsx`):**
  Katalog modul proyek perangkat lunak, automasi AI, perangkat keras/robotika, visualisasi 3D, dan riset UI/UX lengkap dengan **filter kategori interaktif**, *badge* status, rincian spesifikasi teknis, dan tautan sumber.
- **Layer Data Terpusat (`data/portfolio.ts` & `data/i18n.ts`):**
  Memisahkan seluruh konten portofolio dan lokalisasi dari komponen UI agar mudah diperbarui dan dipelihara.
- **Konfigurasi Next.js (`next.config.ts`):**
  Mendefinisikan `images.remotePatterns` untuk mengizinkan optimasi gambar eksternal dari GitHub dan Credly (`images.credly.com`) secara aman.

---

## Teknologi yang Digunakan

- **Framework:** Next.js 16 (App Router & Turbopack)
- **Library UI:** React 19 & TypeScript 5
- **Styling & Tipografi:** Tailwind CSS v4, `Geist Sans`, & `Geist Mono` (`next/font/google`)

---

## Cara Menjalankan di Lokal

1. Instal seluruh dependensi paket:
   ```bash
   npm install
   ```
2. Jalankan server pengembangan (*development server*):
   ```bash
   npm run dev
   ```
3. Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat hasilnya.
