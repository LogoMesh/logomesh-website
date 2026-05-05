"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SPRING_UI } from "@/lib/motion";
import { MediaPlaceholder } from "./MediaPlaceholder";

const PROOF_METRICS = [
  { label: "60-second repro" },
  { label: "500 tests passing" },
  { label: "Zero LLM in the repro path" },
] as const;

export function Hero() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    let cancelled = false;

    function init() {
      if (cancelled || !vantaRef.current || vantaEffect.current) return;
      if (typeof window === "undefined" || !window.THREE || !window.VANTA?.NET) return;
      vantaEffect.current = window.VANTA.NET({
        el: vantaRef.current,
        color: 0xc4ff00,
        backgroundColor: 0x0a0a0b,
        points: 8.0,
        maxDistance: 22.0,
        spacing: 18.0,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
      });
    }

    init();
    const poll = setInterval(() => {
      if (window.THREE && window.VANTA?.NET) {
        init();
        clearInterval(poll);
      }
    }, 150);

    return () => {
      cancelled = true;
      clearInterval(poll);
      vantaEffect.current?.destroy();
      vantaEffect.current = null;
    };
  }, []);

  return (
    <section
      id="hero"
      className="bg-gradient-hero relative flex min-h-[calc(100svh-4.5rem)] w-full min-w-0 flex-col justify-center overflow-hidden sm:min-h-[calc(100svh-5rem)]"
    >
      <div
        ref={vantaRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
      />
      <div aria-hidden className="landing-hero-aurora pointer-events-none absolute inset-0 overflow-hidden">
        <div className="landing-hero-aurora-orb landing-hero-aurora-orb--a" />
        <div className="landing-hero-aurora-orb landing-hero-aurora-orb--b" />
        <div className="landing-hero-aurora-orb landing-hero-aurora-orb--c" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.08) 50%, transparent 100%)",
        }}
      />

      <div className="relative z-[1] mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-10 px-5 py-10 sm:gap-12 sm:px-8 sm:py-14 md:gap-14 md:px-10 md:py-16 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-14 lg:py-10 xl:py-12">
        <div className="flex min-w-0 flex-col">
          <p className="animate-rise rise-d1 font-sans text-[13px] font-normal uppercase tracking-[0.2em] text-muted-foreground sm:text-[14px]">
            <span
              aria-hidden
              className="mr-2 inline-block h-[7px] w-[7px] translate-y-[-2px] rounded-full bg-primary align-middle"
              style={{ boxShadow: "0 0 12px hsl(78 100% 50% / 0.6)" }}
            />
            Free during beta · 3 reproductions a day
          </p>

          <h1 className="animate-rise rise-d2 mt-6 font-sans text-balance text-[clamp(2.25rem,7.2vw,5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-foreground sm:leading-[0.92]">
            Reproduce the{" "}
            <span
              className="text-destructive"
              style={{
                textShadow:
                  "0 0 36px hsl(0 84% 60% / 0.55), 0 0 80px hsl(0 84% 60% / 0.25)",
              }}
            >
              crash
            </span>
            <br />
            before you fix it.
          </h1>

          <div className="landing-hero-rule animate-rise rise-d2" aria-hidden />

          <p className="animate-rise rise-d3 read-max mt-7 text-[17px] leading-[1.68] text-muted-foreground sm:text-[19px] sm:leading-[1.65]">
            Sentry is an error monitoring tool. It fires when your app crashes in production and captures the program
            state at the moment of failure. LogoMesh reads that state and writes a failing pytest that reproduces the
            crash. About 60 seconds. The 30 to 40 minutes of manual reconstruction, gone.
          </p>

          <div className="animate-rise rise-d4 mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
            <motion.a
              href="/docs"
              className="glow-primary group relative inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-primary px-6 text-[15px] font-semibold text-primary-foreground sm:text-[16px]"
              whileHover={{ y: -1, boxShadow: "var(--shadow-glow-hover)" }}
              whileTap={{ scale: 0.985 }}
              transition={SPRING_UI}
            >
              Read the docs
              <ArrowRight
                size={16}
                className="-mr-1 opacity-60 transition-transform group-hover:translate-x-0.5"
              />
            </motion.a>

            <motion.a
              href="#how-it-works"
              className="group inline-flex min-h-[52px] items-center gap-2 rounded-xl border border-border-strong bg-card/40 px-5 text-[14px] font-medium text-foreground/90 backdrop-blur-sm hover:border-primary/50 hover:text-foreground sm:text-[14.5px]"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.985 }}
              transition={SPRING_UI}
            >
              See how it works
            </motion.a>
          </div>

          <div className="animate-rise rise-d5 mt-8 flex flex-wrap gap-2.5">
            <motion.a
              href="https://agentbeats.berkeley.edu"
              target="_blank"
              rel="noreferrer noopener"
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
              className="glass group inline-flex min-h-[38px] items-center gap-2 rounded-full px-3.5 py-1.5"
            >
              <Image
                src="/california_golden_bears.png"
                alt="California Golden Bears"
                width={18}
                height={18}
                className="h-4 w-4 shrink-0 object-contain opacity-90"
              />
              <span className="font-sans text-[12.5px] uppercase tracking-[0.12em] text-muted-foreground sm:text-[13px]">
                <span className="text-foreground/90">1st place</span>
                <span className="mx-1.5 text-dim">·</span>
                UC Berkeley AgentBeats
              </span>
            </motion.a>

            {PROOF_METRICS.map(({ label }) => (
              <div
                key={label}
                className="inline-flex min-h-[38px] items-center rounded-full border border-border-strong/70 bg-card/30 px-3.5 py-1.5 font-sans text-[12.5px] font-medium leading-snug text-muted-foreground backdrop-blur-sm normal-case tracking-normal sm:text-[13px]"
              >
                <span className="text-foreground/85">{label}</span>
              </div>
            ))}
          </div>

        </div>

        <motion.div
          id="hero-product"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.45,
          }}
          className="relative w-full min-w-0 scroll-mt-28"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-[1.75rem] opacity-80 blur-3xl sm:-inset-8"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 50% 35%, rgba(196,255,0,0.14) 0%, transparent 62%)",
            }}
          />
          <MediaPlaceholder
            label="Hero demo — paste a Sentry URL, get a failing pytest in about 60 seconds"
            dropPath="/public/marketing/hero.mp4"
            spec="Screen Studio · ~12 s loop · 1800×1200 @2x"
            kind="video"
            emphasis="hero"
            aspectClassName="aspect-[16/11] min-h-[260px] sm:min-h-[320px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
