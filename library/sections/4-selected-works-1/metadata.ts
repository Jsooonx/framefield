export type SelectedWork = {
  slug: string;
  number: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  brief: string;
  direction: string;
  stack: readonly string[];
  accent: string;
  fictionalLabel: string;
  route: string;
  visuals: readonly string[];
  visualCaptions: readonly string[];
  builtFrom: readonly string[];
};

const sectionRoute = "/library/sections/4-selected-works-1";

export const selectedWorksAsset = {
  slug: "4-selected-works-1",
  title: "4 Selected Works (1)",
  type: "section" as const,
  category: "Works",
  status: "published" as const,
  access: "Free" as const,
  tags: ["portfolio", "editorial", "case-study"],
  preview: "/library/sections/4-selected-works-1/cinder-bureau/visual-01.webp",
  previewVideo: "/library/sections/4-selected-works-1/preview.mp4",
  promptUrl: "/library/sections/4-selected-works-1/master-prompt.md",
  sourceAvailable: true,
  route: sectionRoute,
};

export const SELECTED_WORKS: readonly SelectedWork[] = [
  {
    slug: "cinder-bureau",
    number: "01",
    title: "Cinder Bureau",
    category: "Brand and spatial design practice",
    year: "2026",
    summary: "A tactile identity for a practice working between matter, place, and image.",
    brief: "Cinder Bureau needed a digital home with the same physical conviction as its work, without falling into the familiar portfolio of logo tiles and agency claims.",
    direction: "Graphite paper, mineral surfaces, and a quiet editorial index make the site feel collected rather than merely presented.",
    stack: ["Next.js", "Motion", "Image direction"],
    accent: "cinder",
    fictionalLabel: "Fictional case study — independent concept",
    route: `${sectionRoute}/cinder-bureau`,
    visuals: [
      "/library/sections/4-selected-works-1/cinder-bureau/visual-01.webp",
      "/library/sections/4-selected-works-1/cinder-bureau/visual-02.webp",
    ],
    visualCaptions: ["Graphite, stone, and printed matter", "An identity held in material"],
    builtFrom: ["Editorial hero", "Studio index", "Material-led type system"],
  },
  {
    slug: "auralis",
    number: "02",
    title: "Auralis",
    category: "Human-centred research laboratory",
    year: "2026",
    summary: "A luminous research identity that keeps human perception at the centre.",
    brief: "Auralis needed to make future-facing research feel open, sensitive, and understandable to the people invited to shape it.",
    direction: "Prismatic light, restrained interfaces, and close human crops trade a cold technology aesthetic for a quieter sense of discovery.",
    stack: ["Next.js", "Motion", "Editorial imagery"],
    accent: "auralis",
    fictionalLabel: "Fictional case study — independent concept",
    route: `${sectionRoute}/auralis`,
    visuals: [
      "/library/sections/4-selected-works-1/auralis/visual-01.webp",
      "/library/sections/4-selected-works-1/auralis/visual-02.webp",
    ],
    visualCaptions: ["Perception as a starting point", "Research translated through touch"],
    builtFrom: ["Luminous hero", "Research index", "Human signal studies"],
  },
  {
    slug: "stillhouse",
    number: "03",
    title: "Stillhouse",
    category: "Architecture practice",
    year: "2026",
    summary: "A composed digital space for architecture built from light, scale, and pause.",
    brief: "Stillhouse wanted its work to set the tempo online, so visitors could encounter proportion and atmosphere before an explanation.",
    direction: "Stone, plaster, and generous quiet space bring the sensation of walking through an unfinished room to the screen.",
    stack: ["React", "Editorial grid", "Image direction"],
    accent: "stillhouse",
    fictionalLabel: "Fictional case study — independent concept",
    route: `${sectionRoute}/stillhouse`,
    visuals: [
      "/library/sections/4-selected-works-1/stillhouse/visual-01.webp",
      "/library/sections/4-selected-works-1/stillhouse/visual-02.webp",
    ],
    visualCaptions: ["A room held by light", "A stair reduced to its rhythm"],
    builtFrom: ["Gallery hero", "Project index", "Spatial image studies"],
  },
  {
    slug: "vela-objects",
    number: "04",
    title: "Vela Objects",
    category: "Contemporary object label",
    year: "2026",
    summary: "A catalogue direction for objects that earn their place through ritual and material.",
    brief: "Vela Objects needed a storefront with the composure of a printed catalogue, where atmosphere arrives before a product grid.",
    direction: "Oxidized lacquer, brushed metal, and quiet crops give each object enough visual weight to feel considered.",
    stack: ["Next.js", "Commerce system", "Visual direction"],
    accent: "vela",
    fictionalLabel: "Fictional case study — independent concept",
    route: `${sectionRoute}/vela-objects`,
    visuals: [
      "/library/sections/4-selected-works-1/vela-objects/visual-01.webp",
      "/library/sections/4-selected-works-1/vela-objects/visual-02.webp",
    ],
    visualCaptions: ["A vessel with a quiet pull", "Objects arranged as an editorial field"],
    builtFrom: ["Product hero", "Editorial commerce grid", "Object detail system"],
  },
];

export function getSelectedWork(slug: string) {
  return SELECTED_WORKS.find((work) => work.slug === slug);
}
