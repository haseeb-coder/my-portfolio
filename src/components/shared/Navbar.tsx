"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "@/components/shared/Container";

const links: [string, string][] = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="glass sticky top-0 z-50">
      <Container className="flex h-16 items-center justify-between">
        <Link href="#" className="gradient-text text-lg font-bold">
          Haseeb.dev
        </Link>
        <nav className="hidden gap-6 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href={site.cvPath}
          download
          className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 md:inline-flex"
        >
          <Download className="h-4 w-4" /> CV
        </a>
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </Container>
      {open && (
        <nav className="glass border-t border-border md:hidden">
          <Container className="flex flex-col gap-3 py-4">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="text-zinc-400 transition hover:text-white"
              >
                {label}
              </a>
            ))}
            <a
              href={site.cvPath}
              download
              className="inline-flex items-center gap-2 font-medium text-violet-300"
            >
              <Download className="h-4 w-4" /> Download CV
            </a>
          </Container>
        </nav>
      )}
    </header>
  );
}
