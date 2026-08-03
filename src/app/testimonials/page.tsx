import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Reveal } from "@/components/reveal";
import { Web3Form, type Field } from "@/components/web3forms";
import { Section, Eyebrow, SurfaceCard } from "@/components/ui";
import { TESTIMONIALS_ADDRESS } from "@/lib/mailboxes";

export const metadata: Metadata = pageMetadata({
  title: "Testimonials",
  description:
    "Leave a testimonial about working with Invision Solutions, or read what clients have said about the engagement.",
  path: "/testimonials",
});

/**
 * Published testimonials.
 *
 * Deliberately empty. Nothing goes in here that a real client has not written
 * and approved for publication — an invented testimonial on a page whose entire
 * purpose is proving authenticity would defeat the point of the page.
 */
const TESTIMONIALS: {
  quote: string;
  name: string;
  role: string;
  company: string;
}[] = [];

const FIELDS: Field[] = [
  { name: "name", label: "Your name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "role", label: "Role or job title", required: true },
  { name: "company", label: "Company", required: true },
  {
    name: "engagement",
    label: "What did I help you with?",
    type: "select",
    required: true,
    options: [
      "Cloud security & architecture",
      "DevSecOps & CI/CD security",
      "Security operations & SIEM",
      "Compliance & governance (ISO 27001 / SOC 2)",
      "Fractional security leadership",
      "Other",
    ],
  },
  {
    name: "testimonial",
    label: "Your testimonial",
    type: "textarea",
    required: true,
    rows: 7,
    full: true,
    placeholder:
      "What was the problem, how was it handled, and what changed as a result? Specifics are far more persuasive than praise.",
  },
  {
    name: "permission",
    label: "May I publish this?",
    type: "select",
    required: true,
    full: true,
    options: [
      "Yes — publish with my name, role, and company",
      "Yes — publish with my role and company only",
      "Yes — publish anonymously",
      "No — this is private feedback",
    ],
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <Section className="pt-20 sm:pt-24">
        <Reveal>
          <Eyebrow>Testimonials</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            What it is actually like to work with Invision Solutions.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            Every testimonial here is written by a real client and published with
            their permission. Nothing on this page is paraphrased, composited, or
            written on anyone&apos;s behalf.
          </p>
        </Reveal>
      </Section>

      <Section className="!pt-0">
        {TESTIMONIALS.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.07}>
                <SurfaceCard className="flex h-full flex-col">
                  <blockquote className="flex-1 text-lg leading-relaxed text-ink">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <footer className="mt-6 border-t border-line pt-4">
                    <p className="font-display font-medium text-ink">{t.name}</p>
                    <p className="text-sm text-slate">
                      {t.role}, {t.company}
                    </p>
                  </footer>
                </SurfaceCard>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <SurfaceCard className="text-center">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-ink">
                Awaiting first published testimonial
              </p>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate">
                Nothing is published here yet. Rather than fill the space with
                invented quotes, it stays empty until a real client has written
                one and approved it for publication.
              </p>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate">
                If you&apos;ve worked with me, the form below reaches David
                directly.
              </p>
            </SurfaceCard>
          </Reveal>
        )}
      </Section>

      <Section tone="panel" className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <Reveal>
            <Eyebrow>Leave a testimonial</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Worked together? I&apos;d value your words.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-slate">
              Detail helps more than praise. What the problem was, how it was
              handled, and what actually changed tells a prospective client far
              more than an adjective does.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-slate">
              You control how it appears — including anonymously, or as private
              feedback that is never published. Nothing goes live without the
              permission you select.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-slate">
              Prefer email? Send it to{" "}
              <a
                href={`mailto:${TESTIMONIALS_ADDRESS}`}
                className="text-blue-ink underline decoration-blue-ink/30 underline-offset-4 hover:decoration-blue-ink"
              >
                {TESTIMONIALS_ADDRESS}
              </a>
              .
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Web3Form
              accessKey={process.env.NEXT_PUBLIC_WEB3FORMS_KEY_HELLO ?? process.env.NEXT_PUBLIC_WEB3FORMS_KEY}
              subject="New testimonial — Invision Solutions website"
              fields={FIELDS}
              submitLabel="Submit testimonial"
              successTitle="Status: Received"
              successBody="Thank you — that means a lot. David will read it personally and will check with you before anything is published."
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
