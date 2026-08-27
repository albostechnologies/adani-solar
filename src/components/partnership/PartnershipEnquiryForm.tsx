"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, CheckCircle, Loader2, Copy } from "lucide-react";
import { partnershipContent } from "@/content/partnership";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

const BUSINESS_TYPE_MAP = {
  Partnership: "PARTNERSHIP",
  Proprietorship: "PROPRIETORSHIP",
} as const;

const INTEREST_MAP = {
  Dealership: "DEALERSHIP",
  Distributorship: "DISTRIBUTORSHIP",
} as const;

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  fatherOrHusbandName: z.string().trim().optional().or(z.literal("")),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .email("Enter a valid email address."),
  state: z.string().trim().min(2, "Select your state."),
  district: z.string().trim().min(2, "Please enter your district."),
  pinCode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter a valid 6-digit PIN code."),
  businessType: z.enum(["Partnership", "Proprietorship"], {
    message: "Select your business type.",
  }),
  interestedIn: z.enum(["Dealership", "Distributorship"], {
    message: "Select what you are interested in.",
  }),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

const inputClass =
  "h-11 rounded-lg border-border bg-white focus:border-solar-green focus:ring-solar-green/20";

export function PartnershipEnquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [applicationNumber, setApplicationNumber] = useState("");
  const [copied, setCopied] = useState(false);
  const formId = useId();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      fatherOrHusbandName: "",
      email: "",
      state: "",
      district: "",
      pinCode: "",
      businessType: undefined,
      interestedIn: undefined,
    },
  });

  const [businessType, setBusinessType] = useState<EnquiryFormData["businessType"] | undefined>();
  const [interestedIn, setInterestedIn] = useState<EnquiryFormData["interestedIn"] | undefined>();

  const onSubmit = async (data: EnquiryFormData) => {
    setStatus("submitting");
    try {
      const response = await fetch(`${API_URL}/api/v1/partners`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.name.trim(),
          fatherOrHusbandName: data.fatherOrHusbandName?.trim() || undefined,
          email: data.email.trim().toLowerCase(),
          state: data.state.trim(),
          district: data.district.trim(),
          pinCode: data.pinCode.trim(),
          businessType: BUSINESS_TYPE_MAP[data.businessType],
          interestedIn: INTEREST_MAP[data.interestedIn],
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.error?.message ?? "Failed");
      setApplicationNumber(result.data.applicationNumber);
      setStatus("success");
      setBusinessType(undefined);
      setInterestedIn(undefined);
      reset();
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(applicationNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-solar-green/20 bg-solar-green/5 p-8">
        <CheckCircle className="w-10 h-10 text-solar-green mb-4" />
        <p className="text-lg font-semibold text-foreground mb-1">Application submitted successfully.</p>
        <p className="text-sm text-muted-foreground mb-6">
          Please save this number. You can use your application number and registered email to check
          your application status.
        </p>
        <div className="bg-white border border-solar-green/30 rounded-xl p-5 mb-5 inline-block">
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Application Number</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-mono font-semibold text-foreground tracking-wide">
              {applicationNumber}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="p-1.5 rounded-lg hover:bg-solar-green/10 text-muted-foreground hover:text-solar-green transition-colors min-h-11 min-w-11 inline-flex items-center justify-center"
              title="Copy application number"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          {copied && <p className="text-xs text-solar-green mt-1">Copied!</p>}
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="/check-status"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-solar-green hover:bg-solar-green-dark text-white text-sm font-semibold transition-colors"
          >
            Check Status
          </a>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setApplicationNumber("");
            }}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id={`${formId}-name`} label="Name" required error={errors.name?.message}>
          <Input
            id={`${formId}-name`}
            {...register("name")}
            className={inputClass}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
          />
        </Field>

        <Field
          id={`${formId}-father`}
          label="Father / Husband Name"
          optional
          error={errors.fatherOrHusbandName?.message}
        >
          <Input
            id={`${formId}-father`}
            {...register("fatherOrHusbandName")}
            className={inputClass}
            autoComplete="additional-name"
          />
        </Field>

        <Field id={`${formId}-email`} label="Email" required error={errors.email?.message}>
          <Input
            id={`${formId}-email`}
            {...register("email")}
            type="email"
            className={inputClass}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
          />
        </Field>

        <Field id={`${formId}-state`} label="State" required error={errors.state?.message}>
          <Input
            id={`${formId}-state`}
            {...register("state")}
            className={inputClass}
            autoComplete="address-level1"
            aria-invalid={Boolean(errors.state)}
          />
        </Field>

        <Field id={`${formId}-district`} label="District" required error={errors.district?.message}>
          <Input
            id={`${formId}-district`}
            {...register("district")}
            className={inputClass}
            autoComplete="address-level2"
            aria-invalid={Boolean(errors.district)}
          />
        </Field>

        <Field id={`${formId}-pin`} label="PIN Code" required error={errors.pinCode?.message}>
          <Input
            id={`${formId}-pin`}
            {...register("pinCode")}
            inputMode="numeric"
            maxLength={6}
            className={inputClass}
            autoComplete="postal-code"
            aria-invalid={Boolean(errors.pinCode)}
            onInput={(e) => {
              const target = e.currentTarget;
              target.value = target.value.replace(/\D/g, "").slice(0, 6);
            }}
          />
        </Field>

        <Field
          id={`${formId}-business`}
          label="Business Type"
          required
          error={errors.businessType?.message}
        >
          <Select
            value={businessType}
            onValueChange={(v) => {
              const next = v as EnquiryFormData["businessType"];
              setBusinessType(next);
              setValue("businessType", next, { shouldValidate: true });
            }}
          >
            <SelectTrigger id={`${formId}-business`} className={inputClass} aria-invalid={Boolean(errors.businessType)}>
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              {partnershipContent.businessTypeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field
          id={`${formId}-interest`}
          label="Interested In"
          required
          error={errors.interestedIn?.message}
        >
          <Select
            value={interestedIn}
            onValueChange={(v) => {
              const next = v as EnquiryFormData["interestedIn"];
              setInterestedIn(next);
              setValue("interestedIn", next, { shouldValidate: true });
            }}
          >
            <SelectTrigger id={`${formId}-interest`} className={inputClass} aria-invalid={Boolean(errors.interestedIn)}>
              <SelectValue placeholder="Select interest" />
            </SelectTrigger>
            <SelectContent>
              {partnershipContent.interestedInOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive flex items-center gap-2" role="alert">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Something went wrong. Please try again.
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto rounded-full px-8 h-11 bg-solar-green hover:bg-solar-green-dark text-white font-semibold"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Application →"
        )}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  optional,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <Label htmlFor={id} className="mb-2 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-solar-green ml-0.5">*</span>}
        {optional && (
          <span className="ml-2 text-xs font-normal text-muted-foreground">Optional</span>
        )}
      </Label>
      {children}
      {error && (
        <p id={errorId} className="text-xs text-destructive mt-1.5 flex items-center gap-1" role="alert">
          <AlertCircle className="w-3 h-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
