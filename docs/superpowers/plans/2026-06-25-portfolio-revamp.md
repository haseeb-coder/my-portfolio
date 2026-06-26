# Portfolio Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio as a modern, AI-forward, client-converting Next.js site with a working contact form (email + auto-reply), an updated downloadable CV, and curated projects including YapIt and GID.

**Architecture:** Single Next.js App-Router app in the existing `my-portfolio` repo, replacing the old Vite app. Content is data-driven via typed `src/data/*` modules; sections compose a single landing page. A Route Handler (`/api/contact`) sends email via Nodemailer/Gmail SMTP. The CV PDF is regenerated from an HTML template via headless Chrome.

**Tech Stack:** Next.js (latest, App Router, TypeScript), Tailwind CSS, shadcn/ui, Framer Motion, lucide-react, Nodemailer, zod, Vitest.

## Global Constraints

- Node.js: v20.20.2 (already installed). Next.js latest stable.
- Visual theme: dark + AI-modern (purple-blue gradient glow, glassmorphism). Dark-only (no light toggle).
- Email recipient: `haseebsiddique26@gmail.com`. Email transport: Gmail SMTP via Nodemailer App Password. Never commit secrets.
- Contact phone / WhatsApp: `+92 331 620 7320`.
- All content data lives in `src/data/*` — components must not hardcode copy.
- YapIt + Alvo = one combined project. YapIt + GID attributed to **Optima Geeks**.
- Mobile-first responsive; verify at 360 / 768 / 1024 / 1440 px.
- TypeScript strict; ESLint clean before each commit.
- Deploy target: Vercel (build must pass `next build`).

---

### Task 1: Scaffold Next.js app, remove Vite, base theme

**Files:**
- Delete: old Vite files (`vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/components/**`, `src/index.css`, `.eslintrc.cjs`)
- Create: Next app (`next.config.ts`, `tsconfig.json`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `package.json`)
- Keep: `assets/images/**` (move usable images to `public/projects/` later), `docs/**`, `.git`, `README.md`, `public/` images

**Interfaces:**
- Produces: a running Next.js dev server; `RootLayout` applying dark theme + base font; an empty `Home` page placeholder.

- [ ] **Step 1: Back up then clear old app source**

```bash
git rm -r --quiet src vite.config.js index.html .eslintrc.cjs .prettierrc.json 2>/dev/null || true
# keep assets/ and public/ images for reuse
```

- [ ] **Step 2: Scaffold Next.js into a temp dir, then merge (avoids create-next-app refusing non-empty dir)**

```bash
cd /home/hp-zbook/port
npx --yes create-next-app@latest portfolio-next \
  --typescript --tailwind --eslint --app --src-dir \
  --import-alias "@/*" --use-npm --no-turbopack --yes
# Merge generated app into my-portfolio (preserve .git, docs, assets)
rsync -a --exclude='.git' portfolio-next/ my-portfolio/
rm -rf portfolio-next
cd my-portfolio
```

- [ ] **Step 3: Install runtime deps**

```bash
npm install framer-motion lucide-react nodemailer zod react-icons
npm install -D vitest @vitejs/plugin-react jsdom @types/nodemailer
```

- [ ] **Step 4: Set dark theme tokens in `src/app/globals.css`**

Replace the `:root`/body base with dark theme tokens (after the Tailwind import lines):

```css
:root {
  --background: #0a0a0f;
  --foreground: #e7e7ee;
  --muted: #9a9ab0;
  --card: #12121a;
  --border: #23232f;
  --accent-from: #7c3aed; /* violet */
  --accent-to: #2563eb;   /* blue */
}
html { scroll-behavior: smooth; }
body {
  background: var(--background);
  color: var(--foreground);
  font-feature-settings: "rlig" 1, "calt" 1;
}
.gradient-text {
  background: linear-gradient(90deg, var(--accent-from), var(--accent-to));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.glass {
  background: rgba(18,18,26,0.6);
  border: 1px solid var(--border);
  backdrop-filter: blur(12px);
}
```

- [ ] **Step 5: Set `src/app/layout.tsx` metadata + dark class**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Haseeb Ur Rehman — AI-Augmented Full-Stack Engineer",
  description: "AI-Augmented Full-Stack Software Engineer. Node.js, NestJS, Next.js, TypeScript, AWS, OpenAI/Claude. Open to remote worldwide.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Minimal `src/app/page.tsx` placeholder**

```tsx
export default function Home() {
  return <main className="min-h-screen grid place-items-center"><h1 className="gradient-text text-4xl font-bold">Portfolio coming up</h1></main>;
}
```

- [ ] **Step 7: Verify dev server + build**

