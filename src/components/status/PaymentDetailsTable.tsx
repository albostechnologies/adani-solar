"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

export interface PaymentAccountFields {
  accountName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branchName?: string | null;
  upiId?: string | null;
  upiQrUrl?: string | null;
}

function display(value: string | null | undefined) {
  return value?.trim() ? value : "—";
}

function CopyButton({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  if (!value.trim() || value === "—") return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="ml-2 inline-flex items-center text-muted-foreground hover:text-foreground text-xs shrink-0 align-middle"
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
    >
      {copied ? "Copied" : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

function ValueCell({
  label,
  value,
  mono,
  copyable,
}: {
  label: string;
  value: string;
  mono?: boolean;
  copyable?: boolean;
}) {
  return (
    <span className={`inline-flex items-start gap-1 ${mono ? "font-mono" : ""} break-all`}>
      <span>{value}</span>
      {copyable ? <CopyButton label={label} value={value} /> : null}
    </span>
  );
}

function StackedField({
  label,
  value,
  mono,
  copyable,
}: {
  label: string;
  value: string;
  mono?: boolean;
  copyable?: boolean;
}) {
  return (
    <div className="py-4 border-b border-border last:border-b-0">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">{label}</dt>
      <dd className="text-sm font-medium text-foreground">
        <ValueCell label={label} value={value} mono={mono} copyable={copyable} />
      </dd>
    </div>
  );
}

export function PaymentDetailsTable({
  account,
  amountPayable,
  paymentStatusLabel,
}: {
  account: PaymentAccountFields | null;
  amountPayable?: string | null;
  paymentStatusLabel?: string | null;
}) {
  const rows: {
    leftLabel: string;
    leftValue: string;
    leftMono?: boolean;
    leftCopy?: boolean;
    rightLabel: string;
    rightValue: string;
    rightMono?: boolean;
    rightCopy?: boolean;
  }[] = [
    {
      leftLabel: "Account Holder Name",
      leftValue: display(account?.accountName),
      leftCopy: Boolean(account?.accountName),
      rightLabel: "Bank Name",
      rightValue: display(account?.bankName),
      rightCopy: Boolean(account?.bankName),
    },
    {
      leftLabel: "Account Number",
      leftValue: display(account?.accountNumber),
      leftMono: true,
      leftCopy: Boolean(account?.accountNumber),
      rightLabel: "IFSC Code",
      rightValue: display(account?.ifscCode),
      rightMono: true,
      rightCopy: Boolean(account?.ifscCode),
    },
    {
      leftLabel: "Branch",
      leftValue: display(account?.branchName),
      leftCopy: Boolean(account?.branchName),
      rightLabel: "UPI ID",
      rightValue: display(account?.upiId),
      rightCopy: Boolean(account?.upiId),
    },
  ];

  if (amountPayable || paymentStatusLabel) {
    rows.push({
      leftLabel: "Amount Payable",
      leftValue: display(amountPayable),
      rightLabel: "Payment Status",
      rightValue: display(paymentStatusLabel),
    });
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-border bg-white">
        <table className="hidden md:table w-full border-collapse">
          <caption className="sr-only">Payment account details</caption>
          <tbody>
            {rows.map((row) => (
              <tr key={row.leftLabel} className="border-b border-border last:border-b-0">
                <th
                  scope="row"
                  className="w-[18%] py-3.5 pl-6 pr-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground align-top"
                >
                  {row.leftLabel}
                </th>
                <td className="w-[32%] py-3.5 pr-6 text-sm font-medium text-foreground align-top">
                  <ValueCell
                    label={row.leftLabel}
                    value={row.leftValue}
                    mono={row.leftMono}
                    copyable={row.leftCopy}
                  />
                </td>
                <th className="w-[18%] py-3.5 pr-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground align-top">
                  {row.rightLabel}
                </th>
                <td className="w-[32%] py-3.5 pr-6 text-sm font-medium text-foreground align-top">
                  <ValueCell
                    label={row.rightLabel}
                    value={row.rightValue}
                    mono={row.rightMono}
                    copyable={row.rightCopy}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <dl className="md:hidden px-5">
          {rows.map((row) => (
            <div key={row.leftLabel}>
              <StackedField
                label={row.leftLabel}
                value={row.leftValue}
                mono={row.leftMono}
                copyable={row.leftCopy}
              />
              <StackedField
                label={row.rightLabel}
                value={row.rightValue}
                mono={row.rightMono}
                copyable={row.rightCopy}
              />
            </div>
          ))}
        </dl>
      </div>

      {account?.upiQrUrl ? (
        <div className="rounded-2xl border border-border bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">UPI QR</p>
          <img
            src={account.upiQrUrl}
            alt="UPI QR code for payment"
            className="w-44 h-44 object-contain border border-border rounded-lg bg-white p-2"
          />
        </div>
      ) : null}
    </div>
  );
}
