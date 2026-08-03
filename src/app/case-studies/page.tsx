import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Section, Eyebrow, GlassCard, PrimaryButton, StatusTag } from "@/components/ui";
import { CASE_STUDIES } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description:
    "Illustrative case studies covering platform security uplift, Zero Trust migration, and ISO 27001 compliance sprints.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <Section className="pt-24 sm:pt-32">
        <Reveal>
          <Eyebrow>Case Studies</Eyebrow>
          <h1 className="mt-3 max-w-2xl font-display text-4xl text-platinum sm:text-5xl">
            A sample of the kind of work Invision Solutions takes on.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            Specifics are anonymised or illustrative to respect client
            confidentiality — ask directly for detail relevant to your
            situation.
          </p>
        </Reveal>
      </Section>

      <Section className="border-t border-platinum/5 !pt-0">
        <div className="grid gap-8 lg:grid-cols-3">
          {CASE_STUDIES.map((study, i) => (
            <Reveal key={study.title} delay={i * 0.1}>
              <GlassCard className="flex h-full flex-col">
                <StatusTag>{study.tag}</StatusTag>
                <h2 className="mt-4 font-display text-xl text-platinum">{study.title}</h2>

                <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-trust-blue-text">
                      Situation
                    </p>
                    <p className="mt-1">{study.situation}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-trust-blue-text">
                      Action
                    </p>
                    <p className="mt-1">{study.action}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-trust-blue-text">
                      Outcome
                    </p>
                    <p className="mt-1 italic text-slate">{study.outcome}</p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-platinum/5">
        <Reveal className="glass-panel rounded-lg px-8 py-14 text-center sm:px-16">
          <h2 className="font-display text-3xl text-platinum sm:text-4xl">
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
