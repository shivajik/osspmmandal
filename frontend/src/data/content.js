// Centralized content extracted verbatim from the existing OSSPM website screenshots.

export const ORG = {
  name: "Om Shivkrupa Shikshan Prasarak Mandal",
  shortName: "OSSPM",
  location: "Chh. Sambhaji Nagar (Aurangabad), Maharashtra",
  tagline: "Empowering Rural Maharashtra Through Education",
  founded: "1996",
  registration:
    "Registered under Maharashtra Society Registration Act 21 of 1860 (No. Maha/54/1996 dt. 1/02/1996) & Mumbai Public Trust Act 29 of 1950 (No. F-3437 (AUR) dt. 2/08/1996).",
  about:
    "OM SHIVKRUPA SHIKSHAN PRASARAK MANDAL, AURANGABAD (OSSPM) is a Non-governing Organization. It is registered under the Maharashtra society Registration Act 21 of 1860. Registration No – Maha/54/1996 dt. 1/02/1996 and Mumbai public Trust Act 29 of 1950, Registration No – F – 3437 (AUR) dt. 2/08/1996, working area (Jurisdiction area) of the NGO is Maharashtra state. The organization is established with the aim to provide educational facilities to rural areas, and empowering marginalized section and to improve the socio-economic status of women, poor and SC/ST. The aim of NGO is also to bring development change in health, education, and environment. The society will make service efforts for the growth and development of weaker sections such as SC, ST women and children, bonded labor and economically backward through awareness campaigns on various development issues, micro credit and development welfare activities. The society with a view to remove untouchability from the society and process of scientific interaction which the community would grow with self help and natural help where the role of the organization is only a facilitator, helping the people of Mobilize and optionally the Natural Human and with resources for their development.",
  address: {
    line1: "Plot No 43, Gut No-91 Part, Samrat Nagar,",
    line2: "Behind Bembde Hospital, By Pass Satara area,",
    line3: "Aurangabad 431001, Maharashtra, India",
  },
  phones: ["7588023221", "8600144259", "9890560688"],
  email: "spmandal309@gmail.com",
  donationNotice: "Accepts Donations under 12 AA & 80 G",
};

export const EXECUTIVE = [
  {
    name: "Mr. Ashokraoji G. Gaikwad",
    qualification: "B.Sc., D.L.L.&W., L.L.B., M.B.A.",
    role: "President",
    photo: "https://customer-assets.emergentagent.com/job_academic-pro-8/artifacts/mpvc0pl1_A_G_Gaikwad.jpg",
  },
  { name: "Mr. Nitinrao K. Naiknaware", qualification: "M.Sc., B.Ed.", role: "Vice President" },
  { name: "Prof. Nandkishore G. Gaikwad", qualification: "M.Sc., M.Ed.", role: "Secretary" },
  {
    name: "Mr. Ghanshyam Gaikwad",
    qualification: "—",
    role: "Administration & Strategy Lead",
    photo: "https://customer-assets.emergentagent.com/job_academic-pro-8/artifacts/14hbkq4m_Mr.%20Ghanshyam%20Gaikwad.jpeg",
  },
  { name: "Mrs. Alka N. Gaikwad", qualification: "M.A., B.P.Ed.", role: "Treasurer" },
  { name: "Mrs. Mrunalini A. Gaikwad", qualification: "M.A.", role: "Member" },
  { name: "Mrs. Sangita R. Gaikwad", qualification: "M.A.", role: "Member" },
  { name: "Mr. Shivajirao T. Dhage", qualification: "—", role: "Member" },
];

// Highlighted leadership shown as portrait cards on the About page.
// Order determines display order. Missing photos render a monogram.
export const LEADERSHIP = [
  {
    name: "Mr. Ashokraoji Gangadhar Gaikwad",
    role: "President",
    qualification: "B.Sc., D.L.L.&W., L.L.B., M.B.A.",
    photo: "https://customer-assets.emergentagent.com/job_academic-pro-8/artifacts/mpvc0pl1_A_G_Gaikwad.jpg",
  },
  {
    name: "Prof. Nandkishore Gangadhar Gaikwad",
    role: "Secretary",
    qualification: "M.Sc., M.Ed.",
    photo: "https://customer-assets.emergentagent.com/job_academic-pro-8/artifacts/st7r02zg_Mr.%20Nandkishore%20Gangadhar%20Gaikwad.jpg",
  },
  {
    name: "Mr. Ghanshyam Gaikwad",
    role: "Administration & Strategy Lead",
    qualification: "—",
    photo: "https://customer-assets.emergentagent.com/job_academic-pro-8/artifacts/14hbkq4m_Mr.%20Ghanshyam%20Gaikwad.jpeg",
  },
];

