# Portfolio Revamp — Design Spec

**Date:** 2026-06-25
**Owner:** Haseeb Ur Rehman
**Status:** Approved (pending spec review)

## 1. Goal

Transform the existing Vite + React portfolio into a modern, client-converting
**Next.js (latest, App Router + TypeScript)** site that:

- Presents Haseeb as an **AI-Augmented Full-Stack Software Engineer** (AI is the lead theme — most in-demand skill).
- Attracts **international / remote clients** and is optimized to win project bids.
- Is fully **mobile-responsive**, fast, accessible, and SEO-optimized.
- Lets visitors **download an updated CV**.
- Has a **working contact form** that emails Haseeb and sends an auto-reply to the sender.
- Showcases a curated set of strong projects, including newly added **YapIt Marketing Hub** and **GID**.

## 2. Decisions (confirmed)

| Decision | Choice |
|---|---|
| Framework | Next.js latest, App Router, TypeScript |
| Styling / UI | Tailwind CSS + shadcn/ui + Framer Motion (mirrors YapIt stack) |
| Hosting | Vercel |
| Visual style | Dark + AI-modern (purple-blue gradient glow, glassmorphism, motion) |
| Email delivery | Gmail SMTP via Nodemailer (App Password) |
| Project scope | Curated ~8–9 best projects |
| New project attribution | YapIt + GID listed under **Optima Geeks** (current role) |
| Alvo Marketing | Treated as the consumer marketing brand **within YapIt Marketing Hub** (one combined project) |
| CV | Regenerated PDF (headless Chrome) with new projects added; served from `/public` |

## 3. Architecture

Single Next.js app in the existing `my-portfolio` repo (Vite app removed; preserved in git history).

```
my-portfolio/
├── public/
│   ├── Haseeb_ur_Rehman_CV.pdf        # updated, downloadable
│   ├── og-image.png                    # social share image
│   └── projects/                       # project images (placeholders now)
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # root layout, metadata, fonts, JSON-LD
│   │   ├── page.tsx                    # single-page composition of sections
│   │   ├── globals.css                 # Tailwind + theme tokens
│   │   ├── sitemap.ts / robots.ts
│   │   └── api/contact/route.ts        # contact form handler (Nodemailer)
│   ├── components/
│   │   ├── sections/                   # Hero, About, ValueStrip, Skills,
│   │   │                               #   Experience, Projects, Testimonials,
│   │   │                               #   Contact, Footer
│   │   ├── ui/                          # shadcn/ui primitives
│   │   └── shared/                      # Navbar, ThemeBackground, SocialLinks,
│   │                                   #   SectionHeading, AnimatedCounter, AIBadge
│   ├── lib/
│   │   ├── email.ts                    # Nodemailer transport + send helpers
│   │   ├── email-templates.ts          # HTML templates (notify + auto-reply)
│   │   └── validation.ts               # zod schema for contact form
│   └── data/
│       ├── projects.ts                 # curated project data
│       ├── experience.ts               # timeline data
│       ├── skills.ts                   # categorized skills
│       └── site.ts                     # name, links, CTAs, config
```

**Data-driven:** all content (projects, experience, skills, links) lives in typed
`src/data/*` modules so updates are one-file edits, not JSX surgery.

## 4. Sections (page composition)

1. **Navbar** — sticky, smooth-scroll anchors, "Open to remote worldwide" badge, Download CV button. Mobile hamburger.
2. **Hero** — name, title, tagline (AI-augmented, ships at 2× speed), dual CTA (**Hire Me** + **Download CV**), social links, animated AI gradient backdrop.
3. **Value strip ("Why work with me")** — 4 cards: Remote-ready & timezone-flexible · AI-accelerated 2× delivery · 4+ yrs, US/Saudi/international clients · Production-grade (CI/CD, AWS, microservices).
4. **About** — professional summary; AI-augmented workflow (Claude, ChatGPT, Copilot); animated stat counters (4+ yrs, ~15 projects, international clients).
5. **Skills** — categorized badges. **AI & LLMs shown first and visually emphasized.** Then Backend, Frontend, Database, Cloud/DevOps, Auth/Security, Integrations.
6. **Experience timeline** — Optima Geeks (current: Cuddle Clones, GID, YapIt) · SolutionsLoft · Axiom World, with quantified bullets.
7. **Featured Projects** — filterable grid (All / AI / Full-Stack / ERP / Blockchain). Each card: title, problem→solution, quantified impact, tech badges, links. **AI projects get a glowing AI badge.** Curated set (8): YapIt (AI), GID, Cuddle Clones, Control Net App (AI), Fantasy Showdown (Web3), AQR Link, EventZero, Aramco CMS.
8. **Testimonials** — placeholder-ready structure (quote, name, role/company, avatar) for real client quotes later.
9. **Contact** — working form (name, email, subject, message + honeypot) with success/error states; direct email, LinkedIn, GitHub, WhatsApp; Download CV.
10. **Footer** — quick links, social, copyright, "built with Next.js".

