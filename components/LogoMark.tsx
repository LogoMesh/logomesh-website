import Image from "next/image";

interface LogoMarkProps {
  size?: number;
}

/**
 * The LogoMesh app mark — rounded dark tile with the lime glyph.
 * Served from `public/branding/logomesh-github-app-256.png`, regenerated
 * from `public/new_logo/AG1CN.jpg` via `npm run sync:branding`.
 */
export function LogoMark({ size = 32 }: LogoMarkProps) {
  return (
    <Image
      src="/branding/logomesh-github-app-256.png"
      alt="LogoMesh"
      width={size}
      height={size}
      priority
      className="block"
      style={{ width: size, height: size }}
    />
  );
}
