import type { ComponentType } from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

export function FlaskLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" className={className} aria-hidden>
      <path
        d="M168.453 57.915c1.701-8.014 3.603-16.476-.373-21.687-4.537-5.95-10.948-4.255-12.55 3.291-1.602 7.548-4.348 18.568-9.758 26.337-4.254 6.112-8.186 5.327-8.186 5.327s18.13-5.182 30.867-13.268z"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M128 8C57.308 8 0 65.308 0 136s57.308 128 128 128 128-57.308 128-128S198.692 8 128 8zm67.418 178.322c-13.578 15.692-35.174 25.678-67.418 25.678-32.244 0-53.84-9.986-67.418-25.678C46.996 170.626 40 150.78 40 136s6.996-34.626 20.582-50.322C74.16 69.986 95.756 60 128 60s53.84 9.986 67.418 25.678C209.004 101.374 216 121.22 216 136s-6.996 34.626-20.582 50.322z"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}

export function FastAPILogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 154 154" className={className} aria-hidden>
      <circle cx="77" cy="77" r="77" fill="#009688" />
      <path d="M81.375 18.667l-38.75 70H77V130l38.75-70H81.375V18.667z" fill="white" />
    </svg>
  );
}

export function DjangoLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 326" className={className} aria-hidden>
      <path
        d="M114.784 0h53.278v244.191c-27.29 5.164-47.319 7.205-69.12 7.205C30.414 251.396 0 223.218 0 164.97 0 109.125 32.458 77.661 83.37 77.661c11.016 0 19.433 1.028 31.414 4.096V0zm0 117.756c-8.478-2.73-15.484-3.86-24.834-3.86-24.643 0-38.78 15.175-38.78 42.03 0 26.01 13.39 40.332 37.972 40.332 8.108 0 14.644-.693 25.642-2.389v-76.113z"
        fill="#2BA977"
      />
      <path
        d="M224.152 77.661v144.738c0 42.47-3.154 62.802-12.477 80.412-8.658 16.727-19.98 27.214-43.57 38.867l-49.49-23.526c23.59-10.905 34.912-20.84 42.47-36.485 7.963-16.085 10.558-34.681 10.558-80.937V77.661h52.509zM224.152 0v57.423h-52.509V0h52.509z"
        fill="#2BA977"
      />
    </svg>
  );
}

export function AiohttpLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className} aria-hidden>
      <circle cx="64" cy="64" r="56" fill="none" stroke="#2C5BB4" strokeWidth="6" />
      <path
        d="M64 20a44 44 0 0 1 0 88"
        fill="none"
        stroke="#2C5BB4"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M64 20a44 44 0 0 0 0 88"
        fill="none"
        stroke="#4A9BD9"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="12 8"
      />
      <circle cx="64" cy="64" r="8" fill="#2C5BB4" />
    </svg>
  );
}

export function StarletteLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className} aria-hidden>
      <path
        d="M64 12l12 36h38l-30 22 11 36-31-23-31 23 11-36-30-22h38z"
        fill="none"
        stroke="#E89B43"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TornadoLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className} aria-hidden>
      <path
        d="M96 24c0 24-40 16-40 40s40 16 40 40"
        fill="none"
        stroke="#6B9BD1"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M72 48c0 16-24 12-24 28s24 12 24 28"
        fill="none"
        stroke="#4A7BB8"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M56 72c0 8-12 8-12 16s12 8 12 16"
        fill="none"
        stroke="#2E5A8C"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BottleLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className} aria-hidden>
      <path
        d="M52 16h24v16c0 8 16 12 16 28v60c0 8-8 16-28 16s-28-8-28-16V60c0-16 16-20 16-28V16z"
        fill="none"
        stroke="#7C9CB4"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M52 16h24v8H52z" fill="#7C9CB4" opacity="0.5" />
    </svg>
  );
}

