import nodemailer from "nodemailer";
import type { ContactInput } from "./validation";
import { notifyHtml, autoReplyHtml } from "./email-templates";
import { site } from "@/data/site";

/**
 * Sends two emails on contact:
 *  1. Notification to Haseeb (reply-to = sender).
 *  2. Branded auto-reply to the sender.
 * Requires GMAIL_USER + GMAIL_APP_PASSWORD env vars.
 */
export async function sendContactEmails(input: ContactInput): Promise<void> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error("Email not configured (missing GMAIL_USER/GMAIL_APP_PASSWORD)");
  }

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  const to = process.env.CONTACT_TO || site.email;

  // 1) Notify Haseeb
  await transport.sendMail({
    from: `"Portfolio Contact" <${user}>`,
    to,
    replyTo: input.email,
    subject: `New inquiry: ${input.subject}`,
    html: notifyHtml(input),
  });

  // 2) Auto-reply to the sender
  await transport.sendMail({
    from: `"${site.name}" <${user}>`,
    to: input.email,
    subject: "Thanks for reaching out — Haseeb Ur Rehman",
    html: autoReplyHtml(input),
  });
}
