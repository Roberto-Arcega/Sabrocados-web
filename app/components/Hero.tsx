import Image from "next/image";
import Badge from "./Badge";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6">
      {/* Content Container - removed max-w constraint for more space */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mx-auto w-full max-w-[1400px]">

        {/* Text Content - smaller flex to give image more room */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-[40%] shrink-0">
          <Badge className="mb-6">
            <span className="text-lg">🔥</span>
            <span>Alta en proteína · Baja en carbohidratos · Puro sabor</span>
          </Badge>

          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            El snack que satisface
          </h1>

          <p className="mt-6 max-w-xl text-lg text-text-secondary md:text-xl">
            Carne de cerdo deshidratada con limón y triple salsa negra
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button variant="primary" size="lg">
              Comprar Ahora
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Button>
            <Button variant="outline" size="lg">
              Conocer Más
            </Button>
          </div>
        </div>

        {/* Product Image - larger section */}
        <div className="relative w-full lg:w-[60%] flex items-center justify-center pt-12 sm:pt-16 lg:pt-0">
          {/* Glow effect behind product */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent blur-3xl scale-150" />

          {/* Product image with professional styling */}
          <div className="relative group">
            {/* Subtle shadow/reflection */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-gradient-to-t from-black/50 to-transparent blur-2xl rounded-full" />

            {/* Image - mobile uses width+scale, desktop uses fixed height */}
            <Image
              src="/hero-product.png"
              alt="Sabrocados - Snacks de Cerdo Salsas Negras"
              width={900}
              height={900}
              className="w-[85vw] max-w-none h-auto scale-125 sm:scale-110 md:w-[70vw] md:scale-100 lg:w-auto lg:max-w-full lg:h-[500px] xl:h-[580px] 2xl:h-[650px] object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </div>
        </div>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
