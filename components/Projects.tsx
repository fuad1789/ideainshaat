import { useTranslations } from 'next-intl';

type ProjectDef = {
  key: 'gence' | 'royalpark' | 'izmir' | 'fevvareler' | 'xirdalan' | 'yasamal';
  cat: string;
  catKey: 'villa' | 'apartment' | 'restaurant';
  featured?: boolean;
  num: string;
  img: string;
  metaKeys: readonly ('location' | 'size' | 'duration' | 'year')[];
  span: 'span-feat' | 'span-tall' | 'span-wide' | 'span-mid';
};

const PROJECT_DEFS: ProjectDef[] = [
  {
    key: 'gence',
    cat: 'villa',
    catKey: 'villa',
    featured: true,
    num: '01 / 06',
    img: '/imgs/exterier.jpg',
    metaKeys: ['location', 'size', 'duration', 'year'],
    span: 'span-feat',
  },
  {
    key: 'royalpark',
    cat: 'villa',
    catKey: 'villa',
    num: '02 / 06',
    img: '/imgs/royalpark.jfif',
    metaKeys: ['location', 'size', 'duration', 'year'],
    span: 'span-tall',
  },
  {
    key: 'izmir',
    cat: 'menzil',
    catKey: 'apartment',
    num: '03 / 06',
    img: '/imgs/izmirrezidens.jfif',
    metaKeys: ['location', 'size', 'duration', 'year'],
    span: 'span-wide',
  },
  {
    key: 'fevvareler',
    cat: 'restoran',
    catKey: 'restaurant',
    num: '04 / 06',
    img: '/imgs/fevvareler.jfif',
    metaKeys: ['location', 'size', 'duration', 'year'],
    span: 'span-mid',
  },
  {
    key: 'xirdalan',
    cat: 'menzil',
    catKey: 'apartment',
    num: '05 / 06',
    img: '/imgs/xirdalanvilla.jfif',
    metaKeys: ['location', 'size', 'duration', 'year'],
    span: 'span-wide',
  },
  {
    key: 'yasamal',
    cat: 'menzil',
    catKey: 'apartment',
    num: '06 / 06',
    img: '/imgs/yasamavilla.jfif',
    metaKeys: ['location', 'size', 'duration', 'year'],
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

    </section>
  );
}
