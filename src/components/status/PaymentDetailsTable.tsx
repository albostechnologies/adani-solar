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
      className="ml-1.5 inline-flex items-center text-muted-foreground hover:text-foreground text-xs shrink-0 align-middle"
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
    >
      {copied ? "Copied" : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

function Field({
  label,
  value,
  mono,
  copyable,
  className,
}: {
  label: string;
  value: string;
  mono?: boolean;
  copyable?: boolean;
  className?: string;
}) {
  return (
    <div className={`px-4 py-3.5 sm:px-6 sm:py-4 ${className ?? ""}`}>
      <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">
        {label}
      </p>
      <p className={`text-xs sm:text-sm font-medium text-foreground break-all ${mono ? "font-mono" : ""}`}>
        <span>{value}</span>
        {copyable ? <CopyButton label={label} value={value} /> : null}
      </p>
    </div>
  );
}

export function PaymentDetailsTable({
  account,
  amountPayable,
  totalDue,
  amountPaid,
  remainingAmount,
  paymentStatusLabel,
}: {
  account: PaymentAccountFields | null;
  amountPayable?: string | null;
  totalDue?: string | null;
  amountPaid?: string | null;
  remainingAmount?: string | null;
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

  const showBalance = Boolean(totalDue || amountPaid || remainingAmount || amountPayable || paymentStatusLabel);
  if (showBalance) {
    rows.push({
      leftLabel: "Total Amount Due",
      leftValue: display(totalDue ?? amountPayable),
      rightLabel: "Payment Status",
      rightValue: display(paymentStatusLabel),
    });
    if (amountPaid || remainingAmount) {
      rows.push({
        leftLabel: "Amount Verified",
        leftValue: display(amountPaid),
        rightLabel: "Remaining Balance",
        rightValue: display(remainingAmount),
      });
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-white overflow-hidden">
        {rows.map((row, index) => (
          <div
            key={`${row.leftLabel}-${row.rightLabel}`}
            className={`grid grid-cols-2 ${index < rows.length - 1 ? "border-b border-border" : ""}`}
          >
            <Field
              label={row.leftLabel}
              value={row.leftValue}
              mono={row.leftMono}
              copyable={row.leftCopy}
              className="border-r border-border"
            />
            <Field
              label={row.rightLabel}
              value={row.rightValue}
              mono={row.rightMono}
              copyable={row.rightCopy}
            />
          </div>
        ))}
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

