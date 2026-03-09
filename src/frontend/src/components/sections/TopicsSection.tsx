import { Skeleton } from "@/components/ui/skeleton";
import { useFadeUp } from "@/hooks/useFadeUp";
import { useGetTopicCards } from "@/hooks/useQueries";
import { Brain, Leaf, TrendingUp } from "lucide-react";

const TOPIC_ICONS = [
  <Brain className="w-7 h-7" key="brain" />,
  <TrendingUp className="w-7 h-7" key="trend" />,
  <Leaf className="w-7 h-7" key="leaf" />,
];

const FALLBACK_TOPICS = [
  {
    id: BigInt(1),
    title: "Personal Growth",
    description:
      "Mindset, discipline, and habits that compound over time to transform who you are.",
  },
  {
    id: BigInt(2),
    title: "Wealth",
    description:
      "Financial thinking, investing principles, and strategies for building lasting prosperity.",
  },
  {
    id: BigInt(3),
    title: "Lifestyle",
    description:
      "Design a balanced life with purpose, energy, and intention in every area.",
  },
];

export function TopicsSection() {
  const { data: topics, isLoading } = useGetTopicCards();
  const headingRef = useFadeUp<HTMLDivElement>();

  const displayTopics = topics && topics.length > 0 ? topics : FALLBACK_TOPICS;

  return (
    <section id="topics" className="py-20 lg:py-28 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14">
          <span className="inline-block text-[#C9A227] text-xs font-body font-medium tracking-[0.2em] uppercase mb-3">
            What We Cover
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1F2933]">
            Explore Topics
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 bg-[#C9A227] rounded-full" />
        </div>

        {/* Cards */}
        <div
          data-ocid="topics.section"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {isLoading
            ? (["1", "2", "3"] as const).map((k) => (
                <Skeleton key={k} className="h-56 rounded-xl" />
              ))
            : displayTopics
                .slice(0, 3)
                .map((topic, i) => (
                  <TopicCard
                    key={topic.id.toString()}
                    title={topic.title}
                    description={topic.description}
                    icon={TOPIC_ICONS[i % TOPIC_ICONS.length]}
                    index={i}
                    ocid={`topics.item.${i + 1}` as `topics.item.${1 | 2 | 3}`}
                  />
                ))}
        </div>
      </div>
    </section>
  );
}

interface TopicCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  ocid: string;
}

function TopicCard({ title, description, icon, index, ocid }: TopicCardProps) {
  const ref = useFadeUp<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-ocid={ocid}
      className="card-lift group bg-white rounded-xl p-8 shadow-card border border-[#1F2933]/6 relative overflow-hidden cursor-default"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Gold top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A227]/40 via-[#C9A227] to-[#C9A227]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon */}
      <div className="w-14 h-14 rounded-lg bg-[#1F2933]/5 flex items-center justify-center mb-5 text-[#C9A227] group-hover:bg-[#C9A227]/10 transition-colors duration-300">
        {icon}
      </div>

      <h3 className="font-heading font-semibold text-xl text-[#1F2933] mb-3 group-hover:text-[#C9A227] transition-colors duration-300">
        {title}
      </h3>
      <p className="font-body text-[#1F2933]/60 text-sm leading-relaxed">
        {description}
      </p>

      {/* Arrow indicator */}
      <div className="mt-5 flex items-center gap-1.5 text-[#C9A227] text-xs font-body font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>Explore</span>
        <span>→</span>
      </div>
    </div>
  );
}
