# Personal Developer Portfolio — Yohannes Marcel Lalopua (`CELL-S_DRIVE v2.0`)

Website portofolio pengembang berbasis **Next.js 16 (App Router)**, **React 19**, **TypeScript**, dan **Tailwind CSS v4** dengan konsep desain **"A Terminal Session With Marcel"** — memadukan estetika terminal berkarakter, panggung *full-viewport* per bagian (`01` s/d `06`), siluet cahaya kontekstual, interaksi kartu 3D, serta dukungan penuh dua tema (**Shadow / Dark** & **Bone / Light**) dan dua bahasa (**English `EN`** & **Bahasa Indonesia `ID`**).

- **Nama:** Yohannes Marcel Lalopua
- **NRP:** 5803025050
- **Program Studi:** Teknik Informatika — Universitas Katolik Widya Mandala Surabaya (UKWMS)

---

## Arsitektur & Fitur Utama

### 1. Panggung Sesi Terminal Interaktif (`components/HomeContent.tsx`)
Setiap bagian dirangkai sebagai eksekusi perintah shell (`marca@ukwms:~$ <command> ▍`) dengan siluet *radial glow* kontekstual (`html[data-scene="01".."06"]`) yang bergeser secara dinamis mengikuti posisi scroll:

- **Scene 00 — Boot Sequence (`marca --boot` / `components/home/BootSequence.tsx`):**
  Intro pembuka yang merangkai matriks biner menjadi bintang menari `✦` dan kutipan filosofis pembuka (berjalan penuh ~2.5s pada kunjungan pertama di sesi aktif, *fast-track* ~0.85s pada kunjungan berikutnya di sesi yang sama, dan dapat dilewati kapan saja dengan klik atau tombol `ESC`).
- **Scene 01 — Identity Hero (`whoami --profile` / `components/home/scenes/IdentityScene.tsx`):**
  Menampilkan tipografi **Giant Stacked Name (`YOHANNES / MARCEL / LALOPUA`)** sebagai titik fokus utama, didampingi **ASCII Portrait (`components/home/fx/AsciiPortrait.tsx`)** hasil prapemrosesan kontras CLAHE (`scripts/generate-ascii.mjs`) dengan efek *cursor spotlight*, chip foto asli terverifikasi (`next/image`), serta efek *scroll-linked phasing* menuju Scene 02.
- **Scene 02 — 3D RGB Playing-Card Deck (`ls ./focus --deck` / `components/home/scenes/FocusScene.tsx`):**
  Latar kanvas matriks biner `0`/`1` interaktif (`components/home/fx/BinaryField.tsx`) yang menaungi 3 pilar rekayasa utama dalam proporsi kartu remi (`aspect-[5/7]`) berwarna **R / G / B** (*Neony* pada mode Shadow/Dark & *Soft* pada mode Bone/Light) dengan animasi balik **3D `rotateY(180deg)`** saat di-hover/klik serta tombol *Reveal All Cards*.
- **Scene 03 — Interactive Git Commit Graph (`git log --graph --all` / `components/home/scenes/JourneyScene.tsx`):**
  Lini masa perjalanan Pendidikan (`◆`) dan Pengalaman (`●`) dalam bentuk graf cabang Git interaktif lengkap dengan *commit hash* deterministik dan panel inspektor **`git show <hash>`**.
- **Scene 04 — Hardware Circuit & Mechanical Keycap Matrix (`lsmod --matrix` / `components/home/scenes/StackScene.tsx`):**
  Matriks teknologi bergaya *keycap* mekanikal / modul IC dengan alamat pin heksadesimal (`0x01`–`0x0F`), filter jalur bus (`BUS_01 // WEB_ARCH`, `BUS_02 // AI_VISION`, `BUS_03 // HW_DESIGN`), serta bilah telemetri `MODINFO` secara langsung.
- **Scene 05 — Holographic Credential Vault (`gpg --verify ./badges` / `components/home/scenes/CredentialsScene.tsx`):**
  Brankas 4 lencana digital terverifikasi dari **Credly** (*IBM SkillsBuild* & *Certiport*) dengan efek kilau `.holo-badge`, panel inspektor verifikasi tanda tangan GPG (`gpg --verify`), dan arsip sertifikat apresiasi *Codelamp Indonesia*.
- **Scene 06 — Interactive CLI Terminal (`./connect --interactive` / `components/home/scenes/ConnectScene.tsx`):**
  5 kartu kanal langsung (`[1]` GitHub s/d `[5]` Email) ditambah terminal interaktif `marca-sh` yang mendukung perintah `help`, `neofetch`, `sudo hire marcel`, `quote`, `chaos`, `coffee`, `whoami`, `1`–`5`, dan `clear`, ditutup dengan pesan `logout` filosofis.

### 2. Project Suite Catalog (`app/projects/page.tsx`, `components/ProjectsContent.tsx`, `components/ProjectCatalog.tsx`)
Katalog modul proyek (`ls ./projects --suite` & `cat ./projects/*.spec`) dengan kutipan filosofis pembuka, filter kategori interaktif (`AI & Automation`, `Embedded & Vision`, `3D Web`, `UI/UX`), rincian spesifikasi teknis, dan tautan repositori.

### 3. Shell Polish, Tema, i18n, & Pintasan Keyboard (`components/shell/*`)
- **Dual Theme (`components/ThemeToggle.tsx`):** Mode **Shadow (Dark)** dan **Bone (Light)** bebas *flicker* dengan sinkronisasi `localStorage`.
- **Multi-Bahasa / i18n (`components/LanguageProvider.tsx`, `components/LanguageToggle.tsx`, `data/i18n.ts`):** Pergantian bahasa **English (`EN`)** dan **Bahasa Indonesia (`ID`)** secara instan di seluruh scene.
- **Keyboard Shortcuts (`components/shell/HotkeysController.tsx`):**
  - `T`: Ganti tema (*Shadow* / *Bone*)
  - `L`: Ganti bahasa (`EN` / `ID`)
  - `/`: Fokus langsung ke input CLI di Scene 06
  - `1`–`6`: Lompat ke Scene `01` s/d `06` di halaman utama
  - `G` lalu `P`: Buka halaman `/projects` | `G` lalu `H`: Kembali ke `/`
- **Live Scene Indicator (`components/Navbar.tsx`):** Indikator posisi scene aktif (`[01/06] whoami` s/d `[06/06] ./connect`) dengan menu lompat cepat dan monogram bintang `✦`.
- **Tab-Title Personality (`components/shell/TabTitleController.tsx`):** Menampilkan `marca --sleep ☾` saat tab tidak aktif dan `marca --wake ✦` saat pengguna kembali.
- **Session Uptime & Terminal 404 (`components/shell/SessionUptime.tsx`, `app/not-found.tsx`):** Penghitung waktu sesi aktif secara real-time di footer dan halaman 404 bergaya shell (`errno 404`).

---

## Teknologi yang Digunakan

- **Framework:** Next.js 16 (App Router & Turbopack)
- **Library UI:** React 19 & TypeScript 5
- **Styling & Tipografi:** Tailwind CSS v4, `Geist Sans`, & `Geist Mono` (`next/font/google`)
- **Pemrosesan Aset Offline:** `sharp` (`scripts/generate-ascii.mjs`)

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