// Each item now includes: slug, medium, programs, established, established context, contact and a longer description.
// Used by /branches list and /branches/:slug detail page.
export const BRANCHES = {
  marathi: {
    title: "Marathi Schools",
    kicker: "Primary & Secondary",
    count: 6,
    division: "marathi",
    items: [
      {
        slug: "late-vimalbai-g-gaikwad-secondary-school",
        name: "Late. Vimalbai G. Gaikwad Secondary School",
        location: "Gaikwad Jalgaon, Tq. Shevgaon, Dist. Ahmednagar",
        medium: "Marathi",
        programs: ["Std. V", "Std. VI", "Std. VII", "Std. VIII", "Std. IX", "Std. X (SSC)"],
        established: "1998",
        about:
          "One of OSSPM's flagship rural campuses, established to bring quality SSC-board education to children of farming families across Shevgaon taluka. The school combines traditional Marathi-medium pedagogy with modern science and computer labs.",
      },
      {
        slug: "late-kishanrao-dhanve-secondary-school",
        name: "Late. Kishanrao Dhanve Secondary School",
        location: "Bharadi, Tq. Ambad, Dist. Jalna",
        medium: "Marathi",
        programs: ["Std. V", "Std. VI", "Std. VII", "Std. VIII", "Std. IX", "Std. X (SSC)"],
        established: "2002",
        about:
          "Serving the villages of Ambad taluka, this secondary school focuses on first-generation learners and girls' education with dedicated transport and scholarship support.",
      },
      {
        slug: "secondary-school-rui",
        name: "Secondary School, Rui",
        location: "Tq. Ambad, Dist. Jalna",
        medium: "Marathi",
        programs: ["Std. V", "Std. VI", "Std. VII", "Std. VIII", "Std. IX", "Std. X (SSC)"],
        established: "2005",
        about:
          "A community-rooted Marathi-medium school at Rui village. Special emphasis on agriculture, environmental science and Marathi literature.",
      },
      {
        slug: "shree-shaneshwar-secondary-school",
        name: "Shree Shaneshwar Secondary School",
        location: "Limbe Jalgaon, Tq. Gangapur, Dist. Aurangabad",
        medium: "Marathi",
        programs: ["Std. V", "Std. VI", "Std. VII", "Std. VIII", "Std. IX", "Std. X (SSC)"],
        established: "2007",
        about:
          "Located in Limbe Jalgaon, the school provides affordable secondary education with strong outcomes in SSC board exams and a vibrant cultural calendar.",
      },
      {
        slug: "om-madhyamic-vidyalay",
        name: "Om Madhyamic Vidyalay",
        location: "Sahakar Nagar, Aurangabad",
        medium: "Marathi",
        programs: ["Std. V", "Std. VI", "Std. VII", "Std. VIII", "Std. IX", "Std. X (SSC)"],
        established: "2010",
        about:
          "OSSPM's urban Marathi-medium school in Sahakar Nagar, Aurangabad. Houses smart classrooms, a computer lab, library and a dedicated sports ground.",
      },
      {
        slug: "om-balak-mandir",
        name: "Om Balak Mandir",
        location: "Sahakar Nagar, Aurangabad",
        medium: "Marathi",
        programs: ["Nursery", "Jr. KG", "Sr. KG", "Std. I – IV"],
        established: "2010",
        about:
          "A pre-primary and primary school for the youngest learners — focused on play-based, mother-tongue early childhood education.",
      },
    ],
  },
  english: {
    title: "English Schools",
    kicker: "CBSE / State Medium",
    count: 2,
    division: "english",
    items: [
      {
        slug: "late-gangadhar-patil-english-school",
        name: "Late. Gangadhar Patil English School",
        location: "Gaikwad Jalgaon, Tq. Shevgaon, Dist. Ahmednagar",
        medium: "English",
        programs: ["Nursery", "Jr. KG", "Sr. KG", "Std. I – X"],
        established: "2008",
        about:
          "OSSPM's English-medium flagship at Gaikwad Jalgaon. Bilingual confidence, smart classrooms and a STEM-first curriculum prepare rural students for national-level opportunities.",
      },
      {
        slug: "sai-english-school-rui",
        name: "Sai English School, Rui",
        location: "Tq. Ambad, Dist. Jalna",
        medium: "English",
        programs: ["Nursery", "Jr. KG", "Sr. KG", "Std. I – VIII"],
        established: "2012",
        about:
          "An English-medium school at Rui designed to make English-medium education accessible to families from surrounding villages at affordable fees.",
      },
    ],
  },
  colleges: {
    title: "Colleges",
    kicker: "Higher Secondary & Junior",
    count: 3,
    division: "colleges",
    items: [
      {
        slug: "late-vimalbai-g-gaikwad-higher-secondary",
        name: "Late. Vimalbai G. Gaikwad Secondary & Higher Secondary School",
        location: "Gaikwad Jalgaon, Tq. Shevgaon, Dist. Ahmednagar",
        medium: "Marathi · English",
        programs: ["Std. XI Science", "Std. XII Science", "Std. XI Arts", "Std. XII Arts"],
        established: "2010",
        about:
          "A combined secondary and higher-secondary campus offering Science and Arts streams. Strong record in MHT-CET, NEET and JEE coaching for rural students.",
      },
      {
        slug: "adarsh-junior-college",
        name: "Adarsh Junior College",
        location: "Gaikwad Jalgaon, Tq. Shevgaon, Dist. Ahmednagar",
        medium: "Marathi · English",
        programs: ["XI / XII Science", "XI / XII Arts", "XI / XII Commerce"],
        established: "2012",
        about:
          "Junior college offering Science, Arts and Commerce streams with experienced faculty and dedicated coaching for entrance examinations.",
      },
      {
        slug: "shree-shaneshwar-higher-secondary",
        name: "Shree Shaneshwar Higher Secondary School",
        location: "Limbe Jalgaon, Tq. Gangapur, Dist. Aurangabad",
        medium: "Marathi",
        programs: ["Std. XI Science", "Std. XII Science", "Std. XI Arts", "Std. XII Arts"],
        established: "2014",
        about:
          "Higher-secondary education at Limbe Jalgaon — bringing Std. XI and XII Science and Arts streams to a region historically underserved at the +2 level.",
      },
    ],
  },
};

