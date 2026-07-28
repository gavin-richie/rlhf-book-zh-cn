"use client";

import { useState, useEffect } from "react";

const SCROLL_THRESHOLD = 300;

export default function ScrollButtons() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-[1.5rem] right-[1.2rem] z-50 flex flex-col gap-[0.5rem]">
      <button
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
        className="inline-flex items-center justify-center w-[2.2rem] h-[2.2rem] rounded-full border border-[var(--border)] bg-[var(--panel)] text-[var(--fg)] shadow-[var(--shadow)] hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer text-[0.9rem] transition-opacity duration-200"
        aria-label="返回页面顶部"
        title="返回页面顶部"
      >
        ▲
      </button>
      <button
        onClick={() =>
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          })
        }
        className="inline-flex items-center justify-center w-[2.2rem] h-[2.2rem] rounded-full border border-[var(--border)] bg-[var(--panel)] text-[var(--fg)] shadow-[var(--shadow)] hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer text-[0.9rem] transition-opacity duration-200"
        aria-label="跳转到页面底部"
        title="跳转到页面底部"
      >
        ▼
      </button>
    </div>
  );
}