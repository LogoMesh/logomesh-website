"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ArrowRight, PlayCircle, ShieldCheck, TimerReset } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { FrameworkTabs } from "./FrameworkTabs";

const PROOF_METRICS = [
  { icon: TimerReset, value: "12s", text: "median review per PR" },
  { icon: ShieldCheck, value: "0", text: "false alarms in beta" },
] as const;

export function Hero() {
  return (
    <section id="hero" className="bg-gradient-hero relative w-full overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.08) 50%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-12 px-5 pt-14 pb-22 sm:px-8 sm:pt-20 sm:pb-28 md:gap-14 md:px-10 md:pt-24 md:pb-34 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-18 lg:pt-28 xl:pt-30">
        <div className="flex flex-col">
          <p className="animate-rise rise-d1 font-sans text-[12px] font-normal uppercase tracking-[0.22em] text-muted-foreground">
            <span
              aria-hidden
              className="mr-2 inline-block h-[7px] w-[7px] translate-y-[-2px] rounded-full bg-primary align-middle"
              style={{ boxShadow: "0 0 12px hsl(78 100% 50% / 0.6)" }}
            />
            Public beta · Python
          </p>

          <h1 className="animate-rise rise-d2 mt-6 font-sans text-[clamp(2.5rem,8vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-foreground sm:leading-[0.92]">
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

          <p className="animate-rise rise-d3 mt-7 max-w-[38rem] text-[17px] leading-[1.6] text-muted-foreground sm:text-[18.5px]">
            LogoMesh is an AI teammate that tests every pull request, proves
            exactly how it breaks, and posts the fix.{" "}
            <span className="font-medium text-foreground">Zero false alarms.</span>
          </p>

          <p className="animate-rise rise-d3 mt-5 max-w-[40rem] font-sans text-[12px] uppercase leading-relaxed tracking-[0.16em] text-dim">
            adversarial property tests
            <span className="mx-2 text-border-strong">·</span>
            docker sandboxed
            <span className="mx-2 text-border-strong">·</span>
            comments only with reproducible proof
          </p>

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

          <div className="animate-rise rise-d5 mt-6 flex flex-wrap gap-3">
            <motion.a
              href="https://agentbeats.berkeley.edu"
              target="_blank"
              rel="noreferrer noopener"
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
              className="glass group inline-flex min-h-[46px] items-center gap-2.5 rounded-full px-3.5 py-2"
            >
              <Image
                src="/california_golden_bears.png"
                alt="California Golden Bears"
                width={20}
                height={20}
                className="h-4 w-auto opacity-90"
              />
              <span className="font-sans text-[11.5px] uppercase tracking-[0.14em] text-muted-foreground">
                <span className="text-foreground/90">1st place</span>
                <span className="mx-2 text-dim">·</span>
                UC Berkeley AgentBeats
              </span>
            </motion.a>

            {PROOF_METRICS.map(({ icon: Icon, value, text }) => (
              <div
                key={text}
                className="inline-flex min-h-[46px] items-center gap-2.5 rounded-full border border-border-strong bg-card/50 px-4 py-2 font-sans text-[11.5px] uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-sm"
              >
                <Icon size={13} className="text-primary/80" />
                <span className="text-foreground">{value}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>

          <p className="animate-rise rise-d6 mt-5 font-sans text-[11px] uppercase tracking-[0.14em] text-dim">
            Install on a repo. Open a pull request. Wait for proof.
          </p>
        </div>

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
