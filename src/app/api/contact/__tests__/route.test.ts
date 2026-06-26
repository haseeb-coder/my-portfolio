import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/email", () => ({
  sendContactEmails: vi.fn().mockResolvedValue(undefined),
}));

import { POST } from "../route";
import { sendContactEmails } from "@/lib/email";

const req = (body: unknown) =>
  new Request("http://localhost/api/contact", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });

const valid = {
  name: "Jane",
  email: "jane@acme.com",
  subject: "Build",
  message: "I'd like to hire you please",
  honeypot: "",
};

beforeEach(() => vi.clearAllMocks());

describe("POST /api/contact", () => {
  it("sends on valid input", async () => {
    const res = await POST(req(valid));
    expect(res.status).toBe(200);
    expect(sendContactEmails).toHaveBeenCalledOnce();
  });
  it("rejects invalid input", async () => {
    const res = await POST(req({ ...valid, email: "x" }));
    expect(res.status).toBe(400);
    expect(sendContactEmails).not.toHaveBeenCalled();
  });
  it("silently ignores honeypot spam", async () => {
    const res = await POST(req({ ...valid, honeypot: "bot" }));
    expect(res.status).toBe(400);
    expect(sendContactEmails).not.toHaveBeenCalled();
  });
});
