"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import {
  MILKYWAY_REPLAY_EVENT,
  MILKYWAY_SKIP_EVENT,
  MILKYWAY_STEP_EVENT,
  type MilkyWayStepDetail,
  hasMilkyWayBooted,
} from "@/components/home/fx/MilkyWayField";
import { useReducedMotion } from "@/components/home/fx/hooks/useReducedMotion";
import { playSfx } from "@/components/shell/sound";

export const BOOT_REPLAY_EVENT = MILKYWAY_REPLAY_EVENT;
const REQUIRED_TAPS = 5;

export default function BootSequence() {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => !hasMilkyWayBooted());
  const [fadingOut, setFadingOut] = useState(false);
  const [taps, setTaps] = useState(0);
  const [phase, setPhase] = useState<"unstable" | "bigbang">("unstable");

  const tapsRef = useRef(0);
  const phaseRef = useRef<"unstable" | "bigbang">("unstable");
  const lastWheelRef = useRef<number>(0);

  const dismiss = useCallback((skipped = false) => {
    if (skipped) {
      window.dispatchEvent(new CustomEvent(MILKYWAY_SKIP_EVENT));
    }
    setFadingOut(true);
    window.setTimeout(() => {
      setVisible(false);
    }, 620);
  }, []);

  const triggerStep = useCallback(() => {
    if (phaseRef.current === "bigbang") return;

    const next = Math.min(REQUIRED_TAPS, tapsRef.current + 1);
    tapsRef.current = next;
    setTaps(next);

    const nextPhase: "unstable" | "bigbang" =
      next >= REQUIRED_TAPS ? "bigbang" : "unstable";

    if (nextPhase === "bigbang") {
      playSfx("bigbang");
      phaseRef.current = "bigbang";
      setPhase("bigbang");
    } else {
      playSfx("pulse");
    }

    window.dispatchEvent(
      new CustomEvent<MilkyWayStepDetail>(MILKYWAY_STEP_EVENT, {
        detail: { taps: next, phase: nextPhase },
      })
    );
  }, []);

  useEffect(() => {
    const handleReplay = () => {
      tapsRef.current = 0;
      phaseRef.current = "unstable";
      setTaps(0);
      setPhase("unstable");
      setFadingOut(false);
      setVisible(true);
    };
    window.addEventListener(BOOT_REPLAY_EVENT, handleReplay);
    return () => window.removeEventListener(BOOT_REPLAY_EVENT, handleReplay);
  }, []);

  // Fade out the boot curtain & HUD as the Big Bang forms the Milky Way and glides to Hero
  useEffect(() => {
    if (!visible) return;
    if (reducedMotion) {
      const id = window.setTimeout(() => dismiss(true), 0);
      return () => window.clearTimeout(id);
    }
    if (phase !== "bigbang") return;

    const fadeTimer = window.setTimeout(() => {
      setFadingOut(true);
    }, 850);
    const hideTimer = window.setTimeout(() => {
      setVisible(false);
    }, 1720);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, [dismiss, phase, reducedMotion, visible]);

  // Listen to wheel (scroll) & keyboard events to charge the unstable star
  useEffect(() => {
    if (!visible) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = performance.now();
      if (now - lastWheelRef.current < 210) return;
      lastWheelRef.current = now;
      triggerStep();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        dismiss(true);
        return;
      }
      if (
        e.key === " " ||
        e.key === "Enter" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowUp"
      ) {
        e.preventDefault();
        triggerStep();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dismiss, triggerStep, visible]);

  if (!visible || reducedMotion) return null;

  return (
    <>
      {/* Backdrop Curtain (z-[90]) beneath MilkyWayField (z-[95]) so the exploding star IS the background Milky Way */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-[90] h-dvh w-screen bg-[var(--bg-base)] transition-opacity duration-700 pointer-events-none ${
          fadingOut ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Interactive Boot HUD Layer (z-[100]) above MilkyWayField */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cosmic Star Boot Sequence"
        onClick={triggerStep}
        className={`fixed inset-0 z-[100] h-dvh w-screen flex flex-col justify-between bg-transparent px-6 py-6 sm:px-12 sm:py-9 transition-opacity duration-700 cursor-pointer select-none overflow-hidden ${
          fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Minimal Top Bar */}
        <div className="relative z-10 flex w-full items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                phase === "bigbang"
                  ? "bg-orange-500 animate-ping"
                  : "bg-[var(--text-primary)] animate-pulse"
              }`}
            />
            <span>marca@ukwms:~$ ./ignite --singularity</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              dismiss(true);
            }}
            className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)]/80 px-2.5 py-1 font-mono text-[11px] text-[var(--text-muted)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition cursor-pointer"
          >
            {t.boot.skipLabel}
          </button>
        </div>

        {/* Bottom-Center Quote 1 & Interactive Tap/Scroll Resonance Meter */}
        <div className="relative z-10 mx-auto mt-auto mb-6 sm:mb-10 flex w-full max-w-2xl flex-col items-center text-center space-y-5">
          <blockquote
            className={`max-w-xl text-sm sm:text-lg font-medium italic leading-relaxed transition-all duration-500 ${
              phase === "bigbang"
                ? "text-orange-500 dark:text-amber-300 scale-105"
                : "text-[var(--text-primary)]"
            }`}
          >
            {`“${t.quotes.chaosStar}”`}
          </blockquote>

          {/* 5-Step Resonance Charge Nodes */}
          <div className="flex flex-col items-center gap-2.5 font-mono">
            <div className="flex items-center gap-2">
              {Array.from({ length: REQUIRED_TAPS }, (_, idx) => {
                const active = idx < taps;
                return (
                  <span
                    key={idx}
                    className={`h-2 w-7 rounded-full border transition-all duration-200 ${
                      active
                        ? idx >= 3
                          ? "border-orange-500 bg-gradient-to-r from-orange-500 to-amber-400 shadow-[0_0_12px_rgba(255,120,0,0.75)]"
                          : "border-[var(--text-primary)] bg-[var(--text-primary)]"
                        : "border-[var(--border-hover)] bg-transparent"
                    }`}
                  />
                );
              })}
            </div>

            <div className="text-[11px] tracking-[0.2em] text-[var(--text-secondary)] uppercase">
              {phase === "bigbang"
                ? t.boot.bigBangLabel
                : `${t.boot.tapPrompt} [${taps}/${REQUIRED_TAPS}]`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
