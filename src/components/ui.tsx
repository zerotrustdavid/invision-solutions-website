import Link from "next/link";
import type { ReactNode } from "react";

function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-6 py-20 sm:px-10 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal-gold">
      {children}
    </p>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass-panel rounded-lg p-6 sm:p-8 ${className}`}>{children}</div>
  );
}

function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-md bg-signal-gold px-6 py-3 font-sans text-sm font-medium text-void transition-colors hover:bg-signal-gold/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-gold"
    >
      {children}
    </Link>
  );
}

function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-md border border-trust-blue/30 px-6 py-3 font-sans text-sm font-medium text-platinum transition-colors hover:border-trust-blue/60 hover:bg-trust-blue/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-gold"
    >
      {children}
    </Link>
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
      <span className="font-mono text-2xl font-light text-signal-gold/70">{number}</span>
      <div>
        <h3 className="font-display text-xl text-platinum">{title}</h3>
        <p className="mt-2 text-slate leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function StatusTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-signal-gold border border-signal-gold/30 rounded px-2 py-1">
      {children}
    </span>
  );
}

export { Section, Eyebrow, GlassCard, PrimaryButton, SecondaryButton, NumberedStep, StatusTag };
