interface Props {
  size?: number;
  className?: string;
}

// Cursive "Cal" wordmark — approximates the UC Berkeley script logo
export function BerkeleyLogo({ size = 24, className }: Props) {
  const scale = size / 24;
  const w = Math.round(58 * scale);
  const h = size;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 58 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Cal — UC Berkeley"
    >
      <text
        x="1"
        y="20"
        fontFamily="Georgia, 'Book Antiqua', 'Times New Roman', serif"
        fontStyle="italic"
        fontWeight="bold"
        fontSize="22"
        fill="#FDB515"
        letterSpacing="-0.5"
      >
        Cal
      </text>
    </svg>
  );
}
