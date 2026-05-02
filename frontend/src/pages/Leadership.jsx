import PageHero from "../components/PageHero";
import { LEADERSHIP, EXECUTIVE, ORG } from "../data/content";
import { motion } from "framer-motion";

function initials(name) {
  return name
    .replace(/^(Mr\.|Mrs\.|Prof\.|Dr\.)\s*/, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

export default function Leadership() {
  return (
    <div data-testid="leadership-page">
      <PageHero
        kicker="Leadership · Management Body"
        title={
          <>
            The people who carry the <span className="italic text-[#D4AF37]">Mandal.</span>
          </>
        }
        subtitle="Educators, administrators and social workers — many of whom have been part of OSSPM's journey since 1996."
      />

      {/* Featured leadership */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
        <div className="grid grid-cols-12 gap-8 mb-14 items-end">
          <div className="col-span-12 md:col-span-8">
            <div className="label-kicker text-[#1A5F5A] mb-4">Featured · Office Bearers</div>
            <h2 className="font-display font-medium text-4xl md:text-5xl text-[#0A192F] leading-tight tracking-tight">
              The principal office bearers.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            <p className="font-body text-[#4A5568] text-sm md:text-base">
              The President, Secretary and Administration Lead steer the day-to-day work of the trust.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {LEADERSHIP.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="col-span-12 md:col-span-4 border border-[#0A192F]/10 bg-white group hover:bg-[#F0F4F8] transition-colors"
              data-testid={`leadership-feature-${i}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#0A192F]">
                {p.photo ? (
                  <img
                    src={p.photo}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-[1200ms] ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0A192F] to-[#1A5F5A]">
                    <div className="font-display text-[140px] leading-none text-[#D4AF37]/90">
                      {initials(p.name)}
                    </div>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A192F]/80 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-5 label-kicker text-[#D4AF37]">
                  {(i + 1).toString().padStart(2, "0")} · {p.role}
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="font-display text-xl md:text-2xl text-[#0A192F] leading-tight group-hover:text-[#D4AF37] transition-colors">
                  {p.name}
                </h3>
                <div className="label-kicker text-[#4A5568] mt-3">{p.qualification}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Full Executive Committee */}
      <section className="bg-[#F0F4F8] border-t border-[#0A192F]/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
          <div className="grid grid-cols-12 gap-8 mb-12 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="label-kicker text-[#1A5F5A] mb-4">Full Roster · Executive Committee</div>
              <h2 className="font-display font-medium text-4xl md:text-5xl text-[#0A192F] leading-tight tracking-tight">
                Every member of the governing body.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-4 md:text-right">
              <p className="font-body text-[#4A5568] text-sm md:text-base">
                Officers and members listed in the Trust&rsquo;s registered constitution.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-0 border-t border-l border-[#0A192F]/10 bg-white">
            {EXECUTIVE.map((e, i) => (
              <motion.div
                key={e.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="col-span-12 md:col-span-6 lg:col-span-4 p-8 border-r border-b border-[#0A192F]/10 hover:bg-[#FBF9F6] transition-colors"
                data-testid={`executive-card-${i}`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-14 h-14 rounded-none border border-[#0A192F]/20 flex items-center justify-center bg-[#0A192F] text-[#D4AF37] font-display text-xl">
                    {initials(e.name)}
                  </div>
                  <span
                    className={`label-kicker ${
                      e.role === "President"
                        ? "text-[#D4AF37]"
                        : e.role.includes("Secretary") || e.role.includes("President") || e.role.includes("Treasurer")
                        ? "text-[#1A5F5A]"
                        : "text-[#4A5568]"
                    }`}
                  >
                    {e.role}
                  </span>
                </div>
                <h3 className="font-display text-lg md:text-xl text-[#0A192F] leading-tight">{e.name}</h3>
                <div className="label-kicker text-[#4A5568] mt-2">{e.qualification}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust info strip */}
      <section className="bg-[#0A192F] text-[#FBF9F6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-6">
            <div className="label-kicker text-[#D4AF37] mb-3">Registered Trust</div>
            <p className="font-body font-light text-white/80 leading-relaxed">{ORG.registration}</p>
          </div>
          <div className="col-span-12 md:col-span-6 md:pl-8 md:border-l border-white/10">
            <div className="label-kicker text-[#D4AF37] mb-3">Registered Office</div>
            <p className="font-body text-white/80 leading-relaxed">
              {ORG.address.line1}
              <br />
              {ORG.address.line2}
              <br />
              {ORG.address.line3}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
