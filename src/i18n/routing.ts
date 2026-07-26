export const routing = {
  locales: ['zh-tw', 'zh-cn'] as const,
  defaultLocale: 'zh-tw',
  localePrefix: 'always',
};

export type Locale = (typeof routing)['locales'][number];
