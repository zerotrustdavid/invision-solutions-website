import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Reveal } from "@/components/reveal";
import {
  Section,
  Eyebrow,
  SurfaceCard,
  PrimaryButton,
  ExternalSecondaryButton,
  StatusTag,
} from "@/components/ui";
import { CASE_STUDIES } from "@/lib/content";
import { PAYRECKON_URL } from "@/lib/payreckon";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description:
    "Anonymised case studies across DevSecOps, cloud migration, CSPM, SOC 2 Type II readiness, security architecture, and solution architecture — plus PayReckon, a live product built in-house.",
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

      {/*
        Deliberately its own band rather than another card in the grid above.
        Everything in that grid is anonymised client work; PayReckon is a
        product David owns and operates, and presenting them as the same
        category would misrepresent both.
      */}
      <Section tone="panel" className="border-t border-line" id="payreckon">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <Eyebrow>Own product</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Not everything here was built for a client.
            </h2>
            <p className="mt-6 leading-relaxed text-slate">
              PayReckon is a live product I designed, built, and run — UK
              take-home pay calculators comparing umbrella, limited company, and
              PAYE employment behind a single shared tax engine.
            </p>
            <p className="mt-4 leading-relaxed text-slate">
              It is not security work. It is here because the discipline is the
              one I sell: correctness held by tests, every tax figure traceable
              to its source on gov.uk, and automated checks that fail the build
              rather than relying on someone remembering to look.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton href="/payreckon">
                About PayReckon
                <ArrowRight size={16} />
              </PrimaryButton>
              <ExternalSecondaryButton href={PAYRECKON_URL}>
                Visit payreckon.co.uk
              </ExternalSecondaryButton>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <SurfaceCard raised className="h-full">
              <div className="flex flex-wrap items-center gap-2">
                <StatusTag>PayReckon</StatusTag>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate">
                  Live product
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-medium tracking-tight text-ink">
                UK take-home pay, three ways
              </h3>

              <dl className="mt-6 space-y-4 text-sm leading-relaxed text-slate">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink">
                    Situation
                  </dt>
                  <dd className="mt-1">
                    A day rate and a salary are not comparable numbers, and
                    comparing arrangements usually means three separate tools
                    that disagree with one another.
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink">
                    Action
                  </dt>
                  <dd className="mt-1">
                    Built three calculators over one tax engine, so identical
                    taxable income is taxed identically whichever arrangement
                    produced it. The umbrella circularity — employment costs
                    charged on the pay that remains after deducting them — is
                    solved algebraically rather than approximated.
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink">
                    Outcome
                  </dt>
                  <dd className="mt-1 text-ink">
                    Live at payreckon.co.uk and in active use, covering three
                    tax years across Scottish and rest-of-UK rates. A round-trip
                    test asserts that gross pay plus every employment cost
                    returns the assignment rate exactly.
                  </dd>
                </div>
              </dl>
            </SurfaceCard>
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-line">
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
