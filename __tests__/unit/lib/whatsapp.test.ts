import { describe, it, expect } from "vitest";
import {
  WHATSAPP_NUMBER,
  SOURCE_OPTIONS,
  generateWhatsAppUrl,
  generateWhatsAppMessage,
  ContactFormData,
} from "@/lib/whatsapp";

describe("WHATSAPP_NUMBER", () => {
  it("is the correct Mexican phone number format", () => {
    expect(WHATSAPP_NUMBER).toBe("524775775959");
    expect(WHATSAPP_NUMBER).toMatch(/^52\d{10}$/);
  });
});

describe("SOURCE_OPTIONS", () => {
  it("has the default empty option first", () => {
    expect(SOURCE_OPTIONS[0].value).toBe("");
    expect(SOURCE_OPTIONS[0].label).toBe("Selecciona una opción");
  });

  it("includes all expected source options", () => {
    const values = SOURCE_OPTIONS.map((opt) => opt.value);
    expect(values).toContain("instagram");
    expect(values).toContain("facebook");
    expect(values).toContain("recomendacion");
    expect(values).toContain("google");
    expect(values).toContain("otro");
  });

  it("has 6 options total", () => {
    expect(SOURCE_OPTIONS.length).toBe(6);
  });
});

describe("generateWhatsAppUrl", () => {
  it("generates correct wa.me URL with encoded message", () => {
    const message = "Hola mundo";
    const url = generateWhatsAppUrl(message);

    expect(url).toBe(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    );
  });

  it("properly encodes special characters", () => {
    const message = "Hola! ¿Cómo estás? *Bold* texto";
    const url = generateWhatsAppUrl(message);

    expect(url).toContain(encodeURIComponent("!"));
    expect(url).toContain(encodeURIComponent("¿"));
    expect(url).toContain(encodeURIComponent("*"));
  });

  it("properly encodes newlines", () => {
    const message = "Línea 1\nLínea 2";
    const url = generateWhatsAppUrl(message);

    expect(url).toContain(encodeURIComponent("\n"));
  });

  it("uses the correct WhatsApp number", () => {
    const url = generateWhatsAppUrl("test");

    expect(url).toContain(`wa.me/${WHATSAPP_NUMBER}`);
  });
});

describe("generateWhatsAppMessage", () => {
  const baseFormData: ContactFormData = {
    nombre: "Juan Pérez",
    telefono: "1234567890",
    email: "",
    comoNosConociste: "",
    cantidad: "",
    mensaje: "",
  };

  it("includes the greeting and required fields", () => {
    const message = generateWhatsAppMessage(baseFormData);

    expect(message).toContain("¡Hola! Me gustaría ordenar Sabrocados.");
    expect(message).toContain("*Nombre:* Juan Pérez");
    expect(message).toContain("*Teléfono:* 1234567890");
  });

  it("includes email when provided", () => {
    const formData: ContactFormData = {
      ...baseFormData,
      email: "juan@example.com",
    };
    const message = generateWhatsAppMessage(formData);

    expect(message).toContain("*Email:* juan@example.com");
  });

  it("does not include email when empty", () => {
    const message = generateWhatsAppMessage(baseFormData);

    expect(message).not.toContain("*Email:*");
  });

  it("includes source option label when selected", () => {
    const formData: ContactFormData = {
      ...baseFormData,
      comoNosConociste: "instagram",
    };
    const message = generateWhatsAppMessage(formData);

    expect(message).toContain("*¿Cómo nos conocí?:* Instagram");
  });

  it("does not include source when not selected", () => {
    const message = generateWhatsAppMessage(baseFormData);

    expect(message).not.toContain("¿Cómo nos conocí?");
  });

  it("includes quantity when provided", () => {
    const formData: ContactFormData = {
      ...baseFormData,
      cantidad: "5 frascos",
    };
    const message = generateWhatsAppMessage(formData);

    expect(message).toContain("*Cantidad:* 5 frascos");
  });

  it("includes custom message when provided", () => {
    const formData: ContactFormData = {
      ...baseFormData,
      mensaje: "Quiero saber más sobre los ingredientes",
    };
    const message = generateWhatsAppMessage(formData);

    expect(message).toContain("*Mensaje:*");
    expect(message).toContain("Quiero saber más sobre los ingredientes");
  });

  it("generates complete message with all fields filled", () => {
    const formData: ContactFormData = {
      nombre: "María García",
      telefono: "9876543210",
      email: "maria@test.com",
      comoNosConociste: "recomendacion",
      cantidad: "10 unidades",
      mensaje: "Me lo recomendó mi amiga.",
    };
    const message = generateWhatsAppMessage(formData);

    expect(message).toContain("*Nombre:* María García");
    expect(message).toContain("*Teléfono:* 9876543210");
    expect(message).toContain("*Email:* maria@test.com");
    expect(message).toContain("*¿Cómo nos conocí?:* Recomendación");
    expect(message).toContain("*Cantidad:* 10 unidades");
    expect(message).toContain("Me lo recomendó mi amiga.");
  });
});
