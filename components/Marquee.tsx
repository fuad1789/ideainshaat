const ITEMS = [
  'Röyal park',
  'İzmir residance',
  'Fəvvarələr meydanı',
  'Goradil villa',
  'Qəçrəş villa',
  'Maştağa villa',
  'Gəncə villa',
];

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex items-center gap-10 md:gap-16 px-8 text-sm md:text-base whitespace-nowrap font-display"
      aria-hidden={ariaHidden || undefined}
    >
      {ITEMS.map((it, i) => (
        <span key={i} className="contents">
          <span>{it}</span>
          <span className="text-copper">✦</span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <section className="bg-petrol text-cream/70 py-6 mt-10 md:mt-24 overflow-hidden">
      <div className="marquee-track">
        <Track />
        <Track ariaHidden />
      </div>
    </section>
  );
}
