"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageProvider";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { index: "01", label: t.nav.overview, href: "/" },
    { index: "02", label: t.nav.projects, href: "/projects" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[var(--bg-nav)] backdrop-blur-md">
      <nav className="max-w-4xl mx-auto px-6 h-16 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-semibold tracking-tight text-[var(--text-primary)]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--border-soft)] bg-[var(--bg-elevated)] font-mono text-xs text-[var(--accent-text)] group-hover:border-[var(--border-hover)] transition">
              M
            </span>
            <span className="text-base font-bold tracking-tight">Marca.</span>
          </Link>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--text-secondary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-text)] opacity-80" />
            INFORMATICS // UKWMS
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
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
