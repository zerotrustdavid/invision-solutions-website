import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { VerificationLedger } from "@/components/verification-ledger";
import { Section, Eyebrow, GlassCard, PrimaryButton, NumberedStep } from "@/components/ui";
import { PERSONAL_LINKEDIN_URL } from "@/components/social-icons";

export const metadata: Metadata = pageMetadata({
  title: "Approach",
  description:
    "David Levi is the founder and principal consultant at Invision Solutions — AWS and Azure certified, working directly across cloud security, DevSecOps, and compliance.",
  path: "/approach",
});

const PROCESS = [
  {
    number: "01",
    title: "Discover",
    body: "A direct conversation about the actual problem — not a scripted discovery call. Scope and constraints get defined together.",
  },
  {
    number: "02",
    title: "Assess",
    body: "Hands-on review of the current environment: architecture, access model, pipeline, or compliance posture, depending on the engagement.",
  },
  {
    number: "03",
    title: "Build or Remediate",
    body: "The implementation work itself — infrastructure changes, detection rules, pipeline gates, documentation — delivered directly, with visibility into progress throughout.",
  },
  {
    number: "04",
    title: "Sustain",
    body: "Handover, documentation, and — where the engagement calls for it — an ongoing advisory relationship rather than a one-off drop-off.",
  },
];

export default function ApproachPage() {
  return (
    <>
      <Section className="pt-24 sm:pt-32">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <Reveal>
            <Eyebrow>Approach</Eyebrow>
            <h1 className="mt-3 font-display text-4xl text-platinum sm:text-5xl">
              Invision Solutions is one person, by design.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
              That&apos;s not a limitation to work around — it&apos;s the
              whole point.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:justify-self-end">
            <VerificationLedger
              lines={["ROLE: PRINCIPAL CONSULTANT", "ACCESS MODEL: ZERO TRUST", "STATUS: VERIFIED"]}
              className="border-l border-trust-blue/20 pl-6"
            />
          </Reveal>
        </div>
      </Section>

      {/* Why solo */}
      <Section className="border-t border-platinum/5">
        <Reveal>
          <GlassCard>
            <Eyebrow>Why Solo</Eyebrow>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-platinum">
              Most consultancies scale by adding people between you and the
              expertise you&apos;re paying for. Invision Solutions
              doesn&apos;t. Every call, every architecture decision, every
              line of Terraform is handled by the same person from first
              conversation to final handover — which means no re-explaining
              context to a new face, no dilution of judgement through a chain
              of approvals, and one point of accountability for the outcome.
            </p>
          </GlassCard>
        </Reveal>
      </Section>

      {/* Founder bio */}
      <Section className="border-t border-platinum/5">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-start">
          <Reveal>
            <Eyebrow>Founder</Eyebrow>
            <h2 className="mt-3 font-display text-3xl text-platinum">David Levi</h2>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-slate">
              Principal Consultant
            </p>
            <a
              href={PERSONAL_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-trust-blue-text underline decoration-trust-blue-text/40 underline-offset-4 transition-colors hover:text-signal-gold hover:decoration-signal-gold/40"
            >
              Connect on LinkedIn
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-slate">
              David Levi is the founder and principal consultant at Invision
              Solutions. He holds a BSc in Cybersecurity from the University
              of Bolton, is AWS Certified Solutions Architect – Professional,
              and holds Microsoft&apos;s AZ-900 Azure Fundamentals
              certification. His work spans cloud security architecture
              across AWS, Azure, and GCP; DevSecOps and CI/CD security
              engineering; SIEM and detection engineering; and compliance
              programmes aligned to ISO 27001 and SOC 2.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 4-step process */}
      <Section className="border-t border-platinum/5">
        <Reveal>
          <Eyebrow>Process</Eyebrow>
          <h2 className="mt-3 font-display text-3xl text-platinum sm:text-4xl">
            How an engagement runs.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {PROCESS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.08}>
              <NumberedStep number={step.number} title={step.title}>
                {step.body}
              </NumberedStep>
            </Reveal>
          ))}
        </div>
      </Section>

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
