"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import type { ProjectCategory } from "@/data/portfolio";

const categories: Array<"All" | ProjectCategory> = [
  "All",
  "AI & Automation",
  "Embedded & Vision",
  "3D Web",
  "UI/UX",
];

export default function ProjectCatalog() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | ProjectCategory
  >("All");

  const filteredProjects =
    selectedCategory === "All"
      ? t.projects
      : t.projects.filter((p) => p.category === selectedCategory);

  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-soft)] pb-3">
        <h2 className="font-mono text-xs tracking-wider text-[var(--text-secondary)] uppercase">
          {t.projectsPage.featuredHeading}
        </h2>

        <div
          className="flex flex-wrap items-center gap-1.5"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {categories.map((category) => {
            const active = selectedCategory === category;
            const label =
              category === "All"
                ? t.projectsPage.allCategory
                : t.categoryLabels[category];

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-md px-2.5 py-1 font-mono text-[11px] transition cursor-pointer border ${
                  active
                    ? "bg-[var(--accent-bg)] text-[var(--accent-text)] border-[var(--accent-border)]"
                    : "text-[var(--text-secondary)] border-[var(--border-soft)] bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {filteredProjects.map((item) => (
          <article
            key={item.id}
            className="soft-card soft-card-interactive group rounded-2xl p-6 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Top Metadata Bar */}
              <div className="flex items-center justify-between gap-2 border-b border-[var(--border-soft)] pb-3">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-[var(--text-muted)]">{item.id}</span>
                  <span className="text-[var(--border-hover)]">/</span>
                  <span className="text-[var(--text-secondary)]">
                    {item.code}
                  </span>
                </div>
                <span
                  className={`rounded border px-2 py-0.5 font-mono text-[10px] ${item.accent}`}
                >
                  {item.status}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)] transition">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Technical Highlights */}
              <ul className="space-y-1.5 pt-1">
                {item.highlights.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-xs text-[var(--text-secondary)]"
                  >
                    <span className="font-mono text-[var(--accent-text)] mt-0.5">
                      ›
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer: Tech Stack & Link */}
            <div className="pt-4 border-t border-[var(--border-soft)] space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {item.tech.map((techName) => (
                  <span
                    key={techName}
                    className="font-mono text-[11px] px-2.5 py-0.5 rounded border border-[var(--border-soft)] bg-[var(--bg-elevated)] text-[var(--text-secondary)]"
                  >
                    {techName}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="font-mono text-[11px] text-[var(--text-muted)]">
                  {`${t.categoryLabels[item.category].toUpperCase()} // ${item.year}`}
                </span>
                <a
                  href={item.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--accent-text)] transition"
                >
                  <span>{t.projectsPage.exploreSource}</span>
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
