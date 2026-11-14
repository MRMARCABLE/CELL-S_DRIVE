"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { useReducedMotion } from "@/components/home/fx/hooks/useReducedMotion";
import { playSfx } from "@/components/shell/sound";

export const BOOT_REPLAY_EVENT = "marca-boot-replay";
const REQUIRED_TAPS = 5;

// Tracks whether the current browser tab has already run BootSequence so
// client navigation back from /projects or /cv feels instant.
let hasBootedInTab = false;

interface BangParticle {
  angle: number;
  armOffset: number;
  radialSpeed: number;
  radius: number;
  targetSpiralRadius: number;
  glyph: string;
  size: number;
  heat: number; // 1 = bright orange/gold core, 0 = outer binary arm
}

interface ShockRing {
  radius: number;
  maxRadius: number;
  alpha: number;
  orange: boolean;
}

export default function BootSequence() {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => !hasBootedInTab);
  const [fadingOut, setFadingOut] = useState(false);
  const [taps, setTaps] = useState(0);
  const [phase, setPhase] = useState<"unstable" | "bigbang">("unstable");
  const [runCount, setRunCount] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const tapsRef = useRef(0);
  const phaseRef = useRef<"unstable" | "bigbang">("unstable");
  const bigBangStartRef = useRef<number>(0);
  const ringsRef = useRef<ShockRing[]>([]);
  const lastWheelRef = useRef<number>(0);

  const dismiss = useCallback(() => {
    hasBootedInTab = true;
    setFadingOut(true);
    window.setTimeout(() => {
      setVisible(false);
    }, 580);
  }, []);

  const triggerStep = useCallback(() => {
    if (phaseRef.current === "bigbang") return;

    const next = Math.min(REQUIRED_TAPS, tapsRef.current + 1);
    tapsRef.current = next;
    setTaps(next);

    // Spawn a shockwave ring on the canvas
    ringsRef.current.push({
      radius: 14 + next * 5,
      maxRadius: 160 + next * 65,
      alpha: 0.75,
      orange: next >= 3,
    });

    if (next < REQUIRED_TAPS) {
      playSfx("pulse");
    } else {
      playSfx("bigbang");
      phaseRef.current = "bigbang";
      bigBangStartRef.current = performance.now();
      setPhase("bigbang");
    }
  }, []);

  useEffect(() => {
    const handleReplay = () => {
      hasBootedInTab = false;
      tapsRef.current = 0;
      phaseRef.current = "unstable";
      bigBangStartRef.current = 0;
      ringsRef.current = [];
      setTaps(0);
      setPhase("unstable");
      setFadingOut(false);
      setVisible(true);
      setRunCount((c) => c + 1);
    };
    window.addEventListener(BOOT_REPLAY_EVENT, handleReplay);
    return () => window.removeEventListener(BOOT_REPLAY_EVENT, handleReplay);
  }, []);

  // Auto-transition into Hero after Big Bang explosion forms the Milky Way spiral
  useEffect(() => {
    if (!visible) return;
    if (reducedMotion) {
      hasBootedInTab = true;
      const id = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(id);
    }
    if (phase !== "bigbang") return;

    const timer = window.setTimeout(() => {
      dismiss();
    }, 1750);
    return () => window.clearTimeout(timer);
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
        dismiss();
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

  // Canvas Engine: Unstable Star -> Orange Gradient Big Bang -> Binary Milky Way Formation
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

    const glyphs = ["0", "1", "0", "1", "✦", "·", "1", "0"];
    const particles: BangParticle[] = Array.from({ length: 180 }, (_, i) => {
      const arm = i % 3;
      const norm = (i / 180) ** 0.85;
      return {
        angle: (arm * (Math.PI * 2)) / 3 + norm * 3.8 + (i % 7) * 0.08,
        armOffset: ((i % 11) - 5) * 0.045,
        radialSpeed: 4.5 + (i % 13) * 1.35,
        radius: 4 + (i % 5) * 2,
        targetSpiralRadius: 28 + norm * 420,
        glyph: glyphs[i % glyphs.length],
        size: i % 6 === 0 ? 14 : 10 + (i % 3) * 2,
        heat: Math.max(0, 1 - norm * 1.15),
      };
    });

    let rafId = 0;
    let tick = 0;

    const render = (now: number) => {
      tick += 1;
      const isDark = document.documentElement.classList.contains("dark");
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const currentPhase = phaseRef.current;
      const currentTaps = tapsRef.current;

      if (currentPhase === "unstable") {
        const cx = w / 2;
        const cy = h * 0.42;

        // Instability jitter increases with each tap (0..4)
        const instability = 1 + currentTaps * 2.4;
        const jitterX =
          Math.sin(tick * 0.75) * instability +
          Math.cos(tick * 1.9) * (currentTaps * 1.4);
        const jitterY =
          Math.cos(tick * 0.85) * instability +
          Math.sin(tick * 2.1) * (currentTaps * 1.4);

        const sx = cx + jitterX;
        const sy = cy + jitterY;

        // Draw expanding shockwave rings from user taps
        for (let i = ringsRef.current.length - 1; i >= 0; i--) {
          const ring = ringsRef.current[i];
          ring.radius += (ring.maxRadius - ring.radius) * 0.12 + 2.5;
          ring.alpha *= 0.92;
          if (ring.alpha < 0.02) {
            ringsRef.current.splice(i, 1);
            continue;
          }
          ctx.beginPath();
          ctx.arc(sx, sy, ring.radius, 0, Math.PI * 2);
          ctx.strokeStyle = ring.orange
            ? `rgba(255, 122, 0, ${ring.alpha})`
            : isDark
              ? `rgba(255, 255, 255, ${ring.alpha * 0.75})`
              : `rgba(20, 18, 16, ${ring.alpha * 0.75})`;
          ctx.lineWidth = 1.6;
          ctx.stroke();
        }

        // Ambient halo around the unstable star
        const haloRadius = 38 + currentTaps * 20 + Math.sin(tick * 0.25) * 6;
        const haloGrad = ctx.createRadialGradient(
          sx,
          sy,
          2,
          sx,
          sy,
          haloRadius
        );

        if (currentTaps >= 3) {
          // Orange pressure leaking inside the core right before Big Bang
          haloGrad.addColorStop(
            0,
            isDark ? "rgba(255, 255, 255, 0.95)" : "rgba(20, 18, 16, 0.95)"
          );
          haloGrad.addColorStop(0.38, "rgba(255, 115, 0, 0.55)");
          haloGrad.addColorStop(0.72, "rgba(255, 60, 0, 0.2)");
          haloGrad.addColorStop(1, "rgba(255, 60, 0, 0)");
        } else if (isDark) {
          haloGrad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
          haloGrad.addColorStop(0.35, "rgba(255, 255, 255, 0.28)");
          haloGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        } else {
          haloGrad.addColorStop(0, "rgba(20, 18, 16, 0.9)");
          haloGrad.addColorStop(0.35, "rgba(20, 18, 16, 0.22)");
          haloGrad.addColorStop(1, "rgba(20, 18, 16, 0)");
        }

        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(sx, sy, haloRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw glittering 4-point + diagonal star rays (White in Shadow, Black in Bone)
        const spikeLen = 18 + currentTaps * 9 + (tick % 5) * 2.5;
        const coreSize = 4.5 + currentTaps * 1.8;
        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(Math.sin(tick * 0.07) * (0.15 + currentTaps * 0.08));

        ctx.strokeStyle = isDark ? "#ffffff" : "#141210";
        ctx.lineWidth = 1.8;
        for (let r = 0; r < 4; r++) {
          ctx.rotate(Math.PI / 4);
          const len = r % 2 === 0 ? spikeLen : spikeLen * 0.52;
          ctx.beginPath();
          ctx.moveTo(-len, 0);
          ctx.lineTo(len, 0);
          ctx.stroke();
        }

        ctx.fillStyle = isDark ? "#ffffff" : "#141210";
        ctx.beginPath();
        ctx.arc(0, 0, coreSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Leaking binary micro-sparks around the unstable star
        const sparkCount = 8 + currentTaps * 12;
        ctx.font = "11px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (let i = 0; i < sparkCount; i++) {
          const p = particles[i];
          const orbitR =
            16 +
            ((i * 13 + tick * (1.2 + currentTaps * 0.45)) %
              (35 + currentTaps * 28));
          const a = p.angle + tick * 0.03 * (i % 2 === 0 ? 1 : -1);
          const px = sx + Math.cos(a) * orbitR;
          const py = sy + Math.sin(a) * orbitR;
          const alpha = Math.max(
            0.12,
            0.68 - orbitR / (42 + currentTaps * 30)
          );

          if (currentTaps >= 3 && i % 3 === 0) {
            ctx.fillStyle = `rgba(255, 115, 20, ${alpha})`;
          } else {
            ctx.fillStyle = isDark
              ? `rgba(255, 255, 255, ${alpha})`
              : `rgba(20, 18, 16, ${alpha})`;
          }
          ctx.fillText(i % 2 === 0 ? "1" : "0", px, py);
        }
      } else {
        // PHASE 2: ORANGE GRADIENT BIG BANG EXPLOSION -> BINARY MILKY WAY SPIRAL
        const elapsed = Math.max(0, now - bigBangStartRef.current);
        const progress = Math.min(1, elapsed / 1650);
        // Ease out cubic
        const ease = 1 - (1 - progress) ** 3;

        // Center smoothly glides toward the right side of the Hero section (cx: 50% -> 66%)
        const cx = w * (0.5 + ease * 0.16);
        const cy = h * (0.42 + ease * 0.06);

        // 1. Expanding Orange-Amber-Gold Big Bang Fireball Gradient
        const blastRadius = Math.max(w, h) * (0.08 + ease * 1.05);
        const flashAlpha = Math.max(0, 1 - progress * 1.15);
        const bangGrad = ctx.createRadialGradient(
          cx,
          cy,
          4,
          cx,
          cy,
          blastRadius
        );
        bangGrad.addColorStop(
          0,
          `rgba(255, 240, 195, ${Math.min(0.95, flashAlpha + 0.25)})`
        );
        bangGrad.addColorStop(
          0.18,
          `rgba(255, 145, 0, ${0.85 * (1 - progress * 0.55)})`
        );
        bangGrad.addColorStop(
          0.42,
          `rgba(255, 68, 0, ${0.52 * (1 - progress * 0.65)})`
        );
        bangGrad.addColorStop(
          0.72,
          `rgba(217, 40, 20, ${0.22 * (1 - progress * 0.75)})`
        );
        bangGrad.addColorStop(1, "rgba(255, 68, 0, 0)");

        ctx.fillStyle = bangGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, blastRadius, 0, Math.PI * 2);
        ctx.fill();

        // 2. Binary & Stardust Particles exploding outward and curling into tilted Milky Way arms
        const tilt = 0.48;
        const planeAngle = -0.34;
        const cosPlane = Math.cos(planeAngle);
        const sinPlane = Math.sin(planeAngle);

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (const p of particles) {
          p.angle += 0.018 + p.heat * 0.016;
          const currentR = p.targetSpiralRadius * ease;

          // Local tilted galaxy coordinates
          const lx = Math.cos(p.angle + p.armOffset) * currentR;
          const ly = Math.sin(p.angle + p.armOffset) * currentR * tilt;

          // Rotate by galactic plane tilt
          const gx = cx + (lx * cosPlane - ly * sinPlane);
          const gy = cy + (lx * sinPlane + ly * cosPlane);

          // Fade smoothly toward the outer edges (memudar semakin ke samping)
          const edgeFade = Math.max(
            0.05,
            (1 - currentR / 460) ** 1.4
          );

          ctx.font = `${p.size}px monospace`;
          if (p.heat > 0.52 || progress < 0.38) {
            // Orange-amber-gold Big Bang core particles
            ctx.fillStyle =
              p.heat > 0.78
                ? `rgba(255, 220, 130, ${Math.min(0.95, edgeFade + 0.25)})`
                : `rgba(255, 120, 24, ${Math.min(0.9, edgeFade + 0.2)})`;
          } else {
            ctx.fillStyle = isDark
              ? `rgba(126, 200, 176, ${edgeFade * 0.85})`
              : `rgba(47, 111, 94, ${edgeFade * 0.85})`;
          }

          ctx.fillText(p.glyph, gx, gy);
        }
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

  if (!visible || reducedMotion) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cosmic Star Boot Sequence"
      onClick={triggerStep}
      className={`fixed inset-0 z-[100] h-dvh w-screen flex flex-col justify-between bg-[var(--bg-base)] px-6 py-6 sm:px-12 sm:py-9 transition-opacity duration-500 cursor-pointer select-none overflow-hidden ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Interactive Star & Big Bang Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />

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
            dismiss();
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
  );
}
