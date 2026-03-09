import { useFadeUp } from "@/hooks/useFadeUp";

export function Footer() {
  const ref = useFadeUp<HTMLDivElement>();
  const year = new Date().getFullYear();

  return (
    <footer
      data-ocid="footer.panel"
      className="bg-[#141B22] border-t border-white/8 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-2xl font-heading font-bold text-gold-gradient mb-3">
              Grow Wise Legacy
            </div>
            <p className="font-body text-white/45 text-sm leading-relaxed max-w-xs">
              A knowledge platform for disciplined thinkers focused on growth,
              wealth, and meaningful living.
            </p>

            {/* Social placeholders */}
            <div className="flex gap-3 mt-5">
              {(["𝕏", "in", "▶"] as const).map((icon) => (
                <button
                  type="button"
                  key={icon}
                  className="w-8 h-8 rounded-md border border-white/10 text-white/40 hover:text-[#C9A227] hover:border-[#C9A227]/40 text-xs font-heading flex items-center justify-center transition-colors duration-200"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold text-white/80 text-sm mb-4 tracking-wide">
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "#home" },
                { label: "Blog", href: "#blog" },
                { label: "Tools", href: "#tools" },
                { label: "Guides", href: "#guides" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-white/40 text-sm hover:text-[#C9A227] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h4 className="font-heading font-semibold text-white/80 text-sm mb-4 tracking-wide">
              Topics
            </h4>
            <ul className="space-y-2.5">
              {[
                "Personal Growth",
                "Wealth",
                "Lifestyle",
                "Mindset",
                "Investing",
              ].map((topic) => (
                <li key={topic}>
                  <a
                    href="#topics"
                    className="font-body text-white/40 text-sm hover:text-[#C9A227] transition-colors duration-200"
                  >
                    {topic}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-white/30 text-xs">
            © {year} Grow Wise Legacy. All rights reserved.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-white/20 text-xs hover:text-white/40 transition-colors"
          >
            Built with ♥ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
