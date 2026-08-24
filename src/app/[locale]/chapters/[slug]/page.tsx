import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import ChapterLayout from "@/components/ChapterLayout";
import ScrollToHash from "@/components/ScrollToHash";
import { ALL_CHAPTERS, getChapterContent } from "@/i18n/chapters-zh-tw";
import { ALL_CHAPTERS as ALL_CHAPTERS_ZHCN, getChapterContent as getChapterContentZHCN } from "@/i18n/chapters-zh-cn";

export function generateStaticParams() {
  const slugs = [
    ...ALL_CHAPTERS.map((c) => ({ locale: "zh-tw", slug: c.id })),
    ...ALL_CHAPTERS_ZHCN.map((c) => ({ locale: "zh-cn", slug: c.id })),
  ];
  return slugs;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const chapters = locale === "zh-cn" ? ALL_CHAPTERS_ZHCN : ALL_CHAPTERS;
  const meta = chapters.find((c) => c.id === slug);
  if (!meta) return {};
  return {
    title: `${meta.number} ${meta.titleZh} — RLHF 中文版`,
    description: `${meta.titleEn} - ${meta.titleZh}`,
  };
}

export default async function ChapterPageRoute({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const chapters = locale === "zh-cn" ? ALL_CHAPTERS_ZHCN : ALL_CHAPTERS;
  const meta = chapters.find((c) => c.id === slug);
  if (!meta) notFound();
  const getChapterContentFn = locale === "zh-cn" ? getChapterContentZHCN : getChapterContent;
  const { html, toc } = await getChapterContentFn(slug);
  return (
    <>
      {slug === "bibliography" && <ScrollToHash />}
      <ChapterLayout meta={meta} toc={toc} html={html} chapterId={slug} locale={locale} />
    </>
  );
}
