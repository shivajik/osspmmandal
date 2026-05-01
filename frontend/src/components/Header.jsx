import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, ORG } from "../data/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <header
      data-testid="site-header"
      className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "bg-[#FBF9F6]/90 border-b border-[#0A192F]/10" : "bg-[#FBF9F6]/60 border-b border-transparent"
      }`}
    >
      {/* top utility bar */}
      <div className="hidden md:block bg-[#0A192F] text-[#FBF9F6]">
        <div className="max-w-[1400px] mx-auto px-8 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-6 tracking-widest uppercase">
            <span>Estd. {ORG.founded}</span>
            <span className="opacity-60">·</span>
            <span>Reg. Maha/54/1996 · F-3437 (AUR)</span>
          </div>
          <div className="flex items-center gap-6">
            <a href={`tel:${ORG.phones[0]}`} className="link-underline" data-testid="top-phone-link">
              +91 {ORG.phones[0]}
            </a>
            <span className="opacity-40">/</span>
            <a href={`mailto:${ORG.email}`} className="link-underline" data-testid="top-email-link">
              {ORG.email}
            </a>
          </div>
        </div>
      </div>

      {/* main bar */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <Link to="/" data-testid="nav-logo-link" className="flex items-center gap-3 group">
          <div className="w-10 h-10 border border-[#0A192F] flex items-center justify-center">
            <span className="font-display text-lg leading-none text-[#0A192F]">Om</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-[17px] md:text-[18px] text-[#0A192F] font-semibold">
              Om Shivkrupa
            </div>
            <div className="label-kicker text-[#4A5568]">Shikshan Prasarak Mandal</div>
          </div>
        </Link>

        {/* desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              data-testid={`nav-${l.label.toLowerCase()}-link`}
              className={({ isActive }) =>
                `label-kicker transition-colors duration-300 link-underline ${
                  isActive ? "text-[#0A192F]" : "text-[#4A5568] hover:text-[#0A192F]"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/admissions"
            data-testid="header-cta-admissions"
            className="hidden md:inline-flex label-kicker bg-[#0A192F] text-[#FBF9F6] hover:bg-[#D4AF37] hover:text-[#0A192F] transition-colors duration-300 px-6 py-3"
          >
            Apply Now
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            data-testid="mobile-menu-toggle"
            className="lg:hidden w-11 h-11 border border-[#0A192F]/20 flex items-center justify-center text-[#0A192F]"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* mobile nav */}
      {open && (
        <div data-testid="mobile-menu" className="lg:hidden border-t border-[#0A192F]/10 bg-[#FBF9F6]">
          <nav className="px-6 py-6 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                data-testid={`mobile-nav-${l.label.toLowerCase()}-link`}
                className={({ isActive }) =>
                  `py-4 border-b border-[#0A192F]/10 label-kicker ${
                    isActive ? "text-[#0A192F]" : "text-[#4A5568]"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/admissions"
              data-testid="mobile-cta-admissions"
              className="mt-4 label-kicker text-center bg-[#0A192F] text-[#FBF9F6] px-6 py-4"
            >
              Apply Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
