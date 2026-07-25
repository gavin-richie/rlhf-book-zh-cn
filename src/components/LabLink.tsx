"use client";

export default function LabLink() {
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
      前往實驗室 ↓
    </a>
  );
}
