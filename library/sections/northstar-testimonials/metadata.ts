export type NorthstarMetric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
};

const sectionRoute = "/library/sections/northstar-testimonials";

export const northstarTestimonialsAsset = {
  slug: "northstar-testimonials",
  title: "NORTHSTAR Testimonials",
  type: "section" as const,
  category: "Testimonials",
  status: "published" as const,
  access: "Free" as const,
  tags: ["testimonials", "bento", "performance"],
  preview: "/library/sections/northstar-testimonials/cobalt-data-field.webp",
  previewVideo: "/library/sections/northstar-testimonials/preview.mp4",
  promptUrl: "/library/sections/northstar-testimonials/master-prompt.md",
  sourceAvailable: true,
  route: sectionRoute,
  fictionalLabel: "Fictional performance-partner demonstration",
};

export const NORTHSTAR_METRICS: readonly NorthstarMetric[] = [
  { value: 3.8, suffix: "×", label: "qualified demand", detail: "Illustrative growth signal" },
  { value: 42, suffix: "%", label: "conversion lift", detail: "Illustrative experience outcome" },
  { value: 98, label: "performance score", detail: "Illustrative speed benchmark" },
  { value: 61, prefix: "+", suffix: "%", label: "qualified pipeline", detail: "Illustrative demand signal" },
];

export const NORTHSTAR_TESTIMONIALS = [
  {
    name: "Mira Chen",
    role: "Growth lead, Atlas House",
    quote: "The new path made our offer feel obvious without making it feel smaller.",
    initials: "MC",
  },
  {
    name: "Theo Walsh",
    role: "Founder, Eave Studio",
    quote: "NORTHSTAR found the friction we had learned to ignore.",
    initials: "TW",
  },
  {
    name: "Ari Sato",
    role: "Brand director, Serein",
    quote: "Every decision moved a real measure, not just the mood.",
    initials: "AS",
  },
] as const;

export const ATLAS_HOUSE_CASE_STUDY = {
  title: "Atlas House",
  category: "Fictional home-goods label",
  route: `${sectionRoute}/atlas-house`,
  signalsRoute: `${sectionRoute}#metrics`,
  portrait: "/library/sections/northstar-testimonials/atlas-house-portrait.webp",
  fictionalLabel: "Fictional case study",
  quote: "We stopped asking visitors to work out why the collection mattered. The site finally did that work with us.",
  author: "Mira Chen, Growth lead",
} as const;