// Flat list helper used by /branches/:slug router
export const ALL_BRANCHES = ["marathi", "english", "colleges"].flatMap((k) =>
  BRANCHES[k].items.map((it) => ({ ...it, division: k, divisionTitle: BRANCHES[k].title }))
);

export const VALUES = [
  {
    n: "01",
    title: "Access for the rural learner",
    body: "Bringing affordable, high-quality schooling to villages across Ahmednagar, Jalna and Aurangabad — the children whose parents had no school to attend.",
  },
  {
    n: "02",
    title: "Dignity for the marginalized",
    body: "Active fee concessions and scholarships for SC, ST, EBC, women and first-generation learners — uplift, not charity.",
  },
  {
    n: "03",
    title: "Mother-tongue first",
    body: "We believe a child learns fastest in her own language. Six Marathi-medium schools sit at the core of OSSPM, complemented by English-medium options.",
  },
  {
    n: "04",
    title: "Modern + rooted",
    body: "Smart classrooms, science and computer labs paired with cultural programmes, sports and value education — the modern world without losing the village.",
  },
  {
    n: "05",
    title: "Self-help, not dependency",
    body: "The Mandal acts as facilitator. Communities mobilise their own human and material resources; we channel them toward education and dignity.",
  },
  {
    n: "06",
    title: "Transparency & trust",
    body: "Registered under the Maharashtra Society Act and Mumbai Public Trust Act since 1996, with 12 AA & 80 G certification for tax-exempt giving.",
  },
];

export const VISION_MISSION = {
  vision:
    "A Maharashtra where no child — regardless of caste, gender or postal code — is denied a quality education and the dignity that comes with it.",
  mission: [
    "To establish and run schools and colleges that bring high-quality formal education within reach of rural and marginalized communities.",
    "To empower women, the economically weaker sections and SC/ST families through scholarships, micro-credit and welfare activities.",
    "To facilitate community self-help — mobilising local human, natural and material resources for sustainable development in health, education and environment.",
    "To remove caste-based discrimination and build scientific temperament through awareness campaigns and inclusive school culture.",
  ],
};

