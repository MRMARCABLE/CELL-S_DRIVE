"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ScenePrompt from "@/components/home/ScenePrompt";
import BinaryField from "@/components/home/fx/BinaryField";
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

export default function FocusScene() {
  const { t } = useLanguage();
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [revealAll, setRevealAll] = useState(false);

  const toggleCard = (id: string) => {
    setFlippedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleRevealAll = () => {
    const next = !revealAll;
    setRevealAll(next);
    if (!next) {
      setFlippedIds({});
    }
  };

  return (
    <section id="scene-02" data-scene-index="02" className="scene-stage">
      <ScenePrompt
        index="02"
        command="ls ./focus --deck"
        subtitle={t.sections.focusHeading}
        badge={t.sections.focusBadge}
        rightSlot={
          <button
            type="button"
            onClick={handleRevealAll}
            className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-primary)] hover:border-[var(--border-hover)] transition"
          >
            {revealAll ? t.sceneUi.hideAllCards : t.sceneUi.revealAllCards}
          </button>
        }
      />

      {/* Binary Matrix Stage Container */}
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border-soft)] bg-[var(--bg-surface)]/65 p-5 sm:p-8">
        {/* Background 0/1 Canvas */}
        <BinaryField />

        {/* Helper bar */}
        <div className="relative z-10 mb-6 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--text-muted)]">
          <span>[RGB_DECK // 5:7 PLAYING CARD PROPORTION]</span>
          <span>{t.sceneUi.tapToFlip}</span>
        </div>

        {/* 3 Playing Cards Grid */}
        <div className="relative z-10 grid gap-6 md:grid-cols-3">
          {t.focusDomains.map((domain) => {
            const isOpen =
              revealAll ||
              Boolean(flippedIds[domain.id]) ||
              hoveredId === domain.id;
            const rgbClass = getRgbCardClass(domain.rgb);

            return (
              <div
                key={domain.id}
                className="playing-card-perspective mx-auto w-full max-w-[320px]"
                onMouseEnter={() => setHoveredId(domain.id)}
                onMouseLeave={() =>
                  setHoveredId((prev) => (prev === domain.id ? null : prev))
                }
              >
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
                    className={`playing-card-face ${rgbClass} flex flex-col justify-between rounded-2xl border border-[var(--card-rgb-border)] bg-[var(--bg-surface)]/95 p-5 backdrop-blur-md transition-shadow`}
                  >
                    {/* Top Corner Index */}
                    <div className="flex items-start justify-between font-mono">
                      <div className="leading-none">
                        <div className="text-lg font-bold text-[var(--card-rgb-text)]">
                          {domain.id}
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
                        {domain.code}
                      </div>

                      <h3 className="px-2 text-base font-bold leading-snug text-[var(--text-primary)]">
                        {domain.title}
                      </h3>

                      <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-3 py-1 font-mono text-[10px] text-[var(--text-muted)]">
                        <span>[ FLIP CARD ↻ ]</span>
                      </div>
                    </div>

                    {/* Bottom Mirrored Corner Index */}
                    <div className="flex items-end justify-between font-mono">
                      <span className="text-[10px] text-[var(--text-muted)]">
                        01001101 // DECK
                      </span>
                      <div className="rotate-180 leading-none text-right">
                        <div className="text-lg font-bold text-[var(--card-rgb-text)]">
                          {domain.id}
                        </div>
                        <div className="mt-1 text-base text-[var(--card-rgb-text)]">
                          {domain.suit}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* OPEN FACE (Revealed Back of Card after 180deg flip) */}
                  <div
                    className={`playing-card-back ${rgbClass} flex flex-col justify-between rounded-2xl border border-[var(--card-rgb-border)] bg-[var(--bg-surface)] p-5 shadow-lg`}
                  >
                    {/* Header */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-[var(--border-soft)] pb-2.5 font-mono text-xs">
                        <span className="font-bold text-[var(--card-rgb-text)]">
                          {`${domain.suit} ${domain.id} // ${domain.code}`}
                        </span>
                        <span className="rounded border border-[var(--card-rgb-border)] bg-[var(--card-rgb-bg)] px-1.5 py-0.5 text-[10px] text-[var(--card-rgb-text)]">
                          ACTIVE
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
                        KEY CAPABILITIES
                      </div>
                      <ul className="space-y-1.5 font-mono text-[11px] text-[var(--text-primary)]">
                        {domain.highlights.map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <span className="text-[var(--card-rgb-text)]">▸</span>
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
                        href="/projects"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[var(--card-rgb-text)] hover:underline"
                      >
                        {`${t.hero.exploreProjects} →`}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

