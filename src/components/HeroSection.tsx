import Link from "next/link";
import type { Locale } from "@/i18n/locale-context";

interface HeroSectionProps {
  locale: Locale;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const isZhTw = locale === "zh-tw";

  const brandLabel = isZhTw ? "繁體中文全譯本 · 互動版" : "繁体中文全译本 · 互动版";

  const subtitle = isZhTw
    ? `Nathan Lambert 著。一本聚焦語言模型的 RLHF 與後訓練（post-training）簡明導論：從指令微調、獎勵模型，到 PPO／GRPO、DPO、拒絕採樣與推理模型。每一章都附有互動實驗，邊玩邊懂核心概念。`
    : `Nathan Lambert 著。一本聚焦语言模型的 RLHF 与后训练（post-training）简明导论：从指令微调、奖励模型，到 PPO／GRPO、DPO、拒绝采样与推理模型。每一章都附有互动实验，边玩边懂核心概念。`;

  const byline = isZhTw
    ? `由台灣  `
    : `由  `;

  const communityName = isZhTw
    ? `Twinkle AI Community  `
    : `Twinkle AI Community  `;

  const communityDesc = isZhTw
    ? `翻譯維護的非官方社群翻譯版本。`
    : `翻译维护的非官方社群翻译版本。`;

  const sections = isZhTw
    ? [
        { count: "17", label: "章節" },
        { count: "3", label: "附錄" },
        { count: "49", label: "插圖" },
        { count: "20", label: "互動實驗" },
      ]
    : [
        { count: "17", label: "章节" },
        { count: "3", label: "附录" },
        { count: "49", label: "插图" },
        { count: "20", label: "互动实验" },
      ];

  const githubHref = isZhTw
    ? "https://github.com/ai-twinkle/rlhf-book-zh-tw"
    : "https://github.com/ai-twinkle/rlhf-book-zh-cn";

  return (
    <section className="max-w-[1120px] mx-auto px-[1.2rem] pt-[4rem] pb-[2.4rem]">
      <span className="text-[var(--accent)] font-semibold tracking-[0.18em] text-[0.8rem]">
        {brandLabel}
      </span>
      <h1 className="font-serif text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.35] my-[0.5rem] text-[var(--fg)]">
        從人類回饋中強化學習
        <br />
        Reinforcement Learning from Human Feedback
      </h1>
      <p className="text-[var(--fg-muted)] max-w-[42rem]">
        {subtitle}
      </p>
      <p className="text-[var(--fg-muted)] max-w-[42rem]">
        {byline}
        <Link
          href="https://github.com/ai-twinkle"
          className="text-[var(--link)] hover:text-[var(--accent)]"
          target="_blank"
          rel="noopener noreferrer"
        >
          {communityName}
        </Link>
        {communityDesc}
      </p>
      <div className="flex flex-wrap gap-x-[1.6rem] gap-y-[0.8rem] my-[1.6rem] text-[0.85rem] text-[var(--fg-muted)]">
        {sections.map((s) => (
          <span key={s.label}>
            <b className="text-[var(--fg)] text-[1.15rem] font-serif block">{s.count}</b>
            {s.label}
          </span>
        ))}
        <Link
          href={githubHref}
          className="text-[var(--fg-muted)] hover:text-[var(--accent)]"
          target="_blank"
          rel="noopener noreferrer"
        >
          172 GitHub ★
        </Link>
      </div>
    </section>
  );
}
