"use client";

import { useState } from "react";
import { PageHero } from "@/components/editorial/PageHero";
import { PageSection } from "@/components/editorial/PageSection";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function CheckStatusPage() {
  const [referenceId, setReferenceId] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <PageHero
        eyebrow="Support"
        title="Check your status."
        subtitle="Track the progress of your enquiry or application using your reference number."
        breadcrumbs={[
          { label: "Home", route: "home" },
          { label: "Check Your Status" },
        ]}
      />

      <PageSection>
        <div className="max-w-xl mx-auto">
          <SectionEyebrow label="Status lookup" className="mb-6" />
          <EditorialHeading size="statement" className="mb-4">
            Enter your details.
          </EditorialHeading>
          <p className="editorial-body text-muted-foreground mb-8">
            Use the reference number from your confirmation email along with the email address you
            submitted.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="reference-id">Reference Number</Label>
              <Input
                id="reference-id"
                value={referenceId}
                onChange={(e) => setReferenceId(e.target.value)}
                placeholder="e.g. AS-2026-001234"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status-email">Email Address</Label>
              <Input
                id="status-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>
            <Button type="submit" className="rounded-full px-6 h-11 bg-solar-green hover:bg-solar-green-dark">
              Check Status
            </Button>
          </form>

          {submitted && (
            <div className="mt-8 p-5 rounded-xl border border-border bg-[#f7f7f5]">
              <p className="text-sm font-medium text-foreground mb-1">Status lookup submitted</p>
              <p className="text-sm text-muted-foreground">
                Live status tracking will be connected once the client provides their enquiry system
                details. Reference: <span className="font-mono">{referenceId}</span>
              </p>
            </div>
          )}
        </div>
      </PageSection>
    </main>
  );
}
