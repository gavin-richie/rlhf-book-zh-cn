import Link from "next/link";
import type { Locale } from "@/i18n/locale-context";

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const isZhTw = locale === "zh-tw";

  const ccLicenseHref = isZhTw
    ? "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hant"
    : "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans";

  const githubHref = isZhTw
    ? "https://github.com/ai-twinkle/rlhf-book-zh-tw"
    : "https://github.com/ai-twinkle/rlhf-book-zh-cn";

  if (isZhTw) {
    return (
      <footer className="max-w-[1120px] mx-auto px-[1.2rem] py-[3rem] text-[0.78rem] text-[var(--fg-muted)]">
        本站為{" "}
        <Link
          href="https://github.com/ai-twinkle"
          className="text-[var(--link)]"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twinkle AI Community
        </Link>
        （台灣）的
        非官方社群翻譯（unofficial community translation），已獲原作者知悉（
        <Link
          href="https://github.com/natolambert/rlhf-book/issues/472"
          className="text-[var(--link)]"
          target="_blank"
          rel="noopener noreferrer"
        >
          rlhf-book#472
        </Link>
        ）· 譯自 Nathan Lambert,《Reinforcement Learning from Human Feedback》（
        <Link
          href="https://rlhfbook.com/"
          className="text-[var(--link)]"
          target="_blank"
          rel="noopener noreferrer"
        >
          rlhfbook.com
        </Link>
        ，2026-07-01 版）· 依{" "}
        <Link
          href={ccLicenseHref}
          className="text-[var(--link)]"
          target="_blank"
          rel="noopener noreferrer"
        >
          CC BY-NC-SA 4.0
        </Link>
        授權翻譯，僅供學習研究、不得作商業用途 · 支持原作者請購買
        <Link
          href="https://rlhfbook.com/"
          className="text-[var(--link)]"
          target="_blank"
          rel="noopener noreferrer"
        >
          實體書
        </Link>
        ·{" "}
        <Link
          href={githubHref}
          className="text-[var(--link)]"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub 原始碼
        </Link>
      </footer>
    );
  }

  return (
    <footer className="max-w-[1120px] mx-auto px-[1.2rem] py-[3rem] text-[0.78rem] text-[var(--fg-muted)]">
      本站为{" "}
      <Link
        href="https://github.com/ai-twinkle"
        className="text-[var(--link)]"
        target="_blank"
        rel="noopener noreferrer"
      >
        Twinkle AI Community
      </Link>
      的
      非官方社群翻译（unofficial community translation），已获得原作者知悉（
      <Link
        href="https://github.com/natolambert/rlhf-book/issues/472"
        className="text-[var(--link)]"
        target="_blank"
        rel="noopener noreferrer"
      >
        rlhf-book#472
      </Link>
      ）· 译自 Nathan Lambert,《Reinforcement Learning from Human Feedback》（
      <Link
        href="https://rlhfbook.com/"
        className="text-[var(--link)]"
        target="_blank"
        rel="noopener noreferrer"
      >
        rlhfbook.com
      </Link>
      ，2026-07-01 版）· 依{" "}
      <Link
        href={ccLicenseHref}
        className="text-[var(--link)]"
        target="_blank"
        rel="noopener noreferrer"
      >
        CC BY-NC-SA 4.0
      </Link>
      授权翻译，仅供学习研究、不得作商业用途 · 支持原作者请购买
      <Link
        href="https://rlhfbook.com/"
        className="text-[var(--link)]"
        target="_blank"
        rel="noopener noreferrer"
      >
        实体书
      </Link>
      ·{" "}
      <Link
        href={githubHref}
        className="text-[var(--link)]"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub 源代码
      </Link>
    </footer>
  );
}
