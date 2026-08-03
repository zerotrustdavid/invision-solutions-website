import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Reveal } from "@/components/reveal";
import { Section, Eyebrow, SurfaceCard, PrimaryButton, StatusTag } from "@/components/ui";
import { CASE_STUDIES } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description:
    "Anonymised case studies across DevSecOps, cloud migration, CSPM, SOC 2 Type II readiness, security architecture, and solution architecture.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <Section className="pt-20 sm:pt-24">
        <Reveal>
          <Eyebrow>Case Studies</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            A sample of the kind of work Invision Solutions takes on.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            Specifics are anonymised to respect client confidentiality — ask
            directly for detail relevant to your situation.
          </p>
        </Reveal>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          {CASE_STUDIES.map((study, i) => (
            <Reveal key={study.title} delay={i * 0.07}>
              <SurfaceCard className="flex h-full flex-col">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusTag>{study.discipline}</StatusTag>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate">
                    {study.tag}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-xl font-medium tracking-tight text-ink">
                  {study.title}
                </h2>

                <dl className="mt-6 space-y-4 text-sm leading-relaxed text-slate">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink">
                      Situation
                    </dt>
                    <dd className="mt-1">{study.situation}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink">
                      Action
                    </dt>
                    <dd className="mt-1">{study.action}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink">
                      Outcome
                    </dt>
                    <dd className="mt-1 text-ink">{study.outcome}</dd>
                  </div>
                </dl>
              </SurfaceCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="panel" className="border-t border-line">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Want to talk through a situation like one of these?
          </h2>
          <div className="mt-8 flex justify-center">
            <PrimaryButton href="/contact">
              Start a conversation
              <ArrowRight size={16} />
            </PrimaryButton>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
