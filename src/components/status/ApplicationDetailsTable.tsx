"use client";

interface Details {
  applicationNumber: string;
  documentNumber: string | null;
  applicationName: string;
  fatherOrHusbandName: string | null;
  email: string | null;
  mobile: string | null;
  pinCode: string | null;
  state: string | null;
  interestedInLabel: string;
  status: string;
  statusLabel: string;
  approvedLocation: string | null;
}

const STATUS_CELL: Record<string, string> = {
  APPROVED: "text-emerald-700",
  PENDING: "text-muted-foreground",
  UNDER_REVIEW: "text-indigo-700",
  NEEDS_INFORMATION: "text-amber-700",
  DECLINED: "text-red-700",
  CANCELLED: "text-muted-foreground",
};

function display(value: string | null | undefined) {
  return value?.trim() ? value : "—";
}

export function ApplicationDetailsTable({ data }: { data: Details }) {
  const statusClass = STATUS_CELL[data.status] ?? "text-foreground";
  const pairs = [
    ["Application No.", display(data.applicationNumber), "Document No.", display(data.documentNumber)],
    ["Application Name", display(data.applicationName), "Father / Husband Name", display(data.fatherOrHusbandName)],
    ["Email", display(data.email), "Mobile", display(data.mobile)],
    ["PIN Code", display(data.pinCode), "State", display(data.state)],
    ["Interested In", display(data.interestedInLabel), "Status", display(data.statusLabel)],
  ] as const;

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-white">
      <table className="w-full min-w-[640px] border-collapse">
        <caption className="sr-only">Application details</caption>
        <tbody>
          {pairs.map(([leftLabel, leftValue, rightLabel, rightValue]) => (
            <tr key={leftLabel} className="border-b border-border last:border-b-0">
              <th
                scope="row"
                className="w-[18%] py-3.5 pl-6 pr-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground align-top"
              >
                {leftLabel}
              </th>
              <td className="w-[32%] py-3.5 pr-6 text-sm font-medium text-foreground align-top break-words">
                {leftValue}
              </td>
              <th className="w-[18%] py-3.5 pr-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground align-top">
                {rightLabel}
              </th>
              <td
                className={`w-[32%] py-3.5 pr-6 text-sm font-medium align-top break-words ${
                  rightLabel === "Status" ? statusClass : "text-foreground"
                }`}
              >
                {rightValue}
              </td>
            </tr>
          ))}
          {data.approvedLocation ? (
            <tr>
              <th
                scope="row"
                className="py-3.5 pl-6 pr-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground align-top"
              >
                Approved Location
              </th>
              <td colSpan={3} className="py-3.5 pr-6 text-sm font-medium text-foreground whitespace-pre-line">
                {data.approvedLocation}
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
