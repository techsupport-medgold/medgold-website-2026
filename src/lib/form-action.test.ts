import { describe, expect, it } from "vitest";
import { HONEYPOT_FIELD, isBot, MAIL_FAILURE_MESSAGE } from "@@/lib/form-action";

describe("isBot", () => {
  it("ignores an empty honeypot", () => {
    const form = new FormData();
    form.set(HONEYPOT_FIELD, "   ");
    expect(isBot(form)).toBe(false);
    expect(isBot(new FormData())).toBe(false);
  });

  it("treats a filled honeypot as a bot", () => {
    const form = new FormData();
    form.set(HONEYPOT_FIELD, "https://spam.example");
    expect(isBot(form)).toBe(true);
  });

  it("uses a name browsers do not autofill", () => {
    expect(HONEYPOT_FIELD).toBe("medgold_hp");
    expect(HONEYPOT_FIELD).not.toMatch(/company|website|url|email|name|phone/i);
  });
});

describe("MAIL_FAILURE_MESSAGE", () => {
  it("tells the visitor the send failed and how to reach the clinic", () => {
    expect(MAIL_FAILURE_MESSAGE).toMatch(/couldn't send/i);
    expect(MAIL_FAILURE_MESSAGE).toContain("+91 91509 37804");
  });
});
