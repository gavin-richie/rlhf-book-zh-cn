"use client";

import { useEffect, useRef } from "react";

interface KatexAutoRenderProps {
  selector?: string;
}

export default function KatexAutoRender({
  selector = ".prose",
}: KatexAutoRenderProps) {
  const katexLoaded = useRef(false);
  const autoRenderLoaded = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // Load katex.min.js first (provides window.katex)
      if (!katexLoaded.current) {
        const existingScript = document.getElementById("katex-lib");
        if (existingScript) {
          katexLoaded.current = true;
          // Check if katex is actually available
          if ((window as typeof window & { katex?: unknown }).katex) {
            katexLoaded.current = true;
          }
        } else {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.id = "katex-lib";
            script.src = "/assets/katex/katex.min.js";
            script.onload = () => {
              katexLoaded.current = true;
              resolve();
            };
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }
      }

      // Load auto-render.min.js (provides window.renderMathInElement)
      if (!autoRenderLoaded.current) {
        const existingScript = document.getElementById("katex-auto-render");
        if (existingScript) {
          autoRenderLoaded.current = true;
        } else {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.id = "katex-auto-render";
            script.src = "/assets/katex/auto-render.min.js";
            script.onload = () => {
              autoRenderLoaded.current = true;
              resolve();
            };
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }
      }

      if (cancelled) return;

      // Run auto-render on matching elements
      const render = (window as typeof window & {
        renderMathInElement?: (
          el: Element,
          opts?: Record<string, unknown>,
        ) => void;
      }).renderMathInElement;
      if (render) {
        document.querySelectorAll(selector).forEach((el) => {
          try {
            render(el, {
              delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "$", right: "$", display: false },
                { left: "\\(", right: "\\)", display: false },
                { left: "\\begin{equation}", right: "\\end{equation}", display: true },
                { left: "\\begin{align}", right: "\\end{align}", display: true },
                { left: "\\begin{alignat}", right: "\\end{alignat}", display: true },
                { left: "\\begin{gather}", right: "\\end{gather}", display: true },
                { left: "\\[", right: "\\]", display: true },
              ],
              throwOnError: false,
            });
          } catch {
            // Silently skip elements that can't be rendered
          }
        });
      }
    }

    load().catch(() => {
      // Auto-render failure is non-fatal
    });

    return () => {
      cancelled = true;
    };
  }, [selector]);

  return null;
}