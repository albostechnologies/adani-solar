"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageHero } from "@/components/editorial/PageHero";
import { PageSection } from "@/components/editorial/PageSection";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";
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
  processStages: { key: string; label: string; completed: boolean; current: boolean }[];
  payment: {
    amountDue: number | null;
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

function DetailItem({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
      <p className="text-sm text-foreground font-medium">{value}</p>
    </div>
  );
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

  const load = async () => {
    if (!getApplicantToken()) {
      router.replace("/check-status");
      return;
    }
    setLoading(true);
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
      if (res.body.data.status === "APPROVED") {
        const payRes = await applicantFetch<{ success: boolean; data: typeof paymentDetails }>(
          "/api/v1/partners/me/payment-details"
        );
        if (payRes.ok) setPaymentDetails(payRes.body.data);
      }
    } catch {
      setError("Unable to load application status.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
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
        await load();
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

  return (
    <main>
      <PageHero
        eyebrow="Application Status"
        title={data.applicationNumber}
        subtitle={
          data.status === "APPROVED"
            ? "Your partnership request has been approved."
            : data.publicMessage ?? "Track your application progress below."
        }
        breadcrumbs={[
          { label: "Home", route: "home" },
          { label: "Application Status" },
        ]}
      />

      <PageSection>
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="flex flex-wrap items-center gap-3">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${statusConfig.color}`}
            >
              {statusConfig.icon}
              {data.statusLabel}
            </div>
            <button
              type="button"
              onClick={() => {
                clearApplicantToken();
                router.push("/check-status");
              }}
              className="text-sm text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
            >
              Sign out
            </button>
          </div>

          {/* Application Details */}
          <section className="rounded-2xl border border-border bg-[#f7f7f5] p-6 md:p-8">
            <SectionEyebrow label="Application details" className="mb-4" />
            <EditorialHeading size="subsection" className="mb-6">
              Your application information
            </EditorialHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <DetailItem label="Application No." value={data.applicationNumber} />
              <DetailItem label="Document No." value={data.documentNumber} />
              <DetailItem label="Application Name" value={data.applicationName} />
              <DetailItem label="Father / Husband Name" value={data.fatherOrHusbandName} />
              <DetailItem label="Email" value={data.email} />
              <DetailItem label="Mobile" value={data.mobile} />
              <DetailItem label="PIN Code" value={data.pinCode} />
              <DetailItem label="State" value={data.state} />
              <DetailItem label="Interested In" value={data.interestedInLabel} />
              <DetailItem label="Status" value={data.statusLabel} />
            </div>
          </section>

          {data.approvedLocation && (
            <section className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 md:p-8">
              <SectionEyebrow label="Approved location" className="mb-4" />
              <p className="text-sm text-foreground whitespace-pre-line">{data.approvedLocation}</p>
            </section>
          )}

          {/* Process Timeline */}
          <section className="rounded-2xl border border-border p-6 md:p-8">
            <SectionEyebrow label="Application progress" className="mb-6" />
            <div className="hidden md:flex items-center justify-between gap-2">
              {data.processStages.map((stage, i) => (
                <div key={stage.key} className="flex items-center flex-1 min-w-0">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className={`w-3 h-3 rounded-full ${stage.completed ? "bg-solar-green" : "bg-border"}`}
                    />
                    <span className="text-[10px] text-muted-foreground mt-2 text-center leading-tight">
                      {stage.label}
                    </span>
                  </div>
                  {i < data.processStages.length - 1 && (
                    <div
                      className={`h-px flex-1 mx-1 mb-6 ${stage.completed ? "bg-solar-green" : "bg-border"}`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="md:hidden space-y-4">
              {data.processStages.map((stage) => (
                <div key={stage.key} className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${stage.completed ? "bg-solar-green" : "bg-border"}`}
                  />
                  <span
                    className={`text-sm ${stage.current ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                  >
                    {stage.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Approval Letter */}
          {data.status === "APPROVED" && (
            <section className="rounded-2xl border border-border p-6 md:p-8">
              <SectionEyebrow label="Approval letter" className="mb-4" />
              {data.hasApprovalLetter ? (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your approval letter is available for download.
                  </p>
                  <Button
                    onClick={handleDownloadLetter}
                    disabled={downloadingLetter}
                    className="rounded-full bg-solar-green hover:bg-solar-green-dark text-white"
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
                  Your approval letter is being prepared. Please check again later.
                </p>
              )}
            </section>
          )}

          {/* Payment */}
          {data.status === "APPROVED" && data.payment && (
            <section className="rounded-2xl border border-border p-6 md:p-8 space-y-6">
              <SectionEyebrow label="Payment" className="mb-2" />
              <EditorialHeading size="subsection">Partnership payment</EditorialHeading>

              {data.paymentAmountDue ? (
                <p className="text-lg font-semibold">
                  Amount Payable: {formatCurrency(data.paymentAmountDue)}
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
                    <DetailItem label="Bank Name" value={paymentDetails.account.bankName} />
                    <DetailItem label="Account Name" value={paymentDetails.account.accountName} />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        Account Number
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="font-mono">{paymentDetails.account.accountNumber}</p>
                        <button
                          type="button"
                          onClick={() => handleCopy(paymentDetails.account!.accountNumber)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        IFSC Code
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="font-mono">{paymentDetails.account.ifscCode}</p>
                        <button
                          type="button"
                          onClick={() => handleCopy(paymentDetails.account!.ifscCode)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <DetailItem label="Branch" value={paymentDetails.account.branchName} />
                  </div>
                  {paymentDetails.account.upiId && (
                    <div className="space-y-3">
                      <p className="font-semibold text-foreground">UPI</p>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          UPI ID
                        </p>
                        <div className="flex items-center gap-2">
                          <p>{paymentDetails.account.upiId}</p>
                          <button
                            type="button"
                            onClick={() => handleCopy(paymentDetails.account!.upiId!)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
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
                    className="rounded-full bg-solar-green hover:bg-solar-green-dark text-white"
                  >
                    {submittingPayment ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : null}
                    Submit Payment Proof
                  </Button>
                </form>
              )}

              {data.payment.history.length > 0 && (
                <div className="pt-6 border-t border-border">
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
