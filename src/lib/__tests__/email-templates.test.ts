import { describe, it, expect } from "vitest";
import { notifyHtml, autoReplyHtml } from "../email-templates";

const input = {
  name: "Jane",
  email: "jane@acme.com",
  subject: "Build",
  message: "Hello there team",
  honeypot: "" as const,
};

describe("email templates", () => {
  it("notify includes sender details", () => {
    const h = notifyHtml(input);
    expect(h).toContain("jane@acme.com");
    expect(h).toContain("Hello there team");
    expect(h).toContain("Build");
  });
  it("auto-reply greets sender and thanks them", () => {
    const h = autoReplyHtml(input);
    expect(h).toContain("Jane");
    expect(h.toLowerCase()).toContain("thanks for reaching out");
  });
  it("escapes HTML in user content (no injection)", () => {
    const h = notifyHtml({ ...input, message: "<script>x</script>" });
    expect(h).not.toContain("<script>x</script>");
    expect(h).toContain("&lt;script&gt;");
  });
});
