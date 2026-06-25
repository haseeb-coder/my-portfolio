import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  subject: z.string().min(1).max(150),
  message: z.string().min(10).max(5000),
  // Honeypot: must be empty. Bots fill hidden fields.
  honeypot: z.literal("").optional().or(z.undefined()),
});

export type ContactInput = z.infer<typeof contactSchema>;
