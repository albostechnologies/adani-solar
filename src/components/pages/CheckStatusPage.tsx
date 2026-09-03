"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageHero } from "@/components/editorial/PageHero";
import { PageSection } from "@/components/editorial/PageSection";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { saveApplicantToken } from "@/lib/applicantSession";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const APP_NUMBER_REGEX = /^(ASP-\d{4}-\d{6}|VL\/\d{4}\/\d+|ASP\/\d{4}\/\d+)$/i;

export function CheckStatusPage() {
  const router = useRouter();
  const [applicationNumber, setApplicationNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const normalizedApp = applicationNumber.trim();
    if (!APP_NUMBER_REGEX.test(normalizedApp)) {
      setError("Please enter a valid application number (e.g. ASP/2026/3506055)");
      return;
    }

    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/partners/check-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationNumber: normalizedApp,
          password: password.trim(),
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result?.error?.message ?? "Invalid application number or password.");
        return;
      }
      saveApplicantToken(result.data.token);
      router.push("/application-status");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <PageHero
        eyebrow="Partnership"
        title="Check application status."
        subtitle="Sign in with your application number and password to view your partnership application."
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
            Enter your application number and password. Your initial password is your registered mobile number.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 mb-8" noValidate>
            <div className="space-y-2">
              <Label htmlFor="app-number">Application Number</Label>
              <Input
                id="app-number"
                value={applicationNumber}
                onChange={(e) => setApplicationNumber(e.target.value)}
                placeholder="ASP/2026/3506055"
                required
                className="h-11 rounded-lg border-border bg-white font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status-password">Password</Label>
              <div className="relative">
                <Input
                  id="status-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  required
                  autoComplete="current-password"
                  className="h-11 rounded-lg border-border bg-white pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
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
        </div>
      </PageSection>
    </main>
  );
}
