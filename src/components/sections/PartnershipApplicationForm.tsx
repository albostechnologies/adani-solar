"use client";

import { useState } from "react";
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
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

const phonePattern = /^[+]?[\d\s()-]{7,15}$/;

const partnershipSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  contactNo: z
    .string()
    .min(10, "Please enter a valid contact number")
    .regex(phonePattern, "Invalid contact number"),
  alternateNo: z
    .string()
    .optional()
    .refine((val) => !val || phonePattern.test(val), "Invalid alternate number"),
  email: z.string().email("Please enter a valid email address"),
  pinCode: z
    .string()
    .min(6, "Pin code must be 6 digits")
    .max(6, "Pin code must be 6 digits")
    .regex(/^\d{6}$/, "Enter a valid 6-digit pin code"),
  state: z.string().min(2, "Please enter your state"),
  district: z.string().min(2, "Please enter your district"),
  city: z.string().min(2, "Please enter your city"),
  type: z.enum(["Dealership", "Distributorship"], {
    message: "Please select application type",
  }),
});

type PartnershipFormData = z.infer<typeof partnershipSchema>;

const inputClass =
  "h-11 rounded-lg border-border bg-white focus:border-solar-green focus:ring-solar-green/20";

export function PartnershipApplicationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PartnershipFormData>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: {
      name: "",
      contactNo: "",
      alternateNo: "",
      email: "",
      pinCode: "",
      state: "",
      district: "",
      city: "",
      type: undefined,
    },
  });

  const onSubmit = async (data: PartnershipFormData) => {
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed");
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12 px-6 rounded-2xl border border-solar-green/20 bg-solar-green/5">
        <CheckCircle className="w-12 h-12 text-solar-green mx-auto mb-4" />
        <p className="text-lg font-semibold text-foreground mb-2">Application submitted</p>
        <p className="text-sm text-muted-foreground">
          Thank you. Our team will review your application and contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Name" required error={errors.name?.message} className="sm:col-span-2">
          <Input {...register("name")} className={inputClass} placeholder="Full name" autoComplete="name" />
        </Field>

        <Field label="Contact No." required error={errors.contactNo?.message}>
          <Input {...register("contactNo")} type="tel" className={inputClass} placeholder="+91 98765 43210" />
        </Field>

        <Field label="Alternate No." error={errors.alternateNo?.message}>
          <Input {...register("alternateNo")} type="tel" className={inputClass} placeholder="Optional" />
        </Field>

        <Field label="Email Address" required error={errors.email?.message} className="sm:col-span-2">
          <Input {...register("email")} type="email" className={inputClass} placeholder="you@example.com" />
        </Field>

        <Field label="Pin Code" required error={errors.pinCode?.message}>
          <Input {...register("pinCode")} className={inputClass} placeholder="6-digit pin code" inputMode="numeric" />
        </Field>

        <Field label="State" required error={errors.state?.message}>
          <Input {...register("state")} className={inputClass} placeholder="State" />
        </Field>

        <Field label="District" required error={errors.district?.message}>
          <Input {...register("district")} className={inputClass} placeholder="District" />
        </Field>

        <Field label="City" required error={errors.city?.message}>
          <Input {...register("city")} className={inputClass} placeholder="City" />
        </Field>

        <Field label="Type" required error={errors.type?.message} className="sm:col-span-2">
          <Select onValueChange={(value) => setValue("type", value as PartnershipFormData["type"], { shouldValidate: true })}>
            <SelectTrigger className={inputClass}>
              <SelectValue placeholder="Select application type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Dealership">Dealership</SelectItem>
              <SelectItem value="Distributorship">Distributorship</SelectItem>
            </SelectContent>
          </Select>
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
          "Submit Application"
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
