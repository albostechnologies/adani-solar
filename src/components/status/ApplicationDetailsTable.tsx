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

function Field({
  label,
  value,
  valueClassName,
  className,
}: {
  label: string;
  value: string;
  valueClassName?: string;
  className?: string;
}) {
  return (
    <div className={`px-4 py-3.5 sm:px-6 sm:py-4 ${className ?? ""}`}>
      <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">
        {label}
      </p>
      <p className={`text-xs sm:text-sm font-medium break-words ${valueClassName ?? "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}

export function ApplicationDetailsTable({ data }: { data: Details }) {
  const statusClass = STATUS_CELL[data.status] ?? "text-foreground";
  const pairs: Array<[string, string, string, string, string?]> = [
    ["Application No.", display(data.applicationNumber), "Document No.", display(data.documentNumber)],
    [
      "Application Name",
      display(data.applicationName),
      "Father / Husband Name",
      display(data.fatherOrHusbandName),
    ],
    ["Email", display(data.email), "Mobile", display(data.mobile)],
    ["PIN Code", display(data.pinCode), "State", display(data.state)],
    [
      "Interested In",
      display(data.interestedInLabel),
      "Status",
      display(data.statusLabel),
      statusClass,
    ],
  ];

  return (
    <div className="rounded-2xl border border-border bg-white overflow-hidden">
      {pairs.map(([leftLabel, leftValue, rightLabel, rightValue, rightValueClass], index) => (
        <div
          key={leftLabel}
          className={`grid grid-cols-2 ${index < pairs.length - 1 || data.approvedLocation ? "border-b border-border" : ""}`}
        >
          <Field label={leftLabel} value={leftValue} className="border-r border-border" />
          <Field label={rightLabel} value={rightValue} valueClassName={rightValueClass} />
        </div>
      ))}
      {data.approvedLocation ? (
        <Field label="Approved Location" value={data.approvedLocation} />
      ) : null}
    </div>
  );
}
