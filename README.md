# Haseeb Ur Rehman — Portfolio

Modern, AI-forward portfolio built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, **shadcn/ui**, and **Framer Motion**. Includes a working contact form (email + branded auto-reply), a downloadable CV, and curated projects.

## Tech Stack

- Next.js 16 · TypeScript · App Router
- Tailwind CSS v4 · shadcn/ui · Framer Motion · lucide-react / react-icons
- Nodemailer (Gmail SMTP) for the contact form
- Vitest for unit tests

## Getting Started

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm run test         # run unit tests (Vitest)
npm run lint         # ESLint
```

## Contact form (email) setup

The contact form sends a notification to Haseeb **and** a branded auto-reply to
the sender via Gmail SMTP. To enable live sending, set environment variables.

1. On the Google account, enable **2-Step Verification**.
2. Create an **App Password**: Google Account → Security → App passwords.
3. Copy `.env.example` to `.env.local` and fill it in:

```bash
cp .env.example .env.local
```

```
GMAIL_USER=haseebsiddique26@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
CONTACT_TO=haseebsiddique26@gmail.com
```

Without these, the form UI works but shows a graceful "failed to send" message.

## Updating the CV

The downloadable CV lives at `public/Haseeb_ur_Rehman_CV.pdf`, generated from an
HTML template via headless Chrome:

```bash
# edit scripts/cv/cv.html, then:
bash scripts/cv/build-cv.sh
```

## Editing content

All content is data-driven — edit these files (no JSX changes needed):

- `src/data/site.ts` — name, links, CTAs, stats, WhatsApp, optional Calendly
- `src/data/skills.ts` — skill categories (AI is `featured`)
- `src/data/experience.ts` — work timeline
- `src/data/projects.ts` — featured projects (set `ai: true` for the AI badge)
- `src/data/testimonials.ts` — add client testimonials here

## Deploy to Vercel

1. Push the repo to GitHub and import it in Vercel.
2. Add the three env vars above in **Project Settings → Environment Variables**.
3. Deploy. The contact API route (`/api/contact`) runs as a serverless function.
