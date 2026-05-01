import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, School, BookOpen, Heart } from "lucide-react";
import { ORG, BRANCHES, NEWS, IMAGES } from "../data/content";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Home() {
  const stats = [
    { value: "29", label: "Years of Service" },
    { value: "11", label: "Institutions" },
    { value: "3", label: "Districts Served" },
    { value: "12AA · 80G", label: "Tax-Exempt Trust" },
  ];

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="relative bg-[#FBF9F6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-10">
          <div className="grid grid-cols-12 gap-8 items-end">
            <motion.div
              className="col-span-12 lg:col-span-7"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <div className="label-kicker text-[#4A5568] mb-6">
                Om Shivkrupa Shikshan Prasarak Mandal · Est. 1996
              </div>
              <h1 className="font-display font-medium text-5xl md:text-6xl lg:text-[92px] leading-[0.95] tracking-tight text-[#0A192F]">
                Empowering
                <br />
                <span className="italic">Rural</span> Maharashtra
                <br />
                through <span className="text-[#D4AF37]">education.</span>
              </h1>
              <p className="font-body font-light text-[#4A5568] text-base md:text-lg mt-8 max-w-xl leading-relaxed">
                A non-governing educational trust serving Ahmednagar, Jalna and Aurangabad — uplifting marginalized communities through 11 schools and colleges rooted in scholarship, dignity and access.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/admissions"
                  data-testid="hero-cta-admissions"
                  className="inline-flex items-center gap-3 label-kicker bg-[#0A192F] text-[#FBF9F6] hover:bg-[#D4AF37] hover:text-[#0A192F] transition-colors duration-300 px-8 py-4"
                >
                  Admissions 2026 <ArrowRight size={14} />
                </Link>
                <Link
                  to="/about"
                  data-testid="hero-cta-about"
                  className="inline-flex items-center gap-3 label-kicker border border-[#0A192F] text-[#0A192F] hover:bg-[#0A192F] hover:text-[#FBF9F6] transition-colors duration-300 px-8 py-4"
                >
                  Our Story
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="col-span-12 lg:col-span-5 relative"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <div className="relative aspect-[4/5] overflow-hidden grain">
                <img
                  src={IMAGES.heroCampus}
                  alt="OSSPM campus at golden hour"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/60 via-[#0A192F]/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-[#FBF9F6]">
                  <div className="label-kicker text-[#D4AF37] mb-2">Featured Campus</div>
                  <div className="font-display text-2xl md:text-3xl leading-tight">
                    Om Madhyamic Vidyalay — Sahakar Nagar
                  </div>
                </div>
              </div>
              {/* gold accent */}
              <div className="hidden md:block absolute -bottom-4 -left-4 w-24 h-24 border-2 border-[#D4AF37] -z-0" />
            </motion.div>
          </div>
        </div>

        {/* Scrolling Ticker */}
        <div className="bg-[#0A192F] text-[#FBF9F6] overflow-hidden border-y border-[#D4AF37]/30">
          <div className="flex whitespace-nowrap animate-ticker py-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-16 px-8 shrink-0">
                <span className="font-display italic text-2xl">Established 1996</span>
                <span className="text-[#D4AF37]">✦</span>
                <span className="label-kicker">6 Marathi Schools</span>
                <span className="text-[#D4AF37]">✦</span>
                <span className="label-kicker">2 English Schools</span>
                <span className="text-[#D4AF37]">✦</span>
                <span className="label-kicker">3 Colleges</span>
                <span className="text-[#D4AF37]">✦</span>
                <span className="font-display italic text-2xl">Rural Maharashtra</span>
                <span className="text-[#D4AF37]">✦</span>
                <span className="label-kicker">12 AA · 80 G Trust</span>
                <span className="text-[#D4AF37]">✦</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-8 md:py-10 px-4 md:px-8 ${
                i < 3 ? "md:border-r border-[#0A192F]/10" : ""
              } ${i < 2 ? "border-b md:border-b-0 border-[#0A192F]/10" : ""}`}
            >
              <div className="font-display text-5xl md:text-6xl text-[#0A192F] leading-none">{s.value}</div>
              <div className="label-kicker text-[#4A5568] mt-4">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SNIPPET */}
      <section className="bg-[#F0F4F8]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 grid grid-cols-12 gap-10 items-start">
          <div className="col-span-12 md:col-span-5">
            <div className="label-kicker text-[#1A5F5A] mb-4">The Mandal · Since 1996</div>
            <h2 className="font-display font-medium text-4xl md:text-5xl text-[#0A192F] leading-[1.05] tracking-tight">
              A society built to serve the <span className="italic">least-reached.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:pl-6 md:border-l border-[#0A192F]/10">
            <p className="font-body font-light text-[#0A192F]/80 text-base md:text-lg leading-relaxed">
              Registered under the Maharashtra Society Registration Act 21 of 1860 and the Mumbai Public Trust Act of 1950, OSSPM was founded in 1996 with a clear mandate — to provide quality educational facilities to rural Maharashtra and empower marginalized sections of society.
            </p>
            <p className="font-body font-light text-[#4A5568] text-base md:text-lg leading-relaxed mt-6">
              Our role is that of a facilitator — helping communities mobilise, access resources and grow through self-help.
            </p>
            <Link
              to="/about"
              data-testid="home-about-more-link"
              className="mt-8 inline-flex items-center gap-2 label-kicker border-b border-[#0A192F] pb-2 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
            >
              Discover our story <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* BRANCHES BENTO */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
        <div className="flex items-end justify-between mb-12 gap-8 flex-wrap">
          <div>
            <div className="label-kicker text-[#4A5568] mb-4">Our Network</div>
            <h2 className="font-display font-medium text-4xl md:text-5xl text-[#0A192F] leading-tight tracking-tight max-w-2xl">
              Eleven institutions. Three districts. One mission.
            </h2>
          </div>
          <Link
            to="/branches"
            data-testid="home-branches-more-link"
            className="label-kicker border-b border-[#0A192F] pb-2 hover:text-[#D4AF37] hover:border-[#D4AF37]"
          >
            View all branches →
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Marathi */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="col-span-12 md:col-span-7 border border-[#0A192F]/10 p-8 md:p-12 bg-white hover:bg-[#F0F4F8] transition-colors group"
            data-testid="home-branch-marathi"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 border border-[#0A192F] flex items-center justify-center">
                <School size={18} className="text-[#0A192F]" />
              </div>
              <div className="font-display text-6xl md:text-7xl text-[#D4AF37] leading-none">06</div>
            </div>
            <div className="label-kicker text-[#4A5568] mt-10 mb-3">Primary & Secondary</div>
            <h3 className="font-display text-3xl md:text-4xl text-[#0A192F] leading-tight">{BRANCHES.marathi.title}</h3>
            <p className="font-body text-[#4A5568] mt-4 max-w-md">
              Marathi-medium schools rooted in rural communities across Ahmednagar, Jalna and Aurangabad districts.
            </p>
          </motion.div>

          {/* English */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="col-span-12 md:col-span-5 border border-[#0A192F]/10 p-8 md:p-12 bg-[#0A192F] text-[#FBF9F6] hover:bg-[#0A192F]/95 transition-colors"
            data-testid="home-branch-english"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 border border-[#D4AF37] flex items-center justify-center">
                <BookOpen size={18} className="text-[#D4AF37]" />
              </div>
              <div className="font-display text-6xl md:text-7xl text-[#D4AF37] leading-none">02</div>
            </div>
            <div className="label-kicker text-[#D4AF37] mt-10 mb-3">CBSE / State Medium</div>
            <h3 className="font-display text-3xl md:text-4xl leading-tight">{BRANCHES.english.title}</h3>
            <p className="font-body text-white/70 mt-4">
              English-medium schooling designed for bilingual confidence and urban career readiness.
            </p>
          </motion.div>

          {/* Colleges */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
            className="col-span-12 border border-[#0A192F]/10 p-8 md:p-12 bg-white hover:bg-[#F0F4F8] transition-colors"
            data-testid="home-branch-colleges"
          >
            <div className="grid grid-cols-12 gap-6 items-end">
              <div className="col-span-12 md:col-span-7">
                <div className="w-12 h-12 border border-[#0A192F] flex items-center justify-center mb-8">
                  <GraduationCap size={18} className="text-[#0A192F]" />
                </div>
                <div className="label-kicker text-[#4A5568] mb-3">Higher Secondary & Junior</div>
                <h3 className="font-display text-3xl md:text-4xl text-[#0A192F] leading-tight">{BRANCHES.colleges.title}</h3>
                <p className="font-body text-[#4A5568] mt-4 max-w-lg">
                  Junior and higher-secondary colleges preparing rural students for state and national entrance examinations.
                </p>
              </div>
              <div className="col-span-12 md:col-span-5 md:text-right">
                <div className="font-display text-7xl md:text-9xl text-[#D4AF37] leading-none">03</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEWS STRIP */}
      <section className="bg-[#0A192F] text-[#FBF9F6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
          <div className="flex items-end justify-between gap-8 flex-wrap mb-12">
            <div>
              <div className="label-kicker text-[#D4AF37] mb-4">Latest · Updates</div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight tracking-tight">
                Announcements from the Mandal
              </h2>
            </div>
            <Link
              to="/news"
              data-testid="home-news-more-link"
              className="label-kicker border-b border-[#D4AF37] pb-2 text-[#D4AF37] hover:opacity-80"
            >
              All news →
            </Link>
          </div>

          <div className="divide-y divide-white/10">
            {NEWS.slice(0, 3).map((n) => (
              <Link
                key={n.id}
                to="/news"
                data-testid={`home-news-${n.id}`}
                className="group grid grid-cols-12 gap-6 py-8 hover:bg-white/[0.02] transition-colors -mx-4 px-4"
              >
                <div className="col-span-12 md:col-span-3 label-kicker text-[#D4AF37]">{n.date}</div>
                <div className="col-span-12 md:col-span-7">
                  <div className="label-kicker text-white/50 mb-2">{n.category}</div>
                  <h3 className="font-display text-2xl md:text-3xl leading-snug group-hover:text-[#D4AF37] transition-colors">
                    {n.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-2 md:text-right text-white/60 group-hover:text-[#D4AF37]">
                  <ArrowRight className="inline" size={18} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DONATION BANNER */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
        <div className="border border-[#0A192F]/10 p-10 md:p-16 grid grid-cols-12 gap-8 items-center bg-[#FBF9F6]">
          <div className="col-span-12 md:col-span-8">
            <div className="flex items-center gap-3 mb-4">
              <Heart size={18} className="text-[#D4AF37]" />
              <div className="label-kicker text-[#1A5F5A]">Support OSSPM</div>
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-[#0A192F] leading-tight">
              Every contribution builds a <span className="italic text-[#D4AF37]">classroom</span>, a scholarship, a future.
            </h2>
            <p className="font-body text-[#4A5568] text-base md:text-lg mt-6 max-w-2xl">
              OSSPM is authorised to receive tax-exempt donations under Sections 12 AA & 80 G of the Income Tax Act.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            <a
              href={`tel:${ORG.phones[2]}`}
              data-testid="home-donate-link"
              className="inline-flex items-center gap-3 label-kicker bg-[#0A192F] text-[#FBF9F6] hover:bg-[#D4AF37] hover:text-[#0A192F] transition-colors duration-300 px-8 py-5"
            >
              Donate · +91 {ORG.phones[2]} <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
