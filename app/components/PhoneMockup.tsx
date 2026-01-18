import SendCard from "./FloatingCards/SendCard";
import PriceCard from "./FloatingCards/PriceCard";
import BalanceCard from "./FloatingCards/BalanceCard";

export default function PhoneMockup() {
  return (
    <section className="relative mx-auto mt-8 flex max-w-6xl items-center justify-center px-6 pb-24">
      {/* Floating Cards - Left Side */}
      <div className="absolute left-0 top-1/4 z-10 hidden -translate-x-1/4 transform lg:block">
        <SendCard />
      </div>
      <div className="absolute left-8 bottom-1/4 z-10 hidden lg:block">
        <PriceCard coin="ethereum" price="$3,421.67" change={2.34} />
      </div>

      {/* Phone Frame */}
      <div className="relative">
        {/* iPhone Frame */}
        <div className="relative h-[600px] w-[300px] rounded-[3rem] border-[8px] border-surface-light bg-surface shadow-2xl sm:h-[680px] sm:w-[340px]">
          {/* Notch */}
          <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-surface-light" />

          {/* Screen Content */}
          <div className="absolute inset-2 overflow-hidden rounded-[2.5rem] bg-background">
            {/* App Content Preview */}
            <div className="flex h-full flex-col p-6 pt-10">
              {/* Status Bar */}
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v18m-6-6l6 6 6-6" />
                  </svg>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.24 4.24 0 00-6 0zm-4-4l2 2a7.07 7.07 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                  </svg>
                  <div className="ml-1 flex h-3 w-6 items-center rounded-sm border border-text-muted px-0.5">
                    <div className="h-1.5 w-4 rounded-sm bg-success" />
                  </div>
                </div>
              </div>

              {/* Portfolio Balance */}
              <div className="mt-8 text-center">
                <p className="text-sm text-text-muted">Total Balance</p>
                <p className="mt-2 text-4xl font-bold text-text-primary">
                  $48,294.21
                </p>
                <p className="mt-1 text-sm text-success">+$1,234.56 (2.6%)</p>
              </div>

              {/* Quick Actions */}
              <div className="mt-8 flex justify-center gap-6">
                {[
                  { icon: "↑", label: "Send" },
                  { icon: "↓", label: "Receive" },
                  { icon: "↔", label: "Swap" },
                ].map((action) => (
                  <div key={action.label} className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-lg text-text-primary">
                      {action.icon}
                    </div>
                    <span className="text-xs text-text-muted">{action.label}</span>
                  </div>
                ))}
              </div>

              {/* Asset List */}
              <div className="mt-8 flex-1 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-surface p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#F7931A]" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">Bitcoin</p>
                      <p className="text-xs text-text-muted">0.82 BTC</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-text-primary">$35,241</p>
                    <p className="text-xs text-success">+1.2%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-surface p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#627EEA]" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">Ethereum</p>
                      <p className="text-xs text-text-muted">3.45 ETH</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-text-primary">$11,805</p>
                    <p className="text-xs text-success">+2.8%</p>
                  </div>
                </div>
              </div>

              {/* Bottom Nav */}
              <div className="mt-auto flex justify-around border-t border-border pt-4">
                {["Home", "Cards", "Swap", "Profile"].map((item, i) => (
                  <div
                    key={item}
                    className={`flex flex-col items-center gap-1 ${
                      i === 0 ? "text-primary" : "text-text-muted"
                    }`}
                  >
                    <div className="h-5 w-5 rounded-md bg-current opacity-60" />
                    <span className="text-[10px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-text-muted" />
        </div>
      </div>

      {/* Floating Cards - Right Side */}
      <div className="absolute right-0 top-1/3 z-10 hidden translate-x-1/4 transform lg:block">
        <BalanceCard />
      </div>
      <div className="absolute right-8 bottom-1/4 z-10 hidden lg:block">
        <PriceCard coin="bitcoin" price="$42,891.23" change={-0.87} light />
      </div>
    </section>
  );
}
