import { test, expect } from "@playwright/test";

test.describe("Mivida Digital marketing site", () => {
  test("home page loads with hero and CTAs", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /smarter digital solutions for serious businesses/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /get your free quote/i }).first(),
    ).toBeVisible();
  });

  test("primary navigation reaches every page", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });

    await nav.getByRole("link", { name: "Services" }).click();
    await expect(
      page.getByRole("heading", { level: 1, name: "Our Services" }),
    ).toBeVisible();

    await nav.getByRole("link", { name: "About" }).click();
    await expect(
      page.getByRole("heading", { level: 1, name: /about mivida digital/i }),
    ).toBeVisible();

    await nav.getByRole("link", { name: "Contact" }).click();
    await expect(
      page.getByRole("heading", { level: 1, name: /get in touch/i }),
    ).toBeVisible();
  });

  test("services page shows pricing and the bundle", async ({ page }) => {
    await page.goto("/services");
    await expect(page.getByText("£499 one-off").first()).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /the small business bundle/i }),
    ).toBeVisible();
    await expect(page.getByText("£548", { exact: true })).toBeVisible();
  });

  test("contact form validates required fields client-side round-trip", async ({
    page,
  }) => {
    await page.goto("/contact");
    // Submitting empty should surface field errors (server action re-render).
    await page.getByRole("button", { name: /send my enquiry/i }).click();
    await expect(page.getByText(/please tell us your name/i)).toBeVisible();
  });

  test("contact form submits successfully with valid data (mock send)", async ({
    page,
  }) => {
    await page.goto("/contact");
    await page.getByLabel(/your name/i).fill("Jordan Smith");
    await page.getByLabel(/your business name/i).fill("Smith Joinery");
    await page
      .getByLabel(/your business type/i)
      .selectOption("Trade / Local Service");
    await page.getByLabel(/your phone number/i).fill("07424158513");
    await page.getByLabel(/your email address/i).fill("jordan@example.co.uk");
    await page.getByLabel(/what are you looking for/i).selectOption("A new website");
    await page.getByRole("button", { name: /send my enquiry/i }).click();

    await expect(
      page.getByRole("heading", { name: /message sent/i }),
    ).toBeVisible();
  });

  test("no secret tokens leak into the page source", async ({ page }) => {
    const response = await page.goto("/contact");
    const body = (await response?.text()) ?? "";
    expect(body).not.toContain("RESEND_API_KEY");
    expect(body.toLowerCase()).not.toContain("re_"); // resend key prefix
  });

  test("unknown routes render the 404 page", async ({ page }) => {
    const res = await page.goto("/does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByText("404")).toBeVisible();
  });
});
