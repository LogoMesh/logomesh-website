"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

const FINDINGS = [
  {
    key: "Property",
    value: "hit_rate should always be ≤ 1.0 (it's a rate)",
    valueClass: "text-[#e6edf3]",
  },
  {
    key: "I called",
    value: "hit_rate(hits=10, misses=5)",
    valueClass: "text-[#c4ff00]",
    valueBg: "rgba(196,255,0,0.07)",
  },
  {
    key: "Got",
    value: "2.0",
    valueClass: "text-[#f85149] font-bold",
    valueBg: "rgba(248,81,73,0.1)",
  },
  {
    key: "Location",
    value: "aiohttp/cache.py, line 148",
    valueClass: "text-[#8b949e]",
  },
];

// Syntax-tinted regression test — mimics GitHub fenced code block
function RegressionTest() {
  return (
    <div
      className="mt-5 border border-[var(--color-border-hi)] overflow-hidden"
      style={{ background: "#0d1117" }}
    >
      <div
        className="px-3 py-1.5 border-b border-[var(--color-border-hi)] flex items-center justify-between"
        style={{ background: "rgba(110,118,129,0.05)" }}
      >
        <span className="text-[11px] uppercase tracking-[0.1em] text-[#8b949e] font-semibold">
          Regression test · added by LogoMesh
        </span>
        <span className="text-[11px] text-[#8b949e] font-[family-name:var(--font-mono)]">
          tests/test_cache_logomesh.py
        </span>
      </div>
      <pre className="px-4 py-3 text-[12.5px] leading-[1.7] font-[family-name:var(--font-mono)] overflow-x-auto">
        <code>
          <span style={{ color: "#8b949e" }}>
            # Locks the bug — merging without a fix will fail this
          </span>
          {"\n"}
          <span style={{ color: "#ff7b72" }}>def</span>{" "}
          <span style={{ color: "#d2a8ff" }}>test_hit_rate_bounded_above_by_one</span>
          <span style={{ color: "#e6edf3" }}>():</span>
          {"\n    "}
          <span style={{ color: "#ff7b72" }}>assert</span>{" "}
          <span style={{ color: "#79c0ff" }}>hit_rate</span>
          <span style={{ color: "#e6edf3" }}>(</span>
          <span style={{ color: "#ffa657" }}>10</span>
          <span style={{ color: "#e6edf3" }}>, </span>
          <span style={{ color: "#ffa657" }}>5</span>
          <span style={{ color: "#e6edf3" }}>) </span>
          <span style={{ color: "#ff7b72" }}>&lt;=</span>{" "}
          <span style={{ color: "#ffa657" }}>1.0</span>
        </code>
      </pre>
    </div>
  );
}

export function GitHubComment() {
  return (
    <div
      className="border border-[var(--color-border-hi)] overflow-hidden text-left"
      style={{ background: "#0d1117", fontFamily: "var(--font-mono)" }}
    >
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border-hi)]"
        style={{ background: "#161b22" }}
      >
        <div className="flex items-center gap-1.5 flex-wrap">
          <div
            className="w-6 h-6 flex items-center justify-center text-black font-bold text-[11px] flex-shrink-0"
            style={{ background: "#c4ff00" }}
          >
            LM
          </div>
          <span className="text-[#e6edf3] text-[14px] font-semibold">logomesh</span>
          <span
            className="text-[11px] font-bold px-1.5 py-0.5 border border-[#388bfd]/40"
            style={{ color: "#388bfd", background: "rgba(56,139,253,0.08)" }}
          >
            bot
          </span>
          <span className="text-[#8b949e] text-[12px] hidden xs:block">commented 2 min ago</span>
        </div>
        <span className="text-[12px] text-[#8b949e] hidden sm:block">on aiohttp/cache.py</span>
      </div>

      <div className="px-5 py-5">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2.5 mb-5 pb-4 border-b border-[var(--color-border-hi)]"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <span
            className="font-bold text-[12px] px-2 py-0.5"
            style={{
              background: "rgba(248,81,73,0.15)",
              color: "#f85149",
              border: "1px solid rgba(248,81,73,0.3)",
            }}
          >
            1 ISSUE FOUND
          </span>
          <span className="text-[#e6edf3] text-[14px] sm:text-[15px] font-semibold min-w-0 break-words">
            Cache hit-rate can exceed 1.0
          </span>
        </motion.div>

        <div className="space-y-2.5 font-[family-name:var(--font-mono)] text-[13px] sm:text-[14px] leading-[1.65]">
          {FINDINGS.map(({ key, value, valueClass, valueBg }, i) => (
            <motion.div
              key={key}
              className="grid grid-cols-[70px_1fr] sm:grid-cols-[80px_1fr] gap-2 sm:gap-3"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, ease: EASE, delay: 0.15 + i * 0.12 }}
            >
              <span className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#8b949e] pt-px">
                {key}
              </span>
              <span
                className={`${valueClass} px-1.5 rounded break-all min-w-0`}
                style={valueBg ? { background: valueBg } : undefined}
              >
                {value}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.75 }}
        >
          <RegressionTest />
        </motion.div>

        <motion.div
          className="mt-5 pt-4 border-t border-[var(--color-border-hi)] flex flex-wrap items-center gap-x-2 gap-y-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 1.1 }}
        >
          <span className="text-[12px] text-[#8b949e]">
            Confirmed caller-reachable · 23 tests run ·{" "}
          </span>
          <span className="text-[12px] font-bold" style={{ color: "#c4ff00" }}>
            ✓ reproducible
          </span>
        </motion.div>
      </div>
    </div>
  );
}
