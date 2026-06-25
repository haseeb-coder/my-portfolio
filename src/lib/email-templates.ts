import type { ContactInput } from "./validation";
import { site } from "@/data/site";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const BRAND_FROM = "#7c3aed";
const BRAND_TO = "#2563eb";

/** Internal notification sent to Haseeb. */
export function notifyHtml(input: ContactInput): string {
  const name = escapeHtml(input.name);
  const email = escapeHtml(input.email);
  const subject = escapeHtml(input.subject);
  const message = escapeHtml(input.message).replace(/\n/g, "<br/>");
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#0a0a0f;padding:24px;color:#e7e7ee">
    <div style="max-width:600px;margin:0 auto;background:#12121a;border:1px solid #23232f;border-radius:16px;overflow:hidden">
      <div style="background:linear-gradient(90deg,${BRAND_FROM},${BRAND_TO});padding:18px 24px">
        <h2 style="margin:0;color:#fff;font-size:18px">New portfolio inquiry</h2>
      </div>
      <table style="width:100%;border-collapse:collapse;padding:24px" cellpadding="8">
        <tr><td style="color:#9a9ab0;width:90px">Name</td><td style="color:#fff">${name}</td></tr>
        <tr><td style="color:#9a9ab0">Email</td><td><a style="color:#a78bfa" href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="color:#9a9ab0">Subject</td><td style="color:#fff">${subject}</td></tr>
        <tr><td style="color:#9a9ab0;vertical-align:top">Message</td><td style="color:#e7e7ee">${message}</td></tr>
      </table>
    </div>
  </div>`;
}

/** Auto-reply sent to the person who contacted Haseeb. */
export function autoReplyHtml(input: ContactInput): string {
  const name = escapeHtml(input.name);
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#0a0a0f;padding:24px;color:#e7e7ee">
    <div style="max-width:600px;margin:0 auto;background:#12121a;border:1px solid #23232f;border-radius:16px;overflow:hidden">
      <div style="background:linear-gradient(90deg,${BRAND_FROM},${BRAND_TO});padding:28px 24px;text-align:center">
        <h1 style="margin:0;color:#fff;font-size:22px">Thanks for reaching out!</h1>
      </div>
      <div style="padding:28px 24px">
        <p style="margin:0 0 14px">Hi ${name},</p>
        <p style="margin:0 0 14px;color:#cfcfe0">
          Thanks for reaching out — your message has landed in my inbox.
          I read every message personally and will get back to you within
          <strong style="color:#fff">24–48 hours</strong>.
        </p>
        <p style="margin:0 0 20px;color:#cfcfe0">
          In the meantime, feel free to explore my work or grab my CV below.
        </p>
        <div style="text-align:center;margin:24px 0">
          <a href="${site.social.github}" style="display:inline-block;margin:0 6px;color:#a78bfa;text-decoration:none">GitHub</a>
          <a href="${site.social.linkedin}" style="display:inline-block;margin:0 6px;color:#a78bfa;text-decoration:none">LinkedIn</a>
        </div>
        <p style="margin:24px 0 0;color:#9a9ab0;font-size:13px">
          — ${escapeHtml(site.name)}<br/>
          ${escapeHtml(site.title)}
        </p>
      </div>
    </div>
  </div>`;
}
