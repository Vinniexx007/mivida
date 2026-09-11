import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import type { ContactFormData } from "./contact-form";

const data: ContactFormData = {
  name: "Jordan Smith",
  businessName: "Smith Joinery",
  businessType: "Trade / Local Service",
  phone: "07424158513",
  email: "jordan@smithjoinery.co.uk",
  website: "",
  enquiryType: "A new website",
  message: "Need a 5-page site.",
};

describe("sendContactEnquiry — mock path", () => {
  const originalKey = process.env.RESEND_API_KEY;
  const originalNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    process.env.RESEND_API_KEY = originalKey;
    vi.stubEnv("NODE_ENV", originalNodeEnv ?? "test");
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it('short-circuits to a mocked send when RESEND_API_KEY is "test"', async () => {
    process.env.RESEND_API_KEY = "test";
    const { sendContactEnquiry } = await import("./email");
    const result = await sendContactEnquiry(data);
    expect(result).toEqual({ ok: true, mocked: true });
  });

  it("mocks when the key is unset outside production (dev/CI)", async () => {
    delete process.env.RESEND_API_KEY;
    vi.stubEnv("NODE_ENV", "development");
    const { sendContactEnquiry } = await import("./email");
    const result = await sendContactEnquiry(data);
    expect(result).toEqual({ ok: true, mocked: true });
  });

  it("errors gracefully (no false success) when the key is missing in production", async () => {
    delete process.env.RESEND_API_KEY;
    vi.stubEnv("NODE_ENV", "production");
    const { sendContactEnquiry } = await import("./email");
    const result = await sendContactEnquiry(data);
    expect(result.ok).toBe(false);
  });

  it("errors gracefully when the key is blank/whitespace in production", async () => {
    process.env.RESEND_API_KEY = "   ";
    vi.stubEnv("NODE_ENV", "production");
    const { sendContactEnquiry } = await import("./email");
    const result = await sendContactEnquiry(data);
    expect(result.ok).toBe(false);
  });
});

describe("sendContactEnquiry — provider unreachable / failing", () => {
  const original = process.env.RESEND_API_KEY;
  const FAKE_KEY = "re_fake_token_do_not_use_123";

  beforeEach(() => {
    vi.resetModules();
    // A real-looking key forces the live code path (not the mock short-circuit).
    process.env.RESEND_API_KEY = FAKE_KEY;
  });

  afterEach(() => {
    process.env.RESEND_API_KEY = original;
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("returns a safe error (does not throw) when the network is unreachable", async () => {
    const send = vi
      .fn()
      .mockRejectedValue(new Error("getaddrinfo ENOTFOUND api.resend.com"));
    vi.doMock("resend", () => ({
      Resend: vi.fn().mockImplementation(() => ({ emails: { send } })),
    }));

    const { sendContactEnquiry } = await import("./email");

    // The call resolves to a failure result rather than rejecting.
    const result = await sendContactEnquiry(data);
    expect(result.ok).toBe(false);
    expect(send).toHaveBeenCalledOnce();
  });

  it("returns a failure result when the provider responds with an error object", async () => {
    const send = vi
      .fn()
      .mockResolvedValue({ data: null, error: { message: "rate limited" } });
    vi.doMock("resend", () => ({
      Resend: vi.fn().mockImplementation(() => ({ emails: { send } })),
    }));

    const { sendContactEnquiry } = await import("./email");
    const result = await sendContactEnquiry(data);
    expect(result.ok).toBe(false);
  });

  it("never leaks the API token or provider internals in the error message", async () => {
    const send = vi
      .fn()
      .mockRejectedValue(new Error(`auth failed for key ${FAKE_KEY}`));
    vi.doMock("resend", () => ({
      Resend: vi.fn().mockImplementation(() => ({ emails: { send } })),
    }));

    const { sendContactEnquiry } = await import("./email");
    const result = await sendContactEnquiry(data);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).not.toContain(FAKE_KEY);
      expect(result.error).not.toContain("auth failed");
    }
  });

  it("succeeds when the provider accepts the message", async () => {
    const send = vi
      .fn()
      .mockResolvedValue({ data: { id: "email_123" }, error: null });
    vi.doMock("resend", () => ({
      Resend: vi.fn().mockImplementation(() => ({ emails: { send } })),
    }));

    const { sendContactEnquiry } = await import("./email");
    const result = await sendContactEnquiry(data);
    expect(result).toEqual({ ok: true, mocked: false });
  });
});
