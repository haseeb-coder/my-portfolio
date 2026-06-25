import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const SITE_URL = "https://haseeb-ur-rehman-portfolio.netlify.app";
const DESCRIPTION =
  "AI-Augmented Full-Stack Software Engineer with 4+ years building scalable web apps, ERP systems, and AI platforms for international clients. Node.js, NestJS, Next.js, TypeScript, AWS, OpenAI & Claude AI. Open to remote worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s — ${site.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    "AI-Augmented Full-Stack Developer",
    "AI Developer",
    "Node.js Developer",
    "NestJS Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "React Developer",
    "PostgreSQL",
    "AWS Developer",
    "OpenAI API",
    "Claude AI",
    "LLM Integration",
    "Microservices",
    "Remote Software Engineer",
    "Full Stack Engineer Pakistan",
    "Hire Full Stack Developer",
    "Haseeb Ur Rehman",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${site.name} — ${site.title}`,
    description: DESCRIPTION,
    siteName: `${site.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.title}`,
    description: DESCRIPTION,
  },
  alternates: { canonical: SITE_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  url: SITE_URL,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: site.location },
  sameAs: [site.social.github, site.social.linkedin],
  knowsAbout: [
    "AI-Assisted Development",
    "LLM Integration",
    "Node.js",
    "NestJS",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "AWS",
    "Microservices",
    "OpenAI API",
    "Claude AI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
