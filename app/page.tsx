import Link from "next/link";

const skills = [
  "Next.js", "React", "TypeScript", "Tailwind CSS",
  "Python", "ESP32 / IoT", "UI/UX Design", "Git"
];

export default function Home() {
  return (
    <div className="space-y-12 py-6">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Halo, saya Yohannes Marcel Lalopua 👋
        </h1>
        <p className="text-zinc-400 leading-relaxed">
          Mahasiswa Teknik Informatika yang berfokus pada pengembangan web modern, 
          desain antarmuka (UI/UX), serta eksplorasi sistem cerdas berbasis mikrokontroler dan AI.
        </p>
        <div className="pt-2">
          <Link
            href="/projects"
            className="inline-block bg-zinc-100 text-zinc-900 font-medium px-4 py-2 rounded-md text-sm hover:bg-zinc-300 transition"
          >
            Lihat Proyek Saya →
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Skills & Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-zinc-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}