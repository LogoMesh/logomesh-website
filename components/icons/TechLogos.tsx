interface LogoProps {
  size?: number;
  className?: string;
}

export function PythonLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 255" className={className} aria-hidden>
      <defs>
        <linearGradient id="py-a" x1="12.96%" y1="12.04%" x2="79.64%" y2="78.13%">
          <stop offset="0%" stopColor="#387EB8" />
          <stop offset="100%" stopColor="#366994" />
        </linearGradient>
        <linearGradient id="py-b" x1="19.13%" y1="20.58%" x2="90.43%" y2="88.59%">
          <stop offset="0%" stopColor="#FFE052" />
          <stop offset="100%" stopColor="#FFC331" />
        </linearGradient>
      </defs>
      <path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" fill="url(#py-a)" />
      <path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" fill="url(#py-b)" />
    </svg>
  );
}

export function GitHubLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export function PytestLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className} aria-hidden>
      <g>
        <path d="M31.2 61.8h65.7v6.3H31.2z" fill="#696969" />
        <path d="M64 10l-5.5 9.5h11z" fill="#C7243A" />
        <path d="M64 10l5.5 9.5h22L64 10z" fill="#C7243A" opacity=".7" />
        <path d="M64 10l-5.5 9.5h-22L64 10z" fill="#C7243A" opacity=".5" />
        <rect x="40" y="28" width="48" height="6" rx="1" fill="#696969" />
        <rect x="35" y="40" width="24" height="16" rx="2" fill="#2EA043" />
        <rect x="69" y="40" width="24" height="16" rx="2" fill="#C7243A" />
        <rect x="35" y="74" width="58" height="6" rx="1" fill="#696969" />
        <rect x="35" y="86" width="40" height="6" rx="1" fill="#2EA043" />
        <rect x="35" y="98" width="50" height="6" rx="1" fill="#C7243A" />
        <rect x="35" y="110" width="30" height="6" rx="1" fill="#2EA043" />
      </g>
    </svg>
  );
}

export function DockerLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 185" className={className} aria-hidden>
      <path d="M250.716 70.497c-5.534-3.706-18.269-5.04-28.093-3.166-1.278-9.674-6.527-18.103-15.96-25.68l-5.44-3.614-3.616 5.44c-7.266 10.936-9.436 28.86-1.598 40.835-3.508 1.89-10.37 4.47-19.454 4.295H.55c-3.026 17.548 2.07 40.487 14.608 56.303 12.186 15.378 30.428 23.169 54.218 23.169 51.614 0 89.826-23.746 107.735-66.952 7.039.142 22.223.086 30.004-14.827.202-.346 2.018-4.166 6.533-13.607l2.395-4.896-5.327-3.5z" fill="#2396ED" />
      <path d="M42.864 68.354H66.36v23.497H42.864zM73.11 68.354h23.497v23.497H73.11zM103.355 68.354h23.497v23.497h-23.497zM133.6 68.354h23.497v23.497H133.6zM73.11 38.108h23.497v23.497H73.11zM103.355 38.108h23.497v23.497h-23.497zM133.6 38.108h23.497v23.497H133.6zM163.847 68.354h23.497v23.497h-23.497zM103.355 7.863h23.497V31.36h-23.497z" fill="#fff" />
    </svg>
  );
}

export function FlaskLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" className={className} aria-hidden>
      <path d="M168.453 57.915c1.701-8.014 3.603-16.476-.373-21.687-4.537-5.95-10.948-4.255-12.55 3.291-1.602 7.548-4.348 18.568-9.758 26.337-4.254 6.112-8.186 5.327-8.186 5.327s18.13-5.182 30.867-13.268z" fill="currentColor" opacity="0.8" />
      <path d="M128 8C57.308 8 0 65.308 0 136s57.308 128 128 128 128-57.308 128-128S198.692 8 128 8zm67.418 178.322c-13.578 15.692-35.174 25.678-67.418 25.678-32.244 0-53.84-9.986-67.418-25.678C46.996 170.626 40 150.78 40 136s6.996-34.626 20.582-50.322C74.16 69.986 95.756 60 128 60s53.84 9.986 67.418 25.678C209.004 101.374 216 121.22 216 136s-6.996 34.626-20.582 50.322z" fill="currentColor" opacity="0.6" />
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
      <path d="M114.784 0h53.278v244.191c-27.29 5.164-47.319 7.205-69.12 7.205C30.414 251.396 0 223.218 0 164.97 0 109.125 32.458 77.661 83.37 77.661c11.016 0 19.433 1.028 31.414 4.096V0zm0 117.756c-8.478-2.73-15.484-3.86-24.834-3.86-24.643 0-38.78 15.175-38.78 42.03 0 26.01 13.39 40.332 37.972 40.332 8.108 0 14.644-.693 25.642-2.389v-76.113z" fill="#2BA977" />
      <path d="M224.152 77.661v144.738c0 42.47-3.154 62.802-12.477 80.412-8.658 16.727-19.98 27.214-43.57 38.867l-49.49-23.526c23.59-10.905 34.912-20.84 42.47-36.485 7.963-16.085 10.558-34.681 10.558-80.937V77.661h52.509zM224.152 0v57.423h-52.509V0h52.509z" fill="#2BA977" />
    </svg>
  );
}

