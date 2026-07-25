import Link from "next/link";
import type { ChapterMeta } from "@/lib/chapters";

export default function ChapterPage({
  meta,
  html,
  toc,
}: {
  meta: ChapterMeta;
  html: string;
  toc: { id: string; text: string }[];
}) {
  return (
    <>
      <h2 className="font-serif text-[0.8rem] tracking-[0.12em] text-[var(--fg-muted)] font-semibold mt-0 mb-[0.6rem]">
        本章目錄
      </h2>
      <ol className="list-none m-0 p-0">
        {toc.map((h) => (
          <li key={h.id}>
            <Link
              href={`#${h.id}`}
              className="block py-[0.28rem] px-[0.6rem] border-l-2 border-[var(--border)] text-[var(--fg-muted)] leading-[1.5] text-[0.82rem] hover:text-[var(--accent)] no-underline"
            >
              {h.text}
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}