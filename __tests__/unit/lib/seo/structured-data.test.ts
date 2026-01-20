import { describe, it, expect } from "vitest";
import {
  BUSINESS_INFO,
  PRODUCT_INFO,
  FAQ_DATA,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateProductSchema,
  generateFAQSchema,
  generateWebSiteSchema,
  generateBreadcrumbSchema,
  getAllSchemas,
} from "@/lib/seo/structured-data";

describe("BUSINESS_INFO constants", () => {
  it("has correct business name", () => {
    expect(BUSINESS_INFO.name).toBe("Sabrocados");
  });

  it("has valid URL", () => {
    expect(BUSINESS_INFO.url).toBe("https://sabrocados.com");
  });

  it("has valid phone format", () => {
    expect(BUSINESS_INFO.phone).toMatch(/^\+52\s\d{3}\s\d{3}\s\d{4}$/);
  });

  it("has valid email format", () => {
    expect(BUSINESS_INFO.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("has Mexican address", () => {
    expect(BUSINESS_INFO.address.addressCountry).toBe("MX");
    expect(BUSINESS_INFO.address.addressRegion).toBe("Guanajuato");
    expect(BUSINESS_INFO.address.addressLocality).toBe("León");
  });

  it("has valid geo coordinates for León, GTO", () => {
    expect(BUSINESS_INFO.geo.latitude).toBeGreaterThan(20);
    expect(BUSINESS_INFO.geo.latitude).toBeLessThan(22);
    expect(BUSINESS_INFO.geo.longitude).toBeGreaterThan(-103);
    expect(BUSINESS_INFO.geo.longitude).toBeLessThan(-100);
  });
});

describe("PRODUCT_INFO constants", () => {
  it("has correct product name", () => {
    expect(PRODUCT_INFO.name).toContain("Sabrocados");
    expect(PRODUCT_INFO.name).toContain("Cerdo");
  });

  it("has valid SKU", () => {
    expect(PRODUCT_INFO.sku).toBe("SABRO-001");
  });

  it("has correct currency", () => {
    expect(PRODUCT_INFO.currency).toBe("MXN");
  });

  it("has positive price", () => {
    expect(PRODUCT_INFO.price).toBeGreaterThan(0);
  });

  it("has valid nutrition information", () => {
    expect(PRODUCT_INFO.nutrition.calories).toContain("kcal");
    expect(PRODUCT_INFO.nutrition.proteinContent).toContain("g");
    expect(PRODUCT_INFO.nutrition.carbohydrateContent).toContain("g");
  });

  it("is keto-friendly (low carbs)", () => {
    const carbs = parseFloat(PRODUCT_INFO.nutrition.carbohydrateContent);
    expect(carbs).toBeLessThanOrEqual(5);
  });

  it("has valid rating range", () => {
    expect(PRODUCT_INFO.rating.ratingValue).toBeGreaterThanOrEqual(1);
    expect(PRODUCT_INFO.rating.ratingValue).toBeLessThanOrEqual(5);
    expect(PRODUCT_INFO.rating.reviewCount).toBeGreaterThan(0);
  });
});

describe("FAQ_DATA constants", () => {
  it("has at least 5 FAQ items", () => {
    expect(FAQ_DATA.length).toBeGreaterThanOrEqual(5);
  });

  it("each FAQ has question and answer", () => {
    FAQ_DATA.forEach((faq) => {
      expect(faq.question).toBeTruthy();
      expect(faq.question.endsWith("?")).toBe(true);
      expect(faq.answer).toBeTruthy();
      expect(faq.answer.length).toBeGreaterThan(20);
    });
  });

  it("includes keto question", () => {
    const ketoQuestion = FAQ_DATA.find((faq) =>
      faq.question.toLowerCase().includes("keto")
    );
    expect(ketoQuestion).toBeDefined();
  });

  it("includes shipping question", () => {
    const shippingQuestion = FAQ_DATA.find(
      (faq) =>
        faq.question.toLowerCase().includes("envío") ||
        faq.question.toLowerCase().includes("envíos")
    );
    expect(shippingQuestion).toBeDefined();
  });
});

describe("generateOrganizationSchema", () => {
  it("returns valid Organization schema", () => {
    const schema = generateOrganizationSchema();

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("Organization");
    expect(schema.name).toBe(BUSINESS_INFO.name);
    expect(schema.url).toBe(BUSINESS_INFO.url);
    expect(schema.logo).toBe(BUSINESS_INFO.logo);
  });

  it("includes contact information", () => {
    const schema = generateOrganizationSchema();

    expect(schema.email).toBe(BUSINESS_INFO.email);
    expect(schema.telephone).toBe(BUSINESS_INFO.phone);
  });

  it("includes address object", () => {
    const schema = generateOrganizationSchema();

    expect(schema.address["@type"]).toBe("PostalAddress");
    expect(schema.address.addressCountry).toBe("MX");
  });

  it("includes social profiles", () => {
    const schema = generateOrganizationSchema();

    expect(Array.isArray(schema.sameAs)).toBe(true);
    expect(schema.sameAs.length).toBeGreaterThan(0);
  });
});

describe("generateLocalBusinessSchema", () => {
  it("returns valid FoodEstablishment schema", () => {
    const schema = generateLocalBusinessSchema();

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("FoodEstablishment");
    expect(schema["@id"]).toContain("#localbusiness");
  });

  it("includes geo coordinates", () => {
    const schema = generateLocalBusinessSchema();

    expect(schema.geo["@type"]).toBe("GeoCoordinates");
    expect(schema.geo.latitude).toBe(BUSINESS_INFO.geo.latitude);
    expect(schema.geo.longitude).toBe(BUSINESS_INFO.geo.longitude);
  });

  it("includes opening hours", () => {
    const schema = generateLocalBusinessSchema();

    expect(schema.openingHours).toBeTruthy();
  });

  it("specifies cuisine type", () => {
    const schema = generateLocalBusinessSchema();

    expect(schema.servesCuisine).toBeTruthy();
  });
});

describe("generateProductSchema", () => {
  it("returns valid Product schema", () => {
    const schema = generateProductSchema();

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("Product");
    expect(schema["@id"]).toContain("#product");
  });

  it("includes brand information", () => {
    const schema = generateProductSchema();

    expect(schema.brand["@type"]).toBe("Brand");
    expect(schema.brand.name).toBe(PRODUCT_INFO.brand);
  });

  it("includes offer with price", () => {
    const schema = generateProductSchema();

    expect(schema.offers["@type"]).toBe("Offer");
    expect(schema.offers.price).toBe(PRODUCT_INFO.price);
    expect(schema.offers.priceCurrency).toBe("MXN");
    expect(schema.offers.availability).toContain("schema.org");
  });

  it("includes aggregate rating", () => {
    const schema = generateProductSchema();

    expect(schema.aggregateRating["@type"]).toBe("AggregateRating");
    expect(schema.aggregateRating.ratingValue).toBe(
      PRODUCT_INFO.rating.ratingValue
    );
    expect(schema.aggregateRating.bestRating).toBe(5);
    expect(schema.aggregateRating.worstRating).toBe(1);
  });

  it("includes nutrition information", () => {
    const schema = generateProductSchema();

    expect(schema.nutrition["@type"]).toBe("NutritionInformation");
    expect(schema.nutrition.servingSize).toBe(PRODUCT_INFO.servingSize);
    expect(schema.nutrition.calories).toBeTruthy();
    expect(schema.nutrition.proteinContent).toBeTruthy();
  });
});

describe("generateFAQSchema", () => {
  it("returns valid FAQPage schema", () => {
    const schema = generateFAQSchema();

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("FAQPage");
  });

  it("includes all FAQ items", () => {
    const schema = generateFAQSchema();

    expect(schema.mainEntity.length).toBe(FAQ_DATA.length);
  });

  it("formats each question correctly", () => {
    const schema = generateFAQSchema();

    schema.mainEntity.forEach((item: { "@type": string; name: string; acceptedAnswer: { "@type": string; text: string } }, index: number) => {
      expect(item["@type"]).toBe("Question");
      expect(item.name).toBe(FAQ_DATA[index].question);
      expect(item.acceptedAnswer["@type"]).toBe("Answer");
      expect(item.acceptedAnswer.text).toBe(FAQ_DATA[index].answer);
    });
  });
});

describe("generateWebSiteSchema", () => {
  it("returns valid WebSite schema", () => {
    const schema = generateWebSiteSchema();

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("WebSite");
    expect(schema["@id"]).toContain("#website");
  });

  it("specifies language", () => {
    const schema = generateWebSiteSchema();

    expect(schema.inLanguage).toBe("es-MX");
  });

  it("includes publisher", () => {
    const schema = generateWebSiteSchema();

    expect(schema.publisher["@type"]).toBe("Organization");
    expect(schema.publisher.name).toBe(BUSINESS_INFO.name);
  });
});

describe("generateBreadcrumbSchema", () => {
  it("returns valid BreadcrumbList schema", () => {
    const schema = generateBreadcrumbSchema();

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("BreadcrumbList");
  });

  it("has items in correct order", () => {
    const schema = generateBreadcrumbSchema();

    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[0].name).toBe("Inicio");

    schema.itemListElement.forEach((item: { "@type": string; position: number; name: string; item: string }, index: number) => {
      expect(item["@type"]).toBe("ListItem");
      expect(item.position).toBe(index + 1);
      expect(item.name).toBeTruthy();
      expect(item.item).toContain(BUSINESS_INFO.url);
    });
  });

  it("includes main sections", () => {
    const schema = generateBreadcrumbSchema();
    const names = schema.itemListElement.map((item: { name: string }) => item.name);

    expect(names).toContain("Inicio");
    expect(names).toContain("Productos");
    expect(names).toContain("Contacto");
  });
});

describe("getAllSchemas", () => {
  it("returns array of all schemas", () => {
    const schemas = getAllSchemas();

    expect(Array.isArray(schemas)).toBe(true);
    expect(schemas.length).toBe(6);
  });

  it("includes all schema types", () => {
    const schemas = getAllSchemas();
    const types = schemas.map((s) => s["@type"]);

    expect(types).toContain("Organization");
    expect(types).toContain("FoodEstablishment");
    expect(types).toContain("Product");
    expect(types).toContain("FAQPage");
    expect(types).toContain("WebSite");
    expect(types).toContain("BreadcrumbList");
  });

  it("all schemas have valid context", () => {
    const schemas = getAllSchemas();

    schemas.forEach((schema) => {
      expect(schema["@context"]).toBe("https://schema.org");
    });
  });

  it("all schemas can be serialized to JSON", () => {
    const schemas = getAllSchemas();

    schemas.forEach((schema) => {
      expect(() => JSON.stringify(schema)).not.toThrow();
    });
  });
});
