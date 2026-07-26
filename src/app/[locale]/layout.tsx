import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { LocaleProvider } from "@/i18n/locale-context";
import "../globals.css";
import { notFound } from "next/navigation";

const LOCALES: Locale[] = ["zh-tw", "zh-cn"];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titleZhZHtw = "從人類回饋中強化學習";
  const titleZhZHcn = "从人类反馈中强化学习";
  return {
    title: locale === "zh-cn" ? `RLHF 中文版 — ${titleZhZHcn}` : `RLHF 中文版 — ${titleZhZHtw}`,
    description:
      "Nathan Lambert 著。一本聚焦語言模型的 RLHF 與後訓練（post-training）簡明導論：從指令微調、獎勵模型，到 PPO／GRPO、DPO、拒絕採樣與推理模型。每一章都附有互動實驗，邊玩邊懂核心概念。",
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) notFound();

  const lang = locale === "zh-cn" ? "zh-Hans" : "zh-Hant";

  return (
    <html lang={lang} className="antialiased">
      <body className="min-h-full flex flex-col">
        <LocaleProvider locale={locale as Locale}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
