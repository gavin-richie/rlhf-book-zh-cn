import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "RLHF 中文版 — 从人类反馈中强化学习",
  description:
    "Nathan Lambert 著。一本聚焦语言模型的 RLHF 与后训练（post-training）简明导论：从指令微调、奖励模型，到 PPO／GRPO、DPO、拒绝采样与推理模型。每一章都附有互动实验，边玩边懂核心概念。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <html lang="zh-Hans" className="antialiased">
      <head>
        <link rel="stylesheet" href={`${basePath}/assets/katex/katex.min.css`} />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Script src="/assets/katex/katex.min.js" strategy="beforeInteractive" />
        <Script
          src="/assets/katex/auto-render.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}