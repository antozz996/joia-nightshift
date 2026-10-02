type KineticMarqueeProps = {
  items: string[];
  label?: string;
};

export function KineticMarquee({ items, label = "In programmazione" }: KineticMarqueeProps) {
  const sequence = [...items, ...items];

  return (
    <section className="kinetic-marquee" aria-label={label}>
      <div className="kinetic-marquee__track" aria-hidden="true">
        {sequence.map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}
            <i>↗</i>
          </span>
        ))}
      </div>
      <span className="sr-only">{items.join(", ")}</span>
    </section>
  );
}
