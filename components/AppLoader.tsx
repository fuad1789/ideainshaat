'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export function AppLoader() {
  const t = useTranslations('Loader');

  useEffect(() => {
    const variant = document.body.dataset.loader || 'b';
    const loader = document.getElementById(variant === 'a' ? 'appLoader' : 'appLoaderB');
    if (!loader) return;
    const minDuration = variant === 'a' ? 2700 : 3700;
    const startedAt = performance.now();

    let raf = 0;
    if (variant === 'b') {
      const counter = document.getElementById('lbCounter');
      const status = document.getElementById('lbStatus');
      const STATUSES = [
        { at: 0, text: t('status1') },
        { at: 35, text: t('status2') },
        { at: 70, text: t('status3') },
        { at: 92, text: t('status4') },
      ];
      const tick = () => {
        const tt = Math.min(1, (performance.now() - startedAt) / minDuration);
        const pct = Math.floor(tt * 100);
        if (counter) counter.textContent = String(pct).padStart(2, '0');
        if (status) {
          const cur = STATUSES.slice().reverse().find((s) => pct >= s.at);
          if (cur && status.textContent !== cur.text) status.textContent = cur.text;
        }
        if (tt < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }

    const dismiss = () => {
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, minDuration - elapsed);
      setTimeout(() => {
        loader.classList.add('is-done');
        document.body.classList.remove('is-loading');
        setTimeout(() => loader.remove(), 1800);
      }, remaining);
    };
    if (document.readyState === 'complete') dismiss();
    else window.addEventListener('load', dismiss, { once: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [t]);

  return (
    <>
      {/* ===== APP LOADER B — Atelier · Blueprint to Reality ===== */}
      <div id="appLoaderB" aria-hidden="true">
        <div className="lb-grid"></div>
        <div className="lb-aurora"></div>

        <div className="lb-corner lb-tl">
          <span className="lb-cornerLabel">N</span>
          <svg className="lb-compass" viewBox="0 0 40 40" width="34" height="34">
            <line x1="20" y1="6" x2="20" y2="34" stroke="currentColor" strokeWidth="1" />
            <line x1="6" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="1" />
            <line x1="10" y1="10" x2="30" y2="30" stroke="currentColor" strokeWidth=".5" opacity=".4" />
            <line x1="30" y1="10" x2="10" y2="30" stroke="currentColor" strokeWidth=".5" opacity=".4" />
            <circle cx="20" cy="20" r="2" fill="currentColor" />
          </svg>
        </div>
        <div className="lb-corner lb-tr">
          İDEA · İNŞAAT
          <br />
          <em>atelier</em>
        </div>
        <div className="lb-corner lb-bl">
          SCALE 1:50
          <br />
          <em>blueprint</em>
        </div>
        <div className="lb-corner lb-br">
          <em>{t('city')}</em>
          <br />
          40°23′ · 49°52′
        </div>

        <div className="lb-stage">
          <div className="lb-dim lb-dim-top">
            <span className="lb-tick"></span>
            <span className="lb-label">12.40 M</span>
            <span className="lb-tick"></span>
          </div>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="lb-frames">
              <span className="lb-frame f1"></span>
              <span className="lb-frame f2"></span>
              <span className="lb-frame f3"></span>
            </div>
            <svg className="lb-logo" viewBox="0 0 643 470" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path className="lbp p1" d="M270.129 460.068H217.063L461.038 250.542L270.129 460.068Z" />
              <path className="lbp p2" d="M574.941 132.349L0 460.487L64.1765 458.315L574.941 132.349Z" />
              <path className="lbp p3" d="M64.1328 271.06V424.804V425.073L96.2751 406.516V288.06L151.142 252.906V375.474L182.628 357.296V109.013L235.598 74.0373V326.918L266.382 309.145V53.9614L318.141 17.7307L295.212 0L151.142 92.9784V215.656L64.1328 271.06Z" />
              <path className="lbp p4" d="M461.034 250.539L400.945 316.488V460.068H403.302H461.034V250.539Z" />
              <path className="lbp p5" d="M485.223 460.487V246.377L546.353 289.086V460.487H485.223Z" />
              <path className="lbp p6" d="M318.141 279.86V17.7373L378.19 54.6772V245.572L318.141 279.86Z" />
              <path className="lbp p7" d="M464.107 110.145L404.648 70.3494V230.854L464.107 196.525V110.145Z" />
              <path className="lbp p8" d="M317.764 460.068V408.698L379.266 339.89V460.068H317.764Z" />
            </svg>
          </div>

          <div className="lb-dim lb-dim-bot">
            <span className="lb-tick"></span>
            <span className="lb-label">8.20 M</span>
            <span className="lb-tick"></span>
          </div>

          <div className="lb-word">
            <span className="lb-rule lb-rule-l"></span>
            <span className="lb-letters">
              <span className="lb-l">İ</span>
              <span className="lb-l">D</span>
              <span className="lb-l">E</span>
              <span className="lb-l">A</span>
            </span>
            <span className="lb-bullet">·</span>
            <span className="lb-sub">İNŞAAT</span>
            <span className="lb-rule lb-rule-r"></span>
          </div>

          <div className="lb-progress">
            <span className="lb-counter" id="lbCounter">00</span>
            <span className="lb-bar"><span className="lb-fill"></span></span>
            <span className="lb-status" id="lbStatus">{t('status1')}</span>
          </div>
        </div>

        <span className="lb-curtain c1"></span>
        <span className="lb-curtain c2"></span>
        <span className="lb-curtain c3"></span>
      </div>

      {/* ===== APP LOADER A — original construction sequence ===== */}
      <div id="appLoader" aria-hidden="true">
        <span className="loader-tag lt-tl">İdea İnşaat</span>
        <span className="loader-tag lt-br">{t('city')}</span>

        <div className="loader-stage">
          <svg className="loader-svg" viewBox="0 0 643 470" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path className="lp lp-beam b1" d="M270.129 460.068H217.063L461.038 250.542L270.129 460.068Z" />
            <path className="lp lp-beam b2" d="M574.941 132.349L0 460.487L64.1765 458.315L574.941 132.349Z" />
            <path className="lp lp-stairs" d="M64.1328 271.06V424.804V425.073L96.2751 406.516V288.06L151.142 252.906V375.474L182.628 357.296V109.013L235.598 74.0373V326.918L266.382 309.145V53.9614L318.141 17.7307L295.212 0L151.142 92.9784V215.656L64.1328 271.06Z" />
            <path className="lp lp-col c1" d="M461.034 250.539L400.945 316.488V460.068H403.302H461.034V250.539Z" />
            <path className="lp lp-col c2" d="M485.223 460.487V246.377L546.353 289.086V460.487H485.223Z" />
            <path className="lp lp-col c3" d="M318.141 279.86V17.7373L378.19 54.6772V245.572L318.141 279.86Z" />
            <path className="lp lp-col c4" d="M464.107 110.145L404.648 70.3494V230.854L464.107 196.525V110.145Z" />
            <path className="lp lp-col c5" d="M317.764 460.068V408.698L379.266 339.89V460.068H317.764Z" />
          </svg>

          <div className="loader-word" aria-label="İdea İnşaat">
            <span className="lw-letter">İ</span>
            <span className="lw-letter">D</span>
            <span className="lw-letter">E</span>
            <span className="lw-letter">A</span>
          </div>
          <span className="lw-sub">İnşaat</span>

          <div className="loader-bar" aria-hidden="true"></div>
        </div>
      </div>
    </>
  );
}
