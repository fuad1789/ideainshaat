'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { Toast } from '@/components/admin/Toast';
import { AccountChip } from '@/components/admin/AccountChip';

interface ProjectListItem {
  _id: string;
  slug: string;
  title: { az: string; ru: string; en: string };
  titleItalic: { az: string; ru: string; en: string };
  category: string;
  status: 'completed' | 'in_progress' | 'planned';
  featured: boolean;
  published: boolean;
  location: string;
  year: string;
  coverImage?: { url: string } | null;
  updatedAt: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  villa: 'Villa',
  apartment: 'Mənzil',
  restaurant: 'Restoran',
  office: 'Ofis',
  commercial: 'Kommersiya',
  other: 'Digər',
};

const CATEGORIES = ['all', 'villa', 'apartment', 'restaurant', 'office', 'commercial', 'other'] as const;

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString('az-Latn-AZ', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [confirm, setConfirm] = useState<{ id: string; name: string } | null>(null);
  const [toast, setToast] = useState<{ msg: string; kind: 'success' | 'error' } | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/projects');
      const json = await res.json();
      if (json.success) setProjects(json.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (filter !== 'all' && p.category !== filter) return false;
      if (query) {
        const q = query.toLowerCase();
        const hay = `${p.title.az} ${p.title.ru} ${p.title.en} ${p.slug} ${p.location}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [projects, filter, query]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: projects.length };
    for (const p of projects) map[p.category] = (map[p.category] ?? 0) + 1;
    return map;
  }, [projects]);

  async function handleDelete() {
    if (!confirm) return;
    const id = confirm.id;
    setConfirm(null);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error ?? 'Silinmədi');
      setProjects((arr) => arr.filter((p) => p._id !== id));
      setToast({ msg: 'Layihə silindi', kind: 'success' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Xəta';
      setToast({ msg: message, kind: 'error' });
    }
  }

  return (
    <>
      <div className="adm-topbar">
        <div className="crumbs">
          <span className="brand-stamp">
            <span className="mk">ADMIN PANEL</span>
          </span>
          <em>Layihələr</em>
        </div>
        <span className="serial">
          {String(filtered.length).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>
        <AccountChip />
      </div>

      <div className="adm-content">
        <div className="adm-pagehead">
          <div>
            <h1 className="adm-h1">
              <em>Layihələr</em>
            </h1>
          </div>
          <Link href="/admin/projects/new" className="adm-btn adm-btn-copper">
            Yeni layihə
            <span className="arr">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
          </Link>
        </div>

        <div className="adm-filterbar">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              className={`adm-filter-pill ${filter === c ? 'is-active' : ''}`}
              onClick={() => setFilter(c)}
            >
              <span>{c === 'all' ? 'Hamısı' : CATEGORY_LABELS[c]}</span>
              <span className="n">{counts[c] ?? 0}</span>
            </button>
          ))}
          <div className="adm-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              placeholder="Axtar — başlıq, slug, yer…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="adm-dossier">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="adm-row">
                <div className="serial">—</div>
                <div className="thumb shimmer" />
                <div className="title">
                  <div className="t shimmer" style={{ height: 18, borderRadius: 6, width: '60%' }} />
                  <div className="s shimmer" style={{ height: 12, borderRadius: 6, width: '30%', marginTop: 8 }} />
                </div>
                <div className="meta shimmer" style={{ height: 14, borderRadius: 6 }} />
                <div className="shimmer" style={{ height: 22, borderRadius: 999 }} />
                <div className="shimmer" style={{ height: 22, borderRadius: 999 }} />
                <div />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="adm-empty">
            <div className="icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 21V8l9-5 9 5v13M9 21v-7h6v7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>{projects.length === 0 ? <>Hələ <em>heç bir layihə</em> yoxdur</> : <>Bu filterdə <em>heç nə</em> tapılmadı</>}</h3>
            <p>{projects.length === 0 ? 'İlk dosyenizi əlavə edin — saytda dərhal görünəcək.' : 'Filtri dəyişin və ya axtarışı təmizləyin.'}</p>
            {projects.length === 0 && (
              <Link href="/admin/projects/new" className="adm-btn adm-btn-copper">
                İlk layihəni yarat
              </Link>
            )}
          </div>
        ) : (
          <div className="adm-dossier">
            <div className="adm-dossier-head">
              <span>№</span>
              <span>Şəkil</span>
              <span>Layihə</span>
              <span>Yer · İl</span>
              <span>Kateqoriya</span>
              <span>Status</span>
              <span style={{ textAlign: 'right' }}>Əməliyyat</span>
            </div>
            {filtered.map((p, idx) => (
              <div key={p._id} className="adm-row">
                <span className="serial">
                  {String(idx + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}
                </span>
                <Link href={`/admin/projects/${p._id}`} className={`thumb ${p.coverImage?.url ? '' : 'empty'}`}>
                  {p.coverImage?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.coverImage.url} alt={p.title.az} />
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                  )}
                </Link>
                <Link href={`/admin/projects/${p._id}`} className="title" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="t">
                    {p.title.az || '—'}{' '}
                    {p.titleItalic.az && <em>{p.titleItalic.az}</em>}
                    {!p.published && <span style={{ marginLeft: 8, fontSize: 10, color: 'var(--adm-muted)', letterSpacing: '.2em', textTransform: 'uppercase' }}>· gizli</span>}
                  </div>
                  <div className="s">/{p.slug}</div>
                </Link>
                <div className="meta">
                  {p.location || '—'}
                  {p.year && <span style={{ color: 'var(--adm-copper)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}> · {p.year}</span>}
                </div>
                <div><span className="cat-pill">{CATEGORY_LABELS[p.category] ?? p.category}</span></div>
                <div><StatusBadge status={p.status} /></div>
                <div className="actions">
                  <Link href={`/admin/projects/${p._id}`} className="iconbtn" aria-label="Redaktə et">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </Link>
                  <button
                    type="button"
                    className="iconbtn danger"
                    aria-label="Sil"
                    onClick={() => setConfirm({ id: p._id, name: p.title.az || p.slug })}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!confirm}
        title={`<em>${confirm?.name ?? ''}</em> silinsin?`}
        message="Bu layihə və onun bütün şəkilləri Cloudinary-dən birdəfəlik silinəcək. Bu əməliyyat geri qaytarıla bilməz."
        onConfirm={handleDelete}
        onCancel={() => setConfirm(null)}
      />

      {toast && <Toast message={toast.msg} kind={toast.kind} onClose={() => setToast(null)} />}
    </>
  );
}
