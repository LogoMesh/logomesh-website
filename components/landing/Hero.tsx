"use client";

import { motion } from "motion/react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { EASE } from "@/lib/motion";
import { TerminalReplay } from "./TerminalReplay";

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto max-w-[1280px] overflow-hidden px-4 pb-14 pt-10 sm:px-8 sm:pb-16 sm:pt-16 md:px-10 md:pb-20 md:pt-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: "var(--background-image-gradient-hero)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--primary) / 0.06) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(ellipse 75% 55% at 18% 4%, rgba(0,0,0,0.75) 0%, transparent 68%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 55% at 18% 4%, rgba(0,0,0,0.75) 0%, transparent 68%)",
        }}
      />

      <FadeUp>
        <h1 className="font-display text-5xl font-extrabold leading-[0.92] tracking-[-0.04em] text-foreground md:text-7xl lg:text-8xl">
          Catch the{" "}
          <span
            className="text-destructive"
            style={{
              textShadow:
                "0 0 36px hsl(var(--destructive) / 0.45), 0 0 70px hsl(var(--destructive) / 0.2)",
            }}
          >
            bug
          </span>{" "}
          before it ships to production.
        </h1>
      </FadeUp>

      <FadeUp delay={0.06} className="mt-5 max-w-2xl sm:mt-6">
        <p className="text-lg leading-relaxed text-muted-foreground">
          LogoMesh is an AI teammate that tests every pull request, proves
          exactly how it breaks, and posts the fix. Zero false alarms.
        </p>
      </FadeUp>

      <FadeUp delay={0.1} className="mt-4">
        <p className="font-mono text-[11px] leading-relaxed text-muted-foreground/90 sm:text-xs">
          <span className="text-primary/90">Infers guarantees</span>
          <span className="text-muted-foreground/50"> · </span>
          adversarial fuzzing
          <span className="text-muted-foreground/50"> · </span>
          hardened Docker sandbox
          <span className="text-muted-foreground/50"> · </span>
          only speaks when 100% confirmed
        </p>
      </FadeUp>

      <FadeUp delay={0.14} className="mt-8 sm:mt-10">
        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
              <motion.a
                href="https://github.com/apps/logomesh"
                className="relative flex min-h-[48px] w-full items-center justify-center gap-2.5 bg-primary px-6 py-3.5 font-mono text-sm font-bold text-primary-foreground shadow-none transition-shadow duration-200 hover:shadow-glow-primary sm:w-auto sm:px-8 sm:py-4 sm:text-[14.5px]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <GithubIcon size={16} />
                Install on GitHub — it&rsquo;s free
              </motion.a>
              <motion.a
                href="#terminal-replay"
                className="flex min-h-[48px] w-full items-center justify-center border border-border bg-background/40 px-6 py-3.5 font-mono text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-card/60 sm:w-auto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                See a live demo
              </motion.a>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[11px] text-muted-foreground sm:text-[13px] sm:leading-snug">
              {([
                {
                  icon: (
                    <svg
                      className="h-[13px] w-[13px] shrink-0 sm:h-[14px] sm:w-[14px]"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M6.5 1L2.5 6.5H5.5L4.5 11L8.5 5.5H5.5L6.5 1Z"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.65}
                      />
                    </svg>
                  ),
                  text: "avg. 12s per PR",
                },
                {
                  icon: (
                    <svg
                      className="h-[13px] w-[13px] shrink-0 sm:h-[14px] sm:w-[14px]"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden
                    >
                      <circle
                        cx="6"
                        cy="6"
                        r="4.5"
                        stroke="hsl(var(--muted-foreground))"
                        strokeWidth="1.2"
                      />
                      <circle
                        cx="6"
                        cy="6"
                        r="1.5"
                        fill="hsl(var(--muted-foreground))"
                      />
                    </svg>
                  ),
                  text: "never blocks merge",
                },
                {
                  icon: (
                    <svg
                      className="h-[13px] w-[13px] shrink-0 sm:h-[14px] sm:w-[14px]"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M4.5 8.5L2 6L4.5 3.5M2 6h6a2 2 0 000-4"
                        stroke="hsl(var(--muted-foreground))"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                  text: "uninstall in 2 clicks",
                },
              ] as const).map(({ icon, text }) => (
                <span key={text} className="flex items-center gap-2">
                  {icon}
                  {text}
                </span>
              ))}
            </div>
          </div>

          <div className="flex max-w-md shrink-0 items-center gap-2 rounded-lg border border-border bg-card/50 px-3 py-2.5 font-mono text-[11px] leading-snug text-muted-foreground sm:text-xs lg:max-w-sm">
            <span className="text-base" aria-hidden>
              🏆
            </span>
            <span>
              1st place · UC Berkeley AgentBeats — Software Testing Track
            </span>
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={0.22} className="mt-10 md:mt-14">
        <TerminalReplay />
      </FadeUp>
    </section>
  );
}
