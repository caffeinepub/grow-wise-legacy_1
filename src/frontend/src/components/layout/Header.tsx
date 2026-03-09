import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Blog", href: "#blog" },
  { label: "Personal Growth", href: "#topics" },
  { label: "Wealth", href: "#topics" },
  { label: "Lifestyle", href: "#topics" },
  { label: "Tools", href: "#tools" },
  { label: "About", href: "#about" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      data-ocid="header.panel"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1F2933]/98 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-[#1F2933]/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2 group"
          >
            <span className="text-xl lg:text-2xl font-heading font-bold text-gold-gradient">
              Grow Wise
            </span>
            <span className="text-xs font-body text-white/40 tracking-widest uppercase self-end pb-0.5 hidden sm:block">
              Legacy
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.label}
                data-ocid="nav.link"
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2 text-sm font-body text-white/70 hover:text-[#C9A227] transition-colors duration-200 rounded-md hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Admin Link + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="/admin"
              className="hidden sm:block text-xs font-body text-white/40 hover:text-[#C9A227] transition-colors duration-200 border border-white/10 hover:border-[#C9A227]/40 px-3 py-1.5 rounded-md"
            >
              Admin
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white/70 hover:text-[#C9A227] transition-colors p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 py-3 pb-4">
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.label}
                data-ocid="nav.link"
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left px-4 py-2.5 text-sm font-body text-white/70 hover:text-[#C9A227] hover:bg-white/5 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <a
              href="/admin"
              className="block px-4 py-2.5 text-sm font-body text-white/40 hover:text-[#C9A227] transition-colors"
            >
              Admin Panel
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
