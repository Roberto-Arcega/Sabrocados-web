import Badge from "./Badge";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="flex flex-col items-center pt-32 pb-16 text-center px-6">
      <Badge className="mb-6">
        <span className="text-lg">✨</span>
        <span>AI-driven crypto experience</span>
      </Badge>

      <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl">
        Smarter Control of Your{" "}
        <span className="bg-warm-gradient bg-clip-text text-transparent">
          Crypto Assets
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-text-secondary md:text-xl">
        Experience the future of cryptocurrency management with AI-powered
        insights, real-time analytics, and seamless portfolio tracking all in
        one place.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Button variant="primary" size="lg">
          Get Started
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
          Learn More
        </Button>
      </div>
    </section>
  );
}
