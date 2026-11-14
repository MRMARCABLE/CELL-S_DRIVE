# Personal Developer Portfolio — Yohannes Marcel Lalopua (`CELL-S_DRIVE`)

Website portofolio pengembang berbasis **Next.js 16 (App Router)**, **React 19**, **TypeScript**, dan **Tailwind CSS v4** dengan konsep desain **"Cosmic Terminal Session With Marcel"** — memadukan narasi visual kosmik (dari bintang tidak stabil → ledakan *Orange Big Bang* → galaksi *Binary Milky Way* → *Dancing Star Singularity*) dengan estetika terminal interaktif, panggung *full-viewport* per bagian (`01` s/d `06`), interaksi kartu 3D, serta dukungan penuh dua tema (**Shadow / Dark** & **Bone / Light**) dan dua bahasa (**English `EN`** & **Bahasa Indonesia `ID`**).

- **Nama:** Yohannes Marcel Lalopua
- **NRP:** 5803025050
- **Program Studi:** Teknik Informatika — Universitas Katolik Widya Mandala Surabaya (UKWMS)

---

## Arsitektur & Fitur Utama

### 1. Cosmic Terminal Journey (`components/HomeContent.tsx`)
Setiap bagian dirangkai sebagai eksekusi perintah shell (`marca@ukwms:~$ <command> ▍`) di atas latar galaksi biner **Milky Way** (`components/home/fx/MilkyWayField.tsx`) dan siluet *radial glow* kontekstual (`html[data-scene="01".."06"]`) yang bereaksi terhadap posisi scroll:

- **Scene 00 — Interactive Unstable Star & Orange Big Bang (`marca --boot` / `components/home/BootSequence.tsx`):**
  Layar pembuka *full-screen* (`h-dvh w-screen`) yang menampilkan satu bintang kecil tidak stabil (*putih gemerlap* pada tema **Shadow / Dark** dan *hitam pekat kontras* pada tema **Bone / Light**) bersama kutipan filosofis pembuka. Pengguna melakukan **5× tap / klik / scroll / Spacebar** (`[0/5]` → `[5/5]`) yang meningkatkan getaran dan cincin gelombang kejut bintang hingga meledak menjadi **Orange-Amber-Gold-Crimson Gradient Big Bang Explosion** dan membentuk pusaran galaksi biner.
- **Scene 01 — Identity Hero & Right-Shifted Binary Milky Way (`whoami --profile` / `components/home/scenes/IdentityScene.tsx`):**
  Menampilkan tipografi **Giant Stacked Name (`YOHANNES / MARCEL / LALOPUA`)** di sisi kiri dengan **Binary Milky Way Galaxy (`components/home/fx/AsciiPortrait.tsx` & `MilkyWayField.tsx`)** yang berputar di sisi kanan dan memudar secara halus ke tepi layar (*radial edge fade*). Saat di-scroll ke bawah, nama lengkap bergerak turun bertransisi menjadi kontainer latar belakang untuk seksi berikutnya.
- **Scene 02 — Full-Name Kinetic Container & 3D RGB Playing-Card Deck (`ls ./focus --deck` / `components/home/scenes/FocusScene.tsx`):**
  Nama lengkap **`YOHANNES / MARCEL / LALOPUA`** menjadi *watermark container* raksasa berparalaks di belakang 3 pilar fokus rekayasa dalam proporsi kartu remi (`aspect-[5/7]`, `A♦`, `K♣`, `Q♠`) berwarna **R / G / B**. Saat masuk ke viewport, ketiga kartu melakukan animasi **3D Card Deal / Fan-Out** berurutan dan dapat dibalik **3D `rotateY(180deg)`** saat di-hover/klik.
- **Scene 03 — Self-Drawing Git Branch Stream (`git log --graph --all` / `components/home/scenes/JourneyScene.tsx`):**
  Jalur konvergensi RGB dari Scene 02 menyatu menjadi aliran cabang Git SVG yang menggambar dirinya sendiri dari atas ke bawah (`stroke-dashoffset`) saat di-scroll, menampilkan lini masa Pendidikan (`◆`) dan Pengalaman (`●`) beserta panel inspektor **`git show <hash>`**.
