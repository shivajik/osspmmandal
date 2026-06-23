import { Link, NavLink, useParams } from "react-router-dom";
import { ALL_BRANCHES } from "../data/content";
import { getBranchSection, getSectionsForBranch } from "../data/branchSections";
import PageHero from "../components/PageHero";
import { ArrowLeft, FileText, Construction, Mail, Phone, MapPin, ImageOff, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

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

function TopperCard({ src, name, percentage }) {
  const [errored, setErrored] = useState(false);
  return (
    <figure className="group">
      <div className="aspect-[3/4] overflow-hidden bg-[#0A192F]/5 flex items-center justify-center">
        {errored ? (
          <div className="flex flex-col items-center justify-center text-center p-4">
            <ImageOff size={22} className="text-[#4A5568] mb-2" />
            <code className="text-[11px] text-[#0A192F] break-all">{src}</code>
          </div>
        ) : (
          <img
            src={src}
            alt={name}
            loading="lazy"
            onError={() => setErrored(true)}
            className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500"
          />
        )}
      </div>
      <figcaption className="mt-3 text-center">
        <div className="font-body text-[#0A192F] font-medium leading-snug">{name}</div>
        <div className="label-kicker text-[#D4AF37] mt-1">{percentage}</div>
      </figcaption>
    </figure>
  );
}

function DynamicGallery({ manifestUrl, folder, captionPrefix }) {
  const [photos, setPhotos] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    let cancelled = false;
    fetch(manifestUrl)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((list) => {
        if (cancelled) return;
        const items = (Array.isArray(list) ? list : list.photos || []).map((entry, i) => {
          const file = typeof entry === "string" ? entry : entry.file;
          const caption =
            (typeof entry === "object" && entry.caption) ||
            `${captionPrefix} · Photo ${i + 1}`;
          return { src: `${folder}/${file}`, caption };
        });
        setPhotos(items);
      })
      .catch((e) => !cancelled && setError(e.message));
    return () => {
      cancelled = true;
    };
  }, [manifestUrl, folder, captionPrefix]);

  if (error) {
    return (
      <div className="border border-dashed border-[#0A192F]/30 p-6 text-sm text-[#4A5568]">
        Could not load gallery manifest at <code>{manifestUrl}</code>. Add your
        photos to <code>public{folder}/</code> and run{" "}
        <code>npm run gallery:manifest</code> in <code>frontend/</code>.
      </div>
    );
  }
  if (!photos) {
    return <div className="text-sm text-[#4A5568]">Loading photos…</div>;
  }
  if (photos.length === 0) {
    return (
      <div className="border border-dashed border-[#0A192F]/30 p-6 text-sm text-[#4A5568]">
        No photos yet. Drop image files into <code>public{folder}/</code> and
        run <code>npm run gallery:manifest</code>.
      </div>
    );
  }
  return (
    <PaginatedGallery photos={photos} />
  );
}

