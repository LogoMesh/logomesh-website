import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { ContactForm } from "@/components/contact/ContactForm";
import { CONTACT_EMAIL } from "@/lib/contact";

const GITHUB_APP_URL = "https://github.com/apps/logomesh";

export function ContactView() {
  return (
    <main className="relative z-[1] w-full min-w-0 flex-1">
      <section
        className="relative overflow-hidden border-b border-[var(--color-border)] bg-gradient-hero"
        aria-labelledby="contact-hero-heading"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.08) 50%, transparent 100%)",
          }}
        />
        <div className="mx-auto max-w-[1280px] px-4 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-12 md:px-10 md:pb-20">
          <p className="font-[family-name:var(--font-mono)] text-[12.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)] sm:text-[13px]">
            LogoMesh
          </p>
          <h1
            id="contact-hero-heading"
            className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-[var(--color-ink)]"
          >
            Contact
          </h1>
          <p className="read-max mt-4 max-w-[34rem] text-[16px] leading-relaxed text-[var(--color-muted)] sm:text-[17px] sm:leading-[1.65]">
            Ask about the beta, your stack, or a partnership. Short form below: we kept
            fields light on purpose so sending a note feels fast.
          </p>
        </div>
      </section>

      <section
        className="mx-auto max-w-[1280px] px-4 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20"
        aria-labelledby="contact-form-heading"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-14 xl:gap-16">
          <div className="rounded-2xl border border-[var(--color-border-hi)] bg-[var(--color-canvas-2)] p-6 shadow-[var(--shadow-card)] sm:p-8 md:p-10">
            <h2
              id="contact-form-heading"
              className="font-[family-name:var(--font-display)] text-[clamp(1.35rem,2.5vw,1.75rem)] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]"
            >
              Send a message
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted)] sm:text-[16px]">
              Submit opens your email app with your message filled in. No backend required.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="flex flex-col gap-6 lg:pt-2">
            <div className="rounded-2xl border border-[var(--color-border-hi)] bg-[var(--color-canvas)] p-6">
              <p className="font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]">
                Other ways to reach us
              </p>
              <ul className="mt-4 flex list-none flex-col gap-4 p-0">
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="group flex gap-3 rounded-lg border border-transparent p-2 transition-colors hover:border-[var(--color-border-hi)] hover:bg-[var(--color-canvas-2)]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-muted)]/15 text-[var(--color-accent)]">
                      <Mail className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15px] font-semibold text-[var(--color-ink)]">
                        Email
                      </span>
                      <span className="block break-all text-[14px] text-[var(--color-muted)] group-hover:text-[var(--color-ink)]">
                        {CONTACT_EMAIL}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={GITHUB_APP_URL}
                    className="group flex gap-3 rounded-lg border border-transparent p-2 transition-colors hover:border-[var(--color-border-hi)] hover:bg-[var(--color-canvas-2)]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-muted)]/15 text-[var(--color-ink)]">
                      <GithubIcon size={22} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15px] font-semibold text-[var(--color-ink)]">
                        GitHub App
                      </span>
                      <span className="block text-[14px] text-[var(--color-muted)] group-hover:text-[var(--color-ink)]">
                        Install or manage the integration
                      </span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <p className="text-[14px] leading-relaxed text-[var(--color-dim)]">
              Want to see it in action?{" "}
              <Link
                href="/#proof"
                className="font-medium text-[var(--color-accent)] underline-offset-2 hover:underline"
              >
                See real PRs
              </Link>{" "}
              we caught bugs in.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
