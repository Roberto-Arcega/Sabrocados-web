import { test, expect } from "@playwright/test";

test.describe("Favicon - Files Accessibility", () => {
  test("favicon.ico is accessible", async ({ page }) => {
    const response = await page.goto("/favicon.ico");
    expect(response?.status()).toBe(200);
    expect(response?.headers()["content-type"]).toContain("image");
  });

  test("favicon.svg is accessible", async ({ page }) => {
    const response = await page.goto("/favicon.svg");
    expect(response?.status()).toBe(200);
    expect(response?.headers()["content-type"]).toContain("svg");
  });

  test("favicon-96x96.png is accessible", async ({ page }) => {
    const response = await page.goto("/favicon-96x96.png");
    expect(response?.status()).toBe(200);
    expect(response?.headers()["content-type"]).toContain("image/png");
  });

  test("apple-touch-icon is accessible", async ({ page }) => {
    const response = await page.goto("/apple-touch-icon.png");
    expect(response?.status()).toBe(200);
    expect(response?.headers()["content-type"]).toContain("image/png");
  });

  test("web-app-manifest-192x192.png is accessible", async ({ page }) => {
    const response = await page.goto("/web-app-manifest-192x192.png");
    expect(response?.status()).toBe(200);
    expect(response?.headers()["content-type"]).toContain("image/png");
  });

  test("web-app-manifest-512x512.png is accessible", async ({ page }) => {
    const response = await page.goto("/web-app-manifest-512x512.png");
    expect(response?.status()).toBe(200);
    expect(response?.headers()["content-type"]).toContain("image/png");
  });
});

test.describe("Favicon - HTML Link Tags", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has favicon.ico link tag", async ({ page }) => {
    // Next.js adds cache-busting query strings to favicon.ico
    const faviconLink = page.locator('link[rel="icon"][href*="favicon.ico"]');
    await expect(faviconLink).toBeAttached();
  });

  test("has SVG icon link tag", async ({ page }) => {
    const svgIconLink = page.locator(
      'link[rel="icon"][type="image/svg+xml"]'
    );
    await expect(svgIconLink).toBeAttached();
    const href = await svgIconLink.getAttribute("href");
    expect(href).toContain("favicon.svg");
  });

  test("has PNG icon link tag with correct size", async ({ page }) => {
    const pngIconLink = page.locator(
      'link[rel="icon"][type="image/png"][sizes="96x96"]'
    );
    await expect(pngIconLink).toBeAttached();
    const href = await pngIconLink.getAttribute("href");
    expect(href).toContain("favicon-96x96.png");
  });

  test("has apple-touch-icon link tag", async ({ page }) => {
    const appleIconLink = page.locator('link[rel="apple-touch-icon"]');
    await expect(appleIconLink).toBeAttached();
    const href = await appleIconLink.getAttribute("href");
    expect(href).toContain("apple-touch-icon");
  });

  test("has manifest link tag", async ({ page }) => {
    const manifestLink = page.locator('link[rel="manifest"]');
    await expect(manifestLink).toBeAttached();
    const href = await manifestLink.getAttribute("href");
    expect(href).toContain("manifest");
  });
});

test.describe("Favicon - Manifest Icons", () => {
  test("manifest contains PWA icons", async ({ request }) => {
    const response = await request.get("/manifest.webmanifest");
    expect(response.status()).toBe(200);
    const content = await response.json();

    expect(content.icons).toBeDefined();
    expect(content.icons.length).toBeGreaterThanOrEqual(2);
  });

  test("manifest has 192x192 icon", async ({ request }) => {
    const response = await request.get("/manifest.webmanifest");
    const content = await response.json();

    const icon192 = content.icons.find(
      (icon: { sizes: string }) => icon.sizes === "192x192"
    );
    expect(icon192).toBeDefined();
    expect(icon192.src).toContain("web-app-manifest-192x192.png");
    expect(icon192.type).toBe("image/png");
  });

  test("manifest has 512x512 icon", async ({ request }) => {
    const response = await request.get("/manifest.webmanifest");
    const content = await response.json();

    const icon512 = content.icons.find(
      (icon: { sizes: string }) => icon.sizes === "512x512"
    );
    expect(icon512).toBeDefined();
    expect(icon512.src).toContain("web-app-manifest-512x512.png");
    expect(icon512.type).toBe("image/png");
  });

  test("manifest icons have valid purposes", async ({ request }) => {
    const response = await request.get("/manifest.webmanifest");
    const content = await response.json();

    content.icons.forEach((icon: { purpose?: string }) => {
      if (icon.purpose) {
        expect(["any", "maskable", "monochrome"]).toContain(icon.purpose);
      }
    });
  });
});
