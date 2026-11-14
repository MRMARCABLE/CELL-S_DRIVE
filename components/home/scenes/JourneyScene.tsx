"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ScenePrompt from "@/components/home/ScenePrompt";
import { useReducedMotion } from "@/components/home/fx/hooks/useReducedMotion";
import { playSfx } from "@/components/shell/sound";
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
  sortYear: number;
  isHead?: boolean;
}

export default function JourneyScene() {
  const { t, locale } = useLanguage();
  const reducedMotion = useReducedMotion();
  const [laneFilter, setLaneFilter] = useState<"all" | "exp" | "edu">("all");
  const [sortMode, setSortMode] = useState<"tracks" | "chronological">("tracks");
  const [inspectorView, setInspectorView] = useState<"summary" | "diff">(
    "summary"
  );
  const [selectedHash, setSelectedHash] = useState<string>("f580302");
  const [streamReady, setStreamReady] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setStreamReady(true);
          }
        }
      },
      { threshold: 0.14 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
      sortYear: idx === 0 ? 2025 : 2021,
      isHead: idx === 0,
    }));

    const expYearMap: Record<string, number> = {
      "01": 2023.3,
      "02": 2023.2,
      "03": 2022.9,
    };

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
      sortYear: expYearMap[exp.id] ?? 2022,
    }));

    const all = [...eduNodes, ...expNodes];
    if (sortMode === "chronological") {
      return all.sort((a, b) => b.sortYear - a.sortYear);
    }
    return [eduNodes[0], eduNodes[1], expNodes[0], expNodes[1], expNodes[2]].filter(
      Boolean
    );
  }, [locale, sortMode, t.education, t.experiences]);

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

  const isStreamReady = reducedMotion || streamReady;

  return (
    <section
      ref={sectionRef}
      id="scene-03"
      data-scene-index="03"
      className="scene-stage"
    >
      <ScenePrompt
        index="03"
        command="git log --graph --all"
        subtitle={t.sections.expHeading}
        badge={t.sections.expBadge}
        rightSlot={
          <div className="flex flex-wrap items-center gap-2">
            {/* Sort Order Switch */}
            <button
              type="button"
              onClick={() =>
                setSortMode((prev) =>
                  prev === "tracks" ? "chronological" : "tracks"
                )
              }
              className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition cursor-pointer"
            >
              {sortMode === "tracks"
                ? t.sceneUi.groupedSort
                : t.sceneUi.chronologicalSort}
            </button>

            {/* Branch Filter Pills */}
            <div className="flex items-center gap-1 rounded-lg border border-[var(--border-soft)] bg-[var(--bg-elevated)] p-0.5 font-mono text-[11px]">
              {(["all", "exp", "edu"] as const).map((filterKey) => {
                const active = laneFilter === filterKey;
                const label =
                  filterKey === "all"
                    ? t.sceneUi.filterAll
                    : filterKey === "exp"
                      ? t.sceneUi.filterExp
                      : t.sceneUi.filterEdu;
                return (
                  <button
                    key={filterKey}
                    type="button"
                    onClick={() => setLaneFilter(filterKey)}
                    className={`rounded-md px-2 py-0.5 transition cursor-pointer ${
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
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Left Column: Dual-Lane Interactive SVG Git Commit Graph */}
        <div
          className="lg:col-span-7 space-y-2.5"
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "j") {
              e.preventDefault();
              stepCommit(1);
            } else if (e.key === "ArrowUp" || e.key === "k") {
              e.preventDefault();
              stepCommit(-1);
            }
          }}
        >
          {visibleCommits.map((node, index) => {
            const isSelected = activeCommit?.hash === node.hash;
            const isEdu = node.lane === "edu";
            const isFirst = index === 0;
            const isLast = index === visibleCommits.length - 1;
            const prevNode = visibleCommits[index - 1];
            const nextNode = visibleCommits[index + 1];

            // Coordinates for dual-lane SVG rail (52x120 viewBox preserved cleanly)
            const xEdu = 14;
            const xExp = laneFilter === "exp" ? 14 : 38;
            const nodeX = isEdu ? xEdu : xExp;

            return (
              <div
                key={node.uid}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                data-cursor="inspect"
                style={{
                  transitionDelay: isStreamReady ? `${index * 95}ms` : "0ms",
                }}
                onClick={() => {
                  playSfx("key");
                  setSelectedHash(node.hash);
                }}
                onMouseEnter={() => setSelectedHash(node.hash)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    playSfx("key");
                    setSelectedHash(node.hash);
                  }
                }}
                className={`group relative flex items-stretch gap-3 sm:gap-4 rounded-2xl border p-4 sm:p-5 cursor-pointer transition-all duration-500 focus:outline-none ${
                  isStreamReady
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                } ${
                  isSelected
                    ? "border-[var(--accent-border)] bg-[var(--bg-surface)] shadow-md"
                    : "border-[var(--border-soft)] bg-[var(--bg-surface)]/70 hover:border-[var(--border-hover)]"
                }`}
              >
                {/* Authentic Dual-Lane SVG Git Branch Track with Self-Drawing Stream */}
                <div
                  aria-hidden="true"
                  className="relative w-12 shrink-0 select-none"
                >
                  <svg
                    viewBox="0 0 52 100"
                    preserveAspectRatio="none"
                    className="h-full w-full overflow-visible"
                  >
                    {/* Continuing main/edu track */}
                    {laneFilter !== "exp" && (!isFirst || isEdu) && !isLast ? (
                      <line
                        x1={xEdu}
                        y1={isFirst && isEdu ? 50 : 0}
                        x2={xEdu}
                        y2={100}
                        stroke="rgba(16, 185, 129, 0.42)"
                        strokeWidth="2"
                        strokeDasharray="120"
                        strokeDashoffset={isStreamReady ? "0" : "120"}
                        style={{
                          transition: `stroke-dashoffset 650ms ease ${index * 110}ms`,
                        }}
                      />
                    ) : null}

                    {/* Incoming branch curve from prev commit if lane switched */}
                    {prevNode && prevNode.lane !== node.lane ? (
                      <path
                        d={`M ${prevNode.lane === "edu" ? xEdu : xExp} 0 C ${
                          prevNode.lane === "edu" ? xEdu : xExp
                        } 25, ${nodeX} 25, ${nodeX} 50`}
                        fill="none"
                        stroke={
                          isEdu
                            ? "rgba(16, 185, 129, 0.55)"
                            : "rgba(56, 189, 248, 0.55)"
                        }
                        strokeWidth="2"
                        strokeDasharray="120"
                        strokeDashoffset={isStreamReady ? "0" : "120"}
                        style={{
                          transition: `stroke-dashoffset 650ms ease ${index * 110}ms`,
                        }}
                      />
                    ) : prevNode ? (
                      <line
                        x1={nodeX}
                        y1="0"
                        x2={nodeX}
                        y2="50"
                        stroke={
                          isEdu
                            ? "rgba(16, 185, 129, 0.5)"
                            : "rgba(56, 189, 248, 0.5)"
                        }
                        strokeWidth="2"
                        strokeDasharray="120"
                        strokeDashoffset={isStreamReady ? "0" : "120"}
                        style={{
                          transition: `stroke-dashoffset 650ms ease ${index * 110}ms`,
                        }}
                      />
                    ) : null}

                    {/* Outgoing branch connector to next commit */}
                    {nextNode && nextNode.lane !== node.lane ? (
                      <path
                        d={`M ${nodeX} 50 C ${nodeX} 75, ${
                          nextNode.lane === "edu" ? xEdu : xExp
                        } 75, ${nextNode.lane === "edu" ? xEdu : xExp} 100`}
                        fill="none"
                        stroke={
                          nextNode.lane === "edu"
                            ? "rgba(16, 185, 129, 0.55)"
                            : "rgba(56, 189, 248, 0.55)"
                        }
                        strokeWidth="2"
                        strokeDasharray="120"
                        strokeDashoffset={isStreamReady ? "0" : "120"}
                        style={{
                          transition: `stroke-dashoffset 650ms ease ${index * 110 + 120}ms`,
                        }}
                      />
                    ) : nextNode ? (
                      <line
                        x1={nodeX}
                        y1="50"
                        x2={nodeX}
                        y2="100"
                        stroke={
                          isEdu
                            ? "rgba(16, 185, 129, 0.5)"
                            : "rgba(56, 189, 248, 0.5)"
                        }
                        strokeWidth="2"
                        strokeDasharray="120"
                        strokeDashoffset={isStreamReady ? "0" : "120"}
                        style={{
                          transition: `stroke-dashoffset 650ms ease ${index * 110 + 120}ms`,
                        }}
                      />
                    ) : null}
                  </svg>

                  {/* Node Commit Glyph centered at y=50% */}
                  <span
                    style={{ left: `${(nodeX / 52) * 100}%` }}
                    className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[11px] font-bold transition-transform ${
                      isSelected ? "scale-115 shadow-sm" : "group-hover:scale-105"
                    } ${
                      isEdu
                        ? "border-emerald-500/70 bg-[var(--bg-surface)] text-emerald-600 dark:text-emerald-300"
                        : "border-sky-500/70 bg-[var(--bg-surface)] text-sky-600 dark:text-sky-300"
                    }`}
                  >
                    {isEdu ? "◆" : "●"}
                  </span>
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
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-soft)] bg-[var(--bg-elevated)] px-4 py-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-1 text-[var(--text-secondary)]">
                  {`git show ${activeCommit.hash}`}
                </span>
              </div>

              <div className="flex items-center gap-1 rounded-md border border-[var(--border-soft)] bg-[var(--bg-surface)] p-0.5 text-[10px]">
                <button
                  type="button"
                  onClick={() => setInspectorView("summary")}
                  className={`rounded px-1.5 py-0.5 transition cursor-pointer ${
                    inspectorView === "summary"
                      ? "bg-[var(--accent-bg)] text-[var(--accent-text)] font-semibold"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  {t.sceneUi.summaryMode}
                </button>
                <button
                  type="button"
                  onClick={() => setInspectorView("diff")}
                  className={`rounded px-1.5 py-0.5 transition cursor-pointer ${
                    inspectorView === "diff"
                      ? "bg-[var(--accent-bg)] text-[var(--accent-text)] font-semibold"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  {t.sceneUi.diffMode}
                </button>
              </div>
            </div>

            {/* Commit Metadata & Diff Body */}
            <div className="p-5 space-y-4 font-mono text-xs">
              <div className="space-y-1 border-b border-[var(--border-soft)] pb-3 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-amber-700 dark:text-amber-300 font-semibold">
                    {`commit ${activeCommit.hash}84b9e201f5803025050`}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    {`${activeIndex + 1}/${visibleCommits.length}`}
                  </span>
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

              <div className="space-y-1.5">
                <div className="font-sans text-base font-bold text-[var(--text-primary)]">
                  {activeCommit.title}
                </div>
                <div className="text-[var(--text-secondary)]">
                  {`@ ${activeCommit.organization}`}
                </div>
              </div>

              {inspectorView === "diff" ? (
                <div className="rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)]/85 p-3.5 space-y-1 text-[11px] leading-relaxed overflow-x-auto">
                  <div className="text-[var(--text-muted)]">
                    {`diff --git a/${activeCommit.branch} b/${activeCommit.branch}`}
                  </div>
                  <div className="text-[var(--text-muted)]">
                    @@ -0,0 +1,4 @@ // MILESTONE_PATCH
                  </div>
                  <div className="text-emerald-700 dark:text-emerald-300">
                    {`+ role: "${activeCommit.title}"`}
                  </div>
                  <div className="text-emerald-700 dark:text-emerald-300">
                    {`+ org:  "${activeCommit.organization}"`}
                  </div>
                  <div className="text-emerald-700 dark:text-emerald-300">
                    {`+ note: "${activeCommit.summary}"`}
                  </div>
                </div>
              ) : (
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
              )}

              {/* Skills / Modules */}
              <div className="space-y-2 pt-1">
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                  {t.sceneUi.linkedModules}
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
                  className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-1 text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition cursor-pointer"
                >
                  {t.sceneUi.prevCommit}
                </button>
                <span className="text-[10px] text-[var(--text-muted)] text-center px-2">
                  {t.sceneUi.inspectCommit}
                </span>
                <button
                  type="button"
                  onClick={() => stepCommit(1)}
                  className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-1 text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition cursor-pointer"
                >
                  {t.sceneUi.nextCommit}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Outgoing Git-to-PCB Bus Bridge (03 -> 04) */}
      <div
        aria-hidden="true"
        className="hidden md:flex flex-col items-center -mb-6 pt-3 pointer-events-none select-none"
      >
        <span className="rounded-full border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-0.5 font-mono text-[9px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
          03 → 04 // ROUTING GIT_HEAD TO PCB_BUS
        </span>
        <div className="h-6 w-px bg-gradient-to-b from-amber-500/60 to-sky-500/60" />
      </div>
    </section>
  );
}
