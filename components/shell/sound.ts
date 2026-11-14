"use client";

export type SfxKind = "key" | "flip" | "cmd" | "open";

const SFX_STORAGE_KEY = "marca_sfx";

let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sharedAudioCtx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (Ctor) {
      sharedAudioCtx = new Ctor();
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === "suspended") {
    void sharedAudioCtx.resume();
  }
  return sharedAudioCtx;
}

export function isSfxEnabled(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.sfx === "on";
}

export function setSfxEnabled(enabled: boolean): void {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.sfx = enabled ? "on" : "off";
  try {
    localStorage.setItem(SFX_STORAGE_KEY, enabled ? "on" : "off");
  } catch {
    // Ignore storage errors
  }
}

export function toggleSfx(force?: boolean): boolean {
  const next = typeof force === "boolean" ? force : !isSfxEnabled();
  setSfxEnabled(next);
  if (next) {
    playSfx("open", true);
  }
  return next;
}

export function playSfx(kind: SfxKind, forcePlay = false): void {
  if (!forcePlay && !isSfxEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  if (kind === "key") {
    // Mechanical tactile switch click (8ms triangle transient)
    osc.type = "triangle";
    osc.frequency.setValueAtTime(920, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.018);
    gain.gain.setValueAtTime(0.045, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);
    osc.start(now);
    osc.stop(now + 0.02);
  } else if (kind === "flip") {
    // Soft playing-card brush sweep
    osc.type = "sine";
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(640, now + 0.045);
    gain.gain.setValueAtTime(0.035, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
    osc.start(now);
    osc.stop(now + 0.055);
  } else if (kind === "cmd") {
    // Terminal command execution chirp
    osc.type = "sine";
    osc.frequency.setValueAtTime(580, now);
    osc.frequency.setValueAtTime(860, now + 0.016);
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);
    osc.start(now);
    osc.stop(now + 0.04);
  } else {
    // HUD / Command Palette open chime
    osc.type = "sine";
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.045);
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
    osc.start(now);
    osc.stop(now + 0.055);
  }
}
