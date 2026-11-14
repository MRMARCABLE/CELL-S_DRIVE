"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ScenePrompt from "@/components/home/ScenePrompt";
import BinaryField from "@/components/home/fx/BinaryField";
import { useReducedMotion } from "@/components/home/fx/hooks/useReducedMotion";
import { useScrollProgress } from "@/components/home/fx/hooks/useScrollProgress";
import { playSfx } from "@/components/shell/sound";
import type { FocusDomain } from "@/data/portfolio";

function getRgbCardClass(rgb: FocusDomain["rgb"]): string {
  if (rgb === "r") return "rgb-card-r";
  if (rgb === "g") return "rgb-card-g";
  return "rgb-card-b";
}

function getRgbLabel(rgb: FocusDomain["rgb"]): string {
  if (rgb === "r") return "CH_R // CRIMSON";
  if (rgb === "g") return "CH_G // EMERALD";
  return "CH_B // CYAN";
}

function getCourtRank(rgb: FocusDomain["rgb"]): string {
  if (rgb === "r") return "A";
  if (rgb === "g") return "K";
  return "Q";
}

function getFanClass(idx: number, isOpen: boolean, dealt: boolean): string {
  if (!dealt) {
    if (idx === 0)
      return "opacity-0 md:translate-x-[55%] translate-y-8 rotate-6 scale-90";
    if (idx === 1) return "opacity-0 translate-y-10 scale-90";
    return "opacity-0 md:-translate-x-[55%] translate-y-8 -rotate-6 scale-90";
  }
  if (isOpen) return "opacity-100 lg:rotate-0 lg:translate-y-0 scale-100";
  if (idx === 0)
    return "opacity-100 lg:-rotate-2 lg:translate-y-1.5 hover:lg:rotate-0 hover:lg:translate-y-0";
  if (idx === 2)
    return "opacity-100 lg:rotate-2 lg:translate-y-1.5 hover:lg:rotate-0 hover:lg:translate-y-0";
  return "opacity-100";
}

function getWatermarkStrokeColor(rgb: "r" | "g" | "b" | null): string {
  if (rgb === "r") return "rgba(244, 63, 94, 0.22)";
  if (rgb === "g") return "rgba(16, 185, 129, 0.22)";
  if (rgb === "b") return "rgba(14, 165, 233, 0.22)";
  return "var(--border-hover)";
}

