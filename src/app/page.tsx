import TopBar from "@/components/TopBar";
import HeroSection from "@/components/HeroSection";
import ChapterGrid from "@/components/ChapterGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
      <TopBar />
      <main>
        <HeroSection />
        <ChapterGrid />
      </main>
      <Footer />
    </div>
  );
}
