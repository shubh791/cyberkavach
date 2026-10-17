import { CyberShieldMark } from "@/components/ui/CyberShieldMark";

export function Footer() {
  return (
    <footer className="footer-shell" role="contentinfo">
      <div className="fluid-container flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left py-2 sm:py-3">
        <a
          href="#top"
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
        </a>

        <p className="text-[0.68rem] text-foreground-muted font-mono tracking-wide">
          &copy; 2026 Cyber Kavach. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
