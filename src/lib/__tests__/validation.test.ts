import { describe, it, expect } from "vitest";
import { contactSchema } from "../validation";

describe("contactSchema", () => {
  const valid = {
    name: "Jane",
    email: "jane@acme.com",
    subject: "Project",
    message: "I'd like to hire you for a build.",
    honeypot: "",
  };
  it("accepts valid input", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });
  it("rejects bad email", () => {
    expect(contactSchema.safeParse({ ...valid, email: "nope" }).success).toBe(
      false,
    );
  });
  it("rejects short message", () => {
    expect(contactSchema.safeParse({ ...valid, message: "hi" }).success).toBe(
      false,
    );
  });
  it("rejects filled honeypot (spam)", () => {
    expect(
      contactSchema.safeParse({ ...valid, honeypot: "bot" }).success,
    ).toBe(false);
  });
});
