import type { BundledLanguage } from "shiki";
import { codeToTokensBase } from "shiki";
import { CopyCodeButton } from "./CopyCodeButton";

export async function CodeBlock({
  code,
  lang = "python",
}: {
  code: string;
  lang?: BundledLanguage;
}) {
  const trimmed = code.trim();
  const lines = await codeToTokensBase(trimmed, {
    lang,
    theme: "github-dark-dimmed",
  });

  return (
    <div className="group relative overflow-hidden rounded-lg border border-[var(--color-border-hi)] bg-[#0d1117]">
      <CopyCodeButton code={trimmed} />
      <pre className="overflow-x-auto px-4 py-4 pt-12 font-[family-name:var(--font-mono)] text-[12px] leading-relaxed sm:text-[13px]">
        <code>
          {lines.map((line, lineIndex) => (
            <span key={lineIndex} className="block whitespace-pre">
              {line.map((token, tokenIndex) => (
                <span
                  key={tokenIndex}
                  style={{ color: token.color ?? "inherit" }}
                >
                  {token.content}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
