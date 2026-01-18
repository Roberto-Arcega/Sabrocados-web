"use client";

import { useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import { validateName, validatePhone, validateEmail } from "@/lib/validation";
import {
  ContactFormData,
  SOURCE_OPTIONS,
  generateWhatsAppUrl,
  generateWhatsAppMessage,
} from "@/lib/whatsapp";

type FormState = "idle" | "submitting" | "success";

const initialFormData: ContactFormData = {
  nombre: "",
  telefono: "",
  email: "",
  comoNosConociste: "",
  cantidad: "",
  mensaje: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    const nombreError = validateName(formData.nombre);
    if (nombreError) {
      newErrors.nombre = nombreError;
    }

    const telefonoError = validatePhone(formData.telefono);
    if (telefonoError) {
      newErrors.telefono = telefonoError;
    }

    const emailError = validateEmail(formData.email);
    if (emailError) {
      newErrors.email = emailError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormState("submitting");

    const message = generateWhatsAppMessage(formData);
    const whatsappUrl = generateWhatsAppUrl(message);

    // Small delay for UX
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setFormState("success");

      // Reset form after success
      setTimeout(() => {
        setFormData(initialFormData);
        setFormState("idle");
      }, 3000);
    }, 500);
  };

  const inputClasses =
    "w-full rounded-xl bg-surface-light px-4 py-3 text-white placeholder:text-text-muted border border-transparent transition-all duration-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 hover:border-white/20";
  const labelClasses = "block text-sm font-medium text-white mb-2";
  const errorClasses = "text-danger text-sm mt-1";

  return (
    <section id="contacto" className="section-padding px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          title="Contáctanos"
          subtitle="Déjanos tus datos y te responderemos por WhatsApp"
        />

        {/* Trust badge */}
        <div className="flex justify-center mt-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/10 px-4 py-2 text-sm font-medium text-[#25D366] border border-[#25D366]/20">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Respuesta rápida por WhatsApp
          </span>
        </div>

        {/* Form card */}
        <div className="mt-8 glass rounded-2xl p-6 sm:p-8">
          {formState === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-scale-in">
              <div className="h-16 w-16 rounded-full bg-[#25D366]/20 flex items-center justify-center mb-4">
                <svg
                  className="h-8 w-8 text-[#25D366]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                ¡Mensaje enviado!
              </h3>
              <p className="text-text-secondary">
                Continúa la conversación en WhatsApp
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Nombre y Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombre" className={labelClasses}>
                    Nombre completo <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className={inputClasses}
                  />
                  {errors.nombre && (
                    <p className={errorClasses}>{errors.nombre}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="telefono" className={labelClasses}>
                    Teléfono <span className="text-primary">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="10 dígitos"
                    className={inputClasses}
                  />
                  {errors.telefono && (
                    <p className={errorClasses}>{errors.telefono}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Email y Cómo nos conociste */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className={inputClasses}
                  />
                  {errors.email && (
                    <p className={errorClasses}>{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="comoNosConociste" className={labelClasses}>
                    ¿Cómo nos conociste?
                  </label>
                  <select
                    id="comoNosConociste"
                    name="comoNosConociste"
                    value={formData.comoNosConociste}
                    onChange={handleChange}
                    className={inputClasses}
                  >
                    {SOURCE_OPTIONS.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-surface-light"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Cantidad */}
              <div>
                <label htmlFor="cantidad" className={labelClasses}>
                  Cantidad aproximada
                </label>
                <input
                  type="text"
                  id="cantidad"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleChange}
                  placeholder="Ej: 5 frascos, 1 caja"
                  className={inputClasses}
                />
              </div>

              {/* Row 4: Mensaje */}
              <div>
                <label htmlFor="mensaje" className={labelClasses}>
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="¿Tienes alguna pregunta o comentario adicional?"
                  rows={4}
                  className={inputClasses + " resize-none"}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={formState === "submitting"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold text-lg transition-all duration-300 hover:bg-[#20BD5A] hover:scale-105 hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {formState === "submitting" ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Enviar por WhatsApp
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Trust elements */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 rounded-xl bg-surface/50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <svg
                className="h-5 w-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Respuesta rápida</p>
              <p className="text-xs text-text-muted">En menos de 1 hora</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-surface/50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <svg
                className="h-5 w-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Envíos nacionales</p>
              <p className="text-xs text-text-muted">A toda la República</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-surface/50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <svg
                className="h-5 w-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Pago seguro</p>
              <p className="text-xs text-text-muted">Transferencia o efectivo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
