import SectionHeading from "../ui/SectionHeading";

const ingredients = [
  { name: "Salsa de Soya", highlight: true },
  { name: "Salsa Maggi", highlight: true },
  { name: "Salsa Inglesa", highlight: true },
  { name: "Polvo de Limón", highlight: false },
  { name: "Sal de Mar", highlight: false },
  { name: "Carne de Cerdo Magra", highlight: false },
];

export default function FlavorProfile() {
  return (
    <section id="productos" className="section-padding px-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-4xl text-center">
        <SectionHeading
          title="Triple Salsa Negra + Limón"
          subtitle="Una combinación única que despierta cada uno de tus sentidos"
        />

        {/* Flavor visual */}
        <div className="mt-12 relative">
          {/* Decorative rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 rounded-full border border-primary/20 animate-pulse" />
            <div className="absolute w-80 h-80 rounded-full border border-primary/10" />
          </div>

          {/* Central badge */}
          <div className="relative z-10 inline-flex flex-col items-center justify-center w-48 h-48 rounded-full bg-gradient-to-br from-amber-950 to-stone-900 border-2 border-primary/50 shadow-[0_0_60px_rgba(249,115,22,0.4)]">
            <span className="text-6xl">🔥</span>
            <span className="mt-2 text-sm font-bold text-white uppercase tracking-wider">
              Sabor Único
            </span>
          </div>
        </div>

        {/* Ingredients pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {ingredients.map((ingredient) => (
            <span
              key={ingredient.name}
              className={`
                inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium
                backdrop-blur-md transition-all duration-300 hover:scale-105
                ${
                  ingredient.highlight
                    ? "bg-primary/20 text-primary-light border border-primary/30"
                    : "bg-white/5 text-text-secondary border border-white/10"
                }
              `}
            >
              {ingredient.highlight && (
                <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
              )}
              {ingredient.name}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="mt-10 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Marinada artesanal con la combinación perfecta de tres salsas negras que
          penetran profundamente en cada fibra de la carne, complementada con el
          toque cítrico del limón que realza todos los sabores.
        </p>
      </div>
    </section>
  );
}
