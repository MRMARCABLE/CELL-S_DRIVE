"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/home/fx/hooks/useReducedMotion";

export const MILKYWAY_STEP_EVENT = "marca-milkyway-step";
export const MILKYWAY_SKIP_EVENT = "marca-milkyway-skip";
export const MILKYWAY_REPLAY_EVENT = "marca-boot-replay";

export interface MilkyWayStepDetail {
  taps: number;
  phase: "unstable" | "bigbang";
}

interface GalaxyParticle {
  arm: number;
  normR: number;
  baseAngle: number;
  angleSpread: number;
  deepOffsetX: number;
  deepOffsetY: number;
  speed: number;
  glyph: string;
  size: number;
  heat: number;
  twinklePhase: number;
}

interface ShockRing {
  radius: number;
  maxRadius: number;
  alpha: number;
  orange: boolean;
}

const GALAXY_GLYPHS = ["0", "1", "0", "1", "·", "1", "0", "✦"];

// Module flag so client-side navigation back to "/" skips straight to settled galaxy
let hasSettledInTab = false;

export function hasMilkyWayBooted() {
  return hasSettledInTab;
}

/**
 * Single Unified Cosmic Canvas:
 * 1. Scene 00 (Boot): Renders the unstable star (White in Shadow, Black in Bone) + tap shockwaves.
 * 2. 5th Tap (Big Bang): Explodes that exact star with an Orange-Amber-Gold-Crimson gradient
 *    into the 3-arm tilted Binary Milky Way Galaxy and glides it to the right side of Hero.
 * 3. Scroll 01 -> 06: Progressively zooms into the Milky Way galaxy as the user scrolls down
 *    until the entire viewport is immersed in twinkling binary stardust ("gemerlap biner di mana-mana").
 */
