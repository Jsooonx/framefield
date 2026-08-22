const sectionRoute = "/library/sections/valen-ochre-hero";

export const valenOchreHeroAsset = {
  slug: "valen-ochre-hero",
  title: "Valen & Ochre Studio Hero",
  type: "section" as const,
  category: "Hero",
  status: "published" as const,
  access: "Free" as const,
  tags: ["hero", "architecture", "nordic", "luxury", "interior", "timber"],
  preview: "/library/sections/valen-ochre-hero/hero-bg.jpg",
  previewVideo: "/library/sections/valen-ochre-hero/preview.mp4",
  promptUrl: "/library/sections/valen-ochre-hero/master-prompt.md",
  sourceAvailable: true,
  route: sectionRoute,
  fictionalLabel: "Nordic architectural atelier demonstration",
} as const;
