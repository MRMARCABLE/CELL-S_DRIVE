"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ScenePrompt from "@/components/home/ScenePrompt";
import AsciiPortrait from "@/components/home/fx/AsciiPortrait";
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

  // Begin phasing out as the user scrolls past the middle of Scene 01 toward Scene 02
  const phaseOut = reducedMotion
    ? 0
    : Math.max(0, Math.min(1, (scrollProgress - 0.38) / 0.52));

  const stageStyle = reducedMotion
    ? undefined
    : {
        transform: `translate3d(0, ${Math.round(-phaseOut * 20)}px, 0) scale(${(
          1 -
          phaseOut * 0.04
        ).toFixed(3)})`,
        opacity: Number((1 - phaseOut * 0.42).toFixed(3)),
      };

  return (
    <section id="scene-01" data-scene-index="01" className="scene-stage">
      <ScenePrompt
        index="01"
        command="whoami --profile"
        subtitle={t.hero.sectionLabel}
        badge={`STATUS: ${t.hero.availability}`}
      />

      <div
        style={stageStyle}
        className="soft-card relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10 transition-transform duration-150 will-change-transform"
      >
        <div className="grid items-center gap-8 lg:grid-cols-12">
          {/* Left Column: Giant Stacked Name + Bio + Philosophical Quote */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-md border border-[var(--accent-border)] bg-[var(--accent-bg)] px-2.5 py-1 font-mono text-xs text-[var(--accent-text)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-text)]" />
                <span>{t.hero.roleBadge}</span>
              </span>
              <span className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono text-xs text-[var(--text-muted)]">
                NRP // 5803025050
              </span>
            </div>

            {/* Giant Stacked Focal Name */}
            <h1
              aria-label={profile.name}
              onMouseEnter={() => {
                if (!reducedMotion && !scrambling) setScrambling(true);
              }}
              className="font-sans text-[clamp(2.4rem,6vw,4.9rem)] font-extrabold uppercase leading-[0.92] tracking-tighter text-[var(--text-primary)] select-none"
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
            <blockquote className="rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)]/70 px-4 py-3 font-mono text-xs sm:text-[13px] leading-relaxed text-[var(--text-secondary)]">
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

          {/* Right Column: Interactive ASCII Portrait + Verified Photo Chip */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
            <div className="relative w-full max-w-[430px]">
              <AsciiPortrait className="w-full" />

              {/* Verified Real Photo Chip anchored below/on the ASCII Matrix */}
              <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-surface)]/95 backdrop-blur-md p-2.5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <Image
                      src="/avatar.png"
                      alt={`Profile photo of ${profile.name}`}
                      width={44}
                      height={44}
                      priority
                      className="h-11 w-11 rounded-lg object-cover border border-[var(--border-soft)]"
                    />
                    <span
                      title={t.hero.availability}
                      className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[var(--bg-base)] bg-[var(--accent-text)]"
                    />
                  </div>
                  <div className="font-mono text-[11px] leading-tight">
                    <div className="font-semibold text-[var(--text-primary)]">
                      @MRMARCABLE
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)]">
                      {profile.location}
                    </div>
                  </div>
                </div>
                <div className="font-mono text-[10px] text-[var(--accent-text)] text-right">
                  {t.sceneUi.verifiedIdentity}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action & Scroll Phase Bar */}
        <div className="mt-8 pt-6 border-t border-[var(--border-soft)] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--text-primary)] px-4 py-2 text-sm font-semibold text-[var(--bg-base)] hover:opacity-90 transition"
            >
              <span>{t.hero.exploreProjects}</span>
              <span className="font-mono">→</span>
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-md border border-[var(--accent-border)] bg-[var(--accent-bg)] px-4 py-2 text-sm font-medium text-[var(--accent-text)] hover:border-[var(--border-hover)] transition"
            >
              <span>{t.hero.contactMe}</span>
              <span className="font-mono text-xs">↗</span>
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-3.5 py-2 text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition"
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
              className="inline-flex items-center gap-2 rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-3.5 py-2 text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition"
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
