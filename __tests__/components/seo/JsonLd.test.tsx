import { describe, it, expect } from "vitest";
import { render } from "@/test/test-utils";
import JsonLd from "@/app/components/seo/JsonLd";
import { getAllSchemas } from "@/lib/seo/structured-data";

describe("JsonLd", () => {
  it("renders script tags for each schema", () => {
    const { container } = render(<JsonLd />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    expect(scripts.length).toBe(getAllSchemas().length);
  });

  it("renders valid JSON in each script tag", () => {
    const { container } = render(<JsonLd />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    scripts.forEach((script) => {
      expect(() => JSON.parse(script.innerHTML)).not.toThrow();
    });
  });

  it("includes Organization schema", () => {
    const { container } = render(<JsonLd />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const hasOrganization = Array.from(scripts).some((script) => {
      const data = JSON.parse(script.innerHTML);
      return data["@type"] === "Organization";
    });

    expect(hasOrganization).toBe(true);
  });

  it("includes Product schema", () => {
    const { container } = render(<JsonLd />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const hasProduct = Array.from(scripts).some((script) => {
      const data = JSON.parse(script.innerHTML);
      return data["@type"] === "Product";
    });

    expect(hasProduct).toBe(true);
  });

  it("includes FAQPage schema", () => {
    const { container } = render(<JsonLd />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const hasFAQ = Array.from(scripts).some((script) => {
      const data = JSON.parse(script.innerHTML);
      return data["@type"] === "FAQPage";
    });

    expect(hasFAQ).toBe(true);
  });

  it("includes FoodEstablishment schema", () => {
    const { container } = render(<JsonLd />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const hasLocalBusiness = Array.from(scripts).some((script) => {
      const data = JSON.parse(script.innerHTML);
      return data["@type"] === "FoodEstablishment";
    });

    expect(hasLocalBusiness).toBe(true);
  });

  it("includes WebSite schema", () => {
    const { container } = render(<JsonLd />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const hasWebSite = Array.from(scripts).some((script) => {
      const data = JSON.parse(script.innerHTML);
      return data["@type"] === "WebSite";
    });

    expect(hasWebSite).toBe(true);
  });

  it("includes BreadcrumbList schema", () => {
    const { container } = render(<JsonLd />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const hasBreadcrumb = Array.from(scripts).some((script) => {
      const data = JSON.parse(script.innerHTML);
      return data["@type"] === "BreadcrumbList";
    });

    expect(hasBreadcrumb).toBe(true);
  });

  it("all schemas have schema.org context", () => {
    const { container } = render(<JsonLd />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    scripts.forEach((script) => {
      const data = JSON.parse(script.innerHTML);
      expect(data["@context"]).toBe("https://schema.org");
    });
  });

  it("Product schema contains correct brand name", () => {
    const { container } = render(<JsonLd />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const productScript = Array.from(scripts).find((script) => {
      const data = JSON.parse(script.innerHTML);
      return data["@type"] === "Product";
    });

    expect(productScript).toBeDefined();
    const productData = JSON.parse(productScript!.innerHTML);
    expect(productData.brand.name).toBe("Sabrocados");
  });

  it("Organization schema contains correct business info", () => {
    const { container } = render(<JsonLd />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    const orgScript = Array.from(scripts).find((script) => {
      const data = JSON.parse(script.innerHTML);
      return data["@type"] === "Organization";
    });

    expect(orgScript).toBeDefined();
    const orgData = JSON.parse(orgScript!.innerHTML);
    expect(orgData.name).toBe("Sabrocados");
    expect(orgData.url).toBe("https://sabrocados.com");
    expect(orgData.email).toBe("hola@sabrocados.com");
  });
});
