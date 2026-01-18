import Image from "next/image";
import Badge from "./Badge";

const WHATSAPP_NUMBER = "524775775959";
const WHATSAPP_MESSAGE = "Hola, quiero ordenar Sabrocados";

export default function Hero() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

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
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full bg-[#25D366] text-white transition-all duration-300 hover:bg-[#20BD5A] hover:scale-105 shadow-lg"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Ordenar Ahora
            </a>
            <a
              href="#nutricion"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full border border-border text-text-primary hover:bg-surface hover:border-border-light transition-colors"
            >
              Conocer Más
            </a>
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
