import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VerificationLedger } from "@/components/verification-ledger";
import { Reveal } from "@/components/reveal";
import {
  Section,
  Eyebrow,
  SurfaceCard,
  PrimaryButton,
  SecondaryButton,
  NumberedStep,
  StatusTag,
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
      <section className="relative overflow-hidden px-6 pb-20 pt-20 sm:px-10 sm:pb-28 sm:pt-28">
        <div className="relative mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[1.35fr_1fr] lg:items-center">
          <div>
            <Eyebrow>Cybersecurity · DevSecOps · Cloud Architecture</Eyebrow>
            <h1 className="mt-6 font-display text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]">
              Senior-level security expertise.
              <span className="block text-slate">No layers in between.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate">
              Invision Solutions is a founder-led cybersecurity, DevSecOps, and
              cloud consultancy. One principal consultant, direct engagement,
              enterprise-grade outcomes.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <PrimaryButton href="/contact">
                Start a conversation
                <ArrowRight size={16} />
              </PrimaryButton>
              <SecondaryButton href="/services">View services</SecondaryButton>
            </div>
          </div>

          <div className="lg:justify-self-end">
            <SurfaceCard className="w-full lg:max-w-sm">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-ink">
                Verification ledger
              </p>
              <VerificationLedger
                className="mt-4"
                lines={[
                  "SESSION: DIRECT — NO INTERMEDIARY",
                  "ROLE: PRINCIPAL CONSULTANT",
                  "ACCESS MODEL: ZERO TRUST",
                  "STATUS: VERIFIED",
                ]}
              />
            </SurfaceCard>
          </div>
        </div>
      </section>

      {/* Certifications / stack strip */}
      <Section tone="panel" className="!py-12 border-y border-line">
        <p className="text-center font-mono text-xs uppercase tracking-[0.28em] text-slate">
          Certified &amp; Aligned
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {CERTIFICATIONS_AND_STACK.map((item) => (
            <span
              key={item}
              className="font-mono text-xs uppercase tracking-wider text-slate"
            >
              {item}
            </span>
          ))}
        </div>
      </Section>

      {/* Why Invision */}
      <Section>
        <Reveal>
          <Eyebrow>Why Invision</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            The case for one expert instead of a team.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.1}>
              <SurfaceCard className="h-full">
                <h3 className="font-display text-xl font-medium text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{pillar.body}</p>
              </SurfaceCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section tone="panel" className="border-t border-line">
        <Reveal>
          <Eyebrow>Services</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Five ways to work together.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.07}>
              <Link href="/services" className="block h-full">
                <SurfaceCard
                  raised
                  className="h-full transition-shadow hover:shadow-md"
                >
                  <h3 className="font-display text-lg font-medium text-ink">
                    {service.title}
                  </h3>
                </SurfaceCard>
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
      <Section>
        <Reveal>
          <Eyebrow>Approach</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            A direct, four-step process.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_SNAPSHOT.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.07}>
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
      <Section tone="panel" className="border-t border-line">
        <Reveal>
          <Eyebrow>Case Studies</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            A sample of the work.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {CASE_STUDIES.slice(0, 3).map((study, i) => (
            <Reveal key={study.title} delay={i * 0.1}>
              <SurfaceCard raised className="h-full">
                <StatusTag>{study.discipline}</StatusTag>
                <h3 className="mt-4 font-display text-lg font-medium text-ink">
                  {study.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  {study.situation}
                </p>
              </SurfaceCard>
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

      {/* Closing CTA */}
      <Section>
        <Reveal className="surface rounded-2xl px-8 py-14 text-center sm:px-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
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
