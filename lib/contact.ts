/** Visitor-facing inbox. Override with NEXT_PUBLIC_CONTACT_EMAIL when you own the domain. */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@logomesh.com";
