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
      {/* Mesh frame — top + left edges */}
      {/* Boosted from #34343e to #484858 for visibility on near-black canvas */}
      <line x1="6" y1="6" x2="18" y2="6" stroke="#484858" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="6" x2="6" y2="18" stroke="#484858" strokeWidth="1.5" strokeLinecap="round" />

      {/* Proof edges — right + bottom, lime, converging on the catch node */}
      <line x1="18" y1="6" x2="18" y2="18" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity={0.6} />
      <line x1="6" y1="18" x2="18" y2="18" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" opacity={0.6} />

      {/* Three dim corner nodes — boosted from #46464f to #565668 */}
      <circle cx="6" cy="6" r="2.5" fill="#565668" />
      <circle cx="18" cy="6" r="2.5" fill="#565668" />
      <circle cx="6" cy="18" r="2.5" fill="#565668" />

      {/* The proof node — caught bug, glowing lime */}
      <circle
        cx="18"
        cy="18"
        r="3"
        fill="hsl(var(--primary))"
        style={{ filter: "drop-shadow(0 0 4px hsl(var(--primary) / 0.85))" }}
      />
    </svg>
  );
}
