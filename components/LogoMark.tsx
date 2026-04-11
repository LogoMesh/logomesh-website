interface LogoMarkProps {
  size?: number;
}

export function LogoMark({ size = 32 }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="LogoMesh mark"
    >
      {/* Mesh frame — top + left edges, dim */}
      <line x1="6" y1="6" x2="18" y2="6" stroke="#34343e" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="6" x2="6" y2="18" stroke="#34343e" strokeWidth="1.5" strokeLinecap="round" />

      {/* Proof edges — right + bottom, lime tinted, converging on the catch node */}
      <line x1="18" y1="6" x2="18" y2="18" stroke="#c4ff00" strokeWidth="1.5" strokeLinecap="round" opacity={0.55} />
      <line x1="6" y1="18" x2="18" y2="18" stroke="#c4ff00" strokeWidth="1.5" strokeLinecap="round" opacity={0.55} />

      {/* Three dim corner nodes */}
      <circle cx="6" cy="6" r="2.5" fill="#46464f" />
      <circle cx="18" cy="6" r="2.5" fill="#46464f" />
      <circle cx="6" cy="18" r="2.5" fill="#46464f" />

      {/* The proof node — the caught bug, glowing */}
      <circle
        cx="18"
        cy="18"
        r="3"
        fill="#c4ff00"
        style={{ filter: "drop-shadow(0 0 2.5px rgba(196,255,0,0.85))" }}
      />
    </svg>
  );
}
