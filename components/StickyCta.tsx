import { useTranslations } from 'next-intl';

export function StickyCta() {
  const t = useTranslations('StickyCta');
  const tNav = useTranslations('Nav');

  return (
    <div className="sticky-cta">
      <a
        href={`tel:${tNav('phone').replace(/\s/g, '')}`}
        aria-label={t('call')}
        className="btn-tap flex-1 bg-petrol/95 hover:bg-petrol-deep text-cream rounded-full py-3 text-center text-[13px] font-medium flex items-center justify-center gap-2 transition-transform"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M22 16.92V19.92C22 20.52 21.52 21 20.92 21C10.43 21 2 12.57 2 2.08C2 1.48 2.48 1 3.08 1H6.08C6.68 1 7.16 1.48 7.16 2.08C7.16 3.56 7.42 4.98 7.9 6.3C8.04 6.68 7.94 7.12 7.64 7.42L5.9 9.16C7.36 12.04 9.96 14.64 12.84 16.1L14.58 14.36C14.88 14.06 15.32 13.96 15.7 14.1C17.02 14.58 18.44 14.84 19.92 14.84C20.52 14.84 21 15.32 21 15.92" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {t('call')}
      </a>
      <a
        href="#elaqe"
        className="btn-tap flex-1 bg-copper hover:bg-copper-deep text-cream rounded-full py-3 text-center text-[13px] font-medium flex items-center justify-center gap-2 transition-transform"
      >
        {t('consultation')}
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path d="M2 8H14M14 8L8 2M14 8L8 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </a>
    </div>
  );
}
