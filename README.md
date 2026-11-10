# Personal Developer Portfolio — Yohannes Marcel Lalopua

Website portofolio pengembang berbasis **Next.js 16 (App Router)**, **React 19**, **TypeScript**, dan **Tailwind CSS v4** dengan pendekatan desain *Architectural Dark UI* yang terinspirasi dari ekosistem perangkat lunak modular modern.

- **Nama:** Yohannes Marcel Lalopua
- **NRP:** 5803025050
- **Program Studi:** Teknik Informatika — Universitas Katolik Widya Mandala Surabaya (UKWMS)

---

## Arsitektur & Rute Halaman

- **Global Layout & Navigasi (`app/layout.tsx` & `components/Navbar.tsx`):**
  Kerangka utama bertema gelap (`zinc-950`) dengan efek *ambient radial spotlight*, navigasi atas *sticky glassmorphism* (`backdrop-blur-md`) yang dilengkapi penanda rute aktif berbasis `usePathname()`, serta *engineering status footer* di seluruh halaman.
- **Overview / Home Multi-Section (`app/page.tsx`):**
  Halaman utama terstruktur dengan penomoran modul monospace:
  - `01 // DEVELOPER PROFILE`: Profil singkat dengan optimasi foto profil GitHub menggunakan komponen `next/image`.
  - `02 // ENGINEERING & RESEARCH FOCUS`: Tiga pilar eksplorasi utama (*Autonomous AI*, *Embedded Systems & Computer Vision*, serta *Interactive 3D Web & UI/UX*).
  - `03 // TECH STACK & TOOLING MATRIX`: Pengelompokan keahlian teknis secara modular.
  - `04 // VERIFIED CREDENTIALS & BADGES`: Menampilkan 4 lencana sertifikasi digital terverifikasi dari **Credly** (*IBM SkillsBuild* & *Certiport*) lengkap dengan optimasi emblem `next/image` dan tautan verifikasi langsung.
  - `05 // REPOSITORIES & PROFESSIONAL NETWORK`: Tautan langsung ke GitHub, LinkedIn, Credly, dan Git-Eng UKWMS.
- **Project Suite Catalog (`app/projects/page.tsx`):**
  Katalog modul proyek perangkat lunak, perangkat keras/robotika, visualisasi 3D, dan riset UI/UX (*ChiefOfStaff AI*, *Desktop Face-Tracking Robot*, *3D Math Vector Visualizer*, dan *Smart Energy Monitoring UI/UX*) lengkap dengan *badge* status, rincian spesifikasi teknis, dan tautan sumber.
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
