import Image from "next/image";
import SectionHeading from "../ui/SectionHeading";

const useCases = [
  {
    title: "Reuniones",
    description: "El snack perfecto para compartir con amigos y familia",
    image: "/hero-image.jpeg",
    icon: "🎉",
  },
  {
    title: "Aventuras",
    description: "Energía portable que no necesita refrigeración",
    image: "/hero-image.jpeg",
    icon: "⛰️",
  },
  {
    title: "Viajes",
    description: "Tu compañero ideal en cada carretera",
    image: "/hero-image.jpeg",
    icon: "🚗",
  },
];

export default function UseCasesSection() {
  return (
    <section id="experiencias" className="section-padding px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Para Cada Momento"
          subtitle="Descubre todas las formas de disfrutar Sabrocados"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <div
              key={useCase.title}
              className="group relative overflow-hidden rounded-3xl aspect-[4/5] cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Background image */}
              <Image
                src={useCase.image}
                alt={useCase.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="text-4xl mb-3 transform transition-transform duration-300 group-hover:scale-110">
                  {useCase.icon}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {useCase.title}
                </h3>
                <p className="mt-2 text-text-secondary opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  {useCase.description}
                </p>
              </div>

              {/* Hover border effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent transition-colors duration-300 group-hover:border-primary/50" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
