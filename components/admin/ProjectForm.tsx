'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ImageUploader, type UploadedImage } from './ImageUploader';
import { Toast } from './Toast';

type Locale = 'az' | 'ru' | 'en';

const CATEGORIES = [
  { value: 'villa', label: 'Villa' },
  { value: 'apartment', label: 'Mənzil' },
  { value: 'restaurant', label: 'Restoran' },
  { value: 'office', label: 'Ofis' },
  { value: 'commercial', label: 'Kommersiya' },
  { value: 'other', label: 'Digər' },
] as const;

const STATUSES = [
  { value: 'completed', label: 'Tamamlanıb' },
  { value: 'in_progress', label: 'Davam edir' },
  { value: 'planned', label: 'Planlaşdırılıb' },
] as const;

export interface ProjectFormValues {
  _id?: string;
  slug: string;
  title: { az: string; ru: string; en: string };
  titleItalic: { az: string; ru: string; en: string };
  description: { az: string; ru: string; en: string };
  category: (typeof CATEGORIES)[number]['value'];
  status: (typeof STATUSES)[number]['value'];
  featured: boolean;
  published: boolean;
  location: string;
  size: string;
  duration: string;
  year: string;
  coverImage: UploadedImage | null;
  gallery: UploadedImage[];
  order: number;
}

export const emptyProject: ProjectFormValues = {
  slug: '',
  title: { az: '', ru: '', en: '' },
  titleItalic: { az: '', ru: '', en: '' },
  description: { az: '', ru: '', en: '' },
  category: 'villa',
  status: 'completed',
  featured: false,
  published: true,
  location: '',
  size: '',
  duration: '',
  year: String(new Date().getFullYear()),
  coverImage: null,
  gallery: [],
  order: 0,
};

