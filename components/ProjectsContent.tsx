"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ProjectCatalog from "@/components/ProjectCatalog";
import ScenePrompt from "@/components/home/ScenePrompt";
import { profile } from "@/data/portfolio";

export default function ProjectsContent() {
  const { t } = useLanguage();

  return (
    <div className="space-y-10 py-4">
      {/* 01 // HEADER */}
      <section>
        <ScenePrompt
          index="01"
          command="ls ./projects --suite"
          subtitle={t.projectsPage.catalogLabel}
          badge={`${t.projects.length} ${t.projectsPage.modulesIndexed}`}
        />

        <div className="soft-card rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="space-y-2.5">
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              {t.projectsPage.title}
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              {t.projectsPage.subtitle}
            </p>
          </div>

          {/* Quote 2 — Suffer in creation, endure in memory (No attribution) */}
          <blockquote className="rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)]/75 px-4 py-3 font-mono text-xs sm:text-[13px] leading-relaxed text-[var(--text-secondary)]">
            <span className="mr-2 text-[var(--accent-text)]" aria-hidden="true">
              ✦
            </span>
            <span className="italic text-[var(--text-primary)]">
              {`“${t.quotes.sufferCreation}”`}
            </span>
          </blockquote>
        </div>
      </section>

      {/* 02 // FILTERABLE PROJECT CARDS */}
      <Suspense
        fallback={
          <div className="soft-card rounded-2xl p-8 font-mono text-xs text-[var(--text-muted)]">
            cat ./projects/*.spec // indexing...
          </div>
        }
      >
        <ProjectCatalog />
      </Suspense>

      {/* 03 // BOTTOM NAVIGATION BAR */}
      <section className="soft-card rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
        >
          <span className="font-mono">←</span>
          <span>{t.projectsPage.backHome}</span>
        </Link>

        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-3 py-1.5 text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition"
          >
            GitHub @MRMARCABLE ↗
          </a>
          <a
            href={profile.gitEngUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-3 py-1.5 text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition"
          >
            Git-Eng UKWMS ↗
          </a>
        </div>
      </section>
    </div>
  );
}
