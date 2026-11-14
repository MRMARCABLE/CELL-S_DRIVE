"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ScenePrompt from "@/components/home/ScenePrompt";
import { profile } from "@/data/portfolio";

interface CliLogEntry {
  id: number;
  command: string;
  lines: string[];
  accent?: boolean;
}

const QUICK_COMMANDS = [
  "help",
  "neofetch",
  "sudo hire marcel",
  "quote",
  "chaos",
  "coffee",
  "clear",
];

export default function ConnectScene() {
  const { t, locale } = useLanguage();
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<CliLogEntry[]>([
    {
      id: 1,
      command: "status --channels",
      lines: [
        "READY // 5 direct channels mounted ([1] GitHub .. [5] Email).",
        "Type 'help' or click a command pill below to interact.",
      ],
    },
  ]);

  const runCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;
    const cmd = trimmed.toLowerCase();

    if (cmd === "clear" || cmd === "cls") {
      setLogs([]);
      setInput("");
      return;
    }

    let lines: string[] = [];
    let accent = false;

    if (cmd === "help") {
      lines = [
        "Available commands in marca-sh:",
        "  1 | github             → Open GitHub (github.com/MRMARCABLE)",
        "  2 | linkedin           → Open LinkedIn profile",
        "  3 | credly             → Open verified Credly badges",
        "  4 | git-eng            → Open UKWMS Git-Eng repository",
        "  5 | email              → Compose email to yohanneslalopua@gmail.com",
        "  neofetch               → Display system & developer specifications",
        "  sudo hire marcel       → Execute internship/collaboration handshake",
        "  quote                  → Print core philosophical epigraphs",
        "  chaos                  → Trigger binary star burst",
        "  coffee                 → Check caffeine & build telemetry",
        "  clear                  → Clear terminal buffer",
      ];
    } else if (cmd === "neofetch") {
      accent = true;
      lines = [
        "   ✦  MARCA.OS // v2.0      marca@ukwms",
        "  ╱ ╲  ───────────────      ───────────",
        " ✦   ✦ OS:                  CELL-S_DRIVE (Next.js 16 + React 19)",
        "  ╲ ╱  Host:                UKWMS Informatics (NRP 5803025050)",
        "   ✦   Location:            Surabaya, Indonesia",
        "       Pillars:             AI.AGENT ♦ | SYS.EMBED ♣ | WEB.3D_UX ♠",
        "       Credentials:         4× Credly Verified + Codelamp Appreciation",
        `       Status:              ${t.hero.availability}`,
      ];
    } else if (cmd === "sudo hire marcel" || cmd === "hire") {
      accent = true;
      lines = [
        "[sudo] password for visitor: ********",
        "AUTHENTICATION VERIFIED ✓ — Role: Software / AI / UI-UX Engineering Intern",
        `→ Dispatching direct signal to: ${profile.email}`,
        `→ LinkedIn: ${profile.linkedinUrl}`,
      ];
    } else if (cmd === "quote" || cmd === "quotes") {
      accent = true;
      lines = [
        `[01] “${t.quotes.chaosStar}”`,
        `[02] “${t.quotes.sufferCreation}”`,
        `[03] “${t.quotes.neverHalfHearted}”`,
      ];
    } else if (cmd === "chaos" || cmd === "matrix") {
      accent = true;
      lines = [
        "01001101 01000001 01010010 01000011 01000001 :: ✦ DANCING_STAR_IGNITED",
        `“${t.quotes.chaosStar}”`,
      ];
    } else if (cmd === "coffee") {
      lines = [
        "☕ BREW_STATUS: Double Espresso [100% READY]",
        "⚡ Late-night debugging & prototyping mode: ENABLED.",
      ];
    } else if (cmd === "whoami") {
      lines = [
        `${profile.name} — ${t.hero.roleBadge}`,
        t.hero.bio,
      ];
    } else if (cmd === "1" || cmd === "github") {
      lines = [`Opening GitHub → ${profile.githubUrl}`];
      window.open(profile.githubUrl, "_blank", "noopener,noreferrer");
    } else if (cmd === "2" || cmd === "linkedin") {
      lines = [`Opening LinkedIn → ${profile.linkedinUrl}`];
      window.open(profile.linkedinUrl, "_blank", "noopener,noreferrer");
    } else if (cmd === "3" || cmd === "credly") {
      lines = [`Opening Credly Vault → ${profile.credlyUrl}`];
      window.open(profile.credlyUrl, "_blank", "noopener,noreferrer");
    } else if (cmd === "4" || cmd === "git-eng") {
      lines = [`Opening UKWMS Git-Eng → ${profile.gitEngUrl}`];
      window.open(profile.gitEngUrl, "_blank", "noopener,noreferrer");
    } else if (cmd === "5" || cmd === "email" || cmd === "mailto") {
      lines = [`Launching mail client → mailto:${profile.email}`];
      window.open(`mailto:${profile.email}`, "_self");
    } else {
      lines = [
        locale === "id"
          ? `marca-sh: perintah tidak ditemukan: "${trimmed}". Ketik 'help' untuk daftar perintah.`
          : `marca-sh: command not found: "${trimmed}". Type 'help' for available commands.`,
      ];
    }

    setLogs((prev) => [
      ...prev.slice(-6),
      {
        id: Date.now() + Math.random(),
        command: trimmed,
        lines,
        accent,
      },
    ]);
    setInput("");
  };

  return (
    <section id="scene-06" data-scene-index="06" className="scene-stage">
      <ScenePrompt
        index="06"
        command="./connect --interactive"
        subtitle={t.sections.networkHeading}
        badge={t.sections.networkBadge}
      />

      <div className="space-y-6">
        {/* 5 Direct Channel Cards ([1]..[5]) */}
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="soft-card soft-card-interactive group rounded-2xl p-5 flex items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent-text)]">
                <span className="rounded border border-[var(--accent-border)] bg-[var(--accent-bg)] px-1.5 py-0.5 text-[10px]">
                  [1]
                </span>
                <span>GITHUB // PUBLIC REPOS</span>
              </div>
              <div className="text-base font-semibold text-[var(--text-primary)]">
                github.com/MRMARCABLE
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                {t.channels.githubDesc}
              </p>
            </div>
            <span className="font-mono text-lg text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 transition">
              ↗
            </span>
          </a>

          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="soft-card soft-card-interactive group rounded-2xl p-5 flex items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs text-sky-700 dark:text-sky-300">
                <span className="rounded border border-sky-500/35 bg-sky-500/10 px-1.5 py-0.5 text-[10px]">
                  [2]
                </span>
                <span>LINKEDIN // PROFESSIONAL PROFILE</span>
              </div>
              <div className="text-base font-semibold text-[var(--text-primary)]">
                {profile.name}
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                {t.channels.linkedinDesc}
              </p>
            </div>
            <span className="font-mono text-lg text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 transition">
              ↗
            </span>
          </a>

          <a
            href={profile.credlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="soft-card soft-card-interactive group rounded-2xl p-5 flex items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs text-amber-800 dark:text-amber-300">
                <span className="rounded border border-amber-500/35 bg-amber-500/10 px-1.5 py-0.5 text-[10px]">
                  [3]
                </span>
                <span>CREDLY // DIGITAL CREDENTIALS</span>
              </div>
              <div className="text-base font-semibold text-[var(--text-primary)]">
                credly.com/users/yohannes-lalopua
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                {t.channels.credlyDesc}
              </p>
            </div>
            <span className="font-mono text-lg text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 transition">
              ↗
            </span>
          </a>

          <a
            href={profile.gitEngUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="soft-card soft-card-interactive group rounded-2xl p-5 flex items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs text-violet-800 dark:text-violet-300">
                <span className="rounded border border-violet-500/35 bg-violet-500/10 px-1.5 py-0.5 text-[10px]">
                  [4]
                </span>
                <span>GIT-ENG // UKWMS ACADEMIC</span>
              </div>
              <div className="text-base font-semibold text-[var(--text-primary)]">
                git-eng.ukwms.ac.id/5803025050
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                {t.channels.gitEngDesc}
              </p>
            </div>
            <span className="font-mono text-lg text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 transition">
              ↗
            </span>
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="soft-card soft-card-interactive group sm:col-span-2 rounded-2xl p-5 flex items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent-text)]">
                <span className="rounded border border-[var(--accent-border)] bg-[var(--accent-bg)] px-1.5 py-0.5 text-[10px]">
                  [5]
                </span>
                <span>{t.channels.emailTag}</span>
              </div>
              <div className="text-base font-semibold text-[var(--text-primary)]">
                {profile.email}
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                {t.channels.emailDesc}
              </p>
            </div>
            <span className="font-mono text-lg text-[var(--accent-text)] group-hover:translate-x-0.5 transition">
              ↗
            </span>
          </a>
        </div>

        {/* Interactive CLI Terminal Window */}
        <div className="soft-card rounded-2xl overflow-hidden border border-[var(--border-soft)]">
          {/* Terminal Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-soft)] bg-[var(--bg-elevated)] px-4 py-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              <span className="ml-1 text-[var(--text-secondary)]">
                marca-sh — interactive session
              </span>
            </div>
            <span className="text-[11px] text-[var(--text-muted)]">
              [PRESS &apos;/&apos; TO FOCUS SHELL]
            </span>
          </div>

          {/* Quick Command Pills */}
          <div className="flex flex-wrap items-center gap-1.5 border-b border-[var(--border-soft)] bg-[var(--bg-surface)] px-4 py-2.5 font-mono text-[11px]">
            <span className="text-[var(--text-muted)] mr-1">TRY:</span>
            {QUICK_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => runCommand(cmd)}
                className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2 py-0.5 text-[var(--text-secondary)] hover:border-[var(--accent-border)] hover:text-[var(--accent-text)] transition"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Output History */}
          <div className="max-h-64 overflow-y-auto p-4 space-y-3 font-mono text-xs bg-[var(--bg-surface)]/60">
            {logs.map((entry) => (
              <div key={entry.id} className="space-y-1">
                <div className="flex items-center gap-2 text-[var(--text-muted)]">
                  <span className="text-[var(--accent-text)]">
                    marca@ukwms:~/connect$
                  </span>
                  <span className="text-[var(--text-primary)] font-semibold">
                    {entry.command}
                  </span>
                </div>
                <div
                  className={`pl-3 border-l-2 space-y-0.5 whitespace-pre-wrap leading-relaxed ${
                    entry.accent
                      ? "border-[var(--accent-border)] text-[var(--accent-text)]"
                      : "border-[var(--border-soft)] text-[var(--text-secondary)]"
                  }`}
                >
                  {entry.lines.map((line, i) => (
                    <div key={`${entry.id}-${i}`}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Prompt Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              runCommand(input);
            }}
            className="flex items-center gap-2 border-t border-[var(--border-soft)] bg-[var(--bg-elevated)]/90 px-4 py-3 font-mono text-xs"
          >
            <label
              htmlFor="marca-cli-input"
              className="shrink-0 text-[var(--accent-text)] font-semibold"
            >
              marca@ukwms:~$
            </label>
            <input
              id="marca-cli-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.sceneUi.cliPlaceholder}
              autoComplete="off"
              spellCheck={false}
              className="w-full bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-md border border-[var(--accent-border)] bg-[var(--accent-bg)] px-2.5 py-1 text-[11px] font-semibold text-[var(--accent-text)] hover:border-[var(--border-hover)] transition"
            >
              RUN ↵
            </button>
          </form>
        </div>

        {/* Final Session Sign-Off — Quote 3 (No Author Attribution) */}
        <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-elevated)]/75 p-6 sm:p-7 text-center space-y-3">
          <div className="font-mono text-[11px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
            marca@ukwms:~$ logout // SESSION_IMPRINT
          </div>
          <blockquote className="mx-auto max-w-2xl text-sm sm:text-base font-medium italic leading-relaxed text-[var(--text-primary)]">
            {`“${t.quotes.neverHalfHearted}”`}
          </blockquote>
        </div>
      </div>
    </section>
  );
}
