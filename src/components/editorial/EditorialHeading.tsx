import { cn } from "@/lib/utils";

interface EditorialHeadingProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: "hero" | "section" | "statement";
  variant?: "light" | "dark";
  className?: string;
}

export function EditorialHeading({
  children,
  as: Tag = "h2",
  size = "section",
  variant = "light",
  className,
}: EditorialHeadingProps) {
  const isDark = variant === "dark";

  return (
    <Tag
      className={cn(
        "font-[family-name:var(--font-poppins)] font-semibold tracking-tight leading-[1.05]",
        size === "hero" && "editorial-hero-title",
        size === "section" && "editorial-section-title",
        size === "statement" && "editorial-statement",
        isDark ? "text-white" : "text-foreground",
        className
      )}
    >
      {children}
    </Tag>
  );
}