## 5. Contact form & email

- **Route:** `POST /api/contact` (Next.js Route Handler).
- **Validation:** zod (server + client). Honeypot field + simple in-memory/IP rate limit to deter spam.
- **Transport:** Nodemailer over Gmail SMTP (`smtp.gmail.com`, port 465, App Password).
- **On submit, sends two emails:**
  1. **Notify Haseeb** → `haseebsiddique26@gmail.com` with sender's name, email, subject, message; reply-to set to sender.
  2. **Auto-reply to sender** → branded dark/gradient HTML template: *"Thanks for reaching out — I'll get back to you within 24–48 hours,"* with name, social links, and a CV link.
- **Env vars** (`.env.local`, documented in `.env.example`, set in Vercel):
  - `GMAIL_USER=haseebsiddique26@gmail.com`
  - `GMAIL_APP_PASSWORD=<google app password>`
  - `CONTACT_TO=haseebsiddique26@gmail.com`
- **Action required from Haseeb:** generate a Gmail App Password (Google account → 2-Step Verification → App Passwords) and provide it. Form is built/testable but won't actually send until set.

## 6. CV update

- Build an HTML CV template matching the current clean professional layout.
- **Add two projects under Optima Geeks (current role):**
  - **YapIt Marketing Hub (Alvo Marketing)** — Next.js 16 AI marketing platform. Scrapes any business URL (Jina Reader), uses LLMs (DigitalOcean Inference for text, Gemini for image generation) to auto-generate ad strategy, copy, and creative in a 5-step wizard; Trigger.dev v4 background pipeline; multilingual marketing site (i18n); launches ads via YapIt Ads API. Stack: Next.js 16 · Prisma/PostgreSQL · Trigger.dev · shadcn/ui · Framer Motion · DigitalOcean Spaces CDN.
  - **GID (Get it Done) Platform** — Kafka-driven microservices platform. NestJS + Flask services (order intake, payments, documents, email, jobs) with Vue admin/partner/customer/brand apps; Kubernetes (k3s) + Helm + Tilt; PostgreSQL/TypeORM + Redis; GraphQL gateway.
- Render to PDF via headless Google Chrome → `public/Haseeb_ur_Rehman_CV.pdf`.
- **Haseeb reviews CV wording before it's finalized.**

## 7. International-client conversion enhancements

- Value strip + availability badge (remote worldwide).
- Quantified metrics throughout (500+ orders, ~60% effort cut, ~35% throughput, 14 branches, 1,000+ users).
- Dual CTA + WhatsApp quick contact (uses CV phone +92 331 620 7320; configurable).
- Testimonials scaffold for social proof.
- Optional "Book a Call" link slot (Calendly) — configurable in `site.ts`, hidden if unset.

## 8. Non-functional requirements

- **Responsive:** mobile-first; verified at 360px, 768px, 1024px, 1440px.
- **Performance:** Next/Image, font optimization, lazy animations; target Lighthouse ≥90.
- **SEO:** per-page metadata, Open Graph/Twitter cards, JSON-LD `Person`, sitemap, robots, CV keyword coverage.
- **Accessibility:** semantic landmarks, keyboard nav, focus states, alt text, sufficient contrast in dark theme.
- **Code quality:** TypeScript strict, ESLint/Prettier, data/presentation separation, small focused components.

## 9. Out of scope (YAGNI)

- CMS / admin dashboard.
- Blog / case-study subpages (can be added later).
- Light/dark toggle (dark-only chosen).
- Real project screenshots & real testimonials (placeholders now; drop-in later).

## 10. Open items requiring Haseeb's input (non-blocking for build)

- Gmail App Password (for live email).
- Optional: Calendly link, real testimonials, real project screenshots, custom domain.
- Final review of CV wording for YapIt & GID.
