"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Ambient aurora mesh — flowing gradient blobs for ethereal backdrops.
 * Respects prefers-reduced-motion. Pointer-events none.
 */
export function AuroraField({ className = "" }: { className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute left-[-10%] top-[-20%] h-[55%] w-[55%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, hsl(78 100% 50% / 0.14) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
        animate={reducedMotion ? undefined : { x: [0, 60, -20, 0], y: [0, 40, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-15%] top-[20%] h-[60%] w-[60%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, hsl(274 72% 55% / 0.11) 0%, transparent 60%)",
          filter: "blur(90px)",
        }}
        animate={reducedMotion ? undefined : { x: [0, -50, 30, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-20%] left-[25%] h-[50%] w-[50%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, hsl(200 80% 55% / 0.08) 0%, transparent 60%)",
          filter: "blur(85px)",
        }}
        animate={reducedMotion ? undefined : { x: [0, 30, -40, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
