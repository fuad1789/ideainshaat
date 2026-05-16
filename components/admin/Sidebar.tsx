'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const NAV = [
  {
    num: '01',
    href: '/admin',
    label: 'İcmal',
    match: (p: string) => p === '/admin',
    icon: (
      <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
  },
  {
    num: '02',
    href: '/admin/projects',
    label: 'Layihələr',
    match: (p: string) => p.startsWith('/admin/projects'),
    icon: (
      <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V8l9-5 9 5v13" />
        <path d="M9 21v-7h6v7" />
        <path d="M3 13h18" />
      </svg>
    ),
  },
];

function initials(name?: string | null, email?: string | null): string {
  const src = name || email || '';
  const parts = src.split(/[\s@.]/).filter(Boolean);
  if (parts.length === 0) return 'A';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
}

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <aside className="adm-side">
      <div className="adm-brand">
        <span className="mark">ATELIER</span>
        <span className="sub">· studio dossier</span>
      </div>

      <div className="adm-side-label">Naviqasiya</div>
      <nav className="adm-nav">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={item.match(pathname ?? '') ? 'is-active' : ''}
          >
            <span className="num">{item.num}</span>
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="adm-side-foot">
        <div className="adm-avatar">
          {user?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt={user.name ?? 'avatar'} />
          ) : (
            <span>{initials(user?.name, user?.email)}</span>
          )}
        </div>
        <div className="who">
          <div className="name">{user?.name ?? 'Admin'}</div>
          <div className="mail">{user?.email ?? ''}</div>
        </div>
        <button
          type="button"
          className="logout"
          aria-label="Çıxış"
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
