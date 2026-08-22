interface FeatureListProps {
  items: Array<{ title: string; description: string }>;
  variant?: "light" | "dark";
}

export function FeatureList({ items, variant = "light" }: FeatureListProps) {
  const isDark = variant === "dark";

  return (
    <div className="divide-y divide-border/70">
      {items.map((item, index) => (
        <div
          key={item.title}
          className="grid grid-cols-1 md:grid-cols-[72px_1fr] gap-3 md:gap-6 py-6 sm:py-7"
        >
          <p className={`text-sm tabular-nums ${isDark ? "text-white/45" : "text-muted-foreground"}`}>
            {String(index + 1).padStart(2, "0")}
          </p>
          <div>
            <h3
              className={`font-[family-name:var(--font-poppins)] text-lg sm:text-xl font-semibold mb-2 ${
                isDark ? "text-white" : "text-foreground"
              }`}
            >
              {item.title}
            </h3>
            <p className={`editorial-body ${isDark ? "text-white/70" : "text-muted-foreground"}`}>
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
