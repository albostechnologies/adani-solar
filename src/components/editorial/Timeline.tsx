interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-0">
      {items.map((item, index) => (
        <article
          key={`${item.year}-${item.title}`}
          className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 py-7 sm:py-8 editorial-divider border-t first:border-t-0"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-solar-green tabular-nums">
            {item.year}
          </p>
          <div>
            <h3 className="font-[family-name:var(--font-poppins)] text-lg sm:text-xl font-semibold text-foreground mb-2">
              {item.title}
            </h3>
            <p className="editorial-body text-muted-foreground">{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
