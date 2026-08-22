"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { useRouter, type RouteName } from "@/lib/router";
import {
  Home,
  Info,
  LayoutGrid,
  Sun,
  PanelsTopLeft,
  Cpu,
  GlassWater,
  Leaf,
  Globe2,
  PhoneCall,
  Handshake,
  MessageCircleQuestion,
  Shield,
  FileText,
  Award,
  TrendingUp,
  Layers,
  MapPin,
  Briefcase,
  BookOpen,
  FolderOpen,
  GitCompare,
  Factory,
  type LucideIcon,
} from "lucide-react";

interface SearchEntry {
  label: string;
  hint?: string;
  route: RouteName;
  group: string;
  icon: LucideIcon;
}

const entries: SearchEntry[] = [
  // Pages
  { label: "Home", hint: "Overview", route: "home", group: "Pages", icon: Home },
  {
    label: "About Adani Solar",
    hint: "Company overview",
    route: "about",
    group: "Pages",
    icon: Info,
  },
  {
    label: "What We Do",
    hint: "Manufacturing capabilities",
    route: "about-what-we-do",
    group: "Pages",
    icon: LayoutGrid,
  },
  {
    label: "Why Solar",
    hint: "Benefits of solar energy",
    route: "why-solar",
    group: "Pages",
    icon: Sun,
  },
  {
    label: "Contact Us",
    hint: "Sales & support",
    route: "contact",
    group: "Pages",
    icon: PhoneCall,
  },
  {
    label: "Terms & Conditions",
    route: "terms",
    group: "Pages",
    icon: FileText,
  },
  {
    label: "Privacy Notice",
    route: "privacy",
    group: "Pages",
    icon: Shield,
  },
  {
    label: "Careers",
    hint: "Open positions & internship programs",
    route: "careers",
    group: "Pages",
    icon: Briefcase,
  },
  {
    label: "Solar Glossary",
    hint: "PV terminology reference — TOPCon, LCOE, bifacial & more",
    route: "glossary",
    group: "Pages",
    icon: BookOpen,
  },
  {
    label: "Resource Center",
    hint: "Datasheets, brochures, whitepapers & guides",
    route: "resources",
    group: "Pages",
    icon: FolderOpen,
  },

  // Products
  {
    label: "TOPCon Modules",
    hint: "Up to 22.5% efficiency",
    route: "product-topcon",
    group: "Products",
    icon: Sun,
  },
  {
    label: "MonoPERC Modules",
    hint: "390W – 545W range",
    route: "product-monoperc",
    group: "Products",
    icon: PanelsTopLeft,
  },
  {
    label: "Solar Cells",
    hint: "High-efficiency cells",
    route: "home",
    group: "Products",
    icon: Cpu,
  },
  {
    label: "Solar Glass",
    hint: "High-transmission tempered glass",
    route: "contact",
    group: "Products",
    icon: GlassWater,
  },
  {
    label: "Compare Products",
    hint: "TOPCon vs MonoPERC side-by-side comparison",
    route: "compare",
    group: "Products",
    icon: GitCompare,
  },

  // Capabilities & Sustainability
  {
    label: "PV Value Chain",
    hint: "Polysilicon to modules",
    route: "home",
    group: "Capabilities",
    icon: Layers,
  },
  {
    label: "Export Manufacturing",
    hint: "20+ countries served",
    route: "home",
    group: "Capabilities",
    icon: Globe2,
  },
  {
    label: "Sustainability Dashboard",
    hint: "Interactive impact metrics & ESG data",
    route: "sustainability",
    group: "Capabilities",
    icon: Leaf,
  },
  {
    label: "Manufacturing Process",
    hint: "From sand to solar — 8-step precision engineering",
    route: "manufacturing",
    group: "Capabilities",
    icon: Factory,
  },
  {
    label: "Green Initiatives",
    hint: "Carbon-neutral roadmap",
    route: "home",
    group: "Capabilities",
    icon: Leaf,
  },
  {
    label: "Plant Walkthrough",
    hint: "Mundra facility tour",
    route: "home",
    group: "Capabilities",
    icon: MapPin,
  },
  {
    label: "Sustainability",
    hint: "Solar, wind, green hydrogen, storage",
    route: "home",
    group: "Capabilities",
    icon: Award,
  },

  // Support
  {
    label: "Channel Partners",
    hint: "Distributor network",
    route: "contact",
    group: "Support",
    icon: Handshake,
  },
  {
    label: "Ask Our Expert",
    hint: "Talk to a solar expert",
    route: "contact",
    group: "Support",
    icon: MessageCircleQuestion,
  },
  {
    label: "Get a Quote",
    hint: "Request pricing",
    route: "contact",
    group: "Support",
    icon: TrendingUp,
  },
];

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const { navigate } = useRouter();
  const [query, setQuery] = useState("");

  // Clear query when modal closes
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setQuery(""), 150);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Global Cmd/Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? entries.filter(
          (e) =>
            e.label.toLowerCase().includes(q) ||
            (e.hint?.toLowerCase().includes(q) ?? false) ||
            e.group.toLowerCase().includes(q)
        )
      : entries;

    const groups: Record<string, SearchEntry[]> = {};
    filtered.forEach((e) => {
      groups[e.group] = groups[e.group] ? [...groups[e.group], e] : [e];
    });
    return groups;
  }, [query]);

  const handleSelect = (route: RouteName) => {
    navigate(route);
    onOpenChange(false);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search Adani Solar"
      description="Find pages, products and resources"
      className="sm:max-w-[600px]"
    >
      <CommandInput
        placeholder="Search products, pages, capabilities…"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {Object.entries(grouped).map(([group, items], idx) => (
          <React.Fragment key={group}>
            <CommandGroup heading={group}>
              {items.map((entry) => {
                const Icon = entry.icon;
                return (
                  <CommandItem
                    key={`${group}-${entry.label}`}
                    value={`${entry.label} ${entry.hint ?? ""} ${entry.group}`}
                    onSelect={() => handleSelect(entry.route)}
                  >
                    <Icon className="w-4 h-4 text-solar-green shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {entry.label}
                      </span>
                      {entry.hint && (
                        <span className="text-xs text-muted-foreground">
                          {entry.hint}
                        </span>
                      )}
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {idx < Object.keys(grouped).length - 1 && <CommandSeparator />}
          </React.Fragment>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
