import { Link, useParams } from "react-router-dom";
import { ALL_BRANCHES, BRANCHES, ORG } from "../data/content";
import PageHero from "../components/PageHero";
import { ArrowLeft, MapPin, BookOpen, Calendar, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function BranchDetail() {
  const { slug } = useParams();
  const branch = ALL_BRANCHES.find((b) => b.slug === slug);

  if (!branch) {
    return (
      <div data-testid="branch-not-found" className="max-w-[900px] mx-auto px-6 py-32 text-center">
        <div className="label-kicker text-[#D4AF37] mb-4">404 · Not Found</div>
        <h1 className="font-display text-4xl md:text-5xl text-[#0A192F] leading-tight">
          We couldn&rsquo;t find that branch.
        </h1>
        <p className="font-body text-[#4A5568] mt-6">
          It may have been renamed or moved. Browse all eleven OSSPM institutions instead.
        </p>
        <Link
          to="/branches"
          className="inline-flex mt-10 label-kicker bg-[#0A192F] text-[#FBF9F6] hover:bg-[#D4AF37] hover:text-[#0A192F] transition-colors px-7 py-4"
        >
          ← All branches
        </Link>
      </div>
    );
  }

  const siblings = BRANCHES[branch.division].items.filter((b) => b.slug !== branch.slug);

  return (
    <div data-testid="branch-detail-page">
      <PageHero
        kicker={`${branch.divisionTitle} · Estd. ${branch.established}`}
        title={<>{branch.name}</>}
        subtitle={branch.location}
      />

      {/* Back link */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-10">
        <Link
          to="/branches"
          data-testid="back-to-branches"
          className="inline-flex items-center gap-2 label-kicker text-[#4A5568] hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft size={14} /> Back to all branches
        </Link>
      </div>

      {/* Overview */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-7">
            <div className="label-kicker text-[#1A5F5A] mb-4">About the institution</div>
            <h2 className="font-display font-medium text-3xl md:text-4xl text-[#0A192F] leading-tight tracking-tight">
              {branch.divisionTitle.replace(/s$/, "")} in {branch.location.split(",")[branch.location.split(",").length - 1].trim()}
            </h2>
            <p className="font-body font-light text-[#0A192F]/85 text-lg mt-6 leading-relaxed">{branch.about}</p>

            {/* Programs */}
            <div className="mt-12">
              <div className="label-kicker text-[#1A5F5A] mb-5">Programs Offered</div>
              <div className="flex flex-wrap gap-2">
                {branch.programs.map((p) => (
                  <span
                    key={p}
                    className="label-kicker border border-[#0A192F]/20 text-[#0A192F] px-4 py-2 hover:bg-[#0A192F] hover:text-[#FBF9F6] transition-colors"
                    data-testid="branch-program"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Fact sheet */}
          <aside className="col-span-12 md:col-span-5 md:pl-10 md:border-l border-[#0A192F]/10">
            <div className="border border-[#0A192F]/10 bg-[#F0F4F8] p-8 space-y-6">
              <div className="label-kicker text-[#1A5F5A]">At a glance</div>
              <div className="grid grid-cols-1 gap-5">
                <div className="flex items-start gap-4">
                  <Calendar size={18} className="text-[#D4AF37] mt-1 shrink-0" />
                  <div>
                    <div className="label-kicker text-[#4A5568]">Established</div>
                    <div className="font-display text-xl text-[#0A192F]">{branch.established}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <BookOpen size={18} className="text-[#D4AF37] mt-1 shrink-0" />
                  <div>
                    <div className="label-kicker text-[#4A5568]">Medium</div>
                    <div className="font-display text-xl text-[#0A192F]">{branch.medium}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin size={18} className="text-[#D4AF37] mt-1 shrink-0" />
                  <div>
                    <div className="label-kicker text-[#4A5568]">Location</div>
                    <div className="font-body text-[#0A192F] leading-snug mt-1">{branch.location}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone size={18} className="text-[#D4AF37] mt-1 shrink-0" />
                  <div>
                    <div className="label-kicker text-[#4A5568]">Trust office</div>
                    {ORG.phones.map((p) => (
                      <div key={p} className="font-body text-[#0A192F] leading-snug">
                        +91 {p}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail size={18} className="text-[#D4AF37] mt-1 shrink-0" />
                  <div>
                    <div className="label-kicker text-[#4A5568]">Email</div>
                    <a href={`mailto:${ORG.email}`} className="font-body text-[#0A192F] underline-offset-4 hover:underline">
                      {ORG.email}
                    </a>
                  </div>
                </div>
              </div>

              <Link
                to="/admissions"
                data-testid="branch-cta-admissions"
                className="block text-center label-kicker bg-[#0A192F] text-[#FBF9F6] hover:bg-[#D4AF37] hover:text-[#0A192F] transition-colors px-6 py-4"
              >
                Apply for admission
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Sibling branches */}
      {siblings.length > 0 && (
        <section className="bg-[#F0F4F8] border-t border-[#0A192F]/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
            <div className="grid grid-cols-12 gap-8 mb-10 items-end">
              <div className="col-span-12 md:col-span-8">
                <div className="label-kicker text-[#1A5F5A] mb-4">Also in {branch.divisionTitle}</div>
                <h3 className="font-display text-3xl md:text-4xl text-[#0A192F] leading-tight tracking-tight">
                  Explore other institutions in this division.
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              {siblings.map((s, i) => (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="col-span-12 md:col-span-6 lg:col-span-4"
                >
                  <Link
                    to={`/branches/${s.slug}`}
                    data-testid={`sibling-${s.slug}`}
                    className="block p-7 bg-white border border-[#0A192F]/10 hover:bg-[#FBF9F6] transition-colors h-full group"
                  >
                    <div className="label-kicker text-[#D4AF37] mb-3">Estd. {s.established}</div>
                    <h4 className="font-display text-xl text-[#0A192F] leading-tight group-hover:text-[#D4AF37] transition-colors">
                      {s.name}
                    </h4>
                    <div className="flex items-start gap-2 mt-4 text-[#4A5568] text-sm">
                      <MapPin size={14} className="mt-[3px] shrink-0 text-[#1A5F5A]" />
                      {s.location}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
