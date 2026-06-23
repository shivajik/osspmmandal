import { Link, NavLink, useParams } from "react-router-dom";
import { ALL_BRANCHES } from "../data/content";
import { getBranchSection, getSectionsForBranch } from "../data/branchSections";
import PageHero from "../components/PageHero";
import { ArrowLeft, FileText, Construction, Mail, Phone, MapPin, ImageOff, ChevronRight } from "lucide-react";
import { useState } from "react";

function GalleryImage({ src, caption }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div className="aspect-[4/3] bg-[#F0F4F8] border border-dashed border-[#0A192F]/20 flex flex-col items-center justify-center text-center p-4">
        <ImageOff size={22} className="text-[#4A5568] mb-2" />
        <div className="label-kicker text-[#4A5568] mb-1">Drop photo at</div>
        <code className="text-[11px] text-[#0A192F] break-all">{src}</code>
      </div>
    );
  }
  return (
    <figure className="group">
      <div className="aspect-[4/3] overflow-hidden bg-[#0A192F]/5">
        <img
          src={src}
          alt={caption}
          loading="lazy"
          onError={() => setErrored(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <figcaption className="label-kicker text-[#4A5568] mt-2">{caption}</figcaption>
    </figure>
  );
}

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
  const sections = getSectionsForBranch(slug);

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

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 grid grid-cols-12 gap-10">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3">
          <div className="md:sticky md:top-28">
            <div className="label-kicker text-[#1A5F5A] mb-4">Explore this branch</div>
            <nav className="border border-[#0A192F]/10 bg-white">
              <Link
                to={`/branches/${branch.slug}`}
                className="flex items-center justify-between px-4 py-3 text-sm text-[#4A5568] hover:bg-[#F0F4F8] hover:text-[#0A192F] border-b border-[#0A192F]/10 transition-colors"
              >
                <span>Overview</span>
                <ChevronRight size={14} className="opacity-50" />
              </Link>
              {sections.map((s) => (
                <NavLink
                  key={s.key}
                  to={`/branches/${branch.slug}/${s.key}`}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 text-sm border-b last:border-b-0 border-[#0A192F]/10 transition-colors ${
                      isActive
                        ? "bg-[#0A192F] text-[#FBF9F6]"
                        : "text-[#0A192F] hover:bg-[#F0F4F8] hover:text-[#1A5F5A]"
                    }`
                  }
                >
                  <span>{s.label}</span>
                  <ChevronRight size={14} className="opacity-50" />
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="col-span-12 md:col-span-9">
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
            {data.footnote && (
              <p className="mt-4 text-sm text-[#4A5568] italic">{data.footnote}</p>
            )}
          </>
        ) : data.type === "info" ? (
          <>
            <h2 className="font-display text-3xl md:text-4xl text-[#0A192F] mb-6">{data.heading}</h2>
            <div className="space-y-4 max-w-3xl">
              {data.paragraphs?.map((p, i) => (
                <p key={i} className="font-body text-[#0A192F] leading-relaxed">{p}</p>
              ))}
            </div>
            {data.externalUrl && (
              <a
                href={data.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex mt-8 label-kicker bg-[#0A192F] text-[#FBF9F6] hover:bg-[#D4AF37] hover:text-[#0A192F] transition-colors px-7 py-4"
              >
                Visit Official Website ↗
              </a>
            )}
          </>
        ) : data.type === "contact" ? (
          <>
            <h2 className="font-display text-3xl md:text-4xl text-[#0A192F] mb-8">{data.heading}</h2>
            <div className="border border-[#0A192F]/10 divide-y divide-[#0A192F]/10 bg-white">
              {data.address && (
                <div className="flex items-start gap-3 px-6 py-4">
                  <MapPin size={18} className="text-[#1A5F5A] mt-0.5" />
                  <span className="font-body text-[#0A192F]">{data.address}</span>
                </div>
              )}
              {data.udise && (
                <div className="px-6 py-4 font-body text-[#0A192F]">
                  <span className="label-kicker text-[#4A5568] mr-3">UDISE</span> {data.udise}
                </div>
              )}
              {data.schoolIndex && (
                <div className="px-6 py-4 font-body text-[#0A192F]">
                  <span className="label-kicker text-[#4A5568] mr-3">School Index</span> {data.schoolIndex}
                </div>
              )}
              {data.email && (
                <div className="flex items-center gap-3 px-6 py-4">
                  <Mail size={18} className="text-[#1A5F5A]" />
                  <a href={`mailto:${data.email}`} className="font-body text-[#0A192F] hover:text-[#D4AF37]">{data.email}</a>
                </div>
              )}
              {data.phones?.map((p) => (
                <div key={p} className="flex items-center gap-3 px-6 py-4">
                  <Phone size={18} className="text-[#1A5F5A]" />
                  <a href={`tel:${p}`} className="font-body text-[#0A192F] hover:text-[#D4AF37]">+91 {p}</a>
                </div>
              ))}
              {data.website && (
                <div className="px-6 py-4">
                  <a href={data.website} target="_blank" rel="noreferrer" className="font-body text-[#D4AF37] hover:text-[#0A192F] break-all">
                    {data.website} ↗
                  </a>
                </div>
              )}
            </div>
          </>
        ) : data.type === "gallery" ? (
          <>
            <h2 className="font-display text-3xl md:text-4xl text-[#0A192F] mb-3">{data.heading}</h2>
            <p className="font-body text-[#4A5568] mb-8 max-w-2xl">
              Replace each placeholder by saving your image at the path shown on the tile.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.photos.map((p) => (
                <GalleryImage key={p.src} src={p.src} caption={p.caption} />
              ))}
            </div>
          </>
        ) : data.type === "pdf" ? (
          <>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
              <h2 className="font-display text-3xl md:text-4xl text-[#0A192F]">{data.heading}</h2>
              <a
                href={data.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="label-kicker bg-[#0A192F] text-[#FBF9F6] hover:bg-[#D4AF37] hover:text-[#0A192F] transition-colors px-6 py-3"
              >
                Open / Download PDF
              </a>
            </div>
            <div className="border border-[#0A192F]/10 bg-white">
              <object data={data.pdfUrl} type="application/pdf" className="w-full h-[70vh] md:h-[85vh]">
                <iframe src={data.pdfUrl} title={data.heading} className="w-full h-[70vh] md:h-[85vh]" />
              </object>
            </div>
          </>
        ) : null}
        </div>
      </section>
    </div>
  );
}
