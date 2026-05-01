import { useTranslations } from 'next-intl';
import { Logo } from './Logo';
import { LangSwitcher } from './LangSwitcher';

const SERVICE_KEYS = ['design', 'construction', 'furniture', 'exterior', 'landscape'] as const;
const COMPANY_KEYS = ['about', 'projects', 'career', 'contact'] as const;

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-ink text-cream px-5 md:px-10 py-12 md:py-16">
      <div className="grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-cream" aria-label="İdea İnşaat">
            <Logo className="h-14 w-auto" primaryOpacity={0.7} />
          </div>
          <p className="mt-4 text-cream/60 text-sm max-w-md">
            {t('tagline')}
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-cream/50 mb-4">{t('servicesHeading')}</div>
          <ul className="space-y-2 text-sm text-cream/80">
            {SERVICE_KEYS.map((k) => (
              <li key={k}>
                <a href="#" className="hover:text-copper">{t(`services.${k}`)}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-cream/50 mb-4">{t('companyHeading')}</div>
          <ul className="space-y-2 text-sm text-cream/80">
            {COMPANY_KEYS.map((k) => (
              <li key={k}>
                <a href="#" className="hover:text-copper">{t(`company.${k}`)}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/40">
        <span>{t('copyright')}</span>
        <LangSwitcher variant="footer" />
      </div>
    </footer>
  );
}
