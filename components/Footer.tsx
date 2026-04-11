import { LogoMark } from "./LogoMark";

const LINKS = ["Docs", "GitHub", "Privacy", "Terms"];

// Dim pytest-style log fragments — what LogoMesh actually emits.
// Rendered as the footer background at ~3% opacity.
const LOG_FRAGMENT = `::test_checkout[qty=-5]          FAILED
    assert order.total >= 0
    AssertionError: total = -49.95

::test_transfer[amount=0]         PASSED
::test_refund[code='NaN']         FAILED
    ValueError: could not convert string to Decimal
::test_auth[user_id=2**31]        PASSED
::test_surge[mult=0.5,coupon=20]  FAILED
    AssertionError: fare = -0.00

sandbox · docker · airgapped · 128MB · 50 PIDs · nobody user
properties inferred: 3  ·  tests generated: 23  ·  crashes confirmed: 1
`;

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-border)] overflow-hidden">
      {/* ASCII log pattern — background layer */}
      <pre
        aria-hidden
        className="pointer-events-none absolute inset-0 font-[family-name:var(--font-mono)] text-[11px] leading-[14px] text-[var(--color-ink)] select-none whitespace-pre overflow-hidden px-10 py-6"
        style={{
          opacity: 0.035,
          maskImage:
            "linear-gradient(to right, transparent 0%, #000 15%, #000 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, #000 15%, #000 85%, transparent 100%)",
        }}
      >
        {LOG_FRAGMENT + LOG_FRAGMENT}
      </pre>

      {/* Content */}
      <div className="relative px-4 sm:px-10 py-7 flex flex-wrap items-center justify-between gap-5">
        <a
          href="#"
          className="inline-flex items-center gap-1.5 min-h-[44px]"
        >
          <LogoMark size={18} />
          <span
            className="font-mono text-[13.5px] font-semibold"
            style={{ letterSpacing: "-0.03em" }}
          >
            <span style={{ color: "rgba(196,255,0,0.45)" }}>logo</span>
            <span className="text-muted">mesh</span>
          </span>
        </a>
        <ul className="flex flex-wrap gap-x-7 gap-y-2 list-none">
          {LINKS.map((l) => (
            <li key={l}>
              <a
                href="#"
                className="inline-flex items-center min-h-[44px] font-[family-name:var(--font-mono)] text-[13px] text-[var(--color-dim)] hover:text-[var(--color-muted)] transition-colors"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <p className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--color-dim)]">
          Pre-merge verification. Only comments when it has proof.
        </p>
      </div>
    </footer>
  );
}
