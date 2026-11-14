import Link from "next/link";

export default function NotFound() {
  return (
    <div className="scene-stage py-12">
      <div className="soft-card mx-auto w-full max-w-2xl rounded-2xl overflow-hidden border border-[var(--border-soft)]">
        {/* Terminal Bar */}
        <div className="flex items-center justify-between border-b border-[var(--border-soft)] bg-[var(--bg-elevated)] px-4 py-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-1 text-[var(--text-secondary)]">
              marca-sh — errno 404
            </span>
          </div>
          <span className="text-[10px] text-[var(--text-muted)]">
            EXIT_CODE: 127
          </span>
        </div>

        {/* Terminal Body */}
        <div className="p-6 sm:p-8 space-y-6 font-mono text-xs sm:text-sm">
          <div className="space-y-2">
            <div className="text-[var(--text-secondary)]">
              <span className="text-[var(--accent-text)]">marca@ukwms:~$</span>{" "}
              cd ./requested-path
            </div>
            <div className="rounded-xl border border-rose-500/35 bg-rose-500/10 p-4 text-rose-700 dark:text-rose-300">
              bash: cd: ./requested-path: No such file or directory (HTTP 404)
            </div>
          </div>

          <p className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed">
            The sector or module you requested is not mounted in{" "}
            <span className="font-mono text-[var(--text-primary)]">
              CELL-S_DRIVE
            </span>
            . Select a valid command below to return to an active stage:
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--accent-border)] bg-[var(--accent-bg)] px-4 py-2 font-mono text-xs font-semibold text-[var(--accent-text)] hover:border-[var(--border-hover)] transition"
            >
              <span>$ cd ~ // Overview</span>
              <span>→</span>
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-4 py-2 font-mono text-xs text-[var(--text-primary)] hover:border-[var(--border-hover)] transition"
            >
              <span>$ ls ./projects --suite</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

