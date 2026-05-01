import PageHero from "../components/PageHero";
import { EXECUTIVE, ORG } from "../data/content";
import { motion } from "framer-motion";

export default function About() {
  const milestones = [
    { year: "1996", event: "Founded and registered under Maharashtra Society Act 21 of 1860" },
    { year: "1996", event: "Registered under Mumbai Public Trust Act — F-3437 (AUR)" },
    { year: "2000s", event: "Expansion to Marathi-medium primary & secondary schools" },
    { year: "2010s", event: "Launch of English-medium schools & junior colleges" },
    { year: "Today", event: "11 institutions across Ahmednagar, Jalna & Aurangabad districts" },
  ];

  return (
    <div data-testid="about-page">
      <PageHero
        kicker="About · Who We Are"
        title={<>The Mandal &mdash; a society for <span className="italic text-[#D4AF37]">rural</span> uplift.</>}
        subtitle="OSSPM is a non-governing educational trust founded in 1996 to serve the rural and marginalized communities of Maharashtra — one village, one school, one student at a time."
      />

      {/* Mission / Long form */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-4">
            <div className="label-kicker text-[#1A5F5A] mb-4">Our Mission</div>
            <h2 className="font-display font-medium text-4xl md:text-5xl text-[#0A192F] leading-tight tracking-tight">
              Education, <span className="italic">dignity</span>, and self-reliance.
            </h2>
            <div className="mt-10 p-6 border border-[#0A192F]/10 bg-[#F0F4F8]">
              <div className="label-kicker text-[#4A5568] mb-2">Registration</div>
              <p className="font-body text-[#0A192F]/80 text-sm leading-relaxed">
                {ORG.registration}
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 md:pl-10 md:border-l border-[#0A192F]/10 space-y-6">
            <p className="font-body font-light text-[#0A192F]/85 text-lg leading-relaxed first-letter:font-display first-letter:text-7xl first-letter:float-left first-letter:mr-4 first-letter:leading-[0.85] first-letter:text-[#D4AF37]">
              OM SHIVKRUPA SHIKSHAN PRASARAK MANDAL, AURANGABAD (OSSPM) is a Non-governing Organization working across the state of Maharashtra. Established with the aim to provide educational facilities to rural areas and empower the marginalized sections of society, the Mandal works to improve the socio-economic status of women, the poor, and SC/ST communities.
            </p>
            <p className="font-body font-light text-[#4A5568] text-base md:text-lg leading-relaxed">
              The aim of the NGO is also to bring development change in health, education, and environment. The society makes sustained service efforts for the growth and development of weaker sections — including SC / ST women and children, bonded labour and the economically backward — through awareness campaigns, micro-credit and welfare activities.
            </p>
            <p className="font-body font-light text-[#4A5568] text-base md:text-lg leading-relaxed">
              The Mandal seeks to remove untouchability and bring scientific interaction into the community so it can grow through self-help and natural help. The organization&rsquo;s role is that of a facilitator — helping mobilise communities and channel natural, human and material resources for their own development.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#0A192F] text-[#FBF9F6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
          <div className="label-kicker text-[#D4AF37] mb-4">Our Journey</div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight tracking-tight mb-16">
            Twenty-nine years of <span className="italic">service.</span>
          </h2>
          <div className="grid grid-cols-12 gap-6">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`col-span-12 md:col-span-6 lg:col-span-4 p-8 border border-white/10 ${
                  i % 2 === 0 ? "bg-white/[0.03]" : ""
                }`}
                data-testid={`milestone-${i}`}
              >
                <div className="font-display text-4xl md:text-5xl text-[#D4AF37]">{m.year}</div>
                <div className="mt-4 label-kicker text-white/50">Milestone</div>
                <p className="font-body text-white/85 mt-2 leading-relaxed">{m.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Table */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
        <div className="grid grid-cols-12 gap-8 mb-12 items-end">
          <div className="col-span-12 md:col-span-8">
            <div className="label-kicker text-[#1A5F5A] mb-4">Executive Committee</div>
            <h2 className="font-display font-medium text-4xl md:text-5xl text-[#0A192F] leading-tight tracking-tight">
              The people who steer the Mandal.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            <p className="font-body text-[#4A5568] text-sm md:text-base">
              An experienced committee of educators and administrators guiding OSSPM&rsquo;s academic and social mandate.
            </p>
          </div>
        </div>

        <div className="border border-[#0A192F]/10 overflow-hidden" data-testid="executive-table">
          <table className="w-full text-left">
            <thead className="bg-[#0A192F] text-[#FBF9F6]">
              <tr className="label-kicker">
                <th className="py-5 px-6 md:px-8 font-medium">Member</th>
                <th className="py-5 px-6 md:px-8 font-medium hidden md:table-cell">Qualification</th>
                <th className="py-5 px-6 md:px-8 font-medium text-right">Designation</th>
              </tr>
            </thead>
            <tbody>
              {EXECUTIVE.map((e, i) => (
                <tr
                  key={e.name}
                  className={`border-b border-[#0A192F]/10 last:border-b-0 hover:bg-[#F0F4F8] transition-colors ${
                    i === 0 ? "bg-[#FBF9F6]" : "bg-white"
                  }`}
                  data-testid={`executive-row-${i}`}
                >
                  <td className="py-6 px-6 md:px-8">
                    <div className="font-display text-xl md:text-2xl text-[#0A192F] leading-tight">{e.name}</div>
                    <div className="label-kicker text-[#4A5568] mt-2 md:hidden">{e.qualification}</div>
                  </td>
                  <td className="py-6 px-6 md:px-8 font-body text-[#4A5568] hidden md:table-cell">{e.qualification}</td>
                  <td className="py-6 px-6 md:px-8 text-right">
                    <span className={`label-kicker ${e.role === "President" ? "text-[#D4AF37]" : "text-[#1A5F5A]"}`}>
                      {e.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
