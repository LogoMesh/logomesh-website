"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ArrowRight, PlayCircle, Zap, ShieldCheck, MousePointerClick } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { FrameworkTabs } from "./FrameworkTabs";

const MICROCOPY = [
  { icon: Zap, text: "avg. 12s per PR" },
  { icon: ShieldCheck, text: "never blocks merge" },
  { icon: MousePointerClick, text: "uninstall in 2 clicks" },
] as const;

export function Hero() {
  return (
    <section
      id="hero"
      className="bg-gradient-hero relative w-full overflow-hidden"
    >
      {/* Subtle edge fade — anchors the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.08) 50%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-12 px-5 pt-14 pb-24 sm:px-8 sm:pt-20 sm:pb-28 md:gap-16 md:px-10 md:pt-24 md:pb-36 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20 lg:pt-28 xl:pt-32">
        {/* ─── LEFT: copy cluster ─── */}
        <div className="flex flex-col">
          {/* Beta kicker */}
          <p className="animate-rise rise-d1 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.22em] text-muted-foreground">
            <span
              aria-hidden
              className="mr-2 inline-block h-[7px] w-[7px] translate-y-[-2px] rounded-full bg-primary align-middle"
              style={{ boxShadow: "0 0 12px hsl(78 100% 50% / 0.6)" }}
            />
            Public beta · Python
          </p>

          {/* H1 — brutalist serif w/ red bug accent */}
          <h1 className="animate-rise rise-d2 mt-6 font-[family-name:var(--font-display)] text-[clamp(2.5rem,8vw,5.5rem)] font-normal leading-[0.94] tracking-[-0.035em] text-foreground sm:leading-[0.92]">
            Catch the{" "}
            <span
              className="text-destructive"
              style={{
                textShadow:
                  "0 0 36px hsl(0 84% 60% / 0.55), 0 0 80px hsl(0 84% 60% / 0.25)",
              }}
            >
              bug
            </span>
            <br />
            before it ships
            <br />
            to production.
          </h1>

          {/* Plain-English sub */}
          <p className="animate-rise rise-d3 mt-7 max-w-[38rem] text-[17px] leading-[1.6] text-muted-foreground sm:text-[18.5px]">
            LogoMesh is an AI teammate that tests every pull request, proves
            exactly how it breaks, and posts the fix.{" "}
            <span className="font-medium text-foreground">Zero false alarms.</span>
          </p>

          {/* Tertiary mono — technical pride */}
          <p className="animate-rise rise-d3 mt-5 font-[family-name:var(--font-mono)] text-[12px] uppercase leading-relaxed tracking-[0.16em] text-dim">
            infers guarantees
            <span className="mx-2 text-border-strong">·</span>
            adversarial fuzzing
            <span className="mx-2 text-border-strong">·</span>
            docker-sandboxed
            <span className="mx-2 text-border-strong">·</span>
            only speaks when 100% confirmed
          </p>

          {/* CTA cluster */}
          <div className="animate-rise rise-d4 mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
            <motion.a
              href="https://github.com/apps/logomesh"
              className="glow-primary group relative inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-primary px-6 text-[15px] font-semibold text-primary-foreground"
              whileHover={{ y: -1, boxShadow: "var(--shadow-glow-hover)" }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
            >
              <GithubIcon size={17} />
              Install on GitHub — it&rsquo;s free
              <ArrowRight
                size={16}
                className="-mr-1 opacity-60 transition-transform group-hover:translate-x-0.5"
              />
            </motion.a>

            <motion.a
              href="#demo"
              className="group inline-flex min-h-[52px] items-center gap-2 rounded-xl border border-border-strong bg-card/40 px-5 text-[14.5px] font-medium text-foreground/90 backdrop-blur-sm hover:border-primary/50 hover:text-foreground"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
            >
              <PlayCircle size={17} className="text-primary/80 group-hover:text-primary" />
              See a live demo
            </motion.a>
          </div>

          {/* Microcopy row */}
          <div className="animate-rise rise-d5 mt-7 flex flex-wrap items-center gap-x-5 gap-y-2.5 font-[family-name:var(--font-mono)] text-[12.5px] text-dim">
            {MICROCOPY.map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-1.5">
                <Icon size={12} className="text-primary/70" />
                {text}
              </span>
            ))}
          </div>

          {/* Credibility chip */}
          <div className="animate-rise rise-d6 mt-8">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-card/50 px-3.5 py-1.5 font-[family-name:var(--font-mono)] text-[11.5px] uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-sm">
              <Image
                src="/california_golden_bears.png"
                alt="California Golden Bears"
                width={20}
                height={20}
                className="h-4 w-auto opacity-90"
              />
              <span className="text-foreground/90">1st place</span>
              <span className="text-dim">·</span>
              UC Berkeley AgentBeats — Software Testing Track
            </span>
          </div>
        </div>

        {/* ─── RIGHT: animated terminal cluster ─── */}
        <motion.div
          id="demo"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          className="relative w-full self-center scroll-mt-28"
        >
          <FrameworkTabs />
        </motion.div>
      </div>
    </section>
  );
}
