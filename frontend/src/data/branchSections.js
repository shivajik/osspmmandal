// Per-branch section content extracted from https://osspmandal.com/.
// Sections without scraped data are flagged underConstruction:true.

const SECTION_LIST = [
  { key: "about-us", label: "About Us" },
  { key: "scholarship-23-24", label: "Scholarship 23-24" },
  { key: "ssc-result", label: "SSC Result 2004 to 2023" },
  { key: "photo-gallery", label: "Photo Gallery" },
  { key: "sports-achievements", label: "Sports Achievements" },
  { key: "contact-us", label: "Contact Us" },
];

const PDF = (path) => `https://osspmandal.com/wp-content/uploads/${path}`;

// Branches that link directly to a real external website rather than using
// our internal /branches/:slug routes. When set, the header dropdown opens
// the URL in a new tab and the branch detail / section pages are skipped.
export const EXTERNAL_BRANCH_URLS = {
  "adarsh-junior-college": "https://adarshjcollege.com/",
  "late-vimalbai-g-gaikwad-higher-secondary": "https://vgghss.com/",
};

// Per-branch overrides for which section keys appear in the navigation.
// If a branch is not listed here, the full SECTION_LIST is used.
export const BRANCH_SECTION_KEYS = {
  "secondary-school-rui": [
    "about-us",
    "scholarship-23-24",
    "ssc-result",
    "photo-gallery",
    "contact-us",
  ],
  "shree-shaneshwar-secondary-school": [
    "about-us",
    "photo-gallery",
    "contact-us",
  ],
};

// Photo gallery slots — files live in /public/gallery/<slug>/photo-N.jpg.
// Drop your real photos at those paths (or replace this list) and they will
// appear automatically. Missing files render a labelled placeholder so the
// layout stays consistent.
export const BRANCH_GALLERIES = {
  "om-balak-mandir": Array.from({ length: 9 }, (_, i) => ({
    src: `/gallery/om-balak-mandir/photo-${i + 1}.jpg`,
    caption: `Om Balak Mandir · Photo ${i + 1}`,
  })),
  "shree-shaneshwar-secondary-school": Array.from({ length: 11 }, (_, i) => ({
    src: `/gallery/shree-shaneshwar-secondary-school/photo-${i + 1}.jpeg`,
    caption: `Shree Shaneshwar · Photo ${i + 1}`,
  })),
};

export function getSectionsForBranch(slug) {
  const keys = BRANCH_SECTION_KEYS[slug];
  if (!keys) return SECTION_LIST;
  return keys
    .map((k) => SECTION_LIST.find((s) => s.key === k))
    .filter(Boolean);
}

