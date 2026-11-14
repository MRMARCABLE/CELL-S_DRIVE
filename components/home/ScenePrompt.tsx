"use client";

export default function ScenePrompt({
  index,
  command,
  subtitle,
  badge,
  rightSlot,
}: {
  index: string;
  command: string;
  subtitle?: string;
  badge?: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-soft)] pb-3 mb-6 font-mono text-xs">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-1.5 py-0.5 text-[10px] text-[var(--text-muted)]">
          {index}
        </span>
        <span className="text-[var(--accent-text)]">marca@ukwms:~$</span>
        <span className="font-semibold text-[var(--text-primary)]">
          {command}
        </span>
        <span aria-hidden="true" className="cursor-blink" />
        {subtitle ? (
          <span className="hidden sm:inline text-[11px] text-[var(--text-muted)] pl-1">
            {`# ${subtitle}`}
          </span>
        ) : null}
      </div>

      <div className="flex items-center gap-3 text-[11px] text-[var(--text-muted)]">
        {badge ? <span>{badge}</span> : null}
        {rightSlot}
      </div>
    </div>
  );
}
