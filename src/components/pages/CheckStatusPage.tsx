"use client";

import { useState } from "react";
import { PageHero } from "@/components/editorial/PageHero";
import { PageSection } from "@/components/editorial/PageSection";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, CheckCircle, Clock, Info, XCircle } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

const APP_NUMBER_REGEX = /^ASP-\d{4}-\d{6}$/;

const STATUS_CONFIG: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  PENDING: {
    label: "Application Received",
    icon: <Clock className="w-5 h-5" />,
    color: "text-gray-600 bg-gray-50 border-gray-200",
  },
  UNDER_REVIEW: {
    label: "Under Review",
    icon: <Info className="w-5 h-5" />,
    color: "text-indigo-700 bg-indigo-50 border-indigo-200",
  },
  NEEDS_INFORMATION: {
    label: "Additional Information Required",
    icon: <AlertCircle className="w-5 h-5" />,
    color: "text-amber-700 bg-amber-50 border-amber-200",
  },
  APPROVED: {
    label: "Approved",
    icon: <CheckCircle className="w-5 h-5" />,
    color: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  DECLINED: {
    label: "Not Approved",
    icon: <XCircle className="w-5 h-5" />,
    color: "text-red-700 bg-red-50 border-red-200",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: <XCircle className="w-5 h-5" />,
    color: "text-gray-600 bg-gray-50 border-gray-200",
  },
};

interface StatusData {
  applicationNumber: string;
  interestedIn: string;
  status: string;
  statusLabel: string;
  publicMessage: string | null;
  submittedAt: string;
  updatedAt: string;
}

const INTEREST_LABELS: Record<string, string> = {
  DEALERSHIP: "Dealership",
  DISTRIBUTORSHIP: "Distributorship",
  SOLAR_PROJECT: "Solar Project",
  PRODUCT_PURCHASE: "Product Purchase",
  OTHER: "Other",
};

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return d;
  }
}

export function CheckStatusPage() {
  const [applicationNumber, setApplicationNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [statusData, setStatusData] = useState<StatusData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatusData(null);

    if (!APP_NUMBER_REGEX.test(applicationNumber.trim().toUpperCase())) {
      setError("Please enter a valid application number (e.g. ASP-2026-000001)");
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/partners/check-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationNumber: applicationNumber.trim().toUpperCase(),
          email: email.trim().toLowerCase(),
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(
          "We could not verify an application using the provided details."
        );
        return;
      }
      setStatusData(result.data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const statusConfig = statusData ? (STATUS_CONFIG[statusData.status] ?? STATUS_CONFIG.PENDING) : null;

  return (
    <main>
      <PageHero
        eyebrow="Partnership"
        title="Check application status."
        subtitle="Track the progress of your partnership application using your application number and registered email."
        breadcrumbs={[
          { label: "Home", route: "home" },
          { label: "Check Application Status" },
        ]}
      />

      <PageSection>
        <div className="max-w-xl mx-auto">
          <SectionEyebrow label="Status lookup" className="mb-6" />
          <EditorialHeading size="statement" className="mb-4">
            Track your<br />partnership request.
          </EditorialHeading>
          <p className="editorial-body text-muted-foreground mb-8">
            Enter the application number you received at submission along with your registered email.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 mb-8" noValidate>
            <div className="space-y-2">
              <Label htmlFor="app-number">Application Number</Label>
              <Input
                id="app-number"
                value={applicationNumber}
                onChange={(e) => setApplicationNumber(e.target.value)}
                placeholder="ASP-2026-000001"
                required
                className="h-11 rounded-lg border-border bg-white font-mono uppercase"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status-email">Registered Email</Label>
              <Input
                id="status-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="h-11 rounded-lg border-border bg-white"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/5 border border-destructive/20 rounded-lg px-4 py-3">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="rounded-full px-8 h-11 bg-solar-green hover:bg-solar-green-dark text-white font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                "Check Status →"
              )}
            </Button>
          </form>

          {statusData && statusConfig && (
            <div className="rounded-2xl border border-border bg-[#f7f7f5] p-6 space-y-5">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Application Status</p>
                <p className="font-mono text-sm text-muted-foreground">{statusData.applicationNumber}</p>
              </div>

              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${statusConfig.color}`}>
                {statusConfig.icon}
                {statusConfig.label}
              </div>

              {statusData.publicMessage && (
                <p className="text-sm text-foreground">{statusData.publicMessage}</p>
              )}

              {statusData.status === "APPROVED" && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-800">
                  Your partnership request has been approved. Our team will contact you using your registered contact information regarding the next steps.
                </div>
              )}
              {statusData.status === "DECLINED" && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
                  Your application has completed the review process but could not be approved at this time. Please contact our team if you require further clarification.
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border text-sm">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Interest</p>
                  <p className="text-foreground">{INTEREST_LABELS[statusData.interestedIn] ?? statusData.interestedIn}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Submitted</p>
                  <p className="text-foreground">{formatDate(statusData.submittedAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Last Updated</p>
                  <p className="text-foreground">{formatDate(statusData.updatedAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-0 pt-2">
                {["Application Received", "Under Review", "Final Decision"].map((step, i) => {
                  const stepStatuses = [
                    ["PENDING"],
                    ["UNDER_REVIEW", "NEEDS_INFORMATION"],
                    ["APPROVED", "DECLINED", "CANCELLED"],
                  ];
                  const currentIdx = stepStatuses.findIndex((s) => s.includes(statusData.status));
                  const isDone = i <= currentIdx;
                  return (
                    <div key={step} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${isDone ? "bg-solar-green" : "bg-border"}`} />
                        <span className="text-[10px] text-muted-foreground mt-1 text-center leading-tight max-w-[70px]">{step}</span>
                      </div>
                      {i < 2 && <div className={`h-px flex-1 mb-4 ${i < currentIdx ? "bg-solar-green" : "bg-border"}`} />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </PageSection>
    </main>
  );
}
