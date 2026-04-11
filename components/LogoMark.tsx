interface LogoMarkProps {
  size?: number;
  bracketColor?: string;
  dotColor?: string;
}

export function LogoMark({
  size = 32,
  bracketColor = "#ffffff",
  dotColor = "#c4ff00",
}: LogoMarkProps) {
  // viewBox is 64x48 — scale proportionally from that
  const w = (size * 64) / 48;
  const h = size;

  return (
    <svg
      viewBox="0 0 64 48"
      width={w}
      height={h}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="LogoMesh mark"
    >
      {/* Left bracket [ */}
      <path
        d="M19 5 L8 5 L8 43 L19 43"
        stroke={bracketColor}
        strokeWidth="4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Right bracket ] */}
      <path
        d="M45 5 L56 5 L56 43 L45 43"
        stroke={bracketColor}
        strokeWidth="4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Center dot — the caught element */}
      <circle cx="32" cy="24" r="9" fill={dotColor} />
    </svg>
  );
}
