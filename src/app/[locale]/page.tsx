import type { Metadata } from "next";
import { LocaleProvider } from "@/i18n/locale-context";
import type { Locale } from "@/i18n/routing";
import HeroSection from "@/components/HeroSection";
import ChapterGrid from "@/components/ChapterGrid";

export async function generateStaticParams() {
  return [{ locale: "zh-tw" }, { locale: "zh-cn" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "zh-cn" ? "RLHF 中文版 — 从人类反馈中强化学习" : "RLHF 中文版 — 從人類回饋中強化學習",
  };
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <LocaleProvider locale={locale}>
      <div className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <HeroSection locale={locale} />
        <ChapterGrid locale={locale} />
      </div>
    </LocaleProvider>
  );
}
