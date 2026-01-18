export default function SendCard() {
  return (
    <div className="glass w-56 rounded-2xl p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
          <svg
            className="h-5 w-5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </div>
        <div>
          <p className="text-xs text-text-muted">Send</p>
          <p className="font-semibold text-text-primary">0.0234 BTC</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-text-muted">To: Alex W.</span>
        <span className="text-xs text-success">Confirmed</span>
      </div>
    </div>
  );
}
