'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';

const SERVICE_KEYS = [
  { n: '01', key: 'design', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80' },
  { n: '02', key: 'construction', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80' },
  { n: '03', key: 'furniture', img: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=900&q=80' },
  { n: '04', key: 'exterior', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80' },
  { n: '05', key: 'landscape', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80' },
] as const;

export function Services() {
  const t = useTranslations('Services');
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    scrollerRef.current?.scrollBy({ left: dir * 360, behavior: 'smooth' });
  };

  return (
    <section id="xidmetler" className="px-5 md:px-10 py-16 md:py-28 bg-cream-warm/40">
      <div className="flex items-end justify-between mb-10 md:mb-14">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-copper mb-4">{t('eyebrow')}</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-ink max-w-3xl">
            {t('headline1')} <span className="italic-display">{t('headline2')}</span>.
          </h2>
        </div>
        <div className="hidden md:flex gap-2">
          <button
            className="scroll-btn w-11 h-11 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-cream transition"
            onClick={() => scroll(-1)}
            aria-label={t('back')}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M14 8H2M2 8L8 2M2 8L8 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <button
            className="scroll-btn w-11 h-11 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-cream transition"
            onClick={() => scroll(1)}
            aria-label={t('next')}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M2 8H14M14 8L8 2M14 8L8 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div
        id="servicesScroll"
        ref={scrollerRef}
        className="flex flex-col md:flex-row gap-10 md:gap-8 md:overflow-x-auto md:snap-x-mandatory no-scrollbar md:pb-4"
      >
        {SERVICE_KEYS.map((s) => (
          <article key={s.n} className="md:snap-start md:shrink-0 w-full md:w-[31%] group">
            <a href="#" className="block">
              <div className="aspect-[4/3] md:aspect-[4/5] overflow-hidden rounded-[20px] relative bg-petrol/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.img}
                  alt={t(`items.${s.key}.title`)}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-5 flex items-start gap-4">
                <span className="font-display text-[24px] text-ink/25 leading-none tracking-tight pt-1">{s.n}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-[22px] md:text-[24px] text-ink leading-[1.1]">
                    {t(`items.${s.key}.title`)}
                  </h3>
                  <p className="mt-2 text-[13px] text-ink/55 leading-[1.55]">
                    {t(`items.${s.key}.desc`)}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center text-ink/55 group-hover:bg-ink group-hover:text-cream group-hover:border-ink transition flex-shrink-0 mt-1"
                >
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8H14M14 8L8 2M14 8L8 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
