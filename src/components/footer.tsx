import Link from "next/link";
import { LogoMark } from "./logo";
import { SocialLinks } from "./social-icons";
import { PUBLIC_CONTACT_ADDRESS } from "@/lib/mailboxes";

const SITE_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/approach", label: "Approach" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/testimonials", label: "Testimonials" },
];

const CONTACT_LINKS = [
  { href: "/contact", label: "Contact" },
  { href: "/enquiries", label: "Enquiries by department" },
  { href: "/brand", label: "Brand assets" },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-panel-alt">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <LogoMark size={26} />
              <span className="font-display text-lg font-semibold tracking-tight">
                <span className="text-ink">In</span>
                <span className="text-gold-ink">vision</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate">
              Founder-led cybersecurity, DevSecOps, and cloud consultancy. One
              principal consultant, direct engagement, enterprise-grade
              outcomes.
            </p>
            <SocialLinks className="mt-6" />
          </div>

          <nav className="flex flex-col gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate">
              Site
            </p>
            {SITE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/payreckon"
              className="text-sm text-slate transition-colors hover:text-ink"
            >
              PayReckon
            </Link>
          </nav>

          <nav className="flex flex-col gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate">
              Get in touch
            </p>
            {CONTACT_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`mailto:${PUBLIC_CONTACT_ADDRESS}`}
              className="text-sm text-blue-ink underline decoration-blue-ink/30 underline-offset-4 transition-colors hover:decoration-blue-ink"
            >
              {PUBLIC_CONTACT_ADDRESS}
            </a>
          </nav>

          <div className="flex flex-col gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate">
              Company
            </p>
            <p className="text-sm leading-relaxed text-slate">
              Invision Solutions Ltd
              <br />
              Company No. 16056944
              <br />
              England &amp; Wales
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate">
            Session: closed — log {year} — access: granted
          </p>
          <p className="text-xs text-slate">
            © {year} Invision Solutions Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
