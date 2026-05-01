import PageHero from "../components/PageHero";
import { NEWS } from "../data/content";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function News() {
  const [featured, ...rest] = NEWS;

  return (
    <div data-testid="news-page">
      <PageHero
        kicker="News · Events · Notices"
        title={<>Announcements from the <span className="italic text-[#D4AF37]">Mandal.</span></>}
        subtitle="Admission cycles, scholarships, infrastructure updates, and community outreach — stay informed about OSSPM."
      />

      {/* Featured */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-12 gap-8 border border-[#0A192F]/10 bg-white hover:bg-[#F0F4F8] transition-colors p-8 md:p-14"
          data-testid="featured-news"
        >
          <div className="col-span-12 md:col-span-4">
            <div className="label-kicker text-[#1A5F5A]">Featured</div>
            <div className="font-display text-5xl md:text-6xl text-[#D4AF37] leading-none mt-4">
              {featured.date.split(" ")[0]}
            </div>
            <div className="label-kicker text-[#4A5568] mt-2">{featured.category}</div>
          </div>
          <div className="col-span-12 md:col-span-8 md:pl-8 md:border-l border-[#0A192F]/10">
            <h2 className="font-display font-medium text-3xl md:text-5xl text-[#0A192F] leading-[1.05] tracking-tight">
              {featured.title}
            </h2>
            <p className="font-body text-[#4A5568] text-base md:text-lg mt-6 leading-relaxed">
              {featured.excerpt}
            </p>
            <div className="mt-8 inline-flex items-center gap-2 label-kicker text-[#0A192F] border-b border-[#0A192F] pb-2 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors cursor-pointer">
              Read more <ArrowUpRight size={14} />
            </div>
          </div>
        </motion.article>
      </section>

      {/* Rest */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
        <div className="label-kicker text-[#4A5568] mb-8 pb-4 border-b border-[#0A192F]/10">
          All updates
        </div>
        <div className="divide-y divide-[#0A192F]/10">
          {rest.map((n, i) => (
            <motion.article
              key={n.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="grid grid-cols-12 gap-6 py-10 group hover:bg-white -mx-4 px-4 transition-colors"
              data-testid={`news-item-${n.id}`}
            >
              <div className="col-span-12 md:col-span-3">
                <div className="label-kicker text-[#1A5F5A]">{n.category}</div>
                <div className="font-display text-xl text-[#0A192F] mt-2">{n.date}</div>
              </div>
              <div className="col-span-12 md:col-span-8">
                <h3 className="font-display text-2xl md:text-3xl text-[#0A192F] leading-snug group-hover:text-[#D4AF37] transition-colors">
                  {n.title}
                </h3>
                <p className="font-body text-[#4A5568] mt-3 leading-relaxed">{n.excerpt}</p>
              </div>
              <div className="col-span-12 md:col-span-1 md:text-right text-[#0A192F] group-hover:text-[#D4AF37] transition-colors">
                <ArrowUpRight size={22} className="inline-block" />
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
