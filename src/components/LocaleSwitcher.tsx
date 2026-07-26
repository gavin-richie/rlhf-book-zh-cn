"use client";

import { useLocale } from "@/i18n/locale-context";
import { usePathname, useRouter } from "next/navigation";
import { useState, useCallback } from "react";

const LOCALE_LABELS: Record<string, string> = {
  "zh-tw": "繁體中文",
  "zh-cn": "简体中文",
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const toggleLocale = useCallback(() => {
    const next = locale === "zh-tw" ? "zh-cn" : "zh-tw";
    // Remove current locale prefix, then prepend the new one
    const withoutLocale = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${next}${withoutLocale}`);
    setOpen(false);
  }, [locale, pathname, router]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 border border-[var(--border)] rounded-full bg-[var(--panel)] text-[var(--fg)] text-[0.8rem] font-semibold whitespace-nowrap px-[0.7rem] py-[0.25rem] hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer"
        aria-label="Switch language"
      >
        {LOCALE_LABELS[locale]}
        <span className="text-[0.7rem] text-[var(--fg-muted)]">▾</span>
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-50"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 z-50 bg-[var(--panel)] border border-[var(--border)] rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={toggleLocale}
              className="block w-full text-left px-[0.8rem] py-[0.4rem] text-[0.8rem] hover:bg-[var(--panel-2)] cursor-pointer"
            >
              {LOCALE_LABELS[locale === "zh-tw" ? "zh-cn" : "zh-tw"]}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
