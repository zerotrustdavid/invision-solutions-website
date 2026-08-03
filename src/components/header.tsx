"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LogoLockup, LogoMark } from "./logo";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/approach", label: "Approach" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/contact", label: "Contact" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-platinum/5 bg-void/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" onClick={() => setOpen(false)} aria-label="Invision Solutions home">
          <span className="hidden sm:inline-flex">
            <LogoLockup size={30} />
          </span>
          <span className="inline-flex sm:hidden">
            <LogoMark size={28} />
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-sans text-sm transition-colors hover:text-platinum ${
                pathname === link.href ? "text-platinum" : "text-slate"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-md bg-signal-gold px-4 py-2 font-sans text-sm font-medium text-void transition-colors hover:bg-signal-gold/90"
          >
            Start a conversation
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-platinum md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-platinum/5 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`font-sans text-base ${
                  pathname === link.href ? "text-platinum" : "text-slate"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit rounded-md bg-signal-gold px-4 py-2 font-sans text-sm font-medium text-void"
            >
              Start a conversation
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export { Header };