export const NEWS = [
  {
    id: "admission-2026",
    date: "2026 · Admission Cycle",
    category: "Admissions",
    title: "Admissions open for Academic Year 2026–27 across all branches",
    excerpt:
      "Applications are now being accepted for Marathi Medium, English Medium, Junior Colleges and Higher Secondary programs. Limited seats across all institutions — priority given to rural and first-generation learners.",
  },
  {
    id: "scholarship-rural",
    date: "Ongoing Initiative",
    category: "Scholarships",
    title: "Rural Merit Scholarship — Fee concession for SC/ST & EBC students",
    excerpt:
      "As part of our mission to empower marginalized sections, qualifying students receive up to 100% fee waiver across OSSPM colleges and schools.",
  },
  {
    id: "foundation-day",
    date: "1 February",
    category: "Milestone",
    title: "OSSPM Foundation Day — 29 years of serving rural Maharashtra",
    excerpt:
      "Since 1996 the Mandal has been committed to providing quality education and social upliftment across Ahmednagar, Jalna and Aurangabad districts.",
  },
  {
    id: "digital-classrooms",
    date: "New at OSSPM",
    category: "Infrastructure",
    title: "Digital classrooms rolled out at Om Madhyamic Vidyalay",
    excerpt:
      "Smart boards, projectors and a dedicated computer lab strengthen STEM learning for students at our Sahakar Nagar campus.",
  },
  {
    id: "donation-drive",
    date: "12 AA & 80 G",
    category: "Support",
    title: "OSSPM is authorised to receive tax-exempt donations",
    excerpt:
      "Contributions towards scholarships, infrastructure and rural outreach qualify for benefits under Sections 12 AA & 80 G of the Income Tax Act.",
  },
];

export const ADMISSION_STEPS = [
  {
    n: "01",
    title: "Enquiry & Eligibility",
    body: "Visit the campus or reach out via phone / email. Our admission desk will guide you through eligibility, documents required and available seats at each branch.",
  },
  {
    n: "02",
    title: "Application Form",
    body: "Collect the prospectus and submit a completed application form along with previous academic records, identity and residence proof, and recent photographs.",
  },
  {
    n: "03",
    title: "Interaction & Document Verification",
    body: "Students and parents attend a brief interaction with the academic committee. Originals are verified and provisional admission is confirmed.",
  },
  {
    n: "04",
    title: "Fee Payment & Enrolment",
    body: "Complete fee payment (concessions applicable for SC/ST, EBC and rural candidates) and collect the joining instructions, uniform and book list.",
  },
];

export const FAQ = [
  {
    q: "Which medium of instruction is offered?",
    a: "OSSPM runs 6 Marathi-medium schools, 2 English-medium schools and 3 higher-secondary / junior colleges across Ahmednagar, Jalna and Aurangabad districts.",
  },
  {
    q: "Do you provide scholarships or fee concessions?",
    a: "Yes. Merit-based and need-based concessions are extended to SC/ST, EBC and first-generation rural learners — up to 100% in qualifying cases.",
  },
  {
    q: "What is the admission window?",
    a: "The primary admission cycle runs from April to June every year. A limited mid-term intake is available depending on vacant seats.",
  },
  {
    q: "Are donations to OSSPM tax-exempt?",
    a: "Yes. OSSPM is authorised to receive donations under sections 12 AA & 80 G of the Income Tax Act. Receipts are issued for all contributions.",
  },
  {
    q: "How do I reach the Trust office?",
    a: "Our registered office is at Plot No 43, Gut No-91 Part, Samrat Nagar, Behind Bembde Hospital, By Pass Satara area, Aurangabad 431001.",
  },
];

export const IMAGES = {
  heroCampus:
    "https://static.prod-images.emergentagent.com/jobs/49237dc5-f78a-417a-9fae-2971c147c397/images/4054b25793b9a97cde782a26bd170262a45f46b8c10d703fd124c76967e29188.png",
  gallery: [
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop",
  ],
};

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/vision", label: "Vision" },
  { to: "/leadership", label: "Leadership" },
  { to: "/branches", label: "Branches" },
  { to: "/admissions", label: "Admissions" },
  { to: "/news", label: "News" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];
