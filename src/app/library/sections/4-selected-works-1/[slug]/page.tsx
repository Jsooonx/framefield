import { notFound } from "next/navigation";
import { SELECTED_WORKS, getSelectedWork } from "../../../../../../library/sections/4-selected-works-1/metadata";
import { SelectedWorkDetail } from "../../../../../../library/sections/4-selected-works-1/source/SelectedWorks";

export function generateStaticParams() {
  return SELECTED_WORKS.map((work) => ({ slug: work.slug }));
}

export default async function SelectedWorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = getSelectedWork(slug);
  if (!work) notFound();

  const index = SELECTED_WORKS.findIndex((item) => item.slug === work.slug);
  const previous = SELECTED_WORKS[(index - 1 + SELECTED_WORKS.length) % SELECTED_WORKS.length];
  const next = SELECTED_WORKS[(index + 1) % SELECTED_WORKS.length];

  return <SelectedWorkDetail work={work} previous={previous} next={next} />;
}
