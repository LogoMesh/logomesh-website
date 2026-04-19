import { cn } from "@/lib/utils";

interface LogoMarkProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 32, className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      className={cn("text-border-strong", className)}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="LogoMesh mark"
    >
      <line x1="6" y1="6" x2="18" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line
        x1="18"
        y1="6"
        x2="18"
        y2="18"
        stroke="hsl(var(--primary) / 0.65)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="6"
        y1="18"
        x2="18"
        y2="18"
        stroke="hsl(var(--primary) / 0.65)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="6" cy="6" r="2.5" fill="currentColor" />
      <circle cx="18" cy="6" r="2.5" fill="currentColor" />
      <circle cx="6" cy="18" r="2.5" fill="currentColor" />
      <circle
        cx="18"
        cy="18"
        r="3"
        fill="hsl(var(--primary))"
        style={{ filter: "drop-shadow(0 0 3px hsl(var(--primary) / 0.9))" }}
      />
    </svg>
  );
}
