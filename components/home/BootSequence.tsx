"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { useReducedMotion } from "@/components/home/fx/hooks/useReducedMotion";

const BOOT_SESSION_KEY = "marca_boot_seen";
export const BOOT_REPLAY_EVENT = "marca-boot-replay";

// Tracks whether the current browser tab has already run BootSequence so
// navigating back from /projects via Next <Link> feels instant.
let hasBootedInTab = false;

const CHAOS_GLYPHS = ["0", "1", "✦", "+", "*", "0", "1", "·"];

interface ChaosParticle {
  angle: number;
  radius: number;
  speed: number;
  glyph: string;
  size: number;
  alpha: number;
}

export default function BootSequence() {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => !hasBootedInTab);
  const [fadingOut, setFadingOut] = useState(false);
  const [phase, setPhase] = useState<"chaos" | "coalesce">("chaos");
  const [progress, setProgress] = useState(12);
  const [runCount, setRunCount] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const phaseRef = useRef<"chaos" | "coalesce">("chaos");

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

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

  // Chaos -> Dancing Star Particle Vortex Canvas
  useEffect(() => {
    if (!visible || reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const particles: ChaosParticle[] = Array.from({ length: 84 }, (_, i) => ({
      angle: (i / 84) * Math.PI * 2 + (i % 5) * 0.3,
      radius: 90 + ((i * 37) % Math.max(180, Math.min(canvas.width, canvas.height) * 0.45)),
      speed: (i % 2 === 0 ? 1 : -1) * (0.012 + (i % 7) * 0.004),
      glyph: CHAOS_GLYPHS[i % CHAOS_GLYPHS.length],
      size: 11 + (i % 3) * 2,
      alpha: 0.25 + (i % 4) * 0.14,
    }));

    let rafId = 0;

    const render = () => {
      const isDark = document.documentElement.classList.contains("dark");
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isCoalesce = phaseRef.current === "coalesce";

      for (const p of particles) {
        p.angle += isCoalesce ? p.speed * 2.2 : p.speed;
        if (isCoalesce) {
          p.radius = Math.max(18, p.radius * 0.91);
          p.alpha = Math.max(0.04, p.alpha * 0.95);
        }

        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius;

        ctx.font = `${p.size}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (p.glyph === "✦") {
          ctx.fillStyle = isDark
            ? `rgba(126, 200, 176, ${Math.min(0.85, p.alpha + 0.35)})`
            : `rgba(47, 111, 94, ${Math.min(0.8, p.alpha + 0.3)})`;
        } else {
          ctx.fillStyle = isDark
            ? `rgba(236, 238, 242, ${p.alpha})`
            : `rgba(28, 25, 23, ${p.alpha})`;
        }

        ctx.fillText(p.glyph, x, y);
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion, runCount, visible]);

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
      className={`fixed inset-0 z-[100] h-dvh w-screen flex flex-col justify-between bg-[var(--bg-base)] px-6 py-6 sm:px-12 sm:py-9 transition-opacity duration-300 cursor-pointer select-none overflow-hidden ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Vortex Canvas Layer */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />

      {/* Top terminal bar — full-screen edge-to-edge */}
      <div className="relative z-10 flex w-full items-center justify-between gap-4 border-b border-[var(--border-soft)] pb-3.5 font-mono text-xs">
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
          className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition cursor-pointer"
        >
          {t.boot.skipLabel}
        </button>
      </div>

      {/* Center Chaos -> Dancing Star Stage */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-3xl flex-col items-center text-center space-y-6">
        <div
          className={`relative flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--accent-border)] bg-[var(--accent-bg)] font-mono text-3xl text-[var(--accent-text)] shadow-md transition-all duration-500 ${
            phase === "coalesce" ? "scale-110" : "scale-95"
          }`}
        >
          <span
            className={`transition-all duration-500 ${
              phase === "chaos"
                ? "rotate-45 opacity-80"
                : "rotate-0 opacity-100"
            }`}
          >
            ✦
          </span>
        </div>

        <div className="space-y-4 transition-all duration-500">
          <div className="font-mono text-[11px] tracking-[0.24em] text-[var(--accent-text)] uppercase">
            {phase === "chaos"
              ? "ENTROPY -> COALESCING_STAR"
              : "YOHANNES MARCEL LALOPUA // UKWMS INFORMATICS"}
          </div>
          <blockquote
            className={`max-w-2xl text-base sm:text-xl font-medium leading-relaxed text-[var(--text-primary)] transition-all duration-500 ${
              phase === "coalesce"
                ? "opacity-100 translate-y-0"
                : "opacity-75 translate-y-1"
            }`}
          >
            {`“${t.quotes.chaosStar}”`}
          </blockquote>
        </div>

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

      {/* Bottom footer hint — full-screen edge-to-edge */}
      <div className="relative z-10 flex w-full items-center justify-between border-t border-[var(--border-soft)] pt-3.5 font-mono text-[11px] text-[var(--text-muted)]">
        <span>CELL-S_DRIVE // SESSION_STAGE v2.1</span>
        <span>[CLICK ANYWHERE OR PRESS ESC TO CONTINUE]</span>
      </div>
    </div>
  );
}
