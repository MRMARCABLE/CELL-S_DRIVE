"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ScenePrompt from "@/components/home/ScenePrompt";
import { useReducedMotion } from "@/components/home/fx/hooks/useReducedMotion";
import { useScrollProgress } from "@/components/home/fx/hooks/useScrollProgress";
import { profile } from "@/data/portfolio";

const SCRAMBLE_FRAMES = ["M4RC3L", "010101", "M✦RCEL", "MARC3L", "MARCEL"];

export default function IdentityScene() {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const scrollProgress = useScrollProgress("scene-01");
  const [nameLabel, setNameLabel] = useState("MARCEL");
  const [scrambling, setScrambling] = useState(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrambling || reducedMotion) return;
    const timers: number[] = [];
    SCRAMBLE_FRAMES.forEach((frame, idx) => {
      const id = window.setTimeout(() => {
        setNameLabel(frame);
        if (idx === SCRAMBLE_FRAMES.length - 1) {
          setScrambling(false);
        }
      }, idx * 75);
      timers.push(id);
    });
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [reducedMotion, scrambling]);

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    const spot = spotlightRef.current;
    if (!stage || !spot) return;
    const rect = stage.getBoundingClientRect();
    spot.style.setProperty(
      "--spot-x",
      `${Math.round(e.clientX - rect.left)}px`
    );
    spot.style.setProperty(
      "--spot-y",
      `${Math.round(e.clientY - rect.top)}px`
    );
    spot.style.opacity = "1";
  };

  const handleStageMouseLeave = () => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = "0";
    }
  };

  // Begin phasing out as the user scrolls past the middle of Scene 01 toward Scene 02
  const phaseOut = reducedMotion
    ? 0
    : Math.max(0, Math.min(1, (scrollProgress - 0.32) / 0.56));

  const stageStyle = reducedMotion
    ? undefined
    : {
        transform: `translate3d(0, ${Math.round(phaseOut * 28)}px, 0) scale(${(
          1 -
          phaseOut * 0.025
        ).toFixed(3)})`,
        opacity: Number((1 - phaseOut * 0.28).toFixed(3)),
      };

  // The giant stacked name glides downward and expands as it morphs into Scene 02's background container
  const nameMorphStyle = reducedMotion
    ? undefined
    : {
        transform: `translate3d(0, ${Math.round(phaseOut * 96)}px, 0) scale(${(
          1 +
          phaseOut * 0.12
        ).toFixed(3)})`,
        opacity: Number((1 - phaseOut * 0.55).toFixed(3)),
        transformOrigin: "left center",
      };

  return (
    <section
      id="scene-01"
      data-scene-index="01"
      className="min-h-[calc(100dvh-4.5rem)] flex flex-col justify-between py-2 sm:py-3"
    >
      <ScenePrompt
        index="01"
        command="whoami --profile"
        subtitle={t.hero.sectionLabel}
        badge={`STATUS: ${t.hero.availability}`}
      />

      <div
        ref={stageRef}
        style={{
          ...stageStyle,
          background:
            "linear-gradient(100deg, color-mix(in srgb, var(--bg-surface) 84%, transparent) 0%, color-mix(in srgb, var(--bg-surface) 52%, transparent) 46%, color-mix(in srgb, var(--bg-surface) 10%, transparent) 78%, transparent 100%)",
        }}
        onMouseMove={handleStageMouseMove}
        onMouseLeave={handleStageMouseLeave}
        className="relative flex-1 flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--border-soft)] p-6 sm:p-9 lg:p-12 transition-transform duration-150 will-change-transform"
      >
        {/* Cursor Radial Spotlight illuminating the unified Milky Way background */}
        <div
          ref={spotlightRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle 260px at var(--spot-x, 76%) var(--spot-y, 48%), rgba(var(--scene-glow-1), 0.18), transparent 72%)",
          }}
        />

        {/* Main Hero Content overlaid on top of the right-anchored fading ASCII background */}
        <div className="relative z-10 my-auto max-w-3xl space-y-6 py-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-md border border-[var(--accent-border)] bg-[var(--bg-bg,var(--accent-bg))] px-2.5 py-1 font-mono text-xs text-[var(--accent-text)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-text)]" />
              <span>{t.hero.roleBadge}</span>
            </span>
            <span className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)]/90 px-2.5 py-1 font-mono text-xs text-[var(--text-muted)]">
              NRP // 5803025050
            </span>
            <span className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)]/90 px-2.5 py-1 font-mono text-xs text-[var(--accent-text)]">
              @MRMARCABLE // {t.sceneUi.verifiedIdentity}
            </span>
          </div>

          {/* Giant Stacked Focal Name — descends into Scene 02's background container on scroll */}
          <h1
            aria-label={profile.name}
            style={nameMorphStyle}
            onMouseEnter={() => {
              if (!reducedMotion && !scrambling) setScrambling(true);
            }}
            className="font-sans text-[clamp(2.6rem,6.8vw,5.4rem)] font-extrabold uppercase leading-[0.92] tracking-tighter text-[var(--text-primary)] select-none transition-transform duration-150 will-change-transform"
          >
            <span className="block">YOHANNES</span>
            <span className="block text-[var(--accent-text)] transition-colors">
              {nameLabel}
            </span>
            <span className="block">LALOPUA</span>
          </h1>

          <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
            {t.hero.bio}
          </p>

          {/* Philosophical Quote 1 (No attribution) */}
          <blockquote className="max-w-xl rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)]/80 backdrop-blur-sm px-4 py-3 font-mono text-xs sm:text-[13px] leading-relaxed text-[var(--text-secondary)]">
            <span
              className="mr-2 text-[var(--accent-text)]"
              aria-hidden="true"
            >
              ✦
            </span>
            <span className="italic text-[var(--text-primary)]">
              {`“${t.quotes.chaosStar}”`}
            </span>
          </blockquote>
        </div>

        {/* Bottom Action & Scroll Phase Bar */}
        <div className="relative z-10 mt-6 pt-5 border-t border-[var(--border-soft)] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--text-primary)] px-4 py-2 text-sm font-semibold text-[var(--bg-base)] hover:opacity-90 transition"
            >
              <span>{t.hero.exploreProjects}</span>
              <span className="font-mono">→</span>
            </Link>
            <Link
              href="/cv"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--accent-border)] bg-[var(--accent-bg)] px-4 py-2 text-sm font-medium text-[var(--accent-text)] hover:border-[var(--border-hover)] transition"
            >
              <span>{t.hero.viewCv}</span>
              <span className="font-mono text-xs">⎙</span>
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)]/90 px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:border-[var(--border-hover)] transition"
            >
              <span>{t.hero.contactMe}</span>
              <span className="font-mono text-xs">↗</span>
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)]/90 px-3.5 py-2 text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition"
            >
              <span>GitHub</span>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                ↗
              </span>
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)]/90 px-3.5 py-2 text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition"
            >
              <span>LinkedIn</span>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                ↗
              </span>
            </a>
          </div>

          <a
            href="#scene-02"
            className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent-text)] transition"
          >
            <span>01 → 02 // BINARY_DECK</span>
            <span>↓</span>
          </a>
        </div>

        {/* Bottom Scroll Phasing Haze toward Scene 02 */}
        {!reducedMotion && phaseOut > 0.05 ? (
          <div
            aria-hidden="true"
            style={{ opacity: Number((phaseOut * 0.85).toFixed(2)) }}
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--accent-bg)] to-transparent transition-opacity"
          />
        ) : null}
      </div>
    </section>
  );
}
