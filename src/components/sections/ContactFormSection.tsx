"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
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
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  User,
  Mail,
  Phone,
  Building2,
  MessageSquare,
  Tag,
  Sparkles,
} from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .regex(/^[+]?[\d\s()-]+$/, "Invalid phone number format"),
  company: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormSectionProps {
  title: string;
  subtitle?: string;
  subjectOptions: string[];
  submitLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  variant?: "light" | "dark";
}

const fieldIcons = {
  name: User,
  email: Mail,
  phone: Phone,
  company: Building2,
  subject: Tag,
  message: MessageSquare,
} as const;

export function ContactFormSection({
  title,
  subtitle,
  subjectOptions,
  submitLabel = "Send Message",
  successMessage = "Thank you! We'll get back to you within 24 hours.",
  errorMessage = "Something went wrong. Please try again.",
  variant = "light",
}: ContactFormSectionProps) {
  const isDark = variant === "dark";
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setFormStatus("success");
      reset();
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  // Enhanced input styling with deeper focus ring and refined border
  const inputBase = `w-full rounded-xl h-12 text-sm transition-all duration-300 ${
    isDark
      ? "bg-white/5 border-white/15 text-white placeholder:text-white/40 focus:border-solar-green focus:ring-4 focus:ring-solar-green/20 hover:border-white/25"
      : "bg-white border-border/80 text-foreground placeholder:text-muted-foreground/60 focus:border-solar-green focus:ring-4 focus:ring-solar-green/15 hover:border-solar-green/40 hover:shadow-sm"
  }`;

  // Render a labeled field with icon and error message
  const renderField = (
    label: string,
    required: boolean,
    iconKey: keyof typeof fieldIcons,
    error: string | undefined,
    children: React.ReactNode,
  ) => {
    const Icon = fieldIcons[iconKey];
    return (
      <div>
        <Label
          className={`mb-2 flex items-center gap-1.5 text-sm font-medium ${
            isDark ? "text-white/85" : "text-foreground/85"
          }`}
        >
          <Icon
            className={`w-3.5 h-3.5 ${isDark ? "text-solar-green-light" : "text-solar-green"}`}
            aria-hidden
          />
          {label}
          {required && <span className="text-solar-green">*</span>}
        </Label>
        {children}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -4, height: 0 }}
              className="text-xs text-destructive mt-1.5 flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3 shrink-0" />
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section
      className={`py-20 sm:py-24 lg:py-28 relative overflow-hidden ${
        isDark ? "bg-solar-dark" : "bg-gradient-to-b from-solar-green/5 via-background to-solar-green/3"
      }`}
    >
      {/* Decorative background elements - subtle dot pattern + glow orbs */}
      <div className="absolute inset-0 bg-dots-pattern opacity-[0.04] pointer-events-none" />
      {isDark ? (
        <>
          <div className="absolute top-0 right-0 w-[28rem] h-[28rem] bg-solar-green/8 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-solar-green-light/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />
        </>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-solar-green/4 rounded-full blur-3xl pointer-events-none" />
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-14">
          {/* Eyebrow badge */}
          <div
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium mb-4 ${
              isDark
                ? "bg-white/10 text-solar-green-light border border-white/15"
                : "bg-solar-green/10 text-solar-green-dark border border-solar-green/20"
            }`}
          >
            <Sparkles className="w-3 h-3" aria-hidden />
            We&apos;d Love to Hear From You
          </div>
          <h2
            className={`font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold mb-4 tracking-tight ${
              isDark ? "text-white" : "text-foreground"
            }`}
          >
            {title}
          </h2>
          <div className="relative w-20 h-1 rounded-full bg-gradient-to-r from-solar-green via-solar-green-light to-solar-green mx-auto mb-5">
            <div className="absolute inset-0 rounded-full bg-solar-green blur-sm opacity-50" />
          </div>
          {subtitle && (
            <p
              className={`text-base sm:text-lg max-w-xl mx-auto leading-relaxed ${
                isDark ? "text-white/75" : "text-foreground/70"
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>

        <AnimatePresence mode="wait">
          {formStatus === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className={`text-center py-16 rounded-2xl ${
                isDark
                  ? "bg-white/5 border border-white/10"
                  : "bg-white border border-solar-green/20"
              }`}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-solar-green/15 mb-5"
              >
                <CheckCircle className="w-10 h-10 text-solar-green" />
              </motion.div>
              <p className="text-xl font-semibold text-foreground mb-2">
                {successMessage}
              </p>
              <p className="text-sm text-muted-foreground">
                A solar expert will reach out shortly.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit(onSubmit)}
              className={`relative rounded-2xl p-7 sm:p-10 ${
                isDark
                  ? "bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/30"
                  : "bg-white border border-border/60 shadow-xl shadow-solar-green/5 hover:shadow-2xl hover:shadow-solar-green/10 transition-shadow duration-500"
              }`}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-7 right-7 sm:left-10 sm:right-10 h-px bg-gradient-to-r from-transparent via-solar-green/40 to-transparent" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {/* Name */}
                {renderField(
                  "Full Name",
                  true,
                  "name",
                  errors.name?.message,
                  <Input
                    {...register("name")}
                    className={inputBase}
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />,
                )}

                {/* Email */}
                {renderField(
                  "Email Address",
                  true,
                  "email",
                  errors.email?.message,
                  <Input
                    {...register("email")}
                    type="email"
                    className={inputBase}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />,
                )}

                {/* Phone */}
                {renderField(
                  "Phone Number",
                  true,
                  "phone",
                  errors.phone?.message,
                  <Input
                    {...register("phone")}
                    type="tel"
                    className={inputBase}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                  />,
                )}

                {/* Company */}
                {renderField(
                  "Company Name",
                  false,
                  "company",
                  errors.company?.message,
                  <Input
                    {...register("company")}
                    className={inputBase}
                    placeholder="Your organization"
                    autoComplete="organization"
                  />,
                )}

                {/* Subject */}
                <div className="sm:col-span-2">
                  {renderField(
                    "Subject",
                    true,
                    "subject",
                    errors.subject?.message,
                    <Select onValueChange={(value) => setValue("subject", value)}>
                      <SelectTrigger className={`${inputBase} hover:border-solar-green/40`}>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjectOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>,
                  )}
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  {renderField(
                    "Message",
                    true,
                    "message",
                    errors.message?.message,
                    <Textarea
                      {...register("message")}
                      className={`min-h-[120px] ${inputBase} h-auto resize-y`}
                      placeholder="Tell us about your project, requirements, or questions..."
                    />,
                  )}
                </div>
              </div>

              {/* Submit row */}
              <div className="mt-8 pt-6 border-t border-dashed border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p
                  className={`text-xs flex items-center gap-1.5 ${
                    isDark ? "text-white/55" : "text-muted-foreground"
                  }`}
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-solar-green animate-pulse" />
                  We typically respond within 24 hours during business days.
                </p>
                <Button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="bg-solar-green hover:bg-solar-green-dark text-white rounded-xl px-8 h-12 text-sm font-semibold shadow-lg shadow-solar-green/25 hover:shadow-xl hover:shadow-solar-green/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 w-full sm:w-auto group"
                >
                  {formStatus === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <span className="flex items-center gap-2">
                      {submitLabel}
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  )}
                </Button>
              </div>

              {formStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center gap-2 text-sm text-destructive bg-destructive/5 border border-destructive/20 rounded-lg px-4 py-2.5"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errorMessage}
                </motion.div>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
