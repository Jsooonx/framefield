import { Metadata } from "next";
import { ValenOchreHero } from "../../../../../library/sections/valen-ochre-hero/source/ValenOchreHero";

export const metadata: Metadata = {
  title: "Valen & Ochre Studio Hero — Framefield",
  description: "A luxury architectural and interior design studio hero with vertical walnut fluting, downlights, dual-scene switcher, and interactive consultation drawer.",
};

export default function ValenOchreHeroPreviewPage() {
  return <ValenOchreHero />;
}
