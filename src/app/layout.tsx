import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RLHF 中文版 — 從人類回饋中強化學習",
  description:
    "Nathan Lambert 著。一本聚焦語言模型的 RLHF 與後訓練（post-training）簡明導論：從指令微調、獎勵模型，到 PPO／GRPO、DPO、拒絕採樣與推理模型。每一章都附有互動實驗，邊玩邊懂核心概念。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className="antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}