import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { dbConnect } from '@/lib/mongodb';
import { Project, type ProjectDoc } from '@/lib/models/Project';

const CATEGORY_KEY: Record<string, 'villa' | 'apartment' | 'restaurant'> = {
  villa: 'villa',
  apartment: 'apartment',
  restaurant: 'restaurant',
  office: 'apartment',
  commercial: 'apartment',
  other: 'apartment',
};

const HOMEPAGE_LIMIT = 8;

interface ProjectsProps {
  locale: string;
  limit?: number;
  showHeader?: boolean;
  showCta?: boolean;
}

async function fetchProjects(limit: number) {
  await dbConnect();
  const docs = await Project.find({ published: true })
    .sort({ order: 1, createdAt: -1 })
    .limit(limit)
    .lean<ProjectDoc[]>();
  return docs;
}

export async function Projects({
  locale,
  limit = HOMEPAGE_LIMIT,
  showHeader = true,
  showCta = true,
}: ProjectsProps) {
  const t = await getTranslations({ locale, namespace: 'Projects' });
  const projects = await fetchProjects(limit);
  const lang = (locale === 'ru' ? 'ru' : 'az') as 'az' | 'ru';
  const total = projects.length;

  return (
    <section id="layiheler" className="proj-section px-5 md:px-10 py-16 md:py-28">
      {showHeader && (
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
      )}

      {projects.length === 0 ? (
        <div className="py-12 text-center font-italic-serif text-muted">
          {locale === 'ru' ? 'Скоро добавим проекты…' : 'Layihələr tezliklə əlavə olunacaq…'}
        </div>
      ) : (
        <div className="proj-bento" id="projectsGrid">
          {projects.map((p, i) => {
            const title = p.title?.[lang] || p.title?.az || '';
            const italic = p.titleItalic?.[lang] || p.titleItalic?.az || '';
            const num = `${String(i + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
            const catKey = CATEGORY_KEY[p.category] ?? 'apartment';
            const meta = [p.location, p.size, p.duration, p.year].filter(Boolean);

            return (
              <article
                key={String(p._id)}
                className={`project proj-v2 ${p.featured ? 'is-featured' : ''}`}
                data-cat={catKey}
              >
                <div className="pv-img">
                  <span className="pv-num">{num}</span>
                  <span className="pv-cat">{t(`categories.${catKey}`)}</span>
                  {p.coverImage?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.coverImage.url} alt={p.coverImage.alt || title} />
                  ) : (
                    <div className="w-full h-full bg-cream-warm" />
                  )}
                </div>
                <div className="pv-foot">
                  <div className="pv-info">
                    <h3 className="pv-title">
                      {title} {italic && <span className="ti">{italic}</span>}
                    </h3>
                    <span className="pv-rule"></span>
                    <div className="pv-meta">
                      {meta.map((m, j) => (
                        <span key={`${m}-${j}`} className="contents">
                          <span>{m}</span>
                          {j < meta.length - 1 && <span className="dotsep"></span>}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {showCta && projects.length > 0 && (
        <div className="mt-12 md:mt-16 flex justify-center">
          <Link href="/layiheler" className="proj-cta-all">
            <span>{locale === 'ru' ? 'Все проекты' : 'Bütün layihələr'}</span>
            <span className="cta-arrow">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 8H14M14 8L8 2M14 8L8 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}
