import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { LocaleProvider } from "@/i18n/locale-context";
import "../globals.css";
import { notFound } from "next/navigation";

const LOCALES: Locale[] = ["zh-tw", "zh-cn"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titleZhZHtw = "從人類回饋中強化學習";
  const titleZhZHcn = "从人类反馈中强化学习";
  return {
    title:
      locale === "zh-cn"
        ? `RLHF 中文版 — ${titleZhZHcn}`
        : `RLHF 中文版 — ${titleZhZHtw}`,
    description:
      "Nathan Lambert 著。一本聚焦语言模型的 RLHF 与后训练（post-training）简明导论：从指令微调、奖励模型，到 PPO／GRPO、DPO、拒绝采样与推理模型。每一章都附有互动实验，边玩边懂核心概念。",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) notFound();

  const ClientLayout = (await import("./client-layout")).default;

  return (
    <LocaleProvider locale={locale as Locale}>
      <ClientLayout>{children}</ClientLayout>
    </LocaleProvider>
  );
}