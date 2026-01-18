export default function BalanceCard() {
  return (
    <div className="bg-pink-gradient w-52 rounded-2xl p-5 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium opacity-90">Card Balance</p>
        <svg
          className="h-6 w-6 opacity-80"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      </div>
      <p className="mt-4 text-3xl font-bold">$12,450</p>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-xs opacity-70">Card Number</p>
          <p className="text-sm font-medium">•••• 4829</p>
        </div>
        <div className="flex gap-1">
          <div className="h-6 w-6 rounded-full bg-white/30" />
          <div className="-ml-2 h-6 w-6 rounded-full bg-white/50" />
        </div>
      </div>
    </div>
  );
}
