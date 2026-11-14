"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import ScenePrompt from "@/components/home/ScenePrompt";
import { playSfx } from "@/components/shell/sound";
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
  const [inspectedId, setInspectedId] = useState<string | null>(null);

  const rawCategory = searchParams.get("category");
  const selectedCategory: "All" | ProjectCategory = isValidCategory(rawCategory)
    ? rawCategory
    : "All";
  const selectedTech = searchParams.get("tech")?.trim() || null;
  const specParam = searchParams.get("spec")?.trim() || null;

  const activeInspectedId = inspectedId ?? specParam;

  const clearSpecParam = () => {
    setInspectedId(null);
    if (!specParam) return;
    const params = new URLSearchParams(searchParams.toString());
    params.delete("spec");
    const qs = params.toString();
    router.replace(qs ? `/projects?${qs}` : "/projects", { scroll: false });
  };

  const setFilter = (nextCategory: "All" | ProjectCategory) => {
    const params = new URLSearchParams();
    if (nextCategory !== "All") {
      params.set("category", nextCategory);
    }
    const qs = params.toString();
    router.replace(qs ? `/projects?${qs}` : "/projects", { scroll: false });
  };

  const setTechFilter = (techNeedle: string) => {
    const params = new URLSearchParams();
    if (selectedCategory !== "All") {
      params.set("category", selectedCategory);
    }
    params.set("tech", techNeedle);
    router.replace(`/projects?${params.toString()}`, { scroll: false });
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

  const inspectedIndex = activeInspectedId
    ? filteredProjects.findIndex((p) => p.id === activeInspectedId)
    : -1;
  const inspectedProject =
    inspectedIndex >= 0
      ? filteredProjects[inspectedIndex]
      : t.projects.find((p) => p.id === activeInspectedId) ?? null;

  useEffect(() => {
    if (!activeInspectedId) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setInspectedId(null);
        if (specParam) {
          const params = new URLSearchParams(searchParams.toString());
          params.delete("spec");
          const qs = params.toString();
          router.replace(qs ? `/projects?${qs}` : "/projects", {
            scroll: false,
          });
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeInspectedId, router, searchParams, specParam]);

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
                  <button
                    key={techName}
                    type="button"
                    onClick={() => setTechFilter(techName)}
                    className="font-mono text-[11px] px-2.5 py-0.5 rounded border border-[var(--border-soft)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--accent-border)] hover:text-[var(--accent-text)] transition cursor-pointer"
                  >
                    {techName}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="font-mono text-[11px] text-[var(--text-muted)]">
                  {`${t.categoryLabels[item.category].toUpperCase()} // ${item.year}`}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      playSfx("open");
                      setInspectedId(item.id);
                    }}
                    data-cursor="inspect"
                    className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)] hover:border-[var(--accent-border)] hover:text-[var(--accent-text)] transition cursor-pointer"
                  >
                    {t.sceneUi.inspectSpec}
                  </button>
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
            </div>
          </article>
        ))}
      </div>

      {/* Expandable Project Spec Inspector Modal */}
      {inspectedProject ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={clearSpecParam}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-spec-title"
            className="soft-card w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-[var(--accent-border)] bg-[var(--bg-surface)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[var(--border-soft)] bg-[var(--bg-elevated)] px-5 py-3.5 font-mono text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[var(--accent-text)] font-semibold">
                  SPEC // {inspectedProject.id}
                </span>
                <span className="text-[var(--border-hover)]">/</span>
                <span className="truncate text-[var(--text-secondary)]">
                  {inspectedProject.code}
                </span>
              </div>
              <button
                type="button"
                onClick={clearSpecParam}
                className="shrink-0 rounded-md border border-[var(--border-soft)] bg-[var(--bg-surface)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)] hover:border-[var(--accent-border)] hover:text-[var(--text-primary)] transition cursor-pointer"
              >
                {t.sceneUi.closeSpec} [ESC]
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                  {t.categoryLabels[inspectedProject.category]} · {inspectedProject.year}
                </span>
                <span
                  className={`rounded border px-2 py-0.5 font-mono text-[10px] ${inspectedProject.accent}`}
                >
                  {inspectedProject.status}
                </span>
              </div>

              <div className="space-y-2.5">
                <h2
                  id="project-spec-title"
                  className="text-2xl font-bold tracking-tight text-[var(--text-primary)]"
                >
                  {inspectedProject.title}
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {inspectedProject.desc}
                </p>
              </div>

              {/* System Architecture Pipeline Diagram */}
              <div className="space-y-2.5 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)]/80 p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-text)]">
                  {t.sceneUi.systemPipelineLabel}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                  {inspectedProject.architecture.map((stage, idx) => (
                    <div
                      key={stage}
                      className="relative flex items-center justify-between sm:flex-col sm:items-start gap-1.5 rounded-lg border border-[var(--border-soft)] bg-[var(--bg-surface)] px-3 py-2.5 font-mono"
                    >
                      <div className="flex w-full items-center justify-between text-[10px] text-[var(--text-muted)]">
                        <span>{`STAGE_0${idx + 1}`}</span>
                        {idx < inspectedProject.architecture.length - 1 ? (
                          <span className="text-[var(--accent-text)]">→</span>
                        ) : (
                          <span className="text-[var(--accent-text)]">✦</span>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-[var(--text-primary)] leading-snug">
                        {stage}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)]/65 p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  ARCHITECTURE &amp; HIGHLIGHTS
                </div>
                <ul className="space-y-2">
                  {inspectedProject.highlights.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed"
                    >
                      <span className="font-mono text-[var(--accent-text)] mt-0.5">
                        ▸
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  MODULES &amp; DEPENDENCIES
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {inspectedProject.tech.map((techName) => (
                    <button
                      key={techName}
                      type="button"
                      onClick={() => {
                        setTechFilter(techName);
                        setInspectedId(null);
                      }}
                      className="font-mono text-xs px-2.5 py-1 rounded border border-[var(--border-soft)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--accent-border)] hover:text-[var(--accent-text)] transition cursor-pointer"
                    >
                      {techName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-soft)] pt-4">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <button
                    type="button"
                    disabled={filteredProjects.length <= 1}
                    onClick={() => {
                      const prevIdx =
                        (inspectedIndex - 1 + filteredProjects.length) %
                        filteredProjects.length;
                      setInspectedId(filteredProjects[prevIdx]?.id ?? null);
                    }}
                    className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-1 text-[var(--text-secondary)] hover:border-[var(--accent-border)] hover:text-[var(--text-primary)] disabled:opacity-40 transition cursor-pointer"
                  >
                    ← PREV
                  </button>
                  <button
                    type="button"
                    disabled={filteredProjects.length <= 1}
                    onClick={() => {
                      const nextIdx =
                        (inspectedIndex + 1) % filteredProjects.length;
                      setInspectedId(filteredProjects[nextIdx]?.id ?? null);
                    }}
                    className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-1 text-[var(--text-secondary)] hover:border-[var(--accent-border)] hover:text-[var(--text-primary)] disabled:opacity-40 transition cursor-pointer"
                  >
                    NEXT →
                  </button>
                </div>

                <a
                  href={inspectedProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--accent-border)] bg-[var(--accent-bg)] px-4 py-2 font-mono text-xs font-semibold text-[var(--accent-text)] hover:border-[var(--border-hover)] transition"
                >
                  <span>{t.projectsPage.exploreSource}</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
