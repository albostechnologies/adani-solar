"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageSection } from "@/components/editorial/PageSection";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Info,
  Loader2,
  XCircle,
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
  hasApprovalLetter: boolean;
  hasConfirmationLetter?: boolean;
  approvalLetterAvailable?: boolean;
  confirmationLetterAvailable?: boolean;
  taxInvoiceAvailable?: boolean;
  paymentAvailable?: boolean;
  currentProcessStage: string;
}

const STATUS_CONFIG: Record<string, { icon: React.ReactNode; color: string }> = {
  PENDING: { icon: <Clock className="w-5 h-5" />, color: "text-gray-600 bg-gray-50 border-gray-200" },
  UNDER_REVIEW: { icon: <Info className="w-5 h-5" />, color: "text-indigo-700 bg-indigo-50 border-indigo-200" },
  NEEDS_INFORMATION: { icon: <AlertCircle className="w-5 h-5" />, color: "text-amber-700 bg-amber-50 border-amber-200" },
  APPROVED: { icon: <CheckCircle className="w-5 h-5" />, color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  DECLINED: { icon: <XCircle className="w-5 h-5" />, color: "text-red-700 bg-red-50 border-red-200" },
  CANCELLED: { icon: <XCircle className="w-5 h-5" />, color: "text-gray-600 bg-gray-50 border-gray-200" },
};

function statusDescription(data: StatusData) {
  if (data.publicMessage) return data.publicMessage;
  if (data.status === "APPROVED") return "Your partnership application has been approved.";
  if (data.status === "PENDING") return "Your application has been received and is awaiting review.";
  if (data.status === "UNDER_REVIEW") return "Your application is currently under review.";
  if (data.status === "NEEDS_INFORMATION") return "Additional information is required for your application.";
  if (data.status === "DECLINED") return "Your partnership application was not approved.";
  if (data.status === "CANCELLED") return "Your application has been cancelled.";
  return "Track your application progress below.";
}

export function ApplicationStatusPage() {
  const router = useRouter();
  const [data, setData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadingLetter, setDownloadingLetter] = useState(false);
  const [downloadingInvoice, setDownloadingInvoice] = useState(false);

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

  const confirmationAvailable =
    Boolean(data?.confirmationLetterAvailable) ||
    Boolean(data?.approvalLetterAvailable) ||
    Boolean(data?.hasConfirmationLetter) ||
    Boolean(data?.hasApprovalLetter);

  const handleDownloadConfirmationLetter = async () => {
    setDownloadingLetter(true);
    try {
      let res = await applicantFetch<{ success: boolean; data: { url: string } }>(
        "/api/v1/partners/me/confirmation-letter"
      );
      if (!res.ok) {
        res = await applicantFetch<{ success: boolean; data: { url: string } }>(
          "/api/v1/partners/me/approval-letter"
        );
      }
      if (res.ok && res.body.data?.url) {
        window.open(res.body.data.url, "_blank", "noopener,noreferrer");
      }
    } finally {
      setDownloadingLetter(false);
    }
  };

  const handleDownloadTaxInvoice = async () => {
    setDownloadingInvoice(true);
    try {
      const res = await applicantFetch<{ success: boolean; data: { url: string } }>(
        "/api/v1/partners/me/invoice"
      );
      if (res.ok && res.body.data?.url) {
        window.open(res.body.data.url, "_blank", "noopener,noreferrer");
      }
    } finally {
      setDownloadingInvoice(false);
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
  const showTaxInvoice = Boolean(data.taxInvoiceAvailable);
  const showDocuments = isApproved;

  const menuItems = [
    { id: "application-details", label: "Application Details" },
    ...(showDocuments ? [{ id: "documents", label: "Confirmation Letter" }] : []),
    ...(showTaxInvoice ? [{ id: "documents", label: "Payment Invoice" }] : []),
    { id: "application-progress", label: "Application Progress" },
    ...(data.approvedLocation ? [{ id: "approved-location", label: "Approved Location" }] : []),
    ...(showPayment
      ? [{ id: "payment", label: "Payment Details", href: "/application-status/payment" }]
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

          {showDocuments && (
            <section id="documents" className="scroll-mt-28 rounded-2xl border border-border p-8">
              <SectionEyebrow label="Documents" className="mb-6" />
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Confirmation Letter</h3>
                  {confirmationAvailable ? (
                    <>
                      <p className="text-sm text-muted-foreground mb-4">
                        Your confirmation letter is ready.
                      </p>
                      <Button
                        onClick={handleDownloadConfirmationLetter}
                        disabled={downloadingLetter}
                        className="rounded-full bg-solar-green hover:bg-solar-green-dark text-white"
                      >
                        {downloadingLetter ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Download className="w-4 h-4 mr-2" />
                        )}
                        Download Confirmation Letter
                      </Button>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Confirmation letter is being prepared. Please check again later.
                    </p>
                  )}
                </div>

                {showTaxInvoice && (
                  <div className="pt-6 border-t border-border">
                    <h3 className="text-sm font-semibold text-foreground mb-2">Payment Invoice</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your payment invoice is ready. For multiple payments, download each invoice from{" "}
                      <button
                        type="button"
                        className="text-solar-green underline underline-offset-2"
                        onClick={() => router.push("/application-status/payment")}
                      >
                        Payment history
                      </button>
                      .
                    </p>
                    <Button
                      onClick={handleDownloadTaxInvoice}
                      disabled={downloadingInvoice}
                      className="rounded-full bg-solar-green hover:bg-solar-green-dark text-white"
                    >
                      {downloadingInvoice ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4 mr-2" />
                      )}
                      Download Latest Payment Invoice
                    </Button>
                  </div>
                )}
              </div>
            </section>
          )}

          <section id="application-progress" className="scroll-mt-28 rounded-2xl border border-border p-8">
            <SectionEyebrow label="Application progress" className="mb-6" />
            <ProcessProgress currentStage={data.currentProcessStage} />
          </section>

          {data.approvedLocation && (
            <section id="approved-location" className="scroll-mt-28 rounded-2xl border border-border p-8">
              <SectionEyebrow label="Approved location" className="mb-4" />
              <ApprovedLocationMap address={data.approvedLocation} />
            </section>
          )}
        </div>
      </PageSection>
    </main>
  );
}
