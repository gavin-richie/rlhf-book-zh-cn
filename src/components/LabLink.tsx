"use client";

import { useLocale } from "@/i18n/locale-context";

export default function LabLink() {
  const locale = useLocale();
  const isZhTw = locale === "zh-tw";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const lab = document.getElementById("lab");
    if (!lab) return;
    // Wait for widget to load if section has no height
    const checkAndScroll = () => {
      if (lab.offsetHeight > 0) {
        lab.scrollIntoView({ block: "start", behavior: "smooth" });
      } else {
        setTimeout(checkAndScroll, 100);
      }
    };
    checkAndScroll();
  };

  return (
    <a href="#lab" onClick={handleClick}>
      {isZhTw ? "前往實驗室 ↓" : "前往实验室 ↓"}
    </a>
  );
}
