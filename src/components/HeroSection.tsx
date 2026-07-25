import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="max-w-[1120px] mx-auto px-[1.2rem] pt-[4rem] pb-[2.4rem]">
      <span className="text-[var(--accent)] font-semibold tracking-[0.18em] text-[0.8rem]">
        繁體中文全譯本 · 互動版
      </span>
      <h1 className="font-serif text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.35] my-[0.5rem] text-[var(--fg)]">
        從人類回饋中強化學習
        <br />
        Reinforcement Learning from Human Feedback
      </h1>
      <p className="text-[var(--fg-muted)] max-w-[42rem]">
        Nathan Lambert 著。一本聚焦語言模型的 RLHF 與後訓練（post-training）簡明導論：從指令微調、獎勵模型，到 PPO／GRPO、DPO、拒絕採樣與推理模型。每一章都附有互動實驗，邊玩邊懂核心概念。
      </p>
      <p className="text-[var(--fg-muted)] max-w-[42rem]">
        由台灣{" "}
        <Link
          href="https://github.com/ai-twinkle"
          className="text-[var(--link)] hover:text-[var(--accent)]"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twinkle AI Community
        </Link>{" "}
        翻譯維護的非官方社群翻譯版本。
      </p>
      <div className="flex flex-wrap gap-x-[1.6rem] gap-y-[0.8rem] my-[1.6rem] text-[0.85rem] text-[var(--fg-muted)]">
        <span>
          <b className="text-[var(--fg)] text-[1.15rem] font-serif block">17</b>
          章節
        </span>
        <span>
          <b className="text-[var(--fg)] text-[1.15rem] font-serif block">3</b>
          附錄
        </span>
        <span>
          <b className="text-[var(--fg)] text-[1.15rem] font-serif block">49</b>
          插圖
        </span>
        <span>
          <b className="text-[var(--fg)] text-[1.15rem] font-serif block">20</b>
          互動實驗
        </span>
        <Link
          href="https://github.com/ai-twinkle/rlhf-book-zh-tw"
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
