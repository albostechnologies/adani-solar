"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageSection } from "@/components/editorial/PageSection";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Info,
  Loader2,
  XCircle,
  Copy,
} from "lucide-react";
import {
  applicantFetch,
  clearApplicantToken,
  getApplicantToken,
} from "@/lib/applicantSession";
import { ApplicationDetailsTable } from "@/components/status/ApplicationDetailsTable";
import { ProcessProgress } from "@/components/status/ProcessProgress";
import { ApprovedLocationMap } from "@/components/status/ApprovedLocationMap";
import { CompactStatusHeader } from "@/components/status/CompactStatusHeader";

interface StatusData {
  applicationNumber: string;
  documentNumber: string | null;
  applicationName: string;
  fatherOrHusbandName: string | null;
  email: string;
  mobile: string;
  pinCode: string | null;
  state: string | null;
  interestedInLabel: string;
  status: string;
  statusLabel: string;
  publicMessage: string | null;
  approvedLocation: string | null;
  paymentAmountDue: number | null;
  hasApprovalLetter: boolean;
  approvalLetterAvailable?: boolean;
  paymentAvailable?: boolean;
  currentProcessStage: string;
  payment: {
    amountDue: number | null;
    configured?: boolean;
    publicStatus: string;
    publicStatusLabel: string;
    publicMessage: string | null;
    canSubmit: boolean;
    history: {
      paymentReference: string;
      feeType: string;
      amountPaid: number;
      utrTransactionId: string;
      paymentMethod: string;
      submittedAt: string;
      status: string;
      statusLabel: string;
    }[];
  } | null;
}

