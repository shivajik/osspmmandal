import PageHero from "../components/PageHero";
import { IMAGES } from "../data/content";
import { motion } from "framer-motion";

const captions = [
  "Campus · Aurangabad",
  "Classroom · Gaikwad Jalgaon",
  "Library · Limbe Jalgaon",
  "Students at work",
  "Science lab",
  "Morning assembly",
  "Sports day",
  "Cultural fest",
  "Annual day",
  "Staff group",
];

export default function Gallery() {
  return (
    <div data-testid="gallery-page">
      <PageHero
        kicker="Gallery · Life at OSSPM"
        title={<>Moments from our <span className="italic text-[#D4AF37]">campuses</span>.</>}
        subtitle="Classrooms, ceremonies, co-curriculars and community — the everyday life of students and teachers across OSSPM institutions."
      />

      <section className="max-w-[1600px] mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-12 gap-2 md:gap-3">
          {IMAGES.gallery.map((src, i) => {
            // Tetris pattern: vary spans
            const spans = [
              "col-span-12 md:col-span-8 aspect-[16/9]",
              "col-span-6 md:col-span-4 aspect-[4/5]",
              "col-span-6 md:col-span-4 aspect-square",
              "col-span-12 md:col-span-4 aspect-[4/5]",
              "col-span-12 md:col-span-4 aspect-square",
              "col-span-6 md:col-span-6 aspect-[16/10]",
              "col-span-6 md:col-span-6 aspect-[16/10]",
              "col-span-12 md:col-span-4 aspect-square",
              "col-span-6 md:col-span-4 aspect-[4/5]",
              "col-span-6 md:col-span-4 aspect-square",
            ];
            return (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
                className={`relative overflow-hidden border border-[#0A192F]/10 group ${spans[i % spans.length]}`}
                data-testid={`gallery-item-${i}`}
              >
                <img
                  src={src}
                  alt={captions[i % captions.length]}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/70 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                <figcaption className="absolute left-5 bottom-5 right-5 label-kicker text-[#FBF9F6] flex items-center gap-2">
                  <span className="text-[#D4AF37]">{(i + 1).toString().padStart(2, "0")}</span>
                  <span className="opacity-30">/</span>
                  <span>{captions[i % captions.length]}</span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </section>
    </div>
  );
}