export function PyramidLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className} aria-hidden>
      <path
        d="M64 20L20 108h88L64 20z"
        fill="none"
        stroke="#1f355a"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M64 20v88" stroke="#c7b299" strokeWidth="3" opacity="0.6" />
    </svg>
  );
}

export function QuartLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className} aria-hidden>
      <rect x="20" y="20" width="40" height="40" rx="6" fill="none" stroke="#2F6FAB" strokeWidth="5" />
      <rect x="68" y="20" width="40" height="40" rx="6" fill="none" stroke="#5BA3D0" strokeWidth="5" />
      <rect x="20" y="68" width="40" height="40" rx="6" fill="none" stroke="#5BA3D0" strokeWidth="5" />
      <rect x="68" y="68" width="40" height="40" rx="6" fill="none" stroke="#2F6FAB" strokeWidth="5" />
    </svg>
  );
}

export function SanicLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className} aria-hidden>
      <path
        d="M32 96L64 24l32 72H32z"
        fill="none"
        stroke="#2d92cd"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path d="M48 72h32" stroke="#ffce54" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function FalconLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className} aria-hidden>
      <path
        d="M20 88L64 28l44 60H20z"
        fill="none"
        stroke="#737373"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M40 72h48" stroke="#E6522C" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function LitestarLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className} aria-hidden>
      <path
        d="M64 8l14 42h44L82 74l14 46-32-24-32 24 14-46-40-24h44z"
        fill="none"
        stroke="#EDB641"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CherryPyLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className} aria-hidden>
      <path
        d="M64 20c-8 16-8 32 0 48"
        stroke="#6B4423"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="48" cy="88" r="18" fill="none" stroke="#C41E3A" strokeWidth="4" />
      <circle cx="80" cy="88" r="18" fill="none" stroke="#8B1538" strokeWidth="4" />
    </svg>
  );
}

export function BlackSheepLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className} aria-hidden>
      <ellipse cx="64" cy="72" rx="36" ry="28" fill="none" stroke="#2d3748" strokeWidth="5" />
      <circle cx="44" cy="56" r="10" fill="none" stroke="#2d3748" strokeWidth="4" />
      <circle cx="84" cy="56" r="10" fill="none" stroke="#2d3748" strokeWidth="4" />
      <path d="M64 44v-16" stroke="#2d3748" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function HugLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className} aria-hidden>
      <path
        d="M32 96V32h24c16 0 28 12 28 28s-12 28-28 28H48v28H32zm16-44h8c8 0 12-4 12-12s-4-12-12-12h-8v24z"
        fill="none"
        stroke="#3B9AC7"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const TECH_LOGOS: {
  name: string;
  Logo: ComponentType<LogoProps>;
  color: string;
}[] = [
  { name: "Django", Logo: DjangoLogo, color: "#2BA977" },
  { name: "Flask", Logo: FlaskLogo, color: "#ffffff" },
  { name: "FastAPI", Logo: FastAPILogo, color: "#009688" },
  { name: "Starlette", Logo: StarletteLogo, color: "#E89B43" },
  { name: "aiohttp", Logo: AiohttpLogo, color: "#2C5BB4" },
  { name: "Tornado", Logo: TornadoLogo, color: "#6B9BD1" },
  { name: "Bottle", Logo: BottleLogo, color: "#7C9CB4" },
  { name: "Pyramid", Logo: PyramidLogo, color: "#1f355a" },
  { name: "Quart", Logo: QuartLogo, color: "#2F6FAB" },
  { name: "Sanic", Logo: SanicLogo, color: "#2d92cd" },
  { name: "Falcon", Logo: FalconLogo, color: "#E6522C" },
  { name: "Litestar", Logo: LitestarLogo, color: "#EDB641" },
  { name: "CherryPy", Logo: CherryPyLogo, color: "#C41E3A" },
  { name: "BlackSheep", Logo: BlackSheepLogo, color: "#2d3748" },
  { name: "Hug", Logo: HugLogo, color: "#3B9AC7" },
];
