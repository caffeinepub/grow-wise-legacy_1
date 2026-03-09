import type { Article } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useFadeUp } from "@/hooks/useFadeUp";
import { useGetArticles } from "@/hooks/useQueries";
import { ArrowRight, FileText } from "lucide-react";

const FALLBACK_ARTICLES: Article[] = [
  {
    id: BigInt(1),
    title:
      "The Compound Effect: Why Small Daily Habits Create Extraordinary Results",
    summary:
      "Discover how micro-habits compound into massive transformation over 12 months — and the science behind why most people quit before they see results.",
    category: "Personal Growth",
    content: "",
    publishedAt: BigInt(
      Date.now() * 1_000_000 - 7 * 24 * 60 * 60 * 1_000_000_000,
    ),
  },
  {
    id: BigInt(2),
    title:
      "Index Funds vs. Individual Stocks: The Data-Driven Investor's Guide",
    summary:
      "A comprehensive breakdown of passive vs. active investing — with 30 years of market data to help you make the choice that matches your philosophy.",
    category: "Wealth",
    content: "",
    publishedAt: BigInt(
      Date.now() * 1_000_000 - 14 * 24 * 60 * 60 * 1_000_000_000,
    ),
  },
  {
    id: BigInt(3),
    title:
      "Morning Routines of High Performers: What the Research Actually Says",
    summary:
      "We analyzed 50 morning routines from entrepreneurs, athletes, and executives. Here's what they have in common — and what doesn't actually matter.",
    category: "Lifestyle",
    content: "",
    publishedAt: BigInt(
      Date.now() * 1_000_000 - 21 * 24 * 60 * 60 * 1_000_000_000,
    ),
  },
  {
    id: BigInt(4),
    title: "Building Your First Investment Portfolio from $0 to $10,000",
    summary:
      "A step-by-step guide for beginners: from opening your first brokerage account to allocating your first $10K with confidence and conviction.",
    category: "Wealth",
    content: "",
    publishedAt: BigInt(
      Date.now() * 1_000_000 - 28 * 24 * 60 * 60 * 1_000_000_000,
    ),
  },
  {
    id: BigInt(5),
    title: "The Discipline Gap: Why Motivation Fails and Systems Succeed",
    summary:
      "Stop relying on motivation. Learn how to architect systems that make good behavior the path of least resistance — even on your worst days.",
    category: "Personal Growth",
    content: "",
    publishedAt: BigInt(
      Date.now() * 1_000_000 - 35 * 24 * 60 * 60 * 1_000_000_000,
    ),
  },
  {
    id: BigInt(6),
    title: "Digital Minimalism: Designing a Technology Life That Serves You",
    summary:
      "Reclaim your attention by auditing your digital environment. A practical framework for intentional technology use in a distracted world.",
    category: "Lifestyle",
    content: "",
    publishedAt: BigInt(
      Date.now() * 1_000_000 - 42 * 24 * 60 * 60 * 1_000_000_000,
    ),
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Personal Growth": "bg-[#1F2933]/10 text-[#1F2933] border-[#1F2933]/15",
  Wealth: "bg-[#C9A227]/10 text-[#8a6e17] border-[#C9A227]/20",
  Lifestyle: "bg-emerald-50 text-emerald-700 border-emerald-100",
};

function formatDate(publishedAt: bigint): string {
  const ms = Number(publishedAt / BigInt(1_000_000));
  if (ms < 1_000_000) return "Recently";
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ArticlesSection() {
  const { data: articles, isLoading } = useGetArticles();
  const headingRef = useFadeUp<HTMLDivElement>();

  const displayArticles =
    articles && articles.length > 0 ? articles.slice(0, 6) : FALLBACK_ARTICLES;

  return (
    <section id="blog" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={headingRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="inline-block text-[#C9A227] text-xs font-body font-medium tracking-[0.2em] uppercase mb-3">
              From The Blog
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1F2933]">
              Latest Articles
            </h2>
            <div className="mt-3 w-16 h-1 bg-[#C9A227] rounded-full" />
          </div>
          <a
            href="#blog"
            className="inline-flex items-center gap-2 text-[#C9A227] font-body text-sm font-medium hover:gap-3 transition-all duration-200"
          >
            View all articles
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Articles grid */}
        <div
          data-ocid="articles.section"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {isLoading ? (
            (["1", "2", "3", "4", "5", "6"] as const).map((k) => (
              <Skeleton key={k} className="h-64 rounded-xl" />
            ))
          ) : displayArticles.length === 0 ? (
            <div
              data-ocid="articles.empty_state"
              className="col-span-3 text-center py-16 bg-[#F9FAFB] rounded-xl"
            >
              <FileText className="w-12 h-12 text-[#1F2933]/20 mx-auto mb-4" />
              <p className="font-heading font-semibold text-[#1F2933]/40 text-lg">
                No articles yet
              </p>
              <p className="font-body text-[#1F2933]/30 text-sm mt-2">
                Check back soon for new content.
              </p>
            </div>
          ) : (
            displayArticles.map((article, i) => (
              <ArticleCard
                key={article.id.toString()}
                article={article}
                index={i}
                ocid={`articles.item.${i + 1}`}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

interface ArticleCardProps {
  article: Article;
  index: number;
  ocid: string;
}

function ArticleCard({ article, index, ocid }: ArticleCardProps) {
  const ref = useFadeUp<HTMLDivElement>();
  const colorClass =
    CATEGORY_COLORS[article.category] ??
    "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <div
      ref={ref}
      data-ocid={ocid}
      className="card-lift group bg-white rounded-xl border border-[#1F2933]/8 shadow-card flex flex-col overflow-hidden"
      style={{ transitionDelay: `${(index % 3) * 0.08}s` }}
    >
      {/* Card top accent bar with category color */}
      <div className="h-1.5 bg-gradient-to-r from-[#C9A227]/60 via-[#C9A227] to-[#C9A227]/60" />

      <div className="p-6 flex flex-col flex-1">
        {/* Category + Date */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`inline-block text-xs font-body font-medium px-2.5 py-1 rounded-full border ${colorClass}`}
          >
            {article.category}
          </span>
          <span className="text-[#1F2933]/35 text-xs font-body">
            {formatDate(article.publishedAt)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-semibold text-base text-[#1F2933] mb-3 leading-snug group-hover:text-[#C9A227] transition-colors duration-300 line-clamp-2">
          {article.title}
        </h3>

        {/* Summary */}
        <p className="font-body text-[#1F2933]/55 text-sm leading-relaxed flex-1 line-clamp-3">
          {article.summary}
        </p>

        {/* Read more */}
        <div className="mt-5 pt-4 border-t border-[#1F2933]/6">
          <button
            type="button"
            className="text-[#C9A227] text-sm font-body font-medium inline-flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200"
          >
            Read More
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
