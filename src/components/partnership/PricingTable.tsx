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

type TurnkeyRow = {
  power: string;
  technology: string;
  price: string;
};

interface DualPriceTableProps {
  variant: "panel" | "system";
  caption: string;
  rows: readonly PanelRow[] | readonly SystemRow[];
  className?: string;
}

interface TurnkeyTableProps {
  variant: "turnkey";
  caption: string;
  rows: readonly TurnkeyRow[];
  className?: string;
}

type PricingTableProps = DualPriceTableProps | TurnkeyTableProps;

function isPanelRow(row: PanelRow | SystemRow): row is PanelRow {
  return "power" in row;
}

export function PricingTable(props: PricingTableProps) {
  const { caption, className } = props;

  if (props.variant === "turnkey") {
    return (
      <div className={cn("space-y-4", className)}>
        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <caption className="sr-only">{caption}</caption>
            <thead>
              <tr className="border-b border-border/70">
                <th scope="col" className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Power
                </th>
                <th scope="col" className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Technology
                </th>
                <th scope="col" className="py-3 pl-4 text-right text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Turnkey Price
                </th>
              </tr>
            </thead>
            <tbody>
              {props.rows.map((row) => (
                <tr key={`${row.power}-${row.technology}`} className="border-b border-border/40 hover:bg-solar-green/[0.03] transition-colors">
                  <th scope="row" className="py-4 pr-4 text-left font-semibold text-foreground">
                    {row.power}
                  </th>
                  <td className="py-4 px-4 text-muted-foreground">{row.technology}</td>
                  <td className="py-4 pl-4 text-right font-semibold tabular-nums text-foreground">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked */}
        <div className="md:hidden divide-y divide-border/50">
          {props.rows.map((row) => (
            <div key={`${row.power}-${row.technology}`} className="py-4">
              <p className="font-semibold text-foreground">{row.power}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{row.technology}</p>
              <p className="mt-3 text-sm">
                <span className="text-muted-foreground">Turnkey</span>
                <span className="ml-3 font-semibold tabular-nums text-foreground">{row.price}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const firstLabel = props.variant === "panel" ? "Power" : "Capacity";
  const secondLabel = props.variant === "panel" ? "Technology" : null;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-border/70">
              <th scope="col" className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {firstLabel}
              </th>
              {secondLabel && (
                <th scope="col" className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {secondLabel}
                </th>
              )}
              <th scope="col" className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground bg-muted/40">
                Dealer Price
              </th>
              <th scope="col" className="py-3 pl-4 text-right text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground bg-solar-green/[0.06]">
                Distributor Price
              </th>
            </tr>
          </thead>
          <tbody>
            {props.rows.map((row) => {
              const key = isPanelRow(row) ? `${row.power}-${row.technology}` : row.capacity;
              return (
                <tr key={key} className="border-b border-border/40 hover:bg-solar-green/[0.03] transition-colors">
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
        {props.rows.map((row) => {
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
