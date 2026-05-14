import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { ORG, ALL_BRANCHES } from "../data/content";
import { SECTION_LIST, EXTERNAL_BRANCH_URLS } from "../data/branchSections";

const ABOUT_LINKS = [
  { to: "/about", label: "About" },
  { to: "/vision", label: "Vision" },
  { to: "/leadership", label: "Leadership" },
];

const TOP_LINKS = [
  { to: "/", label: "Home" },
  { type: "about", label: "About" },
  { type: "branches", label: "Branches" },
  { to: "/admissions", label: "Admissions" },
  { to: "/news", label: "News" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

function Dropdown({ label, children, align = "left" }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => { cancelClose(); setOpen(true); }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="label-kicker text-[#4A5568] hover:text-[#0A192F] transition-colors flex items-center gap-1"
      >
        {label} <ChevronDown size={12} />
      </button>
      {open && (
        <div
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          className={`absolute top-full ${align === "right" ? "right-0" : "left-0"} pt-3 z-50`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function BranchesDropdown({ onNavigate }) {
  const [hovered, setHovered] = useState(ALL_BRANCHES[0]?.slug);
  const hoveredExternal = EXTERNAL_BRANCH_URLS[hovered];
  return (
    <div className="flex bg-[#FBF9F6] border border-[#0A192F]/15 shadow-xl min-w-[640px]">
      <ul className="w-[320px] border-r border-[#0A192F]/10 py-2">
        {ALL_BRANCHES.map((b) => {
          const ext = EXTERNAL_BRANCH_URLS[b.slug];
          const cls = `flex items-center justify-between gap-2 px-5 py-3 text-sm text-[#0A192F] transition-colors ${
            hovered === b.slug ? "bg-[#F0F4F8] text-[#1A5F5A]" : "hover:bg-[#F0F4F8]"
          }`;
          return (
            <li key={b.slug} onMouseEnter={() => setHovered(b.slug)}>
              {ext ? (
                <a
                  href={ext}
                  target="_blank"
                  rel="noreferrer"
                  onClick={onNavigate}
                  className={cls}
                >
                  <span className="leading-tight">{b.name}</span>
                  <ChevronRight size={14} className="shrink-0 opacity-60" />
                </a>
              ) : (
                <Link to={`/branches/${b.slug}`} onClick={onNavigate} className={cls}>
                  <span className="leading-tight">{b.name}</span>
                  <ChevronRight size={14} className="shrink-0 opacity-60" />
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      <ul className="w-[320px] py-2">
        {hoveredExternal ? (
          <li className="px-5 py-4 text-sm text-[#4A5568]">
            Opens the official website
            <a
              href={hoveredExternal}
              target="_blank"
              rel="noreferrer"
              onClick={onNavigate}
              className="block mt-2 label-kicker text-[#D4AF37] hover:text-[#0A192F] transition-colors break-all"
            >
              {hoveredExternal} ↗
            </a>
          </li>
        ) : (
          SECTION_LIST.map((s) => (
            <li key={s.key}>
              <Link
                to={`/branches/${hovered}/${s.key}`}
                onClick={onNavigate}
                className="block px-5 py-3 text-sm text-[#0A192F] hover:bg-[#F0F4F8] hover:text-[#1A5F5A] transition-colors"
              >
                {s.label}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

function AboutDropdown({ onNavigate }) {
  return (
    <ul className="bg-[#FBF9F6] border border-[#0A192F]/15 shadow-xl min-w-[200px] py-2">
      {ABOUT_LINKS.map((l) => (
        <li key={l.to}>
          <Link
            to={l.to}
            onClick={onNavigate}
            className="block px-5 py-3 text-sm text-[#0A192F] hover:bg-[#F0F4F8] hover:text-[#1A5F5A] transition-colors"
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileExpand, setMobileExpand] = useState({});
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileExpand({});
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  const toggleMobile = (k) => setMobileExpand((p) => ({ ...p, [k]: !p[k] }));

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
            <a href={`tel:${ORG.phones[0]}`} className="link-underline">+91 {ORG.phones[0]}</a>
            <span className="opacity-40">/</span>
            <a href={`mailto:${ORG.email}`} className="link-underline">{ORG.email}</a>
          </div>
        </div>
      </div>

      {/* main bar */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 border border-[#0A192F] flex items-center justify-center">
            <span className="font-display text-lg leading-none text-[#0A192F]">Om</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-[17px] md:text-[18px] text-[#0A192F] font-semibold">Om Shivkrupa</div>
            <div className="label-kicker text-[#4A5568]">Shikshan Prasarak Mandal</div>
          </div>
        </Link>

        {/* desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {TOP_LINKS.map((l) => {
            if (l.type === "about") {
              return (
                <Dropdown key="about" label={l.label}>
                  <AboutDropdown />
                </Dropdown>
              );
            }
            if (l.type === "branches") {
              return (
                <Dropdown key="branches" label={l.label}>
                  <BranchesDropdown />
                </Dropdown>
              );
            }
            return (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `label-kicker transition-colors duration-300 link-underline ${
                    isActive ? "text-[#0A192F]" : "text-[#4A5568] hover:text-[#0A192F]"
                  }`
                }
              >
                {l.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/admissions"
            className="hidden md:inline-flex label-kicker bg-[#0A192F] text-[#FBF9F6] hover:bg-[#D4AF37] hover:text-[#0A192F] transition-colors duration-300 px-6 py-3"
          >
            Apply Now
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-11 h-11 border border-[#0A192F]/20 flex items-center justify-center text-[#0A192F]"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* mobile nav */}
      {open && (
        <div className="lg:hidden border-t border-[#0A192F]/10 bg-[#FBF9F6] max-h-[80vh] overflow-y-auto">
          <nav className="px-6 py-4 flex flex-col">
            {TOP_LINKS.map((l) => {
              if (l.type === "about") {
                return (
                  <div key="about" className="border-b border-[#0A192F]/10">
                    <button
                      className="w-full py-4 label-kicker text-left text-[#4A5568] flex items-center justify-between"
                      onClick={() => toggleMobile("about")}
                    >
                      About <ChevronDown size={14} className={mobileExpand.about ? "rotate-180 transition" : "transition"} />
                    </button>
                    {mobileExpand.about && (
                      <ul className="pb-3 pl-3">
                        {ABOUT_LINKS.map((al) => (
                          <li key={al.to}>
                            <Link to={al.to} className="block py-2 text-sm text-[#0A192F]">{al.label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              }
              if (l.type === "branches") {
                return (
                  <div key="branches" className="border-b border-[#0A192F]/10">
                    <button
                      className="w-full py-4 label-kicker text-left text-[#4A5568] flex items-center justify-between"
                      onClick={() => toggleMobile("branches")}
                    >
                      Branches <ChevronDown size={14} className={mobileExpand.branches ? "rotate-180 transition" : "transition"} />
                    </button>
                    {mobileExpand.branches && (
                      <ul className="pb-3 pl-3 space-y-1">
                        {ALL_BRANCHES.map((b) => (
                          <li key={b.slug}>
                            <button
                              onClick={() => toggleMobile(`b-${b.slug}`)}
                              className="w-full text-left py-2 text-sm text-[#0A192F] flex items-center justify-between"
                            >
                              <span>{b.name}</span>
                              <ChevronDown size={12} className={mobileExpand[`b-${b.slug}`] ? "rotate-180" : ""} />
                            </button>
                            {mobileExpand[`b-${b.slug}`] && (
                              <ul className="pl-3 pb-2">
                                <li>
                                  <Link to={`/branches/${b.slug}`} className="block py-1.5 text-xs text-[#1A5F5A]">Overview</Link>
                                </li>
                                {SECTION_LIST.map((s) => (
                                  <li key={s.key}>
                                    <Link to={`/branches/${b.slug}/${s.key}`} className="block py-1.5 text-xs text-[#4A5568]">
                                      {s.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              }
              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `py-4 border-b border-[#0A192F]/10 label-kicker ${isActive ? "text-[#0A192F]" : "text-[#4A5568]"}`
                  }
                >
                  {l.label}
                </NavLink>
              );
            })}
            <Link to="/admissions" className="mt-4 label-kicker text-center bg-[#0A192F] text-[#FBF9F6] px-6 py-4">Apply Now</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
