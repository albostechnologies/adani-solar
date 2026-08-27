"use client";

import { cn } from "@/lib/utils";

type PanelRow = {
  power: string;
  technology: string;
  dealer: string;
  distributor: string;
};

type SystemRow = {
  capacity: string;
  dealer: string;
  distributor: string;
};

interface PricingTableProps {
  variant: "panel" | "system";
  caption: string;
  rows: readonly PanelRow[] | readonly SystemRow[];
  className?: string;
}

function isPanelRow(row: PanelRow | SystemRow): row is PanelRow {
  return "power" in row;
}

export function PricingTable({ variant, caption, rows, className }: PricingTableProps) {
  const firstLabel = variant === "panel" ? "Power" : "Capacity";
  const secondLabel = variant === "panel" ? "Technology" : null;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-border/70">
              <th
                scope="col"
                className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
              >
                {firstLabel}
              </th>
              {secondLabel && (
                <th
                  scope="col"
                  className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                >
                  {secondLabel}
                </th>
              )}
              <th
                scope="col"
                className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground bg-muted/40"
              >
                Dealer Price
              </th>
              <th
                scope="col"
                className="py-3 pl-4 text-right text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground bg-solar-green/[0.06]"
              >
                Distributor Price
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const key = isPanelRow(row) ? `${row.power}-${row.technology}` : row.capacity;
              return (
                <tr
                  key={key}
                  className="border-b border-border/40 hover:bg-solar-green/[0.03] transition-colors"
                >
                  <th scope="row" className="py-4 pr-4 text-left font-semibold text-foreground">
                    {isPanelRow(row) ? row.power : row.capacity}
                  </th>
                  {isPanelRow(row) && (
                    <td className="py-4 px-4 text-muted-foreground">{row.technology}</td>
                  )}
                  <td className="py-4 px-4 text-right font-semibold tabular-nums text-foreground bg-muted/20">
                    {row.dealer}
                  </td>
                  <td className="py-4 pl-4 text-right font-semibold tabular-nums text-foreground bg-solar-green/[0.04]">
                    {row.distributor}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-border/50">
        {rows.map((row) => {
          const key = isPanelRow(row) ? `${row.power}-${row.technology}` : row.capacity;
          return (
            <div key={key} className="py-4">
              <p className="font-semibold text-foreground">
                {isPanelRow(row) ? row.power : row.capacity}
              </p>
              {isPanelRow(row) && (
                <p className="text-sm text-muted-foreground mt-0.5">{row.technology}</p>
              )}
              <dl className="mt-3 grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-baseline justify-between gap-4 rounded-lg bg-muted/40 px-3 py-2.5">
                  <dt className="text-muted-foreground">Dealer</dt>
                  <dd className="font-semibold tabular-nums text-foreground">{row.dealer}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 rounded-lg bg-solar-green/[0.06] px-3 py-2.5">
                  <dt className="text-muted-foreground">Distributor</dt>
                  <dd className="font-semibold tabular-nums text-foreground">{row.distributor}</dd>
                </div>
              </dl>
            </div>
          );
        })}
      </div>
    </div>
  );
}
