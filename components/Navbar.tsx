"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { index: "01", label: "Overview", href: "/" },
  { index: "02", label: "Projects", href: "/projects" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <nav className="max-w-4xl mx-auto px-6 h-16 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-semibold tracking-tight text-zinc-100"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded border border-zinc-700/80 bg-zinc-900 font-mono text-xs text-emerald-400 group-hover:border-emerald-500/60 transition">
              M
            </span>
            <span className="text-base font-bold tracking-tight">Marca.</span>
          </Link>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/70 px-2.5 py-0.5 font-mono text-[11px] text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            INFORMATICS // UKWMS
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition flex items-center gap-1.5 ${
                  isActive
                    ? "bg-zinc-800/90 text-zinc-100 border border-zinc-700/80 shadow-xs"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 border border-transparent"
                }`}
              >
                <span className="font-mono text-[10px] text-zinc-500">
                  {item.index}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}

          <a
            href="https://github.com/MRMARCABLE"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 ml-1 px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/50 font-mono text-xs text-zinc-300 hover:border-zinc-700 hover:text-white transition"
          >
            GitHub ↗
          </a>
        </div>
      </nav>
    </header>
  );
}