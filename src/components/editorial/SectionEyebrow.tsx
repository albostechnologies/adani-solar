import { cn } from "@/lib/utils";

interface SectionEyebrowProps {
  number?: string;
  label: string;
  variant?: "light" | "dark";
  className?: string;
}

export function SectionEyebrow({
  number,
  label,
  variant = "light",
  className,
}: SectionEyebrowProps) {
  const isDark = variant === "dark";

  return (
    <p
      className={cn(
        "editorial-eyebrow flex items-center gap-3 uppercase tracking-[0.2em] text-xs sm:text-sm font-medium",
        isDark ? "text-white/50" : "text-muted-foreground",
        className
      )}
    >
      {number ? (
        <>
          <span className={isDark ? "text-solar-green-light" : "text-solar-green"}>
            {number}
          </span>
          <span className="h-px w-8 bg-current opacity-30" aria-hidden="true" />
        </>
      ) : null}
      <span>{label}</span>
    </p>
  );
}
