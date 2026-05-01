import { useTranslations } from 'next-intl';

export function Testimonial() {
  const t = useTranslations('Testimonial');

  return (
    <section id="rey" className="bg-petrol text-cream px-5 md:px-10 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-6 bg-copper/60"></span>
          <span className="text-[10px] uppercase tracking-[0.28em] text-copper font-semibold">
            {t('eyebrow')}
          </span>
          <span className="h-px w-6 bg-copper/60"></span>
        </div>
        <blockquote className="font-display text-xl md:text-3xl lg:text-[34px] leading-[1.3] text-center text-cream/95">
          <span className="text-copper">&ldquo;</span>
          {t('quote1')} <span className="italic-display">{t('quoteItalic')}</span> {t('quote2')}
          <span className="text-copper">&rdquo;</span>
        </blockquote>
        <div className="mt-6 flex items-center justify-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://i.pravatar.cc/80?img=47"
            alt=""
            className="w-9 h-9 rounded-full object-cover border border-copper/60"
          />
          <div className="text-left">
            <div className="font-medium text-[13px] leading-tight">{t('authorName')}</div>
            <div className="text-cream/55 text-[11px] leading-tight mt-0.5">{t('authorRole')}</div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-cream/55 text-[11px] tracking-[0.12em]">
          <button
            aria-label={t('previous')}
            className="w-8 h-8 rounded-full border border-cream/15 flex items-center justify-center hover:bg-cream hover:text-petrol transition"
          >
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <path d="M14 8H2M2 8L8 2M2 8L8 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <span className="px-1">01 / 12</span>
          <button
            aria-label={t('next')}
            className="w-8 h-8 rounded-full border border-cream/15 flex items-center justify-center hover:bg-cream hover:text-petrol transition"
          >
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <path d="M2 8H14M14 8L8 2M14 8L8 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
