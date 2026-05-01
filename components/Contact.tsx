import { useTranslations } from 'next-intl';

const SERVICE_KEYS = ['design', 'construction', 'furniture', 'exterior', 'landscape', 'unsure'] as const;

export function Contact() {
  const t = useTranslations('Contact');
  const tNav = useTranslations('Nav');

  return (
    <section id="elaqe" className="px-5 md:px-10 py-16 md:py-28">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-copper mb-4">{t('eyebrow')}</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-ink">
            {t('headline1')} <br />
            <span className="italic-display">{t('headline2')}</span> {t('headline3')}<br />
            {t('headline4')}
          </h2>
          <p className="mt-6 text-ink/70 text-[15px] md:text-lg max-w-lg">
            {t('body')}
          </p>

          <div className="mt-10 space-y-4 text-lg">
            <a href={`mailto:${tNav('email')}`} className="flex items-center gap-3 text-ink hover:text-copper transition">
              <span className="w-11 h-11 rounded-full bg-ink/5 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M3 7L12 13L21 7M3 7V17C3 18.1 3.9 19 5 19H19C20.1 19 21 18.1 21 17V7M3 7C3 5.9 3.9 5 5 5H19C20.1 5 21 5.9 21 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {tNav('email')}
            </a>
            <a href={`tel:${tNav('phone').replace(/\s/g, '')}`} className="flex items-center gap-3 text-ink hover:text-copper transition">
              <span className="w-11 h-11 rounded-full bg-ink/5 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92V19.92C22 20.52 21.52 21 20.92 21C10.43 21 2 12.57 2 2.08C2 1.48 2.48 1 3.08 1H6.08C6.68 1 7.16 1.48 7.16 2.08C7.16 3.56 7.42 4.98 7.9 6.3C8.04 6.68 7.94 7.12 7.64 7.42L5.9 9.16C7.36 12.04 9.96 14.64 12.84 16.1L14.58 14.36C14.88 14.06 15.32 13.96 15.7 14.1C17.02 14.58 18.44 14.84 19.92 14.84C20.52 14.84 21 15.32 21 15.92" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {tNav('phone')}
            </a>
            <a href="#" className="flex items-center gap-3 text-ink hover:text-copper transition">
              <span className="w-11 h-11 rounded-full bg-ink/5 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C7.58 2 4 5.58 4 10C4 15 12 22 12 22S20 15 20 10C20 5.58 16.42 2 12 2ZM12 12.5C10.62 12.5 9.5 11.38 9.5 10C9.5 8.62 10.62 7.5 12 7.5C13.38 7.5 14.5 8.62 14.5 10C14.5 11.38 13.38 12.5 12 12.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </span>
              {t('address')}
            </a>
          </div>

          <div className="mt-8 flex gap-3">
            <a href="#" aria-label="Instagram" className="w-11 h-11 rounded-full bg-ink text-cream flex items-center justify-center hover:bg-copper transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a href="#" aria-label="WhatsApp" className="w-11 h-11 rounded-full bg-ink text-cream flex items-center justify-center hover:bg-copper transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M20 4C16.1 0.1 9.9 0.1 6 4C2.1 7.9 1.4 13.9 4.2 18.6L3 22L6.6 20.9C11.3 23.5 17.1 22.6 20.9 18.8C24.7 15 24.7 8.9 20 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="w-11 h-11 rounded-full bg-ink text-cream flex items-center justify-center hover:bg-copper transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H17V5H14C13.4 5 13 5.4 13 6V8H17L16 12H13V22H9V12H6V8H9V6C9 3.8 10.8 2 13 2H14Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        <form className="bg-cream-warm/60 rounded-3xl p-6 md:p-8 space-y-4">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted">{t('form.name')}</label>
            <input
              type="text"
              placeholder={t('form.namePlaceholder')}
              className="w-full mt-2 bg-transparent border-0 border-b border-ink/20 focus:border-copper focus:ring-0 py-3 text-ink placeholder:text-muted/50 outline-none"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted">{t('form.phone')}</label>
            <input
              type="tel"
              placeholder={t('form.phonePlaceholder')}
              className="w-full mt-2 bg-transparent border-0 border-b border-ink/20 focus:border-copper focus:ring-0 py-3 text-ink placeholder:text-muted/50 outline-none"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted">{t('form.service')}</label>
            <select className="w-full mt-2 bg-transparent border-0 border-b border-ink/20 focus:border-copper focus:ring-0 py-3 text-ink outline-none">
              {SERVICE_KEYS.map((k) => (
                <option key={k}>{t(`form.services.${k}`)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted">{t('form.about')}</label>
            <textarea
              rows={3}
              placeholder={t('form.aboutPlaceholder')}
              className="w-full mt-2 bg-transparent border-0 border-b border-ink/20 focus:border-copper focus:ring-0 py-3 text-ink placeholder:text-muted/50 outline-none resize-none"
            ></textarea>
          </div>
          <button
            type="button"
            className="btn-copper bg-copper text-cream w-full py-4 rounded-full text-[15px] font-medium mt-2 inline-flex items-center justify-center gap-2"
          >
            {t('form.submit')}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8H14M14 8L8 2M14 8L8 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <p className="text-xs text-muted/70 text-center">{t('form.callbackNote')}</p>
        </form>
      </div>
    </section>
  );
}
