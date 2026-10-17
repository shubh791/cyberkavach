import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { CyberShieldMark } from "@/components/ui/CyberShieldMark";

export function Navbar() {
  return (
    <header className="nav-shell">
      <div className="fluid-container flex h-14 sm:h-16 items-center justify-between">
        <a href="#top" className="brand-lockup" aria-label="Cyber Kavach home">
          <div className="brand-mark">
            <CyberShieldMark className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
          </div>
          <span className="text-xs font-bold uppercase leading-none tracking-[0.16em] text-foreground sm:text-sm">
            Cyber Kavach
          </span>
        </a>

        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
