import { test, expect } from "@playwright/test";

test.describe("WhatsApp Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("contact form WhatsApp button opens correct URL", async ({ page, context }) => {
    const pagePromise = context.waitForEvent("page");

    await page.locator("#formulario").scrollIntoViewIfNeeded();

    await page.getByLabel(/nombre completo/i).fill("Test User");
    await page.getByLabel(/teléfono/i).fill("1234567890");

    await page.getByRole("button", { name: /enviar por whatsapp/i }).click();

    const newPage = await pagePromise;
    const url = newPage.url();

    // Verify WhatsApp URL format
    expect(url).toMatch(/^https:\/\/wa\.me\/524775775959\?text=/);
    expect(url).toContain(encodeURIComponent("Test User"));
    expect(url).toContain(encodeURIComponent("1234567890"));

    await newPage.close();
  });

  test("WhatsApp message includes all optional fields when provided", async ({
    page,
    context,
  }) => {
    const pagePromise = context.waitForEvent("page");

    await page.locator("#formulario").scrollIntoViewIfNeeded();

    await page.getByLabel(/nombre completo/i).fill("Full Test");
    await page.getByLabel(/teléfono/i).fill("9876543210");
    await page.getByLabel(/email/i).fill("full@test.com");
    await page.getByLabel(/cómo nos conociste/i).selectOption("facebook");
    await page.getByLabel(/cantidad aproximada/i).fill("10 unidades");
    await page.getByLabel(/mensaje/i).fill("Mensaje de prueba completo");

    await page.getByRole("button", { name: /enviar por whatsapp/i }).click();

    const newPage = await pagePromise;
    const url = decodeURIComponent(newPage.url());

    expect(url).toContain("Full Test");
    expect(url).toContain("9876543210");
    expect(url).toContain("full@test.com");
    expect(url).toContain("Facebook");
    expect(url).toContain("10 unidades");
    expect(url).toContain("Mensaje de prueba completo");

    await newPage.close();
  });

  test("WhatsApp message has correct structure", async ({ page, context }) => {
    const pagePromise = context.waitForEvent("page");

    await page.locator("#formulario").scrollIntoViewIfNeeded();

    await page.getByLabel(/nombre completo/i).fill("Structure Test");
    await page.getByLabel(/teléfono/i).fill("5555555555");

    await page.getByRole("button", { name: /enviar por whatsapp/i }).click();

    const newPage = await pagePromise;
    const url = decodeURIComponent(newPage.url());

    // Check message structure
    expect(url).toContain("¡Hola! Me gustaría ordenar Sabrocados.");
    expect(url).toContain("*Nombre:* Structure Test");
    expect(url).toContain("*Teléfono:* 5555555555");

    await newPage.close();
  });

  test("WhatsApp flow handles special characters in input", async ({
    page,
    context,
  }) => {
    const pagePromise = context.waitForEvent("page");

    await page.locator("#formulario").scrollIntoViewIfNeeded();

    // Use special characters
    await page.getByLabel(/nombre completo/i).fill("José García-López");
    await page.getByLabel(/teléfono/i).fill("1234567890");
    await page.getByLabel(/mensaje/i).fill("¿Cómo están? ¡Hola! #1 producto");

    await page.getByRole("button", { name: /enviar por whatsapp/i }).click();

    const newPage = await pagePromise;
    const url = newPage.url();

    // URL should be properly encoded
    expect(url).toContain(encodeURIComponent("José García-López"));
    expect(url).toContain(encodeURIComponent("¿Cómo están?"));
    expect(url).toContain(encodeURIComponent("¡Hola!"));

    await newPage.close();
  });

  test("different source options appear correctly in WhatsApp message", async ({
    page,
    context,
  }) => {
    const sources = [
      { value: "instagram", label: "Instagram" },
      { value: "facebook", label: "Facebook" },
      { value: "recomendacion", label: "Recomendación" },
      { value: "google", label: "Google" },
      { value: "otro", label: "Otro" },
    ];

    for (const source of sources) {
      const pagePromise = context.waitForEvent("page");

      await page.locator("#formulario").scrollIntoViewIfNeeded();

      // Clear and fill form
      await page.getByLabel(/nombre completo/i).fill("Source Test");
      await page.getByLabel(/teléfono/i).fill("1234567890");
      await page.getByLabel(/cómo nos conociste/i).selectOption(source.value);

      await page.getByRole("button", { name: /enviar por whatsapp/i }).click();

      const newPage = await pagePromise;
      const url = decodeURIComponent(newPage.url());

      expect(url).toContain(source.label);

      await newPage.close();

      // Wait for form reset before next iteration
      await page.waitForTimeout(4000);
    }
  });
});

test.describe("WhatsApp Number Verification", () => {
  test("uses the correct WhatsApp business number", async ({ page, context }) => {
    const pagePromise = context.waitForEvent("page");

    await page.goto("/");
    await page.locator("#formulario").scrollIntoViewIfNeeded();

    await page.getByLabel(/nombre completo/i).fill("Number Check");
    await page.getByLabel(/teléfono/i).fill("1234567890");

    await page.getByRole("button", { name: /enviar por whatsapp/i }).click();

    const newPage = await pagePromise;
    const url = newPage.url();

    // The WhatsApp number should be the Mexican format: 52 + 10 digits
    expect(url).toContain("wa.me/524775775959");

    await newPage.close();
  });
});
