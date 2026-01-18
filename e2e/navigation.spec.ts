import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("displays the logo", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header.getByRole("link", { name: "Sabrocados" })).toBeVisible();
  });

  test("displays all desktop navigation links", async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip();
    }

    const nav = page.getByRole("navigation");
    await expect(nav.getByRole("link", { name: /home/i })).toBeVisible();
    await expect(nav.getByRole("link", { name: /productos/i })).toBeVisible();
    await expect(nav.getByRole("link", { name: /nutrición/i })).toBeVisible();
    await expect(nav.getByRole("link", { name: /experiencias/i })).toBeVisible();
    await expect(nav.getByRole("link", { name: /contacto/i })).toBeVisible();
  });

  test("home link is marked as active", async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip();
    }

    const nav = page.getByRole("navigation");
    const homeLink = nav.getByRole("link", { name: /home/i });
    await expect(homeLink).toHaveClass(/text-emerald-400/);
  });

  test("scrolls to section when nav link is clicked", async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip();
    }

    const nav = page.getByRole("navigation");

    // Click on Contacto link
    await nav.getByRole("link", { name: /contacto/i }).click();

    // Wait for smooth scroll animation to complete
    await page.waitForTimeout(1000);

    // Check that the form section is in view
    const formSection = page.locator("#contacto");
    await expect(formSection).toBeInViewport({ timeout: 5000 });
  });

  test("logo links to home", async ({ page }) => {
    const header = page.getByRole("banner");
    const logoLink = header.getByRole("link", { name: "Sabrocados" });
    await expect(logoLink).toHaveAttribute("href", "#");
  });
});

test.describe("Mobile Navigation", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows mobile menu button", async ({ page }) => {
    await expect(page.getByRole("button", { name: /toggle menu/i })).toBeVisible();
  });

  test("hides desktop navigation on mobile", async ({ page }) => {
    // Desktop nav should have lg:flex and hidden class, so it's not visible
    const desktopNav = page.locator("nav.hidden.lg\\:flex");
    await expect(desktopNav).not.toBeVisible();
  });

  test("opens mobile menu when button is clicked", async ({ page }) => {
    await page.getByRole("button", { name: /toggle menu/i }).click();

    // Mobile menu should show links
    const mobileLinks = page.locator(".lg\\:hidden").getByRole("link");
    await expect(mobileLinks.first()).toBeVisible();
  });

  test("closes mobile menu when link is clicked", async ({ page }) => {
    // Open menu
    await page.getByRole("button", { name: /toggle menu/i }).click();

    // Click a link
    const mobileMenu = page.locator(".lg\\:hidden").last();
    await mobileMenu.getByRole("link", { name: /productos/i }).click();

    // Wait for animation
    await page.waitForTimeout(300);

    // Menu should be closed (max-h-0)
    await expect(mobileMenu).toHaveClass(/max-h-0/);
  });

  test("toggles hamburger icon animation on click", async ({ page }) => {
    const menuButton = page.getByRole("button", { name: /toggle menu/i });

    // Click to open
    await menuButton.click();

    // The hamburger lines should have transform classes
    const lines = menuButton.locator("span.block");
    await expect(lines.first()).toHaveClass(/rotate-45/);
    await expect(lines.nth(1)).toHaveClass(/opacity-0/);
    await expect(lines.last()).toHaveClass(/-rotate-45/);

    // Click to close
    await menuButton.click();

    await expect(lines.first()).not.toHaveClass(/rotate-45/);
    await expect(lines.nth(1)).not.toHaveClass(/opacity-0/);
    await expect(lines.last()).not.toHaveClass(/-rotate-45/);
  });
});
