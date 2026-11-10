import Image from "next/image";
import Link from "next/link";

const focusDomains = [
  {
    id: "01",
    code: "AI.AGENT",
    title: "Autonomous AI & Workspace Orchestration",
    desc: "Eksplorasi agen AI otonom untuk audit operasional dan integrasi alur kerja cerdas menggunakan Langflow, IBM watsonx, dan Astra DB.",
    accent: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  },
  {
    id: "02",
    code: "SYS.EMBED",
    title: "Embedded Systems & Computer Vision",
    desc: "Pengembangan sistem robotika meja berbasis ESP32 dengan mekanisme pan-tilt 2-axis dan pelacakan wajah real-time menggunakan Python, OpenCV, & MediaPipe.",
    accent: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
  {
    id: "03",
    code: "WEB.3D_UX",
    title: "Interactive 3D Web & UI/UX Engineering",
    desc: "Perancangan antarmuka berbasis User-Centered Design (UCD) di Figma serta visualisasi matematis 3D interaktif di browser menggunakan React, Next.js, dan Three.js.",
    accent: "text-sky-400 border-sky-500/30 bg-sky-500/10",
  },
];

const techCategories = [
  {
    category: "Web & Frontend Architecture",
    items: ["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS", "Three.js"],
  },
  {
    category: "AI, Vision & Programming",
    items: ["Python", "Langflow", "Astra DB", "OpenCV", "MediaPipe"],
  },
  {
    category: "Hardware, Design & Tooling",
    items: ["ESP32 / IoT", "UI/UX Design (UCD)", "Figma", "Git & GitLab"],
  },
];

export default function Home() {
  return (
    <div className="space-y-16 py-4">
      {/* 01 // PROFILE & HERO */}
      <section className="relative rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-6 sm:p-8">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 mb-6 font-mono text-xs text-zinc-500">
          <span>01 // DEVELOPER PROFILE</span>
          <span className="text-emerald-400">STATUS: ACTIVE STUDENT</span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative shrink-0 rounded-xl border border-zinc-700/80 bg-zinc-900 p-1.5 shadow-lg">
            <Image
              src="https://github.com/MRMARCABLE.png"
              alt="Foto Profil Yohannes Marcel Lalopua"
              width={96}
              height={96}
              priority
              className="rounded-lg object-cover"
            />
            <span
              title="Available for Collaboration"
              className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-zinc-950 bg-emerald-400"
            />
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950/80 px-2.5 py-1 font-mono text-xs text-zinc-300">
              <span>Mahasiswa Teknik Informatika — UKWMS</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-100">
              Yohannes Marcel Lalopua
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
              Berfokus pada pengembangan aplikasi web modern, perancangan antarmuka{" "}
              <span className="text-zinc-200 font-medium">UI/UX berbasis UCD</span>,
              serta eksplorasi sistem cerdas yang menggabungkan{" "}
              <span className="text-zinc-200 font-medium">
                mikrokontroler (IoT/Robotika)
              </span>{" "}
              dan <span className="text-zinc-200 font-medium">Generative AI</span>.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-md bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-emerald-400 transition"
            >
              <span>Lihat Suite Proyek</span>
              <span className="font-mono">→</span>
            </Link>
            <a
              href="https://github.com/MRMARCABLE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-300 hover:border-zinc-700 hover:text-white transition"
            >
              <span>GitHub Profile</span>
              <span className="font-mono text-xs text-zinc-500">↗</span>
            </a>
          </div>

          <div className="font-mono text-xs text-zinc-500">
            NRP // 5803025050
          </div>
        </div>
      </section>

      {/* 02 // FOCUS & ENGINEERING DOMAINS */}
      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <h2 className="font-mono text-xs tracking-wider text-zinc-400 uppercase">
            02 // Engineering & Research Focus
          </h2>
          <span className="font-mono text-xs text-zinc-600">3 CORE PILLARS</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {focusDomains.map((domain) => (
            <div
              key={domain.id}
              className="group rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-5 hover:border-zinc-700 hover:bg-zinc-900/60 transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-500">
                    {domain.id}
                  </span>
                  <span
                    className={`rounded border px-2 py-0.5 font-mono text-[10px] ${domain.accent}`}
                  >
                    {domain.code}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-zinc-100 group-hover:text-white transition">
                  {domain.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {domain.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03 // TECH STACK MATRIX */}
      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <h2 className="font-mono text-xs tracking-wider text-zinc-400 uppercase">
            03 // Tech Stack & Tooling Matrix
          </h2>
          <span className="font-mono text-xs text-zinc-600">MODULAR STACK</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {techCategories.map((group) => (
            <div
              key={group.category}
              className="rounded-xl border border-zinc-800/90 bg-zinc-900/20 p-5 space-y-3"
            >
              <h3 className="font-mono text-xs text-zinc-400">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-zinc-800 bg-zinc-900/90 px-2.5 py-1 text-xs text-zinc-200 hover:border-zinc-700 transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 04 // REPOSITORIES & CONNECT */}
      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <h2 className="font-mono text-xs tracking-wider text-zinc-400 uppercase">
            04 // Repositories & Network
          </h2>
          <span className="font-mono text-xs text-zinc-600">EXTERNAL LINKS</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="https://github.com/MRMARCABLE"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-5 hover:border-zinc-700 hover:bg-zinc-900/60 transition flex items-center justify-between"
          >
            <div className="space-y-1">
              <div className="font-mono text-xs text-emerald-400">
                GITHUB // PUBLIC REPOS
              </div>
              <div className="text-base font-semibold text-zinc-100">
                github.com/MRMARCABLE
              </div>
              <p className="text-xs text-zinc-400">
                Eksplorasi kode sumber terbuka, proyek pribadi, dan eksperimen web.
              </p>
            </div>
            <span className="font-mono text-lg text-zinc-500 group-hover:text-zinc-200 group-hover:translate-x-0.5 transition">
              ↗
            </span>
          </a>

          <a
            href="https://git-eng.ukwms.ac.id/5803025050"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-5 hover:border-zinc-700 hover:bg-zinc-900/60 transition flex items-center justify-between"
          >
            <div className="space-y-1">
              <div className="font-mono text-xs text-sky-400">
                GIT-ENG // UKWMS ACADEMIC
              </div>
              <div className="text-base font-semibold text-zinc-100">
                git-eng.ukwms.ac.id/5803025050
              </div>
              <p className="text-xs text-zinc-400">
                Repositori akademik Fakultas Teknik Universitas Katolik Widya Mandala Surabaya.
              </p>
            </div>
            <span className="font-mono text-lg text-zinc-500 group-hover:text-zinc-200 group-hover:translate-x-0.5 transition">
              ↗
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}