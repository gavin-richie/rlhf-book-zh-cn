import Link from "next/link";
import type { ChapterMeta } from "@/lib/chapters";
import TopBar from "./TopBar";
import ChapterToc from "./ChapterToc";
import LabSection from "./LabSection";
import LabLink from "./LabLink";

export default function ChapterLayout({
  meta,
  toc,
  html,
  chapterId,
}: {
  meta: ChapterMeta;
  toc: { id: string; text: string }[];
  html: string;
  chapterId?: string;
}) {
  const currentLabel = `${meta.number} ${meta.titleZh}`;
  const prevShort = meta.prev ? meta.prev.title.replace(/^第 [^ ]+ 章\s*/, '') : undefined;
  const nextShort = meta.next ? meta.next.title.replace(/^第 [^ ]+ 章\s*/, '') : undefined;
  const hasToc = toc.length > 0;
  const hasLab = chapterId !== undefined;

  return (
    <div className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
      <TopBar
        current={currentLabel}
        prev={meta.prev ? { id: meta.prev.id, title: prevShort ?? "" } : undefined}
        next={meta.next ? { id: meta.next.id, title: nextShort ?? "" } : undefined}
        brandLabel="從人類回饋中強化學習"
      />
      <div className="grid max-w-[1120px] mx-auto gap-[2.2rem] py-[1.6rem] px-[1.2rem] pb-[4rem] grid-cols-1 lg:grid-cols-[230px_minmax(0,1fr)]">
        {!hasToc && (
          <main className="min-w-0 max-w-[820px] mx-auto">
            <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
          </main>
        )}
        {hasToc && (
          <>
            <aside className="hidden lg:block text-[0.82rem]">
              <nav className="sticky top-[4.2rem] max-h-[calc(100vh-6rem)] overflow-y-auto pr-[0.4rem]">
                <ChapterToc toc={toc} />
              </nav>
            </aside>
            <main className="min-w-0">
              {hasLab && (
                <div className="lab-banner">
                  🧪 本章附有互動實驗：<LabLink />
                </div>
              )}
              <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
              {hasLab && (
                <LabSection chapterId={chapterId} />
              )}
              <nav className="grid grid-cols-2 gap-[1rem] mt-[2.6rem]">
                {meta.prev ? (
                  <Link
                    href={`/chapters/${meta.prev.id}`}
                    className="block px-[1.1rem] py-[0.9rem] border border-[var(--border)] rounded-[12px] bg-[var(--panel)] hover:border-[var(--accent)] no-underline"
                  >
                    <div className="text-[0.75rem] text-[var(--fg-muted)]">← 上一章</div>
                    <div className="font-semibold text-[var(--fg)]">{meta.prev.title}</div>
                  </Link>
                ) : (
                  <span />
                )}
                {meta.next && (
                  <Link
                    href={`/chapters/${meta.next.id}`}
                    className="block px-[1.1rem] py-[0.9rem] border border-[var(--border)] rounded-[12px] bg-[var(--panel)] text-right hover:border-[var(--accent)] no-underline"
                  >
                    <div className="text-[0.75rem] text-[var(--fg-muted)]">下一章 →</div>
                    <div className="font-semibold text-[var(--fg)]">{meta.next.title}</div>
                  </Link>
                )}
              </nav>
              <footer className="mt-[3rem] pt-[1.2rem] border-t border-[var(--border)] text-[0.78rem] text-[var(--fg-muted)]">
                本站為{" "}
                <Link href="https://github.com/ai-twinkle" className="text-[var(--link)]">
                  Twinkle AI Community
                </Link>
                （台灣）的
                <strong className="text-[var(--fg)]">非官方社群翻譯</strong>
                （unofficial community translation）· 譯自 Nathan Lambert,《Reinforcement Learning from Human Feedback》（
                <Link href="https://rlhfbook.com" className="text-[var(--link)]">
                  rlhfbook.com
                </Link>
                ）· 依{" "}
                <Link href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hant" className="text-[var(--link)]">
                  CC BY-NC-SA 4.0
                </Link>
                授權，僅供學習研究、不得作商業用途。
              </footer>
            </main>
          </>
        )}
      </div>
    </div>
  );
}
