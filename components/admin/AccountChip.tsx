'use client';

import { signOut, useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

function initials(name?: string | null, email?: string | null): string {
  const src = name || email || '';
  const parts = src.split(/[\s@.]/).filter(Boolean);
  if (parts.length === 0) return 'A';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
}

export function AccountChip() {
  const { data: session } = useSession();
  const user = session?.user;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="adm-account" ref={ref}>
      <button
        type="button"
        className="adm-account-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Hesab"
      >
        <span className="av">
          {user?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt={user.name ?? 'avatar'} />
          ) : (
            <span>{initials(user?.name, user?.email)}</span>
          )}
        </span>
        <span className="who">
          <span className="n">{user?.name ?? 'Admin'}</span>
          <span className="m">{user?.email ?? ''}</span>
        </span>
        <svg className={`chev ${open ? 'up' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="adm-account-menu">
          <div className="adm-account-info">
            <div className="adm-account-info-name">{user?.name ?? 'Admin'}</div>
            <div className="adm-account-info-mail">{user?.email ?? ''}</div>
          </div>
          <button
            type="button"
            className="adm-account-logout"
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Çıxış</span>
          </button>
        </div>
      )}
    </div>
  );
}
