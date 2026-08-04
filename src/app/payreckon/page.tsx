import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Reveal } from "@/components/reveal";
import {
  Section,
  Eyebrow,
  SurfaceCard,
  PrimaryButton,
  SecondaryButton,
  ExternalPrimaryButton,
  ExternalSecondaryButton,
  StatusTag,
} from "@/components/ui";
import {
  PAYRECKON,
  PAYRECKON_CALCULATORS,
  PAYRECKON_RIGOUR,
  PAYRECKON_AUDIENCE,
  PAYRECKON_COVERAGE,
  PAYRECKON_DISCLAIMER,
  PAYRECKON_URL,
  PAYRECKON_FEEDBACK_URL,
  PAYRECKON_REPO_URL,
} from "@/lib/payreckon";

export const metadata: Metadata = pageMetadata({
  title: "PayReckon",
  description:
    "PayReckon is a UK take-home pay calculator built and run by David Levi — comparing umbrella, limited company, and PAYE employment behind a single tax engine.",
  path: "/payreckon",
});

export default function PayReckonPage() {
  return (
    <>
      <Section className="pt-20 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <Reveal>
            <Eyebrow>Own product</Eyebrow>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
              PayReckon.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
              {PAYRECKON.tagline}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ExternalPrimaryButton href={PAYRECKON_URL}>
                Open PayReckon
              </ExternalPrimaryButton>
              <ExternalSecondaryButton href={PAYRECKON_REPO_URL}>
                Source on GitHub
              </ExternalSecondaryButton>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <SurfaceCard className="w-full">
              <div className="flex flex-wrap gap-2">
                <StatusTag>Live</StatusTag>
                <StatusTag>Built &amp; run by David</StatusTag>
              </div>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-slate">
                Covers
              </p>
              <ul className="mt-3 space-y-2 text-sm text-ink">
                {PAYRECKON_COVERAGE.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden="true" className="text-gold-ink">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SurfaceCard>
          </Reveal>
        </div>
      </Section>

      <Section tone="panel" className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <Eyebrow>The problem</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
              Three arrangements, three different answers.
            </h2>
            <p className="mt-6 leading-relaxed text-slate">{PAYRECKON.problem}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>What it does</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
              One tax engine behind all three.
            </h2>
            <p className="mt-6 leading-relaxed text-slate">{PAYRECKON.built}</p>
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-line">
        <Reveal>
          <Eyebrow>The calculators</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Every route you can be paid through.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PAYRECKON_CALCULATORS.map((calc, i) => (
            <Reveal key={calc.name} delay={i * 0.08}>
              <SurfaceCard className="h-full">
                <StatusTag>{calc.name}</StatusTag>
                <h3 className="mt-4 font-display text-lg font-medium text-ink">
                  {calc.route}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  {calc.body}
                </p>
              </SurfaceCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="panel" className="border-t border-line">
        <Reveal>
          <Eyebrow>Why the numbers hold</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            A calculator is only worth the rigour behind it.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {PAYRECKON_RIGOUR.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <SurfaceCard className="h-full">
                <h3 className="font-display text-lg font-medium text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  {item.body}
                </p>
              </SurfaceCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line">
        <Reveal>
          <Eyebrow>Who uses it</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Built for people making the decision.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PAYRECKON_AUDIENCE.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <SurfaceCard className="h-full">
                <h3 className="font-display text-lg font-medium text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  {item.body}
                </p>
              </SurfaceCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="panel" className="border-t border-line">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Why it is on this site</Eyebrow>
            <p className="mt-6 text-lg leading-relaxed text-slate">
              PayReckon is not a security product, and it is not client work. It
              is here because it is the same discipline applied to my own
              codebase: correctness held by tests rather than by care, every
              figure traceable to its source, and automated gates that fail the
              build rather than relying on someone remembering to check.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              That is what I am asking clients to trust me with. This is where
              it is visible.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section className="border-t border-line">
        <Reveal>
          <SurfaceCard raised className="px-8 py-14 text-center sm:px-16">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Work out what you would actually take home.
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-slate">
              Put your numbers in and compare all three arrangements side by
              side.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ExternalPrimaryButton href={PAYRECKON_URL}>
                Open PayReckon
              </ExternalPrimaryButton>
              <ExternalSecondaryButton href={PAYRECKON_FEEDBACK_URL}>
                Leave feedback
              </ExternalSecondaryButton>
            </div>
            <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-slate">
              {PAYRECKON_DISCLAIMER}
            </p>
          </SurfaceCard>
        </Reveal>
      </Section>

      <Section tone="panel" className="border-t border-line">
        <Reveal className="text-center">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Need the security side instead?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate">
            Cybersecurity, DevSecOps, and cloud architecture — delivered
            directly, with no layers in between.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryButton href="/contact">Start a conversation</PrimaryButton>
            <SecondaryButton href="/case-studies">
              See consultancy work
            </SecondaryButton>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
