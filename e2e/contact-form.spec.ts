import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Scroll to form section
    await page.locator("#formulario").scrollIntoViewIfNeeded();
  });

  test("displays the contact form with all fields", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /contáctanos/i })).toBeVisible();
    await expect(page.getByLabel(/nombre completo/i)).toBeVisible();
    await expect(page.getByLabel(/teléfono/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/cómo nos conociste/i)).toBeVisible();
    await expect(page.getByLabel(/cantidad aproximada/i)).toBeVisible();
    await expect(page.getByLabel(/mensaje/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /enviar por whatsapp/i })).toBeVisible();
  });

  test("shows validation errors for empty required fields", async ({ page }) => {
    await page.getByRole("button", { name: /enviar por whatsapp/i }).click();

    await expect(page.getByText(/el nombre es requerido/i)).toBeVisible();
    await expect(page.getByText(/el teléfono es requerido/i)).toBeVisible();
  });

  test("shows validation error for invalid phone number", async ({ page }) => {
    await page.getByLabel(/nombre completo/i).fill("Juan Pérez");
    await page.getByLabel(/teléfono/i).fill("12345");
    await page.getByRole("button", { name: /enviar por whatsapp/i }).click();

    await expect(page.getByText(/teléfono válido de 10 dígitos/i)).toBeVisible();
  });

  test("shows validation error for invalid email format", async ({ page }) => {
    await page.getByLabel(/nombre completo/i).fill("Juan Pérez");
    await page.getByLabel(/teléfono/i).fill("1234567890");
    await page.getByLabel(/email/i).fill("invalid-email");
    await page.getByRole("button", { name: /enviar por whatsapp/i }).click();

    await expect(page.getByText(/ingresa un email válido/i)).toBeVisible();
  });

  test("clears validation error when user starts typing", async ({ page }) => {
    await page.getByRole("button", { name: /enviar por whatsapp/i }).click();
    await expect(page.getByText(/el nombre es requerido/i)).toBeVisible();

    await page.getByLabel(/nombre completo/i).fill("J");
    await expect(page.getByText(/el nombre es requerido/i)).not.toBeVisible();
  });

  test("opens WhatsApp with correct data on valid submission", async ({ page, context }) => {
    // Listen for new pages (WhatsApp will open in new tab)
    const pagePromise = context.waitForEvent("page");

    await page.getByLabel(/nombre completo/i).fill("Juan Pérez");
    await page.getByLabel(/teléfono/i).fill("1234567890");
    await page.getByLabel(/email/i).fill("juan@example.com");
    await page.getByLabel(/cómo nos conociste/i).selectOption("instagram");
    await page.getByLabel(/cantidad aproximada/i).fill("5 frascos");
    await page.getByLabel(/mensaje/i).fill("Quiero más información");

    await page.getByRole("button", { name: /enviar por whatsapp/i }).click();

    // Wait for loading state
    await expect(page.getByText(/enviando/i)).toBeVisible();

    // Get the new page (WhatsApp)
    const newPage = await pagePromise;
    const url = newPage.url();

    expect(url).toContain("wa.me/524775775959");
    expect(url).toContain(encodeURIComponent("Juan Pérez"));
    expect(url).toContain(encodeURIComponent("1234567890"));
    expect(url).toContain(encodeURIComponent("juan@example.com"));
    expect(url).toContain("Instagram");

    await newPage.close();
  });

  test("shows success state after submission", async ({ page, context }) => {
    // Ignore the new page that opens
    context.on("page", (newPage) => newPage.close());

    await page.getByLabel(/nombre completo/i).fill("María");
    await page.getByLabel(/teléfono/i).fill("9876543210");

    await page.getByRole("button", { name: /enviar por whatsapp/i }).click();

    await expect(page.getByText(/mensaje enviado/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/continúa la conversación en whatsapp/i)).toBeVisible();
  });

  test("resets form after success", async ({ page, context }) => {
    context.on("page", (newPage) => newPage.close());

    await page.getByLabel(/nombre completo/i).fill("Test User");
    await page.getByLabel(/teléfono/i).fill("1234567890");

    await page.getByRole("button", { name: /enviar por whatsapp/i }).click();

    await expect(page.getByText(/mensaje enviado/i)).toBeVisible({ timeout: 5000 });

    // Wait for form to reset (3 seconds + buffer)
    await page.waitForTimeout(4000);

    await expect(page.getByLabel(/nombre completo/i)).toHaveValue("");
    await expect(page.getByLabel(/teléfono/i)).toHaveValue("");
  });

  test("displays WhatsApp trust badge", async ({ page }) => {
    await expect(page.getByText(/respuesta rápida por whatsapp/i)).toBeVisible();
  });

  test("displays trust elements", async ({ page }) => {
    await expect(page.getByText("Respuesta rápida")).toBeVisible();
    await expect(page.getByText("Envíos nacionales")).toBeVisible();
    await expect(page.getByText("Pago seguro")).toBeVisible();
  });
});
