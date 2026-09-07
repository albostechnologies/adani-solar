"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageSection } from "@/components/editorial/PageSection";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2 } from "lucide-react";
import {
  applicantFetch,
  clearApplicantToken,
  getApplicantToken,
} from "@/lib/applicantSession";
import { PaymentDetailsTable } from "@/components/status/PaymentDetailsTable";

interface StatusData {
  applicationNumber: string;
  status: string;
  paymentAmountDue: number | null;
  paymentAvailable?: boolean;
  payment: {
    amountDue: number | null;
    publicStatus: string;
    publicStatusLabel: string;
    publicMessage: string | null;
    canSubmit: boolean;
    history: {
      paymentReference: string;
      amountPaid: number;
      utrTransactionId: string;
      paymentMethod: string;
      submittedAt: string;
      statusLabel: string;
    }[];
  } | null;
}

interface PaymentDetailsData {
  amountDue: number | null;
  account: {
    accountName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    branchName: string | null;
    upiId: string | null;
    upiQrUrl?: string | null;
  } | null;
}

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

export function ApplicantPaymentPage() {
  const router = useRouter();
  const [data, setData] = useState<StatusData | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submittingPayment, setSubmittingPayment] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    amountPaid: "",
    paymentMethod: "UPI" as "UPI" | "BANK_TRANSFER",
    utrTransactionId: "",
    paymentDate: "",
  });
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [paymentMessage, setPaymentMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
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
        if (cancelled) return;
        if (!res.ok) {
          clearApplicantToken();
          router.replace("/check-status");
          return;
        }

        const status = res.body.data;
        const allowed =
          status.status === "APPROVED" && status.paymentAvailable !== false;
        if (!allowed) {
          router.replace("/application-status");
          return;
        }

        setData(status);

        const payRes = await applicantFetch<{ success: boolean; data: PaymentDetailsData }>(
          "/api/v1/partners/me/payment-details"
        );
        if (!cancelled && payRes.ok) setPaymentDetails(payRes.body.data);
      } catch {
        if (!cancelled) setError("Unable to load payment details.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const reload = async () => {
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
      const payRes = await applicantFetch<{ success: boolean; data: PaymentDetailsData }>(
        "/api/v1/partners/me/payment-details"
      );
      if (payRes.ok) setPaymentDetails(payRes.body.data);
    } catch {
      setError("Unable to load payment details.");
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
        await reload();
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
        <p className="text-destructive mb-4">{error || "Payment details not found."}</p>
        <Button onClick={() => router.push("/application-status")}>Back to Application Status</Button>
      </main>
    );
  }

  const amountDue = paymentDetails?.amountDue ?? data.paymentAmountDue;
  const hasAccount = Boolean(paymentDetails?.account);
  const hasAmount = Boolean(amountDue);
  const paymentConfigured = hasAccount || hasAmount;

  return (
    <main>
      <div className="border-b border-border bg-[#f7f7f5] pt-24 sm:pt-28 pb-6">
        <div className="editorial-section-inner">
          <div className="max-w-4xl mx-auto">
            <button
              type="button"
              onClick={() => router.push("/application-status")}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Application Status
            </button>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Payment</p>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="font-[family-name:var(--font-poppins)] text-2xl font-semibold tracking-tight">
                  Partnership payment
                </h1>
                <p className="mt-2 font-mono text-sm text-muted-foreground">{data.applicationNumber}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  clearApplicantToken();
                  router.push("/check-status");
                }}
                className="h-10 px-3 rounded-lg border border-border bg-white text-sm text-muted-foreground hover:text-foreground shrink-0"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      <PageSection>
        <div className="max-w-4xl mx-auto space-y-8">
          <section>
            <SectionEyebrow label="Payment details" className="mb-4" />

            {!paymentConfigured ? (
              <p className="text-sm text-muted-foreground rounded-2xl border border-border bg-white p-6">
                Payment details are being prepared. Please check again later.
              </p>
            ) : (
              <div className="space-y-6">
                {data.payment && data.payment.publicStatus !== "NOT_SUBMITTED" && (
                  <div className="rounded-2xl border border-border bg-white p-4 text-sm">
                    <p className="font-semibold">{data.payment.publicStatusLabel}</p>
                    {data.payment.publicMessage && (
                      <p className="text-muted-foreground mt-1">{data.payment.publicMessage}</p>
                    )}
                  </div>
                )}

                <PaymentDetailsTable
                  account={paymentDetails?.account ?? null}
                  amountPayable={hasAmount ? formatCurrency(amountDue!) : null}
                  paymentStatusLabel={data.payment?.publicStatusLabel ?? null}
                />

                {!hasAccount && (
                  <p className="text-sm text-muted-foreground">
                    Bank account details will be provided by our team shortly.
                  </p>
                )}
              </div>
            )}
          </section>

          {data.payment?.canSubmit && paymentConfigured && (
            <section className="rounded-2xl border border-border bg-white p-8">
              <SectionEyebrow label="Submit payment proof" className="mb-4" />
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
                  {submittingPayment ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Submit Payment Proof
                </Button>
              </form>
            </section>
          )}

          {data.payment && data.payment.history.length > 0 && (
            <section className="rounded-2xl border border-border bg-white p-8">
              <SectionEyebrow label="Payment history" className="mb-4" />
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-sm">
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
            </section>
          )}
        </div>
      </PageSection>
    </main>
  );
}
