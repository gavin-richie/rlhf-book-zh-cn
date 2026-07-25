"use client";

import { useEffect, useRef } from "react";

export default function LabSection({ chapterId }: { chapterId: string }) {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    const scriptUrl = `/assets/widgets/${chapterId}.js`;

    // Clean up previous script if any
    const cleanup = () => {
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }
      (window as typeof window & { ChapterWidget?: unknown }).ChapterWidget = undefined;
      document.querySelectorAll(`script[src="${scriptUrl}"]`).forEach(s => s.remove());
    };

    // When chapterId changes, cleanup happens at top of effect before loading new script
    // (React fires cleanup of old effect before new effect runs)

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    scriptRef.current = script;

    const loadWidget = () => {
      const w = (window as typeof window & { ChapterWidget?: {
        render: (el: Element) => void;
        title?: string;
        intro?: string;
      } }).ChapterWidget;
      if (!w) return;

      const lab = document.getElementById("lab");
      if (!lab) return;

      lab.style.visibility = "visible";
      lab.style.height = "auto";
      lab.style.overflow = "visible";
      lab.style.margin = "";
      lab.style.padding = "";
      lab.removeAttribute("aria-hidden");

      if (w.title) {
        const titleEl = lab.querySelector(".lab-title") as HTMLElement | null;
        if (titleEl) titleEl.textContent = `🧪 互動實驗室 · ${w.title}`;
      }
      if (w.intro) {
        const introEl = document.getElementById("lab-intro");
        if (introEl) {
          introEl.className = "lab-intro";
          introEl.textContent = w.intro;
        }
      }
      try {
        const labRoot = document.getElementById("lab-root");
        if (labRoot) w.render(labRoot);
      } catch (err) {
        console.error("widget render failed:", err);
      }
    };

    script.onload = loadWidget;
    script.onerror = () => {
      console.error(`Failed to load widget: ${scriptUrl}`);
    };

    document.head.appendChild(script);

    return () => {
      script.remove();
      scriptRef.current = null;
      (window as typeof window & { ChapterWidget?: unknown }).ChapterWidget = undefined;
    };
  }, [chapterId]);

  return (
    <section
      id="lab"
      className="lab"
      style={{ visibility: "hidden", height: 0, overflow: "hidden", margin: 0, padding: 0 }}
      aria-hidden="true"
    >
      <h2 className="lab-title">🧪 互動實驗室</h2>
      <div id="lab-intro" />
      <div id="lab-root" />
    </section>
  );
}
