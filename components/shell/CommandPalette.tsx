"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { BOOT_REPLAY_EVENT } from "@/components/home/BootSequence";
import { useLanguage } from "@/components/LanguageProvider";
import { playSfx, toggleSfx } from "@/components/shell/sound";
import { profile } from "@/data/portfolio";

export const COMMAND_PALETTE_EVENT = "marca-command-palette";

export function openCommandPalette() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(COMMAND_PALETTE_EVENT));
  }
}

interface PaletteItem {
  id: string;
  group: string;
  title: string;
  subtitle: string;
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette() {
  const { t, locale, setLocale } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const closePalette = () => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  };

  useEffect(() => {
    const handleCustomOpen = () => {
      playSfx("open");
      setOpen((prev) => !prev);
      setQuery("");
      setActiveIndex(0);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        handleCustomOpen();
        return;
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        closePalette();
      }
    };

    window.addEventListener(COMMAND_PALETTE_EVENT, handleCustomOpen);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener(COMMAND_PALETTE_EVENT, handleCustomOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 20);
    return () => window.clearTimeout(id);
  }, [open]);

  const items = useMemo<PaletteItem[]>(() => {
    const jumpScene = (num: string) => {
      closePalette();
      playSfx("cmd");
      if (pathname === "/") {
        document
          .getElementById(`scene-0${num}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push(`/#scene-0${num}`);
      }
    };

    const sceneItems: PaletteItem[] = [
      {
        id: "scene-01",
        group: locale === "id" ? "NAVIGASI SCENE" : "SCENES & ROUTES",
        title: "01 // whoami --profile",
        subtitle: t.hero.sectionLabel,
        shortcut: "1",
        action: () => jumpScene("1"),
      },
      {
        id: "scene-02",
        group: locale === "id" ? "NAVIGASI SCENE" : "SCENES & ROUTES",
        title: "02 // ls ./focus --deck",
        subtitle: t.sections.focusHeading,
        shortcut: "2",
        action: () => jumpScene("2"),
      },
      {
        id: "scene-03",
        group: locale === "id" ? "NAVIGASI SCENE" : "SCENES & ROUTES",
        title: "03 // git log --graph --all",
        subtitle: t.sections.expHeading,
        shortcut: "3",
        action: () => jumpScene("3"),
      },
      {
        id: "scene-04",
        group: locale === "id" ? "NAVIGASI SCENE" : "SCENES & ROUTES",
        title: "04 // lsmod --matrix",
        subtitle: t.sections.stackHeading,
        shortcut: "4",
        action: () => jumpScene("4"),
      },
      {
        id: "scene-05",
        group: locale === "id" ? "NAVIGASI SCENE" : "SCENES & ROUTES",
        title: "05 // gpg --verify ./badges",
        subtitle: t.sections.credHeading,
        shortcut: "5",
        action: () => jumpScene("5"),
      },
      {
        id: "scene-06",
        group: locale === "id" ? "NAVIGASI SCENE" : "SCENES & ROUTES",
        title: "06 // ./connect --interactive",
        subtitle: t.sections.networkHeading,
        shortcut: "6",
        action: () => jumpScene("6"),
      },
      {
        id: "route-projects",
        group: locale === "id" ? "NAVIGASI SCENE" : "SCENES & ROUTES",
        title: "SUITE // /projects",
        subtitle: t.projectsPage.title,
        shortcut: "G P",
        action: () => {
          closePalette();
          playSfx("cmd");
          router.push("/projects");
        },
      },
      {
        id: "route-cv",
        group: locale === "id" ? "NAVIGASI SCENE" : "SCENES & ROUTES",
        title: "CV // /cv (Printable Resume Sheet)",
        subtitle:
          locale === "id"
            ? "Ringkasan CV akademik & rekayasa siap cetak"
            : "Print-ready academic & engineering resume sheet",
        shortcut: "G C",
        action: () => {
          closePalette();
          playSfx("cmd");
          router.push("/cv");
        },
      },
    ];

    const systemItems: PaletteItem[] = [
      {
        id: "sys-theme",
        group: locale === "id" ? "KONTROL SISTEM" : "SYSTEM CONTROLS",
        title:
          locale === "id"
            ? "Ganti Tema: Shadow / Bone"
            : "Toggle Theme: Shadow / Bone",
        subtitle: "Switch between Dark (#0d0f13) & Light Bone (#f5f3ee)",
        shortcut: "T",
        action: () => {
          closePalette();
          playSfx("cmd");
          const nextDark = !document.documentElement.classList.contains("dark");
          document.documentElement.classList.toggle("dark", nextDark);
          try {
            localStorage.setItem("theme", nextDark ? "dark" : "light");
          } catch {
            // Ignore storage errors
          }
        },
      },
      {
        id: "sys-lang",
        group: locale === "id" ? "KONTROL SISTEM" : "SYSTEM CONTROLS",
        title:
          locale === "id"
            ? "Ganti Bahasa: English / Indonesia"
            : "Switch Language: EN / ID",
        subtitle: `Current locale: ${locale.toUpperCase()}`,
        shortcut: "L",
        action: () => {
          closePalette();
          playSfx("cmd");
          setLocale(locale === "en" ? "id" : "en");
        },
      },
      {
        id: "sys-sfx",
        group: locale === "id" ? "KONTROL SISTEM" : "SYSTEM CONTROLS",
        title:
          locale === "id"
            ? "Suara Taktil UI (SFX: ON / OFF)"
            : "Toggle Tactile UI Synth (SFX)",
        subtitle: "Web Audio API keycap, card-flip & terminal feedback",
        shortcut: "M",
        action: () => {
          closePalette();
          toggleSfx();
        },
      },
      {
        id: "sys-copy-email",
        group: locale === "id" ? "KONTROL SISTEM" : "SYSTEM CONTROLS",
        title: `${t.sceneUi.copyEmailBtn}: ${profile.email}`,
        subtitle: "Copy direct collaboration email to clipboard",
        action: () => {
          closePalette();
          playSfx("cmd");
          void navigator.clipboard?.writeText(profile.email);
        },
      },
      {
        id: "sys-boot",
        group: locale === "id" ? "KONTROL SISTEM" : "SYSTEM CONTROLS",
        title: t.sceneUi.replayIntroBtn,
        subtitle: "Replay Scene 00 :: Chaos -> Dancing Star Vortex",
        action: () => {
          closePalette();
          playSfx("cmd");
          if (pathname !== "/") {
            router.push("/");
          }
          window.setTimeout(() => {
            window.dispatchEvent(new Event(BOOT_REPLAY_EVENT));
          }, 80);
        },
      },
    ];

    const projectItems: PaletteItem[] = t.projects.map((proj) => ({
      id: `proj-${proj.id}`,
      group: locale === "id" ? "SPESIFIKASI PROYEK" : "PROJECT SPECIFICATIONS",
      title: `SPEC // ${proj.id} — ${proj.title}`,
      subtitle: `${proj.code} · ${proj.tech.join(", ")}`,
      action: () => {
        closePalette();
        playSfx("cmd");
        router.push(`/projects?spec=${encodeURIComponent(proj.id)}`);
      },
    }));

    return [...sceneItems, ...systemItems, ...projectItems];
  }, [locale, pathname, router, setLocale, t]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
    );
  }, [items, query]);

  const safeIndex =
    filtered.length > 0 ? Math.min(activeIndex, filtered.length - 1) : 0;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[75] flex items-start justify-center bg-black/60 backdrop-blur-sm px-4 pt-[10vh]"
      onClick={closePalette}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.sceneUi.cmdPaletteHint}
        onClick={(e) => e.stopPropagation()}
        className="soft-card w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--accent-border)] bg-[var(--bg-surface)] shadow-2xl"
      >
        {/* Top Search Bar */}
        <div className="flex items-center gap-3 border-b border-[var(--border-soft)] bg-[var(--bg-elevated)] px-4 py-3.5 font-mono text-xs">
          <span className="text-[var(--accent-text)] font-bold">⌘K</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                if (filtered.length > 0) {
                  setActiveIndex((prev) => (prev + 1) % filtered.length);
                }
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (filtered.length > 0) {
                  setActiveIndex(
                    (prev) => (prev - 1 + filtered.length) % filtered.length
                  );
                }
              } else if (e.key === "Enter" && filtered[safeIndex]) {
                e.preventDefault();
                filtered[safeIndex].action();
              }
            }}
            placeholder={t.sceneUi.cmdPalettePlaceholder}
            className="w-full bg-transparent text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
          />
          <button
            type="button"
            onClick={closePalette}
            className="rounded border border-[var(--border-soft)] bg-[var(--bg-surface)] px-2 py-0.5 text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[55vh] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-10 text-center font-mono text-xs text-[var(--text-muted)]">
              No matching scene, project spec, or command found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === safeIndex;
              const prevGroup = idx > 0 ? filtered[idx - 1]?.group : null;
              const showGroupHeader = item.group !== prevGroup;

              return (
                <div key={item.id}>
                  {showGroupHeader ? (
                    <div className="px-3 pt-2.5 pb-1 font-mono text-[10px] tracking-[0.18em] text-[var(--text-muted)] uppercase">
                      {item.group}
                    </div>
                  ) : null}
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => item.action()}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition cursor-pointer ${
                      isSelected
                        ? "bg-[var(--accent-bg)] border border-[var(--accent-border)]"
                        : "border border-transparent hover:bg-[var(--bg-elevated)]"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div
                        className={`font-mono text-xs font-semibold truncate ${
                          isSelected
                            ? "text-[var(--accent-text)]"
                            : "text-[var(--text-primary)]"
                        }`}
                      >
                        {item.title}
                      </div>
                      <div className="text-[11px] text-[var(--text-secondary)] truncate">
                        {item.subtitle}
                      </div>
                    </div>
                    {item.shortcut ? (
                      <kbd className="shrink-0 rounded border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
                        {item.shortcut}
                      </kbd>
                    ) : null}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Shortcut Legend */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border-soft)] bg-[var(--bg-elevated)] px-4 py-2.5 font-mono text-[10px] text-[var(--text-muted)]">
          <span>↑/↓ Navigate · ↵ Execute · ESC Close</span>
          <span>[1-6] Scene · [G P] Projects · [G C] CV · [T] Theme · [L] Lang · [M] SFX</span>
        </div>
      </div>
    </div>
  );
}
