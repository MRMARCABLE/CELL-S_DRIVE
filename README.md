# Personal Developer Portfolio — Yohannes Marcel Lalopua

Website portofolio minimalis berbasis **Next.js (App Router)** dan **Tailwind CSS** dengan fokus pada efisiensi kode dan struktur komponen yang bersih.

## Arsitektur & Rute Halaman
- **Global Layout (`app/layout.tsx` & `components/Navbar.tsx`):** Kerangka utama bertema gelap (*dark mode*) yang memuat navigasi atas dan *footer* kontak di seluruh halaman.
- **Home (`app/page.tsx`):** Menampilkan profil singkat dan daftar keahlian teknis (*Skills & Tech Stack*).
- **Projects (`app/projects/page.tsx`):** Menampilkan daftar proyek perangkat lunak, sistem cerdas/IoT, dan desain UI/UX.

## Teknologi yang Digunakan
- Next.js (App Router)
- React & TypeScript
- Tailwind CSS

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
