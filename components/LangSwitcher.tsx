'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { routing } from '@/i18n/routing';

type Variant = 'footer' | 'inline';

export function LangSwitcher({ variant = 'inline' }: { variant?: Variant }) {
  const t = useTranslations('LangSwitcher');
  const active = useLocale();
  const pathname = usePathname();

  const stripped =
    routing.locales.reduce<string>((acc, l) => {
      if (acc === `/${l}` || acc.startsWith(`/${l}/`)) {
        return acc.replace(`/${l}`, '') || '/';
      }
      return acc;
    }, pathname) || '/';

  const baseClass =
    variant === 'footer'
      ? 'hover:text-copper'
      : 'text-petrol/70 hover:text-petrol transition';

  return (
    <div className="flex gap-5" aria-label={t('label')}>
      {routing.locales.map((loc) => {
        const href = stripped === '/' ? `/${loc}` : `/${loc}${stripped}`;
        return (
          <a
            key={loc}
            href={href}
            hrefLang={loc}
            className={`${baseClass}${
              loc === active ? ' text-copper font-semibold' : ''
            }`}
          >
            {t(loc)}
          </a>
        );
      })}
    </div>
  );
}
