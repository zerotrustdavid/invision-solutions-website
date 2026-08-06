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
  { href: "/testimonials", label: "Testimonials" },
  { href: "/enquiries", label: "Enquiries" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label="Invision Solutions home"
          className="shrink-0"
        >
          {/* The header bar is too shallow for the stacked lockup's subline, so
              the nav uses the wordmark alone — the mark is still in it, as the O. */}
          <span className="hidden sm:inline-flex">
            <LogoLockup size={24} subline={false} />
          </span>
          {/* Tile on mobile: the bare mark reads too quietly next to the
              hamburger, and the solid field holds its own at this size. */}
          <span className="inline-flex sm:hidden">
            <LogoMark size={32} tile />
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-sans text-sm transition-colors hover:text-ink ${
                pathname === link.href ? "text-ink" : "text-slate"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-ink px-5 py-2.5 font-sans text-sm font-medium text-paper transition-opacity hover:opacity-88"
          >
            Start a conversation
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-ink lg:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-line px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`font-sans text-base ${
                  pathname === link.href ? "text-ink" : "text-slate"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit rounded-full bg-ink px-5 py-2.5 font-sans text-sm font-medium text-paper"
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
