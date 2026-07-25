import { notFound } from "next/navigation";
import ChapterLayout from "@/components/ChapterLayout";
import ScrollToHash from "@/components/ScrollToHash";
import { ALL_CHAPTERS, getChapterContent } from "@/lib/chapters";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = ALL_CHAPTERS.find((c) => c.id === slug);
  if (!meta) return {};
  return {
    title: `${meta.number} ${meta.titleZh} — RLHF 中文版`,
    description: `${meta.titleEn} - ${meta.titleZh}`,
  };
}

export default async function ChapterPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = ALL_CHAPTERS.find((c) => c.id === slug);
  if (!meta) notFound();
  const { html, toc } = await getChapterContent(slug);
  return (
    <>
      <link rel="stylesheet" href="/assets/katex/katex.min.css" />
      {slug === "bibliography" && <ScrollToHash />}
      <ChapterLayout meta={meta} toc={toc} html={html} chapterId={slug} />
    </>
  );
}