export default function FocusScene() {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const scrollProgress = useScrollProgress("scene-02");
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});
  const [hoveredRgb, setHoveredRgb] = useState<"r" | "g" | "b" | null>(null);
  const [revealAll, setRevealAll] = useState(false);
  const [dealt, setDealt] = useState(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const watermarkRef = useRef<HTMLDivElement | null>(null);

  // Trigger the 3D Card Deal / Fan-Out animation when Scene 02 enters the viewport
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDealt(true);
          }
        }
      },
      { threshold: 0.16 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleCard = (id: string) => {
    playSfx("flip");
    setFlippedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleRevealAll = () => {
    playSfx("flip");
    const next = !revealAll;
    setRevealAll(next);
    if (!next) {
      setFlippedIds({});
    }
  };

  const handleStageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !watermarkRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    watermarkRef.current.style.setProperty(
      "--wm-x",
      `${Math.round(-nx * 22)}px`
    );
    watermarkRef.current.style.setProperty(
      "--wm-y",
      `${Math.round(-ny * 14)}px`
    );
  };

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const tiltTarget = e.currentTarget.querySelector(
      ".playing-card-tilt"
    ) as HTMLElement | null;
    if (!tiltTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    tiltTarget.style.setProperty("--tilt-x", `${(-ny * 8).toFixed(2)}deg`);
    tiltTarget.style.setProperty("--tilt-y", `${(nx * 8).toFixed(2)}deg`);
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredRgb(null);
    const tiltTarget = e.currentTarget.querySelector(
      ".playing-card-tilt"
    ) as HTMLElement | null;
    if (!tiltTarget) return;
    tiltTarget.style.setProperty("--tilt-x", "0deg");
    tiltTarget.style.setProperty("--tilt-y", "0deg");
  };

  // Scroll-linked arrival offset so the full name from Scene 01 lands smoothly into Scene 02's container
  const arrivalOffset = reducedMotion
    ? 0
    : Math.round((0.42 - scrollProgress) * 85);

  const isDealt = reducedMotion || dealt;

  return (
    <section id="scene-02" data-scene-index="02" className="scene-stage">
      {/* Incoming Top Handoff Line from Scene 01 Full Name */}
      <div
        aria-hidden="true"
        className="mx-auto -mt-4 mb-3 flex flex-col items-center pointer-events-none select-none"
      >
        <div className="h-7 w-px bg-gradient-to-b from-[var(--accent-text)]/60 to-[var(--border-hover)]" />
        <span className="rounded-full border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-0.5 font-mono text-[9px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
          IDENTITY_WATERMARK // CONTAINER_LOCKED
        </span>
      </div>

      <ScenePrompt
        index="02"
        command="ls ./focus --deck"
        subtitle={t.sections.focusHeading}
        badge={t.sections.focusBadge}
        rightSlot={
          <button
            type="button"
            onClick={handleRevealAll}
            className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-primary)] hover:border-[var(--border-hover)] transition cursor-pointer"
          >
            {revealAll ? t.sceneUi.hideAllCards : t.sceneUi.revealAllCards}
          </button>
        }
      />

      {/* Binary Matrix + Giant Full-Name Watermark Stage Container */}
      <div
        ref={stageRef}
        onMouseMove={handleStageMove}
        className="relative overflow-hidden rounded-3xl border border-[var(--border-soft)] bg-[var(--bg-surface)]/65 p-5 sm:p-8 lg:p-10"
      >
        {/* Background 0/1 Canvas reacting dynamically to hovered RGB channel */}
        <BinaryField activeRgb={hoveredRgb} />

        {/* Transitioned Full Name Background Container from Scene 01 */}
        <div
          ref={watermarkRef}
          aria-hidden="true"
          style={{
            transform: `translate3d(var(--wm-x, 0px), calc(${arrivalOffset}px + var(--wm-y, 0px)), 0)`,
          }}
          className="pointer-events-none absolute inset-0 z-[1] flex flex-col items-center justify-center overflow-hidden select-none px-4 transition-transform duration-200 ease-out"
        >
          {["YOHANNES", "MARCEL", "LALOPUA"].map((word, i) => (
            <span
              key={word}
              style={{
                WebkitTextStroke: `1.5px ${getWatermarkStrokeColor(hoveredRgb)}`,
                color:
                  i === 1
                    ? hoveredRgb === "r"
                      ? "rgba(244, 63, 94, 0.06)"
                      : hoveredRgb === "g"
                        ? "rgba(16, 185, 129, 0.06)"
                        : hoveredRgb === "b"
                          ? "rgba(14, 165, 233, 0.06)"
                          : "rgba(126, 200, 176, 0.05)"
                    : "transparent",
              }}
              className="font-sans text-[clamp(3.1rem,10.5vw,8.4rem)] font-black uppercase leading-[0.86] tracking-tighter transition-colors duration-300"
            >
              {word}
            </span>
          ))}
        </div>

        {/* Helper bar */}
        <div className="relative z-10 mb-7 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--text-muted)]">
          <span>[RGB_DECK // 5:7 PLAYING CARD PROPORTION]</span>
          <span>{t.sceneUi.tapToFlip}</span>
        </div>

        {/* 3 Playing Cards Grid with Staggered Card Deal Entrance */}
        <div className="relative z-10 grid gap-6 md:grid-cols-3 py-1">
          {t.focusDomains.map((domain, idx) => {
            const isOpen = revealAll || Boolean(flippedIds[domain.id]);
            const rgbClass = getRgbCardClass(domain.rgb);
            const courtRank = getCourtRank(domain.rgb);
            const filteredProjectsHref = `/projects?category=${encodeURIComponent(
              domain.projectCategory
            )}`;

            return (
              <div
                key={domain.id}
                data-open={isOpen ? "true" : "false"}
                data-cursor="flip"
                onMouseEnter={() => setHoveredRgb(domain.rgb)}
                onMouseMove={handleCardMove}
                onMouseLeave={handleCardLeave}
                style={{
                  transitionDelay: isDealt ? `${idx * 115}ms` : "0ms",
                }}
                className={`playing-card-perspective mx-auto w-full max-w-[330px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${getFanClass(
                  idx,
                  isOpen,
                  isDealt
                )}`}
              >
                <div className="playing-card-tilt">
                  <div
                    role="button"
                    tabIndex={0}
                    aria-pressed={isOpen}
                    aria-label={`${domain.code} — ${domain.title}`}
                    onClick={() => toggleCard(domain.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleCard(domain.id);
                      }
                    }}
                    className={`playing-card-inner aspect-[5/7] w-full cursor-pointer select-none focus:outline-none ${
                      isOpen ? "is-flipped" : ""
                    }`}
                  >
                    {/* CLOSED FACE (Front of Card before flip) */}
                    <div
                      className={`playing-card-face ${rgbClass} flex flex-col justify-between rounded-2xl bg-[var(--bg-surface)]/92 p-5 backdrop-blur-md transition-shadow`}
                    >
                      {/* Top Corner Index */}
                      <div className="flex items-start justify-between font-mono">
                        <div className="leading-none">
                          <div className="text-lg font-bold text-[var(--card-rgb-text)]">
                            {courtRank}
                          </div>
                          <div className="mt-1 text-base text-[var(--card-rgb-text)]">
                            {domain.suit}
                          </div>
                        </div>
                        <span className="rounded border border-[var(--card-rgb-border)] bg-[var(--card-rgb-bg)] px-2 py-0.5 text-[10px] text-[var(--card-rgb-text)]">
                          {getRgbLabel(domain.rgb)}
                        </span>
                      </div>

                      {/* Center Emblem */}
                      <div className="my-auto flex flex-col items-center text-center space-y-3 py-4">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--card-rgb-border)] bg-[var(--card-rgb-bg)] font-mono text-4xl text-[var(--card-rgb-text)] shadow-inner">
                          {domain.suit}
                        </div>

                        <div className="font-mono text-xs tracking-[0.2em] text-[var(--card-rgb-text)]">
                          {`${domain.id} // ${domain.code}`}
                        </div>

                        <h3 className="px-2 text-base font-bold leading-snug text-[var(--text-primary)]">
                          {domain.title}
                        </h3>

                        <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-3 py-1 font-mono text-[10px] text-[var(--text-muted)]">
                          <span>{t.sceneUi.flipCardCue}</span>
                        </div>
                      </div>

                      {/* Bottom Mirrored Corner Index */}
                      <div className="flex items-end justify-between font-mono">
                        <span className="text-[10px] text-[var(--text-muted)]">
                          01001101 // DECK
                        </span>
                        <div className="rotate-180 leading-none text-right">
                          <div className="text-lg font-bold text-[var(--card-rgb-text)]">
                            {courtRank}
                          </div>
                          <div className="mt-1 text-base text-[var(--card-rgb-text)]">
                            {domain.suit}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* OPEN FACE (Revealed Back of Card after 180deg flip) */}
                    <div
                      className={`playing-card-back ${rgbClass} flex flex-col justify-between rounded-2xl bg-[var(--bg-surface)] p-5 shadow-lg`}
                    >
                      {/* Header */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-[var(--border-soft)] pb-2.5 font-mono text-xs">
                          <span className="font-bold text-[var(--card-rgb-text)]">
                            {`${courtRank}${domain.suit} // ${domain.code}`}
                          </span>
                          <span className="rounded border border-[var(--card-rgb-border)] bg-[var(--card-rgb-bg)] px-1.5 py-0.5 text-[10px] text-[var(--card-rgb-text)]">
                            {t.sceneUi.activeLabel}
                          </span>
                        </div>

                        <h3 className="text-base font-bold leading-snug text-[var(--text-primary)]">
                          {domain.title}
                        </h3>

                        <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                          {domain.desc}
                        </p>
                      </div>

                      {/* Architecture Highlights */}
                      <div className="space-y-2 border-t border-[var(--border-soft)] pt-3">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                          {t.sceneUi.keyCapabilities}
                        </div>
                        <ul className="space-y-1.5 font-mono text-[11px] text-[var(--text-primary)]">
                          {domain.highlights.map((item) => (
                            <li key={item} className="flex items-center gap-2">
                              <span className="text-[var(--card-rgb-text)]">
                                ▸
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Footer Action */}
                      <div className="flex items-center justify-between border-t border-[var(--border-soft)] pt-3 font-mono text-xs">
                        <span className="text-[var(--card-rgb-text)]">
                          {domain.suit}
                        </span>
                        <Link
                          href={filteredProjectsHref}
                          onClick={(e) => e.stopPropagation()}
                          className="text-[var(--card-rgb-text)] hover:underline"
                        >
                          {`${t.hero.exploreProjects} →`}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Outgoing RGB-to-Git Convergence Conduit toward Scene 03 */}
      <div
        aria-hidden="true"
        className="hidden md:flex flex-col items-center -mb-6 pt-1 pointer-events-none select-none"
      >
        <svg
          viewBox="0 0 900 54"
          className="h-12 w-full max-w-4xl overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Left Red/Rose stream from Card 01 */}
          <path
            d="M 150 0 C 150 28, 450 20, 450 52"
            fill="none"
            stroke="rgba(244, 63, 94, 0.48)"
            strokeWidth="1.8"
          />
          {/* Center Green/Emerald stream from Card 02 */}
          <path
            d="M 450 0 L 450 52"
            fill="none"
            stroke="rgba(16, 185, 129, 0.55)"
            strokeWidth="2"
          />
          {/* Right Blue/Cyan stream from Card 03 */}
          <path
            d="M 750 0 C 750 28, 450 20, 450 52"
            fill="none"
            stroke="rgba(14, 165, 233, 0.48)"
            strokeWidth="1.8"
          />
          <circle cx="450" cy="50" r="3.5" fill="var(--accent-text)" />
        </svg>
      </div>
    </section>
  );
}