const STATUS_CONFIG: Record<string, { icon: React.ReactNode; color: string }> = {
  PENDING: { icon: <Clock className="w-5 h-5" />, color: "text-gray-600 bg-gray-50 border-gray-200" },
  UNDER_REVIEW: { icon: <Info className="w-5 h-5" />, color: "text-indigo-700 bg-indigo-50 border-indigo-200" },
  NEEDS_INFORMATION: { icon: <AlertCircle className="w-5 h-5" />, color: "text-amber-700 bg-amber-50 border-amber-200" },
  APPROVED: { icon: <CheckCircle className="w-5 h-5" />, color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  DECLINED: { icon: <XCircle className="w-5 h-5" />, color: "text-red-700 bg-red-50 border-red-200" },
  CANCELLED: { icon: <XCircle className="w-5 h-5" />, color: "text-gray-600 bg-gray-50 border-gray-200" },
};

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return d;
  }
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function CopyField({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  const [copied, setCopied] = useState(false);

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
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <p className={mono ? "font-mono break-all" : "break-words"}>{value}</p>
        <button
          type="button"
          onClick={copy}
          className="text-muted-foreground hover:text-foreground flex-shrink-0 text-xs"
          aria-label={copied ? `${label} copied` : `Copy ${label}`}
        >
          {copied ? "Copied" : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}

function statusDescription(data: StatusData) {
  if (data.publicMessage) return data.publicMessage;
  if (data.status === "APPROVED") return "Your partnership application has been approved.";
  return "Track your application progress below.";
}

export function ApplicationStatusPage() {
  const router = useRouter();
  const [data, setData] = useState<StatusData | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<{
    amountDue: number | null;
    account: {
      accountName: string;
      bankName: string;
      accountNumber: string;
      ifscCode: string;
      branchName: string | null;
      upiId: string | null;
      hasUpiQr?: boolean;
      upiQrUrl?: string | null;
    } | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadingLetter, setDownloadingLetter] = useState(false);
  const [submittingPayment, setSubmittingPayment] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    amountPaid: "",
    paymentMethod: "UPI" as "UPI" | "BANK_TRANSFER",
    utrTransactionId: "",
    paymentDate: "",
  });
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [paymentMessage, setPaymentMessage] = useState("");

  const load = async (isRefresh = false) => {
    if (!getApplicantToken()) {
      router.replace("/check-status");
      return;
    }
    if (isRefresh) setLoading(true);
    setError("");
    try {
      const res = await applicantFetch<{ success: boolean; data: StatusData }>(
        "/api/v1/partners/me/status"
      );
      if (!res.ok) {
        clearApplicantToken();
        router.replace("/check-status");
        return;
      }
      setData(res.body.data);
      const approved = res.body.data.status === "APPROVED" && res.body.data.paymentAvailable !== false;
      if (approved) {
        const payRes = await applicantFetch<{ success: boolean; data: typeof paymentDetails }>(
          "/api/v1/partners/me/payment-details"
        );
        if (payRes.ok) setPaymentDetails(payRes.body.data);
      } else {
        setPaymentDetails(null);
      }
    } catch {
      setError("Unable to load application status.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!getApplicantToken()) {
        router.replace("/check-status");
        return;
      }
      try {
        const res = await applicantFetch<{ success: boolean; data: StatusData }>(
          "/api/v1/partners/me/status"
        );
        if (cancelled) return;
        if (!res.ok) {
          clearApplicantToken();
          router.replace("/check-status");
          return;
        }
        setData(res.body.data);
        const approved = res.body.data.status === "APPROVED" && res.body.data.paymentAvailable !== false;
        if (approved) {
          const payRes = await applicantFetch<{ success: boolean; data: typeof paymentDetails }>(
            "/api/v1/partners/me/payment-details"
          );
          if (!cancelled && payRes.ok) setPaymentDetails(payRes.body.data);
        }
      } catch {
        if (!cancelled) setError("Unable to load application status.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const handleDownloadLetter = async () => {
    setDownloadingLetter(true);
    try {
      const res = await applicantFetch<{ success: boolean; data: { url: string } }>(
        "/api/v1/partners/me/approval-letter"
      );
      if (res.ok && res.body.data?.url) {
        window.open(res.body.data.url, "_blank", "noopener,noreferrer");
      }
    } finally {
      setDownloadingLetter(false);
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentProof) {
      setPaymentMessage("Please upload payment proof.");
      return;
    }
    setSubmittingPayment(true);
    setPaymentMessage("");
    try {
      const form = new FormData();
      form.append("amountPaid", paymentForm.amountPaid);
      form.append("paymentMethod", paymentForm.paymentMethod);
      form.append("utrTransactionId", paymentForm.utrTransactionId);
      form.append("paymentDate", paymentForm.paymentDate);
      form.append("paymentProof", paymentProof);

      const res = await applicantFetch<{ success: boolean; data: { message: string } }>(
        "/api/v1/partners/me/payments",
        { method: "POST", body: form }
      );
      if (res.ok) {
        setPaymentMessage(res.body.data?.message ?? "Payment proof submitted successfully.");
        setPaymentForm({ amountPaid: "", paymentMethod: "UPI", utrTransactionId: "", paymentDate: "" });
        setPaymentProof(null);
        await load(true);
      } else {
        setPaymentMessage(
          (res.body as { error?: { message?: string } })?.error?.message ??
            "Unable to submit payment."
        );
      }
    } catch {
      setPaymentMessage("Unable to submit payment.");
    } finally {
      setSubmittingPayment(false);
    }
  };

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-solar-green" />
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="py-20 text-center">
        <p className="text-destructive mb-4">{error || "Application not found."}</p>
        <Button onClick={() => router.push("/check-status")}>Back to Check Status</Button>
      </main>
    );
  }

  const statusConfig = STATUS_CONFIG[data.status] ?? STATUS_CONFIG.PENDING;
  const isApproved = data.status === "APPROVED";
  const showPayment = isApproved && data.paymentAvailable !== false;
  const hasAccount = Boolean(paymentDetails?.account);
  const hasAmount = Boolean(data.paymentAmountDue);
  const paymentConfigured = hasAccount || hasAmount;
  const menuItems = [
    { id: "application-details", label: "Application Details" },
    ...(isApproved ? [{ id: "approval-letter", label: "Approval Letter" }] : []),
    { id: "application-progress", label: "Application Progress" },
    ...(data.approvedLocation ? [{ id: "approved-location", label: "Approved Location" }] : []),
    ...(showPayment ? [{ id: "payment", label: "Payment Details" }] : []),
    ...(showPayment && (data.payment?.history.length ?? 0) > 0
      ? [{ id: "payment-history", label: "Payment History" }]
      : []),
  ];

  return (
    <main>
      <CompactStatusHeader
        applicationNumber={data.applicationNumber}
        statusLabel={data.statusLabel}
        statusClassName={statusConfig.color}
        statusIcon={statusConfig.icon}
        description={statusDescription(data)}
        menuItems={menuItems}
        showPaymentShortcut={showPayment}
        onSignOut={() => {
          clearApplicantToken();
          router.push("/check-status");
        }}
      />

      <PageSection>
        <div className="max-w-4xl mx-auto space-y-10">
          <section id="application-details" className="scroll-mt-28">
            <SectionEyebrow label="Application details" className="mb-4" />
            <ApplicationDetailsTable data={data} />
          </section>

          {isApproved && (
            <section id="approval-letter" className="scroll-mt-28 rounded-2xl border border-border p-6 md:p-8">
              <SectionEyebrow label="Approval letter" className="mb-4" />
              {data.hasApprovalLetter || data.approvalLetterAvailable ? (
                <>
                  <p className="text-sm text-muted-foreground mb-4">Your approval letter is ready.</p>
                  <Button
                    onClick={handleDownloadLetter}
                    disabled={downloadingLetter}
                    className="rounded-full w-full sm:w-auto bg-solar-green hover:bg-solar-green-dark text-white"
                  >
                    {downloadingLetter ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4 mr-2" />
                    )}
                    Download Approval Letter
                  </Button>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Approval letter is being prepared. Please check again later.
                </p>
              )}
            </section>
          )}

          <section id="application-progress" className="scroll-mt-28 rounded-2xl border border-border p-6 md:p-8">
            <SectionEyebrow label="Application progress" className="mb-6" />
            <ProcessProgress currentStage={data.currentProcessStage} />
          </section>

          {data.approvedLocation && (
            <section id="approved-location" className="scroll-mt-28 rounded-2xl border border-border p-6 md:p-8">
              <SectionEyebrow label="Approved location" className="mb-4" />
              <ApprovedLocationMap address={data.approvedLocation} />
            </section>
          )}

          {showPayment && data.payment && (
            <section id="payment" className="scroll-mt-28 rounded-2xl border border-border p-6 md:p-8 space-y-6">
              <SectionEyebrow label="Payment details" className="mb-2" />
              <h2 className="font-[family-name:var(--font-poppins)] text-xl font-semibold tracking-tight">
                Partnership payment
              </h2>

              {!paymentConfigured ? (
                <p className="text-sm text-muted-foreground">
                  Payment details are being prepared. Please check again later.
                </p>
              ) : (
                <>
                  {hasAmount ? (
                    <p className="text-lg font-semibold">
                      Amount Payable: {formatCurrency(data.paymentAmountDue!)}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Payment amount will be provided by our team.
                    </p>
                  )}

                  {data.payment.publicStatus !== "NOT_SUBMITTED" && (
                    <div className="rounded-xl border border-border bg-[#f7f7f5] p-4 text-sm">
                      <p className="font-semibold">{data.payment.publicStatusLabel}</p>
                      {data.payment.publicMessage && (
                        <p className="text-muted-foreground mt-1">{data.payment.publicMessage}</p>
                      )}
                    </div>
                  )}

                  {paymentDetails?.account && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                      <div className="space-y-3">
                        <p className="font-semibold text-foreground">Bank Transfer</p>
                        <CopyField label="Account Holder Name" value={paymentDetails.account.accountName} />
                        <CopyField label="Bank Name" value={paymentDetails.account.bankName} />
                        <CopyField label="Account Number" value={paymentDetails.account.accountNumber} mono />
                        <CopyField label="IFSC Code" value={paymentDetails.account.ifscCode} mono />
                        {paymentDetails.account.branchName && (
                          <CopyField label="Branch" value={paymentDetails.account.branchName} />
                        )}
                      </div>
                      {(paymentDetails.account.upiId || paymentDetails.account.upiQrUrl) && (
                        <div className="space-y-3">
                          <p className="font-semibold text-foreground">UPI</p>
                          {paymentDetails.account.upiId && (
                            <CopyField label="UPI ID" value={paymentDetails.account.upiId} />
                          )}
                          {paymentDetails.account.upiQrUrl && (
                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">UPI QR</p>
                              <img
                                src={paymentDetails.account.upiQrUrl}
                                alt="UPI QR code for payment"
                                className="w-44 h-44 object-contain border border-border rounded-lg bg-white p-2"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {data.payment.canSubmit && (
                    <form onSubmit={handlePaymentSubmit} className="space-y-4 pt-4 border-t border-border">
                      <p className="font-medium text-sm">Submit Payment Details</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="amountPaid">Payment Amount</Label>
                          <Input
                            id="amountPaid"
                            type="number"
                            required
                            value={paymentForm.amountPaid}
                            onChange={(e) =>
                              setPaymentForm((f) => ({ ...f, amountPaid: e.target.value }))
                            }
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="paymentMethod">Payment Method</Label>
                          <select
                            id="paymentMethod"
                            value={paymentForm.paymentMethod}
                            onChange={(e) =>
                              setPaymentForm((f) => ({
                                ...f,
                                paymentMethod: e.target.value as "UPI" | "BANK_TRANSFER",
                              }))
                            }
                            className="w-full h-11 rounded-lg border border-border bg-white px-3 text-sm"
                          >
                            <option value="UPI">UPI</option>
                            <option value="BANK_TRANSFER">Bank Transfer</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="utr">Transaction ID / UTR</Label>
                          <Input
                            id="utr"
                            required
                            value={paymentForm.utrTransactionId}
                            onChange={(e) =>
                              setPaymentForm((f) => ({ ...f, utrTransactionId: e.target.value }))
                            }
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="paymentDate">Payment Date</Label>
                          <Input
                            id="paymentDate"
                            type="date"
                            required
                            value={paymentForm.paymentDate}
                            onChange={(e) =>
                              setPaymentForm((f) => ({ ...f, paymentDate: e.target.value }))
                            }
                            className="h-11"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="proof">Upload Payment Proof (PDF, JPG, PNG — max 5 MB)</Label>
                        <Input
                          id="proof"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => setPaymentProof(e.target.files?.[0] ?? null)}
                          className="h-11"
                        />
                      </div>
                      {paymentMessage && (
                        <p className="text-sm text-muted-foreground">{paymentMessage}</p>
                      )}
                      <Button
                        type="submit"
                        disabled={submittingPayment}
                        className="rounded-full w-full sm:w-auto bg-solar-green hover:bg-solar-green-dark text-white"
                      >
                        {submittingPayment ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : null}
                        Submit Payment Proof
                      </Button>
                    </form>
                  )}
                </>
              )}

              {data.payment.history.length > 0 && (
                <div id="payment-history" className="scroll-mt-28 pt-6 border-t border-border">
                  <p className="font-semibold text-sm mb-4">Payment History</p>
                  <div className="space-y-3 md:hidden">
                    {data.payment.history.map((p) => (
                      <div key={p.paymentReference} className="rounded-lg border border-border p-4 text-sm">
                        <p className="font-mono text-xs text-muted-foreground">{p.paymentReference}</p>
                        <p className="font-medium mt-1">{formatCurrency(p.amountPaid)}</p>
                        <p className="text-muted-foreground">{p.utrTransactionId}</p>
                        <p className="text-muted-foreground">{formatDate(p.submittedAt)}</p>
                        <p className="mt-1 font-medium">{p.statusLabel}</p>
                      </div>
                    ))}
                  </div>
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-muted-foreground border-b border-border">
                          <th className="pb-2 pr-4">Reference</th>
                          <th className="pb-2 pr-4">Amount</th>
                          <th className="pb-2 pr-4">UTR</th>
                          <th className="pb-2 pr-4">Method</th>
                          <th className="pb-2 pr-4">Submitted</th>
                          <th className="pb-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.payment.history.map((p) => (
                          <tr key={p.paymentReference} className="border-b border-border/50">
                            <td className="py-3 pr-4 font-mono text-xs">{p.paymentReference}</td>
                            <td className="py-3 pr-4">{formatCurrency(p.amountPaid)}</td>
                            <td className="py-3 pr-4">{p.utrTransactionId}</td>
                            <td className="py-3 pr-4">{p.paymentMethod}</td>
                            <td className="py-3 pr-4">{formatDate(p.submittedAt)}</td>
                            <td className="py-3">{p.statusLabel}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </PageSection>
    </main>
  );
}
