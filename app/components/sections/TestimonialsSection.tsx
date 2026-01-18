import SectionHeading from "../ui/SectionHeading";

const testimonials = [
  {
    name: "Carlos M.",
    location: "León, GTO",
    text: "Lo probé en una reunión y desde entonces no puede faltar. El sabor de las tres salsas es adictivo.",
    rating: 5,
  },
  {
    name: "Ana García",
    location: "CDMX",
    text: "Perfecto para mis viajes por carretera. Alta proteína y no necesita refrigeración. ¡Ideal!",
    rating: 5,
  },
  {
    name: "Roberto S.",
    location: "Querétaro",
    text: "Mi snack favorito para después del gym. Rica en proteína y el sabor es único.",
    rating: 5,
  },
  {
    name: "María López",
    location: "Guadalajara",
    text: "El toque de limón con la triple salsa negra es una combinación perfecta. Muy recomendado.",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-amber-400" : "text-white/20"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="section-padding px-6 bg-surface/30">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Lo Que Dicen Nuestros Clientes"
          subtitle="Historias reales de personas que ya disfrutan Sabrocados"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="glass rounded-2xl p-6 transition-all duration-300 hover:bg-white/5 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Avatar */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-text-muted">{testimonial.location}</p>
                </div>
              </div>

              {/* Rating */}
              <StarRating rating={testimonial.rating} />

              {/* Text */}
              <p className="mt-4 text-text-secondary text-sm leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
