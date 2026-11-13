import type { Metadata } from "next";
import Link from "next/link";
import ProjectCatalog from "@/components/ProjectCatalog";
import { profile, projects } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering & Creative Suite — Autonomous AI Agents, n8n Automation, ESP32 Computer Vision Robotics, 3D WebGL, and UI/UX Design.",
};

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
            A curated collection of software applications, autonomous AI
            workflows, embedded IoT robotics, 3D browser visualizations, and
            user-centered UI/UX systems.
          </p>
        </div>
      </section>

      {/* 02 // FILTERABLE PROJECT CARDS */}
      <ProjectCatalog projects={projects} />

      {/* 03 // BOTTOM NAVIGATION BAR */}
      <section className="rounded-xl border border-zinc-800/80 bg-zinc-900/20 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition"
        >
          <span className="font-mono">←</span>
          <span>Back to Overview & Profile</span>
        </Link>

        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-zinc-300 hover:border-zinc-700 hover:text-white transition"
          >
            GitHub @MRMARCABLE ↗
          </a>
          <a
            href={profile.gitEngUrl}
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
