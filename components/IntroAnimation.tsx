"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LogoMark } from "./LogoMark";

type Phase = "init" | "visible" | "exiting" | "done";

const SPLIT_EASE = [0.76, 0, 0.24, 1] as const;

export function IntroAnimation() {
  const [phase, setPhase] = useState<Phase>("init");

  useEffect(() => {
    // Lock scroll while intro plays
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setPhase("visible"), 80);
    const t2 = setTimeout(() => setPhase("exiting"), 950);
    const t3 = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 1700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  const isExiting = phase === "exiting";

  return (
    <div className="fixed inset-0 z-9999 pointer-events-auto">
      {/* Top panel */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[50%] bg-canvas"
        animate={isExiting ? { y: "-100%" } : { y: "0%" }}
        transition={{ duration: 0.65, ease: SPLIT_EASE }}
      />

      {/* Bottom panel */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[50%] bg-canvas"
        animate={isExiting ? { y: "100%" } : { y: "0%" }}
        transition={{ duration: 0.65, ease: SPLIT_EASE }}
      />

      {/* Seam flash — acid lime line at the split point */}
      <motion.div
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: "50%", height: "1px", background: "#c4ff00" }}
        initial={{ opacity: 0 }}
        animate={isExiting ? { opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 0.5, times: [0, 0.15, 1] }}
      />

      {/* Logo mark — centered, above both panels */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          animate={
            phase === "visible"
              ? { opacity: 1, scale: 1 }
              : phase === "exiting"
                ? { opacity: 0, scale: 1.06 }
                : { opacity: 0, scale: 0.82 }
          }
          transition={{
            duration: phase === "exiting" ? 0.25 : 0.3,
            ease: "easeOut",
          }}
          style={{ filter: "drop-shadow(0 0 24px rgba(196,255,0,0.35))" }}
        >
          <LogoMark size={56} />
        </motion.div>
      </div>
    </div>
  );
}
