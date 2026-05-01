import { useTranslations } from 'next-intl';

export function WhyUs() {
  const t = useTranslations('WhyUs');

  return (
    <section className="relative overflow-hidden flex items-center py-16 md:py-24">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1800&q=85"
        alt="İdea İnşaat"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-ink/90 via-ink/75 to-petrol/85"></div>
      <div className="absolute inset-0 grain opacity-30 pointer-events-none"></div>

      <div className="relative z-10 w-full px-5 md:px-10 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-copper mb-6 md:mb-8">
            <span className="w-6 h-px bg-copper"></span>
            {t('eyebrow')}
            <span className="w-6 h-px bg-copper"></span>
          </div>

          <h2 className="font-display text-[40px] md:text-[80px] leading-[1.08] tracking-[-.02em] text-cream">
            {t('headline1')}<br />
            <span className="italic-display text-copper">{t('headline2')}</span> {t('headline3')}
          </h2>

          <p className="mt-5 md:mt-7 font-display italic-display text-cream/65 text-[15px] md:text-[19px] leading-[1.55] max-w-xl mx-auto">
            {t('subtitle')}
          </p>

          <div className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-5">
            <a
              href="#elaqe"
              className="inline-flex items-center gap-2.5 bg-cream hover:bg-cream-soft text-ink rounded-full px-6 md:px-7 py-3 md:py-3.5 font-medium text-[13px] md:text-[14px] transition-colors"
            >
              {t('ctaPrimary')}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 8H14M14 8L8 2M14 8L8 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </a>
            <a
              href="#layiheler"
              className="text-cream/80 hover:text-copper text-[13px] md:text-[14px] font-medium inline-flex items-center gap-2 transition-colors"
            >
              <span className="border-b border-cream/25 pb-0.5">{t('ctaSecondary')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
