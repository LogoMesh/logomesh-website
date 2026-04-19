import { CodeBlock } from "./CodeBlock";

const EXAMPLE = `async def test_checkout_total_non_negative():
    order = checkout(item_id=1, qty=-5)
    assert order.total >= 0`;

export async function HowItWorksBrief() {
  return (
    <section
      id="overview"
      className="w-full scroll-mt-[calc(5rem+env(safe-area-inset-top))] border-t border-[var(--color-border)] bg-[var(--color-canvas-2)] py-10 sm:py-12 md:py-14"
    >
      <div className="mx-auto max-w-[720px] px-4 sm:px-8 md:px-10">
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.35rem,4vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.03em] text-[var(--color-ink)]">
          How it works
        </h2>
        <ol className="mt-5 space-y-3 text-[15px] leading-relaxed text-[var(--color-muted)] sm:text-[16px]">
          <li>
            <span className="font-semibold text-[var(--color-ink)]">Infer</span> properties from your
            diff.
          </li>
          <li>
            <span className="font-semibold text-[var(--color-ink)]">Fuzz</span> those properties in a
            sandboxed run.
          </li>
          <li>
            <span className="font-semibold text-[var(--color-ink)]">Comment</span> only when a crash is
            reproducible — never for “maybe”.
          </li>
        </ol>
        <p className="mt-6 font-[family-name:var(--font-mono)] text-[12px] text-[var(--color-dim)] sm:text-[13px]">
          Example test LogoMesh might run against your PR:
        </p>
        <div className="mt-3">
          <CodeBlock code={EXAMPLE} lang="python" />
        </div>
      </div>
    </section>
  );
}
