"use client";

import { useState } from "react";
import type { ProjectCategory, ProjectItem } from "@/data/portfolio";

const categories: Array<"All" | ProjectCategory> = [
  "All",
  "AI & Automation",
  "Embedded & Vision",
  "3D Web",
  "UI/UX",
];

export default function ProjectCatalog({
  projects,
}: {
  projects: ProjectItem[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | ProjectCategory
  >("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
        <h2 className="font-mono text-xs tracking-wider text-zinc-400 uppercase">
          02 // Featured Modules & Specifications
        </h2>

        <div
          className="flex flex-wrap items-center gap-1.5"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {categories.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-md px-2.5 py-1 font-mono text-[11px] transition cursor-pointer ${
                  active
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40"
                    : "text-zinc-400 border border-zinc-800 bg-zinc-900/40 hover:text-zinc-200 hover:border-zinc-700"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {filteredProjects.map((item) => (
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
                    <span className="font-mono text-emerald-400 mt-0.5">›</span>
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
                  {`${item.category.toUpperCase()} // ${item.year}`}
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
  );
}

