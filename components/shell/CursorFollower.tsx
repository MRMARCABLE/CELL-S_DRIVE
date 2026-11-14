"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useReducedMotion } from "@/components/home/fx/hooks/useReducedMotion";

function subscribePointer(callback: () => void) {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getPointerSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getPointerServerSnapshot() {
  return false;
}

const CURSOR_LABELS: Record<string, string> = {
  flip: "FLIP",
  inspect: "SPEC",
  decrypt: "RAW",
  key: "KEY",
  gpg: "GPG",
};

export default function CursorFollower() {
  const reducedMotion = useReducedMotion();
  const finePointer = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    getPointerServerSnapshot
  );

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const reticleRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!finePointer || reducedMotion) return;

    let rafId = 0;
    let targetX = -100;
    let targetY = -100;
    let activeLabel = "";
    let activeInteractive = false;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      const targetEl = e.target instanceof Element ? e.target : null;
      const zone = targetEl?.closest("[data-cursor]")?.getAttribute("data-cursor") ?? "";
      const mapped = CURSOR_LABELS[zone] ?? "";
      const interactive = Boolean(
        targetEl?.closest("a, button, input, select, textarea, [role='button'], [role='tab']")
      );

      activeLabel = mapped;
      activeInteractive = interactive || Boolean(mapped);

      if (!rafId) {
        rafId = window.requestAnimationFrame(() => {
          const wrapper = wrapperRef.current;
          const reticle = reticleRef.current;
          const labelEl = labelRef.current;
          if (wrapper && reticle && labelEl) {
            wrapper.style.transform = `translate3d(${targetX - 8}px, ${targetY - 8}px, 0)`;
            wrapper.style.opacity = "1";

            reticle.style.transform = activeInteractive ? "scale(1.25)" : "scale(1)";

            if (activeLabel) {
              labelEl.textContent = activeLabel;
              labelEl.style.display = "inline-flex";
            } else {
              labelEl.style.display = "none";
            }
          }
          rafId = 0;
        });
      }
    };

    const handleLeave = () => {
      if (wrapperRef.current) {
        wrapperRef.current.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [finePointer, reducedMotion]);

  if (!finePointer || reducedMotion) return null;

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[70] flex items-center gap-2 opacity-0 transition-opacity duration-150"
    >
      <div
        ref={reticleRef}
        className="h-4 w-4 rounded-[5px] border border-[var(--accent-border)] bg-[var(--accent-bg)] shadow-[0_0_12px_var(--scene-glow-1)] transition-transform duration-150"
      />
      <span
        ref={labelRef}
        style={{ display: "none" }}
        className="items-center rounded border border-[var(--accent-border)] bg-[var(--bg-elevated)]/95 px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-[var(--accent-text)] shadow-sm backdrop-blur-sm"
      />
    </div>
  );
}
