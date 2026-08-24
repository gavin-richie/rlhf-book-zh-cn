"use client";

import { useEffect, useRef } from "react";

interface LabSectionProps {
  chapterId: string;
  locale?: string;
}

export default function LabSection({ chapterId, locale }: LabSectionProps) {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // Use zh-CN widget directory when locale is zh-cn, otherwise default to regular widgets
      const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
      const widgetPrefix = locale === "zh-cn" ? `${base}/assets/widgets-zh-cn` : `${base}/assets/widgets`;
      const scriptUrl = `${widgetPrefix}/${chapterId}.js`;

      // Clear DOM content immediately to remove stale widget during navigation
      const labRoot = document.getElementById("lab-root");
      if (labRoot) labRoot.textContent = "";
      const labIntro = document.getElementById("lab-intro");
      if (labIntro) labIntro.textContent = "";

      // Remove ALL widget scripts so they don't accumulate across navigations
      const prefixRegex = new RegExp(`^${widgetPrefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/`);
      document.querySelectorAll('script[src]').forEach(el => {
        const s = el as HTMLScriptElement;
        if (s.src.startsWith(widgetPrefix)) s.remove();
      });
      (window as typeof window & { ChapterWidget?: unknown }).ChapterWidget = undefined;

      // Ensure KaTeX JS is loaded before widget script (many widgets use tex()).
      // Wait for the KaTeX script to be fully loaded before creating the widget
      // script, so the browser guarantees window.katex exists when widgets run.
      let katexPromise: Promise<void>;
      const kt = document.getElementById("katex-js") as HTMLScriptElement | null;
      if (!kt) {
        katexPromise = new Promise<void>((resolve) => {
          // Ensure KaTeX CSS is loaded if not already present.
          if (!document.getElementById("katex-css")) {
            const cssLink = document.createElement("link");
            cssLink.id = "katex-css";
            cssLink.rel = "stylesheet";
            const katexBase = process.env.NEXT_PUBLIC_BASE_PATH || "";
            cssLink.href = `${katexBase}/assets/katex/katex.min.css`;
            document.head.appendChild(cssLink);
          }
          const ktScript = document.createElement("script");
          ktScript.id = "katex-js";
          const katexBase = process.env.NEXT_PUBLIC_BASE_PATH || "";
          ktScript.src = `${katexBase}/assets/katex/katex.min.js`;
          ktScript.onload = () => resolve();
          document.head.appendChild(ktScript);
        });
      } else {
        // KaTeX script already exists — ensure it's loaded (page might have been refreshed).
        katexPromise = (window as typeof window & { __KatexLoaded?: boolean }).__KatexLoaded
          ? Promise.resolve()
          : new Promise<void>((resolve) => { kt.onload = () => resolve(); if ((kt as any).readyState === "complete") resolve(); });
      }

      await katexPromise;
      (window as typeof window & { __KatexLoaded?: boolean }).__KatexLoaded = true;

      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      scriptRef.current = script;

      // Append and let scripts load sequentially. When this script's onload
      // fires, check if THIS script element is still in the DOM. If it was
      // removed by cleanup (a newer widget loaded), bail — the newer widget
      // already rendered.
      script.onload = () => {
        if (!document.head.contains(script)) return;

        const w = (window as typeof window & { ChapterWidget?: {
          render: (el: Element) => void;
          title?: string;
          intro?: string;
        } | undefined }).ChapterWidget;
        if (!w) return;

        const root = document.getElementById("lab-root");
        if (!root) return;
        root.textContent = "";

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
          if (titleEl) titleEl.textContent = `🧪 互动实验室 · ${w.title}`;
        }
        if (w.intro) {
          const introEl = document.getElementById("lab-intro");
          if (introEl) {
            introEl.className = "lab-intro";
            introEl.textContent = w.intro;
          }
        }
        try {
          w.render(root);
        } catch (err) {
          console.error("widget render failed:", err);
        }
      };

      script.onerror = () => {
        console.error(`Failed to load widget: ${scriptUrl}`);
      };

      document.head.appendChild(script);
    }

    load().catch(console.error);

    return () => {
      // Remove this script from DOM. Next time a script's onload fires,
      // document.head.contains(script) will be false and it will bail.
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }
      (window as typeof window & { ChapterWidget?: unknown }).ChapterWidget = undefined;
      const root = document.getElementById("lab-root");
      if (root) root.textContent = "";
      const intro = document.getElementById("lab-intro");
      if (intro) intro.textContent = "";
      const lab = document.getElementById("lab");
      if (lab) {
        lab.style.visibility = "hidden";
        lab.style.height = "0";
        lab.style.overflow = "hidden";
        lab.setAttribute("aria-hidden", "true");
      }
    };
  }, [chapterId, locale]);

  return (
    <section
      id="lab"
      className="lab"
      style={{ visibility: "hidden", height: 0, overflow: "hidden", margin: 0, padding: 0 }}
      aria-hidden="true"
    >
      <h2 className="lab-title">🧪 互动实验室</h2>
      <div id="lab-intro" />
      <div id="lab-root" />
    </section>
  );
}
