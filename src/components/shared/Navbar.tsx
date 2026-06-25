"use client";

import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-border" : "bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <a href="#" className="font-display text-base font-bold tracking-tight">
          {site.name}
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="group relative text-sm text-zinc-400 transition hover:text-white"
            >
              {label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={site.cvPath}
            download
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 md:inline-flex"
          >
            <Download className="h-4 w-4" /> Resume
          </a>
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
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
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </Container>
        </nav>
      )}
    </header>
  );
}
