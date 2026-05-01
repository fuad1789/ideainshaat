'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Logo } from './Logo';
import { LangSwitcher } from './LangSwitcher';

export function Nav() {
  const t = useTranslations('Nav');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const siteNav = document.getElementById('siteNav');
    if (!siteNav) return;
    const setNavState = () => {
      if (window.scrollY > 10) siteNav.classList.add('is-scrolled');
      else siteNav.classList.remove('is-scrolled');
    };
    setNavState();
    window.addEventListener('scroll', setNavState, { passive: true });
    return () => window.removeEventListener('scroll', setNavState);
  }, []);

  const closeOverlay = () => setOpen(false);

  return (
    <>
      <nav id="siteNav" className="fixed top-0 left-0 right-0 z-40">
        <div className="relative px-5 md:px-10 py-3 md:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-petrol" aria-label="İdea İnşaat">
            <Logo className="h-10 md:h-12 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-[14px] text-petrol/80">
            <a href="#xidmetler" className="link-anim hover:text-petrol">{t('services')}</a>
            <a href="#proses" className="link-anim hover:text-petrol">{t('process')}</a>
            <a href="#layiheler" className="link-anim hover:text-petrol">{t('projects')}</a>
            <a href="#rey" className="link-anim hover:text-petrol">{t('reviews')}</a>
            <a href="#elaqe" className="link-anim hover:text-petrol">{t('contact')}</a>
          </div>

          <div className="flex items-center gap-3">
            <a href={`tel:${t('phone').replace(/\s/g, '')}`} className="hidden lg:inline-flex text-petrol/70 hover:text-petrol text-[13px] font-medium items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 10v2a1 1 0 01-1.1 1 11 11 0 01-4.8-1.7 10.8 10.8 0 01-3.3-3.3A11 11 0 012.4 3.2 1 1 0 013.4 2h2a1 1 0 011 .86 6.8 6.8 0 00.37 1.5 1 1 0 01-.22 1L5.7 6.2a8.8 8.8 0 003.3 3.3l.86-.86a1 1 0 011-.22 6.8 6.8 0 001.5.37 1 1 0 01.86 1z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t('phone')}
            </a>
            <a href="#elaqe" className="hidden md:inline-flex bg-petrol hover:bg-petrol-deep text-cream px-4 py-2 rounded-full text-[13px] font-medium items-center gap-1.5 transition">
              {t('consultation')}
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M2 8H14M14 8L8 2M14 8L8 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </a>
            <div className="flex items-center gap-3 md:gap-2 md:ml-1 text-[12px] tracking-[0.12em]">
              <LangSwitcher />
            </div>
            <button
              id="navToggle"
              aria-label={t('openMenu')}
              className="md:hidden w-10 h-10 rounded-full bg-petrol/10 text-petrol flex items-center justify-center"
              onClick={() => setOpen(true)}
            >
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                <path d="M1 1H19M1 7H19M1 13H12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div id="navOverlay" className={`nav-overlay${open ? ' open' : ''}`}>
        <button
          id="navClose"
          aria-label={t('close')}
          className="absolute top-4 right-4 w-11 h-11 rounded-full bg-cream/10 text-cream flex items-center justify-center"
          onClick={closeOverlay}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
        <ul className="font-display text-cream text-5xl space-y-5 leading-none">
          <li><a href="#xidmetler" onClick={closeOverlay}>{t('services')}</a></li>
          <li><a href="#proses" onClick={closeOverlay}>{t('process')}</a></li>
          <li><a href="#layiheler" onClick={closeOverlay}>{t('projects')}</a></li>
          <li><a href="#rey" onClick={closeOverlay}>{t('reviews')}</a></li>
          <li><a href="#elaqe" onClick={closeOverlay}>{t('contact')}</a></li>
        </ul>
        <div className="mt-10 text-cream/60 text-sm">
          <div className="mb-2">{t('email')}</div>
          <div>{t('phone')}</div>
          <div className="mt-6 text-cream/80">
            <LangSwitcher variant="footer" />
          </div>
        </div>
      </div>
    </>
  );
}
