type Tone = "success" | "warning" | "danger" | "info" | "neutral";

const TONE_CLASSES: Record<Tone, string> = {
  success:
    "border-[var(--color-pass)]/40 bg-[var(--color-pass)]/12 text-[var(--color-pass)]",
  warning:
    "border-[hsl(38_95%_60%)]/40 bg-[hsl(38_95%_60%)]/10 text-[hsl(38_95%_72%)]",
  danger:
    "border-[var(--color-danger)]/40 bg-[var(--color-danger)]/10 text-[var(--color-danger)]",
  info: "border-[hsl(210_80%_60%)]/40 bg-[hsl(210_80%_60%)]/10 text-[hsl(210_80%_75%)]",
  neutral:
    "border-[var(--color-border-hi)] bg-[var(--color-canvas-3)] text-[var(--color-muted)]",
};

export type StatusPillTone = Tone;

export function StatusPill({
  tone,
  children,
  size = "md",
}: {
  tone: Tone;
  children: React.ReactNode;
  size?: "sm" | "md";
}) {
  const sizeClasses =
    size === "sm"
      ? "px-2 py-0.5 text-[11px]"
      : "px-2.5 py-1 text-[12px]";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border font-[family-name:var(--font-mono)] font-bold uppercase tracking-[0.08em] ${sizeClasses} ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}
