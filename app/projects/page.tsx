import Link from "next/link";

const projects = [
  {
    id: "01",
    code: "CRAFT.AI // AUTONOMOUS AGENT",
    status: "PROTOTYPE",
    accent: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    borderHover: "hover:border-emerald-500/40",
    title: "ChiefOfStaff AI",
    desc: "Prototipe agen AI otonom untuk audit kepatuhan operasional dan integrasi workspace menggunakan Langflow, IBM watsonx, dan Astra DB.",
    highlights: [
      "Orkestrasi alur kerja LLM multi-step menggunakan Langflow",
      "Penyimpanan konteks & pencarian dokumen berbasis vektor di Astra DB",
    ],
    tech: ["Langflow", "IBM watsonx", "Astra DB", "Generative AI"],
    repoUrl: "https://github.com/MRMARCABLE",
  },
  {
    id: "02",
    code: "CRAFT.BOT // HARDWARE & VISION",
    status: "HARDWARE BUILD",
    accent: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    borderHover: "hover:border-amber-500/40",
    title: "Desktop Face-Tracking Robot",
    desc: "Asisten robot meja dengan mekanisme pan-tilt 2-axis dan layar OLED yang melacak wajah secara real-time melalui visi komputer.",
    highlights: [
      "Deteksi koordinat wajah real-time dengan Python, OpenCV & MediaPipe",
      "Komunikasi serial ke mikrokontroler ESP32 untuk aktuasi servo 2-axis & layar OLED",
    ],
    tech: ["ESP32", "Python", "OpenCV", "MediaPipe"],
    repoUrl: "https://github.com/MRMARCABLE",
  },
  {
    id: "03",
    code: "CRAFT.3D // WEBGL ENGINE",
    status: "WEB APP",
    accent: "text-violet-400 border-violet-500/30 bg-violet-500/10",
    borderHover: "hover:border-violet-500/40",
    title: "3D Math Vector Visualizer",
    desc: "Aplikasi web interaktif untuk memvisualisasikan operasi vektor dan pemetaan permukaan tiga dimensi secara real-time di browser.",
    highlights: [
      "Visualisasi ruang Kartesius 3D interaktif menggunakan Three.js & React",
      "Simulasi operasi vektor dan perubahan parameter secara langsung",
    ],
    tech: ["Three.js", "React", "TypeScript", "Tailwind CSS"],
    repoUrl: "https://github.com/MRMARCABLE",
  },
  {
    id: "04",
    code: "CRAFT.UX // DESIGN SYSTEM",
    status: "UCD RESEARCH",
    accent: "text-sky-400 border-sky-500/30 bg-sky-500/10",
    borderHover: "hover:border-sky-500/40",
    title: "Smart Energy Monitoring UI/UX",
    desc: "Perancangan prototipe antarmuka aplikasi pemantauan konsumsi energi pintar berbasis metode User-Centered Design (UCD).",
    highlights: [
      "Analisis kebutuhan pengguna & arsitektur informasi berbasis UCD",
      "Desain komponen antarmuka dan high-fidelity prototype di Figma",
    ],
    tech: ["UI/UX Design", "Figma", "UCD", "Prototyping"],
    repoUrl: "https://github.com/MRMARCABLE",
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-12 py-4">
      {/* 01 // HEADER */}
      <section className="rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 font-mono text-xs text-zinc-500">
          <span>01 // PROJECT SUITE CATALOG</span>
          <span className="text-emerald-400">
            {projects.length} MODULES INDEXED
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-100">
            Engineering & Creative Suite
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
            Kumpulan proyek perangkat lunak, sistem cerdas berbasis perangkat keras
            (IoT/Robotika), visualisasi 3D, dan riset antarmuka yang pernah saya
            rancang dan kembangkan.
          </p>
        </div>
      </section>

      {/* 02 // PROJECT CARDS */}
      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <h2 className="font-mono text-xs tracking-wider text-zinc-400 uppercase">
            02 // Featured Modules & Specifications
          </h2>
          <span className="font-mono text-xs text-zinc-600">
            INDEX 01 — 04
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((item) => (
            <article
              key={item.id}
              className={`group rounded-xl border border-zinc-800/90 bg-zinc-900/30 p-6 transition flex flex-col justify-between space-y-6 hover:bg-zinc-900/60 ${item.borderHover}`}
            >
              <div className="space-y-4">
                {/* Top Metadata Bar */}
                <div className="flex items-center justify-between gap-2 border-b border-zinc-800/70 pb-3">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-zinc-500">{item.id}</span>
                    <span className="text-zinc-700">/</span>
                    <span className="text-zinc-400">{item.code}</span>
                  </div>
                  <span
                    className={`rounded border px-2 py-0.5 font-mono text-[10px] ${item.accent}`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold tracking-tight text-zinc-100 group-hover:text-white transition">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Technical Highlights */}
                <ul className="space-y-1.5 pt-1">
                  {item.highlights.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-xs text-zinc-400"
                    >
                      <span className="font-mono text-emerald-400 mt-0.5">
                        ›
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer: Tech Stack & Link */}
              <div className="pt-4 border-t border-zinc-800/70 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] px-2.5 py-0.5 rounded border border-zinc-800 bg-zinc-950/80 text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-[11px] text-zinc-500">
                    MODULE // {item.id}
                  </span>
                  <a
                    href={item.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-zinc-300 hover:text-emerald-400 transition"
                  >
                    <span>Explore Source</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 03 // BOTTOM NAVIGATION BAR */}
      <section className="rounded-xl border border-zinc-800/80 bg-zinc-900/20 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition"
        >
          <span className="font-mono">←</span>
          <span>Kembali ke Overview & Profil</span>
        </Link>

        <div className="flex items-center gap-3 font-mono text-xs">
          <a
            href="https://github.com/MRMARCABLE"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-zinc-300 hover:border-zinc-700 hover:text-white transition"
          >
            GitHub @MRMARCABLE ↗
          </a>
          <a
            href="https://git-eng.ukwms.ac.id/5803025050"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-zinc-300 hover:border-zinc-700 hover:text-white transition"
          >
            Git-Eng UKWMS ↗
          </a>
        </div>
      </section>
    </div>
  );
}