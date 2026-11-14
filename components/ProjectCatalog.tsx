"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import ScenePrompt from "@/components/home/ScenePrompt";
import type { ProjectCategory } from "@/data/portfolio";

const categories: Array<"All" | ProjectCategory> = [
  "All",
  "AI & Automation",
  "Embedded & Vision",
  "3D Web",
  "UI/UX",
];

function isValidCategory(value: string | null): value is ProjectCategory {
  return (
    value !== null &&
    (categories as string[]).includes(value) &&
    value !== "All"
  );
}

export default function ProjectCatalog() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawCategory = searchParams.get("category");
  const selectedCategory: "All" | ProjectCategory = isValidCategory(rawCategory)
    ? rawCategory
    : "All";
  const selectedTech = searchParams.get("tech")?.trim() || null;

  const setFilter = (nextCategory: "All" | ProjectCategory) => {
    const params = new URLSearchParams();
    if (nextCategory !== "All") {
      params.set("category", nextCategory);
    }
    const qs = params.toString();
    router.replace(qs ? `/projects?${qs}` : "/projects", { scroll: false });
  };

  const clearTechFilter = () => {
    const params = new URLSearchParams();
    if (selectedCategory !== "All") {
      params.set("category", selectedCategory);
    }
    const qs = params.toString();
    router.replace(qs ? `/projects?${qs}` : "/projects", { scroll: false });
  };

  const filteredProjects = t.projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    if (!matchesCategory) return false;
    if (!selectedTech) return true;
    const needle = selectedTech.toLowerCase();
    return (
      project.tech.some((item) => item.toLowerCase().includes(needle)) ||
      project.title.toLowerCase().includes(needle) ||
      project.desc.toLowerCase().includes(needle)
    );
  });

  return (
    <section className="space-y-5">
      <ScenePrompt
        index="02"
        command="cat ./projects/*.spec"
        subtitle={t.projectsPage.featuredHeading}
        rightSlot={
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
                  onClick={() => setFilter(category)}
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
        }
      />

      {selectedTech ? (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[var(--accent-border)] bg-[var(--accent-bg)] px-4 py-2.5 font-mono text-xs text-[var(--accent-text)]">
          <span>{`FILTER // TECH = "${selectedTech}" (${filteredProjects.length})`}</span>
          <button
            type="button"
            onClick={clearTechFilter}
            className="rounded border border-[var(--accent-border)] bg-[var(--bg-surface)] px-2 py-0.5 text-[11px] hover:border-[var(--border-hover)] transition cursor-pointer"
          >
            {`${t.sceneUi.clearFilter} ✕`}
          </button>
        </div>
      ) : null}

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
