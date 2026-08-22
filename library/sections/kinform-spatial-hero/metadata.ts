const sectionRoute = "/library/sections/kinform-spatial-hero";

export const kinformSpatialHeroAsset = {
  slug: "kinform-spatial-hero",
  title: "KINFORM Spatial Hero",
  type: "section" as const,
  category: "Hero",
  status: "review" as const,
  access: "Free" as const,
  tags: ["hero", "architecture", "interior"],
  preview: "/library/sections/kinform-spatial-hero/hero-poster.webp",
  previewVideo: "/library/sections/kinform-spatial-hero/preview.mp4",
  promptUrl: "/library/sections/kinform-spatial-hero/master-prompt.md",
  sourceAvailable: true,
  route: sectionRoute,
  fictionalLabel: "Fictional spatial-studio demonstration",
} as const;
