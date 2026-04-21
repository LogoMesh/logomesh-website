"use client";

import { useMemo, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/contact";

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [touched, setTouched] = useState(false);
  const [openedMailto, setOpenedMailto] = useState(false);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Add your name so we know how to greet you.";
    if (!email.trim()) e.email = "We need an email to reply.";
    else if (!isValidEmail(email)) e.email = "That does not look like a full email address.";
    if (!body.trim()) e.body = "Tell us what you need.";
    else if (body.trim().length < 12)
      e.body = "A few more words help us route your note.";
    return e;
  }, [name, email, body]);

  const canSubmit = Object.keys(errors).length === 0;

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setTouched(true);
    if (!canSubmit) return;

    const subject = `LogoMesh contact from ${name.trim()}`;
    const text = `${body.trim()}\n\nReply to: ${email.trim()} (${name.trim()})`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;

    const maxLen = 1900;
    if (mailto.length > maxLen) {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
      setOpenedMailto(true);
      return;
    }

    window.location.href = mailto;
    setOpenedMailto(true);
  }

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-[var(--color-border-hi)] bg-[var(--color-canvas)] px-3.5 py-2.5 text-[15px] text-[var(--color-ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] outline-none transition-[border-color,box-shadow] placeholder:text-[var(--color-dim)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/25";

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit}
      noValidate
      aria-describedby="contact-form-hint"
    >
      <p id="contact-form-hint" className="sr-only">
        Required fields are marked. Submit opens your email app with this message
        prefilled.
      </p>

      <div>
        <label
          htmlFor="contact-name"
          className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]"
        >
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched(true)}
          className={inputClass}
          aria-invalid={touched && !!errors.name}
          aria-describedby={touched && errors.name ? "err-name" : undefined}
        />
        {touched && errors.name ? (
          <p id="err-name" className="mt-1.5 text-[13px] text-[var(--color-danger)]" role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]"
        >
          Work email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          className={inputClass}
          aria-invalid={touched && !!errors.email}
          aria-describedby={touched && errors.email ? "err-email" : undefined}
        />
        {touched && errors.email ? (
          <p id="err-email" className="mt-1.5 text-[13px] text-[var(--color-danger)]" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="contact-body"
          className="font-[family-name:var(--font-mono)] text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]"
        >
          What should we know?
        </label>
        <textarea
          id="contact-body"
          name="message"
          rows={6}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onBlur={() => setTouched(true)}
          className={`${inputClass} min-h-[140px] resize-y`}
          aria-invalid={touched && !!errors.body}
          aria-describedby={touched && errors.body ? "err-body" : undefined}
        />
        {touched && errors.body ? (
          <p id="err-body" className="mt-1.5 text-[13px] text-[var(--color-danger)]" role="alert">
            {errors.body}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[var(--color-accent)] px-6 py-3 font-[family-name:var(--font-mono)] text-[13px] font-bold uppercase tracking-wide text-black transition-opacity hover:opacity-90 active:opacity-95"
        >
          Send message
        </button>
        <p className="text-[13px] leading-relaxed text-[var(--color-dim)] sm:max-w-[14rem] sm:text-right">
          We read every note. Most replies land within two business days.
        </p>
      </div>

      {openedMailto ? (
        <p
          className="rounded-lg border border-[var(--color-border-hi)] bg-[var(--color-canvas-3)] px-4 py-3 text-[14px] leading-relaxed text-[var(--color-muted)]"
          role="status"
        >
          If your mail app did not open, email us directly at{" "}
          <a
            className="font-medium text-[var(--color-accent)] underline-offset-2 hover:underline"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
