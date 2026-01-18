interface PriceCardProps {
  coin: "ethereum" | "bitcoin";
  price: string;
  change: number;
  light?: boolean;
}

export default function PriceCard({
  coin,
  price,
  change,
  light = false,
}: PriceCardProps) {
  const isPositive = change >= 0;
  const changeColor = isPositive ? "text-success" : "text-danger";

  const coinData = {
    ethereum: {
      symbol: "ETH",
      name: "Ethereum",
      icon: (
        <svg viewBox="0 0 32 32" className="h-6 w-6">
          <path
            fill="#627EEA"
            d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16z"
          />
          <path fill="#FFF" fillOpacity=".602" d="M16.498 4v8.87l7.497 3.35z" />
          <path fill="#FFF" d="M16.498 4L9 16.22l7.498-3.35z" />
          <path
            fill="#FFF"
            fillOpacity=".602"
            d="M16.498 21.968v6.027L24 17.616z"
          />
          <path fill="#FFF" d="M16.498 27.995v-6.028L9 17.616z" />
          <path
            fill="#FFF"
            fillOpacity=".2"
            d="M16.498 20.573l7.497-4.353-7.497-3.348z"
          />
          <path
            fill="#FFF"
            fillOpacity=".602"
            d="M9 16.22l7.498 4.353v-7.701z"
          />
        </svg>
      ),
    },
    bitcoin: {
      symbol: "BTC",
      name: "Bitcoin",
      icon: (
        <svg viewBox="0 0 32 32" className="h-6 w-6">
          <path
            fill="#F7931A"
            d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16z"
          />
          <path
            fill="#FFF"
            d="M22.5 14.2c.3-2-1.2-3.1-3.3-3.8l.7-2.7-1.7-.4-.7 2.6c-.4-.1-.9-.2-1.4-.3l.7-2.6-1.7-.4-.7 2.7c-.4-.1-.7-.2-1.1-.3l-2.3-.6-.5 1.8s1.2.3 1.2.3c.7.2.8.6.8 1l-.8 3.1c0 0 .1 0 .2.1-.1 0-.1 0-.2 0l-1.1 4.4c-.1.2-.3.5-.8.4 0 0-1.2-.3-1.2-.3l-.8 1.9 2.2.5c.4.1.8.2 1.2.3l-.7 2.8 1.7.4.7-2.7c.5.1 1 .2 1.5.3l-.7 2.7 1.7.4.7-2.8c2.8.5 4.9.3 5.8-2.2.7-2 0-3.2-1.5-4 1.1-.3 1.9-1 2.1-2.5zm-3.8 5.3c-.5 2-4 .9-5.1.6l.9-3.6c1.1.3 4.7.8 4.2 3zm.5-5.4c-.5 1.8-3.4.9-4.3.7l.8-3.3c1 .2 4 .7 3.5 2.6z"
          />
        </svg>
      ),
    },
  };

  const { symbol, name, icon } = coinData[coin];

  return (
    <div
      className={`w-48 rounded-2xl p-4 ${
        light ? "bg-white text-gray-900" : "glass"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className={`font-semibold ${light ? "text-gray-900" : "text-text-primary"}`}>
            {symbol}
          </p>
          <p className={`text-xs ${light ? "text-gray-500" : "text-text-muted"}`}>
            {name}
          </p>
        </div>
      </div>
      <div className="mt-3">
        <p className={`text-lg font-bold ${light ? "text-gray-900" : "text-text-primary"}`}>
          {price}
        </p>
        <p className={`text-sm ${changeColor}`}>
          {isPositive ? "+" : ""}
          {change}%
        </p>
      </div>
      {/* Mini chart placeholder */}
      <div className="mt-2 h-8">
        <svg viewBox="0 0 100 30" className={`h-full w-full ${isPositive ? "text-success" : "text-danger"}`}>
          <path
            d={
              isPositive
                ? "M0,25 Q25,20 40,22 T60,15 T80,18 T100,8"
                : "M0,8 Q25,12 40,10 T60,18 T80,15 T100,25"
            }
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
