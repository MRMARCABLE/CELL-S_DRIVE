"use client";

import { useEffect, useRef, useState } from "react";
import { BOOT_REPLAY_EVENT } from "@/components/home/BootSequence";
import { useLanguage } from "@/components/LanguageProvider";
import ScenePrompt from "@/components/home/ScenePrompt";
import { profile } from "@/data/portfolio";

interface CliLogEntry {
  id: number;
  command: string;
  lines: string[];
  accent?: boolean;
}

const ALL_COMMANDS = [
  "help",
  "neofetch",
  "ls projects",
  "sudo hire marcel",
  "quote",
  "chaos",
  "chaos --overdrive",
  "coffee",
  "whoami",
  "theme shadow",
  "theme bone",
  "lang en",
  "lang id",
  "boot",
  "copy",
  "email --copy",
  "logout",
  "github",
  "linkedin",
  "credly",
  "git-eng",
  "email",
  "clear",
];

const QUICK_COMMANDS = [
  "help",
  "neofetch",
  "ls projects",
  "sudo hire marcel",
  "chaos --overdrive",
  "theme shadow",
  "theme bone",
  "boot",
  "clear",
];

export default function ConnectScene() {
  const { t, locale, setLocale } = useLanguage();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>(["status --channels"]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [logoutPulse, setLogoutPulse] = useState(false);
  const logContainerRef = useRef<HTMLDivElement | null>(null);
  const copyTimerRef = useRef<number | null>(null);
  const overdriveTimerRef = useRef<number | null>(null);
  const logoutTimerRef = useRef<number | null>(null);
  const [logs, setLogs] = useState<CliLogEntry[]>([
    {
      id: 1,
      command: "status --channels",
      lines: [
        "READY // 5 direct channels mounted ([1] GitHub .. [5] Email).",
        "Type 'help', press TAB to autocomplete, or ↑/↓ for command history.",
      ],
    },
  ]);

  useEffect(() => {
    const el = logContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      if (overdriveTimerRef.current) window.clearTimeout(overdriveTimerRef.current);
      if (logoutTimerRef.current) window.clearTimeout(logoutTimerRef.current);
      document.documentElement.classList.remove("chaos-overdrive");
    };
  }, []);

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      // Clipboard API may be blocked in non-HTTPS contexts
    }
    setCopiedEmail(true);
    if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    copyTimerRef.current = window.setTimeout(() => {
      setCopiedEmail(false);
    }, 2200);
  };

  const applyTheme = (mode: "shadow" | "bone") => {
    const isDark = mode === "shadow";
    document.documentElement.classList.toggle("dark", isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // Ignore storage errors in restricted environments
    }
  };

  const triggerBootReplay = () => {
    window.dispatchEvent(new Event(BOOT_REPLAY_EVENT));
  };

  const runCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;
    const cmd = trimmed.toLowerCase();

    setHistory((prev) =>
      prev[prev.length - 1] === trimmed ? prev : [...prev.slice(-24), trimmed]
    );
    setHistoryIndex(-1);

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
        "  1..5 | github..email   → Open mounted communication channels",
        "  copy | email --copy    → Copy yohanneslalopua@gmail.com to clipboard",
        "  ls projects            → List archived systems & prototypes",
        "  theme shadow | bone    → Switch canvas between Shadow & Bone themes",
        "  lang en | id           → Switch session language (EN / ID)",
        "  boot                   → Replay full-screen vortex boot sequence",
        "  chaos | --overdrive    → Ignite binary star resonance burst",
        "  neofetch               → Display system & developer specifications",
        "  sudo hire marcel       → Execute internship/collaboration handshake",
        "  quote                  → Print core philosophical epigraphs",
        "  coffee / whoami        → Check runtime status & developer identity",
        "  logout                 → Seal session & pulse final imprint",
        "  clear                  → Clear terminal buffer (↑/↓ history, TAB complete)",
      ];
    } else if (cmd === "neofetch") {
      accent = true;
      lines = [
        "   ✦  MARCA.OS // v2.1      marca@ukwms",
        "  ╱ ╲  ───────────────      ───────────",
        " ✦   ✦ OS:                  CELL-S_DRIVE (Next.js 16 + React 19)",
        "  ╲ ╱  Host:                UKWMS Informatics (NRP 5803025050)",
        "   ✦   Location:            Surabaya, Indonesia",
        "       Pillars:             AI.AGENT ♦ | SYS.EMBED ♣ | WEB.3D_UX ♠",
        "       Credentials:         4× Credly Verified + Codelamp Appreciation",
        `       Status:              ${t.hero.availability}`,
      ];
    } else if (cmd === "ls projects" || cmd === "projects") {
      accent = true;
      lines = [
        `TOTAL ${t.projects.length} MODULES IN ~/projects:`,
        ...t.projects.map(
          (proj) =>
            `  [${proj.code}] ${proj.title} (${proj.year}) — ${proj.category.toUpperCase()}`
        ),
      ];
    } else if (cmd === "theme shadow" || cmd === "theme dark") {
      accent = true;
      applyTheme("shadow");
      lines = ["DISPLAY_THEME → SHADOW (#09090b) activated."];
    } else if (cmd === "theme bone" || cmd === "theme light") {
      accent = true;
      applyTheme("bone");
      lines = ["DISPLAY_THEME → BONE (#eae8df) activated."];
    } else if (cmd === "lang en") {
      setLocale("en");
      accent = true;
      lines = ["LOCALE_SET → en-US (English) applied across all 6 scenes."];
    } else if (cmd === "lang id") {
      setLocale("id");
      accent = true;
      lines = ["LOCALE_SET → id-ID (Bahasa Indonesia) diterapkan ke semua scene."];
    } else if (cmd === "boot" || cmd === "reboot") {
      accent = true;
      lines = ["SIGNAL_SENT → Replaying Scene 00 :: Vortex BootSequence..."];
      triggerBootReplay();
    } else if (cmd === "copy" || cmd === "email --copy") {
      accent = true;
      void copyEmailToClipboard();
      lines = [`CLIPBOARD_WRITE ✓ → ${profile.email}`];
    } else if (cmd === "logout") {
      accent = true;
      setLogoutPulse(true);
      if (logoutTimerRef.current) window.clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = window.setTimeout(() => {
        setLogoutPulse(false);
      }, 3200);
      lines = [
        "SESSION_SEALED :: Final imprint highlighted.",
        `“${t.quotes.neverHalfHearted}”`,
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
    } else if (cmd === "chaos" || cmd === "matrix" || cmd === "chaos --overdrive") {
      accent = true;
      document.documentElement.classList.add("chaos-overdrive");
      if (overdriveTimerRef.current) window.clearTimeout(overdriveTimerRef.current);
      overdriveTimerRef.current = window.setTimeout(() => {
        document.documentElement.classList.remove("chaos-overdrive");
      }, 4500);
      lines = [
        "01001101 01000001 01010010 01000011 01000001 :: ✦ CHAOS_OVERDRIVE (4.5s)",
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

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex =
        historyIndex === -1
          ? history.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex >= history.length - 1) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const query = input.trim().toLowerCase();
      if (!query) return;
      const match = ALL_COMMANDS.find((candidate) =>
        candidate.startsWith(query)
      );
      if (match) {
        setInput(match);
      }
    }
  };

  return (
    <section id="scene-06" data-scene-index="06" className="scene-stage">
      <ScenePrompt
        index="06"
        command="./connect --interactive"
        subtitle={t.sections.networkHeading}
        badge={t.sections.networkBadge}
        rightSlot={
          <button
            type="button"
            onClick={triggerBootReplay}
            data-cursor="key"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-3 py-1.5 font-mono text-[11px] text-[var(--text-secondary)] hover:border-[var(--accent-border)] hover:text-[var(--accent-text)] transition cursor-pointer"
          >
            <span aria-hidden="true">↺</span>
            <span>{t.sceneUi.replayIntroBtn}</span>
          </button>
        }
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

          <div className="soft-card soft-card-interactive sm:col-span-2 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="group flex-1 space-y-1 focus:outline-none"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent-text)]">
                <span className="rounded border border-[var(--accent-border)] bg-[var(--accent-bg)] px-1.5 py-0.5 text-[10px]">
                  [5]
                </span>
                <span>{t.channels.emailTag}</span>
              </div>
              <div className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-text)] transition">
                {profile.email}
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                {t.channels.emailDesc}
              </p>
            </a>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={copyEmailToClipboard}
                data-cursor="key"
                className={`rounded-lg border px-3 py-1.5 font-mono text-xs font-medium transition cursor-pointer ${
                  copiedEmail
                    ? "border-[var(--accent-border)] bg-[var(--accent-bg)] text-[var(--accent-text)]"
                    : "border-[var(--border-soft)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--accent-border)] hover:text-[var(--accent-text)]"
                }`}
              >
                {copiedEmail ? `✓ ${t.sceneUi.emailCopiedBtn}` : t.sceneUi.copyEmailBtn}
              </button>
              <a
                href={`mailto:${profile.email}`}
                aria-label={`Compose email to ${profile.email}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-soft)] bg-[var(--bg-elevated)] font-mono text-sm text-[var(--accent-text)] hover:border-[var(--accent-border)] transition"
              >
                ↗
              </a>
            </div>
          </div>
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
              [PRESS &apos;/&apos; TO FOCUS · ↑/↓ HISTORY · TAB COMPLETE]
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
                className="rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2 py-0.5 text-[var(--text-secondary)] hover:border-[var(--accent-border)] hover:text-[var(--accent-text)] transition cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Output History */}
          <div
            ref={logContainerRef}
            className="max-h-64 overflow-y-auto p-4 space-y-3 font-mono text-xs bg-[var(--bg-surface)]/60"
          >
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
              onChange={(e) => {
                setInput(e.target.value);
                setHistoryIndex(-1);
              }}
              onKeyDown={handleInputKeyDown}
              placeholder={t.sceneUi.cliPlaceholder}
              autoComplete="off"
              spellCheck={false}
              className="w-full bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-md border border-[var(--accent-border)] bg-[var(--accent-bg)] px-2.5 py-1 text-[11px] font-semibold text-[var(--accent-text)] hover:border-[var(--border-hover)] transition cursor-pointer"
            >
              RUN ↵
            </button>
          </form>
        </div>

        {/* Final Session Sign-Off — Quote 3 (No Author Attribution) */}
        <div
          className={`rounded-2xl border p-6 sm:p-7 text-center space-y-3 transition-all duration-500 ${
            logoutPulse
              ? "border-[var(--accent-border)] bg-[var(--accent-bg)] shadow-[0_0_28px_var(--scene-glow-1)]"
              : "border-[var(--border-soft)] bg-[var(--bg-elevated)]/75"
          }`}
        >
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
