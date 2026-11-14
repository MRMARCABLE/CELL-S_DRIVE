"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ScenePrompt from "@/components/home/ScenePrompt";
import { playSfx } from "@/components/shell/sound";
import type { ProjectItem } from "@/data/portfolio";

function getBusDomainTag(busId: string): string {
  if (busId === "BUS_01") return "WEB.3D_UX ♠";
  if (busId === "BUS_02") return "AI.AGENT ♦";
  return "SYS.EMBED ♣";
}

function getBusColorClasses(busId: string): {
  led: string;
  badge: string;
  activeBorder: string;
  stroke: string;
} {
  if (busId === "BUS_01") {
    return {
      led: "bg-sky-500",
      badge:
        "border-sky-500/40 bg-sky-500/10 text-sky-800 dark:text-sky-300",
      activeBorder: "border-sky-500/55",
      stroke: "rgba(56, 189, 248, 0.7)",
    };
  }
  if (busId === "BUS_02") {
    return {
      led: "bg-rose-500",
      badge:
        "border-rose-500/40 bg-rose-500/10 text-rose-800 dark:text-rose-300",
      activeBorder: "border-rose-500/55",
      stroke: "rgba(251, 113, 133, 0.7)",
    };
  }
  return {
    led: "bg-emerald-500",
    badge:
      "border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
    activeBorder: "border-emerald-500/55",
    stroke: "rgba(52, 211, 153, 0.7)",
  };
}

function normalizeTechNeedle(skill: string): string {
  if (skill.startsWith("Next.js")) return "Next.js";
  if (skill.startsWith("ESP32")) return "ESP32";
  if (skill.startsWith("UI/UX")) return "UI/UX";
  if (skill.startsWith("Git")) return "Git";
  return skill;
}

function getSkillRoleNote(skill: string, locale: "en" | "id"): string {
  const notesEn: Record<string, string> = {
    "Next.js (App Router)":
      "App Router architecture, SSR/CSR streaming & dynamic route shells.",
    React:
      "Interactive state engines, custom hooks & declarative UI composition.",
    TypeScript:
      "Strict static typing across full-stack data contracts & UI components.",
    "Tailwind CSS":
      "Custom CSS design tokens, dual-theme surfaces & responsive grid systems.",
    "Three.js":
      "Real-time WebGL 3D Cartesian scenes, vector projections & shaders.",
    Python:
      "Computer vision pipelines, serial hardware telemetry & ML preprocessing.",
    Langflow:
      "Multi-step autonomous AI agent orchestration & prompt chaining.",
    "Astra DB":
      "Vector database indexing & semantic RAG document retrieval.",
    n8n: "Event-driven webhook automation & Telegram-to-spreadsheet workflows.",
    OpenCV:
      "Real-time camera frame processing, bounding boxes & spatial tracking.",
    MediaPipe:
      "High-speed facial landmark detection & coordinate extraction.",
    "ESP32 / IoT":
      "Microcontroller firmware, 2-axis pan-tilt servo control & OLED display.",
    "UI/UX Design (UCD)":
      "User-Centered Design research, wireframing & usability flows.",
    Figma:
      "Component token libraries, interactive prototypes & layout systems.",
    "Git & GitLab":
      "Dual-remote version control across GitHub & UKWMS Git-Eng.",
  };

  const notesId: Record<string, string> = {
    "Next.js (App Router)":
      "Arsitektur App Router, streaming SSR/CSR & rute dinamis.",
    React:
      "Mesin state interaktif, custom hooks & komposisi antarmuka deklaratif.",
    TypeScript:
      "Pengetikan statis ketat untuk kontrak data & komponen UI.",
    "Tailwind CSS":
      "Token desain CSS kustom, dwi-tema Shadow/Bone & tata letak responsif.",
    "Three.js":
      "Visualisasi ruang 3D WebGL real-time, proyeksi vektor & permukaan.",
    Python:
      "Pipeline visi komputer, telemetri serial perangkat keras & prapemrosesan ML.",
    Langflow:
      "Orkestrasi agen AI otonom multi-tahap & rantai prompt LLM.",
    "Astra DB":
      "Basis data vektor & pencarian dokumen semantik berbasis RAG.",
    n8n: "Otomasi webhook berbasis event & integrasi bot Telegram ke spreadsheet.",
    OpenCV:
      "Pemrosesan frame kamera real-time & pelacakan koordinat objek.",
    MediaPipe:
      "Deteksi titik wajah berkecepatan tinggi untuk aktuasi robotika.",
    "ESP32 / IoT":
      "Firmware mikrokontroler, kontrol servo pan-tilt 2-axis & layar OLED.",
    "UI/UX Design (UCD)":
      "Riset pengguna berbasis UCD, arsitektur informasi & alur interaksi.",
    Figma:
      "Pustaka komponen desain, token visual & prototipe interaktif.",
    "Git & GitLab":
      "Kontrol versi repositori ganda di GitHub & Git-Eng UKWMS.",
  };

  return (locale === "id" ? notesId[skill] : notesEn[skill]) ?? skill;
}

