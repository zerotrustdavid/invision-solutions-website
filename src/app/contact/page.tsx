import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { Section, Eyebrow } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Start a conversation with David Levi, principal consultant at Invision Solutions. Every message reaches David directly.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section className="pt-24 sm:pt-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-3 font-display text-4xl text-platinum sm:text-5xl">
            Start a conversation.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate">
            Every message here reaches David directly — there&apos;s no
            inbox triage or account team in the way.
          </p>
          <p className="mt-6 text-sm text-slate">
            I read and respond to every message personally.
          </p>
          <p className="mt-8 text-sm text-slate">
            Prefer email? Reach out directly at{" "}
            <a
              href="mailto:david@invisionsolutions.co.uk"
              className="text-trust-blue-text underline decoration-trust-blue-text/40 underline-offset-4 hover:text-signal-gold hover:decoration-signal-gold/40"
            >
              david@invisionsolutions.co.uk
            </a>
            .
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
