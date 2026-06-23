import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { ORG, NAV_LINKS } from "../data/content";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="bg-[#0A192F] text-[#FBF9F6]">
      {/* Massive brand statement */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-24 pb-16 border-b border-white/10">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-8">
            <div className="label-kicker text-[#D4AF37] mb-6">Since 1996 · Maharashtra</div>
            <h2 className="font-display font-medium text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              Education that
              <br />
              <span className="italic text-[#D4AF37]">reaches</span> the last village.
            </h2>
            <p className="font-body font-light text-white/70 text-base md:text-lg mt-8 max-w-2xl leading-relaxed">
              Om Shivkrupa Shikshan Prasarak Mandal serves rural and marginalized communities across Ahmednagar, Jalna and Chhatrapati Sambhajinagar through 12 institutions spanning primary, secondary and higher-secondary education.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 md:pl-8 md:border-l border-white/10">
            <div className="label-kicker text-[#D4AF37] mb-4">Accepts Donations</div>
            <div className="font-display text-2xl md:text-3xl leading-tight mb-4">
              Tax-exempt under <br />
              <span className="text-[#D4AF37]">12 AA & 80 G</span>
            </div>
            <a
              href={`tel:${ORG.phones[2]}`}
              data-testid="footer-donate-link"
              className="inline-flex items-center gap-2 label-kicker border-b border-[#D4AF37] pb-2 hover:text-[#D4AF37] transition-colors"
            >
              Donate · +91 {ORG.phones[2]} <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* 4-col utility grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 grid grid-cols-2 md:grid-cols-12 gap-10">
        <div className="col-span-2 md:col-span-4">
          <div className="label-kicker text-[#D4AF37] mb-5">Trust Address</div>
          <div className="font-body text-white/80 leading-relaxed text-sm md:text-base flex gap-3">
            <MapPin size={16} className="mt-1 text-[#D4AF37] shrink-0" />
            <div>
              {ORG.address.line1}<br />
              {ORG.address.line2}<br />
              {ORG.address.line3}
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-3">
          <div className="label-kicker text-[#D4AF37] mb-5">Contact</div>
          <ul className="space-y-3 text-sm md:text-base">
            {ORG.phones.map((p) => (
              <li key={p} className="flex items-center gap-3 text-white/80">
                <Phone size={14} className="text-[#D4AF37]" />
                <a href={`tel:${p}`} className="link-underline">+91 {p}</a>
              </li>
            ))}
            <li className="flex items-center gap-3 text-white/80">
              <Mail size={14} className="text-[#D4AF37]" />
              <a href={`mailto:${ORG.email}`} className="link-underline break-all">{ORG.email}</a>
            </li>
          </ul>
        </div>

        <div className="col-span-1 md:col-span-3">
          <div className="label-kicker text-[#D4AF37] mb-5">Navigate</div>
          <ul className="space-y-3 text-sm md:text-base">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-testid={`footer-nav-${l.label.toLowerCase()}-link`}
                  className="text-white/80 hover:text-[#D4AF37] link-underline transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-2">
          <div className="label-kicker text-[#D4AF37] mb-5">Registration</div>
          <div className="text-white/70 text-xs md:text-sm leading-relaxed">
            Maharashtra Society Act 21 of 1860
            <div className="mt-2 opacity-70">Reg. No. Maha/54/1996</div>
            <div className="opacity-70">F-3437 (AUR)</div>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="label-kicker text-white/50">
            © {new Date().getFullYear()} {ORG.name}. All rights reserved.
          </div>
          <div className="label-kicker text-white/50">
            Designed & Developed by{" "}
            <a
              href="https://ksoftsolution.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors"
            >
              KSoft Solution
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
