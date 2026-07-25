import Link from "next/link";

interface TopBarProps {
  current?: string;
  prev?: { id: string; title: string };
  next?: { id: string; title: string };
  brandLabel?: string;
}

export default function TopBar({ current, prev, next, brandLabel }: TopBarProps) {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_88%,transparent)] px-[1.2rem] py-[0.65rem] backdrop-blur-[10px]">
      <Link
        href="/"
        className="font-serif text-[var(--fg)] text-[1.05rem] font-bold no-underline hover:text-[var(--accent)] whitespace-nowrap"
      >
        RLHF
        <span className="ml-[0.55rem] font-sans text-[0.8rem] font-normal text-[var(--fg-muted)]">
          {brandLabel ?? "繁體中文全譯本 · 互動版"}
        </span>
      </Link>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-[0.8rem] text-[0.85rem]">
          {prev && (
            <Link href={`/chapters/${prev.id}`} className="text-[var(--fg-muted)] hover:text-[var(--accent)] no-underline">
              ← {prev.title}
            </Link>
          )}
          {current && (
            <span className="font-semibold text-[var(--fg)] max-w-[40vw] overflow-hidden text-ellipsis whitespace-nowrap">
              {current}
            </span>
          )}
          {next && (
            <Link href={`/chapters/${next.id}`} className="text-[var(--fg-muted)] hover:text-[var(--accent)] no-underline">
              {next.title} →
            </Link>
          )}
        </div>
        <Link
          href="https://github.com/ai-twinkle/rlhf-book-zh-tw"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-[0.45rem] border border-[var(--border)] rounded-full bg-[var(--panel)] text-[var(--fg)] text-[0.8rem] font-semibold whitespace-nowrap px-[0.8rem] py-[0.3rem] hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <span className="text-[var(--accent-2)]">★</span>
          <span className="hidden sm:inline">GitHub ★</span>
          <span className="font-bold bg-[var(--panel-2)] rounded-full px-[0.5rem] min-w-[1.4em] text-center">
            172
          </span>
        </Link>
      </div>
    </nav>
  );
}