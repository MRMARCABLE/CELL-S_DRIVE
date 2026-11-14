"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";

const SCENE_ITEMS = [
  { id: "01", cmd: "whoami" },
  { id: "02", cmd: "./focus" },
  { id: "03", cmd: "git-log" },
  { id: "04", cmd: "lsmod" },
  { id: "05", cmd: "gpg" },
  { id: "06", cmd: "./connect" },
];

function subscribeScene(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-scene"],
  });
  return () => observer.disconnect();
}

function getSceneSnapshot() {
  return document.documentElement.getAttribute("data-scene") || "01";
}

function getSceneServerSnapshot() {
  return "01";
}

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const activeScene = useSyncExternalStore(
    subscribeScene,
    getSceneSnapshot,
    getSceneServerSnapshot
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { index: "01", label: t.nav.overview, href: "/" },
    { index: "02", label: t.nav.projects, href: "/projects" },
  ];

  const currentSceneObj =
    SCENE_ITEMS.find((s) => s.id === activeScene) ?? SCENE_ITEMS[0];

  const jumpToScene = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(`scene-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[var(--bg-nav)] backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center gap-2">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-semibold tracking-tight text-[var(--text-primary)]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] font-mono text-xs text-[var(--accent-text)] group-hover:border-[var(--border-hover)] group-hover:rotate-90 transition-all duration-300">
              ✦
            </span>
            <span className="text-base font-bold tracking-tight">Marca.</span>
          </Link>

          {/* Live Scene Indicator & Quick-Jump Dropdown on Home */}
          {pathname === "/" ? (
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-expanded={menuOpen}
                aria-label="Jump to scene"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition cursor-pointer"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-text)]" />
                <span className="text-[var(--accent-text)]">
                  {`[${currentSceneObj.id}/06]`}
                </span>
                <span>{currentSceneObj.cmd}</span>
                <span className="text-[9px] text-[var(--text-muted)]">▾</span>
              </button>

              {menuOpen ? (
                <div className="absolute left-0 mt-2 w-48 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-surface)] p-1.5 shadow-lg font-mono text-xs z-50">
                  {SCENE_ITEMS.map((s) => {
                    const isCurrent = s.id === currentSceneObj.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => jumpToScene(s.id)}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left transition ${
                          isCurrent
                            ? "bg-[var(--accent-bg)] text-[var(--accent-text)] font-semibold"
                            : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        <span>{`${s.id} // ${s.cmd}`}</span>
                        {isCurrent ? <span>●</span> : null}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--text-secondary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-text)] opacity-80" />
              SUITE // PROJECTS
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition flex items-center gap-1.5 border ${
                  isActive
                    ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-hover)] shadow-xs"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] border-transparent"
                }`}
              >
                <span className="font-mono text-[10px] text-[var(--text-muted)]">
                  {item.index}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}

          <LanguageToggle />
          <ThemeToggle />

          <a
            href="https://github.com/MRMARCABLE"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] font-mono text-xs text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition"
          >
            GitHub ↗
          </a>
        </div>
      </nav>
    </header>
  );
}
