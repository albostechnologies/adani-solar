import { NextResponse } from "next/server";
import { z } from "zod";

const phonePattern = /^[+]?[\d\s()-]{7,15}$/;

const partnershipSchema = z.object({
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
  type: z.enum(["Dealership", "Distributorship"]),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = partnershipSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const recipient = process.env.CONTACT_TO_EMAIL ?? "enquiries@example.com";
    console.log("Partnership application:", { ...result.data, recipient });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your application. We will get back to you shortly.",
      },
      { status: 200 }
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