export function AiohttpLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className} aria-hidden>
      <circle cx="64" cy="64" r="56" fill="none" stroke="#2C5BB4" strokeWidth="6" />
      <path d="M64 20a44 44 0 0 1 0 88" fill="none" stroke="#2C5BB4" strokeWidth="6" strokeLinecap="round" />
      <path d="M64 20a44 44 0 0 0 0 88" fill="none" stroke="#4A9BD9" strokeWidth="6" strokeLinecap="round" strokeDasharray="12 8" />
      <circle cx="64" cy="64" r="8" fill="#2C5BB4" />
    </svg>
  );
}

export function RequestsLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className} aria-hidden>
      <circle cx="64" cy="64" r="56" fill="none" stroke="#DA5B0C" strokeWidth="4" />
      <path d="M40 64h48M76 48l12 16-12 16" fill="none" stroke="#DA5B0C" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PydanticLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className} aria-hidden>
      <path d="M64 12L112 40v48L64 116 16 88V40z" fill="none" stroke="#E6007A" strokeWidth="5" />
      <path d="M64 32L96 48v32L64 96 32 80V48z" fill="#E6007A" opacity="0.2" />
      <path d="M64 32L96 48v32L64 96 32 80V48z" fill="none" stroke="#E6007A" strokeWidth="3" />
      <circle cx="64" cy="64" r="10" fill="#E6007A" />
    </svg>
  );
}

export function SQLAlchemyLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className} aria-hidden>
      <ellipse cx="64" cy="36" rx="40" ry="14" fill="none" stroke="#CE2029" strokeWidth="4" />
      <path d="M24 36v56c0 7.7 17.9 14 40 14s40-6.3 40-14V36" fill="none" stroke="#CE2029" strokeWidth="4" />
      <path d="M24 56c0 7.7 17.9 14 40 14s40-6.3 40-14" fill="none" stroke="#CE2029" strokeWidth="4" opacity="0.5" />
      <path d="M24 76c0 7.7 17.9 14 40 14s40-6.3 40-14" fill="none" stroke="#CE2029" strokeWidth="4" opacity="0.5" />
    </svg>
  );
}

export function CeleryLogo({ size = 32, className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className} aria-hidden>
      <path d="M64 16c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z" fill="none" stroke="#A9CC54" strokeWidth="5" />
      <path d="M64 32v32l22 22" fill="none" stroke="#A9CC54" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="64" cy="64" r="5" fill="#A9CC54" />
    </svg>
  );
}

export const TECH_LOGOS: { name: string; Logo: React.ComponentType<LogoProps>; color: string }[] = [
  { name: "Python", Logo: PythonLogo, color: "#3776AB" },
  { name: "GitHub", Logo: GitHubLogo, color: "#ffffff" },
  { name: "pytest", Logo: PytestLogo, color: "#696969" },
  { name: "Docker", Logo: DockerLogo, color: "#2396ED" },
  { name: "Flask", Logo: FlaskLogo, color: "#ffffff" },
  { name: "FastAPI", Logo: FastAPILogo, color: "#009688" },
  { name: "Django", Logo: DjangoLogo, color: "#2BA977" },
  { name: "aiohttp", Logo: AiohttpLogo, color: "#2C5BB4" },
  { name: "Requests", Logo: RequestsLogo, color: "#DA5B0C" },
  { name: "Pydantic", Logo: PydanticLogo, color: "#E6007A" },
  { name: "SQLAlchemy", Logo: SQLAlchemyLogo, color: "#CE2029" },
  { name: "Celery", Logo: CeleryLogo, color: "#A9CC54" },
];
