import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHero from "../components/PageHero";
import { ADMISSION_STEPS, FAQ, ORG } from "../data/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { ArrowRight, FileText, Users, Phone } from "lucide-react";

export default function Admissions() {
  return (
    <div data-testid="admissions-page">
      <PageHero
        kicker="Admissions · 2026–27 Intake"
        title={<>Apply for a seat at <span className="italic text-[#D4AF37]">OSSPM.</span></>}
        subtitle="A transparent, merit-based admission process with fee concessions for SC/ST, EBC and first-generation rural learners."
      />

      {/* Quick info bar */}
      <section className="border-b border-[#0A192F]/10 bg-[#F0F4F8]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#0A192F]/10">
          <InfoCell icon={<FileText size={18} />} label="Intake Window" value="April – June 2026" />
          <InfoCell icon={<Users size={18} />} label="Eligible Programs" value="Marathi · English · Higher Secondary" />
          <InfoCell icon={<Phone size={18} />} label="Admissions Desk" value={`+91 ${ORG.phones[0]}`} />
        </div>
      </section>

      {/* Process */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
        <div className="grid grid-cols-12 gap-10 mb-16 items-end">
          <div className="col-span-12 md:col-span-8">
            <div className="label-kicker text-[#1A5F5A] mb-4">How to Apply</div>
            <h2 className="font-display font-medium text-4xl md:text-5xl text-[#0A192F] leading-tight tracking-tight">
              Four steps to enrolment.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            <p className="font-body text-[#4A5568]">
              Our admissions team assists every applicant — from the first enquiry to the day they begin classes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {ADMISSION_STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`col-span-12 md:col-span-6 lg:col-span-3 border border-[#0A192F]/10 p-8 min-h-[260px] flex flex-col justify-between ${
                i === 0 ? "bg-[#0A192F] text-[#FBF9F6]" : "bg-white"
              }`}
              data-testid={`admission-step-${i}`}
            >
              <div
                className={`font-display text-6xl md:text-7xl leading-none ${
                  i === 0 ? "text-[#D4AF37]" : "text-[#D4AF37]"
                }`}
              >
                {s.n}
              </div>
              <div>
                <h3
                  className={`font-display text-xl md:text-2xl leading-tight mb-3 ${
                    i === 0 ? "text-[#FBF9F6]" : "text-[#0A192F]"
                  }`}
                >
                  {s.title}
                </h3>
                <p
                  className={`font-body text-sm md:text-base leading-relaxed ${
                    i === 0 ? "text-white/70" : "text-[#4A5568]"
                  }`}
                >
                  {s.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Documents + FAQ */}
      <section className="bg-[#FBF9F6] border-t border-[#0A192F]/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-5">
            <div className="label-kicker text-[#1A5F5A] mb-4">Documents · Checklist</div>
            <h2 className="font-display font-medium text-4xl md:text-5xl text-[#0A192F] leading-tight tracking-tight">
              Bring these with you.
            </h2>
            <ul className="mt-10 border-t border-[#0A192F]/10" data-testid="documents-checklist">
              {[
                "Completed application form (from school office)",
                "Previous year's mark-sheet / leaving certificate",
                "Caste certificate (if applicable — SC / ST / OBC)",
                "Income certificate (for fee concession)",
                "Residence & identity proof (Aadhaar / ration)",
                "4 recent passport-size photographs",
                "Transfer certificate from previous institution",
              ].map((d, i) => (
                <li
                  key={i}
                  className="border-b border-[#0A192F]/10 py-4 flex items-start gap-4 text-[#0A192F]/85"
                >
                  <span className="font-display text-[#D4AF37] text-lg leading-none pt-1">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="font-body">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-7 md:pl-10 md:border-l border-[#0A192F]/10">
            <div className="label-kicker text-[#1A5F5A] mb-4">Frequently Asked</div>
            <h2 className="font-display font-medium text-4xl md:text-5xl text-[#0A192F] leading-tight tracking-tight mb-8">
              Admission FAQ
            </h2>
            <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
              {FAQ.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-[#0A192F]/10"
                  data-testid={`faq-item-${i}`}
                >
                  <AccordionTrigger className="text-left font-display text-lg md:text-xl text-[#0A192F] hover:text-[#D4AF37] hover:no-underline py-6">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-[#4A5568] text-base leading-relaxed pb-6">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0A192F] text-[#FBF9F6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 md:col-span-8">
            <div className="label-kicker text-[#D4AF37] mb-4">Still have questions?</div>
            <h2 className="font-display font-medium text-4xl md:text-5xl leading-tight tracking-tight">
              Talk to our admissions desk — <span className="italic text-[#D4AF37]">we&rsquo;re here for you.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right flex md:justify-end gap-3 flex-wrap">
            <Link
              to="/contact"
              data-testid="admissions-cta-contact"
              className="inline-flex items-center gap-3 label-kicker bg-[#D4AF37] text-[#0A192F] hover:bg-[#FBF9F6] transition-colors duration-300 px-8 py-4"
            >
              Contact Us <ArrowRight size={14} />
            </Link>
            <a
              href={`tel:${ORG.phones[0]}`}
              data-testid="admissions-cta-call"
              className="inline-flex items-center gap-3 label-kicker border border-[#FBF9F6] text-[#FBF9F6] hover:bg-[#FBF9F6] hover:text-[#0A192F] transition-colors duration-300 px-8 py-4"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoCell({ icon, label, value }) {
  return (
    <div className="px-6 md:px-10 py-6 flex items-center gap-4">
      <div className="w-11 h-11 border border-[#0A192F] flex items-center justify-center text-[#0A192F] shrink-0">
        {icon}
      </div>
      <div>
        <div className="label-kicker text-[#4A5568]">{label}</div>
        <div className="font-display text-lg md:text-xl text-[#0A192F] mt-1">{value}</div>
      </div>
    </div>
  );
}
