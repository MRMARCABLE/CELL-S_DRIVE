"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ScenePrompt from "@/components/home/ScenePrompt";
import { profile } from "@/data/portfolio";

interface CommitNode {
  uid: string;
  hash: string;
  branch: string;
  lane: "edu" | "exp";
  badge: string;
  title: string;
  organization: string;
  period: string;
  summary: string;
  skills: string[];
  isHead?: boolean;
}

export default function JourneyScene() {
  const { t, locale } = useLanguage();
  const [laneFilter, setLaneFilter] = useState<"all" | "exp" | "edu">("all");
  const [selectedHash, setSelectedHash] = useState<string>("f580302");

  const commits = useMemo<CommitNode[]>(() => {
    const eduNodes: CommitNode[] = t.education.map((edu, idx) => ({
      uid: `edu-${edu.id}`,
      hash: edu.hash,
      branch: edu.branch,
      lane: "edu",
      badge: locale === "id" ? "PENDIDIKAN" : "EDUCATION",
      title: edu.degree,
      organization: edu.institution,
      period: edu.period,
      summary: edu.note,
      skills: edu.skills,
      isHead: idx === 0,
    }));

    const expNodes: CommitNode[] = t.experiences.map((exp) => ({
      uid: `exp-${exp.id}`,
      hash: exp.hash,
      branch: exp.branch,
      lane: "exp",
      badge: exp.type,
      title: exp.role,
      organization: exp.organization,
      period: exp.period,
      summary: exp.summary,
      skills: exp.skills,
    }));

    // Ordered from newest milestone (UKWMS 2025-Present, SMK 2021-2024, Fiesto Mar 2023, HIPPAST Feb 2023, CLS Dec 2022)
    return [
      eduNodes[0],
      eduNodes[1],
      expNodes[0],
      expNodes[1],
      expNodes[2],
    ].filter(Boolean);
  }, [locale, t.education, t.experiences]);

  const visibleCommits = useMemo(() => {
    if (laneFilter === "all") return commits;
    return commits.filter((c) => c.lane === laneFilter);
  }, [commits, laneFilter]);

  const activeCommit = useMemo(() => {
    return (
      visibleCommits.find((c) => c.hash === selectedHash) ??
      visibleCommits[0] ??
      commits[0]
    );
  }, [commits, selectedHash, visibleCommits]);

  const activeIndex = visibleCommits.findIndex(
    (c) => c.hash === activeCommit?.hash
  );

  const stepCommit = (delta: number) => {
    if (visibleCommits.length === 0) return;
    const nextIndex =
      (activeIndex + delta + visibleCommits.length) % visibleCommits.length;
    setSelectedHash(visibleCommits[nextIndex].hash);
  };

  return (
    <section id="scene-03" data-scene-index="03" className="scene-stage">
      <ScenePrompt
        index="03"
        command="git log --graph --all"
        subtitle={t.sections.expHeading}
        badge={t.sections.expBadge}
        rightSlot={
          <div className="flex items-center gap-1 rounded-lg border border-[var(--border-soft)] bg-[var(--bg-elevated)] p-0.5 font-mono text-[11px]">
            {(["all", "exp", "edu"] as const).map((filterKey) => {
              const active = laneFilter === filterKey;
              const label =
                filterKey === "all"
                  ? "ALL"
                  : filterKey === "exp"
                    ? "EXP"
                    : "EDU";
              return (
                <button
                  key={filterKey}
                  type="button"
                  onClick={() => setLaneFilter(filterKey)}
                  className={`rounded-md px-2 py-0.5 transition ${
                    active
                      ? "bg-[var(--accent-bg)] text-[var(--accent-text)] border border-[var(--accent-border)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Left Column: Interactive Git Commit Graph */}
        <div className="lg:col-span-7 space-y-2.5">
          {visibleCommits.map((node, index) => {
            const isSelected = activeCommit?.hash === node.hash;
            const isEdu = node.lane === "edu";
            const isLast = index === visibleCommits.length - 1;

            return (
              <div
                key={node.uid}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onClick={() => setSelectedHash(node.hash)}
                onMouseEnter={() => setSelectedHash(node.hash)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedHash(node.hash);
                  }
                }}
                className={`group relative flex items-stretch gap-3.5 sm:gap-4 rounded-2xl border p-4 sm:p-5 cursor-pointer transition-all focus:outline-none ${
                  isSelected
                    ? "border-[var(--accent-border)] bg-[var(--bg-surface)] shadow-md"
                    : "border-[var(--border-soft)] bg-[var(--bg-surface)]/70 hover:border-[var(--border-hover)]"
                }`}
              >
                {/* Dual-Lane Git Graph Rail */}
                <div
                  aria-hidden="true"
                  className="relative flex w-9 shrink-0 flex-col items-center select-none font-mono text-xs"
                >
                  {/* Top vertical connector */}
                  {index > 0 ? (
                    <span className="h-3 w-px bg-[var(--border-hover)]" />
                  ) : (
                    <span className="h-3" />
                  )}

                  {/* Commit Node Circle */}
                  <span
                    className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-bold transition-transform ${
                      isSelected ? "scale-110" : "group-hover:scale-105"
                    } ${
                      isEdu
                        ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                        : "border-sky-500/60 bg-sky-500/15 text-sky-700 dark:text-sky-300"
                    }`}
                  >
                    {isEdu ? "◆" : "●"}
                  </span>

                  {/* Bottom vertical connector */}
                  {!isLast ? (
                    <span className="flex-1 w-px bg-[var(--border-soft)] group-hover:bg-[var(--border-hover)] my-1" />
                  ) : null}
                </div>

                {/* Commit Summary Body */}
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="rounded bg-[var(--bg-elevated)] px-1.5 py-0.5 font-semibold text-[var(--accent-text)] border border-[var(--border-soft)]">
                        {node.hash}
                      </span>
                      {node.isHead ? (
                        <span className="rounded border border-[var(--accent-border)] bg-[var(--accent-bg)] px-1.5 py-0.5 text-[10px] text-[var(--accent-text)]">
                          HEAD → main
                        </span>
                      ) : null}
                      <span className="rounded border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-1.5 py-0.5 text-[10px] text-[var(--text-secondary)]">
                        {node.branch}
                      </span>
                    </div>

                    <span className="text-[var(--text-muted)]">
                      {node.period}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-[var(--text-primary)] leading-snug">
                      {node.title}
                    </h3>
                    <p className="font-mono text-xs text-[var(--text-secondary)] mt-0.5">
                      {node.organization}
                    </p>
                  </div>

                  <p className="line-clamp-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                    {node.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Live `git show <hash>` Commit Inspector */}
        {activeCommit ? (
          <div className="lg:col-span-5 lg:sticky lg:top-24 soft-card rounded-2xl overflow-hidden border border-[var(--border-soft)]">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-soft)] bg-[var(--bg-elevated)] px-4 py-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-1 text-[var(--text-secondary)]">
                  {`git show ${activeCommit.hash}`}
                </span>
              </div>
              <span className="text-[10px] text-[var(--text-muted)]">
                {`${activeIndex + 1}/${visibleCommits.length}`}
              </span>
            </div>

            {/* Commit Metadata & Diff Body */}
            <div className="p-5 space-y-4 font-mono text-xs">
              <div className="space-y-1 border-b border-[var(--border-soft)] pb-3 text-[11px]">
                <div className="text-amber-700 dark:text-amber-300 font-semibold">
                  {`commit ${activeCommit.hash}84b9e201f5803025050`}
                </div>
                <div className="text-[var(--text-secondary)]">
                  {`Author: ${profile.name} <${profile.email}>`}
                </div>
                <div className="text-[var(--text-muted)]">
                  {`Date:   ${activeCommit.period}`}
                </div>
                <div className="text-[var(--accent-text)]">
                  {`Branch: ${activeCommit.branch} [${activeCommit.badge}]`}
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-sans text-base font-bold text-[var(--text-primary)]">
                  {activeCommit.title}
                </div>
                <div className="text-[var(--text-secondary)]">
                  {`@ ${activeCommit.organization}`}
                </div>
              </div>

              {/* Diff block */}
              <div className="rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)]/80 p-3.5 space-y-2 leading-relaxed">
                <div className="text-[10px] text-[var(--text-muted)]">
                  @@ -0,0 +1,4 @@ // SUMMARY_NOTES
                </div>
                <p className="font-sans text-xs text-[var(--text-primary)] leading-relaxed">
                  <span className="font-mono text-[var(--accent-text)] mr-1.5">
                    +
                  </span>
                  {activeCommit.summary}
                </p>
              </div>

              {/* Skills / Modules */}
              <div className="space-y-2 pt-1">
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                  LINKED MODULES & SKILLS
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeCommit.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-[var(--accent-border)] bg-[var(--accent-bg)] px-2 py-0.5 text-[11px] text-[var(--accent-text)]"
                    >
                      {`+ ${skill}`}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prev / Next Commit Step Controls */}
              <div className="flex items-center justify-between border-t border-[var(--border-soft)] pt-3 text-[11px]">
                <button
                  type="button"
                  onClick={() => stepCommit(-1)}
                  className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-1 text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition"
                >
                  ← prev commit
                </button>
                <span className="text-[10px] text-[var(--text-muted)]">
                  {t.sceneUi.inspectCommit}
                </span>
                <button
                  type="button"
                  onClick={() => stepCommit(1)}
                  className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-1 text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition"
                >
                  next commit →
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

