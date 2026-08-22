import { cn } from "@/lib/utils";

interface PageSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "white" | "muted" | "dark";
}

const toneClasses = {
  white: "bg-white",
  muted: "bg-[#f7f7f5]",
  dark: "bg-solar-dark text-white",
};

export function PageSection({ children, className, id, tone = "white" }: PageSectionProps) {
  return (
    <section id={id} className={cn("editorial-section", toneClasses[tone], className)}>
      <div className="editorial-section-inner">{children}</div>
    </section>
  );
}
