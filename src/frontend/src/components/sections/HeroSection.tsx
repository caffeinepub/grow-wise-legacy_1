import { motion } from "motion/react";

interface HeroSectionProps {
  onExploreArticles: () => void;
  onExploreTools: () => void;
}

export function HeroSection({
  onExploreArticles,
  onExploreTools,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1F2933]"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-background.dim_1600x900.jpg')",
        }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1F2933]/70 via-[#1F2933]/60 to-[#1F2933]/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1F2933]/60 via-transparent to-[#1F2933]/60" />

      {/* Decorative gold accent lines */}
      <div className="absolute top-1/3 left-0 w-48 h-px bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent" />
      <div className="absolute bottom-1/3 right-0 w-64 h-px bg-gradient-to-l from-transparent via-[#C9A227]/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <span className="w-8 h-px bg-[#C9A227]" />
          <span className="text-[#C9A227] text-xs font-body font-medium tracking-[0.2em] uppercase">
            Knowledge Platform
          </span>
          <span className="w-8 h-px bg-[#C9A227]" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
        >
          Build Wealth.{" "}
          <span className="text-gold-gradient">Master Yourself.</span>
          <br className="hidden sm:block" /> Design Your Life.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="font-body text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          A knowledge platform for disciplined thinkers focused on growth,
          wealth, and meaningful living.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            type="button"
            data-ocid="hero.primary_button"
            onClick={onExploreArticles}
            className="btn-gold px-8 py-3.5 rounded-md text-sm font-heading font-semibold tracking-wide shadow-gold hover:shadow-gold-lg min-w-[180px]"
          >
            Explore Articles
          </button>
          <button
            type="button"
            data-ocid="hero.secondary_button"
            onClick={onExploreTools}
            className="btn-gold-outline px-8 py-3.5 rounded-md text-sm font-heading font-semibold tracking-wide min-w-[180px]"
          >
            Recommended Tools
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16"
        >
          {[
            { value: "50+", label: "Articles Published" },
            { value: "10K+", label: "Monthly Readers" },
            { value: "3", label: "Core Pillars" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-heading font-bold text-[#C9A227]">
                {stat.value}
              </div>
              <div className="text-xs font-body text-white/50 tracking-wide mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-body text-white/30 tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[#C9A227]/40 to-transparent" />
      </motion.div>
    </section>
  );
}