interface ProjectFormProps {
  initial: ProjectFormValues;
  mode: 'create' | 'edit';
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/ə/g, 'e').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/ç/g, 'c').replace(/ş/g, 's').replace(/ğ/g, 'g')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function ProjectForm({ initial, mode }: ProjectFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<ProjectFormValues>(initial);
  const [locale, setLocale] = useState<Locale>('az');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; kind: 'success' | 'error' } | null>(null);

  function setLocalized<K extends 'title' | 'description'>(key: K, val: string) {
    setValues((v) => ({ ...v, [key]: { ...v[key], [locale]: val } }));
  }

  function handleTitleChange(val: string) {
    setValues((v) => {
      const next = { ...v, title: { ...v.title, [locale]: val } };
      if (locale === 'az' && mode === 'create') {
        next.slug = slugify(val);
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.title.az.trim()) {
      setToast({ msg: 'Başlıq daxil edin', kind: 'error' });
      return;
    }

    const payload: ProjectFormValues = {
      ...values,
      slug: values.slug.trim() || slugify(values.title.az),
      published: true,
      featured: false,
    };

    setSaving(true);
    try {
      const endpoint =
        mode === 'create'
          ? '/api/admin/projects'
          : `/api/admin/projects/${values._id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error ?? 'Yaddaşa yazıla bilmədi');
      }

      setToast({ msg: mode === 'create' ? 'Layihə yaradıldı' : 'Dəyişikliklər yadda saxlandı', kind: 'success' });
      setTimeout(() => router.push('/admin/projects'), 600);
      router.refresh();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Xəta';
      setToast({ msg: message, kind: 'error' });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="adm-form" onSubmit={handleSubmit}>
      <div>
        <section className="adm-section">
          <div className="adm-section-head">
            <h3>Məlumat</h3>
          </div>

          <div className="adm-locale-tabs">
            {(['az', 'ru', 'en'] as Locale[]).map((l) => (
              <button
                key={l}
                type="button"
                className={`adm-locale-tab ${locale === l ? 'is-active' : ''}`}
                onClick={() => setLocale(l)}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="adm-field">
            <label className="adm-label">Başlıq</label>
            <input
              className="adm-input"
              placeholder="Məs. Royal Park Villa"
              value={values.title[locale]}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          </div>

          <div className="adm-field">
            <label className="adm-label">Təsvir</label>
            <textarea
              className="adm-textarea"
              rows={4}
              value={values.description[locale]}
              onChange={(e) => setLocalized('description', e.target.value)}
              placeholder="Layihə haqqında qısa təsvir…"
            />
          </div>
        </section>

        <section className="adm-section">
          <div className="adm-section-head">
            <h3>Detallar</h3>
          </div>

          <div className="adm-field-row">
            <div className="adm-field">
              <label className="adm-label">Yer</label>
              <input
                className="adm-input"
                value={values.location}
                onChange={(e) => setValues((v) => ({ ...v, location: e.target.value }))}
                placeholder="Bakı, Yasamal"
              />
            </div>
            <div className="adm-field">
              <label className="adm-label">Sahə</label>
              <input
                className="adm-input"
                value={values.size}
                onChange={(e) => setValues((v) => ({ ...v, size: e.target.value }))}
                placeholder="240 m²"
              />
            </div>
          </div>

          <div className="adm-field-row">
            <div className="adm-field">
              <label className="adm-label">Müddət</label>
              <input
                className="adm-input"
                value={values.duration}
                onChange={(e) => setValues((v) => ({ ...v, duration: e.target.value }))}
                placeholder="8 ay"
              />
            </div>
            <div className="adm-field">
              <label className="adm-label">İl</label>
              <input
                className="adm-input"
                value={values.year}
                onChange={(e) => setValues((v) => ({ ...v, year: e.target.value }))}
                placeholder="2024"
              />
            </div>
          </div>
        </section>

        <section className="adm-section">
          <div className="adm-section-head">
            <h3>Şəkil</h3>
          </div>

          <div className="adm-field">
            {values.coverImage ? (
              <div className="adm-cover">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={values.coverImage.url} alt="cover" />
                <button
                  type="button"
                  className="swap"
                  onClick={() => setValues((v) => ({ ...v, coverImage: null }))}
                >
                  Dəyiş
                </button>
              </div>
            ) : (
              <ImageUploader
                value={[]}
                multiple={false}
                onChange={(imgs) => setValues((v) => ({ ...v, coverImage: imgs[0] ?? null }))}
                onError={(msg) => setToast({ msg, kind: 'error' })}
              />
            )}
          </div>
        </section>
      </div>

      <aside className="adm-aside">
        <section className="adm-section">
          <div className="adm-section-head">
            <h3>Təsnifat</h3>
          </div>

          <div className="adm-field">
            <label className="adm-label">Kateqoriya</label>
            <select
              className="adm-select"
              value={values.category}
              onChange={(e) => setValues((v) => ({ ...v, category: e.target.value as ProjectFormValues['category'] }))}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="adm-field">
            <label className="adm-label">Status</label>
            <select
              className="adm-select"
              value={values.status}
              onChange={(e) => setValues((v) => ({ ...v, status: e.target.value as ProjectFormValues['status'] }))}
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </section>

        <div className="adm-sticky-actions">
          <button
            type="button"
            className="adm-btn adm-btn-ghost"
            onClick={() => router.push('/admin/projects')}
          >
            Geri
          </button>
          <span className="saving">{saving ? 'Saxlanılır…' : '·'}</span>
          <button
            type="submit"
            className="adm-btn adm-btn-copper"
            disabled={saving}
            style={{ marginLeft: 'auto' }}
          >
            {mode === 'create' ? 'Yarat' : 'Saxla'}
            <span className="arr">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 8H14M14 8L8 2M14 8L8 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
          </button>
        </div>
      </aside>

      {toast && <Toast message={toast.msg} kind={toast.kind} onClose={() => setToast(null)} />}
    </form>
  );
}
