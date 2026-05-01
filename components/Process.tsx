import { useTranslations } from 'next-intl';

const STEP_KEYS = ['discover', 'design', 'build', 'deliver'] as const;

export function Process() {
  const t = useTranslations('Process');

  return (
    <section id="proses" className="px-5 md:px-10 py-16 md:py-28">
      <div className="max-w-3xl mb-10 md:mb-16">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-copper mb-5">
          <span className="w-6 h-px bg-copper"></span>
          {t('eyebrow')}
        </div>
        <h2 className="font-display text-[40px] md:text-[72px] leading-[.98] tracking-[-.015em] text-ink">
          {t('headline1')} <span className="italic-display text-ink/45">{t('headline2')}</span> {t('headline3')}
        </h2>
        <p className="mt-5 text-ink/60 text-[14px] md:text-[16px] leading-[1.6] max-w-lg">
          {t('subtitle')}
        </p>
      </div>

      <ol className="md:grid md:grid-cols-4 md:gap-8 md:divide-x md:divide-ink/10 divide-y md:divide-y-0 divide-ink/10 border-t border-b md:border-b-0 md:border-t-0 border-ink/10">
        {STEP_KEYS.map((key, i) => (
          <li key={key} className={`py-5 md:py-0 md:pl-6 ${i === 0 ? 'md:first:pl-0' : ''} group`}>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-[22px] md:text-[26px] text-copper leading-none shrink-0 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-[22px] md:text-[26px] text-ink leading-tight">
                {t(`steps.${key}.title`)}
              </h3>
            </div>
            <p className="mt-2 text-[13px] md:text-[13.5px] text-ink/60 leading-[1.6] md:max-w-[260px]">
              {t(`steps.${key}.desc`)}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
