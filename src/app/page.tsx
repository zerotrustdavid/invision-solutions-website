import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VerificationLedger } from "@/components/verification-ledger";
import { Reveal } from "@/components/reveal";
import {
  Section,
  Eyebrow,
  GlassCard,
  PrimaryButton,
  SecondaryButton,
  NumberedStep,
} from "@/components/ui";
import { SERVICES, CASE_STUDIES, CERTIFICATIONS_AND_STACK } from "@/lib/content";

const PILLARS = [
  {
    title: "Direct access, always.",
    body: "Every engagement is delivered by the person you spoke to on the first call — no account manager, no junior handoff, no diluted context.",
  },
  {
    title: "Full-stack security depth.",
    body: "Cloud architecture, DevSecOps, SIEM engineering, and compliance — under one roof, without coordinating four vendors.",
  },
  {
    title: "Zero Trust by default.",
    body: 'Every recommendation starts from "verify, don\'t assume" — in architecture, in access, and in how the work itself is governed.',
  },
];

const PROCESS_SNAPSHOT = [
  { number: "01", title: "Discover", body: "A direct conversation about the actual problem." },
  { number: "02", title: "Assess", body: "Hands-on review of the current environment." },
  { number: "03", title: "Build or Remediate", body: "The implementation work, delivered directly." },
  { number: "04", title: "Sustain", body: "Handover, documentation, and ongoing advisory." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden px-6 sm:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(62,111,224,0.08),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(201,162,39,0.06),transparent_45%)]"
        />
        <div className="relative mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal-gold">
              Cybersecurity · DevSecOps · Cloud Architecture
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] text-platinum sm:text-6xl lg:text-[4.5rem]">
              Senior-level security expertise. No layers in between.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
              Invision Solutions is a founder-led cybersecurity, DevSecOps,
              and cloud consultancy. One principal consultant, direct
              engagement, enterprise-grade outcomes.
            </p>
            <div className="mt-10">
              <PrimaryButton href="/contact">
                Start a conversation
                <ArrowRight size={16} />
              </PrimaryButton>
            </div>
          </div>

          <div className="lg:justify-self-end">
            <VerificationLedger
              lines={[
                "SESSION: DIRECT — NO INTERMEDIARY",
                "ROLE: PRINCIPAL CONSULTANT",
                "ACCESS MODEL: ZERO TRUST",
                "STATUS: VERIFIED",
              ]}
              className="border-l border-trust-blue/20 pl-6"
            />
          </div>
        </div>
      </section>

      {/* Certifications / stack strip */}
      <Section className="!py-14 border-y border-platinum/5">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate text-center">
          Certified &amp; Aligned
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {CERTIFICATIONS_AND_STACK.map((item) => (
            <span
              key={item}
              className="font-mono text-xs uppercase tracking-wider text-slate/80"
            >
              {item}
            </span>
          ))}
        </div>
      </Section>

      {/* Why Invision — three pillars */}
      <Section>
        <Reveal>
          <Eyebrow>Why Invision</Eyebrow>
          <h2 className="mt-3 font-display text-3xl text-platinum sm:text-4xl">
            The case for one expert instead of a team.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.1}>
              <GlassCard className="h-full">
                <h3 className="font-display text-xl text-platinum">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{pillar.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Services overview */}
      <Section className="border-t border-platinum/5">
        <Reveal>
          <Eyebrow>Services</Eyebrow>
          <h2 className="mt-3 font-display text-3xl text-platinum sm:text-4xl">
            Five ways to work together.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.08}>
              <Link href="/services">
                <GlassCard className="h-full transition-colors hover:border-signal-gold/20">
                  <h3 className="font-display text-lg text-platinum">{service.title}</h3>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <SecondaryButton href="/services">
            View all services
            <ArrowRight size={16} />
          </SecondaryButton>
        </div>
      </Section>

      {/* Approach snapshot */}
      <Section className="border-t border-platinum/5">
        <Reveal>
          <Eyebrow>Approach</Eyebrow>
          <h2 className="mt-3 font-display text-3xl text-platinum sm:text-4xl">
            A direct, four-step process.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_SNAPSHOT.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.08}>
              <NumberedStep number={step.number} title={step.title}>
                {step.body}
              </NumberedStep>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <SecondaryButton href="/approach">
            Read the full approach
            <ArrowRight size={16} />
          </SecondaryButton>
        </div>
      </Section>

      {/* Case studies teaser */}
      <Section className="border-t border-platinum/5">
        <Reveal>
          <Eyebrow>Case Studies</Eyebrow>
          <h2 className="mt-3 font-display text-3xl text-platinum sm:text-4xl">
            A sample of the work.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {CASE_STUDIES.map((study, i) => (
            <Reveal key={study.title} delay={i * 0.1}>
              <GlassCard className="h-full">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal-gold border border-signal-gold/30 rounded px-2 py-1">
                  {study.tag}
                </span>
                <h3 className="mt-4 font-display text-lg text-platinum">{study.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{study.situation}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <SecondaryButton href="/case-studies">
            View all case studies
            <ArrowRight size={16} />
          </SecondaryButton>
        </div>
      </Section>

      {/* Closing CTA band */}
      <Section className="border-t border-platinum/5">
        <Reveal className="glass-panel rounded-lg px-8 py-14 text-center sm:px-16">
          <h2 className="font-display text-3xl text-platinum sm:text-4xl">
            Most engagements start with a conversation, not a proposal.
          </h2>
          <div className="mt-8 flex justify-center">
            <PrimaryButton href="/contact">
              Get in touch
              <ArrowRight size={16} />
            </PrimaryButton>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