function findMatchingProjects(
  skill: string,
  projects: ProjectItem[]
): { needle: string; matches: ProjectItem[] } {
  const needle = normalizeTechNeedle(skill);
  const lower = needle.toLowerCase();
  const matches = projects.filter(
    (p) =>
      p.tech.some((item) => item.toLowerCase().includes(lower)) ||
      p.desc.toLowerCase().includes(lower) ||
      p.title.toLowerCase().includes(lower)
  );
  return { needle, matches };
}

export default function StackScene() {
  const { t, locale } = useLanguage();
  const [activeBus, setActiveBus] = useState<string | null>(null);
  const [bootWaveActive, setBootWaveActive] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<{
    skill: string;
    busId: string;
    pinHex: string;
  }>({
    skill: "Next.js (App Router)",
    busId: "BUS_01",
    pinHex: "0x01",
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setBootWaveActive(true);
          }
        }
      },
      { threshold: 0.16 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Compute strict sequential hex pin addresses (0x01..0x0F) without skipping indices
  const busesWithPins = useMemo(() => {
    return t.techCategories.map((group, groupIdx) => {
      const startOffset = t.techCategories
        .slice(0, groupIdx)
        .reduce((acc, g) => acc + g.items.length, 0);
      return {
        ...group,
        keycaps: group.items.map((skill, idx) => ({
          skill,
          pinIndex: startOffset + idx,
          pinHex: `0x${(startOffset + idx + 1)
            .toString(16)
            .toUpperCase()
            .padStart(2, "0")}`,
        })),
      };
    });
  }, [t.techCategories]);

  const activeCategoryLabel =
    t.techCategories.find((g) => g.id === selectedSkill.busId)?.category ??
    t.techCategories[0]?.category ??
    "";

  const { needle, matches } = useMemo(
    () => findMatchingProjects(selectedSkill.skill, t.projects),
    [selectedSkill.skill, t.projects]
  );

  return (
    <section
      ref={sectionRef}
      id="scene-04"
      data-scene-index="04"
      className="scene-stage"
    >
      <ScenePrompt
        index="04"
        command="lsmod --matrix"
        subtitle={t.sections.stackHeading}
        badge={t.sections.stackBadge}
      />

      <div className="soft-card rounded-3xl p-5 sm:p-7 space-y-5">
        {/* Top Hardware Bus Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-soft)] pb-4">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveBus(null)}
              className={`rounded-lg border px-3 py-1.5 transition cursor-pointer ${
                activeBus === null
                  ? "border-[var(--accent-border)] bg-[var(--accent-bg)] text-[var(--accent-text)] font-semibold"
                  : "border-[var(--border-soft)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]"
              }`}
            >
              {t.sceneUi.filterBusAll}
            </button>

            {busesWithPins.map((group) => {
              const isBusSelected = activeBus === group.id;
              const colors = getBusColorClasses(group.id);
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() =>
                    setActiveBus((prev) =>
                      prev === group.id ? null : group.id
                    )
                  }
                  className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 transition cursor-pointer ${
                    isBusSelected
                      ? `${colors.badge} font-semibold`
                      : "border-[var(--border-soft)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${colors.led}`} />
                  <span>{group.id}</span>
                </button>
              );
            })}
          </div>

          <span className="font-mono text-[11px] text-[var(--text-muted)]">
            {t.sceneUi.modulesMounted}
          </span>
        </div>

        {/* Desktop SVG PCB Copper Trace Router with Flowing Signal Packets */}
        <div aria-hidden="true" className="hidden lg:block -my-2">
          <svg
            viewBox="0 0 900 44"
            className="h-9 w-full overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Central controller hub */}
            <circle
              cx="450"
              cy="6"
              r="4.5"
              fill="var(--accent-text)"
            />

            {/* Base & Signal Trace to BUS_01 (Left Column center ~150) */}
            <path
              d="M 450 6 L 450 18 L 150 18 L 150 42"
              fill="none"
              stroke={
                activeBus === null || activeBus === "BUS_01"
                  ? "rgba(56, 189, 248, 0.3)"
                  : "var(--border-soft)"
              }
              strokeWidth="1.6"
            />
            {activeBus === null || activeBus === "BUS_01" ? (
              <path
                d="M 450 6 L 450 18 L 150 18 L 150 42"
                fill="none"
                stroke="rgba(56, 189, 248, 0.95)"
                strokeWidth="2.4"
                strokeLinecap="round"
                className="pcb-signal-trace"
              />
            ) : null}
            <circle
              cx="150"
              cy="40"
              r="3.5"
              fill={
                activeBus === null || activeBus === "BUS_01"
                  ? "rgba(56, 189, 248, 0.95)"
                  : "var(--border-soft)"
              }
            />

            {/* Base & Signal Trace to BUS_02 (Center Column ~450) */}
            <path
              d="M 450 6 L 450 42"
              fill="none"
              stroke={
                activeBus === null || activeBus === "BUS_02"
                  ? "rgba(251, 113, 133, 0.3)"
                  : "var(--border-soft)"
              }
              strokeWidth="1.6"
            />
            {activeBus === null || activeBus === "BUS_02" ? (
              <path
                d="M 450 6 L 450 42"
                fill="none"
                stroke="rgba(251, 113, 133, 0.95)"
                strokeWidth="2.4"
                strokeLinecap="round"
                className="pcb-signal-trace"
              />
            ) : null}
            <circle
              cx="450"
              cy="40"
              r="3.5"
              fill={
                activeBus === null || activeBus === "BUS_02"
                  ? "rgba(251, 113, 133, 0.95)"
                  : "var(--border-soft)"
              }
            />

            {/* Base & Signal Trace to BUS_03 (Right Column center ~750) */}
            <path
              d="M 450 6 L 450 18 L 750 18 L 750 42"
              fill="none"
              stroke={
                activeBus === null || activeBus === "BUS_03"
                  ? "rgba(52, 211, 153, 0.3)"
                  : "var(--border-soft)"
              }
              strokeWidth="1.6"
            />
            {activeBus === null || activeBus === "BUS_03" ? (
              <path
                d="M 450 6 L 450 18 L 750 18 L 750 42"
                fill="none"
                stroke="rgba(52, 211, 153, 0.95)"
                strokeWidth="2.4"
                strokeLinecap="round"
                className="pcb-signal-trace"
              />
            ) : null}
            <circle
              cx="750"
              cy="40"
              r="3.5"
              fill={
                activeBus === null || activeBus === "BUS_03"
                  ? "rgba(52, 211, 153, 0.95)"
                  : "var(--border-soft)"
              }
            />
          </svg>
        </div>

        {/* 3 Circuit Bus Columns */}
        <div className="grid gap-5 lg:grid-cols-3">
          {busesWithPins.map((group) => {
            const isDimmed = activeBus !== null && activeBus !== group.id;
            const isHighlighted = activeBus === group.id;
            const colors = getBusColorClasses(group.id);

            return (
              <div
                key={group.id}
                onMouseEnter={() => setActiveBus(group.id)}
                onMouseLeave={() => setActiveBus(null)}
                className={`rounded-2xl border bg-[var(--bg-elevated)]/55 p-5 transition-all duration-200 flex flex-col justify-between space-y-5 ${
                  isHighlighted
                    ? `${colors.activeBorder} shadow-md`
                    : "border-[var(--border-soft)]"
                } ${isDimmed ? "opacity-45" : "opacity-100"}`}
              >
                <div className="space-y-3">
                  {/* Bus Header */}
                  <div className="flex items-center justify-between border-b border-[var(--border-soft)] pb-3 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${colors.led}`} />
                      <span className="font-semibold text-[var(--text-primary)]">
                        {group.busCode}
                      </span>
                    </div>
                    <span
                      className={`rounded border px-1.5 py-0.5 text-[10px] ${colors.badge}`}
                    >
                      {getBusDomainTag(group.id)}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    {group.category}
                  </h3>

                  {/* Mechanical Keycaps Grid with LED Boot-Up Wave */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    {group.keycaps.map(({ skill, pinHex, pinIndex }) => {
                      const isKeySelected = selectedSkill.skill === skill;

                      return (
                        <button
                          key={skill}
                          type="button"
                          data-cursor="key"
                          style={
                            bootWaveActive
                              ? { animationDelay: `${pinIndex * 55}ms` }
                              : undefined
                          }
                          onClick={() => {
                            playSfx("key");
                            setSelectedSkill({
                              skill,
                              busId: group.id,
                              pinHex,
                            });
                          }}
                          onMouseEnter={() =>
                            setSelectedSkill({
                              skill,
                              busId: group.id,
                              pinHex,
                            })
                          }
                          className={`group/key relative flex flex-col justify-between rounded-xl border border-b-[3px] p-2.5 text-left transition-all active:translate-y-0.5 cursor-pointer ${
                            bootWaveActive ? "keycap-boot-active" : ""
                          } ${
                            isKeySelected
                              ? "border-[var(--accent-border)] bg-[var(--bg-surface)] shadow-sm -translate-y-0.5"
                              : "border-[var(--border-soft)] bg-[var(--bg-surface)]/85 hover:border-[var(--border-hover)] hover:-translate-y-0.5"
                          }`}
                        >
                          <div className="flex w-full items-center justify-between font-mono text-[10px] text-[var(--text-muted)]">
                            <span>{pinHex}</span>
                            <span
                              className={`h-1.5 w-1.5 rounded-full transition ${
                                isKeySelected
                                  ? "bg-[var(--accent-text)]"
                                  : "bg-[var(--border-hover)] group-hover/key:bg-[var(--accent-text)]"
                              }`}
                            />
                          </div>
                          <div className="mt-2 font-mono text-xs font-medium text-[var(--text-primary)] leading-tight">
                            {skill}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bus Trace Footer */}
                <div className="flex items-center justify-between border-t border-[var(--border-soft)] pt-3 font-mono text-[10px] text-[var(--text-muted)]">
                  <span>{`${t.sceneUi.modulesCountLabel}: ${group.items.length}`}</span>
                  <span>{t.sceneUi.statusOnline}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Live Kernel Module Telemetry & Project Cross-Link Bar */}
        <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-elevated)] p-4 font-mono text-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-[var(--accent-bg)] px-2 py-0.5 text-[10px] font-semibold text-[var(--accent-text)] border border-[var(--accent-border)]">
                {`MODINFO // ${selectedSkill.pinHex}`}
              </span>
              <span className="font-semibold text-[var(--text-primary)]">
                {selectedSkill.skill}
              </span>
              <span className="text-[var(--text-muted)]">—</span>
              <span className="text-[var(--text-secondary)]">
                {activeCategoryLabel}
              </span>
            </div>
            <span className="text-[11px] text-[var(--accent-text)]">
              {`${selectedSkill.busId} → ${getBusDomainTag(selectedSkill.busId)}`}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-t border-[var(--border-soft)] pt-2.5 text-[11px]">
            <p className="font-sans text-xs text-[var(--text-secondary)]">
              {getSkillRoleNote(selectedSkill.skill, locale)}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              <span className="text-[var(--text-muted)] mr-1">
                {`${t.sceneUi.usedInProjects} (${matches.length}):`}
              </span>
              {matches.map((proj) => (
                <Link
                  key={proj.id}
                  href={`/projects?tech=${encodeURIComponent(needle)}`}
                  className="inline-flex items-center gap-1 rounded border border-[var(--accent-border)] bg-[var(--accent-bg)] px-2 py-0.5 text-[var(--accent-text)] hover:border-[var(--border-hover)] transition"
                >
                  <span>{`[${proj.id}] ${proj.title}`}</span>
                  <span>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Outgoing Cryptographic Handshake Bridge (04 -> 05) */}
      <div
        aria-hidden="true"
        className="hidden md:flex flex-col items-center -mb-6 pt-3 pointer-events-none select-none"
      >
        <span className="rounded-full border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-0.5 font-mono text-[9px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
          04 → 05 // GPG_SIGNATURE_HANDSHAKE
        </span>
        <div className="h-6 w-px bg-gradient-to-b from-sky-500/60 to-amber-500/60" />
      </div>
    </section>
  );
}
