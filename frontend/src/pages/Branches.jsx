import PageHero from "../components/PageHero";
import { BRANCHES } from "../data/content";
import { MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Section({ data, colorKey, index }) {
  const accents = {
    marathi: { bar: "#0A192F", badge: "#D4AF37", bg: "#FBF9F6" },
    english: { bar: "#1A5F5A", badge: "#D4AF37", bg: "#F0F4F8" },
    colleges: { bar: "#D4AF37", badge: "#0A192F", bg: "#FFFFFF" },
  };
  const a = accents[colorKey];

  return (
    <section
      data-testid={`branches-${colorKey}`}
      className="py-20 md:py-28"
      style={{ backgroundColor: a.bg }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8 items-end mb-14">
          <div className="col-span-12 md:col-span-8">
            <div className="label-kicker mb-4" style={{ color: a.bar }}>
              Division {index.toString().padStart(2, "0")} · {data.kicker}
            </div>
            <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl text-[#0A192F] leading-[1.02] tracking-tight">
              {data.title}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            <div className="font-display text-7xl md:text-8xl leading-none" style={{ color: a.bar }}>
              {data.count.toString().padStart(2, "0")}
            </div>
            <div className="label-kicker text-[#4A5568] mt-2">Institutions</div>
          </div>
        </div>

        <div className="border-t border-[#0A192F]/10">
          {data.items.map((item, i) => (
            <motion.div
              key={item.slug || item.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="border-b border-[#0A192F]/10"
              data-testid={`branch-${colorKey}-${i}`}
            >
              <Link
                to={`/branches/${item.slug}`}
                className="group grid grid-cols-12 gap-4 md:gap-6 py-8 hover:bg-white/60 transition-colors -mx-2 md:-mx-4 px-2 md:px-4"
              >
                <div className="col-span-2 md:col-span-1">
                  <div className="font-display text-3xl md:text-4xl" style={{ color: a.bar }}>
                    {(i + 1).toString().padStart(2, "0")}
                  </div>
                </div>
                <div className="col-span-10 md:col-span-7">
                  <h3 className="font-display text-xl md:text-2xl text-[#0A192F] leading-tight group-hover:text-[#D4AF37] transition-colors flex items-start gap-3">
                    <span>{item.name}</span>
                    <ArrowUpRight
                      size={18}
                      className="mt-1 shrink-0 text-[#0A192F]/40 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </h3>
                  {item.established && (
                    <div className="label-kicker text-[#4A5568] mt-2">Estd. {item.established} · {item.medium}</div>
                  )}
                </div>
                <div className="col-span-12 md:col-span-4 flex items-start gap-2 text-[#4A5568]">
                  <MapPin size={14} className="mt-[5px] shrink-0" style={{ color: a.bar }} />
                  <span className="text-sm md:text-base font-light">{item.location}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Branches() {
  return (
    <div data-testid="branches-page">
      <PageHero
        kicker="Branches · Eleven Institutions"
        title={<>Our network across <span className="italic text-[#D4AF37]">rural</span> Maharashtra.</>}
        subtitle="Seven Marathi-medium schools, three English-medium schools, and three colleges — serving students across Ahmednagar, Jalna and Chhatrapati Sambhajinagar districts."
      />

      <Section data={BRANCHES.marathi} colorKey="marathi" index={1} />
      <Section data={BRANCHES.english} colorKey="english" index={2} />
      <Section data={BRANCHES.colleges} colorKey="colleges" index={3} />
    </div>
  );
}
