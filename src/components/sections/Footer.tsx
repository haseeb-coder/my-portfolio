import { Container } from "@/components/shared/Container";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { site } from "@/data/site";

const links: [string, string][] = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
];

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="gradient-text text-lg font-bold">{site.name}</p>
          <p className="mt-1 text-sm text-zinc-400">{site.title}</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-4">
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
        <SocialLinks />
      </Container>
      <Container className="mt-8 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} {site.name}. Built with Next.js & Tailwind
        CSS.
      </Container>
    </footer>
  );
}
