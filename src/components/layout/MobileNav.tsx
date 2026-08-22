"use client";

import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { headerNavItems } from "@/config/navigation";
import type { RouteName } from "@/lib/router";
import { SheetClose } from "@/components/ui/sheet";

interface MobileNavProps {
  currentRoute: RouteName;
  onNavigate: (route: RouteName, section?: string) => void;
}

export function MobileNav({ currentRoute, onNavigate }: MobileNavProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <nav className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar">
      <div className="flex-1 py-4">
        {headerNavItems.map((item) => (
          <div key={item.label}>
            <button
              onClick={() => {
                if (item.children) {
                  setExpandedItem(
                    expandedItem === item.label ? null : item.label
                  );
                } else if (item.route) {
                  onNavigate(item.route, item.section);
                }
              }}
              className={`flex items-center justify-between w-full px-5 py-3 text-sm font-medium transition-colors min-h-11 ${
                currentRoute === item.route
                  ? "text-solar-green bg-solar-green/10"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <span>{item.label}</span>
              {item.children && (
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expandedItem === item.label ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {/* Children */}
            {item.children && expandedItem === item.label && (
              <div className="bg-muted/50">
                {item.children.map((child) => (
                  <button
                    key={child.label}
                    onClick={() =>
                      child.route && onNavigate(child.route, child.section)
                    }
                    className="block w-full text-left pl-9 pr-5 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-h-11"
                  >
                    {child.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact CTA at bottom */}
      <div className="p-4 border-t">
        <SheetClose asChild>
          <button
            onClick={() => onNavigate("contact")}
            className="w-full bg-solar-green hover:bg-solar-green-dark text-white rounded-lg py-3 text-sm font-semibold transition-colors"
          >
            Contact Us
          </button>
        </SheetClose>
      </div>
    </nav>
  );
}
