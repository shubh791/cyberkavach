import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div
      id="top"
      className="flex min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden max-w-full flex-col justify-between bg-canvas text-foreground selection:bg-accent/20 selection:text-accent"
    >
      <Navbar />
      <main className="flex flex-1 flex-col justify-center min-h-0">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
