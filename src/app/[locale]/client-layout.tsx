"use client";

import ScrollButtons from "@/components/ScrollButtons";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ScrollButtons />
    </>
  );
}