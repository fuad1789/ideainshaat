'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const PILL_KEYS = ['design', 'construction', 'furniture', 'exterior', 'landscape'] as const;

export function Hero() {
  const t = useTranslations('Hero');
  const [activeDesktop, setActiveDesktop] = useState(0);
  const [activeMobile, setActiveMobile] = useState(0);

  return (
    <section className="relative px-3 md:px-5 lg:px-6 pt-20 md:pt-24 lg:pt-28 pb-4 md:pb-6">
      <div className="relative">
        {/* DESKTOP LAYOUT */}
        <div
          className="hidden md:block relative rounded-[32px] lg:rounded-[40px] overflow-hidden"
          style={{ minHeight: 'calc(100vh - 140px)', maxHeight: '860px' }}
        >
          <div
            className="absolute top-0 right-0 bottom-0 grain bg-petrol overflow-hidden"
            style={{ width: '58%', clipPath: 'polygon(18% 0%,100% 0%,100% 100%,6% 100%)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&q=85"
              alt={t('badge')}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/5 via-transparent to-ink/25 pointer-events-none"></div>
            <div className="absolute top-6 right-6 bg-ink/40 backdrop-blur px-3.5 py-2 rounded-full text-[11px] text-cream font-medium inline-flex items-center gap-2 border border-cream/15">
              <span className="w-1.5 h-1.5 rounded-full bg-copper animate-pulse"></span>
              {t('badge')}
            </div>
          </div>

          <div className="absolute inset-y-0 left-0 z-10 px-10 lg:px-14 xl:px-16 py-10 lg:py-12 w-[54%] lg:w-[52%] xl:w-[50%] flex flex-col justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-petrol/70 mb-5">
                <span className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-copper"></span>
                  {t('metaCity')}
                </span>
                <span className="h-px flex-1 bg-petrol/15 max-w-[60px]"></span>
                <span className="text-petrol/50">{t('projectsCount')}</span>
              </div>
              <h1 className="font-display leading-[1.1] tracking-tight text-[48px] lg:text-[68px] xl:text-[84px]">
                <span className="text-ink">{t('headline1')}</span><br />
                <span className="hl-ghost">{t('headline2')}</span><br />
                <span className="text-ink">{t('headline3')}<span className="italic-display text-copper">.</span></span>
              </h1>
            </div>
            <div className="max-w-[540px]">
              <div className="flex flex-wrap gap-2 mb-4">
                {PILL_KEYS.map((key, i) => (
                  <button
                    key={key}
                    type="button"
                    className={`pill-svc${i === activeDesktop ? ' is-active' : ''}`}
                    onClick={() => setActiveDesktop(i)}
                  >
                    {t(`pills.${key}`)}
                  </button>
                ))}
              </div>
              <form action="#elaqe" method="get" className="bg-cream-warm/80 border border-ink/10 rounded-full p-1.5 pl-5 flex items-center gap-3">
                <input
                  type="text"
                  name="brief"
                  placeholder={t('inputPlaceholder')}
                  className="bg-transparent border-0 outline-none text-ink text-sm flex-1 min-w-0 placeholder:text-petrol/60"
                />
                <button
                  type="submit"
                  aria-label={t('send')}
                  className="w-11 h-11 rounded-full bg-copper hover:bg-copper-deep text-cream flex items-center justify-center transition flex-shrink-0"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8H14M14 8L8 2M14 8L8 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </button>
              </form>
              <div className="mt-5 pt-5 border-t border-ink/10 flex items-start gap-3">
                <div className="font-display text-copper text-3xl leading-none -mt-2">&ldquo;</div>
                <p className="italic-display text-ink/65 text-[13px] leading-relaxed">
                  {t('quote')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE LAYOUT */}
        <div className="md:hidden space-y-6 px-1">
          <div className="m-reveal m-d0 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-petrol/70">
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-copper"></span>
              {t('metaCityShort')}
            </span>
            <span className="m-rule flex-1"></span>
            <span className="text-petrol/55">{t('projectsCount')}</span>
          </div>

          <h1 className="m-reveal m-d1 font-display leading-[.98] tracking-[-.015em] text-[56px] sm:text-[66px] -mt-1">
            <span className="text-ink">{t('headline1')}</span><br />
            <span className="italic-display hl-ghost">{t('headline2')}</span><br />
            <span className="text-ink">{t('headline3')}<span className="italic-display text-copper">.</span></span>
          </h1>

          <div className="m-reveal m-d2 flex items-start gap-3 pl-4 border-l-2 border-copper/50 -mt-2">
            <p className="italic-display text-ink/70 text-[13.5px] leading-[1.55]">
              {t('mobileQuote')}
            </p>
          </div>

          <figure className="m-reveal m-d3 m-hero-img relative aspect-[4/5] rounded-[28px] overflow-hidden grain bg-petrol">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85"
              alt={t('badge')}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 m-cap pointer-events-none"></div>
            <figcaption className="absolute bottom-5 left-5 right-5 text-cream">
              <div className="text-[10px] uppercase tracking-[0.22em] text-cream/65">{t('mobileBadgeRegion')}</div>
              <div className="font-display text-[22px] leading-tight mt-1">{t('mobileBadgeName')}<span className="italic-display text-copper">.</span></div>
            </figcaption>
          </figure>

          <div className="m-reveal m-d4">
            <div className="pill-row no-scrollbar">
              {PILL_KEYS.map((key, i) => (
                <button
                  key={key}
                  type="button"
                  className={`pill-svc btn-tap${i === activeMobile ? ' is-active' : ''}`}
                  onClick={() => setActiveMobile(i)}
                >
                  {t(`pills.${key}`)}
                </button>
              ))}
            </div>
          </div>

          <form
            action="#elaqe"
            method="get"
            className="m-reveal m-d5 bg-cream-warm border border-ink/10 rounded-full p-1.5 pl-5 flex items-center gap-3 shadow-[0_10px_24px_-16px_rgba(20,32,36,.25)]"
          >
            <input
              type="text"
              name="brief"
              placeholder={t('inputPlaceholderShort')}
              className="bg-transparent border-0 outline-none text-ink text-[13px] flex-1 min-w-0 placeholder:text-petrol/55"
            />
            <button
              type="submit"
              aria-label={t('send')}
              className="btn-tap w-11 h-11 rounded-full bg-copper text-cream flex items-center justify-center flex-shrink-0 transition-transform"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 8H14M14 8L8 2M14 8L8 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </form>

          <div className="m-reveal m-d6 grid grid-cols-3 divide-x divide-ink/10 text-ink pt-2">
            <div className="pr-3">
              <div className="font-display text-[28px] leading-none">13<span className="text-copper">.</span></div>
              <div className="text-[9.5px] text-ink/55 mt-1 uppercase tracking-[0.18em]">{t('stat1')}</div>
            </div>
            <div className="px-3">
              <div className="font-display text-[28px] leading-none">442<span className="text-copper">.</span></div>
              <div className="text-[9.5px] text-ink/55 mt-1 uppercase tracking-[0.18em]">{t('stat2')}</div>
            </div>
            <div className="pl-3">
              <div className="font-display text-[28px] leading-none">1.5K<span className="text-copper">.</span></div>
              <div className="text-[9.5px] text-ink/55 mt-1 uppercase tracking-[0.18em]">{t('stat3')}</div>
            </div>
          </div>

          <div className="m-reveal m-d6 flex items-center justify-center gap-2 text-petrol/50 text-[10px] uppercase tracking-[0.3em] pt-2 pb-1">
            <span className="w-6 h-px bg-petrol/25"></span>
            {t('scrollHint')}
            <span className="w-6 h-px bg-petrol/25"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
