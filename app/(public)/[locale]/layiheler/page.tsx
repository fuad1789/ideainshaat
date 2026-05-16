import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { StickyCta } from '@/components/StickyCta';
import { dbConnect } from '@/lib/mongodb';
import { Project, type ProjectDoc } from '@/lib/models/Project';

export const dynamic = 'force-dynamic';

const CATEGORY_KEY: Record<string, 'villa' | 'apartment' | 'restaurant'> = {
  villa: 'villa',
  apartment: 'apartment',
  restaurant: 'restaurant',
  office: 'apartment',
  commercial: 'apartment',
  other: 'apartment',
};

async function fetchAll() {
  await dbConnect();
  return Project.find({ published: true })
    .sort({ order: 1, createdAt: -1 })
    .lean<ProjectDoc[]>();
}

export default async function ArchivePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Projects' });
  const projects = await fetchAll();
  const lang = (locale === 'ru' ? 'ru' : 'az') as 'az' | 'ru';
  const total = projects.length;

  const labels = {
    eyebrow: locale === 'ru' ? 'Архив проектов' : 'Layihə arxivi',
    h1Plain: locale === 'ru' ? 'Все' : 'Bütün',
    h1Italic: locale === 'ru' ? 'проекты.' : 'layihələr.',
    total: locale === 'ru' ? `${total} проект${total === 1 ? '' : 'ов'}` : `${total} layihə`,
    back: locale === 'ru' ? 'Назад' : 'Geri',
    empty: locale === 'ru' ? 'Скоро добавим проекты…' : 'Layihələr tezliklə əlavə olunacaq…',
  };

  return (
    <>
      <Nav />
      <main className="proj-archive">
        <div className="proj-archive-head">
          <div>
            <Link href="/" className="proj-archive-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>{labels.back}</span>
            </Link>
            <div className="eyebrow" style={{ marginTop: 22 }}>{labels.eyebrow}</div>
            <h1>
              {labels.h1Plain} <em>{labels.h1Italic}</em>
            </h1>
          </div>
          <div className="total">{labels.total}</div>
        </div>

        <div className="proj-archive-grid">
          {projects.length === 0 ? (
            <div className="py-12 text-center font-italic-serif text-muted">{labels.empty}</div>
          ) : (
            <div className="proj-bento" id="projectsArchive">
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
        </div>
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
