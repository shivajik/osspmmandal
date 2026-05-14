import { Link, useParams } from "react-router-dom";
import { ALL_BRANCHES } from "../data/content";
import { getBranchSection, SECTION_LIST } from "../data/branchSections";
import PageHero from "../components/PageHero";
import { ArrowLeft, FileText, Construction } from "lucide-react";

export default function BranchSection() {
  const { slug, section: sectionKey } = useParams();
  const branch = ALL_BRANCHES.find((b) => b.slug === slug);
  const result = getBranchSection(slug, sectionKey);

  if (!branch || !result) {
    return (
      <div className="max-w-[900px] mx-auto px-6 py-32 text-center">
        <div className="label-kicker text-[#D4AF37] mb-4">404 · Not Found</div>
        <h1 className="font-display text-4xl text-[#0A192F]">Page not found.</h1>
        <Link to="/branches" className="inline-flex mt-10 label-kicker bg-[#0A192F] text-[#FBF9F6] px-7 py-4">
          ← All branches
        </Link>
      </div>
    );
  }

  const { section, data } = result;

  return (
    <div data-testid="branch-section-page">
      <PageHero
        kicker={branch.name}
        title={<>{section.label}</>}
        subtitle={branch.location}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-10">
        <Link
          to={`/branches/${branch.slug}`}
          className="inline-flex items-center gap-2 label-kicker text-[#4A5568] hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft size={14} /> Back to {branch.name}
        </Link>
      </div>

      <section className="max-w-[1100px] mx-auto px-6 md:px-10 py-16">
        {data.underConstruction ? (
          <div className="border border-[#D4AF37]/40 bg-[#FBF9F6] p-12 text-center">
            <Construction className="mx-auto text-[#D4AF37] mb-5" size={42} />
            <div className="label-kicker text-[#D4AF37] mb-3">Under Construction</div>
            <h2 className="font-display text-3xl md:text-4xl text-[#0A192F] leading-tight">
              {section.label} for this branch is coming soon.
            </h2>
            <p className="font-body text-[#4A5568] mt-5 max-w-xl mx-auto">
              We&rsquo;re still gathering official details for this section. Please check back later or reach out to the
              Trust office for current information.
            </p>
            <Link
              to="/contact"
              className="inline-flex mt-8 label-kicker bg-[#0A192F] text-[#FBF9F6] hover:bg-[#D4AF37] hover:text-[#0A192F] transition-colors px-7 py-4"
            >
              Contact Trust Office
            </Link>
          </div>
        ) : data.type === "scholarships" ? (
          <>
            <h2 className="font-display text-3xl md:text-4xl text-[#0A192F] mb-8">{data.heading}</h2>
            <div className="border border-[#0A192F]/10 divide-y divide-[#0A192F]/10">
              {data.rows.map(([name, url]) => (
                <div key={name} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-[#F0F4F8] transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-[#1A5F5A]" />
                    <span className="font-body text-[#0A192F]">{name}</span>
                  </div>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="label-kicker text-[#D4AF37] hover:text-[#0A192F] transition-colors"
                  >
                    Click to view →
                  </a>
                </div>
              ))}
            </div>
          </>
        ) : data.type === "results" ? (
          <>
            <h2 className="font-display text-3xl md:text-4xl text-[#0A192F] mb-8">{data.heading}</h2>
            <div className="overflow-x-auto border border-[#0A192F]/10">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#0A192F] text-[#FBF9F6]">
                    {data.columns.map((c) => (
                      <th key={c} className="label-kicker px-5 py-3 font-normal">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((row, i) => (
                    <tr key={i} className={i % 2 ? "bg-[#F0F4F8]" : "bg-white"}>
                      {row.map((cell, j) => (
                        <td key={j} className="px-5 py-3 font-body text-[#0A192F]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {/* other sections in this branch */}
        <div className="mt-16 pt-10 border-t border-[#0A192F]/10">
          <div className="label-kicker text-[#1A5F5A] mb-4">More from {branch.name}</div>
          <div className="flex flex-wrap gap-2">
            {SECTION_LIST.filter((s) => s.key !== sectionKey).map((s) => (
              <Link
                key={s.key}
                to={`/branches/${branch.slug}/${s.key}`}
                className="label-kicker border border-[#0A192F]/20 text-[#0A192F] px-4 py-2 hover:bg-[#0A192F] hover:text-[#FBF9F6] transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
