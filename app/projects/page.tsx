const projects = [
  {
    title: "ChiefOfStaff AI",
    desc: "Prototipe agen AI otonom untuk audit kepatuhan operasional dan integrasi workspace menggunakan Langflow, IBM watsonx, dan Astra DB.",
    tech: ["Langflow", "Astra DB", "Generative AI"],
  },
  {
    title: "Desktop Face-Tracking Robot",
    desc: "Asisten robot meja dengan mekanisme pan-tilt 2-axis dan layar OLED yang melacak wajah secara real-time melalui visi komputer.",
    tech: ["ESP32", "Python", "OpenCV", "MediaPipe"],
  },
  {
    title: "3D Math Vector Visualizer",
    desc: "Aplikasi web interaktif untuk memvisualisasikan operasi vektor dan pemetaan permukaan tiga dimensi secara real-time di browser.",
    tech: ["Three.js", "React", "Tailwind CSS"],
  },
  {
    title: "Smart Energy Monitoring UI/UX",
    desc: "Perancangan prototipe antarmuka aplikasi pemantauan konsumsi energi pintar berbasis metode User-Centered Design (UCD).",
    tech: ["UI/UX Design", "Figma", "UCD"],
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-8 py-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-zinc-400">
          Beberapa proyek perangkat lunak, perangkat keras, dan riset antarmuka yang pernah saya kerjakan.
        </p>
      </div>

      <div className="grid gap-4">
        {projects.map((item) => (
          <div
            key={item.title}
            className="p-5 rounded-lg border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition space-y-3"
          >
            <h2 className="text-lg font-semibold text-zinc-100">{item.title}</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {item.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}