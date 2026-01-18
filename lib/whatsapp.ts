export const WHATSAPP_NUMBER = "524775775959";

export interface ContactFormData {
  nombre: string;
  telefono: string;
  email: string;
  comoNosConociste: string;
  cantidad: string;
  mensaje: string;
}

export const SOURCE_OPTIONS = [
  { value: "", label: "Selecciona una opción" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "recomendacion", label: "Recomendación" },
  { value: "google", label: "Google" },
  { value: "otro", label: "Otro" },
] as const;

/**
 * Generates a WhatsApp URL with the given message
 * @param message - Message to send
 * @returns Full WhatsApp URL
 */
export function generateWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a formatted WhatsApp message from form data
 * @param formData - Contact form data
 * @returns Formatted message string
 */
export function generateWhatsAppMessage(formData: ContactFormData): string {
  const sourceLabel = SOURCE_OPTIONS.find(
    (opt) => opt.value === formData.comoNosConociste
  )?.label;

  let message = `¡Hola! Me gustaría ordenar Sabrocados.\n\n`;
  message += `*Nombre:* ${formData.nombre}\n`;
  message += `*Teléfono:* ${formData.telefono}\n`;

  if (formData.email) {
    message += `*Email:* ${formData.email}\n`;
  }

  if (sourceLabel && formData.comoNosConociste) {
    message += `*¿Cómo nos conocí?:* ${sourceLabel}\n`;
  }

  if (formData.cantidad) {
    message += `*Cantidad:* ${formData.cantidad}\n`;
  }

  if (formData.mensaje) {
    message += `\n*Mensaje:*\n${formData.mensaje}`;
  }

  return message;
}
