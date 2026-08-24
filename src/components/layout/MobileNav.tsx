"use client";

import { headerNavItems } from "@/config/navigation";
import type { RouteName } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  currentRoute: RouteName;
  onNavigate: (route: RouteName, section?: string) => void;
}

export function MobileNav({ currentRoute, onNavigate }: MobileNavProps) {
  const linkItems = headerNavItems.filter((item) => (item.variant ?? "link") === "link");
  const buttonItems = headerNavItems.filter((item) => item.variant !== "link");

  return (
    <nav className="flex flex-col h-full">
      <div className="flex-1 py-2">
        {linkItems.map((item) => {
          const isActive = !item.section && currentRoute === item.route;
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.route, item.section)}
              className={cn(
                "w-full text-left px-4 py-4 text-base font-medium transition-colors min-h-12 border-b border-border/50",
                isActive ? "text-solar-green" : "text-foreground"
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {buttonItems.length > 0 && (
        <div className="p-4 border-t border-border/50 space-y-3">
          {buttonItems.map((item) => (
            <Button
              key={item.label}
              variant={item.variant === "button-secondary" ? "outline" : "default"}
              onClick={() => onNavigate(item.route, item.section)}
              className={cn(
                "w-full rounded-full h-11 text-sm font-semibold",
                item.variant === "button" && "bg-solar-dark hover:bg-solar-dark-secondary text-white"
              )}
            >
              {item.label}
            </Button>
          ))}
        </div>
      )}
    </nav>
  );
}
