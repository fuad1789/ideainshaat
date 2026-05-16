import Link from 'next/link';
import { ProjectForm, emptyProject } from '@/components/admin/ProjectForm';
import { AccountChip } from '@/components/admin/AccountChip';

export default function NewProjectPage() {
  return (
    <>
      <div className="adm-topbar">
        <div className="crumbs">
          <span className="brand-stamp">
            <span className="mk">ADMIN PANEL</span>
          </span>
          <Link href="/admin/projects" className="crumb-link">Layihələr</Link>
          <span className="sep" />
          <em>Yeni</em>
        </div>
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
              Yeni <em>layihə</em>
            </h1>
          </div>
        </div>

        <ProjectForm initial={emptyProject} mode="create" />
      </div>
    </>
  );
}
