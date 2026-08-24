"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle, CheckCircle, Loader2, Copy } from "lucide-react";
import { partnershipContent } from "@/content/partnership";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

const phonePattern = /^[+]?[\d\s()-]{7,15}$/;

const INTEREST_MAP: Record<string, string> = {
  Dealership: "DEALERSHIP",
  Distributorship: "DISTRIBUTORSHIP",
  "Solar Project": "SOLAR_PROJECT",
  "Product Purchase": "PRODUCT_PURCHASE",
  Other: "OTHER",
};

const enquirySchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(phonePattern, "Invalid phone number"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  state: z.string().min(2, "Please enter your state"),
  city: z.string().min(2, "Please enter your city"),
  businessType: z.string().min(1, "Please select business type"),
  availableSpace: z.string().min(1, "Please select available space"),
  investmentRange: z.string().min(1, "Please select investment range"),
  interestedIn: z.string().min(1, "Please select an interest"),
  gstAvailable: z.enum(["Yes", "No"], { message: "Please select GST availability" }),
  message: z.string().optional(),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

const inputClass =
  "h-11 rounded-lg border-border bg-white focus:border-solar-green focus:ring-solar-green/20";

export function PartnershipEnquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [applicationNumber, setApplicationNumber] = useState<string>("");
  const [copied, setCopied] = useState(false);

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
      phone: "",
      email: "",
      state: "",
      city: "",
      businessType: "",
      availableSpace: "",
      investmentRange: "",
      interestedIn: "",
      gstAvailable: undefined,
      message: "",
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setStatus("submitting");
    try {
      const response = await fetch(`${API_URL}/api/v1/partners`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.name,
          phone: data.phone,
          email: data.email || undefined,
          state: data.state,
          city: data.city,
          businessType: data.businessType,
          investmentRange: data.investmentRange,
          interestedIn: INTEREST_MAP[data.interestedIn] ?? "OTHER",
          gstAvailable: data.gstAvailable === "Yes" ? true : false,
          message: data.message || undefined,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.error?.message ?? "Failed");
      setApplicationNumber(result.data.applicationNumber);
      setStatus("success");
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
          Please save your application number. You can track your request using this number and your registered phone number.
        </p>
        <div className="bg-white border border-solar-green/30 rounded-xl p-5 mb-5 inline-block">
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Application Number</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-mono font-semibold text-foreground tracking-wide">{applicationNumber}</span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg hover:bg-solar-green/10 text-muted-foreground hover:text-solar-green transition-colors"
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
            className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-solar-green hover:bg-solar-green-dark text-white text-sm font-semibold transition-colors"
          >
            Check Status
          </a>
          <button
            onClick={() => { setStatus("idle"); setApplicationNumber(""); }}
            className="inline-flex items-center gap-2 h-10 px-5 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
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
        <Field label="Full Name" required error={errors.name?.message} className="sm:col-span-2">
          <Input {...register("name")} className={inputClass} placeholder="Full name" autoComplete="name" />
        </Field>

        <Field label="Phone" required error={errors.phone?.message}>
          <Input {...register("phone")} type="tel" className={inputClass} placeholder="+91 98765 43210" />
        </Field>

        <Field label="Email" required error={errors.email?.message}>
          <Input {...register("email")} type="email" className={inputClass} placeholder="you@example.com" />
        </Field>

        <Field label="State" required error={errors.state?.message}>
          <Input {...register("state")} className={inputClass} placeholder="State" />
        </Field>

        <Field label="City" required error={errors.city?.message}>
          <Input {...register("city")} className={inputClass} placeholder="City" />
        </Field>

        <Field label="Business Type" required error={errors.businessType?.message}>
          <Select onValueChange={(v) => setValue("businessType", v, { shouldValidate: true })}>
            <SelectTrigger className={inputClass}>
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

        <Field label="Available Space" required error={errors.availableSpace?.message}>
          <Select onValueChange={(v) => setValue("availableSpace", v, { shouldValidate: true })}>
            <SelectTrigger className={inputClass}>
              <SelectValue placeholder="Select space range" />
            </SelectTrigger>
            <SelectContent>
              {partnershipContent.availableSpaceOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Investment Range" required error={errors.investmentRange?.message}>
          <Select onValueChange={(v) => setValue("investmentRange", v, { shouldValidate: true })}>
            <SelectTrigger className={inputClass}>
              <SelectValue placeholder="Select investment range" />
            </SelectTrigger>
            <SelectContent>
              {partnershipContent.investmentRangeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Interested In" required error={errors.interestedIn?.message}>
          <Select onValueChange={(v) => setValue("interestedIn", v, { shouldValidate: true })}>
            <SelectTrigger className={inputClass}>
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

        <Field label="GST Available?" required error={errors.gstAvailable?.message} className="sm:col-span-2">
          <RadioGroup
            onValueChange={(v) => setValue("gstAvailable", v as "Yes" | "No", { shouldValidate: true })}
            className="flex flex-wrap gap-4 pt-1"
          >
            {(["Yes", "No"] as const).map((option) => (
              <label key={option} className="inline-flex items-center gap-2 min-h-11 cursor-pointer">
                <RadioGroupItem value={option} id={`gst-${option}`} />
                <span className="text-sm text-foreground">{option}</span>
              </label>
            ))}
          </RadioGroup>
        </Field>

        <Field label="Message" error={errors.message?.message} className="sm:col-span-2">
          <Textarea
            {...register("message")}
            className="min-h-28 rounded-lg border-border bg-white focus:border-solar-green focus:ring-solar-green/20"
            placeholder="Tell us about your location, goals or timeline (optional)"
          />
        </Field>
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive flex items-center gap-2">
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
          "Submit Partnership Enquiry ↗"
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Label className="mb-2 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-solar-green ml-0.5">*</span>}
      </Label>
      {children}
      {error && (
        <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