Run: `npm run dev` (open http://localhost:3000, confirm dark page + gradient text), then `npm run build`
Expected: dev renders; `next build` completes with no errors.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js app, remove Vite, add dark theme base"
```

---

### Task 2: Site config + typed data modules

**Files:**
- Create: `src/data/site.ts`, `src/data/skills.ts`, `src/data/experience.ts`, `src/data/projects.ts`, `src/data/testimonials.ts`

**Interfaces:**
- Produces:
  - `site` object: `{ name, title, tagline, email, phone, whatsapp, location, available, cvPath, social: {github,linkedin}, calendly?: string }`
  - `skills: { category: string; featured?: boolean; items: string[] }[]`
  - `experience: { company; role; period; location; current?: boolean; projects: { name; summary; bullets: string[]; stack: string[] }[] }[]`
  - `Project` type `{ slug; title; category: 'AI'|'Full-Stack'|'ERP'|'Blockchain'; ai?: boolean; problem; solution; impact: string[]; stack: string[]; image?: string; link?: string; repo?: string }` and `projects: Project[]`
  - `testimonials: { quote; name; role; company; avatar? }[]` (may be empty initially)

- [ ] **Step 1: Create `src/data/site.ts`**

```ts
export const site = {
  name: "Haseeb Ur Rehman",
  title: "AI-Augmented Full-Stack Software Engineer",
  tagline:
    "I build faster and ship smarter — leveraging AI (Claude, ChatGPT, Copilot) to deliver production-grade software at 2× speed for international clients.",
  email: "haseebsiddique26@gmail.com",
  phone: "+92 331 620 7320",
  whatsapp: "923316207320",
  location: "Lahore, Pakistan",
  available: "Open to remote worldwide",
  cvPath: "/Haseeb_ur_Rehman_CV.pdf",
  calendly: "", // optional; CTA hidden when empty
  social: {
    github: "https://github.com/haseeb-coder",
    linkedin: "https://linkedin.com/in/haseeb-ur-rehman-siddique",
  },
  stats: [
    { label: "Years Experience", value: 4, suffix: "+" },
    { label: "Projects Delivered", value: 15, suffix: "+" },
    { label: "Countries Served", value: 4, suffix: "" },
  ],
} as const;
```

- [ ] **Step 2: Create `src/data/skills.ts`** (AI first, `featured: true`)

```ts
export const skills = [
  { category: "AI & LLMs", featured: true, items: ["Claude AI", "ChatGPT", "GitHub Copilot", "OpenAI API", "Prompt Engineering", "LLM Integration", "AI-Assisted Development"] },
  { category: "Backend", items: ["Node.js", "NestJS", "Express.js", "REST APIs", "BullMQ", "Microservices", "WebSockets"] },
  { category: "Frontend", items: ["Next.js", "React.js", "TypeScript", "Redux Toolkit", "Tailwind CSS", "Material UI"] },
  { category: "Database", items: ["PostgreSQL", "MongoDB", "TypeORM", "Mongoose", "Redis"] },
  { category: "Cloud & DevOps", items: ["AWS (S3/EC2/ECS/Lambda/ECR)", "Docker", "Vercel", "Kubernetes", "GitHub Actions CI/CD"] },
  { category: "Auth & Security", items: ["JWT", "RBAC", "OAuth 2.0", "AWS Cognito", "Casbin", "Casl"] },
  { category: "Integrations", items: ["Shopify Webhooks", "Stripe", "OpenAI API", "Twilio", "SendGrid", "ShipStation"] },
];
```

- [ ] **Step 3: Create `src/data/experience.ts`** (3 companies; quantified bullets copied from CV; add GID + YapIt under Optima Geeks)

Include Optima Geeks (current: Cuddle Clones, GID, YapIt), SolutionsLoft, Axiom World. Bullets must use the CV's quantified wording (500+ orders, ~60%, ~35%, 14 branches, 1,000+ users). Example shape:

```ts
export const experience = [
  {
    company: "Optima Geeks",
    role: "Software Engineer",
    period: "Jan 2025 – Present",
    location: "Lahore, Pakistan",
    current: true,
    projects: [
      { name: "Cuddle Clones — Shopify Order Management (US Client)", summary: "Full-stack order platform for high-volume custom pet products.", bullets: ["Synced 500+ daily Shopify orders via webhooks, cutting manual effort ~60%", "BullMQ async queues improved throughput ~35%", "NestJS + Next.js admin with Casbin RBAC; Twilio/SendGrid notifications; ShipStation fulfilment"], stack: ["NestJS","Next.js","TypeScript","PostgreSQL","BullMQ","Casbin","AWS","Docker"] },
      { name: "YapIt Marketing Hub (Alvo Marketing)", summary: "AI marketing platform that turns any business URL into a launched ad campaign.", bullets: ["Built Next.js 16 platform generating ad strategy, copy, and creative via LLMs (DigitalOcean Inference + Gemini) in a 5-step wizard","Trigger.dev v4 background pipeline; Jina Reader scraping; multilingual i18n site","Launches posts/ads via YapIt Ads API; DigitalOcean Spaces CDN"], stack: ["Next.js 16","Prisma","PostgreSQL","Trigger.dev","Gemini","shadcn/ui","Framer Motion"] },
      { name: "GID (Get it Done) Platform", summary: "Kafka-driven microservices platform for a field-service marketplace.", bullets: ["Contributed to NestJS + Flask microservices (order intake, payments, documents, email, jobs) on a Kafka message bus","Vue admin/partner/customer/brand apps; Kubernetes (k3s) + Helm + Tilt","PostgreSQL/TypeORM + Redis; GraphQL gateway"], stack: ["NestJS","Kafka","Kubernetes","Vue","PostgreSQL","Redis","GraphQL"] },
    ],
  },
  // SolutionsLoft (Mar 2023 – Jan 2025) and Axiom World (Sep 2021 – Feb 2023) — fill from CV similarly
];
```
Add SolutionsLoft and Axiom World entries using CV content (at least 2–3 representative projects each).

- [ ] **Step 4: Create `src/data/projects.ts`** — curated 8, typed

```ts
export type Project = {
  slug: string;
  title: string;
  category: "AI" | "Full-Stack" | "ERP" | "Blockchain";
  ai?: boolean;
  problem: string;
  solution: string;
  impact: string[];
  stack: string[];
  image?: string;
  link?: string;
  repo?: string;
};

export const projects: Project[] = [
  { slug: "yapit", title: "YapIt Marketing Hub", category: "AI", ai: true,
    problem: "Small merchants lack time and expertise to plan and launch effective ad campaigns.",
    solution: "Next.js 16 platform that scrapes any business URL and uses LLMs to auto-generate ad strategy, copy, and images, then launches ads — in a 5-step wizard.",
    impact: ["5-step URL-to-launched-ad wizard", "AI text + image generation (Gemini, DO Inference)", "Trigger.dev background pipeline", "Multilingual marketing site"],
    stack: ["Next.js 16","Prisma","PostgreSQL","Trigger.dev","Gemini","shadcn/ui"], link: "https://business.yapit.app" },
  { slug: "gid", title: "GID — Get it Done Platform", category: "Full-Stack",
    problem: "A field-service marketplace needed a scalable, event-driven backbone across many apps.",
    solution: "Contributed to a Kafka-driven microservices platform with NestJS/Flask services and Vue apps on Kubernetes.",
    impact: ["Event-driven microservices on Kafka","NestJS + Flask services","Vue admin/partner/customer/brand apps","k3s + Helm + Tilt"],
    stack: ["NestJS","Kafka","Kubernetes","Vue","PostgreSQL","Redis"] },
  { slug: "cuddle-clones", title: "Cuddle Clones — Shopify Order Mgmt", category: "Full-Stack",
    problem: "No internal system to process high-volume custom pet product orders — all manual.",
    solution: "Full-stack order platform syncing Shopify orders with async workflows and RBAC admin.",
    impact: ["500+ daily orders synced","~60% less manual effort","~35% higher throughput (BullMQ)","Twilio/SendGrid + ShipStation"],
    stack: ["NestJS","Next.js","PostgreSQL","BullMQ","Casbin","AWS"] },
  { slug: "control-net", title: "Control Net App — AI Content & 3D", category: "AI", ai: true,
    problem: "Client needed a unified platform for AI text, chat, and 3D outputs with gamified engagement.",
    solution: "Integrated OpenAI for text-to-text/chat/3D with avatar customization and a rewards CMS.",
    impact: ["Text-to-3D generation","DropCoin rewards + Swipe-to-Earn","Avatar customization"],
    stack: ["NestJS","Next.js","OpenAI API","PostgreSQL","AWS","Cloudinary"] },
  { slug: "fantasy-showdown", title: "Fantasy Showdown — Web3 Fantasy Football", category: "Blockchain",
    problem: "No platform bridging Yahoo/ESPN fantasy teams with Web3 wallet assets and tournaments.",
    solution: "MERN + Ethereum platform with team imports, MetaMask, and smart-contract prize distribution.",
    impact: ["1,000+ users","MetaMask wallet integration","Smart-contract payouts","Real-time scoring"],
    stack: ["Node.js","React","MongoDB","Web3.js","Ethereum","AWS"] },
  { slug: "aqr-link", title: "AQR Link — Property Management", category: "Full-Stack",
    problem: "Managers manually synced availability across Booking.com, Airbnb, Vrbo — causing double bookings.",
    solution: "Real-time XML-to-JSON OTA sync pipeline via Rental United, with microservices + RBAC.",
    impact: ["Eliminated double bookings","Real-time multi-OTA sync","Microservices + RBAC"],
    stack: ["NestJS","PostgreSQL","TypeORM","JWT","RBAC"] },
  { slug: "eventzero", title: "EventZero — Carbon Calculation", category: "Full-Stack",
    problem: "Organizations had no digital tool to calculate and report event carbon footprints.",
    solution: "React + Node platform with automated emission-factor calculation and subscriptions.",
    impact: ["Automated carbon calculation","Stripe subscriptions","AWS Cognito auth"],
    stack: ["Node.js","React","TypeScript","Stripe","AWS Cognito","AWS Lambda"], link: "https://eventzero.io/" },
  { slug: "aramco-cms", title: "Aramco CMS — Training Content", category: "Full-Stack",
    problem: "Training materials were distributed manually, causing outdated content to reach employees.",
    solution: "Centralized CMS with REST sync to the Aramco mobile app and RBAC editorial controls.",
    impact: ["Org-wide content sync","iOS/Android REST sync","Editor/reviewer/admin RBAC"],
    stack: ["NestJS","React","TypeScript","PostgreSQL","TypeORM","JWT"] },
];
```

- [ ] **Step 5: Create `src/data/testimonials.ts`** (empty array with type, ready for real quotes)

```ts
export type Testimonial = { quote: string; name: string; role: string; company: string; avatar?: string };
export const testimonials: Testimonial[] = [];
```

- [ ] **Step 6: Typecheck + commit**

Run: `npx tsc --noEmit`
Expected: no type errors.
```bash
git add src/data && git commit -m "feat: add typed site/skills/experience/projects/testimonials data"
```

---

### Task 3: Shared UI primitives

**Files:**
- Create: `src/components/shared/SectionHeading.tsx`, `AIBadge.tsx`, `SocialLinks.tsx`, `AnimatedCounter.tsx`, `ThemeBackground.tsx`, `Container.tsx`
- Create (shadcn): run init + add `button`, `card`, `badge`, `input`, `textarea`

**Interfaces:**
- Produces: `<SectionHeading eyebrow title accent>`, `<AIBadge>`, `<SocialLinks>`, `<AnimatedCounter value suffix>`, `<ThemeBackground>`, `<Container>`; shadcn `Button`, `Card`, `Badge`, `Input`, `Textarea` under `@/components/ui/*`.

- [ ] **Step 1: Init shadcn/ui and add primitives**

```bash
npx --yes shadcn@latest init -d
npx --yes shadcn@latest add button card badge input textarea
```

- [ ] **Step 2: `Container.tsx`**

```tsx
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}
```

- [ ] **Step 3: `SectionHeading.tsx`**

```tsx
export function SectionHeading({ eyebrow, title, accent }: { eyebrow?: string; title: string; accent?: string }) {
  return (
    <div className="mb-12 text-center">
      {eyebrow && <p className="mb-2 text-sm font-medium uppercase tracking-widest text-violet-400">{eyebrow}</p>}
      <h2 className="text-3xl font-bold sm:text-4xl">{title} {accent && <span className="gradient-text">{accent}</span>}</h2>
    </div>
  );
}
```

- [ ] **Step 4: `AIBadge.tsx`** (glowing badge for AI projects)

```tsx
import { Sparkles } from "lucide-react";
export function AIBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-violet-500/40 bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-300 shadow-[0_0_12px_rgba(124,58,237,0.4)]">
      <Sparkles className="h-3 w-3" /> AI
    </span>
  );
}
```

- [ ] **Step 5: `SocialLinks.tsx`** (uses `site.social`, lucide/react-icons)

```tsx
import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/data/site";
export function SocialLinks({ className = "" }: { className?: string }) {
  const links = [
    { href: site.social.github, icon: Github, label: "GitHub" },
    { href: site.social.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: `mailto:${site.email}`, icon: Mail, label: "Email" },
  ];
  return (
    <div className={`flex gap-4 ${className}`}>
      {links.map(({ href, icon: Icon, label }) => (
        <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer"
           className="rounded-full border border-[var(--border)] p-2.5 text-[var(--muted)] transition hover:text-violet-300 hover:border-violet-500/50">
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
```

- [ ] **Step 6: `AnimatedCounter.tsx`** (client component, counts up on view)

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
export function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0; const start = performance.now(); const dur = 1200;
    const tick = (t: number) => { const p = Math.min((t - start) / dur, 1); setN(Math.round(p * value)); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref}>{n}{suffix}</span>;
}
```

- [ ] **Step 7: `ThemeBackground.tsx`** (fixed animated gradient glow)

```tsx
export function ThemeBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-violet-700/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-blue-700/20 blur-[120px]" />
    </div>
  );
}
```

- [ ] **Step 8: Build check + commit**

Run: `npm run build`
Expected: build passes.
```bash
git add -A && git commit -m "feat: add shared UI primitives and shadcn components"
```

---

### Task 4: Navbar + Hero + Value strip

**Files:**
- Create: `src/components/shared/Navbar.tsx`, `src/components/sections/Hero.tsx`, `src/components/sections/ValueStrip.tsx`
- Modify: `src/app/page.tsx` (compose ThemeBackground, Navbar, Hero, ValueStrip)

**Interfaces:**
- Consumes: `site`, `SocialLinks`, `Container`, `ThemeBackground`, shadcn `Button`.
- Produces: `<Navbar>`, `<Hero>`, `<ValueStrip>` rendered on the page.

- [ ] **Step 1: `Navbar.tsx`** — sticky glass nav, anchor links (`#about #skills #experience #projects #contact`), availability badge, Download CV button, mobile menu.

```tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "./Container";

const links = [["About","#about"],["Skills","#skills"],["Experience","#experience"],["Projects","#projects"],["Contact","#contact"]];
export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass">
      <Container className="flex h-16 items-center justify-between">
        <Link href="#" className="font-bold gradient-text">Haseeb.dev</Link>
        <nav className="hidden gap-6 md:flex">{links.map(([l,h]) => <a key={h} href={h} className="text-sm text-[var(--muted)] hover:text-white">{l}</a>)}</nav>
        <a href={site.cvPath} download className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-sm font-medium"><Download className="h-4 w-4"/>CV</a>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X/> : <Menu/>}</button>
      </Container>
      {open && <nav className="md:hidden glass border-t border-[var(--border)]"><Container className="flex flex-col py-4 gap-3">{links.map(([l,h]) => <a key={h} href={h} onClick={()=>setOpen(false)} className="text-[var(--muted)]">{l}</a>)}<a href={site.cvPath} download className="text-violet-300">Download CV</a></Container></nav>}
    </header>
  );
}
```
(Place `Container` import path correctly: `@/components/shared/Container`.)

- [ ] **Step 2: `Hero.tsx`** — name, title, tagline, availability badge, dual CTA (Hire Me → `#contact`, Download CV), SocialLinks, Framer Motion fade-in.

```tsx
"use client";
import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "@/components/shared/Container";
import { SocialLinks } from "@/components/shared/SocialLinks";

export function Hero() {
  return (
    <section className="relative pt-28 pb-20">
      <Container className="text-center">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
          <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-300"><span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"/>{site.available}</span>
          <h1 className="mt-6 text-4xl font-extrabold sm:text-6xl">{site.name}</h1>
          <p className="mt-3 text-xl gradient-text font-semibold sm:text-2xl">{site.title}</p>
          <p className="mx-auto mt-6 max-w-2xl text-[var(--muted)]">{site.tagline}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 font-medium">Hire Me <ArrowRight className="h-4 w-4"/></a>
            <a href={site.cvPath} download className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3 font-medium hover:border-violet-500/50"><Download className="h-4 w-4"/>Download CV</a>
          </div>
          <SocialLinks className="mt-8 justify-center"/>
        </motion.div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: `ValueStrip.tsx`** — 4 value cards (Remote & timezone-flexible; AI-accelerated 2× delivery; 4+ yrs US/Saudi/international clients; Production-grade CI/CD & cloud). Use icons from lucide, glass cards, responsive grid.

- [ ] **Step 4: Compose in `page.tsx`**

```tsx
import { ThemeBackground } from "@/components/shared/ThemeBackground";
import { Navbar } from "@/components/shared/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ValueStrip } from "@/components/sections/ValueStrip";
export default function Home() {
  return (<><ThemeBackground/><Navbar/><main><Hero/><ValueStrip/></main></>);
}
```

- [ ] **Step 5: Verify + commit**

Run: `npm run dev` then `npm run build`. Check hero renders, CTAs visible, mobile menu toggles at 360px (devtools).
```bash
git add -A && git commit -m "feat: navbar, hero, value strip sections"
```

---

### Task 5: About + Skills sections

**Files:**
- Create: `src/components/sections/About.tsx`, `src/components/sections/Skills.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `site.stats`, `AnimatedCounter`, `skills`, `SectionHeading`, `AIBadge`.
- Produces: `<About id="about">` with stat counters; `<Skills id="skills">` with AI category emphasized first.

- [ ] **Step 1: `About.tsx`** — `id="about"`, summary paragraph (AI-augmented workflow), 3 stat cards using `AnimatedCounter`.
- [ ] **Step 2: `Skills.tsx`** — `id="skills"`, map `skills`; render the `featured` (AI) category first with a glowing border + `AIBadge`; others as glass cards with badge pills.
- [ ] **Step 3: Add both to `page.tsx`** after `ValueStrip`.
- [ ] **Step 4: Verify + commit**

Run: `npm run build`
```bash
git add -A && git commit -m "feat: about and skills sections (AI highlighted)"
```

---

### Task 6: Experience timeline

**Files:**
- Create: `src/components/sections/Experience.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `experience`, `SectionHeading`, `Container`.
- Produces: `<Experience id="experience">` vertical timeline; current role marked; each project shows summary, bullets, stack badges.

- [ ] **Step 1: Build `Experience.tsx`** — vertical timeline with a left rail; per company a node (highlight `current`), nested project blocks with bulleted quantified achievements and stack badge pills. Framer Motion stagger on scroll-in.
- [ ] **Step 2: Add to `page.tsx`.**
- [ ] **Step 3: Verify + commit**

Run: `npm run build`
```bash
git add -A && git commit -m "feat: experience timeline section"
```

---

### Task 7: Projects (filterable grid)

**Files:**
- Create: `src/components/sections/Projects.tsx`, `src/components/shared/ProjectCard.tsx`
- Add: placeholder images at `public/projects/<slug>.svg` (branded gradient + initials) OR a reusable gradient fallback in the card
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `projects`, `Project` type, `AIBadge`, `SectionHeading`, shadcn `Badge`.
- Produces: `<Projects id="projects">` with category filter buttons (All/AI/Full-Stack/ERP/Blockchain) and a responsive card grid; `<ProjectCard project>`.

- [ ] **Step 1: `ProjectCard.tsx`** — glass card; gradient header banner with project initials when `image` missing; `AIBadge` when `ai`; title, problem→solution, impact chips, stack badges, links (live/repo). Hover lift.
- [ ] **Step 2: `Projects.tsx`** — `"use client"`; `useState` filter; derive categories; animate grid with Framer Motion `layout`. Filter buttons styled active/inactive.
- [ ] **Step 3: Add to `page.tsx`.**
- [ ] **Step 4: Verify filtering works (click AI → only YapIt + Control Net) + commit**

Run: `npm run dev`, click each filter; `npm run build`.
```bash
git add -A && git commit -m "feat: filterable projects grid with AI badges"
```

---

### Task 8: Testimonials scaffold

**Files:**
- Create: `src/components/sections/Testimonials.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `testimonials`, `Testimonial` type, `SectionHeading`.
- Produces: `<Testimonials id="testimonials">`; when array empty, render a tasteful "Client testimonials coming soon — based on delivered work for US, Saudi, and international clients" placeholder card instead of nothing.

- [ ] **Step 1: Build `Testimonials.tsx`** — if `testimonials.length`, render quote cards (quote, name, role, company, avatar initials); else render the placeholder card.
- [ ] **Step 2: Add to `page.tsx`.**
- [ ] **Step 3: Verify + commit**

```bash
git add -A && git commit -m "feat: testimonials section with empty-state placeholder"
```

---

### Task 9: Contact form validation (TDD)

**Files:**
- Create: `src/lib/validation.ts`, `src/lib/__tests__/validation.test.ts`
- Create: `vitest.config.ts`

**Interfaces:**
- Produces: `contactSchema` (zod) and `ContactInput` type; fields `name` (1–100), `email` (valid), `subject` (1–150), `message` (10–5000), `honeypot` (must be empty string/undefined). `parseContact(data): {success,data}|{success:false,error}`.

- [ ] **Step 1: `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
export default defineConfig({ test: { environment: "node" } });
```

- [ ] **Step 2: Write failing test `src/lib/__tests__/validation.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { contactSchema } from "../validation";

describe("contactSchema", () => {
  const valid = { name: "Jane", email: "jane@acme.com", subject: "Project", message: "I'd like to hire you for a build.", honeypot: "" };
  it("accepts valid input", () => { expect(contactSchema.safeParse(valid).success).toBe(true); });
  it("rejects bad email", () => { expect(contactSchema.safeParse({ ...valid, email: "nope" }).success).toBe(false); });
  it("rejects short message", () => { expect(contactSchema.safeParse({ ...valid, message: "hi" }).success).toBe(false); });
  it("rejects filled honeypot (spam)", () => { expect(contactSchema.safeParse({ ...valid, honeypot: "bot" }).success).toBe(false); });
});
```

- [ ] **Step 3: Run test, verify it fails**

Run: `npx vitest run src/lib/__tests__/validation.test.ts`
Expected: FAIL (cannot find `../validation`).

- [ ] **Step 4: Implement `src/lib/validation.ts`**

```ts
import { z } from "zod";
export const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  subject: z.string().min(1).max(150),
  message: z.string().min(10).max(5000),
  honeypot: z.string().max(0).optional().or(z.literal("")),
});
export type ContactInput = z.infer<typeof contactSchema>;
```

- [ ] **Step 5: Run test, verify pass**

Run: `npx vitest run src/lib/__tests__/validation.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 6: Add test script + commit**

Set `"test": "vitest run"` in `package.json` scripts.
```bash
git add -A && git commit -m "test: contact form zod validation"
```

---

### Task 10: Email templates + transport (TDD on templates)

**Files:**
- Create: `src/lib/email-templates.ts`, `src/lib/email.ts`, `src/lib/__tests__/email-templates.test.ts`

**Interfaces:**
- Consumes: `ContactInput`, `site`.
- Produces:
  - `notifyHtml(input: ContactInput): string` — internal notification email.
  - `autoReplyHtml(input: ContactInput): string` — branded auto-reply (dark/gradient, "Thanks for reaching out", 24–48h, social links, CV link).
  - `sendContactEmails(input: ContactInput): Promise<void>` — sends both via Nodemailer transport built from `GMAIL_USER`/`GMAIL_APP_PASSWORD`.

- [ ] **Step 1: Write failing test `email-templates.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { notifyHtml, autoReplyHtml } from "../email-templates";
const input = { name: "Jane", email: "jane@acme.com", subject: "Build", message: "Hello there team", honeypot: "" };
describe("email templates", () => {
  it("notify includes sender details", () => { const h = notifyHtml(input); expect(h).toContain("jane@acme.com"); expect(h).toContain("Hello there team"); });
  it("auto-reply greets sender and thanks them", () => { const h = autoReplyHtml(input); expect(h).toContain("Jane"); expect(h.toLowerCase()).toContain("thanks for reaching out"); });
});
```

- [ ] **Step 2: Run, verify fail**

Run: `npx vitest run src/lib/__tests__/email-templates.test.ts`
Expected: FAIL (module missing).

- [ ] **Step 3: Implement `email-templates.ts`** — two functions returning HTML strings. Auto-reply uses inline-styled dark gradient layout, greeting `Hi ${input.name}`, body "Thanks for reaching out", 24–48h note, social + CV links (use `site`). Notify lists name/email/subject/message in a simple table; escape `<`/`>` in user content.

- [ ] **Step 4: Run, verify pass**

Run: `npx vitest run src/lib/__tests__/email-templates.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Implement `email.ts`** (transport + send; no live test)

```ts
import nodemailer from "nodemailer";
import { ContactInput } from "./validation";
import { notifyHtml, autoReplyHtml } from "./email-templates";
import { site } from "@/data/site";

export async function sendContactEmails(input: ContactInput): Promise<void> {
  const user = process.env.GMAIL_USER, pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error("Email not configured");
  const transport = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass } });
  const to = process.env.CONTACT_TO || site.email;
  await transport.sendMail({ from: `"Portfolio" <${user}>`, to, replyTo: input.email, subject: `New inquiry: ${input.subject}`, html: notifyHtml(input) });
  await transport.sendMail({ from: `"${site.name}" <${user}>`, to: input.email, subject: "Thanks for reaching out — Haseeb Ur Rehman", html: autoReplyHtml(input) });
}
```

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: email templates and Nodemailer transport"
```

---

### Task 11: Contact API route (TDD with mocked email)

**Files:**
- Create: `src/app/api/contact/route.ts`, `src/app/api/contact/__tests__/route.test.ts`
- Create: `.env.example`

**Interfaces:**
- Consumes: `contactSchema`, `sendContactEmails`.
- Produces: `POST` handler returning `{ ok: true }` (200) on success, `{ ok:false, error }` (400 invalid / 429 rate-limited / 500 send failure). Honeypot filled → return 200 `{ok:true}` without sending (silent).

- [ ] **Step 1: Write failing test `route.test.ts`** (mock `sendContactEmails`)

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
vi.mock("@/lib/email", () => ({ sendContactEmails: vi.fn().mockResolvedValue(undefined) }));
import { POST } from "../route";
import { sendContactEmails } from "@/lib/email";

const req = (body: unknown) => new Request("http://localhost/api/contact", { method: "POST", body: JSON.stringify(body), headers: { "content-type": "application/json" } });
const valid = { name: "Jane", email: "jane@acme.com", subject: "Build", message: "I'd like to hire you please", honeypot: "" };

beforeEach(() => vi.clearAllMocks());
describe("POST /api/contact", () => {
  it("sends on valid input", async () => { const res = await POST(req(valid)); expect(res.status).toBe(200); expect(sendContactEmails).toHaveBeenCalledOnce(); });
  it("rejects invalid input", async () => { const res = await POST(req({ ...valid, email: "x" })); expect(res.status).toBe(400); expect(sendContactEmails).not.toHaveBeenCalled(); });
  it("silently ignores honeypot spam", async () => { const res = await POST(req({ ...valid, honeypot: "bot" })); expect(res.status).toBe(200); expect(sendContactEmails).not.toHaveBeenCalled(); });
});
```

Note: vitest needs the `@` alias — add to `vitest.config.ts`: `resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } }`.

- [ ] **Step 2: Run, verify fail**

Run: `npx vitest run src/app/api/contact/__tests__/route.test.ts`
Expected: FAIL (no route).

- [ ] **Step 3: Implement `route.ts`**

```ts
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { sendContactEmails } from "@/lib/email";

const hits = new Map<string, { c: number; t: number }>();
function limited(ip: string) {
  const now = Date.now(); const w = 60_000; const max = 5;
  const e = hits.get(ip); if (!e || now - e.t > w) { hits.set(ip, { c: 1, t: now }); return false; }
  e.c++; return e.c > max;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 }); }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
  if (parsed.data.honeypot) return NextResponse.json({ ok: true }); // spam, silently drop
  try { await sendContactEmails(parsed.data); return NextResponse.json({ ok: true }); }
  catch { return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 500 }); }
}
```

- [ ] **Step 4: Run, verify pass**

Run: `npx vitest run src/app/api/contact/__tests__/route.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Create `.env.example`**

```
GMAIL_USER=haseebsiddique26@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
CONTACT_TO=haseebsiddique26@gmail.com
```
Confirm `.env.local` is gitignored (Next default ignores `.env*`).

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: contact API route with validation, rate-limit, honeypot"
```

---

### Task 12: Contact section UI (form wired to API)

**Files:**
- Create: `src/components/sections/Contact.tsx`, `src/components/sections/Footer.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `/api/contact`, `site`, shadcn `Input`/`Textarea`/`Button`, `SocialLinks`.
- Produces: `<Contact id="contact">` with controlled form, hidden honeypot, loading/success/error states; `<Footer>`.

- [ ] **Step 1: `Contact.tsx`** — `"use client"`; controlled fields; hidden honeypot input (visually hidden, `tabIndex=-1`, `autoComplete=off`); submit → `fetch('/api/contact', POST json)`; show success message ("Thanks! Check your inbox for confirmation.") and error fallback; left column = direct contact (email, WhatsApp link `https://wa.me/${site.whatsapp}`, location, availability, Download CV; Book a Call if `site.calendly`).
- [ ] **Step 2: `Footer.tsx`** — quick links, SocialLinks, copyright, "Built with Next.js".
- [ ] **Step 3: Add both to `page.tsx`.**
- [ ] **Step 4: Verify form states** — submit invalid (client guard), submit valid with no env set → graceful error message (not a crash). With env set later, real send works.
- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: contact form UI wired to API + footer"
```

---

### Task 13: SEO, OG image, sitemap, JSON-LD

**Files:**
- Modify: `src/app/layout.tsx` (full metadata + JSON-LD script)
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`, `public/og-image.png` (or `opengraph-image` via `src/app/opengraph-image.tsx`)

**Interfaces:**
- Produces: rich `metadata` (title template, description, keywords from CV, openGraph, twitter), JSON-LD `Person`, sitemap, robots.

- [ ] **Step 1: Expand `metadata`** in `layout.tsx` — add `keywords` (pull the CV keyword line: AI-Augmented Full-Stack, Node.js, NestJS, Next.js, TypeScript, AWS, OpenAI, Claude, remote developer, etc.), `openGraph` (title/description/type=website/images), `twitter` card, `metadataBase`.
- [ ] **Step 2: Add JSON-LD** `Person` script in `layout.tsx` body (name, jobTitle, url, sameAs github/linkedin, knowsAbout skills array).
- [ ] **Step 3: `sitemap.ts` + `robots.ts`** — single homepage URL; allow all.
- [ ] **Step 4: OG image** — add `src/app/opengraph-image.tsx` (Next ImageResponse) with name + title on gradient, OR drop a static `public/og-image.png` and reference it.
- [ ] **Step 5: Verify** `npm run build` emits sitemap/robots; view-source shows metadata + JSON-LD.
- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: SEO metadata, JSON-LD, OG image, sitemap, robots"
```

---

### Task 14: Update CV + wire Download

**Files:**
- Create: `scripts/cv/cv.html` (HTML CV template), `scripts/cv/build-cv.sh` (headless Chrome render)
- Create: `public/Haseeb_ur_Rehman_CV.pdf` (generated output)

**Interfaces:**
- Produces: an updated CV PDF served at `site.cvPath` (`/Haseeb_ur_Rehman_CV.pdf`), already linked by Navbar/Hero/Contact Download buttons.

- [ ] **Step 1: Build `scripts/cv/cv.html`** — recreate the existing CV layout (header with name + AI-Augmented title + contact row; Professional Summary; Technical Skills table; Work Experience). **Add under Optima Geeks two new entries** with the exact wording from the spec §6 (YapIt Marketing Hub (Alvo) and GID). Keep SolutionsLoft + Axiom World content from the current CV. Use clean print CSS (A4, system serif/sans matching current).
- [ ] **Step 2: `scripts/cv/build-cv.sh`**

```bash
#!/usr/bin/env bash
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
google-chrome --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$DIR/../../public/Haseeb_ur_Rehman_CV.pdf" \
  "file://$DIR/cv.html"
echo "CV written to public/Haseeb_ur_Rehman_CV.pdf"
```

- [ ] **Step 3: Generate the PDF**

Run: `bash scripts/cv/build-cv.sh`
Expected: `public/Haseeb_ur_Rehman_CV.pdf` created. Open it; confirm new YapIt + GID entries appear and layout is clean.

- [ ] **Step 4: PAUSE for Haseeb to review CV wording** (per spec — get sign-off before finalizing).

- [ ] **Step 5: Commit**

```bash
git add scripts/cv public/Haseeb_ur_Rehman_CV.pdf && git commit -m "feat: updated CV (adds YapIt + GID) and download asset"
```

---

### Task 15: Responsive/a11y/perf polish + final verification

**Files:**
- Modify: any section needing responsive/a11y fixes
- Create: `README.md` update (run/deploy/env instructions)

**Interfaces:**
- Produces: production-ready build; documented setup.

- [ ] **Step 1: Responsive pass** — check 360/768/1024/1440px (devtools): no overflow, readable type, tappable targets, mobile nav works, projects grid reflows.
- [ ] **Step 2: A11y pass** — landmarks (`header/main/footer`), `alt` text, `aria-label`s on icon links/buttons, visible focus rings, color contrast OK on dark bg.
- [ ] **Step 3: Perf pass** — use `next/image` for any raster images, `font` optimization already via `next/font`; lazy/`whileInView` for heavy animations.
- [ ] **Step 4: Update `README.md`** — how to run (`npm run dev`), env vars (Gmail App Password steps), how to rebuild CV (`bash scripts/cv/build-cv.sh`), how to deploy to Vercel (set env vars in dashboard).
- [ ] **Step 5: Full verification**

Run: `npm run lint && npx tsc --noEmit && npm run test && npm run build`
Expected: all pass, `next build` succeeds.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "chore: responsive/a11y/perf polish, README, final verification"
```

---

## Self-Review Notes

- **Spec coverage:** Hero/About/Skills/Experience/Projects/Testimonials/Contact/Footer (Tasks 4–8,12) ✓; AI emphasis (Task 5) ✓; value strip + availability + WhatsApp + testimonials scaffold + quantified metrics (Tasks 4,7,8,12) ✓; contact email + auto-reply (Tasks 10–11) ✓; CV update + download (Task 14) ✓; SEO/JSON-LD (Task 13) ✓; responsive/perf/a11y (Task 15) ✓; YapIt+GID under Optima Geeks in data + CV (Tasks 2,14) ✓; Vercel build (Tasks 1,15) ✓.
- **Action items deferred to Haseeb (non-blocking):** Gmail App Password (live email), CV wording sign-off (Task 14 pause), optional Calendly/testimonials/screenshots.
- **Placeholder scan:** No "TBD/TODO" left; UI-only sections (3,4,5,6,7,8,12) describe exact components/ids; testable logic (9,10,11) has full code + tests.
