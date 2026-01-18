import { describe, it, expect } from "vitest";
import {
  validatePhone,
  validateEmail,
  validateName,
  PHONE_REGEX,
  EMAIL_REGEX,
} from "@/lib/validation";

describe("PHONE_REGEX", () => {
  it("matches exactly 10 digits", () => {
    expect(PHONE_REGEX.test("1234567890")).toBe(true);
    expect(PHONE_REGEX.test("0000000000")).toBe(true);
  });

  it("does not match less than 10 digits", () => {
    expect(PHONE_REGEX.test("123456789")).toBe(false);
    expect(PHONE_REGEX.test("12345")).toBe(false);
  });

  it("does not match more than 10 digits", () => {
    expect(PHONE_REGEX.test("12345678901")).toBe(false);
    expect(PHONE_REGEX.test("123456789012345")).toBe(false);
  });

  it("does not match non-digit characters", () => {
    expect(PHONE_REGEX.test("123-456-7890")).toBe(false);
    expect(PHONE_REGEX.test("123 456 7890")).toBe(false);
    expect(PHONE_REGEX.test("(123)4567890")).toBe(false);
  });
});

describe("EMAIL_REGEX", () => {
  it("matches valid email addresses", () => {
    expect(EMAIL_REGEX.test("test@example.com")).toBe(true);
    expect(EMAIL_REGEX.test("user.name@domain.org")).toBe(true);
    expect(EMAIL_REGEX.test("test123@test.co.mx")).toBe(true);
  });

  it("does not match invalid email addresses", () => {
    expect(EMAIL_REGEX.test("invalid")).toBe(false);
    expect(EMAIL_REGEX.test("@domain.com")).toBe(false);
    expect(EMAIL_REGEX.test("test@")).toBe(false);
    expect(EMAIL_REGEX.test("test@domain")).toBe(false);
    expect(EMAIL_REGEX.test("test domain@test.com")).toBe(false);
  });
});

describe("validatePhone", () => {
  it("returns null for valid 10-digit phone", () => {
    expect(validatePhone("1234567890")).toBeNull();
  });

  it("returns null when spaces are included but digits are valid", () => {
    expect(validatePhone("123 456 7890")).toBeNull();
    expect(validatePhone("12 34 56 78 90")).toBeNull();
  });

  it('returns error for empty phone', () => {
    expect(validatePhone("")).toBe("El teléfono es requerido");
  });

  it("returns error for only spaces", () => {
    expect(validatePhone("   ")).toBe("El teléfono es requerido");
  });

  it("returns error for invalid phone format", () => {
    expect(validatePhone("12345")).toBe(
      "Ingresa un teléfono válido de 10 dígitos"
    );
    expect(validatePhone("12345678901")).toBe(
      "Ingresa un teléfono válido de 10 dígitos"
    );
    expect(validatePhone("abcdefghij")).toBe(
      "Ingresa un teléfono válido de 10 dígitos"
    );
  });
});

describe("validateEmail", () => {
  it("returns null for valid email", () => {
    expect(validateEmail("test@example.com")).toBeNull();
    expect(validateEmail("user.name@domain.org")).toBeNull();
  });

  it("returns null for empty email (optional field)", () => {
    expect(validateEmail("")).toBeNull();
  });

  it("returns error for invalid email format", () => {
    expect(validateEmail("invalid")).toBe("Ingresa un email válido");
    expect(validateEmail("test@")).toBe("Ingresa un email válido");
    expect(validateEmail("@domain.com")).toBe("Ingresa un email válido");
  });
});

describe("validateName", () => {
  it("returns null for valid name", () => {
    expect(validateName("Juan Pérez")).toBeNull();
    expect(validateName("María")).toBeNull();
    expect(validateName("A")).toBeNull();
  });

  it("returns error for empty name", () => {
    expect(validateName("")).toBe("El nombre es requerido");
  });

  it("returns error for whitespace-only name", () => {
    expect(validateName("   ")).toBe("El nombre es requerido");
    expect(validateName("\t")).toBe("El nombre es requerido");
  });
});
