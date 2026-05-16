import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dbConnect } from '@/lib/mongodb';
import { Project } from '@/lib/models/Project';
import { ProjectForm, type ProjectFormValues } from '@/components/admin/ProjectForm';
import { AccountChip } from '@/components/admin/AccountChip';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  await dbConnect();

  if (!/^[a-f0-9]{24}$/i.test(id)) {
    notFound();
  }

  const project = await Project.findById(id).lean();
  if (!project) notFound();

  const initial: ProjectFormValues = {
    _id: String(project._id),
    slug: project.slug,
    title: {
      az: project.title?.az ?? '',
      ru: project.title?.ru ?? '',
      en: project.title?.en ?? '',
    },
    titleItalic: {
      az: project.titleItalic?.az ?? '',
      ru: project.titleItalic?.ru ?? '',
      en: project.titleItalic?.en ?? '',
    },
    description: {
      az: project.description?.az ?? '',
      ru: project.description?.ru ?? '',
      en: project.description?.en ?? '',
    },
    category: project.category,
    status: project.status,
    featured: project.featured,
    published: project.published,
    location: project.location ?? '',
    size: project.size ?? '',
    duration: project.duration ?? '',
    year: project.year ?? '',
    coverImage: project.coverImage
      ? {
          url: project.coverImage.url,
          publicId: project.coverImage.publicId,
          width: project.coverImage.width ?? 0,
          height: project.coverImage.height ?? 0,
          alt: project.coverImage.alt ?? '',
        }
      : null,
    gallery: (project.gallery ?? []).map((g) => ({
      url: g.url,
      publicId: g.publicId,
      width: g.width ?? 0,
      height: g.height ?? 0,
      alt: g.alt ?? '',
    })),
    order: project.order ?? 0,
  };

  return (
    <>
      <div className="adm-topbar">
        <div className="crumbs">
          <span className="brand-stamp">
            <span className="mk">ADMIN PANEL</span>
          </span>
          <Link href="/admin/projects" className="crumb-link">Layihələr</Link>
          <span className="sep" />
          <em>{initial.title.az || initial.slug}</em>
        </div>
        <span className="serial">/{initial.slug}</span>
        <AccountChip />
      </div>

      <div className="adm-content">
        <div className="adm-pagehead">
          <div className="adm-pagehead-title">
            <Link href="/admin/projects" className="adm-back" aria-label="Layihələrə qayıt">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Geri</span>
            </Link>
            <h1 className="adm-h1">
              {initial.title.az || initial.slug}
              {initial.titleItalic.az && <> <em>{initial.titleItalic.az}</em></>}
            </h1>
          </div>
        </div>

        <ProjectForm initial={initial} mode="edit" />
      </div>
    </>
  );
}
