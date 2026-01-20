import { test, expect } from "@playwright/test";

test.describe("SEO - Meta Tags", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has correct page title", async ({ page }) => {
    const title = await page.title();
    expect(title).toContain("Sabrocados");
    expect(title).toContain("Carne Seca");
    expect(title).not.toContain("Crypto");
  });

  test("has correct meta description", async ({ page }) => {
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description).toContain("cerdo deshidratado");
    expect(description).toContain("proteína");
    expect(description).not.toContain("cryptocurrency");
  });

  test("has correct language attribute", async ({ page }) => {
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("es-MX");
  });

  test("has keywords meta tag", async ({ page }) => {
    const keywords = await page
      .locator('meta[name="keywords"]')
      .getAttribute("content");
    expect(keywords).toContain("carne seca");
    expect(keywords).toContain("keto");
  });
});

test.describe("SEO - OpenGraph Tags", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has og:type tag", async ({ page }) => {
    const ogType = await page
      .locator('meta[property="og:type"]')
      .getAttribute("content");
    expect(ogType).toBe("website");
  });

  test("has og:locale tag for Mexican Spanish", async ({ page }) => {
    const ogLocale = await page
      .locator('meta[property="og:locale"]')
      .getAttribute("content");
    expect(ogLocale).toBe("es_MX");
  });

  test("has og:title tag", async ({ page }) => {
    const ogTitle = await page
      .locator('meta[property="og:title"]')
      .getAttribute("content");
    expect(ogTitle).toContain("Sabrocados");
    expect(ogTitle).not.toContain("Crypto");
  });

  test("has og:description tag", async ({ page }) => {
    const ogDescription = await page
      .locator('meta[property="og:description"]')
      .getAttribute("content");
    expect(ogDescription).toBeTruthy();
    expect(ogDescription).toContain("cerdo");
  });

  test("has og:url tag", async ({ page }) => {
    const ogUrl = await page
      .locator('meta[property="og:url"]')
      .getAttribute("content");
    expect(ogUrl).toContain("sabrocados.com");
  });

  test("has og:site_name tag", async ({ page }) => {
    const ogSiteName = await page
      .locator('meta[property="og:site_name"]')
      .getAttribute("content");
    expect(ogSiteName).toBe("Sabrocados");
  });

  test("has og:image tag", async ({ page }) => {
    const ogImage = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    expect(ogImage).toBeTruthy();
    expect(ogImage).toContain("og-image");
  });
});

test.describe("SEO - Twitter Card Tags", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has twitter:card tag", async ({ page }) => {
    const twitterCard = await page
      .locator('meta[name="twitter:card"]')
      .getAttribute("content");
    expect(twitterCard).toBe("summary_large_image");
  });

  test("has twitter:title tag", async ({ page }) => {
    const twitterTitle = await page
      .locator('meta[name="twitter:title"]')
      .getAttribute("content");
    expect(twitterTitle).toContain("Sabrocados");
  });

  test("has twitter:description tag", async ({ page }) => {
    const twitterDescription = await page
      .locator('meta[name="twitter:description"]')
      .getAttribute("content");
    expect(twitterDescription).toBeTruthy();
  });

  test("has twitter:creator tag", async ({ page }) => {
    const twitterCreator = await page
      .locator('meta[name="twitter:creator"]')
      .getAttribute("content");
    expect(twitterCreator).toBe("@sabrocados");
  });
});

test.describe("SEO - JSON-LD Structured Data", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has JSON-LD script tags", async ({ page }) => {
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonLdScripts.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test("JSON-LD contains Organization schema", async ({ page }) => {
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .allInnerTexts();
    const hasOrganization = scripts.some((script) => {
      const data = JSON.parse(script);
      return data["@type"] === "Organization";
    });
    expect(hasOrganization).toBe(true);
  });

  test("JSON-LD contains Product schema", async ({ page }) => {
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .allInnerTexts();
    const hasProduct = scripts.some((script) => {
      const data = JSON.parse(script);
      return data["@type"] === "Product";
    });
    expect(hasProduct).toBe(true);
  });

  test("JSON-LD contains FAQPage schema", async ({ page }) => {
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .allInnerTexts();
    const hasFAQ = scripts.some((script) => {
      const data = JSON.parse(script);
      return data["@type"] === "FAQPage";
    });
    expect(hasFAQ).toBe(true);
  });

  test("JSON-LD contains FoodEstablishment schema", async ({ page }) => {
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .allInnerTexts();
    const hasLocalBusiness = scripts.some((script) => {
      const data = JSON.parse(script);
      return data["@type"] === "FoodEstablishment";
    });
    expect(hasLocalBusiness).toBe(true);
  });

  test("JSON-LD Product has correct brand", async ({ page }) => {
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .allInnerTexts();
    const productScript = scripts.find((script) => {
      const data = JSON.parse(script);
      return data["@type"] === "Product";
    });
    expect(productScript).toBeDefined();
    const product = JSON.parse(productScript!);
    expect(product.brand.name).toBe("Sabrocados");
  });

  test("JSON-LD schemas have valid context", async ({ page }) => {
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .allInnerTexts();
    scripts.forEach((script) => {
      const data = JSON.parse(script);
      expect(data["@context"]).toBe("https://schema.org");
    });
  });
});

