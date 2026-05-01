import { useTranslations } from 'next-intl';

export function About() {
  const t = useTranslations('About');

  return (
    <section className="relative px-5 md:px-10 py-12 md:py-28 overflow-hidden">
      {/* MOBILE LAYOUT */}
      <div className="md:hidden relative">
        <div className="reveal text-center px-1">
          <div className="inline-flex items-center gap-2.5 text-[9.5px] uppercase tracking-[0.26em] text-copper font-semibold mb-3">
            <span className="h-px w-5 bg-copper/60"></span>
            {t('eyebrow')}
            <span className="h-px w-5 bg-copper/60"></span>
          </div>

          <div className="flex justify-center mb-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-ink/65">
              <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" fill="currentColor" />
            </svg>
          </div>

          <h2 className="font-display text-[30px] leading-[1.05] tracking-[-.012em] text-ink">
            {t('headlineMobile1')} <span className="italic-display text-copper-deep">{t('headlineMobile2')}</span>.
          </h2>

          <p className="mt-3.5 text-ink/65 text-[13px] leading-[1.6] max-w-[34ch] mx-auto">
            {t('bodyMobile')}
          </p>

          <div className="mt-5">
            <a
              href="#layiheler"
              className="inline-flex items-center gap-2 bg-ink text-cream rounded-full px-5 py-2.5 text-[10.5px] tracking-[0.18em] uppercase font-semibold"
            >
              {t('cta')}
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                <path d="M2 8H14M14 8L8 2M14 8L8 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </div>

        <div className="reveal mt-7 -mx-5 grid grid-cols-2 gap-2">
          <div className="relative aspect-[4/5] rounded-r-[18px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
              alt={t('imageInterior')}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cream/85 backdrop-blur-sm text-[8.5px] tracking-[0.22em] uppercase text-ink font-semibold">
              <span className="w-1 h-1 rounded-full bg-copper"></span>{t('imageInterior')}
            </span>
          </div>
          <div className="relative aspect-[4/5] rounded-l-[18px] overflow-hidden mt-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80"
              alt={t('imageExterior')}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cream/85 backdrop-blur-sm text-[8.5px] tracking-[0.22em] uppercase text-ink font-semibold">
              <span className="w-1 h-1 rounded-full bg-copper"></span>{t('imageExterior')}
            </span>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden md:grid grid-cols-12 gap-4 md:gap-8 items-center max-w-7xl mx-auto relative">
        <div className="reveal md:col-span-3 lg:col-span-3 relative -ml-[14vw] lg:-ml-[10vw] -mt-16 md:-mt-24">
          <div className="relative aspect-[5/4] rounded-[22px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80"
              alt={t('altInterior')}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="reveal col-span-6 text-center px-2 md:px-6 relative z-10">
          <div className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-copper font-semibold mb-6">
            <span className="h-px w-6 bg-copper/60"></span>
            {t('eyebrow')}
            <span className="h-px w-6 bg-copper/60"></span>
          </div>

          <div className="flex justify-center mb-5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-ink/70">
              <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" fill="currentColor" />
            </svg>
          </div>

          <h2 className="font-display text-[46px] lg:text-[54px] leading-[1.08] tracking-[-.012em] text-ink">
            {t('headlineDesktop1')} <span className="italic-display text-copper-deep">{t('headlineDesktop2')}</span>.
          </h2>

          <p className="mt-6 text-ink/65 text-[15px] leading-[1.7] max-w-[520px] mx-auto">
            {t('bodyDesktop')}
          </p>

          <div className="mt-8">
            <a
              href="#layiheler"
              className="inline-flex items-center gap-2.5 bg-ink hover:bg-petrol text-cream rounded-full px-6 py-3 text-[12px] tracking-[0.18em] uppercase font-semibold transition-colors"
            >
              {t('cta')}
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M2 8H14M14 8L8 2M14 8L8 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </div>

        <div className="reveal md:col-span-3 lg:col-span-3 relative -mr-[14vw] lg:-mr-[10vw] mt-16 md:mt-24">
          <div className="relative aspect-[5/4] rounded-[22px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80"
              alt={t('altExterior')}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
