import { ArrowLink } from "@/components/editorial/ArrowLink";
import type { RouteName } from "@/lib/routes";

interface ResourceRowProps {
  title: string;
  subtitle?: string;
  meta: string;
  linkLabel?: string;
  route?: RouteName;
  href?: string;
}

export function ResourceRow({
  title,
  subtitle,
  meta,
  linkLabel = "View in Resource Center",
  route = "resources",
  href,
}: ResourceRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-5 sm:py-6 editorial-divider border-t first:border-t-0">
      <div className="min-w-0">
        <p className="font-[family-name:var(--font-poppins)] text-lg sm:text-xl font-semibold text-foreground">
          {title}
        </p>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{subtitle}</p>
        )}
        <p className="text-xs sm:text-sm text-muted-foreground mt-2">{meta}</p>
      </div>
      <ArrowLink route={href ? undefined : route} href={href} variant="inline" className="shrink-0">
        {linkLabel}
      </ArrowLink>
    </div>
  );
}
