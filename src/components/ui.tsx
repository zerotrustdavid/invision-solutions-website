import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

function Section({
  children,
  className = "",
  id,
  tone = "paper",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "paper" | "panel";
}) {
  return (
    <section
      id={id}
      className={`px-6 py-20 sm:px-10 sm:py-28 ${tone === "panel" ? "bg-panel-alt" : "bg-paper"} ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold-ink">
      {children}
    </p>
  );
}

function SurfaceCard({
  children,
  className = "",
  raised = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  raised?: boolean;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`${raised ? "surface-raised" : "surface"} rounded-xl p-6 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-sans text-sm font-medium text-paper transition-opacity hover:opacity-88"
    >
      {children}
    </Link>
  );
}

function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 font-sans text-sm font-medium text-ink transition-colors hover:border-ink/35 hover:bg-panel"
    >
      {children}
    </Link>
  );
}

/**
 * Buttons for links that leave the site. Kept separate from the internal
 * variants so `target`/`rel` and the outbound affordance can never be
 * forgotten at a call site — `rel="noopener"` in particular is a security
 * requirement, not a stylistic one, since without it the opened page gets a
 * handle on this one via `window.opener`.
 */
function ExternalPrimaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-sans text-sm font-medium text-paper transition-opacity hover:opacity-88"
    >
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function ExternalSecondaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 font-sans text-sm font-medium text-ink transition-colors hover:border-ink/35 hover:bg-panel"
    >
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function NumberedStep({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-5">
      <span className="font-mono text-2xl font-light text-gold-ink">{number}</span>
      <div>
        <h3 className="font-display text-xl font-medium text-ink">{title}</h3>
        <p className="mt-2 leading-relaxed text-slate">{children}</p>
      </div>
    </div>
  );
}

function StatusTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-gold-ink/30 bg-gold/8 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink">
      {children}
    </span>
  );
}

export {
  Section,
  Eyebrow,
  SurfaceCard,
  PrimaryButton,
  SecondaryButton,
  ExternalPrimaryButton,
  ExternalSecondaryButton,
  NumberedStep,
  StatusTag,
};
