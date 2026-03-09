import { Skeleton } from "@/components/ui/skeleton";
import { useFadeUp } from "@/hooks/useFadeUp";
import { useGetGuides } from "@/hooks/useQueries";
import { BookOpen } from "lucide-react";

const FALLBACK_GUIDES = [
  {
    id: BigInt(1),
    title: "Ultimate Productivity Guide",
    description:
      "Master your time, eliminate distractions, and build systems that make high performance sustainable over the long term.",
  },
  {
    id: BigInt(2),
    title: "Wealth Building Blueprint",
    description:
      "From your first investment to financial independence — a comprehensive roadmap for building and preserving generational wealth.",
  },
  {
    id: BigInt(3),
    title: "Design Your Life System",
    description:
      "A proven framework for aligning your daily actions with your deepest values and long-term vision for a life well-lived.",
  },
];

export function GuidesSection() {
  const { data: guides, isLoading } = useGetGuides();
  const headingRef = useFadeUp<HTMLDivElement>();

  const displayGuides = guides && guides.length > 0 ? guides : FALLBACK_GUIDES;

  return (
    <section
      id="guides"
      className="py-20 lg:py-28 bg-[#1F2933] relative overflow-hidden"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 50%, #C9A227 1px, transparent 1px), radial-gradient(circle at 75% 50%, #C9A227 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14">
          <span className="inline-block text-[#C9A227] text-xs font-body font-medium tracking-[0.2em] uppercase mb-3">
            Deep Dives
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
            Featured Guides
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 bg-[#C9A227] rounded-full" />
          <p className="mt-5 font-body text-white/50 max-w-xl mx-auto text-base">
            Comprehensive resources to accelerate your journey across all three
            pillars.
          </p>
        </div>

        {/* Cards */}
        <div
          data-ocid="guides.section"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {isLoading
            ? (["1", "2", "3"] as const).map((k) => (
                <Skeleton key={k} className="h-64 rounded-xl opacity-20" />
              ))
            : displayGuides
                .slice(0, 3)
                .map((guide, i) => (
                  <GuideCard
                    key={guide.id.toString()}
                    title={guide.title}
                    description={guide.description}
                    index={i}
                    ocid={`guides.item.${i + 1}` as string}
                  />
                ))}
        </div>
      </div>
    </section>
  );
}

interface GuideCardProps {
  title: string;
  description: string;
  index: number;
  ocid: string;
}

function GuideCard({ title, description, index, ocid }: GuideCardProps) {
  const ref = useFadeUp<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-ocid={ocid}
      className="card-lift group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-7 hover:bg-white/8 hover:border-[#C9A227]/30 transition-all duration-300 relative overflow-hidden"
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      {/* Gold corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#C9A227]/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Guide number */}
      <div className="text-[#C9A227]/20 font-heading font-bold text-5xl leading-none mb-4 select-none">
        0{index + 1}
      </div>

      {/* Icon */}
      <div className="mb-4 text-[#C9A227]">
        <BookOpen className="w-6 h-6" />
      </div>

      <h3 className="font-heading font-semibold text-xl text-white mb-3 group-hover:text-[#C9A227] transition-colors duration-300">
        {title}
      </h3>
      <p className="font-body text-white/50 text-sm leading-relaxed mb-6">
        {description}
      </p>

      <button
        type="button"
        className="text-[#C9A227] text-sm font-body font-medium inline-flex items-center gap-2 hover:gap-3 transition-all duration-200"
      >
        Read Guide
        <span>→</span>
      </button>
    </div>
  );
}
