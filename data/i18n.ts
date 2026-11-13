import type {
  CertificateItem,
  EducationItem,
  ExperienceItem,
  FocusDomain,
  ProjectCategory,
  ProjectItem,
} from "@/data/portfolio";
import {
  certificates as baseCertificates,
  education as baseEducation,
  experiences as baseExperiences,
  focusDomains as baseFocusDomains,
  profile,
  projects as baseProjects,
} from "@/data/portfolio";

export type Locale = "en" | "id";

export interface LocalizedContent {
  nav: {
    overview: string;
    projects: string;
  };
  hero: {
    sectionLabel: string;
    availability: string;
    roleBadge: string;
    bio: string;
    exploreProjects: string;
    contactMe: string;
  };
  sections: {
    focusHeading: string;
    focusBadge: string;
    expHeading: string;
    expBadge: string;
    stackHeading: string;
    stackBadge: string;
    credHeading: string;
    credVerifyLink: string;
    credLabel: string;
    verifyBadge: string;
    issuedLabel: string;
    networkHeading: string;
    networkBadge: string;
  };
  channels: {
    githubDesc: string;
    linkedinDesc: string;
    credlyDesc: string;
    gitEngDesc: string;
    emailTag: string;
    emailDesc: string;
  };
  projectsPage: {
    catalogLabel: string;
    modulesIndexed: string;
    title: string;
    subtitle: string;
    featuredHeading: string;
    allCategory: string;
    exploreSource: string;
    backHome: string;
  };
  categoryLabels: Record<ProjectCategory, string>;
  focusDomains: FocusDomain[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  certificates: CertificateItem[];
  projects: ProjectItem[];
}

export const translations: Record<Locale, LocalizedContent> = {
  en: {
    nav: {
      overview: "Overview",
      projects: "Projects",
    },
    hero: {
      sectionLabel: "01 // DEVELOPER PROFILE",
      availability: profile.availability,
      roleBadge: profile.roleBadge,
      bio: profile.bio,
      exploreProjects: "Explore Project Suite",
      contactMe: "Contact Me",
    },
    sections: {
      focusHeading: "02 // Engineering & Research Focus",
      focusBadge: "3 CORE PILLARS",
      expHeading: "03 // Experience & Education",
      expBadge: "TRACK RECORD",
      stackHeading: "04 // Tech Stack & Tooling Matrix",
      stackBadge: "MODULAR STACK",
      credHeading: "05 // Verified Credentials & Certificates",
      credVerifyLink: "CREDLY VERIFIED ↗",
      credLabel: "CREDENTIAL",
      verifyBadge: "Verify Badge ↗",
      issuedLabel: "ISSUED",
      networkHeading: "06 // Repositories & Direct Contact",
      networkBadge: "5 CHANNELS",
    },
    channels: {
      githubDesc:
        "Open-source code, personal engineering builds, and web experiments.",
      linkedinDesc:
        "Professional network, academic milestones, and industry connections.",
      credlyDesc: "Verified digital badges from IBM SkillsBuild and Certiport.",
      gitEngDesc: "Academic repository at Faculty of Engineering, UKWMS.",
      emailTag: "DIRECT EMAIL // COLLABORATION & INTERNSHIPS",
      emailDesc:
        "Open to software engineering internships, UI/UX collaborations, and AI/IoT projects.",
    },
    projectsPage: {
      catalogLabel: "01 // PROJECT SUITE CATALOG",
      modulesIndexed: "MODULES INDEXED",
      title: "Engineering & Creative Suite",
      subtitle:
        "A curated collection of software applications, autonomous AI workflows, embedded IoT robotics, 3D browser visualizations, and user-centered UI/UX systems.",
      featuredHeading: "02 // Featured Modules & Specifications",
      allCategory: "All",
      exploreSource: "Explore Source",
      backHome: "Back to Overview & Profile",
    },
    categoryLabels: {
      "AI & Automation": "AI & Automation",
      "Embedded & Vision": "Embedded & Vision",
      "3D Web": "3D Web",
      "UI/UX": "UI/UX",
    },
    focusDomains: baseFocusDomains,
    experiences: baseExperiences,
    education: baseEducation,
    certificates: baseCertificates,
    projects: baseProjects,
  },
  id: {
    nav: {
      overview: "Ringkasan",
      projects: "Proyek",
    },
    hero: {
      sectionLabel: "01 // PROFIL PENGEMBANG",
      availability: "TERBUKA UNTUK MAGANG",
      roleBadge: "Mahasiswa Teknik Informatika — UKWMS",
      bio: "Mahasiswa Teknik Informatika di Universitas Katolik Widya Mandala Surabaya yang berfokus pada pengembangan web full-stack modern, desain UI/UX berbasis User-Centered Design (UCD), serta sistem cerdas yang memadukan robotika mikrokontroler (IoT) dengan Generative AI.",
      exploreProjects: "Lihat Suite Proyek",
      contactMe: "Hubungi Saya",
    },
    sections: {
      focusHeading: "02 // Fokus Rekayasa & Riset",
      focusBadge: "3 PILAR UTAMA",
      expHeading: "03 // Pengalaman & Pendidikan",
      expBadge: "REKAM JEJAK",
      stackHeading: "04 // Matriks Teknologi & Perkakas",
      stackBadge: "STACK MODULAR",
      credHeading: "05 // Kredensial & Sertifikat Terverifikasi",
      credVerifyLink: "VERIFIKASI CREDLY ↗",
      credLabel: "KREDENSIAL",
      verifyBadge: "Verifikasi Lencana ↗",
      issuedLabel: "TERBIT",
      networkHeading: "06 // Repositori & Kontak Langsung",
      networkBadge: "5 KANAL",
    },
    channels: {
      githubDesc:
        "Kode sumber terbuka, proyek rekayasa pribadi, dan eksperimen web.",
      linkedinDesc:
        "Jaringan profesional, pencapaian akademik, dan koneksi industri.",
      credlyDesc:
        "Lencana digital resmi dari IBM SkillsBuild dan Certiport.",
      gitEngDesc:
        "Repositori akademik Fakultas Teknik Universitas Katolik Widya Mandala Surabaya.",
      emailTag: "EMAIL LANGSUNG // KOLABORASI & MAGANG",
      emailDesc:
        "Terbuka untuk peluang magang software engineering, kolaborasi UI/UX, dan proyek AI/IoT.",
    },
    projectsPage: {
      catalogLabel: "01 // KATALOG SUITE PROYEK",
      modulesIndexed: "MODUL TERINDEKS",
      title: "Suite Rekayasa & Kreatif",
      subtitle:
        "Kumpulan aplikasi perangkat lunak, alur kerja AI otonom, robotika IoT tertanam, visualisasi 3D di browser, dan sistem antarmuka berbasis UCD.",
      featuredHeading: "02 // Modul Unggulan & Spesifikasi",
      allCategory: "Semua",
      exploreSource: "Lihat Kode",
      backHome: "Kembali ke Ringkasan & Profil",
    },
    categoryLabels: {
      "AI & Automation": "AI & Otomasi",
      "Embedded & Vision": "Embedded & Visi",
      "3D Web": "Web 3D",
      "UI/UX": "UI/UX",
    },
    focusDomains: [
      {
        ...baseFocusDomains[0],
        title: "AI Otonom & Otomasi Alur Kerja",
        desc: "Membangun agen AI otonom dan pipeline otomatis untuk audit operasional, pencarian dokumen, serta integrasi workspace cerdas menggunakan Langflow, IBM watsonx, Astra DB, dan n8n.",
      },
      {
        ...baseFocusDomains[1],
        title: "Sistem Tertanam & Visi Komputer",
        desc: "Mengembangkan robotika meja berbasis ESP32 dengan mekanisme pan-tilt 2-axis dan pelacakan wajah real-time menggunakan Python, OpenCV, dan MediaPipe.",
      },
      {
        ...baseFocusDomains[2],
        title: "Web 3D Interaktif & Rekayasa UI/UX",
        desc: "Merancang antarmuka berbasis User-Centered Design (UCD) di Figma serta visualisasi matematis 3D interaktif di browser menggunakan React, Next.js, dan Three.js.",
      },
    ],
    experiences: [
      {
        ...baseExperiences[0],
        role: "Magang Tim Kreatif & Web Developer",
        period: "Mar 2023 · 6 Bulan",
        type: "MAGANG",
        summary:
          "Mengembangkan halaman web frontend, merancang tata letak UI/UX di Figma, serta menyusun strategi konten digital bersama tim kreatif dan teknis.",
      },
      {
        ...baseExperiences[1],
        role: "Sekretaris",
        period: "Feb 2023",
        type: "ORGANISASI",
        summary:
          "Mengelola administrasi organisasi serta mendukung logistik dan kesiapan perlengkapan untuk kegiatan alam bebas.",
      },
      {
        ...baseExperiences[2],
        role: "Magang Kru Kamera & Operator Livestreaming",
        period: "Des 2022",
        type: "MAGANG",
        summary:
          "Mengoperasikan kamera siaran langsung dan pembaruan skor/waktu secara real-time pada turnamen basket internasional CLS CUP.",
      },
    ],
    education: [
      {
        ...baseEducation[0],
        degree: "S1 Teknik Informatika",
        period: "2025 — Sekarang",
        note: "Berfokus pada Rekayasa Web, Kecerdasan Buatan, Visi Komputer, dan Sistem Tertanam.",
      },
      {
        ...baseEducation[1],
        degree: "SMK — Jurusan Multimedia",
        note: "Membangun dasar kuat dalam desain visual, prototipe UI/UX, produksi media digital, dan dasar pengembangan frontend.",
      },
    ],
    certificates: [
      {
        ...baseCertificates[0],
        credentialType: "SERTIFIKAT APRESIASI",
        period: "Jan 2026 — Feb 2026",
      },
    ],
    projects: [
      {
        ...baseProjects[0],
        desc: "Prototipe agen AI otonom dari program Hacktiv8 × IBM untuk audit kepatuhan operasional dan orkestrasi workspace menggunakan Langflow, IBM watsonx, dan Astra DB.",
        highlights: [
          "Orkestrasi alur kerja LLM multi-tahap dengan Langflow",
          "Penyimpanan konteks & pencarian dokumen semantik berbasis vektor di Astra DB",
        ],
      },
      {
        ...baseProjects[1],
        desc: "Asisten robotika meja dengan mekanisme pan-tilt 2-axis dan layar OLED yang melacak wajah secara real-time melalui visi komputer.",
        highlights: [
          "Deteksi koordinat wajah real-time dengan Python, OpenCV & MediaPipe",
          "Komunikasi serial ke ESP32 untuk aktuasi servo 2-axis & tampilan OLED",
        ],
      },
      {
        ...baseProjects[2],
        desc: "Aplikasi web interaktif untuk memvisualisasikan operasi vektor dan pemetaan permukaan tiga dimensi secara real-time di browser.",
        highlights: [
          "Ruang Kartesius 3D interaktif yang dirender dengan Three.js & React",
          "Kontrol parameter langsung untuk transformasi dan proyeksi vektor",
        ],
      },
      {
        ...baseProjects[3],
        desc: "Prototipe antarmuka aplikasi pemantauan konsumsi energi pintar berbasis metode User-Centered Design (UCD).",
        highlights: [
          "Analisis kebutuhan pengguna dan arsitektur informasi berbasis UCD",
          "Sistem komponen desain dan prototipe interaktif high-fidelity di Figma",
        ],
      },
      {
        ...baseProjects[4],
        desc: "Alur kerja otomatisasi pencatatan pengeluaran pribadi yang menghubungkan pesan bot Telegram ke spreadsheet terstruktur melalui n8n.",
        highlights: [
          "Parsing webhook Telegram berbasis event dan kategorisasi pengeluaran di n8n",
          "Pencatatan otomatis dan laporan ringkas ke spreadsheet",
        ],
      },
      {
        ...baseProjects[5],
        desc: "Proyek riset AI untuk memprediksi performa akademik mahasiswa menggunakan indikator perilaku dan akademik terstruktur.",
        highlights: [
          "Analisis fitur dan pipeline prapemrosesan data dengan Python",
          "Evaluasi model klasifikasi/regresi prediktif untuk dukungan akademik dini",
        ],
      },
    ],
  },
};

