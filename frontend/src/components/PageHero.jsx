export default function PageHero({ kicker, title, subtitle, align = "left" }) {
  return (
    <section data-testid="page-hero" className="bg-[#0A192F] text-[#FBF9F6] relative overflow-hidden">
      <div className="absolute inset-0 grain opacity-[0.06] pointer-events-none" />
      {/* decorative display word */}
      <div className="absolute -left-8 -bottom-6 md:-left-16 md:-bottom-10 font-display text-[22vw] md:text-[14vw] leading-none text-white/[0.04] select-none pointer-events-none">
        OSSPM
      </div>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32 relative">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-8">
            <div className="label-kicker text-[#D4AF37] mb-6">{kicker}</div>
            <h1 className="font-display font-medium text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              {title}
            </h1>
          </div>
          {subtitle && (
            <div className="col-span-12 md:col-span-4 md:pl-6 md:border-l border-white/10">
              <p className="font-body font-light text-white/70 text-base md:text-lg leading-relaxed">
                {subtitle}
              </p>
            </div>
          )}
        </div>
      </div>
      {/* gold hairline */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#D4AF37] via-[#D4AF37]/40 to-transparent" />
    </section>
  );
}
