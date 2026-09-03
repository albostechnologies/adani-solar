"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

export interface StatusMenuItem {
  id: string;
  label: string;
}

export function CompactStatusHeader({
  applicationNumber,
  statusLabel,
  statusClassName,
  statusIcon,
  description,
  menuItems,
  onSignOut,
  showPaymentShortcut,
}: {
  applicationNumber: string;
  statusLabel: string;
  statusClassName: string;
  statusIcon: React.ReactNode;
  description: string;
  menuItems: StatusMenuItem[];
  onSignOut: () => void;
  showPaymentShortcut?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const jumpTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="border-b border-border bg-[#f7f7f5] pt-24 sm:pt-28 pb-6">
      <div className="editorial-section-inner">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Application Status</p>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="font-mono text-lg sm:text-xl font-semibold text-foreground tracking-wide truncate">
                {applicationNumber}
              </h1>
              <div
                className={`mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-semibold ${statusClassName}`}
              >
                {statusIcon}
                {statusLabel}
              </div>
              <p className="mt-3 text-sm text-muted-foreground max-w-xl">{description}</p>
            </div>

            <div className="relative flex items-center gap-2 shrink-0 flex-wrap justify-end" ref={panelRef}>
              {showPaymentShortcut && (
                <button
                  type="button"
                  onClick={() => jumpTo("payment")}
                  className="h-10 px-3 rounded-lg border border-border bg-white text-sm text-foreground hover:bg-[#f7f7f5]"
                >
                  Payment
                </button>
              )}
              <button
                type="button"
                onClick={onSignOut}
                className="h-10 px-3 rounded-lg border border-border bg-white text-sm text-muted-foreground hover:text-foreground"
              >
                Sign out
              </button>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-white text-foreground hover:bg-[#f7f7f5]"
                aria-expanded={open}
                aria-controls={menuId}
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>

              {open && (
                <nav
                  id={menuId}
                  aria-label="Application sections"
                  className="absolute right-0 top-full mt-1 z-20 w-64 rounded-xl border border-border bg-white py-2 shadow-sm"
                >
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => jumpTo(item.id)}
                      className="block w-full px-4 py-2.5 text-left text-sm text-foreground hover:bg-[#f7f7f5]"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
