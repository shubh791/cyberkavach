export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-canvas text-foreground selection:bg-accent/20 selection:text-accent"
      aria-label="Loading Cyber Kavach"
      role="status"
    >
      <div className="relative flex flex-col items-center text-center px-6">
        {/* Animated Radar Shield Visual */}
        <div className="relative flex items-center justify-center w-24 h-24 mb-6">
          {/* Concentric Ambient Radar Pulses */}
          <span className="absolute inset-0 rounded-full border border-accent/25 animate-ping opacity-60" />
          <span className="absolute -inset-2 rounded-full border border-accent/15 animate-pulse opacity-40" />
          <span className="absolute -inset-4 rounded-full border border-border-subtle" />

          {/* Central Layered Shield Mark */}
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl border border-border-medium bg-surface-elevated shadow-lg">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-8 h-8 text-accent animate-pulse"
              aria-hidden="true"
            >
              <path
                d="M12 2.5L4.5 5.8V11.8C4.5 16.5 7.7 20.8 12 22C16.3 20.8 19.5 16.5 19.5 11.8V5.8L12 2.5Z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 6.5L7.5 9.2V13.2C7.5 16 9.4 18.5 12 19.3C14.6 18.5 16.5 16 16.5 13.2V9.2L12 6.5Z"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="13.2" r="1.3" fill="var(--accent)" />
            </svg>
          </div>
        </div>

        {/* Status Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-accent/30 bg-accent-muted/40 text-accent font-mono text-[0.68rem] tracking-[0.14em] uppercase font-semibold">
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
          </span>
          <span>CYBER KAVACH DEFENSE CORE</span>
        </div>

        {/* Headline */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Initializing Defense Systems
        </h1>

        {/* Subtext with Monospace Tracker */}
        <p className="mt-2 text-xs sm:text-sm text-foreground-secondary font-mono tracking-wide">
          Calibrating runtime heuristic scanner…
        </p>
      </div>
    </div>
  );
}

