import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

/**
 * These tests drive the server action directly and stub the email layer, so we
 * can prove how the form responds to a failing / unreachable email provider
 * without any network access.
 */

function validFormData(): FormData {
  const fd = new FormData();
  fd.set("name", "Jordan Smith");
  fd.set("businessName", "Smith Joinery");
  fd.set("businessType", "Trade / Local Service");
  fd.set("phone", "07424158513");
  fd.set("email", "jordan@smithjoinery.co.uk");
  fd.set("enquiryType", "A new website");
  fd.set("message", "Need a 5-page site.");
  return fd;
}

describe("submitContact server action", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns an error state (not a throw) when the email provider is unreachable", async () => {
    vi.doMock("@/lib/email", () => ({
      sendContactEnquiry: vi
        .fn()
        .mockResolvedValue({ ok: false, error: "Something went wrong." }),
    }));

    const { submitContact } = await import("./actions");
    const state = await submitContact({ status: "idle" }, validFormData());

    expect(state.status).toBe("error");
    expect(state.message).toMatch(/couldn't send/i);
    // A transport failure is not a field-validation failure.
    expect(state.errors).toBeUndefined();
    // The UI relies on this discriminator to render WhatsApp/email links.
    expect(state.reason).toBe("send-failed");
  });

  it("surfaces a safe, user-friendly message that leaks no provider details", async () => {
    vi.doMock("@/lib/email", () => ({
      sendContactEnquiry: vi.fn().mockResolvedValue({
        ok: false,
        error: "ENOTFOUND api.resend.com re_secret_123",
      }),
    }));

    const { submitContact } = await import("./actions");
    const state = await submitContact({ status: "idle" }, validFormData());

    expect(state.message).not.toContain("ENOTFOUND");
    expect(state.message).not.toContain("re_secret_123");
  });

  it("returns a success state when the send succeeds", async () => {
    vi.doMock("@/lib/email", () => ({
      sendContactEnquiry: vi
        .fn()
        .mockResolvedValue({ ok: true, mocked: true }),
    }));

    const { submitContact } = await import("./actions");
    const state = await submitContact({ status: "idle" }, validFormData());

    expect(state.status).toBe("success");
  });

  it("returns field errors and never calls the email layer on invalid input", async () => {
    const sendContactEnquiry = vi.fn();
    vi.doMock("@/lib/email", () => ({ sendContactEnquiry }));

    const { submitContact } = await import("./actions");
    const state = await submitContact({ status: "idle" }, new FormData());

    expect(state.status).toBe("error");
    expect(state.errors?.name).toBeDefined();
    expect(sendContactEnquiry).not.toHaveBeenCalled();
  });
});
