"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { headerNavItems } from "@/config/navigation";
import type { RouteName } from "@/lib/router";
import { SheetClose } from "@/components/ui/sheet";
import { ArrowLink } from "@/components/editorial/ArrowLink";

interface MobileNavProps {
  currentRoute: RouteName;
  onNavigate: (route: RouteName, section?: string) => void;
}

export function MobileNav({ currentRoute, onNavigate }: MobileNavProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <nav className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar">
      <div className="flex-1 py-6 px-2">
        {headerNavItems.map((item) => (
          <div key={item.label} className="border-b border-border/50">
            <button
              onClick={() => {
                if (item.children) {
                  setExpandedItem(expandedItem === item.label ? null : item.label);
                } else if (item.route) {
                  onNavigate(item.route, item.section);
                }
              }}
              className={`flex items-center justify-between w-full px-4 py-4 text-base font-medium transition-colors min-h-12 ${
                currentRoute === item.route ? "text-solar-green" : "text-foreground"
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

            {item.children && expandedItem === item.label && (
              <div className="pb-2">
                {item.children.map((child) => (
                  <button
                    key={child.label}
                    onClick={() => child.route && onNavigate(child.route, child.section)}
                    className="block w-full text-left pl-8 pr-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-11"
                  >
                    {child.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        <button
          onClick={() => onNavigate("resources")}
          className="block w-full text-left px-4 py-4 text-base font-medium text-foreground min-h-12 border-b border-border/50"
        >
          Resources
        </button>
      </div>

      <div className="p-4 border-t bg-background">
        <SheetClose asChild>
          <div className="w-full">
            <ArrowLink route="contact" variant="primary" className="w-full justify-center">
              Contact Us
            </ArrowLink>
          </div>
        </SheetClose>
      </div>
    </nav>
  );
}

