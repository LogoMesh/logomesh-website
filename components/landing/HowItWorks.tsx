"use client";

import { motion } from "motion/react";
import { GitPullRequest, FlaskConical, MessageSquareCode } from "lucide-react";
import { EASE } from "@/lib/motion";

const STEPS = [
  {
    n: "01",
    icon: GitPullRequest,
    title: "You open a pull request.",
    body: "LogoMesh listens for PR events on any repo where the GitHub App is installed — no config, no CI wiring.",
  },
  {
    n: "02",
    icon: FlaskConical,
    title: "We test it in a sandbox.",
    body: "The diff runs inside a hardened Docker container. Adversarial inputs attack the functions that changed — negative values, empty payloads, retry storms.",
  },
  {
    n: "03",
    icon: MessageSquareCode,
    title: "The bug and the fix arrive together.",
    body: "If — and only if — LogoMesh can reproduce a crash, you get a single PR comment with the failing input, the expected behavior, and a patch you can copy.",
  },
] as const;

export function HowItWorks() {
  return (
    <section
      id="how"
      className="relative w-full overflow-hidden border-t border-border py-24 sm:py-32 md:py-40"
    >
      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[44rem]"
        >
          <p className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.22em] text-muted-foreground">
            <span
              aria-hidden
              className="mr-2 inline-block h-[7px] w-[7px] translate-y-[-2px] rounded-full bg-primary align-middle"
              style={{ boxShadow: "0 0 12px hsl(78 100% 50% / 0.55)" }}
            />
            How it works
          </p>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.02] tracking-[-0.03em] text-foreground">
            Three steps.{" "}
            <span className="italic text-muted-foreground">No configuration.</span>
          </h2>
        </motion.div>

        {/* Pipeline stepper */}
        <div className="relative mt-14 sm:mt-16">
          {/* Connecting rail — desktop only */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-8 hidden h-px md:block"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.45) 10%, hsl(var(--primary) / 0.45) 90%, transparent 100%)",
            }}
          />

          <ol className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.li
                  key={s.n}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.1 + i * 0.12 }}
                  className="relative"
                >
                  {/* Step node on rail */}
                  <div className="mb-4 hidden items-center gap-3 md:flex">
                    <span
                      className="glow-primary flex h-8 w-8 items-center justify-center rounded-full bg-primary"
                      style={{ boxShadow: "0 0 24px hsl(78 100% 50% / 0.4)" }}
                    >
                      <Icon
                        size={14}
                        className="text-primary-foreground"
                        strokeWidth={2.4}
                      />
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-primary">
                      Step {s.n}
                    </span>
                  </div>

                  <div className="glass h-full rounded-xl p-6 sm:p-7">
                    {/* Mobile number */}
                    <div className="mb-3 flex items-center gap-3 md:hidden">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                        <Icon
                          size={14}
                          className="text-primary-foreground"
                          strokeWidth={2.4}
                        />
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-primary">
                        Step {s.n}
                      </span>
                    </div>

                    <h3 className="font-[family-name:var(--font-display)] text-[22px] font-normal leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[24px]">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground sm:text-[15.5px]">
                      {s.body}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
