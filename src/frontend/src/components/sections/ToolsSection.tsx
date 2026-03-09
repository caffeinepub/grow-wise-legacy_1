import { Skeleton } from "@/components/ui/skeleton";
import { useFadeUp } from "@/hooks/useFadeUp";
import { useGetTools } from "@/hooks/useQueries";
import { ExternalLink, Wrench } from "lucide-react";

const FALLBACK_TOOLS = [
  {
    id: BigInt(1),
    name: "Notion",
    description:
      "All-in-one workspace for notes, tasks, wikis, and databases. Build your second brain and life operating system.",
    link: "https://notion.so",
  },
  {
    id: BigInt(2),
    name: "YNAB (You Need A Budget)",
    description:
      "Zero-based budgeting app that transforms your relationship with money through intentional spending and saving.",
    link: "https://youneedabudget.com",
  },
  {
    id: BigInt(3),
    name: "Readwise",
    description:
      "Surface your best reading highlights daily so the knowledge you consume actually sticks and compounds over time.",
    link: "https://readwise.io",
  },
  {
    id: BigInt(4),
    name: "M1 Finance",
    description:
      "Automated investing platform with customizable portfolios. Set your allocation and let automation do the work.",
    link: "https://m1finance.com",
  },
  {
    id: BigInt(5),
    name: "Reflect",
    description:
      "Networked note-taking app designed for deep thinking. Connect ideas and build a knowledge graph over time.",
    link: "https://reflect.app",
  },
  {
    id: BigInt(6),
    name: "Strong",
    description:
      "The most intuitive workout tracker for progressive overload training. Log, analyze, and improve your fitness.",
    link: "https://strong.app",
  },
];

export function ToolsSection() {
  const { data: tools, isLoading } = useGetTools();
  const headingRef = useFadeUp<HTMLDivElement>();

  const displayTools = tools && tools.length > 0 ? tools : FALLBACK_TOOLS;

  return (
    <section id="tools" className="py-20 lg:py-28 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14">
          <span className="inline-block text-[#C9A227] text-xs font-body font-medium tracking-[0.2em] uppercase mb-3">
            Our Stack
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1F2933]">
            Recommended Tools
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 bg-[#C9A227] rounded-full" />
          <p className="mt-5 font-body text-[#1F2933]/50 max-w-xl mx-auto text-base">
            The exact tools we use and recommend for building wealth, staying
            disciplined, and living with intention.
          </p>
        </div>

        {/* Tools grid */}
        <div
          data-ocid="tools.section"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {isLoading
            ? (["1", "2", "3", "4", "5", "6"] as const).map((k) => (
                <Skeleton key={k} className="h-44 rounded-xl" />
              ))
            : displayTools.map((tool, i) => (
                <ToolCard
                  key={tool.id.toString()}
                  name={tool.name}
                  description={tool.description}
                  link={tool.link}
                  index={i}
                  ocid={`tools.item.${i + 1}`}
                />
              ))}
        </div>
      </div>
    </section>
  );
}

interface ToolCardProps {
  name: string;
  description: string;
  link: string;
  index: number;
  ocid: string;
}

function ToolCard({ name, description, link, index, ocid }: ToolCardProps) {
  const ref = useFadeUp<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-ocid={ocid}
      className="card-lift group bg-white rounded-xl p-6 shadow-card border border-[#1F2933]/6 flex flex-col"
      style={{ transitionDelay: `${(index % 3) * 0.08}s` }}
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-[#1F2933]/5 flex items-center justify-center mb-4 text-[#C9A227] group-hover:bg-[#C9A227]/10 transition-colors duration-300">
        <Wrench className="w-5 h-5" />
      </div>

      <h3 className="font-heading font-semibold text-base text-[#1F2933] mb-2">
        {name}
      </h3>
      <p className="font-body text-[#1F2933]/55 text-sm leading-relaxed flex-1 mb-5">
        {description}
      </p>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gold inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-heading font-semibold self-start"
      >
        View Tool
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
