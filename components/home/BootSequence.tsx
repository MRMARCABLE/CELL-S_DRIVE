"use client";

import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { useReducedMotion } from "@/components/home/fx/hooks/useReducedMotion";

const BOOT_SESSION_KEY = "marca_boot_seen";
export const BOOT_REPLAY_EVENT = "marca-boot-replay";

// Tracks whether the current browser tab has already run BootSequence so
// navigating back from /projects via Next <Link> feels instant.
let hasBootedInTab = false;

const CHAOS_LINES = [
  "01001101 01000001 01010010 01000011 01000001 // INIT_CORE",
  "SYS.NRP::5803025050 >> MOUNTING /dev/chaos_star [OK]",
  "LOADING MODULE: AI.AGENT ♦ // SYS.EMBED ♣ // WEB.3D_UX ♠",
  "01110011 01110100 01100001 01110010 :: ENTROPY -> HARMONY",
];

export default function BootSequence() {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => !hasBootedInTab);
  const [fadingOut, setFadingOut] = useState(false);
  const [phase, setPhase] = useState<"chaos" | "coalesce">("chaos");
  const [progress, setProgress] = useState(12);
  const [runCount, setRunCount] = useState(0);

  const dismiss = useCallback(() => {
    hasBootedInTab = true;
    setFadingOut(true);
    try {
      sessionStorage.setItem(BOOT_SESSION_KEY, "1");
    } catch {
      // Ignore storage errors in restricted environments
    }
    window.setTimeout(() => {
      setVisible(false);
    }, 260);
  }, []);

  useEffect(() => {
    const handleReplay = () => {
      hasBootedInTab = false;
      setFadingOut(false);
      setPhase("chaos");
      setProgress(12);
      setVisible(true);
      setRunCount((c) => c + 1);
    };
    window.addEventListener(BOOT_REPLAY_EVENT, handleReplay);
    return () => window.removeEventListener(BOOT_REPLAY_EVENT, handleReplay);
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (reducedMotion) {
      hasBootedInTab = true;
      const id = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(id);
    }

    let seenInSession = false;
    try {
      seenInSession = sessionStorage.getItem(BOOT_SESSION_KEY) === "1";
    } catch {
      seenInSession = false;
    }

    const totalMs = runCount > 0 ? 2550 : seenInSession ? 850 : 2550;
    const coalesceAt = runCount > 0 ? 1050 : seenInSession ? 260 : 1050;

    const p1 = window.setTimeout(() => setProgress(58), coalesceAt * 0.5);
    const p2 = window.setTimeout(() => {
      setPhase("coalesce");
      setProgress(100);
    }, coalesceAt);
    const p3 = window.setTimeout(() => {
      dismiss();
    }, totalMs);

    return () => {
      window.clearTimeout(p1);
      window.clearTimeout(p2);
      window.clearTimeout(p3);
    };
  }, [dismiss, reducedMotion, runCount, visible]);

  useEffect(() => {
    if (!visible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        dismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dismiss, visible]);

  if (!visible || reducedMotion) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Terminal Boot Sequence"
      onClick={dismiss}
      className={`fixed inset-0 z-[80] flex flex-col justify-between bg-[var(--bg-base)]/95 backdrop-blur-xl px-6 py-8 sm:px-12 sm:py-10 transition-opacity duration-300 cursor-pointer select-none ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Top terminal bar */}
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 border-b border-[var(--border-soft)] pb-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent-text)] animate-pulse" />
          <span className="text-[var(--accent-text)]">marca@ukwms:~$</span>
          <span>marca --boot --seed=5803025050</span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            dismiss();
          }}
          className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition"
        >
          {t.boot.skipLabel}
        </button>
      </div>

      {/* Center Chaos -> Dancing Star Stage */}
      <div className="mx-auto my-auto flex w-full max-w-3xl flex-col items-center text-center space-y-6">
        {/* Star / Chaos Glyph */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--accent-border)] bg-[var(--accent-bg)] font-mono text-2xl text-[var(--accent-text)] shadow-sm transition-transform duration-500">
          <span
            className={`transition-all duration-500 ${
              phase === "chaos"
                ? "scale-90 rotate-45 opacity-80"
                : "scale-110 rotate-0 opacity-100"
            }`}
          >
            ✦
          </span>
        </div>

        {phase === "chaos" ? (
          <div className="w-full max-w-xl space-y-2 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-surface)] p-4 text-left font-mono text-[11px] text-[var(--text-muted)]">
            {CHAOS_LINES.map((line) => (
              <div key={line} className="truncate">
                <span className="text-[var(--accent-text)] mr-2">&gt;</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 transition-all duration-500">
            <div className="font-mono text-[11px] tracking-[0.24em] text-[var(--accent-text)] uppercase">
              YOHANNES MARCEL LALOPUA // UKWMS INFORMATICS
            </div>
            <blockquote className="max-w-2xl text-base sm:text-xl font-medium leading-relaxed text-[var(--text-primary)]">
              {`“${t.quotes.chaosStar}”`}
            </blockquote>
          </div>
        )}

        {/* Progress indicator */}
        <div className="w-full max-w-md space-y-2">
          <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--border-soft)]">
            <div
              className="h-full bg-[var(--accent-text)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-muted)]">
            <span>{t.boot.initializing}</span>
            <span>{`${progress}%`}</span>
          </div>
        </div>
      </div>

      {/* Bottom footer hint */}
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between border-t border-[var(--border-soft)] pt-3 font-mono text-[11px] text-[var(--text-muted)]">
        <span>CELL-S_DRIVE // SESSION_STAGE v2.0</span>
        <span>[CLICK ANYWHERE OR PRESS ESC TO CONTINUE]</span>
      </div>
    </div>
  );
}

