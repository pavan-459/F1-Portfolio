"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-carbon/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-wide text-white"
        >
          PKN<span className="text-rb-red">.</span>
          <span className="ml-1 text-xs align-top text-rb-yellow">1</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={clsx(
                    "font-display text-sm uppercase tracking-widest transition-colors",
                    active
                      ? "text-rb-yellow"
                      : "text-silver/80 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-6 h-0.5 bg-current" />
        </button>
      </nav>

      {open && (
        <ul className="md:hidden flex flex-col gap-1 border-t border-white/10 bg-carbon px-6 py-4">
          {LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "block py-2 font-display text-sm uppercase tracking-widest",
                    active ? "text-rb-yellow" : "text-silver/80"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
}
