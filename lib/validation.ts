export const PHONE_REGEX = /^\d{10}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates a phone number (10 digits, spaces allowed)
 * @param phone - Phone number to validate
 * @returns Error message or null if valid
 */
export function validatePhone(phone: string): string | null {
  const cleaned = phone.replace(/\s/g, "");

  if (!cleaned) {
    return "El teléfono es requerido";
  }

  if (!PHONE_REGEX.test(cleaned)) {
    return "Ingresa un teléfono válido de 10 dígitos";
  }

  return null;
}

/**
 * Validates an email address (optional field)
 * @param email - Email to validate
 * @returns Error message or null if valid/empty
 */
export function validateEmail(email: string): string | null {
  if (!email) {
    return null; // Email is optional
  }

  if (!EMAIL_REGEX.test(email)) {
    return "Ingresa un email válido";
  }

  return null;
}

/**
 * Validates a required name field
 * @param name - Name to validate
 * @returns Error message or null if valid
 */
export function validateName(name: string): string | null {
  if (!name.trim()) {
    return "El nombre es requerido";
  }

  return null;
}
