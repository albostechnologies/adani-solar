"use client";

import { useEffect, useState } from "react";
import { partnershipContent } from "@/content/partnership";
import { cn } from "@/lib/utils";

export function PartnershipAnchorNav() {
  const items = partnershipContent.anchorNav;
  const [active, setActive] = useState<string>(items[0]?.href ?? "");

  useEffect(() => {
    const ids = items.map((item) => item.href.replace("#", ""));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.1, 0.35, 0.6] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Business opportunity sections"
      className="sticky top-16 sm:top-[4.75rem] z-30 border-b border-border/50 bg-white/95 backdrop-blur-xl"
    >
      <div className="editorial-section-inner !py-0">
        <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <p className="shrink-0 pr-3 mr-1 border-r border-border/60 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Business Opportunity
          </p>
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors min-h-11 inline-flex items-center",
                active === item.href
                  ? "bg-solar-dark text-white"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
