import PageHero from "../components/PageHero";
import { VISION_MISSION, VALUES, ORG } from "../data/content";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Vision() {
  return (
    <div data-testid="vision-page">
      <PageHero
        kicker="Vision · Mission · Values"
        title={
          <>
            Why the <span className="italic text-[#D4AF37]">Mandal</span> exists.
          </>
        }
        subtitle="A clear north-star and the principles that guide every classroom, every scholarship and every village we serve."
      />

      {/* Vision */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
        <div className="grid grid-cols-12 gap-10 items-start">
          <div className="col-span-12 md:col-span-4">
            <div className="label-kicker text-[#1A5F5A] mb-4">01 · Our Vision</div>
            <h2 className="font-display font-medium text-4xl md:text-5xl text-[#0A192F] leading-tight tracking-tight">
              The horizon we walk toward.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-8 md:pl-10 md:border-l border-[#0A192F]/10">
            <p className="font-display text-2xl md:text-3xl lg:text-4xl text-[#0A192F]/85 leading-snug first-letter:text-[#D4AF37] first-letter:text-7xl first-letter:float-left first-letter:mr-4 first-letter:font-display first-letter:leading-[0.85]">
              {VISION_MISSION.vision}
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#0A192F] text-[#FBF9F6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
          <div className="grid grid-cols-12 gap-10 items-end mb-14">
            <div className="col-span-12 md:col-span-8">
              <div className="label-kicker text-[#D4AF37] mb-4">02 · Our Mission</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight">
                Four <span className="italic">commitments</span> we keep.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 md:text-right">
              <p className="font-body text-white/60 text-sm md:text-base">
                These commitments shape how every OSSPM institution is run, funded and evaluated.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {VISION_MISSION.mission.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="col-span-12 md:col-span-6 p-8 border border-white/10 hover:bg-white/[0.04] transition-colors"
                data-testid={`mission-${i}`}
              >
                <div className="font-display text-5xl text-[#D4AF37]">
                  {(i + 1).toString().padStart(2, "0")}
                </div>
                <p className="font-body font-light text-white/85 text-base md:text-lg mt-5 leading-relaxed">{m}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#FBF9F6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
          <div className="grid grid-cols-12 gap-10 items-end mb-14">
            <div className="col-span-12 md:col-span-8">
              <div className="label-kicker text-[#1A5F5A] mb-4">03 · Core Values</div>
              <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl text-[#0A192F] leading-tight tracking-tight">
                Six principles, written in <span className="italic">stone.</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 md:text-right">
              <p className="font-body text-[#4A5568] text-sm md:text-base">
                These are the values OSSPM&rsquo;s founding committee codified in 1996 — and that the management body still holds itself to.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-0 border-t border-l border-[#0A192F]/10">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="col-span-12 md:col-span-6 lg:col-span-4 p-8 md:p-10 border-r border-b border-[#0A192F]/10 bg-white hover:bg-[#F0F4F8] transition-colors"
                data-testid={`value-${i}`}
              >
                <div className="font-display text-4xl md:text-5xl text-[#D4AF37]">{v.n}</div>
                <h3 className="font-display text-xl md:text-2xl text-[#0A192F] mt-5 leading-tight">{v.title}</h3>
                <p className="font-body font-light text-[#4A5568] text-base mt-3 leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0A192F] text-[#FBF9F6] border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 md:col-span-8">
            <div className="label-kicker text-[#D4AF37] mb-4">Be part of the mission</div>
            <h3 className="font-display text-3xl md:text-4xl leading-tight">
              Every contribution builds a classroom, a scholarship, a future.
            </h3>
            <p className="font-body text-white/70 mt-4 max-w-2xl">
              {ORG.name} is authorised to receive tax-exempt donations under Sections 12 AA & 80 G of the Income Tax Act.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right flex flex-wrap gap-3 md:justify-end">
            <Link
              to="/contact"
              data-testid="vision-cta-contact"
              className="label-kicker bg-[#D4AF37] text-[#0A192F] hover:bg-[#FBF9F6] transition-colors px-7 py-4"
            >
              Contact the Trust
            </Link>
            <Link
              to="/leadership"
              data-testid="vision-cta-leadership"
              className="label-kicker border border-white/30 text-[#FBF9F6] hover:bg-[#FBF9F6] hover:text-[#0A192F] transition-colors px-7 py-4"
            >
              Meet the Leadership
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
