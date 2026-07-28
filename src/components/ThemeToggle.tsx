"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "rlhf-theme";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setDark(stored === "dark");
    } else {
      setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="inline-flex items-center justify-center w-[1.8rem] h-[1.8rem] rounded-full border border-[var(--border)] bg-[var(--panel)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer text-[1rem]"
      aria-label={dark ? "切换到白天模式" : "切换到夜间模式"}
      title={dark ? "切换到白天模式" : "切换到夜间模式"}
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}