- **Scene 04 — Hardware Circuit & Mechanical Keycap Matrix (`lsmod --matrix` / `components/home/scenes/StackScene.tsx`):**
  Jalur tembaga PCB dengan sinyal elektrik mengalir (`.pcb-signal-trace` pada `BUS_01 // WEB_ARCH`, `BUS_02 // AI_VISION`, `BUS_03 // HW_DESIGN`), efek **Keycap LED Boot Wave** berurutan pada 15 tombol mekanikal (`0x01`–`0x0F`), serta panel telemetri `MODINFO` interaktif.
- **Scene 05 — Holographic Credential Vault & Live GPG Typewriter (`gpg --verify ./badges` / `components/home/scenes/CredentialsScene.tsx`):**
  Brankas 4 lencana digital terverifikasi dari **Credly** (*IBM SkillsBuild* & *Certiport*) dan sertifikat apresiasi *Codelamp Indonesia* dengan gelombang kilau prisma holografik (`.holo-badge`) serta efek **Live Terminal Typewriter (`$ gpg --verify ... [VALID]`)** pada panel inspektor saat kredensial dipilih.
- **Scene 06 — Interactive CLI Terminal & Dancing Star Singularity (`./connect --interactive` / `components/home/scenes/ConnectScene.tsx`):**
  5 kartu kanal langsung (`[1]` GitHub s/d `[5]` Email), terminal interaktif `marca-sh` dengan *tab-completion* & riwayat perintah (`help`, `neofetch`, `ls projects`, `cv`, `palette`, `sudo hire marcel`, `quote`, `chaos --overdrive`, `theme`, `lang`, `sfx`, `reboot`, `logout`), ditutup dengan **Dancing Star Singularity (`✦`)** berorbit biner yang menyatukan kembali perjalanan kosmik dari Scene 00.

### 2. Project Suite Catalog & Interactive Architecture Pipelines (`app/projects/page.tsx`, `components/ProjectCatalog.tsx`)
Katalog 7 proyek unggulan (`ls ./projects --suite`) lengkap dengan filter kategori (`AI & Automation`, `Embedded & Vision`, `3D Web`, `UI/UX`), pencarian *real-time*, serta modal **System Spec & 4-Stage Interactive Architecture Pipeline (`INPUT → PROCESS → CORE → OUTPUT`)**.

### 3. Printable CV / Resume Route (`app/cv/page.tsx`, `components/CvContent.tsx`)
Halaman CV formal ramah cetak (`marca --export-cv --format=a4`) dengan tombol **Print / Save PDF (`window.print()`)** yang merangkum profil akademik UKWMS, fokus riset, pengalaman, proyek pilihan, matriks keahlian, dan kredensial terverifikasi.

### 4. Command Palette, Web Audio Synth, Tema, i18n, & Pintasan Keyboard (`components/shell/*`)
- **Global Command Palette (`components/shell/CommandPalette.tsx`):** Tekan `Ctrl+K` / `Cmd+K` atau `?` untuk membuka palet navigasi cepat ke seluruh scene, halaman, aksi tema/bahasa/audio, dan tautan eksternal.
- **Tactile Web Audio Synth (`components/shell/sound.ts`, `components/SfxToggle.tsx`):** Efek suara mekanikal/terminal sintetis (*opt-in*, tanpa aset audio eksternal) yang dapat diaktifkan/dimatikan dari navbar atau shortcut `M`.
- **Dual Theme (`components/ThemeToggle.tsx`):** Mode **Shadow (Dark)** dan **Bone (Light)** bebas *flicker* dengan sinkronisasi `localStorage`.
- **Multi-Bahasa / i18n (`components/LanguageProvider.tsx`, `components/LanguageToggle.tsx`, `data/i18n.ts`):** Pergantian bahasa **English (`EN`)** dan **Bahasa Indonesia (`ID`)** secara instan di seluruh halaman.
- **Keyboard Shortcuts (`components/shell/HotkeysController.tsx`):**
  - `Ctrl+K` / `?`: Buka / tutup *Command Palette*
  - `T`: Ganti tema (*Shadow* / *Bone*)
  - `L`: Ganti bahasa (`EN` / `ID`)
  - `M`: Nyalakan / matikan efek suara (`SFX`)
  - `/`: Fokus langsung ke input CLI di Scene 06
  - `1`–`6`: Lompat ke Scene `01` s/d `06` di halaman utama
  - `G` lalu `P`: Buka `/projects` | `G` lalu `C`: Buka `/cv` | `G` lalu `H`: Kembali ke `/`

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
