import SectionHeading from "../ui/SectionHeading";

const macros = [
  { name: "Calorías", value: 80, unit: "kcal", percentage: 4, color: "bg-amber-500" },
  { name: "Proteína", value: 5.8, unit: "g", percentage: 12, color: "bg-emerald-500" },
  { name: "Grasas", value: 4.5, unit: "g", percentage: 6, color: "bg-orange-500" },
  { name: "Carbohidratos", value: 2.0, unit: "g", percentage: 1, color: "bg-blue-500" },
];

const vitamins = ["B1", "B6", "B12", "Niacina"];
const minerals = ["Hierro", "Zinc", "Fósforo", "Potasio"];

export default function NutritionSection() {
  return (
    <section id="nutricion" className="section-padding px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Nutrición Real"
          subtitle="Cada porción de 25g está diseñada para alimentar tu cuerpo con lo mejor"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Macros Card */}
          <div className="glass rounded-3xl p-8">
            <h3 className="text-xl font-semibold text-white mb-6">
              Información Nutricional
              <span className="ml-2 text-sm font-normal text-text-secondary">
                por porción (25g)
              </span>
            </h3>

            <div className="space-y-6">
              {macros.map((macro) => (
                <div key={macro.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-text-secondary">{macro.name}</span>
                    <span className="font-semibold text-white">
                      {macro.value}
                      {macro.unit}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${macro.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${macro.percentage}%` }}
                    />
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-xs text-text-muted">
                      {macro.percentage}% VD
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vitamins & Minerals Card */}
          <div className="glass rounded-3xl p-8">
            <h3 className="text-xl font-semibold text-white mb-6">
              Vitaminas y Minerales
            </h3>

            <div className="space-y-8">
              {/* Vitamins */}
              <div>
                <h4 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">
                  Vitaminas
                </h4>
                <div className="flex flex-wrap gap-3">
                  {vitamins.map((vitamin) => (
                    <span
                      key={vitamin}
                      className="inline-flex items-center rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 border border-emerald-500/20"
                    >
                      {vitamin}
                    </span>
                  ))}
                </div>
              </div>

              {/* Minerals */}
              <div>
                <h4 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">
                  Minerales
                </h4>
                <div className="flex flex-wrap gap-3">
                  {minerals.map((mineral) => (
                    <span
                      key={mineral}
                      className="inline-flex items-center rounded-full bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-400 border border-amber-500/20"
                    >
                      {mineral}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quality badges */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Sin gluten
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Keto-friendly
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Sin azúcar añadida
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