function PaginatedGallery({ photos, perPage = 12 }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(photos.length / perPage));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * perPage;
  const visible = photos.slice(start, start + perPage);

  useEffect(() => {
    setPage(1);
  }, [photos]);

  const goTo = (p) => {
    setPage(p);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: window.scrollY - 80, behavior: "smooth" });
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= current - 1 && i <= current + 1)
    ) {
      pageNumbers.push(i);
    } else if (pageNumbers[pageNumbers.length - 1] !== "…") {
      pageNumbers.push("…");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 label-kicker text-[#4A5568]">
        <span>
          Showing <span className="text-[#0A192F]">{start + 1}–{start + visible.length}</span> of {photos.length}
        </span>
        <span>
          Page {current} / {totalPages}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((p) => (
          <GalleryImage key={p.src} src={p.src} caption={p.caption} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
          <button
            onClick={() => goTo(Math.max(1, current - 1))}
            disabled={current === 1}
            className="label-kicker px-4 py-2 border border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F] hover:text-[#FBF9F6] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#0A192F]"
          >
            ← Prev
          </button>
          {pageNumbers.map((n, i) =>
            n === "…" ? (
              <span key={`e${i}`} className="px-2 text-[#4A5568]">…</span>
            ) : (
              <button
                key={n}
                onClick={() => goTo(n)}
                className={`label-kicker w-10 h-10 border transition-colors ${
                  n === current
                    ? "bg-[#0A192F] text-[#FBF9F6] border-[#0A192F]"
                    : "border-[#0A192F]/20 text-[#0A192F] hover:border-[#D4AF37] hover:text-[#D4AF37]"
                }`}
              >
                {n}
              </button>
            )
          )}
          <button
            onClick={() => goTo(Math.min(totalPages, current + 1))}
            disabled={current === totalPages}
            className="label-kicker px-4 py-2 border border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F] hover:text-[#FBF9F6] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#0A192F]"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

function AcademicYears({ data }) {
  const years = data.years || [];
  const [activeYear, setActiveYear] = useState(years[0]?.year);
  const current = years.find((y) => y.year === activeYear) || years[0];

  return (
    <>
      <h2 className="font-display text-3xl md:text-4xl text-[#0A192F] mb-3">{data.heading}</h2>
      <p className="font-body text-[#4A5568] mb-8 max-w-2xl">
        Browse academic year results — toppers, board-exam high-scorers and
        admissions to leading medical and engineering colleges.
      </p>

      <div className="flex flex-wrap gap-2 mb-10 border-b border-[#0A192F]/10 pb-4">
        {years.map((y) => (
          <button
            key={y.year}
            onClick={() => setActiveYear(y.year)}
            className={`label-kicker px-5 py-3 border transition-colors ${
              y.year === current.year
                ? "bg-[#0A192F] text-[#FBF9F6] border-[#0A192F]"
                : "border-[#0A192F]/20 text-[#0A192F] hover:border-[#D4AF37] hover:text-[#D4AF37]"
            }`}
          >
            {y.year}
          </button>
        ))}
      </div>

      {current?.tables.map((t, ti) => (
        <AcademicTable key={`${current.year}-${ti}`} table={t} />
      ))}
    </>
  );
}

function AcademicTable({ table, perPage = 25 }) {
  const [page, setPage] = useState(1);
  const total = table.rows.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const cur = Math.min(page, totalPages);
  const start = (cur - 1) * perPage;
  const visible = table.rows.slice(start, start + perPage);

  useEffect(() => {
    setPage(1);
  }, [table]);

  return (
    <div className="mb-12">
      <h3 className="font-display text-xl md:text-2xl text-[#0A192F] mb-4">{table.title}</h3>
      <div className="label-kicker text-[#4A5568] mb-3">
        {total} {total === 1 ? "entry" : "entries"}
        {totalPages > 1 && <> · Page {cur} / {totalPages}</>}
      </div>
      <div className="overflow-x-auto border border-[#0A192F]/10">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#0A192F] text-[#FBF9F6]">
              {table.columns.map((c) => (
                <th key={c} className="label-kicker px-5 py-3 font-normal whitespace-nowrap">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row, i) => (
              <tr key={i} className={i % 2 ? "bg-[#F0F4F8]" : "bg-white"}>
                {row.map((cell, j) => (
                  <td key={j} className="px-5 py-3 font-body text-[#0A192F]">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
          <button
            onClick={() => setPage(Math.max(1, cur - 1))}
            disabled={cur === 1}
            className="label-kicker px-4 py-2 border border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F] hover:text-[#FBF9F6] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#0A192F]"
          >
            ← Prev
          </button>
          <span className="label-kicker text-[#4A5568] px-3">{cur} / {totalPages}</span>
          <button
            onClick={() => setPage(Math.min(totalPages, cur + 1))}
            disabled={cur === totalPages}
            className="label-kicker px-4 py-2 border border-[#0A192F]/20 text-[#0A192F] hover:bg-[#0A192F] hover:text-[#FBF9F6] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#0A192F]"
          >
            Next →
          </button>
        </div>
      )}
    </div>
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
              Browse photographs from this branch.
            </p>
            <PaginatedGallery photos={data.photos} />
          </>
        ) : data.type === "toppers" ? (
          <>
            <h2 className="font-display text-3xl md:text-4xl text-[#0A192F] mb-8">{data.heading}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.photos.map((p) => (
                <TopperCard key={p.src} src={p.src} name={p.name} percentage={p.percentage} />
              ))}
            </div>
          </>
        ) : data.type === "gallery-dynamic" ? (
          <>
            <h2 className="font-display text-3xl md:text-4xl text-[#0A192F] mb-8">{data.heading}</h2>
            <DynamicGallery
              manifestUrl={data.manifestUrl}
              folder={data.folder}
              captionPrefix={data.captionPrefix}
            />
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
        ) : data.type === "academic-years" ? (
          <AcademicYears data={data} />
        ) : null}
        </div>
      </section>
    </div>
  );
}
