"use client";

import { useEffect, useState } from "react";

function formatUptime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const mins = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
}

export default function SessionUptime() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const intervalId = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5 rounded border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-2 py-0.5 font-mono text-[11px] text-[var(--text-secondary)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-text)] animate-pulse" />
      <span>{`UPTIME ${formatUptime(elapsed)}`}</span>
    </span>
  );
}

