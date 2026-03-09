import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ArticlesSection } from "@/components/sections/ArticlesSection";
import { GuidesSection } from "@/components/sections/GuidesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { ToolsSection } from "@/components/sections/ToolsSection";
import { TopicsSection } from "@/components/sections/TopicsSection";

export function HomePage() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection
          onExploreArticles={() => scrollTo("blog")}
          onExploreTools={() => scrollTo("tools")}
        />
        <TopicsSection />
        <GuidesSection />
        <ToolsSection />
        <NewsletterSection />
        <ArticlesSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F9FAFB]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-[#C9A227] text-xs font-body font-medium tracking-[0.2em] uppercase mb-3">
              Our Mission
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1F2933] mb-5 leading-snug">
              We believe disciplined thinking changes everything.
            </h2>
            <p className="font-body text-[#1F2933]/60 text-base leading-relaxed mb-4">
              Grow Wise Legacy was built for people who take their personal
              development seriously — those who understand that wealth, mindset,
              and lifestyle are interconnected disciplines, not separate goals.
            </p>
            <p className="font-body text-[#1F2933]/60 text-base leading-relaxed">
              Every article, guide, and tool recommendation is curated for the
              long game: building habits and systems that compound into an
              extraordinary life.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: "🧠",
                label: "Mindset First",
                desc: "Everything begins between your ears",
              },
              {
                icon: "📈",
                label: "Wealth Building",
                desc: "Sustainable financial strategies",
              },
              { icon: "⚖️", label: "Balance", desc: "All areas of life matter" },
              {
                icon: "🔁",
                label: "Compounding",
                desc: "Small actions, massive results",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-xl p-5 border border-[#1F2933]/8 shadow-xs"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-heading font-semibold text-sm text-[#1F2933] mb-1">
                  {item.label}
                </div>
                <div className="font-body text-xs text-[#1F2933]/50 leading-relaxed">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
