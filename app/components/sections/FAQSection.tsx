"use client";

import { useState } from "react";
import SectionHeading from "../ui/SectionHeading";

const faqs = [
  {
    question: "¿Es apto para dieta keto?",
    answer:
      "¡Sí! Con solo 2g de carbohidratos por porción y alto contenido de proteína, Sabrocados es perfecto para quienes siguen una dieta cetogénica o baja en carbohidratos.",
  },
  {
    question: "¿Cuánto tiempo dura el producto?",
    answer:
      "Gracias a nuestro proceso de deshidratación artesanal, Sabrocados tiene una vida útil de 6 meses sin abrir. Una vez abierto, recomendamos consumirlo dentro de 2 semanas para disfrutar su mejor sabor.",
  },
  {
    question: "¿Cómo debo conservarlo?",
    answer:
      "Guárdalo en un lugar fresco y seco. No requiere refrigeración mientras esté sellado. Una vez abierto, puedes mantenerlo en su empaque original o en un contenedor hermético.",
  },
  {
    question: "¿Contiene alérgenos?",
    answer:
      "Sabrocados contiene soya (presente en las salsas). Está libre de gluten, lácteos y frutos secos. Si tienes alguna alergia específica, consulta nuestra lista completa de ingredientes.",
  },
  {
    question: "¿Hacen envíos a todo México?",
    answer:
      "¡Sí! Enviamos a toda la República Mexicana. Los envíos dentro de Guanajuato tardan 1-2 días hábiles. Para el resto del país, el tiempo de entrega es de 3-5 días hábiles.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          title="Preguntas Frecuentes"
          subtitle="Todo lo que necesitas saber sobre Sabrocados"
        />

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <span
                  className={`shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-white/5 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
