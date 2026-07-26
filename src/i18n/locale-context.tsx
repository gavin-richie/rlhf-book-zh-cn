"use client";

import { createContext, useContext } from "react";

export type Locale = "zh-tw" | "zh-cn";

export const LocaleContext = createContext<Locale>("zh-tw");

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>
      {children}
    </LocaleContext.Provider>
  );
}
