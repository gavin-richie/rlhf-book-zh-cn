import Link from "next/link";
import type { ChapterMeta } from "@/i18n/chapters-zh-tw";
import TopBar from "./TopBar";
import ChapterToc from "./ChapterToc";
import LabSection from "./LabSection";
import LabLink from "./LabLink";
import Footer from "./Footer";
import KatexAutoRender from "./KatexAutoRender";
import type { Locale } from "@/i18n/locale-context";

export default function ChapterLayout({
  meta,
  toc,
  html,
  chapterId,
  locale = "zh-tw",
}: {
  meta: ChapterMeta;
  toc: { id: string; text: string }[];
  html: string;
  chapterId?: string;
  locale?: Locale;
}) {
  const isZhTw = locale === "zh-tw";
  const currentLabel = `${meta.number} ${meta.titleZh}`;
  const prevShort = meta.prev ? meta.prev.title.replace(/^第 [^ ]+ 章\s*/, '') : undefined;
  const nextShort = meta.next ? meta.next.title.replace(/^第 [^ ]+ 章\s*/, '') : undefined;
  const hasToc = toc.length > 0;
  const hasLab = chapterId !== undefined;
  const chaptersHref = isZhTw ? "/zh-tw/chapters" : "/zh-cn/chapters";

  const labNote = isZhTw
    ? "本章附有互動實驗"
    : "本章附有互动实验";
  const goLab = isZhTw
    ? "前往實驗室 ↓"
    : "前往实验室 ↓";
  const prevLabel = isZhTw ? "← 上一章" : "← 上一章";
  const nextLabel = isZhTw ? "下一章 →" : "下一章 →";

  return (
    <div className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
      <TopBar
        locale={locale}
        current={currentLabel}
        prev={meta.prev ? { id: meta.prev.id, title: prevShort ?? "" } : undefined}
        next={meta.next ? { id: meta.next.id, title: nextShort ?? "" } : undefined}
      />
      <div className="grid max-w-[1120px] mx-auto gap-[2.2rem] py-[1.6rem] px-[1.2rem] pb-[4rem] grid-cols-1 lg:grid-cols-[230px_minmax(0,1fr)]">
        {/* Client-side KaTeX auto-render as safety fallback */}
        <KatexAutoRender selector=".prose" />
        {!hasToc && (
          <main className="min-w-0 max-w-[820px] mx-auto">
            <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
          </main>
        )}
        {hasToc && (
          <>
            <aside className="hidden lg:block text-[0.82rem]">
              <nav className="sticky top-[4.2rem] max-h-[calc(100vh-6rem)] overflow-y-auto pr-[0.4rem]">
                <ChapterToc toc={toc} locale={locale} />
              </nav>
            </aside>
            <main className="min-w-0">
              {hasLab && (
                <div className="lab-banner">
                  🧪 {labNote}：<LabLink />
                </div>
              )}
              <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
              {hasLab && (
                <LabSection chapterId={chapterId} locale={locale} />
              )}
              <nav className="grid grid-cols-2 gap-[1rem] mt-[2.6rem]">
                {meta.prev ? (
                  <Link
                    href={`${chaptersHref}/${meta.prev.id}`}
                    className="block px-[1.1rem] py-[0.9rem] border border-[var(--border)] rounded-[12px] bg-[var(--panel)] hover:border-[var(--accent)] no-underline"
                  >
                    <div className="text-[0.75rem] text-[var(--fg-muted)]">{prevLabel}</div>
                    <div className="font-semibold text-[var(--fg)]">{meta.prev.title}</div>
                  </Link>
                ) : (
                  <span />
                )}
                {meta.next && (
                  <Link
                    href={`${chaptersHref}/${meta.next.id}`}
                    className="block px-[1.1rem] py-[0.9rem] border border-[var(--border)] rounded-[12px] bg-[var(--panel)] text-right hover:border-[var(--accent)] no-underline"
                  >
                    <div className="text-[0.75rem] text-[var(--fg-muted)]">{nextLabel}</div>
                    <div className="font-semibold text-[var(--fg)]">{meta.next.title}</div>
                  </Link>
                )}
              </nav>
            </main>
          </>
        )}
      </div>
      <Footer locale={locale} />
    </div>
  );
}
