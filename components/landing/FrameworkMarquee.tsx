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

// Duplicate once for seamless loop. CSS translates -50% for one full cycle.
const LOOP = [...FRAMEWORKS, ...FRAMEWORKS];

export function FrameworkMarquee() {
  return (
    <section
      aria-labelledby="framework-marquee-label"
      className="relative w-full overflow-hidden border-t border-border py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 md:px-10">
        <motion.p
          id="framework-marquee-label"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.22em] text-muted-foreground"
        >
          Runs against every Python framework you ship with
        </motion.p>
      </div>

      {/* Edge fade mask — gradient both sides */}
      <div
        className="relative mt-8 sm:mt-10"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="flex w-max animate-marquee" style={{ willChange: "transform" }}>
          {LOOP.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex shrink-0 items-center gap-10 px-10 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.75rem)] font-normal leading-none tracking-[-0.025em] text-foreground/55"
            >
              {name}
              <span
                aria-hidden
                className="text-primary/50"
                style={{ fontSize: "0.7em" }}
              >
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
