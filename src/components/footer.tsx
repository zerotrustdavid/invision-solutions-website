import Link from "next/link";
import { LogoMark } from "./logo";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/approach", label: "Approach" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/contact", label: "Contact" },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-platinum/5">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <LogoMark size={26} />
              <span className="font-display uppercase text-platinum" style={{ letterSpacing: "0.05em" }}>
                Invision
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate">
              Founder-led cybersecurity, DevSecOps, and cloud consultancy. One
              principal consultant, direct engagement, enterprise-grade
              outcomes.
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate transition-colors hover:text-platinum"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <a
              href="mailto:david@invisionsolutions.co.uk"
              className="text-sm text-slate transition-colors hover:text-platinum"
            >
              david@invisionsolutions.co.uk
            </a>
            <p className="text-sm text-slate">
              Invision Solutions Ltd
              <br />
              Company No. 16056944
              <br />
              England &amp; Wales
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-platinum/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-trust-blue/50">
            SESSION: CLOSED — LOG {year} — ACCESS: GRANTED
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
