import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Reveal } from "@/components/reveal";
import { VerificationLedger } from "@/components/verification-ledger";
import {
  Section,
  Eyebrow,
  SurfaceCard,
  PrimaryButton,
  NumberedStep,
} from "@/components/ui";
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
      <Section className="pt-20 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          <Reveal>
            <Eyebrow>Approach</Eyebrow>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
              Invision Solutions is one person, by design.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
              That&apos;s not a limitation to work around — it&apos;s the whole
              point.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:justify-self-end lg:w-full lg:max-w-sm">
            <SurfaceCard>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-ink">
                Verification ledger
              </p>
              <VerificationLedger
                className="mt-4"
                lines={[
                  "ROLE: PRINCIPAL CONSULTANT",
                  "ACCESS MODEL: ZERO TRUST",
                  "STATUS: VERIFIED",
                ]}
              />
            </SurfaceCard>
          </Reveal>
        </div>
      </Section>

      <Section tone="panel" className="border-t border-line">
        <Reveal>
          <Eyebrow>Why Solo</Eyebrow>
          <p className="mt-5 max-w-3xl font-display text-xl font-normal leading-relaxed tracking-tight text-ink sm:text-2xl">
            Most consultancies scale by adding people between you and the
            expertise you&apos;re paying for. Invision Solutions doesn&apos;t.
            Every call, every architecture decision, every line of Terraform is
            handled by the same person from first conversation to final
            handover — which means no re-explaining context to a new face, no
            dilution of judgement through a chain of approvals, and one point of
            accountability for the outcome.
          </p>
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-start">
          <Reveal>
            <Eyebrow>Founder</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
              David Levi
            </h2>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-slate">
              Principal Consultant
            </p>
            <a
              href={PERSONAL_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-blue-ink underline decoration-blue-ink/30 underline-offset-4 transition-colors hover:decoration-blue-ink"
            >
              Connect on LinkedIn
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-slate">
              David Levi is the founder and principal consultant at Invision
              Solutions. He holds a BSc in Cybersecurity from the University of
              Bolton, is AWS Certified Solutions Architect – Professional, and
              holds Microsoft&apos;s AZ-900 Azure Fundamentals certification. His
              work spans cloud security architecture across AWS, Azure, and GCP;
              DevSecOps and CI/CD security engineering; SIEM and detection
              engineering; and compliance programmes aligned to ISO 27001 and
              SOC 2.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="panel" className="border-t border-line">
        <Reveal>
          <Eyebrow>Process</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            How an engagement runs.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {PROCESS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.07}>
              <NumberedStep number={step.number} title={step.title}>
                {step.body}
              </NumberedStep>
            </Reveal>
          ))}
        </div>
      </Section>

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
