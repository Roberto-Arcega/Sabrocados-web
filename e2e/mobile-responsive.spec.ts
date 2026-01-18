import { test, expect, devices } from "@playwright/test";

test.describe("Mobile Responsiveness - iPhone 12", () => {
  test.use({ ...devices["iPhone 12"] });

  test("page loads correctly on mobile", async ({ page }) => {
    await page.goto("/");

    // Logo should be visible
    await expect(page.getByAltText("Sabrocados")).toBeVisible();

    // Mobile menu button should be visible
    await expect(page.getByRole("button", { name: /toggle menu/i })).toBeVisible();
  });

  test("contact form is fully usable on mobile", async ({ page }) => {
    await page.goto("/");
    await page.locator("#formulario").scrollIntoViewIfNeeded();

    // Fill form
    await page.getByLabel(/nombre completo/i).fill("Test Mobile User");
    await page.getByLabel(/teléfono/i).fill("1234567890");

    // Form should be visible and interactable
    await expect(page.getByLabel(/nombre completo/i)).toHaveValue("Test Mobile User");
    await expect(page.getByLabel(/teléfono/i)).toHaveValue("1234567890");

    // Submit button should be visible
    await expect(page.getByRole("button", { name: /enviar por whatsapp/i })).toBeVisible();
  });

  test("FAQ section works on mobile", async ({ page }) => {
    await page.goto("/");
    await page.locator("#faq").scrollIntoViewIfNeeded();

    // Click on first FAQ
    const firstFaq = page.getByText(/es apto para dieta keto/i);
    await expect(firstFaq).toBeVisible();
    await firstFaq.click();

    // Answer should be visible
    await expect(page.getByText(/2g de carbohidratos/i)).toBeVisible();
  });

  test("testimonials display correctly on mobile", async ({ page }) => {
    await page.goto("/");

    // Testimonials section exists
    await expect(page.getByText(/lo que dicen nuestros clientes/i)).toBeVisible();

    // At least one testimonial card is visible
    await expect(page.getByText("Carlos M.")).toBeVisible();
  });

  test("mobile navigation works correctly", async ({ page }) => {
    await page.goto("/");

    // Open mobile menu
    await page.getByRole("button", { name: /toggle menu/i }).click();

    // Click on Contacto
    await page.getByRole("link", { name: /contacto/i }).last().click();

    // Should scroll to contact section
    await page.waitForTimeout(500);

    // Contact form should be in viewport
    await expect(page.locator("#contacto")).toBeInViewport();
  });
});

test.describe("Mobile Responsiveness - Pixel 5", () => {
  test.use({ ...devices["Pixel 5"] });

  test("page loads correctly on Android", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByAltText("Sabrocados")).toBeVisible();
    await expect(page.getByRole("button", { name: /toggle menu/i })).toBeVisible();
  });

  test("form inputs are properly sized for touch", async ({ page }) => {
    await page.goto("/");
    await page.locator("#formulario").scrollIntoViewIfNeeded();

    const nameInput = page.getByLabel(/nombre completo/i);
    const phoneInput = page.getByLabel(/teléfono/i);

    // Inputs should be visible
    await expect(nameInput).toBeVisible();
    await expect(phoneInput).toBeVisible();

    // Test interaction
    await nameInput.tap();
    await nameInput.fill("Android User");
    await expect(nameInput).toHaveValue("Android User");
  });
});

test.describe("Tablet Responsiveness - iPad", () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test("page displays correctly on tablet", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByAltText("Sabrocados")).toBeVisible();
  });

  test("form layout adapts to tablet width", async ({ page }) => {
    await page.goto("/");
    await page.locator("#formulario").scrollIntoViewIfNeeded();

    // Form should be visible with proper layout
    const formSection = page.locator("#formulario");
    await expect(formSection).toBeVisible();

    // Fields should be properly spaced
    await expect(page.getByLabel(/nombre completo/i)).toBeVisible();
    await expect(page.getByLabel(/teléfono/i)).toBeVisible();
  });
});

test.describe("Large Desktop", () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  test("page displays correctly on large screen", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByAltText("Sabrocados")).toBeVisible();

    // Desktop navigation should be visible
    const nav = page.getByRole("navigation");
    await expect(nav.getByRole("link", { name: /home/i })).toBeVisible();
  });

  test("content is properly centered on wide screens", async ({ page }) => {
    await page.goto("/");

    // Check that main content is centered
    const heading = page.getByRole("heading", { name: /contáctanos/i });
    await heading.scrollIntoViewIfNeeded();

    const box = await heading.boundingBox();
    expect(box).not.toBeNull();

    // Center should be roughly in the middle of the viewport
    const viewportWidth = 1920;
    const center = box!.x + box!.width / 2;
    expect(center).toBeGreaterThan(viewportWidth * 0.3);
    expect(center).toBeLessThan(viewportWidth * 0.7);
  });
});
