"use client";

import { useRef, useState, type MouseEvent } from "react";
import { motion } from "motion/react";
import { GithubIcon } from "./icons/GithubIcon";
import { EASE } from "@/lib/motion";

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative overflow-hidden border-t border-[var(--color-border)] text-center py-32 px-10"
      style={{ background: "var(--color-canvas-2)" }}
      onMouseMove={handleMouseMove}
    >
      {/* Mouse-tracking radial glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${glowPos.x}% ${glowPos.y}%, rgba(196,255,0,0.07) 0%, transparent 65%)`,
        }}
        aria-hidden
      />

      <motion.h2
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: EASE }}
        className="relative font-[family-name:var(--font-display)] text-[clamp(36px,5vw,70px)] font-extrabold leading-[0.93] tracking-[-0.04em] mb-3"
      >
        Install once.
        <br />
        <span
          className="text-[var(--color-accent)]"
          style={{
            textShadow:
              "0 0 22px rgba(196,255,0,0.55), 0 0 48px rgba(196,255,0,0.35), 0 0 90px rgba(196,255,0,0.2)",
          }}
        >
          Find the bug
        </span>
        <br />
        you were about
        <br />
        to ship.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.12 }}
        className="relative text-[17px] text-[var(--color-muted)] mb-14"
      >
        Free for public repos. No configuration. Works on the next PR you open.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: EASE, delay: 0.18 }}
        className="relative"
      >
        <motion.a
          href="https://github.com/apps/logomesh"
          className="inline-flex items-center gap-3 bg-[var(--color-accent)] text-black px-12 py-5 font-[family-name:var(--font-mono)] text-[15px] font-bold"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <GithubIcon size={18} />
          Install on GitHub — it&rsquo;s free
        </motion.a>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.28 }}
        className="relative mt-7 font-[family-name:var(--font-mono)] text-[11.5px] text-[var(--color-dim)]"
      >
        Private repos coming soon · No config required
      </motion.p>
    </section>
  );
}