// slug (in our app) → section data
export const BRANCH_SECTIONS = {
  "late-kishanrao-dhanve-secondary-school": {
    "about-us": {
      type: "pdf",
      heading: "About — Late. Kisanrao Dhanave Secondary School, Bhardi",
      pdfUrl: "/school-info/bhardi.pdf",
    },
    "contact-us": {
      type: "contact",
      heading: "Late. Kisanrao Dhanve High School — Contact",
      address: "Bhardi, Tq. Ambad, Dist. Jalna – 431209",
      udise: "27180312502",
      schoolIndex: "61.03.035",
      email: "kkdmvb221@gmail.com",
      phones: ["7588023219", "9552177218"],
    },
    "scholarship-23-24": {
      type: "scholarships",
      heading: "LKDSS – Scholarship 23-24",
      rows: [
        ["SUVARN MAHOTSAVI 23-24", PDF("2023/12/SUVARN-MAHOTSAVI-23-24.pdf")],
        ["SSC VJNT 23-24", PDF("2023/12/SSC-VJNT-23-24.pdf")],
        ["SSC ST 23-24", PDF("2023/12/SSC-ST-23-24.pdf")],
        ["SSC SC 23-24", PDF("2023/12/SSC-SC-23-24.pdf")],
        ["SSC OBC 23-24", PDF("2023/12/SSC-OBC-23-24.pdf")],
        ["SSC OBC 22-23", PDF("2023/12/SSC-OBC-22-23.pdf")],
        ["SAVITRI SC 23-24", PDF("2023/12/SAVITRI-SC-23-24.pdf")],
        ["SAVITRI OBC 23-24", PDF("2023/12/SAVITRI-OBC-23-24.pdf")],
        ["SAVITRI NT 23-24", PDF("2023/12/savitri-nt-23-24.pdf")],
        ["GUNVATTA ST 23-24", PDF("2023/12/GUNVATTA-ST-23-24.pdf")],
        ["GUNVATTA SC 23-24", PDF("2023/12/GUNVATTA-SC-23-24.pdf")],
        ["GUNVATTA NT 23-24", PDF("2023/12/GUNVATTA-NT-23-24.pdf")],
        ["UNCLEAN 23-24", PDF("2023/12/UNCLEAN-23-24.pdf")],
      ],
    },
    "ssc-result": {
      type: "results",
      heading: "LKDSS – SSC Result 2004 to 2023",
      columns: ["Sr.", "Year", "Result %"],
      rows: [
        [1, "2004", "83.33"], [2, "2005", "21.21"], [3, "2006", "56.25"],
        [4, "2007", "87.5"], [5, "2008", "94.11"], [6, "2009", "100"],
        [7, "2010", "100"], [8, "2011", "28.13"], [9, "2012", "76.67"],
        [10, "2013", "80.77"], [11, "2014", "84.62"], [12, "2015", "92.11"],
        [13, "2016", "80"], [14, "2017", "100"], [15, "2018", "86.11"],
        [16, "2019", "62.74"], [17, "2020", "92.85"], [18, "2021", "100"],
        [19, "2022", "100"], [20, "2023", "90.47"],
      ],
    },
    "sports-achievements": {
      type: "results",
      heading: "LKDSS – Sports Achievements",
      columns: ["Sr.", "Year", "खेळ", "स्तर", "निकाल"],
      rows: [
        [1, "2007-08", "कुस्ती", "जिल्हा", "तालुकास्तर विजेता"],
        [2, "2011-12", "कुस्ती", "विभाग", "जिल्हास्तर विजेता"],
        [3, "2012-13", "कुस्ती", "जिल्हा (मुली)", "तालुकास्तर विजेता"],
        [4, "2013-14", "रनिंग", "जिल्हा", "तालुकास्तर विजेता"],
        [5, "2017-18", "कुस्ती", "जिल्हा", "तालुकास्तर विजेता"],
        [6, "2019-20", "कुस्ती", "जिल्हा", "तालुकास्तर विजेता"],
        [7, "2022-23", "कबड्डी", "जिल्हा", "तालुकास्तर विजेता"],
        [8, "2022-23", "खो खो", "जिल्हा", "तालुकास्तर विजेता"],
      ],
    },
  },
  "secondary-school-rui": {
    "about-us": {
      type: "pdf",
      heading: "About — Secondary School, Rui-Ambad",
      pdfUrl: "/school-info/rui.pdf",
    },
    "scholarship-23-24": {
      type: "scholarships",
      heading: "Scholarship 23-24",
      rows: [
        ["GUNVATTA NT RUI 23-24", PDF("2023/12/GUNVATTA-NT-RUI-23-24.pdf")],
        ["GUNVATTA SC 23-24", PDF("2023/12/GUNVATTA-SC-23-24-RUI.pdf")],
        ["SAVITRI OBC 23-24", PDF("2023/12/SAVITRI-OBC-23-24-RUI.pdf")],
        ["SAVITRI SC 23-24", PDF("2023/12/SAVITRI-SC-23-24-RUI.pdf")],
        ["SAVITRI VJNT 23-24", PDF("2023/12/SAVITRI-VJNT-23-24-RUI.pdf")],
        ["SSC OBC 23-24", PDF("2023/12/SSC-OBC-23-24-RUI.pdf")],
        ["SSC SC 23-24", PDF("2023/12/SSC-SC-23-24-RUI.pdf")],
        ["SSC VJNT 23-24", PDF("2023/12/SSC-VJNT-23-24-RUI.pdf")],
        ["UNCLEAN 23-24 RUI", PDF("2023/12/UNCLEAN-23-24-RUI.pdf")],
      ],
    },
    "ssc-result": {
      type: "results",
      heading: "SSC Result 2011 to 2023",
      columns: ["Sr.", "Year", "Result %"],
      rows: [
        [1, "2011", "24"], [2, "2012", "55.17"], [3, "2013", "76.67"],
        [4, "2014", "96.88"], [5, "2015", "91.18"], [6, "2016", "83.87"],
        [7, "2017", "97.06"], [8, "2018", "86.54"], [9, "2019", "92.15"],
        [10, "2020", "95.65"], [11, "2021", "100"], [12, "2022", "98.03"],
        [13, "2023", "97.91"],
      ],
    },
  },
  "shree-shaneshwar-secondary-school": {
    "about-us": {
      type: "pdf",
      heading: "About — Shree Shaneshwar Secondary School, Limbe Jalgaon",
      pdfUrl: "/school-info/limbe.pdf",
    },
  },
};

export function getBranchSection(slug, sectionKey) {
  const section = SECTION_LIST.find((s) => s.key === sectionKey);
  if (!section) return null;
  let data = BRANCH_SECTIONS[slug]?.[sectionKey];
  if (!data && sectionKey === "photo-gallery" && BRANCH_GALLERIES[slug]) {
    data = {
      type: "gallery",
      heading: `${section.label}`,
      photos: BRANCH_GALLERIES[slug],
    };
  }
  return { section, data: data || { underConstruction: true, heading: section.label } };
}

export { SECTION_LIST };