export default function MilkyWayField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const COUNT = 280;
    const particles: GalaxyParticle[] = Array.from({ length: COUNT }, (_, i) => {
      const arm = i % 3;
      const normR = (i / COUNT) ** 0.78;
      // Pseudo-random deterministic dispersion for deep-zoom starfield immersion
      const seedA = ((i * 73 + 19) % 100) / 100 - 0.5;
      const seedB = ((i * 41 + 7) % 100) / 100 - 0.5;
      return {
        arm,
        normR,
        baseAngle: (arm * (Math.PI * 2)) / 3 + normR * 4.5,
        angleSpread: ((i * 29) % 19 - 9) * 0.036,
        deepOffsetX: seedA * 2.2,
        deepOffsetY: seedB * 2.2,
        speed: 0.0022 + (1 - normR) * 0.0038,
        glyph: GALAXY_GLYPHS[i % GALAXY_GLYPHS.length],
        size: normR < 0.16 ? 13 : 9.5 + (i % 3) * 1.5,
        heat: Math.max(0, 1 - normR * 1.2),
        twinklePhase: (i * 1.37) % (Math.PI * 2),
      };
    });

    let phase: "unstable" | "bigbang" | "settled" =
      hasSettledInTab || reducedMotion ? "settled" : "unstable";
    let taps = 0;
    let bigBangStart = 0;
    const rings: ShockRing[] = [];

    canvas.style.zIndex = phase === "settled" ? "1" : "95";

    const handleStep = (e: Event) => {
      const detail = (e as CustomEvent<MilkyWayStepDetail>).detail;
      if (!detail) return;
      taps = detail.taps;
      rings.push({
        radius: 14 + taps * 5,
        maxRadius: 165 + taps * 68,
        alpha: 0.78,
        orange: taps >= 3,
      });
      if (detail.phase === "bigbang" && phase !== "bigbang") {
        phase = "bigbang";
        bigBangStart = performance.now();
      }
    };

    const handleSkip = () => {
      hasSettledInTab = true;
      phase = "settled";
      canvas.style.zIndex = "1";
    };

    const handleReplay = () => {
      hasSettledInTab = false;
      phase = "unstable";
      taps = 0;
      bigBangStart = 0;
      rings.length = 0;
      canvas.style.zIndex = "95";
    };

    window.addEventListener(MILKYWAY_STEP_EVENT, handleStep);
    window.addEventListener(MILKYWAY_SKIP_EVENT, handleSkip);
    window.addEventListener(MILKYWAY_REPLAY_EVENT, handleReplay);

    let rafId = 0;
    let tick = 0;
    let smoothScroll = 0;

    const render = (now: number) => {
      tick += 1;
      const isDark = document.documentElement.classList.contains("dark");
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Compute normalized page scroll (0.0 at top Hero -> 1.0 at bottom Scene 06)
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const targetScroll =
        phase === "settled"
          ? Math.max(0, Math.min(1, window.scrollY / maxScroll))
          : 0;
      smoothScroll += (targetScroll - smoothScroll) * 0.08;

      if (phase === "unstable") {
        const cx = w * 0.5;
        const cy = h * 0.42;

        // Instability jitter grows with each user tap/scroll (0..4)
        const instability = 1 + taps * 2.4;
        const jx =
          Math.sin(tick * 0.75) * instability +
          Math.cos(tick * 1.9) * (taps * 1.4);
        const jy =
          Math.cos(tick * 0.85) * instability +
          Math.sin(tick * 2.1) * (taps * 1.4);
        const sx = cx + jx;
        const sy = cy + jy;

        // Expanding shockwave rings
        for (let i = rings.length - 1; i >= 0; i--) {
          const ring = rings[i];
          ring.radius += (ring.maxRadius - ring.radius) * 0.12 + 2.5;
          ring.alpha *= 0.92;
          if (ring.alpha < 0.02) {
            rings.splice(i, 1);
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

        // Unstable star core halo
        const haloRadius = 38 + taps * 20 + Math.sin(tick * 0.25) * 6;
        const haloGrad = ctx.createRadialGradient(
          sx,
          sy,
          2,
          sx,
          sy,
          haloRadius
        );
        if (taps >= 3) {
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

        // Glittering 4-point star spikes (White in Shadow, Black in Bone)
        const spikeLen = 18 + taps * 9 + (tick % 5) * 2.5;
        const coreSize = 4.5 + taps * 1.8;
        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(Math.sin(tick * 0.07) * (0.15 + taps * 0.08));
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
        const sparkCount = 10 + taps * 14;
        ctx.font = "11px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (let i = 0; i < sparkCount; i++) {
          const p = particles[i];
          const orbitR =
            16 +
            ((i * 13 + tick * (1.2 + taps * 0.45)) % (35 + taps * 28));
          const a = p.baseAngle + tick * 0.03 * (i % 2 === 0 ? 1 : -1);
          const px = sx + Math.cos(a) * orbitR;
          const py = sy + Math.sin(a) * orbitR;
          const alpha = Math.max(0.12, 0.68 - orbitR / (42 + taps * 30));

          if (taps >= 3 && i % 3 === 0) {
            ctx.fillStyle = `rgba(255, 115, 20, ${alpha})`;
          } else {
            ctx.fillStyle = isDark
              ? `rgba(255, 255, 255, ${alpha})`
              : `rgba(20, 18, 16, ${alpha})`;
          }
          ctx.fillText(i % 2 === 0 ? "1" : "0", px, py);
        }
      } else {
        // PHASE "bigbang" -> seamlessly becomes "settled" (THE SINGLE MILKY WAY)
        const elapsed =
          phase === "bigbang" ? Math.max(0, now - bigBangStart) : 2000;
        const bangProgress = Math.min(1, elapsed / 1750);
        const bangEase = 1 - (1 - bangProgress) ** 3;

        if (phase === "bigbang" && bangProgress >= 1) {
          hasSettledInTab = true;
          phase = "settled";
          canvas.style.zIndex = "1";
        }

        // Right-side Hero anchor (at scroll = 0) -> pans to center (0.5, 0.5) as user scrolls down
        const heroXRatio = w >= 1024 ? 0.72 : 0.66;
        const heroYRatio = 0.47;

        // During Big Bang (0..1): glides from boot star center (0.5, 0.42) to Hero right (heroXRatio, heroYRatio)
        // During Scroll (0..1): glides from Hero right (heroXRatio, heroYRatio) to center (0.5, 0.5)
        const settledXRatio = heroXRatio + (0.5 - heroXRatio) * smoothScroll;
        const settledYRatio = heroYRatio + (0.5 - heroYRatio) * smoothScroll;

        const cx =
          w * (0.5 + (settledXRatio - 0.5) * bangEase);
        const cy =
          h * (0.42 + (settledYRatio - 0.42) * bangEase);

        // Continuous Zoom-In as user scrolls down (1.0x at Hero -> 5.6x at bottom)
        const zoomFactor = 1 + smoothScroll ** 1.35 * 4.6;
        const baseRadius = Math.min(w, h) * 0.52 * bangEase;
        const zoomedRadius = baseRadius * zoomFactor;

        // 1. Big Bang Fireball Flash + Persistent Galactic Core Glow
        // As we zoom deep into the galaxy (smoothScroll -> 1), core glow softens so individual binary stars shine
        const flashBoost =
          phase === "bigbang" ? Math.max(0, 1 - bangProgress * 1.1) : 0;
        const coreVisibility = Math.max(0.18, 1 - smoothScroll * 0.75);
        const glowRadius =
          baseRadius * (0.65 + flashBoost * 0.85) * (1 + smoothScroll * 0.6);

        const coreGlow = ctx.createRadialGradient(
          cx,
          cy,
          2,
          cx,
          cy,
          Math.max(10, glowRadius)
        );
        if (isDark) {
          coreGlow.addColorStop(
            0,
            `rgba(255, 232, 175, ${Math.min(0.95, 0.34 * coreVisibility + flashBoost * 0.65)})`
          );
          coreGlow.addColorStop(
            0.22,
            `rgba(255, 138, 32, ${Math.min(0.85, 0.2 * coreVisibility + flashBoost * 0.55)})`
          );
          coreGlow.addColorStop(
            0.58,
            `rgba(126, 200, 176, ${0.08 * coreVisibility})`
          );
          coreGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        } else {
          coreGlow.addColorStop(
            0,
            `rgba(20, 18, 16, ${Math.min(0.85, 0.24 * coreVisibility + flashBoost * 0.45)})`
          );
          coreGlow.addColorStop(
            0.24,
            `rgba(234, 88, 12, ${Math.min(0.75, 0.16 * coreVisibility + flashBoost * 0.45)})`
          );
          coreGlow.addColorStop(
            0.6,
            `rgba(47, 111, 94, ${0.06 * coreVisibility})`
          );
          coreGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        }
        ctx.fillStyle = coreGlow;
        ctx.beginPath();
        ctx.arc(cx, cy, Math.max(10, glowRadius), 0, Math.PI * 2);
        ctx.fill();

        // Center Star Nucleus (fades out gently as we zoom past the core into the binary starfield)
        const nucleusAlpha = Math.max(0, (1 - smoothScroll * 1.4) * bangEase);
        if (nucleusAlpha > 0.02) {
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = "bold 16px monospace";
          ctx.fillStyle = isDark
            ? `rgba(255, 245, 220, ${nucleusAlpha * 0.9})`
            : `rgba(20, 18, 16, ${nucleusAlpha * 0.85})`;
          ctx.fillText("✦", cx, cy);
        }

        // 2. Tilted Milky Way Spiral Arms -> Zooming Into Full-Screen Twinkling Binary Starfield
        // Disk tilt opens up as we zoom inside the galaxy (0.46 -> 0.96)
        const tilt = 0.46 + smoothScroll * 0.5;
        const planeAngle = -0.34 * (1 - smoothScroll * 0.5);
        const cosP = Math.cos(planeAngle);
        const sinP = Math.sin(planeAngle);

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Rotation slows down gracefully as we zoom deep inside so twinkling binary stars feel calm
        const speedMultiplier =
          (phase === "bigbang" ? 2.4 - bangEase * 1.4 : 1) *
          (1 - smoothScroll * 0.65);

        for (const p of particles) {
          if (!reducedMotion) {
            p.baseAngle += p.speed * speedMultiplier;
          }

          const r = 8 + p.normR * zoomedRadius;
          const theta = p.baseAngle + p.angleSpread;

          // Spiral plane coordinates + deep-scroll spatial dispersion so stars fill the whole screen at the bottom
          const deepSpreadX = p.deepOffsetX * smoothScroll * w * 0.55;
          const deepSpreadY = p.deepOffsetY * smoothScroll * h * 0.55;

          const lx = Math.cos(theta) * r + deepSpreadX;
          const ly = Math.sin(theta) * r * tilt + deepSpreadY;

          const x = cx + (lx * cosP - ly * sinP);
          const y = cy + (lx * sinP + ly * cosP);

          // Wrap particles that zoom past the viewport back into the screen at high scroll
          // so the bottom of the page is filled with twinkling binary stars everywhere
          const drawX =
            smoothScroll > 0.25
              ? ((x % w) + w) % w
              : x;
          const drawY =
            smoothScroll > 0.25
              ? ((y % h) + h) % h
              : y;

          // Screen-blend between direct spiral position and wrapped starfield position
          const blendWrap = Math.max(0, Math.min(1, (smoothScroll - 0.25) / 0.45));
          const finalX = x * (1 - blendWrap) + drawX * blendWrap;
          const finalY = y * (1 - blendWrap) + drawY * blendWrap;

          // Skip off-screen draws for performance
          if (finalX < -24 || finalX > w + 24 || finalY < -24 || finalY > h + 24) {
            continue;
          }

          // Twinkle animation ("gemerlap biner di mana-mana")
          const twinkle =
            0.55 + 0.45 * Math.sin(now * 0.0042 + p.twinklePhase);

          // At top (scroll=0): smooth radial edge fade toward the sides of the galaxy
          // At bottom (scroll=1): uniform twinkling binary shimmer across the entire screen
          const radialFade = Math.max(0.04, (1 - p.normR) ** 1.5);
          const deepFieldAlpha = 0.52 * twinkle;
          const alpha =
            radialFade * (1 - smoothScroll * 0.82) * (0.75 + 0.25 * twinkle) +
            deepFieldAlpha * smoothScroll;

          const glyphSize = p.size * (1 + smoothScroll * 0.18);
          ctx.font = `${glyphSize.toFixed(1)}px monospace`;

          const isWarmCore =
            p.heat > 0.52 || (phase === "bigbang" && bangProgress < 0.45);

          if (isWarmCore) {
            ctx.fillStyle = isDark
              ? `rgba(255, 172, 78, ${Math.min(0.88, alpha * 1.15)})`
              : `rgba(194, 65, 12, ${Math.min(0.75, alpha * 1.05)})`;
          } else {
            ctx.fillStyle = isDark
              ? `rgba(126, 200, 176, ${Math.min(0.78, alpha * 0.95)})`
              : `rgba(47, 111, 94, ${Math.min(0.68, alpha * 0.88)})`;
          }

          ctx.fillText(p.glyph, finalX, finalY);
        }
      }

      if (!reducedMotion) {
        rafId = requestAnimationFrame(render);
      }
    };

    rafId = requestAnimationFrame(render);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener(MILKYWAY_STEP_EVENT, handleStep);
      window.removeEventListener(MILKYWAY_SKIP_EVENT, handleSkip);
      window.removeEventListener(MILKYWAY_REPLAY_EVENT, handleReplay);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full"
    />
  );
}
