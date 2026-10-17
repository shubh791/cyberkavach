import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { CyberShieldMark } from '@/components/ui/CyberShieldMark';

export default function NotFound() {
  return (
    <div className="flex min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden max-w-full flex-col justify-between bg-canvas text-foreground selection:bg-accent/20 selection:text-accent">
      {/* Mini Header */}
      <header className="nav-shell">
        <div className="fluid-container flex h-14 sm:h-16 items-center justify-between">
          <Link href="/" className="brand-lockup" aria-label="Cyber Kavach home">
            <div className="brand-mark">
              <CyberShieldMark className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
            </div>
            <span className="text-xs font-bold uppercase leading-none tracking-[0.16em] text-foreground sm:text-sm">
              Cyber Kavach
            </span>
          </Link>

          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main 404 Editorial Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center min-h-0">
        <div className="relative flex flex-col items-center max-w-md mx-auto">
          {/* Warning Perimeter Shield Mark */}
          <div className="relative flex items-center justify-center w-20 h-20 mb-6">
            <span className="absolute inset-0 rounded-full border border-warning/30 animate-pulse" />
            <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl border border-warning/40 bg-warning/10 shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-warning" aria-hidden="true">
                <path
                  d="M12 2.5L4.5 5.8V11.8C4.5 16.5 7.7 20.8 12 22C16.3 20.8 19.5 16.5 19.5 11.8V5.8L12 2.5Z"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M12 8v5M12 16v.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Status Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-full border border-warning/30 bg-warning/10 text-warning font-mono text-[0.68rem] tracking-[0.16em] uppercase font-semibold">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-warning" />
            </span>
            <span>404 · SIGNAL PERIMETER BREACH</span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            Coordinate not found.
          </h1>

          {/* Description */}
          <p className="mt-3 text-sm text-foreground-secondary leading-relaxed max-w-sm">
            The path you requested lies outside the protected Cyber Kavach perimeter or has been intercepted by security filters.
          </p>

          {/* Action Button */}
          <div className="mt-6 flex items-center justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-accent/40 bg-accent-muted/40 hover:bg-accent-muted/70 text-accent hover:border-accent text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span>Return to Safety</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="footer-shell" role="contentinfo">
        <div className="fluid-container flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left py-2 sm:py-3">
          <Link
            href="/"
            className="brand-lockup opacity-90 hover:opacity-100 transition-opacity"
            aria-label="Cyber Kavach home"
          >
            <div className="brand-mark">
              <CyberShieldMark className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase leading-none tracking-[0.16em] text-foreground sm:text-sm">
                Cyber Kavach
              </span>
              <span className="hidden sm:inline-block text-border-medium">•</span>
              <span className="hidden sm:inline-block text-[0.66rem] text-foreground-muted font-mono tracking-wider uppercase">
                Next-Gen Mobile Defense
              </span>
            </div>
          </Link>

          <p className="text-[0.68rem] text-foreground-muted font-mono tracking-wide">
            &copy; 2026 Cyber Kavach. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
