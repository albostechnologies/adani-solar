import { NextResponse } from "next/server";
import { z } from "zod";

const phonePattern = /^[+]?[\d\s()-]{7,15}$/;

const applicationSchema = z.object({
  formType: z.literal("partnership-application"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  contactNo: z.string().min(10, "Please enter a valid contact number").regex(phonePattern),
  alternateNo: z
    .string()
    .optional()
    .refine((val) => !val || phonePattern.test(val), "Invalid alternate number"),
  email: z.string().email("Please enter a valid email address"),
  pinCode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pin code"),
  state: z.string().min(2, "Please enter your state"),
  district: z.string().min(2, "Please enter your district"),
  city: z.string().min(2, "Please enter your city"),
  businessType: z.string().min(1, "Please select business type"),
  availableSpace: z.string().min(1, "Please select available space"),
  investmentRange: z.string().min(1, "Please select investment range"),
  interestedIn: z.string().min(1, "Please select an interest"),
  gstAvailable: z.enum(["Yes", "No"]),
  message: z.string().optional(),
});

const enquirySchema = z.object({
  formType: z.literal("partnership-enquiry"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number").regex(phonePattern),
  email: z.string().email("Please enter a valid email address"),
  state: z.string().min(2, "Please enter your state"),
  city: z.string().min(2, "Please enter your city"),
  businessType: z.string().min(1, "Please select business type"),
  availableSpace: z.string().min(1, "Please select available space"),
  investmentRange: z.string().min(1, "Please select investment range"),
  interestedIn: z.string().min(1, "Please select an interest"),
  gstAvailable: z.enum(["Yes", "No"]),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const recipient = process.env.CONTACT_TO_EMAIL ?? "enquiries@example.com";

    if (body?.formType === "partnership-enquiry") {
      const result = enquirySchema.safeParse(body);
      if (!result.success) {
        return NextResponse.json(
          { success: false, errors: result.error.flatten().fieldErrors },
          { status: 400 }
        );
      }
      console.log("Partnership enquiry:", { ...result.data, recipient });
      return NextResponse.json(
        {
          success: true,
          message: "Thank you for your enquiry. We will get back to you shortly.",
        },
        { status: 200 }
      );
    }

    if (body?.formType === "partnership-application") {
      const result = applicationSchema.safeParse(body);
      if (!result.success) {
        return NextResponse.json(
          { success: false, errors: result.error.flatten().fieldErrors },
          { status: 400 }
        );
      }
      console.log("Partnership application:", { ...result.data, recipient });
      return NextResponse.json(
        {
          success: true,
          message: "Thank you for your application. We will get back to you shortly.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Unknown form submission type." },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
