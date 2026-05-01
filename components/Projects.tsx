import { useTranslations } from 'next-intl';

type ProjectDef = {
  key: 'merdekan' | 'portbaku' | 'restaurant' | 'crescent' | 'whitecity' | 'bilgah';
  cat: string;
  catKey: 'villaInterior' | 'apartment' | 'restaurant' | 'office' | 'villa';
  featured?: boolean;
  num: string;
  img: string;
  metaKeys: readonly ('location' | 'size' | 'duration' | 'year')[];
  span: 'span-feat' | 'span-tall' | 'span-wide' | 'span-mid';
};

const PROJECT_DEFS: ProjectDef[] = [
  {
    key: 'merdekan',
    cat: 'villa',
    catKey: 'villaInterior',
    featured: true,
    num: '01 / 06',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
    metaKeys: ['location', 'size', 'duration', 'year'],
    span: 'span-feat',
  },
  {
    key: 'portbaku',
    cat: 'menzil',
    catKey: 'apartment',
    num: '02 / 06',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
    metaKeys: ['location', 'size', 'year'],
    span: 'span-tall',
  },
  {
    key: 'restaurant',
    cat: 'restoran',
    catKey: 'restaurant',
    num: '03 / 06',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80',
    metaKeys: ['location', 'size', 'year'],
    span: 'span-wide',
  },
  {
    key: 'crescent',
    cat: 'ofis',
    catKey: 'office',
    num: '04 / 06',
    img: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1200&q=80',
    metaKeys: ['location', 'size', 'year'],
    span: 'span-mid',
  },
  {
    key: 'whitecity',
    cat: 'menzil',
    catKey: 'apartment',
    num: '05 / 06',
    img: 'https://images.unsplash.com/photo-1615529162924-f8605388461d?w=1400&q=80',
    metaKeys: ['location', 'size', 'year'],
    span: 'span-wide',
  },
  {
    key: 'bilgah',
    cat: 'villa',
    catKey: 'villa',
    num: '06 / 06',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    metaKeys: ['location', 'size', 'year'],
    span: 'span-mid',
  },
];

export function Projects() {
  const t = useTranslations('Projects');

  return (
    <section id="layiheler" className="proj-section px-5 md:px-10 py-16 md:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 md:mb-16 items-end">
        <div className="lg:col-span-7">
          <div className="proj-eyebrow">
            {t('eyebrow')} <span className="proj-side">{t('side')}</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.04] text-ink mt-5 max-w-3xl">
            {t('headline1')} <br className="hidden md:block" />
            <span className="italic-display text-petrol">{t('headline2')}</span>
          </h2>
          <p className="proj-deck">
            {t('deckBefore')}<em>{t('deckEm')}</em>{t('deckAfter')}
          </p>
        </div>
      </div>

      <div className="proj-bento" id="projectsGrid">
        {PROJECT_DEFS.map((p) => (
          <article
            key={p.key}
            className={`project proj-v2 ${p.featured ? 'is-featured' : ''} ${p.span}`}
            data-cat={p.cat}
          >
            <div className="pv-img">
              <span className="pv-num">{p.num}</span>
              <span className="pv-cat">{t(`categories.${p.catKey}`)}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={t(`items.${p.key}.alt`)} />
              {p.featured && <span className="pv-feat">{t(`items.${p.key}.feat`)}</span>}
            </div>
            <div className="pv-foot">
              <div className="pv-info">
                <h3 className="pv-title">
                  {t(`items.${p.key}.title`)} <span className="ti">{t(`items.${p.key}.italic`)}</span>
                </h3>
                <span className="pv-rule"></span>
                <div className="pv-meta">
                  {p.metaKeys.map((mk, j) => (
                    <span key={mk} className="contents">
                      <span>{t(`items.${p.key}.${mk}`)}</span>
                      {j < p.metaKeys.length - 1 && <span className="dotsep"></span>}
                    </span>
                  ))}
                </div>
              </div>
              <a href="#" className="pv-arrow" aria-label={t(`items.${p.key}.aria`)}>
                <svg width={p.featured ? 16 : 14} height={p.featured ? 16 : 14} viewBox="0 0 16 16" fill="none">
                  <path d="M2 8H14M14 8L8 2M14 8L8 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 md:mt-16 flex justify-center">
        <a href="#" className="proj-cta">
          {t('ctaArchive')}
          <span className="proj-cta-count">{t('ctaCount')}</span>
          <span className="cta-arrow">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M2 8H14M14 8L8 2M14 8L8 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}
