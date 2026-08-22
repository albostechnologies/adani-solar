"use client";

import { useRouter, type RouteName } from "@/lib/router";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  route?: RouteName;
  section?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: "light" | "dark";
  className?: string;
}

export function Breadcrumbs({ items, variant = "dark", className }: BreadcrumbsProps) {
  const { navigate } = useRouter();
  const isDark = variant === "dark";

  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6", className)}>
      <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && (
                <span className={isDark ? "text-white/30" : "text-muted-foreground/50"} aria-hidden="true">
                  /
                </span>
              )}
              {isLast || !item.route ? (
                <span
                  className={isDark ? "text-white/60" : "text-muted-foreground"}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate(item.route!, item.section)}
                  className={cn(
                    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar-green rounded-sm",
                    isDark ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
