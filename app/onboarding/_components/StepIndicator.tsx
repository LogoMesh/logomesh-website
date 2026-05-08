"use client";

const LABELS = [
  "Welcome",
  "Create",
  "Sentry",
  "GitHub",
  "Slack",
  "Done",
] as const;

export function StepIndicator({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="hidden font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.14em] text-[var(--color-dim)] sm:inline">
        {LABELS[current - 1] ?? ""}
      </span>
      <div className="flex items-center gap-1.5" aria-hidden>
        {Array.from({ length: total }, (_, i) => {
          const idx = i + 1;
          const isDone = idx < current;
          const isCurrent = idx === current;
          return (
            <span
              key={idx}
              className={
                isCurrent
                  ? "h-1.5 w-6 rounded-full bg-[var(--color-accent)] transition-all duration-300"
                  : isDone
                    ? "h-1.5 w-3 rounded-full bg-[var(--color-accent)]/50 transition-all duration-300"
                    : "h-1.5 w-3 rounded-full bg-[var(--color-border-hi)] transition-all duration-300"
              }
            />
          );
        })}
      </div>
      <span
        className="font-[family-name:var(--font-mono)] text-[12px] tabular-nums text-[var(--color-muted)]"
        aria-live="polite"
      >
        {current}/{total}
      </span>
    </div>
  );
}
