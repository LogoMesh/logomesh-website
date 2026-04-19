"use client";

import { motion } from "motion/react";

const FRAMEWORKS = [
  "Django",
  "Flask",
  "FastAPI",
  "Starlette",
  "aiohttp",
  "Pyramid",
  "Tornado",
  "Pydantic",
  "SQLAlchemy",
  "Celery",
] as const;

const LOOP = [...FRAMEWORKS, ...FRAMEWORKS];

export function FrameworkMarquee() {
  return (
    <section aria-labelledby="framework-marquee-label" className="relative w-full overflow-hidden py-14 sm:py-18">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, hsl(var(--foreground) / 0.08) 50%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-10">
        <motion.p
          id="framework-marquee-label"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center font-sans text-[12px] uppercase tracking-[0.22em] text-muted-foreground"
        >
          Runs against every Python framework you ship with
        </motion.p>
      </div>

      <div
        className="relative mt-7 sm:mt-8"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div
          className="flex w-max animate-marquee [animation-duration:38s]"
          style={{ willChange: "transform" }}
        >
          {LOOP.map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="flex shrink-0 items-center gap-7 px-8 font-sans text-[clamp(1.9rem,4.8vw,3.45rem)] font-semibold leading-none tracking-[-0.025em] text-foreground/45"
            >
              {name}
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-primary/45" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