test.describe("SEO - robots.txt", () => {
  test("robots.txt is accessible", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    expect(response?.status()).toBe(200);
  });

  test("robots.txt allows all user agents", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    const content = await response?.text();
    expect(content).toContain("User-Agent: *");
    expect(content).toContain("Allow: /");
  });

  test("robots.txt includes sitemap reference", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    const content = await response?.text();
    expect(content).toContain("Sitemap:");
    expect(content).toContain("sitemap.xml");
  });
});

test.describe("SEO - sitemap.xml", () => {
  test("sitemap.xml is accessible", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBe(200);
  });

  test("sitemap.xml has valid XML format", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    const content = await response?.text();
    expect(content).toContain('<?xml');
    expect(content).toContain("<urlset");
    expect(content).toContain("<url>");
    expect(content).toContain("<loc>");
  });

  test("sitemap.xml includes main URL", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    const content = await response?.text();
    expect(content).toContain("sabrocados.com");
  });
});

test.describe("SEO - Manifest", () => {
  test("manifest is accessible", async ({ request }) => {
    const response = await request.get("/manifest.webmanifest");
    expect(response.status()).toBe(200);
  });

  test("manifest has correct app name", async ({ request }) => {
    const response = await request.get("/manifest.webmanifest");
    const content = await response.json();
    expect(content.name).toContain("Sabrocados");
    expect(content.short_name).toBe("Sabrocados");
  });

  test("manifest has correct theme color", async ({ request }) => {
    const response = await request.get("/manifest.webmanifest");
    const content = await response.json();
    expect(content.theme_color).toBe("#10b981");
  });

  test("manifest includes icons", async ({ request }) => {
    const response = await request.get("/manifest.webmanifest");
    const content = await response.json();
    expect(content.icons).toBeDefined();
    expect(content.icons.length).toBeGreaterThan(0);
  });
});

test.describe("SEO - Heading Hierarchy", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has exactly one h1 element", async ({ page }) => {
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);
  });

  test("h1 contains relevant keywords", async ({ page }) => {
    const h1Text = await page.locator("h1").textContent();
    expect(h1Text?.toLowerCase()).toMatch(/sabrocados|carne|snack/);
  });

  test("has h2 elements for sections", async ({ page }) => {
    const h2Count = await page.locator("h2").count();
    expect(h2Count).toBeGreaterThanOrEqual(3);
  });
});

test.describe("SEO - Images", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("all images have alt attributes", async ({ page }) => {
    const images = page.locator("img");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect(alt).toBeTruthy();
    }
  });

  test("logo image has descriptive alt text", async ({ page }) => {
    const logoImg = page.locator('img[alt*="Sabrocados"]').first();
    const alt = await logoImg.getAttribute("alt");
    expect(alt).toContain("Sabrocados");
  });
});

test.describe("SEO - No Crypto References", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page title does not mention crypto", async ({ page }) => {
    const title = await page.title();
    expect(title.toLowerCase()).not.toContain("crypto");
    expect(title.toLowerCase()).not.toContain("cryptocurrency");
    expect(title.toLowerCase()).not.toContain("blockchain");
  });

  test("meta description does not mention crypto", async ({ page }) => {
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description?.toLowerCase()).not.toContain("crypto");
    expect(description?.toLowerCase()).not.toContain("cryptocurrency");
  });

  test("visible text does not mention crypto", async ({ page }) => {
    const bodyText = await page.locator("body").textContent();
    expect(bodyText?.toLowerCase()).not.toContain("cryptocurrency");
    expect(bodyText?.toLowerCase()).not.toContain("blockchain");
    expect(bodyText?.toLowerCase()).not.toContain("portfolio tracking");
  });
});
